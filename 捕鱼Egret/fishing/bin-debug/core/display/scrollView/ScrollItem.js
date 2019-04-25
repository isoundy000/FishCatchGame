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
        /**
         * Scroll view item.
         * @author ituuz
         * @since 2017.01.19
         * @link http://www.ituuz.com
         */
        var ScrollItem = (function (_super) {
            __extends(ScrollItem, _super);
            function ScrollItem() {
                return _super.call(this) || this;
            }
            //The item has clicked.
            ScrollItem.prototype.clicked = function () {
            };
            return ScrollItem;
        }(egret.DisplayObjectContainer));
        display.ScrollItem = ScrollItem;
        __reflect(ScrollItem.prototype, "burn.display.ScrollItem");
    })(display = burn.display || (burn.display = {}));
})(burn || (burn = {}));
//# sourceMappingURL=ScrollItem.js.map