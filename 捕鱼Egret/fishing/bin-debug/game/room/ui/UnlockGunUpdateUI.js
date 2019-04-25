var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
/**
 * 炮倍解锁功能
 */
var UnlockGunUpdateUI = (function (_super) {
    __extends(UnlockGunUpdateUI, _super);
    function UnlockGunUpdateUI(clazz) {
        var _this = _super.call(this) || this;
        _this.skinName = clazz;
        _this.isOpenGunUpdateGroup = false;
        _this.isCanUnlock = false;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.sendMsg, _this);
        _this.goldLab_num_1 = new egret.BitmapText();
        _this.goldLab_num_1.font = RES.getRes("bitmapNum_2_fnt");
        _this.goldLab_num_1.text = "1";
        _this.goldLab_num_1.scaleX = 0.5;
        _this.goldLab_num_1.scaleY = 0.5;
        _this.numGroup.addChild(_this.goldLab_num_1);
        _this.goldLab_num_1.textAlign = egret.HorizontalAlign.CENTER;
        _this.goldLab_num_1.anchorOffsetX = _this.goldLab_num_1.width / 2;
        _this.goldLab_num_1.anchorOffsetY = _this.goldLab_num_1.height / 2;
        _this.send.visible = false;
        _this.updateGunCost = new egret.BitmapText();
        _this.updateGunCost.font = RES.getRes("bitmapNum_4_fnt");
        _this.updateGunCost.text = "1";
        _this.updateGunCostGroup.addChild(_this.updateGunCost);
        _this.updateGunCost.textAlign = egret.HorizontalAlign.CENTER;
        _this.updateGunCost.anchorOffsetX = _this.updateGunCost.width / 2;
        _this.updateGunCost.anchorOffsetY = _this.updateGunCost.height / 2;
        return _this;
    }
    UnlockGunUpdateUI.prototype.sendMsg = function (evt) {
        if (!this.isCanUnlock) {
            var view1 = new UnlockGunView();
            var med = new UnlockGunMediator(view1);
            burn.Director.pushView(med);
            return;
        }
        var req = new UpgradeOrForgeSendMessage();
        req.initData();
        req.setType(GunUpdateType.UNLOCK);
        NetManager.send(req);
        //this.openGunUpdateGroup();
    };
    //设置解锁炮倍需要的
    UnlockGunUpdateUI.prototype.setUpdateGunNum = function (gunId, value, max) {
        //提示解锁炮倍的tislabel
        var arrName = new Array();
        var curGunRateVo = game.table.T_Gun_Table.getVoByKey(gunId + 1);
        if (!curGunRateVo) {
            return;
        }
        arrName.push(curGunRateVo.bulletNum + "");
        this.gunUpdateTips.text = game.util.Language.getDynamicText(24, arrName);
        //解锁炮倍的数字label
        this.updateGunCost.text = value + "/" + max;
        this.updateGunCost.anchorOffsetX = this.updateGunCost.width / 2;
        this.updateGunCost.anchorOffsetY = this.updateGunCost.height / 2;
        if (value >= max && max != 0) {
            this.isCanUnlock = true;
            this.send.visible = true;
            var gunRateVo = game.table.T_Gun_Table.getVoByKey(gunId);
            var str = gunRateVo.upgradeOrForgeAward;
            var data = str.split("_");
            var num = parseInt(data[1]);
            this.goldLab_num_1.text = "" + num;
            this.goldLab_num_1.anchorOffsetX = this.goldLab_num_1.width / 2;
            this.goldLab_num_1.anchorOffsetY = this.goldLab_num_1.height / 2;
            this.gunUpdateBg.visible = false;
            this.icon.visible = false;
            this.updateGunCost.visible = false;
            this.gunUpdateTips.visible = true;
        }
        else {
            this.gunUpdateBg.visible = true;
            this.icon.visible = true;
            this.send.visible = false;
            this.updateGunCost.visible = true;
            this.gunUpdateTips.visible = true;
            this.isCanUnlock = false;
        }
    };
    /**打开解锁炮倍界面 */
    UnlockGunUpdateUI.prototype.openGunUpdateGroup = function () {
        var self = this;
        var userModle = burn.Director.getModelByKey(UserModel);
        var gunRate = userModle.getCurGunID();
        var gunRateVo = game.table.T_Gun_Table.getVoByKey(gunRate);
        var bulletNum = game.table.T_Config_Table.getVoByKey(52).value;
        //30炮倍
        if (!this.gunUpdateBg.visible && gunRateVo.bulletNum <= Number(bulletNum)) {
            if (self.isOpenGunUpdateGroup) {
                this.checkEnough();
                return;
            }
            egret.Tween.removeTweens(self);
            self.scaleX = 0;
            self.x = 0;
            self.isOpenGunUpdateGroup = true;
            var tw = egret.Tween.get(this, { loop: false });
            tw.to({ scaleX: 1 }, 200).call(function () {
                egret.Tween.removeTweens(self);
            });
            return;
        }
        egret.Tween.removeTweens(self);
        if (self.isOpenGunUpdateGroup) {
            self.isOpenGunUpdateGroup = false;
            var tw = egret.Tween.get(this, { loop: false });
            tw.to({ scaleX: 0 }, 200).call(function () {
                egret.Tween.removeTweens(self);
                self.x = -400;
                self.scaleX = 1;
            });
        }
        else {
            self.scaleX = 0;
            self.x = 0;
            self.isOpenGunUpdateGroup = true;
            var tw = egret.Tween.get(this, { loop: false });
            tw.to({ scaleX: 1 }, 200).call(function () {
                egret.Tween.removeTweens(self);
            });
        }
        this.checkEnough();
    };
    /** 只能打开炮倍解锁 */
    UnlockGunUpdateUI.prototype.openGunUpdateGroupByEnough = function () {
        var self = this;
        if (self.isOpenGunUpdateGroup || self.scaleX == 1) {
            this.checkEnough();
            return;
        }
        egret.Tween.removeTweens(self);
        self.scaleX = 0;
        self.x = 0;
        self.isOpenGunUpdateGroup = true;
        var tw = egret.Tween.get(this, { loop: false });
        tw.to({ scaleX: 1 }, 200).call(function () {
            egret.Tween.removeTweens(self);
        });
        this.checkEnough();
    };
    /** 不能打开炮倍 */
    UnlockGunUpdateUI.prototype.openGunUpdateGroupByNoEnough = function () {
        var self = this;
        if (!self.isOpenGunUpdateGroup || self.scaleX == 0) {
            this.checkEnough();
            return;
        }
        egret.Tween.removeTweens(self);
        self.isOpenGunUpdateGroup = false;
        var tw = egret.Tween.get(this, { loop: false });
        tw.to({ scaleX: 0 }, 200).call(function () {
            egret.Tween.removeTweens(self);
            self.scaleX = 1;
            self.x = -400;
        });
        this.checkEnough();
    };
    /** 用引导打开 */
    UnlockGunUpdateUI.prototype.openGunUpdateByGuide = function () {
        var self = this;
        egret.Tween.removeTweens(self);
        self.scaleX = 0;
        self.x = 0;
        self.isOpenGunUpdateGroup = true;
        var tw = egret.Tween.get(this, { loop: false });
        tw.to({ scaleX: 1 }, 200).call(function () {
            egret.Tween.removeTweens(self);
        });
        //造假
        var hintChild = this.root.getChildByName("hint_effect");
        if (!hintChild) {
            var hint = new egret.Bitmap(RES.getRes("ef_lottery_hint_png"));
            hint.name = "hint_effect";
            hint.anchorOffsetX = 0;
            hint.anchorOffsetY = hint.height / 2;
            hint.width = 272;
            hint.height = 94;
            hint.x = 12;
            hint.y = hint.height / 2 - 1;
            hint.blendMode = egret.BlendMode.ADD;
            self.root.addChild(hint);
        }
        this.checkEnough();
    };
    UnlockGunUpdateUI.prototype.checkEnough = function () {
        var userModle = burn.Director.getModelByKey(UserModel);
        var userId = userModle.getUserId();
        var gunRate = userModle.getCurGunID();
        var gunRateVo = game.table.T_Gun_Table.getVoByKey(gunRate);
        var bEnough = true;
        if (gunRateVo) {
            var arr = gunRateVo.upgradeOrForgeCost;
            var arrData = arr.split(",");
            var nEnoughNum = 0;
            var nCurNum = 0;
            if (arrData.length > 1) {
                bEnough = false;
                return;
            }
            for (var i = 0; i < 1; i++) {
                var item = arrData[i];
                var arrStr = item.split("_");
                var id = parseInt(arrStr[0]);
                var num = parseInt(arrStr[1]);
                var itemObj = new game.model.Item(id, 0);
                nEnoughNum = num;
                nCurNum = userModle.getMoney();
                if (nCurNum < num) {
                    bEnough = false;
                    break;
                }
            }
        }
        if (bEnough) {
            var hintChild = this.root.getChildByName("hint_effect");
            if (!hintChild) {
                var hint = new egret.Bitmap(RES.getRes("ef_lottery_hint_png"));
                hint.name = "hint_effect";
                hint.anchorOffsetX = 0;
                hint.anchorOffsetY = hint.height / 2;
                hint.width = 272;
                hint.height = 94;
                hint.x = 12;
                hint.y = hint.height / 2 - 1;
                hint.blendMode = egret.BlendMode.ADD;
                this.root.addChild(hint);
                burn.tools.TweenTools.showOutAndIn(hint, 1500);
            }
        }
        else {
            var hintChild = this.root.getChildByName("hint_effect");
            if (hintChild) {
                this.root.removeChild(hintChild);
            }
        }
    };
    UnlockGunUpdateUI.prototype.destory = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendMsg, this);
    };
    return UnlockGunUpdateUI;
}(eui.Component));
__reflect(UnlockGunUpdateUI.prototype, "UnlockGunUpdateUI");
//# sourceMappingURL=UnlockGunUpdateUI.js.map