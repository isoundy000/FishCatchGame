var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var util;
    (function (util) {
        var ProtobufUtil = (function () {
            function ProtobufUtil() {
                this._isInit = false;
                if (this._isInit) {
                    throw (new burn.error.SimpleError(""));
                }
                this._isInit = true;
            }
            ProtobufUtil.getInstance = function () {
                if (this._instance) {
                    return this._instance;
                }
                else {
                    this._instance = new ProtobufUtil();
                }
                return this._instance;
            };
            //缓存常用协议
            ProtobufUtil.prototype.initCacheProto = function () {
                //开枪消息
                this._gunSendMsg = new FishingGunSendMessage();
                this._gunSendMsg.initData();
                this._hitSendMsg = new FishingHitSendMessage();
                this._hitSendMsg.initData();
                this._bulletDisappearMsg = new BulletDisappearMessage();
                this._bulletDisappearMsg.initData();
            };
            ProtobufUtil.prototype.getGunSend = function () {
                return this._gunSendMsg;
            };
            ProtobufUtil.prototype.getHitSend = function () {
                return this._hitSendMsg;
            };
            ProtobufUtil.prototype.getBulletDisappear = function () {
                return this._bulletDisappearMsg;
            };
            return ProtobufUtil;
        }());
        ProtobufUtil._instance = null;
        util.ProtobufUtil = ProtobufUtil;
        __reflect(ProtobufUtil.prototype, "game.util.ProtobufUtil");
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
//# sourceMappingURL=ProtobufUtil.js.map