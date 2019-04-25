var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/** 活动类型3 */
var Active3Item = (function (_super) {
    __extends(Active3Item, _super);
    function Active3Item() {
        var _this = _super.call(this) || this;
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_3.exml";
        _this.anchorOffsetX = _this.width / 2;
        _this.anchorOffsetY = _this.height / 2;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_3Item.exml", function () {
            _this.setList();
        }, _this);
        return _this;
    }
    Active3Item.prototype.setList = function () {
        var activeModel = burn.Director.getModelByKey(ActiveModel);
        var type = Active_Type.LIMIT_TIME_ACTIVE_TYPE_VIP_SEND;
        var itemActive = activeModel.getActiveObjByType(type);
        var dataActive = activeModel.getActiveDataById(itemActive._id);
        //活动时间 
        this.desc.text = game.util.Language.getText(186) + game.util.TimeUtil.getActiveTime(itemActive._startTime, itemActive._endTime);
        this.listGroup.removeChildren();
        //limitAcitveAward 10001_10,10002_10
        var userModel = burn.Director.getModelByKey(UserModel);
        var curVip = userModel.getVipLevel();
        var vos = game.table.T_VipLevel_Table.getAllVo();
        var len = vos.length;
        for (var i = 1; i < len; i++) {
            var item = new Active3ItemCom();
            var str = vos[i].limitAcitveAward.split(",");
            var data = str[0].split("_");
            var isCur = false;
            if (curVip == vos[i].vipLevel) {
                isCur = true;
            }
            item.setData(Number(data[0]), Number(data[1]), vos[i].vipLevel, isCur);
            this.listGroup.addChild(item);
        }
        var tLayout = new eui.TileLayout();
        tLayout.paddingTop = 10;
        tLayout.paddingLeft = 20;
        tLayout.paddingRight = 20;
        tLayout.horizontalGap = 23;
        this.listGroup.layout = tLayout; /// 网格布局
        var state = dataActive._state;
        var gainBtn = new burn.tools.UIWrap(this.gainGroup);
        if (state == Active_State.LIMIT_TIME_ACTIVE_STATE_RECEIVED) {
            var colorFlilter = new egret.ColorMatrixFilter(game.util.FilterEnmu.DARK);
            this.gainGroup.filters = [colorFlilter];
            this.yilingqu.visible = true;
            this.toGain.visible = false;
        }
        this._state = state;
        this._id = itemActive._id;
        //vip不够。不发消息
        this.gainGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        }, this);
    };
    Active3Item.prototype.onClick = function () {
        if (this._state == Active_State.LIMIT_TIME_ACTIVE_STATE_INIT) {
            var send = new LimitedTimeActiveSendMessage();
            send.initData();
            send.setId(this._id);
            send.setState(1);
            NetManager.send(send);
        }
        else if (this._state == Active_State.LIMIT_TIME_ACTIVE_STATE_RECEIVED) {
            //提示 已经领取过
            game.util.GameUtil.popTips(game.util.Language.getText(182));
        }
    };
    Active3Item.prototype.destory = function () {
        this.gainGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    return Active3Item;
}(ComponetBase));
__reflect(Active3Item.prototype, "Active3Item");
var Active3ItemCom = (function (_super) {
    __extends(Active3ItemCom, _super);
    function Active3ItemCom() {
        var _this = _super.call(this) || this;
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_3Item.exml";
        _this.anchorOffsetX = _this.width / 2;
        _this.anchorOffsetY = _this.height / 2;
        return _this;
    }
    Active3ItemCom.prototype.setData = function (id, num, viplv, isCur) {
        var self = this;
        game.util.IconUtil.getIconByIdAsync(IconType.PROP, id, function (icon) {
            if (!icon) {
                return;
            }
            icon.width = 70;
            icon.height = 70;
            icon.anchorOffsetX = icon.width / 2;
            icon.anchorOffsetY = icon.height / 2;
            icon.x = self.itemBg.width / 2;
            icon.y = self.itemBg.height / 2;
            self.itemBg.addChild(icon);
        });
        this.countTxt.text = "x" + num;
        //vip信息
        this.vipLv.text = "VIP" + viplv;
        if (isCur) {
            this.unSel.visible = false;
        }
    };
    return Active3ItemCom;
}(eui.Component));
__reflect(Active3ItemCom.prototype, "Active3ItemCom");
//# sourceMappingURL=Active3Item.js.map