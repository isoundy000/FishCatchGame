var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 背包中介者
 */
var BagMediator = (function (_super) {
    __extends(BagMediator, _super);
    function BagMediator(view) {
        return _super.call(this, view) || this;
    }
    BagMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        var userModel = burn.Director.getModelByKey(UserModel);
        this.getView().initView(userModel.getItemList());
    };
    BagMediator.prototype.init = function () {
        //注册消息
        this.subscrib(NotifyEnum.CLICK_BAG_ITEM, this.clickItem);
        this.subscrib(NotifyEnum.SEND_ITEM_TO_USER, this.sendItem);
        this.subscrib(NotifyEnum.USE_ITEM_BY_BAG, this.useItem);
        this.subscrib(NotifyEnum.GIVE_ITEM_DATA, this.dataRefresh);
        //监听服务器
        var self = this;
        game.net.MessageDispatcher.register(game.net.ResponseType.GIVEITEMBACK, function (msg) {
            self.giveItemBack(msg);
        });
        game.net.MessageDispatcher.register(game.net.ResponseType.FINDUSERBACK, function (msg) {
            self.findUserBack(msg);
        });
        //监听更换炮台消息
        game.net.MessageDispatcher.register(game.net.ResponseType.CHANGEGUNBACK, function (msg) {
            self.changeGunBack(msg);
        });
        //监听服务器消息返回
        game.net.MessageDispatcher.register(game.net.ResponseType.SHOPBUYBACK, function (msg) {
            self.shopBuyBack(msg);
        });
        this._curGiveID = -1;
        this._curGiveNum = -1;
    };
    //购买物品返回
    BagMediator.prototype.shopBuyBack = function (msg) {
        var state = msg.getState();
        switch (state) {
            case 0:
                game.util.GameUtil.popTips("货币不足");
                break;
            case 1:
                game.util.GameUtil.popTips("购买成功");
                burn._Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
                break;
            case 2:
                game.util.GameUtil.popTips("背包已满");
                break;
        }
        //添加到自己背包。重新设置shop
        var userModel = burn.Director.getModelByKey(UserModel);
        this.getView().setListData(userModel.getItemList());
    };
    //同步消息
    BagMediator.prototype.dataRefresh = function (obj, target) {
        //{id:self._id,num:self.nCurNumber}
        target._curGiveID = Number(obj.id);
        target._curGiveNum = Number(obj.num);
    };
    /** 点击道具 */
    BagMediator.prototype.clickItem = function (obj, target) {
        var itemId = Number(obj);
        var itemVo = game.table.T_Item_Table.getVoByKey(itemId);
        target.getView().setLeftMsg(game.util.Language.getText(itemVo.name), target.getTypeNameByType(itemVo.type), game.util.Language.getText(15) + ":" + itemVo.backpackMax, game.util.Language.getText(itemVo.desc), itemVo);
    };
    /** 使用道具 */
    BagMediator.prototype.useItem = function (obj, target) {
        var useId = Number(obj);
        var itemVo = game.table.T_Item_Table.getVoByKey(useId);
        var userModel = burn.Director.getModelByKey(UserModel);
        if (itemVo.type == BagItemType.FORGE_PROP) {
            //最高ID
            var gunRate = userModel.getCurGunID();
            var gunRateVo = game.table.T_Gun_Table.getVoByKey(gunRate);
            //判断有没有下一个炮倍
            if (gunRateVo) {
                var arr = gunRateVo.upgradeOrForgeCost;
                var arrData = arr.split(",");
                if (arrData.length > 1) {
                    var forgeView = new ForgeView();
                    var forgeMed = new ForgeMediator(forgeView);
                    burn.Director.pushView(forgeMed);
                    return;
                }
                else {
                    var vos = game.table.T_Gun_Table.getAllVo();
                    if (gunRate != vos[vos.length - 1].id) {
                        //未开启锻造界面
                        game.util.GameUtil.popTips(game.util.Language.getText(28));
                    }
                    else {
                        // 2441
                        game.util.GameUtil.popTips(game.util.Language.getText(2440));
                    }
                    return;
                }
            }
            return;
        }
    };
    /** 赠送道具 */
    BagMediator.prototype.sendItem = function (obj, target) {
        var sendId = Number(obj);
        var itemVo = game.table.T_Item_Table.getVoByKey(sendId);
        var userModel = burn.Director.getModelByKey(UserModel);
        var itemData = userModel.getItemById(sendId);
        if (itemData.getCount() < itemVo.everyTimeLimit) {
            var arrName = new Array();
            arrName.push(itemVo.everyTimeLimit + "");
            arrName.push(game.util.Language.getText(itemVo.name) + "");
            game.util.GameUtil.popTips(game.util.Language.getDynamicText(37, arrName));
            return;
        }
        //打开赠送UI
        var parentView = target.getView();
        var width = CONFIG.contentWidth;
        var height = CONFIG.contentHeight;
        target._sendView = new SendView(sendId);
        target._sendView.setParent(parentView);
        target._sendView.anchorOffsetX = target._sendView.width / 2;
        target._sendView.anchorOffsetY = target._sendView.height / 2;
        target._sendView.x = width / 2;
        target._sendView.y = height / 2;
        if (parentView) {
            parentView.addChild(target._sendView);
        }
    };
    //调整炮台倍率服务器返回
    BagMediator.prototype.changeGunBack = function (msg) {
        var type = msg.getType();
        var state = msg.getState();
        if (state != 1) {
            return;
        }
        var userModel = burn.Director.getModelByKey(UserModel);
        if (type != ChangeGunState.CHANGE_SKIN) {
            if (type == ChangeGunState.UNLOAD_ZUO) {
                userModel.setCurGunBgId(0);
                this.getView().setListData(userModel.getItemList());
            }
            return;
        }
        var skinId = msg.getSkinId();
        var vo = game.table.T_Item_Table.getVoByKey(skinId);
        if (vo.type == BagItemType.BATTERY) {
            userModel.setCurSkinId(skinId);
        }
        else if (vo.type == BagItemType.BARBETTE) {
            userModel.setCurGunBgId(skinId);
        }
        this.getView().setListData(userModel.getItemList());
    };
    BagMediator.prototype.findUserBack = function (msg) {
        //查无此人,userName放"";1:有这人，这时候userName是玩家name;
        if (msg.getState() != 0) {
            if (this._sendView) {
                var userName = msg.getReceiveUserName();
                this._sendView.sendGiveMes(userName);
            }
        }
        else {
            game.util.GameUtil.popTips(game.util.Language.getText(49));
        }
    };
    BagMediator.prototype.giveItemBack = function (msg) {
        //0;赠送方物品不足；1:赠送成功；2:接收方背包满了；3:赠送方赠送次数满了；4:接收方接收次数满了
        var state = msg.getState();
        if (state == SendItemState.SUC) {
            if (this._curGiveID != -1) {
                //扣东西 
                var item = new game.model.Item(this._curGiveID, this._curGiveNum);
                var userModel = burn.Director.getModelByKey(UserModel);
                userModel.updateItem(item.getItemId(), userModel.getItemById(item.getItemId()).getCount() - item.getCount());
                this.getView().initView(userModel.getItemList());
                //tips
                game.util.GameUtil.popTips(game.util.Language.getText(50));
            }
            else {
                //tips
                game.util.GameUtil.popTips(game.util.Language.getText(51));
            }
        }
        else {
            if (state == SendItemState.ITEM_NO_ENOUGH) {
                //tips
                game.util.GameUtil.popTips(game.util.Language.getText(52));
            }
            else if (state == SendItemState.USER_BAG_MAX) {
                //tips
                game.util.GameUtil.popTips(game.util.Language.getText(53));
            }
            else if (state == SendItemState.SEND_TIMES_MAX) {
                //tips
                game.util.GameUtil.popTips(game.util.Language.getText(54));
            }
            else if (state == SendItemState.USER_TIMES_MAX) {
                //tips
                game.util.GameUtil.popTips(game.util.Language.getText(55));
            }
            else if (state == SendItemState.CHARGE_NO_ENOUGH) {
                game.util.GameUtil.popTips(game.util.Language.getText(128));
            }
        }
    };
    /**
     * 跟进道具类型获取类型名称
     */
    BagMediator.prototype.getTypeNameByType = function (t) {
        switch (t) {
            case BagItemType.BASE:
                return "";
            case BagItemType.BATTERY:
                return game.util.Language.getText(16);
            case BagItemType.HAMMER:
                return game.util.Language.getText(17);
            case BagItemType.PROP_CARD:
                return game.util.Language.getText(18);
            case BagItemType.FISH_TICKET:
                return game.util.Language.getText(19);
            case BagItemType.WARHEAN:
                return game.util.Language.getText(20);
            case BagItemType.TEAM_PROP:
                return game.util.Language.getText(21);
            case BagItemType.FORGE_PROP:
                return game.util.Language.getText(22);
            case BagItemType.BARBETTE:
                return game.util.Language.getText(23);
            default: return "";
        }
    };
    BagMediator.prototype.destroy = function () {
        this.getView().destroy();
        this.unsubscribByType(NotifyEnum.CLICK_BAG_ITEM);
        this.unsubscribByType(NotifyEnum.SEND_ITEM_TO_USER);
        this.unsubscribByType(NotifyEnum.USE_ITEM_BY_BAG);
        this.unsubscribByType(NotifyEnum.GIVE_ITEM_DATA);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.GIVEITEMBACK);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.FINDUSERBACK);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.CHANGEGUNBACK);
    };
    return BagMediator;
}(burn.mediator.SimpleMediator));
__reflect(BagMediator.prototype, "BagMediator");
//# sourceMappingURL=BagMediator.js.map