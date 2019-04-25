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
        var PopView = (function (_super) {
            __extends(PopView, _super);
            function PopView() {
                return _super.call(this) || this;
            }
            return PopView;
        }(burn.view.ViewBase));
        view.PopView = PopView;
        __reflect(PopView.prototype, "burn.view.PopView");
    })(view = burn.view || (burn.view = {}));
})(burn || (burn = {}));
//# sourceMappingURL=PopView.js.map