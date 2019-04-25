var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var util;
    (function (util) {
        var GorgeousManager = (function () {
            function GorgeousManager() {
            }
            GorgeousManager.initState = function (s) {
                GorgeousManager._state = s;
            };
            GorgeousManager.setState = function (s) {
                GorgeousManager._state = s;
                //处理激活逻辑
                burn._Notification_.send(NotifyEnum.UPDATE_GORGEOUS_STATE);
            };
            GorgeousManager.getState = function () {
                return GorgeousManager._state;
            };
            return GorgeousManager;
        }());
        //是否是华丽版 true是 false否
        GorgeousManager._state = true;
        util.GorgeousManager = GorgeousManager;
        __reflect(GorgeousManager.prototype, "game.util.GorgeousManager");
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
//# sourceMappingURL=GorgeousManager.js.map