var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChangeGunItemItem = (function (_super) {
    __extends(ChangeGunItemItem, _super);
    function ChangeGunItemItem() {
        var _this = _super.call(this) || this;
        _this._btnWrapList = new Array();
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/changeGun/ChangeGunItem.exml";
        return _this;
    }
    ChangeGunItemItem.prototype.setData = function (data) {
        var vo = data.getVO();
        var voGun = game.table.T_Gun_skin_Table.getVoByKey(vo.id);
        var state = data.getState();
        this._state = state;
        this._id = vo.id;
        var self = this;
        game.util.IconUtil.getIconByIdAsync(IconType.PAO, vo.id, function (icon) {
            if (icon) {
                icon.anchorOffsetX = icon.width / 2;
                icon.anchorOffsetY = icon.height / 2;
                self.iconGroup.addChild(icon);
            }
        });
        this.nameLab.text = game.util.Language.getText(vo.name);
        var star = voGun.star;
        for (var i = 5; i > star; i--) {
            this.starGroup.getChildByName("star_" + i).visible = false;
        }
        switch (state) {
            case GunState.UnGain:
                this.getGroup.visible = true;
                this.getGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchItemEvent, this);
                this._btnWrapList.push(new burn.tools.UIWrap(this.getGroup));
                this.lock.visible = true;
                break;
            case GunState.UnAct:
                this.renewGroup.visible = true;
                this._btnWrapList.push(new burn.tools.UIWrap(this.renewGroup));
                this.renewGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchItemEvent, this);
                break;
            case GunState.Equip:
                this.euipedGroup.visible = true;
                this._btnWrapList.push(new burn.tools.UIWrap(this.euipedGroup));
                break;
            case GunState.Act:
                this.equipGroup.visible = true;
                this._btnWrapList.push(new burn.tools.UIWrap(this.equipGroup));
                this.equipGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchItemEvent, this);
                break;
        }
        if (this.isContainedVip()) {
            this.vip.visible = true;
            this.vipLv.textAlign = egret.HorizontalAlign.CENTER;
            this.vipLv.text = this.getCotainedVipLv() + "";
        }
        else {
            this.vip.visible = false;
        }
    };
    ChangeGunItemItem.prototype.touchItemEvent = function (e) {
        switch (this._state) {
            case GunState.UnGain:
                burn.Director.popView();
                if (this.isContainedVip()) {
                    var view = new VipView();
                    var med = new VipMediator(view);
                    burn.Director.pushView(med);
                }
                else {
                    var itemShopView = new ItemShopView();
                    var itemShopMed = new ItemShopMediator(itemShopView);
                    burn.Director.pushView(itemShopMed);
                }
                break;
            case GunState.UnAct:
                burn.Director.popView();
                if (this.isContainedVip()) {
                    var view = new VipView();
                    var med = new VipMediator(view);
                    burn.Director.pushView(med);
                }
                else {
                    var itemShopView = new ItemShopView();
                    var itemShopMed = new ItemShopMediator(itemShopView);
                    burn.Director.pushView(itemShopMed);
                }
                break;
            case GunState.Equip:
                break;
            case GunState.Act:
                var send = new ChangeGunSendMessage();
                send.initData();
                send.setType(ChangeGunState.CHANGE_SKIN);
                send.setSkinId(Number(this._id));
                NetManager.send(send);
                break;
        }
    };
    ChangeGunItemItem.prototype.isContainedVip = function () {
        var vipVos = game.table.T_VipLevel_Table.getAllVo();
        var len = vipVos.length;
        for (var i = 0; i < len; i++) {
            var voVip = vipVos[i];
            if (voVip.levelUpAward != "0") {
                var datas = voVip.levelUpAward.split("_");
                var gunId = Number(datas[0]);
                if (this._id == gunId) {
                    return true;
                }
            }
        }
        return false;
    };
    ChangeGunItemItem.prototype.getCotainedVipLv = function () {
        var vipVos = game.table.T_VipLevel_Table.getAllVo();
        var len = vipVos.length;
        for (var i = 0; i < len; i++) {
            var voVip = vipVos[i];
            if (voVip.levelUpAward != "0") {
                var datas = voVip.levelUpAward.split("_");
                var gunId = Number(datas[0]);
                if (this._id == gunId) {
                    return voVip.vipLevel + 1;
                }
            }
        }
        return 0;
    };
    ChangeGunItemItem.prototype.clearItem = function () {
        //移除按钮封装
        while (this._btnWrapList.length > 0) {
            var wrap = this._btnWrapList.pop();
            wrap.destroy();
        }
        this.getGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchItemEvent, this);
        this.renewGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchItemEvent, this);
        this.equipGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchItemEvent, this);
    };
    return ChangeGunItemItem;
}(eui.Component));
__reflect(ChangeGunItemItem.prototype, "ChangeGunItemItem");
//# sourceMappingURL=ChangeGunItem.js.map