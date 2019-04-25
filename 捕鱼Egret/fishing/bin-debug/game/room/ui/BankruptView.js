var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//破产UI
var BankruptView = (function (_super) {
    __extends(BankruptView, _super);
    function BankruptView() {
        var _this = _super.call(this) || this;
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BankruptUI.exml";
        // this.timeTxt.textFlow
        _this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.getCoinsBtn, _this);
        //定义Timer
        _this._timer = new egret.Timer(1000, 0);
        //注册事件侦听器
        _this._timer.addEventListener(egret.TimerEvent.TIMER, _this.timerFunc, _this);
        _this._parent = null;
        return _this;
    }
    /**
     * 设置文本内容
     */
    BankruptView.prototype.setText = function (content) {
        this.timeTxt.text = content;
    };
    BankruptView.prototype.setParent = function (display) {
        this.getBtn.visible = false;
        this.bg.visible = false;
        this._parent = display;
    };
    BankruptView.prototype.startTick = function () {
        //开始计时
        this._timer.start();
    };
    BankruptView.prototype.timerFunc = function () {
        var userModel = burn.Director.getModelByKey(UserModel);
        var time = userModel.getBankruptTime();
        var residueTime = time - game.util.TimeUtil.getCurrTime();
        var timeStr = game.util.TimeUtil.sceonds2MinStr(residueTime);
        var content = game.util.Language.getDynamicText(36, [timeStr]);
        if (this._parent) {
            content = timeStr;
        }
        this.timeTxt.text = content;
        if (residueTime <= 0) {
            this._timer.stop();
            //burn.tools.TweenTools.hop(this.getBtn,4000);
            this.timeTxt.text = "可以领取救济金";
            return;
        }
    };
    /**
     * 获取救济金
     */
    BankruptView.prototype.getCoinsBtn = function (evt) {
        var req = new BankruptMessage();
        req.initData();
        req.setState(7);
        NetManager.send(req);
    };
    /** 销毁函数 */
    BankruptView.prototype.destroy = function () {
        this._timer.stop();
        //注册事件侦听器
        this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getCoinsBtn, this);
    };
    return BankruptView;
}(eui.Component));
__reflect(BankruptView.prototype, "BankruptView");
//# sourceMappingURL=BankruptView.js.map