var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 背包界面view
 */
var BagView = (function (_super) {
    __extends(BagView, _super);
    function BagView() {
        var _this = _super.call(this) || this;
        _this._bPop = false;
        game.util.UIUtil.startLoading();
        _this._nCurID = -1;
        return _this;
    }
    BagView.prototype.initView = function (list) {
        //this.loadComplete
        var self = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/BagUI.exml", function (clazz, url) {
            self.loadComplete(clazz, url, list);
        }, this);
        this._btnWrapList = new Array();
        this._itemList = new Array();
    };
    BagView.prototype.loadComplete = function (clazz, url, list) {
        var _this = this;
        game.util.UIUtil.closeLoading();
        this.removeChildren();
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        //添加操作UI
        var uiObj = new BagViewUI();
        this._bagUI = uiObj;
        this._bagUI.skinName = clazz;
        this._bagUI.horizontalCenter = 0;
        this._bagUI.verticalCenter = 0;
        uiLayer.addChild(this._bagUI);
        if (!this._bPop) {
            game.util.UIUtil.popView(this._bagUI.root);
            this._bPop = true;
        }
        //添加关闭按钮事件
        this._bagUI.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseEvent, this);
        this._bagUI.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchSendBtnEvent, this);
        this._bagUI.useBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchUseBtnEvent, this);
        this._bagUI.equipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.equipBtnEvent, this);
        this._bagUI.renewBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.renewBtnEvent, this);
        this._bagUI.unloadBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.unloadBtnEvent, this);
        //封装按钮状态功能
        this._btnWrapList.push(new burn.tools.UIWrap(this._bagUI.closeBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._bagUI.useBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._bagUI.splitBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._bagUI.sendBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._bagUI.equipBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._bagUI.renewBtn));
        //图片旋转特效
        burn.tools.TweenTools.rotation(this._bagUI.bgsun, 4000);
        this._bagUI.itemDesTxt.text = "";
        this._bagUI.itemNameTxt.text = "";
        this._bagUI.itemTypeTxt.text = "";
        this._bagUI.itemCountTxt.text = "";
        this._bagUI.sendBtn.visible = false;
        this._bagUI.useBtn.visible = false;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml", function () {
            _this.setListData(list);
        }, this);
    };
    BagView.prototype.setListData = function (newList) {
        var list = new Array();
        var len = newList.length;
        for (var i = 0; i < len; i++) {
            if (newList[i].getCount() == 0) {
                continue;
            }
            if (newList[i].getItemId() == PropEnum.FREE_RAGE) {
                continue;
            }
            if (newList[i].getItemId() == PropEnum.FREE_CLONE) {
                continue;
            }
            list.push(newList[i]);
        }
        var selectId = -1;
        if (this._nCurID != -1) {
            selectId = this._nCurID;
        }
        var newTempList = new Array();
        len = list.length;
        for (var i = 0; i < len; i++) {
            if (list[i].getCount() == 0) {
                continue;
            }
            newTempList.push(list[i]);
        }
        var self = this;
        self._bagUI.scrollerGroup.removeChildren();
        var num = 0;
        if (newTempList.length > 16) {
            num = Math.floor(newTempList.length / 4) + 1;
        }
        else {
            num = Math.floor(newTempList.length / 4);
        }
        num *= 4;
        if (num < 16) {
            num = 16;
        }
        //初始化背包列表
        for (var i = 0; i < num; i++) {
            var item = null;
            if (i >= newTempList.length) {
                item = new BagViewItem(0, 0, false);
                item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml";
                item.scaleX = item.scaleY = 0.95;
                item.setNull();
            }
            else {
                if (i == 0 && selectId == -1) {
                    item = new BagViewItem(newTempList[i].getItemId(), newTempList[i].getCount(), true);
                    item.name = newTempList[i].getItemId() + "";
                    item.scaleX = item.scaleY = 0.95;
                    item.init();
                    self.send(NotifyEnum.CLICK_BAG_ITEM, item.getItemId());
                }
                else if (selectId != -1 && newTempList[i].getItemId() == selectId) {
                    item = new BagViewItem(newTempList[i].getItemId(), newTempList[i].getCount(), false);
                    item.name = newTempList[i].getItemId() + "";
                    item.scaleX = item.scaleY = 0.95;
                    item.init();
                    self.send(NotifyEnum.CLICK_BAG_ITEM, item.getItemId());
                }
                else {
                    item = new BagViewItem(newTempList[i].getItemId(), newTempList[i].getCount(), false);
                    item.name = newTempList[i].getItemId() + "";
                    item.scaleX = item.scaleY = 0.95;
                    item.init();
                }
                //为item添加事件
                item.addEventListener(egret.TouchEvent.TOUCH_END, this.touchItemEvent, this);
            }
            this._bagUI.scrollerGroup.addChild(item);
            this._itemList.push(item);
        }
        var tLayout = new eui.TileLayout();
        tLayout.paddingTop = 10;
        tLayout.paddingLeft = 0;
        tLayout.paddingRight = 0;
        tLayout.paddingBottom = 20;
        self._bagUI.scrollerGroup.layout = tLayout; /// 网格布局
    };
    BagView.prototype.touchItemEvent = function (e) {
        var name = e.currentTarget.name;
        for (var i = 0; i < this._itemList.length; i++) {
            if (name == this._itemList[i].name) {
                this._nCurID = this._itemList[i].getItemId();
                this._itemList[i].selected(true);
                this.send(NotifyEnum.CLICK_BAG_ITEM, this._itemList[i].getItemId());
            }
            else {
                this._itemList[i].selected(false);
            }
        }
    };
    //设置左侧面板信息
    BagView.prototype.setLeftMsg = function (itemName, itemType, itemCount, itemDes, itemVo) {
        this._bagUI.itemDesTxt.text = itemDes;
        this._bagUI.itemNameTxt.text = itemName;
        this._bagUI.itemTypeTxt.text = itemType;
        this._bagUI.itemCountTxt.text = itemCount;
        //itemVo
        var userModel = burn.Director.getModelByKey(UserModel);
        var obj = userModel.getItemById(itemVo.id);
        var btnArr = new Array();
        if (itemVo.everyTimeLimit && itemVo.everyTimeLimit > 0) {
            this._bagUI.sendBtn.visible = true;
            btnArr.push(this._bagUI.sendBtn);
            this._bagUI.sendBtn.name = itemVo.id + "";
        }
        else {
            this._bagUI.sendBtn.visible = false;
        }
        //如果是锻造
        if (itemVo.type == BagItemType.FORGE_PROP) {
            this._bagUI.useBtn.visible = true;
            btnArr.push(this._bagUI.useBtn);
            this._bagUI.useBtn.name = itemVo.id + "";
        }
        else {
            this._bagUI.useBtn.visible = false;
        }
        //炮台炮座
        if (itemVo.type == BagItemType.BATTERY
            || itemVo.type == BagItemType.BARBETTE) {
            var item = userModel.getItemById(itemVo.id);
            if ((item.isAct() && userModel.getCurSkinId() == itemVo.id)
                || (item.isAct() && userModel.getCurGunBgId() == itemVo.id)) {
                if (item.isAct() && userModel.getCurGunBgId() == itemVo.id) {
                    this._bagUI.unloadBtn.visible = true;
                    btnArr.push(this._bagUI.unloadBtn);
                    this._bagUI.unloadBtn.name = itemVo.id + "";
                    this._bagUI.equipBtn.visible = false;
                    this._bagUI.renewBtn.visible = false;
                }
                else {
                    if (item.getTime() > 0) {
                        this._bagUI.renewBtn.visible = true;
                        btnArr.push(this._bagUI.renewBtn);
                        this._bagUI.renewBtn.name = itemVo.id + "";
                        this._bagUI.equipBtn.visible = false;
                        this._bagUI.unloadBtn.visible = false;
                    }
                }
            }
            else if (item.isAct()) {
                this._bagUI.equipBtn.visible = true;
                btnArr.push(this._bagUI.equipBtn);
                this._bagUI.equipBtn.name = itemVo.id + "";
                this._bagUI.renewBtn.visible = false;
                this._bagUI.unloadBtn.visible = false;
            }
            else {
                this._bagUI.renewBtn.visible = true;
                btnArr.push(this._bagUI.renewBtn);
                this._bagUI.renewBtn.name = itemVo.id + "";
                this._bagUI.equipBtn.visible = false;
                this._bagUI.unloadBtn.visible = false;
            }
            //添加时间
            var endTime = item.getTime();
            if (endTime) {
                var residue = endTime - game.util.TimeUtil.getCurrTime();
                var expire = Math.floor(residue / (60 * 60 * 24));
                if (expire < 0) {
                    expire = 0;
                }
                this._bagUI.itemCountTxt.text = game.util.Language.getText(194) + expire;
            }
        }
        else {
            this._bagUI.renewBtn.visible = false;
            this._bagUI.equipBtn.visible = false;
        }
        //iconGroup
        this._bagUI.iconGroup.removeChildren();
        var self = this;
        game.util.IconUtil.getIconByIdAsync(IconType.PROP, itemVo.id, function (icon) {
            if (!icon) {
                return;
            }
            icon.anchorOffsetX = icon.width / 2;
            icon.anchorOffsetY = icon.height / 2;
            icon.scaleX = 1.5;
            icon.scaleY = 1.5;
            icon.x = self._bagUI.iconGroup.width / 2;
            icon.y = self._bagUI.iconGroup.height / 2;
            self._bagUI.iconGroup.addChild(icon);
        });
        this._bagUI.splitBtn.visible = false;
        if (btnArr.length == 1) {
            btnArr[0].x = 194;
        }
        else if (btnArr.length == 2) {
            btnArr[0].x = 130;
            btnArr[1].x = 254;
        }
        else if (btnArr.length == 3) {
            btnArr[0].x = 69;
            btnArr[1].x = 194;
            btnArr[1].x = 318;
        }
    };
    //歇下
    BagView.prototype.unloadBtnEvent = function (e) {
        var name = e.currentTarget.name;
        var send = new ChangeGunSendMessage();
        send.initData();
        send.setType(ChangeGunState.UNLOAD_ZUO);
        send.setSkinId(Number(name));
        NetManager.send(send);
    };
    //续费
    BagView.prototype.renewBtnEvent = function (e) {
        var name = e.currentTarget.name;
        var vos = game.table.T_Shop_Table.getAllVo();
        var len = vos.length;
        var itemId = Number(name);
        var idShop = -1;
        for (var i = 0; i < len; i++) {
            if (vos[i].itemId == itemId) {
                idShop = vos[i].id;
                break;
            }
        }
        var msg = new ShopBuyMessage();
        msg.initData();
        msg.setShopId(idShop);
        NetManager.send(msg);
    };
    //装备按钮的监听
    BagView.prototype.equipBtnEvent = function (e) {
        var name = e.currentTarget.name;
        var send = new ChangeGunSendMessage();
        send.initData();
        send.setType(ChangeGunState.CHANGE_SKIN);
        send.setSkinId(Number(name));
        NetManager.send(send);
    };
    //使用按钮的监听
    BagView.prototype.touchUseBtnEvent = function (e) {
        var name = e.currentTarget.name;
        this.send(NotifyEnum.USE_ITEM_BY_BAG, name);
    };
    //赠送按钮的监听
    BagView.prototype.touchSendBtnEvent = function (e) {
        var name = e.currentTarget.name;
        this.send(NotifyEnum.SEND_ITEM_TO_USER, name);
    };
    /** 关闭界面按钮事件 */
    BagView.prototype.onCloseEvent = function (e) {
        burn.Director.popView();
    };
    /** 消耗UI */
    BagView.prototype.destroy = function () {
        var self = this;
        this._bPop = false;
        //关闭UI动画
        game.util.UIUtil.closeView(this._bagUI.root, function () {
            //移除按钮封装
            while (self._btnWrapList.length > 0) {
                var wrap = self._btnWrapList.pop();
                wrap.destroy();
            }
            self._bagUI.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onCloseEvent, self);
            self._bagUI.sendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.touchSendBtnEvent, self);
            self._bagUI.useBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.touchUseBtnEvent, self);
            self._bagUI.equipBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.equipBtnEvent, self);
            self._bagUI.renewBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.renewBtnEvent, self);
            self._bagUI.unloadBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.unloadBtnEvent, self);
            self.parent.removeChild(self);
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/BagUI.exml");
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml");
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/SendUI.exml");
        });
    };
    return BagView;
}(burn.view.FullView));
__reflect(BagView.prototype, "BagView");
var BagViewUI = (function (_super) {
    __extends(BagViewUI, _super);
    function BagViewUI() {
        return _super.call(this) || this;
    }
    return BagViewUI;
}(eui.Component));
__reflect(BagViewUI.prototype, "BagViewUI");
//# sourceMappingURL=BagView.js.map