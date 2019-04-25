var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        //tips下标
        _this._tipsIdx = 0;
        return _this;
    }
    LoadingUI.prototype.initView = function () {
        // CONFIG.adaptX = (this.stage.stageWidth - CONFIG.contentWidth) >> 1;
        // CONFIG.adaptY = (this.stage.stageHeight - CONFIG.contentHeight) >> 1;
        var self = this;
        var bg = new egret.Bitmap(RES.getRes("loading_jpg"));
        this.addChildAt(bg, 0);
        bg.x = CONFIG.adaptX;
        bg.y = CONFIG.adaptY;
        var uiLayer = new eui.UILayer();
        this.addChildAt(uiLayer, 2);
        this._loadingUI = new FishLoadingUI();
        this._loadingUI.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Loading.exml";
        this._loadingUI.horizontalCenter = 0;
        this._loadingUI.verticalCenter = 0;
        uiLayer.addChild(this._loadingUI);
        if (GlobalManager.isFirstOpenGame) {
            GlobalManager.isFirstOpenGame = false;
        }
        else {
            //添加动画
            EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/LoadingAnim.exml", function () {
                self._movie = new LoadingAnimUI();
                self._movie.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/LoadingAnim.exml";
                self.addChildAt(self._movie, 1);
                self._movie.startAction();
                // self._movie.play.addEventListener('complete', self.onTweenGroupComplete, self);
                // self._movie.play.play(0);
            }, this);
        }
        //logo
        RES.getResAsync("logo_png", function (data, key) {
            var logoImg = new egret.Bitmap(data);
            logoImg.anchorOffsetX = logoImg.width >> 1;
            logoImg.anchorOffsetY = logoImg.height >> 1;
            logoImg.x = (CONFIG.contentWidth >> 1) + CONFIG.adaptX;
            logoImg.y = CONFIG.contentHeight - 300 + CONFIG.adaptY;
            self.addChildAt(logoImg, 10);
        }, this);
        //loading tips
        var configVo = game.table.T_Config_Table.getVoByKey(24);
        this._tipsArr = configVo.value.split(",");
        this._tipsTxt = new eui.Label();
        this._tipsTxt.x = 290;
        this._tipsTxt.y = 612;
        this._tipsTxt.width = 720;
        this._tipsTxt.bold = true;
        this._tipsTxt.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this._tipsTxt);
        this._tipsTxt.text = game.util.Language.getText(Number(this._tipsArr[this._tipsIdx]));
        this._tipsIdx++;
        //定义Timer
        this._timer = new egret.Timer(3000, 0);
        //注册事件侦听器
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        //开始计时
        this._timer.start();
        //增加UI适配边框
        game.util.UIUtil.screenAdapter(this._loadingUI, this.stage.stageWidth, this.stage.stageHeight);
    };
    LoadingUI.prototype.timerFunc = function () {
        if (this._tipsIdx < this._tipsArr.length) {
            this._tipsTxt.text = game.util.Language.getText(Number(this._tipsArr[this._tipsIdx]));
        }
        else {
            this._tipsIdx = 0;
            this._tipsTxt.text = game.util.Language.getText(Number(this._tipsArr[this._tipsIdx]));
        }
        this._tipsIdx++;
    };
    LoadingUI.prototype.setProgress = function (current, total) {
        this._loadingUI.progressBar.value = current;
        this._loadingUI.progressBar.maximum = total;
    };
    LoadingUI.prototype.destroy = function () {
        //this._movie && this._movie.play.removeEventListener('complete', this.onTweenGroupComplete, this);
        this._movie && this._movie.clearAction();
        this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.parent && this.parent.removeChild(this);
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["burn.base.IDestory"]);
/***操作UI的对应类 */
var FishLoadingUI = (function (_super) {
    __extends(FishLoadingUI, _super);
    function FishLoadingUI() {
        return _super.call(this) || this;
    }
    return FishLoadingUI;
}(eui.Component));
__reflect(FishLoadingUI.prototype, "FishLoadingUI");
/** loadingUI动画 */
var LoadingAnimUI = (function (_super) {
    __extends(LoadingAnimUI, _super);
    function LoadingAnimUI() {
        return _super.call(this) || this;
    }
    LoadingAnimUI.prototype.clearAction = function () {
        egret.Tween.removeTweens(this.YiYuan);
        egret.Tween.removeTweens(this.ShaYu_Bao1);
        egret.Tween.removeTweens(this.ShaYu_Bao2);
        egret.Tween.removeTweens(this.ShaYu_Bao3);
        egret.Tween.removeTweens(this.ShaYu_Bao4);
        egret.Tween.removeTweens(this.ShaYu_DanTou);
        egret.Tween.removeTweens(this.ShaYu_Huo);
        egret.Tween.removeTweens(this.ShaYu_TuoWei);
        egret.Tween.removeTweens(this.ShaYu_Qi);
        egret.Tween.removeTweens(this.ShaYu_Pao);
        egret.Tween.removeTweens(this.ShaYu_Zhao);
        egret.Tween.removeTweens(this.ShaYu_Yan2);
        egret.Tween.removeTweens(this.ShaYu_Yan1);
        egret.Tween.removeTweens(this.ShaYu_Zui);
        egret.Tween.removeTweens(this.ShaYu_ShenTI);
        egret.Tween.removeTweens(this.ShaYu_Chi);
        egret.Tween.removeTweens(this.Lan_Yan);
        egret.Tween.removeTweens(this.Lan_Zui);
        egret.Tween.removeTweens(this.Lan_R_Qi);
        egret.Tween.removeTweens(this.lan_ShenTi);
        egret.Tween.removeTweens(this.Lan_L_Qi);
        egret.Tween.removeTweens(this.HeTun_Zui);
        egret.Tween.removeTweens(this.HeTun_Yan_L);
        egret.Tween.removeTweens(this.HeTun_Yan_R);
        egret.Tween.removeTweens(this.HeTun_L_Chi);
        egret.Tween.removeTweens(this.HeTun_ShenTI);
        egret.Tween.removeTweens(this.HeTun_R_Chi);
        egret.Tween.removeTweens(this.HeTun_WeiBa);
        egret.Tween.removeTweens(this.XiaoChou_Zui);
        egret.Tween.removeTweens(this.XiaoChou_R_Chi);
        egret.Tween.removeTweens(this.XiaoChou_R_Yan);
        egret.Tween.removeTweens(this.XiaoChou_L_Yan);
        egret.Tween.removeTweens(this.XiaoChou_ShenTI);
        egret.Tween.removeTweens(this.WuGui_Zui);
        egret.Tween.removeTweens(this.WuGui_Yan_L);
        egret.Tween.removeTweens(this.WuGui_Yan_R);
        egret.Tween.removeTweens(this.WuGui_Tou);
        egret.Tween.removeTweens(this.WuGui_R_QI);
        egret.Tween.removeTweens(this.WuGui_Ke);
        egret.Tween.removeTweens(this.WuGui_L_Qi);
        egret.Tween.removeTweens(this.Zi_Zui);
        egret.Tween.removeTweens(this.Zi_Yan);
        egret.Tween.removeTweens(this.Zi_R_Qi);
        egret.Tween.removeTweens(this.Zi_ShenTi);
        egret.Tween.removeTweens(this.Zi_L_Qi);
        egret.Tween.removeTweens(this.WuShi);
    };
    LoadingAnimUI.prototype.startAction = function () {
        var self = this;
        this.clearAction();
        var twShayuPao = egret.Tween.get(this.ShaYu_Pao, { loop: false });
        twShayuPao.to({ y: 194 }, 1000)
            .to({ y: 207 }, 1000)
            .to({ y: 194 }, 1000)
            .to({ y: 207 }, 1000)
            .call(function () {
            self.startAction();
        });
        var twShaYu_Bao4 = egret.Tween.get(this.ShaYu_Bao4, { loop: false });
        twShaYu_Bao4.set({ x: 497, y: 235, alpha: 0 });
        twShaYu_Bao4.wait(500)
            .set({ alpha: 0 });
        var twShaYu_Chi = egret.Tween.get(this.ShaYu_Chi, { loop: false });
        twShaYu_Chi.to({ rotation: -3, y: 89 }, 1000)
            .to({ rotation: 0, y: 105 }, 1000)
            .to({ rotation: -3, y: 89 }, 1000)
            .to({ rotation: 0, y: 105 }, 1000);
        var twShaYu_ShenTI = egret.Tween.get(this.ShaYu_ShenTI, { loop: false });
        twShaYu_ShenTI.to({ y: 143 }, 1000)
            .to({ y: 156 }, 1000)
            .to({ y: 143 }, 1000)
            .to({ y: 156 }, 1000);
        var twShaYu_Zui = egret.Tween.get(this.ShaYu_Zui, { loop: false });
        twShaYu_Zui.to({ y: 118, rotation: -5 }, 1000)
            .to({ y: 131, rotation: 0 }, 1000)
            .to({ y: 118, x: 636, rotation: -5 }, 1000)
            .to({ y: 131, rotation: 0 }, 1000);
        var twShaYu_Yan1 = egret.Tween.get(this.ShaYu_Yan1, { loop: false });
        twShaYu_Yan1.set({ alpha: 0 })
            .wait(950)
            .set({ alpha: 1, y: 99 })
            .wait(50)
            .set({ alpha: 0 });
        var twShaYu_Yan2 = egret.Tween.get(this.ShaYu_Yan2, { loop: false });
        twShaYu_Yan2.set({ alpha: 0 })
            .wait(1000)
            .set({ alpha: 1, y: 96 })
            .wait(50)
            .set({ alpha: 0 });
        var twShaYu_Zhao = egret.Tween.get(this.ShaYu_Zhao, { loop: false });
        twShaYu_Zhao.to({ y: 9 }, 1000)
            .to({ y: 22 }, 1000)
            .to({ y: 9 }, 1000)
            .to({ y: 24 }, 1000);
        var twShaYu_Qi = egret.Tween.get(this.ShaYu_Qi, { loop: false });
        twShaYu_Qi.to({ y: 149, rotation: -13 }, 1000)
            .to({ y: 162, rotation: 0 }, 1000)
            .to({ y: 149, rotation: -13 }, 1000)
            .to({ y: 162, rotation: 0 }, 1000);
        var twShaYu_TuoWei = egret.Tween.get(this.ShaYu_TuoWei, { loop: false });
        twShaYu_TuoWei.set({ alpha: 0 })
            .to({ alpha: 1 }, 250)
            .to({ alpha: 0, y: 166 }, 750);
        var twShaYu_Huo = egret.Tween.get(this.ShaYu_Huo, { loop: false });
        twShaYu_Huo.set({ y: 217, x: 508, alpha: 0 })
            .to({ x: 202, y: 169, alpha: 1 }, 250)
            .to({ y: 166, scaleX: 0.8, scaleY: 0.8 }, 150)
            .to({ y: 164, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 161, scaleX: 0.8, scaleY: 0.8 }, 150)
            .to({ y: 158, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 156, scaleX: 0.8, scaleY: 0.8 }, 150)
            .to({ y: 158, scaleX: 1, scaleY: 1, width: 239, height: 168 }, 150)
            .to({ y: 160, scaleX: 0.8, scaleY: 0.8 }, 150)
            .to({ y: 162, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 164, scaleX: 0.8, scaleY: 0.8 }, 150)
            .to({ y: 166, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 168, scaleX: 0.8, scaleY: 0.8 }, 150)
            .to({ y: 169, scaleX: 1, scaleY: 1 }, 150)
            .to({ scaleX: 0.8, scaleY: 0.8 }, 150)
            .to({ y: 167, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 164, scaleX: 0.8, scaleY: 0.8 }, 150)
            .to({ y: 162, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 160, scaleX: 0.8, scaleY: 0.8 }, 150)
            .to({ y: 157, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 156, scaleX: 0.8, scaleY: 0.8 }, 150)
            .to({ y: 158, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 160, scaleX: 0.8, scaleY: 0.8 }, 150)
            .to({ y: 162, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 164, scaleX: 0.8, scaleY: 0.8 }, 150)
            .to({ y: 166, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 168, scaleX: 0.8, scaleY: 0.8 }, 150)
            .to({ y: 169, scaleX: 1, scaleY: 1 }, 150);
        var twShaYu_DanTou = egret.Tween.get(this.ShaYu_DanTou, { loop: false });
        twShaYu_DanTou.set({ x: 514, y: 213, alpha: 0 })
            .to({ x: 208, y: 165, alpha: 1 }, 250)
            .to({ y: 152 }, 750)
            .to({ y: 165 }, 1000)
            .to({ y: 152 }, 1000)
            .to({ y: 165 }, 1000);
        var twShaYu_Bao3 = egret.Tween.get(this.ShaYu_Bao3, { loop: false });
        twShaYu_Bao3.set({ x: 482, y: 242, alpha: 0 })
            .wait(300)
            .set({ alpha: 1, y: 219 })
            .wait(100)
            .set({ alpha: 0 });
        var twShaYu_Bao2 = egret.Tween.get(this.ShaYu_Bao2, { loop: false });
        twShaYu_Bao2.set({ x: 493, y: 236, alpha: 0 })
            .wait(200)
            .set({ alpha: 1, y: 215 })
            .wait(100)
            .set({ alpha: 0 });
        var twShaYu_Bao1 = egret.Tween.get(this.ShaYu_Bao1, { loop: false });
        twShaYu_Bao1.set({ x: 491, y: 219, alpha: 0 })
            .wait(100)
            .set({ y: 210, alpha: 1 })
            .wait(100)
            .set({ alpha: 0 });
        var twLan_Yan = egret.Tween.get(this.Lan_Yan, { loop: false });
        twLan_Yan.to({ x: 1063.06, y: 492.12, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ x: 1064.26, y: 492.92, scaleX: 1, scaleY: 1 }, 150)
            .to({ x: 1065.46, y: 493.72, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ x: 1066.65, y: 494.52, scaleX: 1, scaleY: 1 }, 150)
            .to({ x: 1067.85, y: 495.32, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ x: 1069.04, y: 496.11, scaleX: 1, scaleY: 1 }, 150)
            .to({ x: 1069.84, y: 496.64, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ x: 1068.64, y: 495.84, scaleX: 1, scaleY: 1 }, 150)
            .to({ x: 1067.44, y: 495.04, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ x: 1066.24, y: 494.24, scaleX: 1, scaleY: 1 }, 150)
            .to({ x: 1065.05, y: 493.44, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ x: 1063.85, y: 492.65, scaleX: 1, scaleY: 1 }, 150)
            .to({ x: 1062.66, y: 491.85, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ x: 1061.86, y: 491.32, scaleX: 1, scaleY: 1 }, 150)
            .to({ x: 1063.06, y: 492.12, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ x: 1064.26, y: 492.92, scaleX: 1, scaleY: 1 }, 150)
            .to({ x: 1065.46, y: 493.72, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ x: 1066.65, y: 494.52, scaleX: 1, scaleY: 1 }, 150)
            .to({ x: 1067.85, y: 495.32, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ x: 1069.04, y: 496.11, scaleX: 1, scaleY: 1 }, 150)
            .to({ x: 1069.84, y: 496.64, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ x: 1068.64, y: 495.84, scaleX: 1, scaleY: 1 }, 150)
            .to({ x: 1067.44, y: 495.04, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ x: 1066.24, y: 494.24, scaleX: 1, scaleY: 1 }, 150)
            .to({ x: 1065.05, y: 493.44, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ x: 1063.85, y: 492.65, scaleX: 1, scaleY: 1 }, 150)
            .to({ x: 1062.66, y: 491.85, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ x: 1061.86, y: 491.32, scaleX: 1, scaleY: 1 }, 150);
        var twLan_Zui = egret.Tween.get(this.Lan_Zui, { loop: false });
        twLan_Zui.to({ x: 1061.94, y: 537.13, scaleX: 1.2, scaleY: 1 }, 150)
            .to({ x: 1063.14, y: 537.93, scaleX: 1, scaleY: 1 }, 150)
            .to({ x: 1064.34, y: 538.73, scaleX: 1.2, scaleY: 1 }, 150)
            .to({ x: 1065.53, y: 539.53, scaleX: 1 }, 150)
            .to({ x: 1066.73, y: 540.32, scaleX: 1.2 }, 150)
            .to({ x: 1067.92, y: 541.12, scaleX: 1 }, 150)
            .to({ x: 1068.72, y: 541.65, scaleX: 1.2 }, 150)
            .to({ x: 1067.52, y: 540.85, scaleX: 1 }, 150)
            .to({ x: 1066.32, y: 540.05, scaleX: 1.2, width: 63 }, 150)
            .to({ x: 1065.12, y: 539.25, scaleX: 1 }, 150)
            .to({ x: 1063.93, y: 538.45, scaleX: 1.2 }, 150)
            .to({ x: 1062.73, y: 537.66, scaleX: 1 }, 150)
            .to({ x: 1061.54, y: 536.86, scaleX: 1.2 }, 150)
            .to({ x: 1060.74, y: 536.33, scaleX: 1 }, 150)
            .to({ x: 1061.94, y: 537.13, scaleX: 1.2 }, 150)
            .to({ x: 1063.14, y: 537.93, scaleX: 1 }, 150)
            .to({ x: 1064.34, y: 538.73, scaleX: 1.2 }, 150)
            .to({ x: 1065.53, y: 539.53, scaleX: 1 }, 150)
            .to({ x: 1066.73, y: 540.32, scaleX: 1.2 }, 150)
            .to({ x: 1067.92, y: 541.12, scaleX: 1 }, 150)
            .to({ x: 1068.72, y: 541.65, scaleX: 1.2 }, 150)
            .to({ x: 1067.52, y: 540.85, scaleX: 1 }, 150)
            .to({ x: 1066.32, y: 540.05, scaleX: 1.2 }, 150)
            .to({ x: 1065.12, y: 539.25, scaleX: 1 }, 150)
            .to({ x: 1063.93, y: 538.45, scaleX: 1.2 }, 150)
            .to({ x: 1062.73, y: 537.66, scaleX: 1 }, 150)
            .to({ x: 1061.54, y: 536.86, scaleX: 1.2 }, 150)
            .to({ x: 1060.74, y: 536.33, scaleX: 1 }, 150);
        var twLan_R_Qi = egret.Tween.get(this.Lan_R_Qi, { loop: false });
        twLan_R_Qi.to({ width: 38.33, height: 55.67, x: 1027.62, y: 515.57, rotation: 12.67 }, 1000)
            .to({ x: 1023.66, y: 517.62, width: 31, height: 51, rotation: 0 }, 1000)
            .to({ width: 38.33, height: 55.67, x: 1027.62, y: 515.57, rotation: 12.67 }, 1000)
            .to({ x: 1023.66, y: 517.62, width: 31, height: 51, rotation: 0 }, 1000);
        var twlan_ShenTi = egret.Tween.get(this.lan_ShenTi, { loop: false });
        twlan_ShenTi.to({ x: 1054.48, y: 500.25 }, 1000)
            .to({ x: 1046.5, y: 494.93 }, 1000)
            .to({ x: 1054.48, y: 500.25 }, 1000)
            .to({ x: 1046.5, y: 494.93 }, 1000);
        var twLan_L_Qi = egret.Tween.get(this.Lan_L_Qi, { loop: false });
        twLan_L_Qi.to({ y: 525.64, x: 1095, width: 31.74, height: 22.98, rotation: -31 }, 1000)
            .to({ x: 1087.02, y: 520.32, rotation: 0, width: 27, height: 20 }, 1000)
            .to({ y: 525.64, x: 1095, width: 31.74, height: 22.98, rotation: -31 }, 1000)
            .to({ x: 1087.02, y: 520.32, rotation: 0, width: 27, height: 20 }, 1000);
        var twHeTun_WeiBa = egret.Tween.get(this.HeTun_WeiBa, { loop: false });
        twHeTun_WeiBa.to({ y: 340, x: 220, rotation: 35, width: 28.5, height: 29 }, 1000)
            .to({ y: 352, x: 228, rotation: 0, width: 24, height: 25 }, 1000)
            .to({ y: 340, x: 220, rotation: 35, width: 28.5, height: 29 }, 1000)
            .to({ y: 352, x: 228, rotation: 0, width: 24, height: 25 }, 1000);
        var twHeTun_ShenTI = egret.Tween.get(this.HeTun_ShenTI, { loop: false });
        twHeTun_ShenTI.to({ y: 250, x: 197 }, 1000)
            .to({ y: 262, x: 205 }, 1000)
            .to({ y: 250, x: 197 }, 1000)
            .to({ y: 262, x: 205 }, 1000);
        var twHeTun_L_Chi = egret.Tween.get(this.HeTun_L_Chi, { loop: false });
        twHeTun_L_Chi.to({ x: 297, width: 31, height: 27, y: 296.32, rotation: -21 }, 1000)
            .to({ y: 309, x: 305, rotation: 0, width: 25, height: 22 }, 1000)
            .to({ x: 297, width: 31, height: 27, y: 296.32, rotation: -21 }, 1000)
            .to({ y: 309, x: 305, rotation: 0, width: 25, height: 22 }, 1000);
        var twHeTun_Yan_R = egret.Tween.get(this.HeTun_Yan_R, { loop: false });
        twHeTun_Yan_R.to({ y: 324.2, x: 221.8, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 322.4, x: 220.6, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 320.6, x: 219.4, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 318.8, x: 218.2, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 317, x: 217, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 315.2, x: 215.8, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 314, x: 215, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 315.8, x: 216.2, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 317.6, x: 217.4, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 319.4, x: 218.6, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 321.2, x: 219.8, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 323, x: 221, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 324.8, x: 222.2, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 326, x: 223, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 324.2, x: 221.8, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 322.4, x: 220.6, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 320.6, x: 219.4, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 318.8, x: 218.2, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 317, x: 217, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 315.2, x: 215.8, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 314, x: 215, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 315.8, x: 216.2, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 317.6, x: 217.4, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 319.4, x: 218.6, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 321.2, x: 219.8, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 323, x: 221, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 324.8, x: 222.2, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 326, x: 223, scaleX: 1, scaleY: 1 }, 150);
        var twHeTun_Yan_L = egret.Tween.get(this.HeTun_Yan_L, { loop: false });
        twHeTun_Yan_L.to({ y: 293.2, x: 265.8, scaleX: 1.1, alpha: 1.1 }, 150)
            .to({ y: 291.4, x: 264.6, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 289.6, x: 263.4, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 287.8, x: 262.2, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 286, x: 261, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 284.2, x: 259.8, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 283, x: 259, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 284.8, x: 260.2, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 286.6, x: 261.4, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 288.4, x: 262.6, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 290.2, x: 263.8, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 292, x: 265, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 293.8, x: 266.2, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 295, x: 267, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 293.2, x: 265.8, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 291.4, x: 264.6, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 289.6, x: 263.4, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 287.8, x: 262.2, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 286, x: 261, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 284.2, x: 259.8, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 283, x: 259, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 284.8, x: 260.2, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 286.6, x: 261.4, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 288.4, x: 262.6, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 290.2, x: 263.8, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 292, x: 265, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 293.8, x: 266.2, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 295, x: 267, scaleX: 1, scaleY: 1 }, 150);
        var twHeTun_Zui = egret.Tween.get(this.HeTun_Zui, { loop: false });
        twHeTun_Zui.to({ y: 337.2, x: 260.8, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 335.4, x: 259.6, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 333.6, x: 258.4, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 331.8, x: 257.2, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 330, x: 256, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 328.2, x: 254.8, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 327, x: 254, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 328.8, x: 255.2, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 330.6, x: 256.4, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 332.4, x: 257.6, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 334.2, x: 258.8, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 336, x: 260, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 337.8, x: 261.2, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 339, x: 262, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 337.2, x: 260.8, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 335.4, x: 259.6, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 333.6, x: 258.4, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 331.8, x: 257.2, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 330, x: 256, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 328.2, x: 254.8, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 327, x: 254, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 328.8, x: 255.2, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 330.6, x: 256.4, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 332.4, x: 257.6, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 334.2, x: 258.8, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 336, x: 260, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 337.8, x: 261.2, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 339, x: 262, scaleX: 1, scaleY: 1 }, 150);
        var twXiaoChou_Zui = egret.Tween.get(this.XiaoChou_Zui, { loop: false });
        twXiaoChou_Zui.to({ x: 1101, y: 290 }, 1000)
            .to({ x: 1093, y: 302 }, 1000)
            .to({ x: 1101, y: 290 }, 1000)
            .to({ x: 1093, y: 302 }, 1000);
        var twXiaoChou_R_Chi = egret.Tween.get(this.XiaoChou_R_Chi, { loop: false });
        twXiaoChou_R_Chi.to({ width: 33.67, height: 38.67, x: 1043.48, y: 294.99, rotation: 13 }, 1000)
            .to({ y: 310, x: 1038.5, rotation: 0, width: 29, height: 34 }, 1000)
            .to({ x: 1043.48, y: 294.99, width: 33.67, height: 38.67, rotation: 13 }, 1000)
            .to({ y: 310, x: 1038.5, rotation: 0, width: 29, height: 34 }, 1000);
        var twXiaoChou_R_Yan = egret.Tween.get(this.XiaoChou_R_Yan, { loop: false });
        twXiaoChou_R_Yan.to({ y: 281.7, x: 1054.2, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 279.9, x: 1055.4, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 278.1, x: 1056.6, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 276.3, x: 1057.8, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 274.5, x: 1059, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 272.7, x: 1060.2, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 271.5, x: 1061, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 273.3, x: 1059.8, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 275.1, x: 1058.6, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 276.9, x: 1057.4, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 278.7, x: 1056.2, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 280.5, x: 1055, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 282.3, x: 1053.8, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 283.5, x: 1053, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 281.7, x: 1054.2, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 279.9, x: 1055.4, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 278.1, x: 1056.6, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 276.3, x: 1057.8, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 274.5, x: 1059, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 272.7, x: 1060.2, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 271.5, x: 1061, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 273.3, x: 1059.8, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 275.1, x: 1058.6, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 276.9, x: 1057.4, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 278.7, x: 1056.2, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 280.5, x: 1055, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 282.3, x: 1053.8, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 283.5, x: 1053, scaleX: 1, scaleY: 1 }, 150);
        var twXiaoChou_L_Yan = egret.Tween.get(this.XiaoChou_L_Yan, { loop: false });
        twXiaoChou_L_Yan.to({ y: 262.2, x: 1097.2, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 260.4, x: 1098.4, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 258.6, x: 1099.6, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 256.8, x: 1100.8, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 255, x: 1102, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 253.2, x: 1103.2, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 252, x: 1104, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 253.8, x: 1102.8, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 255.6, x: 1101.6, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 257.4, x: 1100.4, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 259.2, x: 1099.2, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 261, x: 1098, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 262.8, x: 1096.8, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 264, x: 1096, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 262.2, x: 1097.2, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 260.4, x: 1098.4, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 258.6, x: 1099.6, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 256.8, x: 1100.8, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 255, x: 1102, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 253.2, x: 1103.2, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 252, x: 1104, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 253.8, x: 1102.8, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 255.6, x: 1101.6, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 257.4, x: 1100.4, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 259.2, x: 1099.2, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 261, x: 1098, scaleX: 1, scaleY: 1 }, 150)
            .to({ y: 262.8, x: 1096.8, scaleX: 1.1, scaleY: 1.1 }, 150)
            .to({ y: 264, x: 1096, scaleX: 1, scaleY: 1 }, 150);
        var twXiaoChou_ShenTI = egret.Tween.get(this.XiaoChou_ShenTI, { loop: false });
        twXiaoChou_ShenTI.to({ x: 1060, y: 285 }, 1000)
            .to({ x: 1052, y: 297 }, 1000)
            .to({ x: 1060, y: 285 }, 1000)
            .to({ x: 1052, y: 297 }, 1000);
        var twWuGui_Zui = egret.Tween.get(this.WuGui_Zui, { loop: false });
        twWuGui_Zui.to({ y: 631 }, 1000)
            .to({ y: 611 }, 1000)
            .to({ y: 631 }, 1000)
            .to({ y: 611 }, 1000);
        var twWuGui_Yan_L = egret.Tween.get(this.WuGui_Yan_L, { loop: false });
        twWuGui_Yan_L.to({ y: 589 }, 1000)
            .to({ y: 569 }, 1000)
            .to({ y: 589 }, 1000)
            .to({ y: 571 }, 1000);
        var twWuGui_Yan_R = egret.Tween.get(this.WuGui_Yan_R, { loop: false });
        twWuGui_Yan_R.to({ y: 604 }, 1000)
            .to({ y: 584 }, 1000)
            .to({ y: 606 }, 1000)
            .to({ y: 584 }, 1000);
        var twWuGui_Tou = egret.Tween.get(this.WuGui_Tou, { loop: false });
        twWuGui_Tou.to({ y: 614.82 }, 1000)
            .to({ y: 594.82 }, 1000)
            .to({ y: 612.82 }, 1000)
            .to({ x: 325.51, y: 594.82 }, 1000);
        var twWuGui_R_QI = egret.Tween.get(this.WuGui_R_QI, { loop: false });
        twWuGui_R_QI.to({ y: 643, rotation: 19 }, 1000)
            .to({ y: 625, rotation: 0 }, 1000)
            .to({ y: 643, rotation: 19 }, 1000)
            .to({ y: 623, rotation: 0 }, 1000);
        var twWuGui_Ke = egret.Tween.get(this.WuGui_Ke, { loop: false });
        twWuGui_Ke.to({ y: 641 }, 1000)
            .to({ y: 623 }, 1000)
            .to({ y: 643 }, 1000)
            .to({ y: 623 }, 1000);
        var twWuGui_L_Qi = egret.Tween.get(this.WuGui_L_Qi, { loop: false });
        twWuGui_L_Qi.to({ y: 631, rotation: -23 }, 1000)
            .to({ y: 611, rotation: 0 }, 1000)
            .to({ y: 629, rotation: -23 }, 1000)
            .to({ rotation: 0, y: 613 }, 1000);
        var twZi_Zui = egret.Tween.get(this.Zi_Zui, { loop: false });
        twZi_Zui.to({ y: 673.33, x: 935 }, 1000)
            .to({ y: 665.33, x: 927 }, 1000)
            .to({ y: 673.33, x: 935 }, 1000)
            .to({ y: 665.33, x: 927 }, 1000);
        var twZi_Yan = egret.Tween.get(this.Zi_Yan, { loop: false });
        twZi_Yan.to({ y: 624.33, x: 938 }, 1000)
            .to({ y: 618.33, x: 930 }, 1000)
            .to({ y: 626.33, x: 938 }, 1000)
            .to({ x: 930, y: 616.33 }, 1000);
        var twZi_R_Qi = egret.Tween.get(this.Zi_R_Qi, { loop: false });
        twZi_R_Qi.to({ y: 653.33, x: 904, rotation: 13 }, 1000)
            .to({ y: 645.33, x: 896, rotation: 0 }, 1000)
            .to({ y: 653.33, x: 904, rotation: 13 }, 1000)
            .to({ y: 645.33, x: 896, rotation: 0 }, 1000);
        var twZi_ShenTi = egret.Tween.get(this.Zi_ShenTi, { loop: false });
        twZi_ShenTi.to({ y: 627.83, x: 911 }, 1000)
            .to({ y: 619.83, x: 903 }, 1000)
            .to({ y: 627.83, x: 911 }, 1000)
            .to({ y: 619.83, x: 903 }, 1000);
        var twZi_L_Qi = egret.Tween.get(this.Zi_L_Qi, { loop: false });
        twZi_L_Qi.to({ y: 663.33, x: 943, rotation: -31 }, 1000)
            .to({ y: 657.33, x: 935, rotation: 0 }, 1000)
            .to({ y: 665.33, x: 943, rotation: -31 }, 1000)
            .to({ x: 935, y: 656.85, rotation: 0 }, 1000);
        var twWuShi = egret.Tween.get(this.WuShi, { loop: false });
        twWuShi.set({ x: 547.33, y: 53.71, scaleX: 0.1, scaleY: 0.1, alpha: 0 })
            .to({ alpha: 1, scaleX: 1, scaleY: 1 }, 250)
            .to({ scaleX: 1.2, scaleY: 1.2 }, 50)
            .to({ scaleX: 1, scaleY: 1 }, 50)
            .wait(2650)
            .to({ alpha: 0 }, 1000);
        var twYiYuan = egret.Tween.get(this.YiYuan, { loop: false });
        twYiYuan.set({ y: 161.52, x: 937.16, alpha: 0 })
            .to({ scaleX: 0.1, scaleY: 0.1, alpha: 0 }, 500)
            .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 250)
            .to({ scaleX: 1.2, scaleY: 1.2 }, 50)
            .to({ scaleX: 1, scaleY: 1 }, 50)
            .wait(2150)
            .to({ alpha: 0 }, 1000);
    };
    return LoadingAnimUI;
}(eui.Component));
__reflect(LoadingAnimUI.prototype, "LoadingAnimUI");
//# sourceMappingURL=LoadingUI.js.map