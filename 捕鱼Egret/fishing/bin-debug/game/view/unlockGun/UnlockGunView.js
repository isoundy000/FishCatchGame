var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UnlockGunView = (function (_super) {
    __extends(UnlockGunView, _super);
    function UnlockGunView(bShow) {
        if (bShow === void 0) { bShow = false; }
        var _this = _super.call(this) || this;
        _this._bPop = false;
        _this._bShow = bShow;
        _this._btnWrapList = new Array();
        game.util.UIUtil.startLoading();
        return _this;
    }
    UnlockGunView.prototype.addBgResource = function (clazz, url) {
        game.util.UIUtil.closeLoading();
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new UnLockGunCom();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = clazz;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        if (!this._bPop) {
            game.util.UIUtil.popView(this._uiDisplay.root);
            this._bPop = true;
            var self_1 = this;
            setTimeout(function () {
                burn.tools.TweenTools.hopOnce(self_1._uiDisplay.suo_0, 0.05, 250);
                burn.tools.TweenTools.hopOnce(self_1._uiDisplay.suo_1, 0.05, 250);
                burn.tools.TweenTools.hopOnce(self_1._uiDisplay.suo_2, 0.05, 250);
            }, 1000);
        }
        //关闭当前界面
        var closeBtn = this._uiDisplay.btnClose;
        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        //封装按钮
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnClose));
        this.setData();
    };
    //设置内容
    UnlockGunView.prototype.setData = function () {
        var userModel = burn.Director.getModelByKey(UserModel);
        var curId = userModel.getCurGunID();
        var gunCurRateVo = game.table.T_Gun_Table.getVoByKey(curId + 1);
        this._uiDisplay.curRateLab.text = gunCurRateVo.bulletNum + "";
        var unlockAwardStr = gunCurRateVo.upgradeOrForgeAward.split("_");
        this._uiDisplay.zengLab.text = unlockAwardStr[1] + "";
        var gunLast1RateVo = game.table.T_Gun_Table.getVoByKey(curId);
        var unlockCostStr = gunLast1RateVo.upgradeOrForgeCost.split("_");
        this._uiDisplay.curRateLab.textAlign = egret.HorizontalAlign.CENTER;
        this._uiDisplay.zengLab.textAlign = egret.HorizontalAlign.CENTER;
        this._uiDisplay.zengLab0.textAlign = egret.HorizontalAlign.CENTER;
        this._uiDisplay.zengLab0.text = unlockCostStr[1] + "";
        if (gunLast1RateVo) {
            this._uiDisplay.lastRate_0.textAlign = egret.HorizontalAlign.CENTER;
            this._uiDisplay.lastRate_0.text = gunLast1RateVo.bulletNum + "";
        }
        else {
            this._uiDisplay.last_0.visible = false;
        }
        var gunLast2RateVo = game.table.T_Gun_Table.getVoByKey(curId - 1);
        if (gunLast2RateVo) {
            this._uiDisplay.lastRate_1.textAlign = egret.HorizontalAlign.CENTER;
            this._uiDisplay.lastRate_1.text = gunLast2RateVo.bulletNum + "";
        }
        else {
            this._uiDisplay.last_1.visible = false;
        }
        var gunNext1RateVo = game.table.T_Gun_Table.getVoByKey(curId + 2);
        if (gunNext1RateVo) {
            this._uiDisplay.nextRate_0.textAlign = egret.HorizontalAlign.CENTER;
            this._uiDisplay.nextRate_0.text = gunNext1RateVo.bulletNum + "";
        }
        else {
            this._uiDisplay.next_0.visible = false;
        }
        var gunNext2RateVo = game.table.T_Gun_Table.getVoByKey(curId + 3);
        if (gunNext2RateVo) {
            this._uiDisplay.nextRate_1.textAlign = egret.HorizontalAlign.CENTER;
            this._uiDisplay.nextRate_1.text = gunNext2RateVo.bulletNum + "";
        }
        else {
            this._uiDisplay.next_1.visible = false;
        }
        burn.tools.TweenTools.showOutAndIn(this._uiDisplay.select, 1500);
        this.showGun(userModel.getCurSkinId());
        this._uiDisplay.cur.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tipCharge, this);
    };
    UnlockGunView.prototype.showGun = function (nId) {
        var self = this;
        RES.getResAsync("goodsicon_" + nId + "_png", function () {
            var icon1 = new egret.Bitmap(RES.getRes("goodsicon_" + nId + "_png"));
            var icon2 = new egret.Bitmap(RES.getRes("goodsicon_" + nId + "_png"));
            var icon3 = new egret.Bitmap(RES.getRes("goodsicon_" + nId + "_png"));
            var icon4 = new egret.Bitmap(RES.getRes("goodsicon_" + nId + "_png"));
            var icon5 = new egret.Bitmap(RES.getRes("goodsicon_" + nId + "_png"));
            icon1.anchorOffsetX = icon2.anchorOffsetX = icon3.anchorOffsetX = icon4.anchorOffsetX = icon5.anchorOffsetX = icon1.width / 2;
            icon1.anchorOffsetY = icon2.anchorOffsetY = icon3.anchorOffsetY = icon4.anchorOffsetY = icon5.anchorOffsetY = icon1.height / 2;
            self._uiDisplay.icon_0.addChild(icon1);
            self._uiDisplay.iconLast_0.addChild(icon2);
            self._uiDisplay.iconLast_1.addChild(icon3);
            self._uiDisplay.iconNext_0.addChild(icon4);
            self._uiDisplay.iconNext_1.addChild(icon5);
        }, this);
    };
    /** 弹充值 */
    UnlockGunView.prototype.tipCharge = function (e) {
        burn.Director.popView();
        this.send(NotifyEnum.POP_CHARGE, { type: ChargeType.Gem });
    };
    /**关闭游戏 */
    UnlockGunView.prototype.onClosttButtonClick = function (e) {
        burn.Director.popView();
    };
    UnlockGunView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/unlockGun/UnlockGunUI.exml", this.addBgResource, this);
    };
    UnlockGunView.prototype.destroy = function () {
        var self = this;
        this._bPop = false;
        //关闭UI动画
        game.util.UIUtil.closeView(this._uiDisplay.root, function () {
            //移除按钮封装
            while (self._btnWrapList.length > 0) {
                var wrap = self._btnWrapList.pop();
                wrap.destroy();
            }
            self._uiDisplay.cur.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.tipCharge, self);
            self._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
            self.parent.removeChild(self);
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/unlockGun/UnlockGunUI.exml");
        });
    };
    return UnlockGunView;
}(burn.view.PopView));
__reflect(UnlockGunView.prototype, "UnlockGunView");
/***操作UI的对应类 */
var UnLockGunCom = (function (_super) {
    __extends(UnLockGunCom, _super);
    function UnLockGunCom() {
        return _super.call(this) || this;
    }
    return UnLockGunCom;
}(eui.Component));
__reflect(UnLockGunCom.prototype, "UnLockGunCom");
//# sourceMappingURL=UnlockGunView.js.map