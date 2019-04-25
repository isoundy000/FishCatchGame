var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var model;
    (function (model) {
        /**
         * 签到信息对象
         */
        var SignObj = (function () {
            function SignObj() {
            }
            SignObj.prototype.setData = function (msg) {
                this._nCumulativeSignTimes = msg.cumulativeSignTimes;
                this._nRemainMakeUpTimes = msg.remainMakeUpTimes;
                this._bIsTodaySign = msg.isTodaySign;
                this._bIsTodayMakeUp = msg.isTodayMakeUp;
                this._nCurMonth = msg.curMonth;
            };
            SignObj.prototype.getCumulativeSignTimes = function () {
                return this._nCumulativeSignTimes;
            };
            SignObj.prototype.getRemainMakeUpTimes = function () {
                return this._nRemainMakeUpTimes;
            };
            SignObj.prototype.IsTodaySign = function () {
                return this._bIsTodaySign;
            };
            SignObj.prototype.IsTodayMakeUp = function () {
                return this._bIsTodayMakeUp;
            };
            SignObj.prototype.CurMonth = function () {
                return this._nCurMonth;
            };
            return SignObj;
        }());
        model.SignObj = SignObj;
        __reflect(SignObj.prototype, "game.model.SignObj");
    })(model = game.model || (game.model = {}));
})(game || (game = {}));
//# sourceMappingURL=MonthObj.js.map