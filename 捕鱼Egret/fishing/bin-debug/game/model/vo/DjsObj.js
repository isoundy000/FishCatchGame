var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var model;
    (function (model) {
        var DjsObj = (function () {
            function DjsObj(msg) {
                this.todayGrandPrixTimes = 0;
                this.grandPrixSignUp = 0;
                this.grandPrixIntegral = 0;
                this.grandPrixBulletNum = 0;
                if (msg.todayGrandPrixTimes) {
                    this.todayGrandPrixTimes = Number(msg.todayGrandPrixTimes);
                }
                if (msg.grandPrixSignUp) {
                    this.grandPrixSignUp = Number(msg.grandPrixSignUp);
                }
                if (msg.grandPrixIntegral) {
                    this.grandPrixIntegral = Number(msg.grandPrixIntegral);
                }
                if (msg.grandPrixBulletNum) {
                    this.grandPrixBulletNum = Number(msg.grandPrixBulletNum);
                }
            }
            return DjsObj;
        }());
        model.DjsObj = DjsObj;
        __reflect(DjsObj.prototype, "game.model.DjsObj");
    })(model = game.model || (game.model = {}));
})(game || (game = {}));
//# sourceMappingURL=DjsObj.js.map