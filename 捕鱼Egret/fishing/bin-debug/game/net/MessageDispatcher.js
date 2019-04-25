var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var net;
    (function (net) {
        var MessageDispatcher = (function () {
            function MessageDispatcher() {
            }
            MessageDispatcher.register = function (pid, fun) {
                if (this.responseList.contains(pid)) {
                    console.warn("【" + pid + "】该消息已经注册!");
                }
                else {
                    this.responseList.put(pid, fun);
                }
            };
            MessageDispatcher.unregister = function (pid, fun) {
                if (fun === void 0) { fun = null; }
                this.responseList.remove(pid);
            };
            MessageDispatcher.unregisterByType = function (pid) {
                this.responseList.remove(pid);
            };
            MessageDispatcher.removeAll = function () {
                this.responseList.clear();
            };
            MessageDispatcher.dispatch = function (pid, msg) {
                var fun = this.responseList.get(pid);
                if (fun) {
                    fun(msg);
                }
                else {
                    console.warn("消息[" + pid + "]未被注册过!");
                }
            };
            return MessageDispatcher;
        }());
        MessageDispatcher.responseList = new burn.util.Map();
        net.MessageDispatcher = MessageDispatcher;
        __reflect(MessageDispatcher.prototype, "game.net.MessageDispatcher");
    })(net = game.net || (game.net = {}));
})(game || (game = {}));
//# sourceMappingURL=MessageDispatcher.js.map