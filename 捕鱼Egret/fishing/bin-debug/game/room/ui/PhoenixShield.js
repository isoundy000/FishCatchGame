var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//凤凰护盾I
var PhoenixShield = (function (_super) {
    __extends(PhoenixShield, _super);
    function PhoenixShield() {
        var _this = _super.call(this) || this;
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/worldBoss/worldBossShield.exml";
        return _this;
    }
    PhoenixShield.prototype.setData = function (cur, max) {
        this.shieldLab.text = (max - cur) + "/" + max;
        var percentW = (max - cur) * 362.0 / max;
        this.cur_362.width = percentW;
    };
    /** 销毁函数 */
    PhoenixShield.prototype.destroy = function () {
    };
    return PhoenixShield;
}(eui.Component));
__reflect(PhoenixShield.prototype, "PhoenixShield");
//凤凰顶部
var PhoenixTop = (function (_super) {
    __extends(PhoenixTop, _super);
    function PhoenixTop() {
        var _this = _super.call(this) || this;
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/worldBoss/worldBossTips.exml";
        _this.timeLab_0.textAlign = egret.HorizontalAlign.RIGHT;
        _this.timeLab_1.textAlign = egret.HorizontalAlign.LEFT;
        return _this;
    }
    //开启定时器刷新自己的时间
    PhoenixTop.prototype.start = function () {
        if (this._timer) {
            this._timer.stop();
            this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            this._timer = null;
        }
        //定义Timer
        this._timer = new egret.Timer(1000, 0);
        //注册事件侦听器
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this._timer.start();
        var roomerModel = burn.Director.getModelByKey(RoomModel);
        this.time = roomerModel.getPhoenix().getTime();
    };
    PhoenixTop.prototype.timerFunc = function () {
        var residueTime = this.time - game.util.TimeUtil.getCurrTime();
        if (residueTime <= 0) {
            if (this._timer) {
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                this._timer = null;
            }
            this.timeLab_0.text = "00";
            this.timeLab_1.text = "00";
            return;
        }
        var timeStr = game.util.TimeUtil.sceonds2MinStr(residueTime);
        var timeArr = timeStr.split(":");
        this.timeLab_0.text = timeArr[0];
        this.timeLab_1.text = timeArr[1];
    };
    /** 销毁函数 */
    PhoenixTop.prototype.destroy = function () {
        this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
    };
    return PhoenixTop;
}(eui.Component));
__reflect(PhoenixTop.prototype, "PhoenixTop");
//# sourceMappingURL=PhoenixShield.js.map