var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var burn;
(function (burn) {
    var error;
    (function (error) {
        var ErrorBase = (function () {
            function ErrorBase(message) {
                this.message = message;
                this.name = "burn.error.ErrorBase";
                console.error("[Burn Error]" + message);
            }
            return ErrorBase;
        }());
        error.ErrorBase = ErrorBase;
        __reflect(ErrorBase.prototype, "burn.error.ErrorBase", ["Error"]);
    })(error = burn.error || (burn.error = {}));
})(burn || (burn = {}));
//# sourceMappingURL=ErrorBase.js.map