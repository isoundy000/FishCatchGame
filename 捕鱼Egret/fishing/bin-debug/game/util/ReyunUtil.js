var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var util;
    (function (util) {
        var ReyunUtil = (function () {
            function ReyunUtil() {
            }
            /** 初始化 */
            ReyunUtil.init = function (url) {
                ReyunUtil._url = url;
            };
            /** 心跳 */
            ReyunUtil.heartbeat = function () {
                if (false) {
                    var model_1 = burn.Director.getModelByKey(UserModel);
                    sendReyunHeartbeat(model_1.getUserId() + "", model_1.getLevel() + "", CONFIG.PLATFORM_ID + "", model_1.getUserId() + "");
                }
            };
            /**
             * 自定义事件
             */
            ReyunUtil.sendEvent = function (eve, txt) {
                if (txt === void 0) { txt = ""; }
                if (false) {
                    var uId = -1;
                    var level = -1;
                    var model_2 = burn.Director.getModelByKey(UserModel);
                    if (model_2 != null) {
                        uId = model_2.getUserId();
                        level = model_2.getLevel();
                    }
                    sendCostomEvent(eve, txt, uId + "", level + "", CONFIG.PLATFORM_ID + "", uId + "");
                }
            };
            return ReyunUtil;
        }());
        util.ReyunUtil = ReyunUtil;
        __reflect(ReyunUtil.prototype, "game.util.ReyunUtil");
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
//# sourceMappingURL=ReyunUtil.js.map