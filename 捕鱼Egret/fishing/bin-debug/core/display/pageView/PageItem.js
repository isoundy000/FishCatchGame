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
    var display;
    (function (display) {
        var PageItem = (function (_super) {
            __extends(PageItem, _super);
            function PageItem() {
                return _super.call(this) || this;
            }
            //The item has clicked.
            PageItem.prototype.clicked = function () {
            };
            return PageItem;
        }(egret.DisplayObjectContainer));
        display.PageItem = PageItem;
        __reflect(PageItem.prototype, "burn.display.PageItem");
    })(display = burn.display || (burn.display = {}));
})(burn || (burn = {}));
//# sourceMappingURL=PageItem.js.map