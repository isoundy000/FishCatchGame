var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var burn;
(function (burn) {
    var net;
    (function (net) {
        var RequestBase = (function () {
            function RequestBase() {
            }
            RequestBase.prototype.toByteArray = function () {
                throw (new burn.error.SimpleError("Request must be override toByteArray!"));
            };
            return RequestBase;
        }());
        net.RequestBase = RequestBase;
        __reflect(RequestBase.prototype, "burn.net.RequestBase");
    })(net = burn.net || (burn.net = {}));
})(burn || (burn = {}));
//# sourceMappingURL=RequestBase.js.map