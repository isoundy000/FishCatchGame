var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var burn;
(function (burn) {
    var error;
    (function (error) {
        var SimpleError = (function (_super) {
            __extends(SimpleError, _super);
            function SimpleError(msg) {
                var _this = _super.call(this, msg) || this;
                _this.name = "burn.error.SimpleError";
                return _this;
            }
            return SimpleError;
        }(burn.error.ErrorBase));
        error.SimpleError = SimpleError;
        __reflect(SimpleError.prototype, "burn.error.SimpleError");
    })(error = burn.error || (burn.error = {}));
})(burn || (burn = {}));
//# sourceMappingURL=SimpleError.js.map