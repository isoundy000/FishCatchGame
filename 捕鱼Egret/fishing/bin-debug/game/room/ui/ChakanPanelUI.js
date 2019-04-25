var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//ChakanPanelUI
var ChakanPanelUI = (function (_super) {
    __extends(ChakanPanelUI, _super);
    function ChakanPanelUI() {
        var _this = _super.call(this) || this;
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/ChakanPanel.exml";
        _this.mine.cacheAsBitmap = true;
        _this.other.touchEnabled = false;
        _this.emoji.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.shouTips, _this);
        _this.chat.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.shouTips, _this);
        _this.change.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.shouTips, _this);
        _this.auto.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.shouTips, _this);
        _this._btnWrapList = new Array();
        _this._btnWrapList.push(new burn.tools.UIWrap(_this.change));
        _this._btnWrapList.push(new burn.tools.UIWrap(_this.auto));
        return _this;
    }
    ChakanPanelUI.prototype.shouTips = function (evt) {
        if (this.auto == evt.target) {
            if (CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
                burn._Notification_.send(NotifyEnum.SHOW_CHAKAN_PANEL);
                burn._Notification_.send(NotifyEnum.AUTO_GUN_FIRE);
                return;
            }
            var userModel = burn.Director.getModelByKey(UserModel);
            var monthCardTime = userModel.getMonthEndTime() - game.util.TimeUtil.getCurrTime();
            //monthCardTime = 1000*60*60*24*7;
            if (userModel.getTatolChargeRMB() <= 0) {
                game.util.GameUtil.popTips(game.util.Language.getText(143));
                //弹出月卡
                var firstChargeView = new FirstChargeView();
                var firstChargeMed = new FirstChargeMediator(firstChargeView);
                burn.Director.pushView(firstChargeMed);
                return;
            }
            burn._Notification_.send(NotifyEnum.SHOW_CHAKAN_PANEL);
            burn._Notification_.send(NotifyEnum.AUTO_GUN_FIRE);
        }
        else if (this.change == evt.target) {
            var changeGunView = new ChangeGunView();
            var changeGunMed = new ChangeGunMediator(changeGunView);
            burn.Director.pushView(changeGunMed);
        }
        else {
            game.util.GameUtil.popTips(game.util.Language.getText(47));
        }
    };
    ChakanPanelUI.prototype.setMine = function () {
        this.mine.visible = true;
        this.other.visible = false;
        // let arr = new Array<eui.Button>();
        // arr.push(this.auto);
        // arr.push(this.change);
        //arr.push(this.chat);
        //arr.push(this.emoji);
        //game.util.GameUtil.playChakanAction(arr);
        var self = this;
        var tw = egret.Tween.get(this.change, { loop: false });
        var oldX = this.change.x;
        this.change.scaleX = 0;
        this.change.scaleY = 0;
        this.change.x = this.width / 2;
        tw.to({ x: 60, y: 140, scaleX: 1, scaleY: 1 }, 350, egret.Ease.backOut)
            .call(function () {
            egret.Tween.removeTweens(self.change);
        });
        var tw1 = egret.Tween.get(this.auto, { loop: false });
        var oldX1 = this.auto.x;
        this.auto.scaleX = 0;
        this.auto.scaleY = 0;
        this.auto.x = this.width / 2;
        tw1.to({ x: 240, y: 148, scaleX: 1, scaleY: 1 }, 350, egret.Ease.backOut)
            .call(function () {
            egret.Tween.removeTweens(self.auto);
        });
        burn._Notification_.send(NotifyEnum.AUTO_GUN_FIRE, 1);
    };
    ChakanPanelUI.prototype.setOther = function (isFlip, roomer) {
        this.mine.visible = false;
        this.other.visible = true;
        if (isFlip) {
            this.di.rotation = 0;
        }
        else {
            this.di.rotation = 180;
        }
        if (roomer) {
            var name_1 = roomer.getName();
            var lv = roomer.getLv();
            //nameLab
            var str = name_1;
            this.nameLab.text = str;
            this.lvLab.text = " Lv." + lv;
        }
        var skinId = roomer.getCurSkinId();
        var vo = game.table.T_Item_Table.getVoByKey(skinId);
        this.gun.text = game.util.Language.getText(vo.name);
    };
    /** 销毁函数 */
    ChakanPanelUI.prototype.destroy = function () {
        this.emoji.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.shouTips, this);
        this.chat.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.shouTips, this);
        this.change.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.shouTips, this);
        this.auto.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.shouTips, this);
    };
    return ChakanPanelUI;
}(eui.Component));
__reflect(ChakanPanelUI.prototype, "ChakanPanelUI");
//# sourceMappingURL=ChakanPanelUI.js.map