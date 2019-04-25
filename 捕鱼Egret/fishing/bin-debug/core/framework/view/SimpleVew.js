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
    var view;
    (function (view) {
        var SimpleVew = (function (_super) {
            __extends(SimpleVew, _super);
            function SimpleVew() {
                return _super.call(this) || this;
            }
            SimpleVew.prototype.removeFromParent = function () {
                this.removeChildren();
                this.parent && this.parent.removeChild(this);
            };
            return SimpleVew;
        }(view.ViewBase));
        view.SimpleVew = SimpleVew;
        __reflect(SimpleVew.prototype, "burn.view.SimpleVew");
    })(view = burn.view || (burn.view = {}));
})(burn || (burn = {}));
//# sourceMappingURL=SimpleVew.js.map