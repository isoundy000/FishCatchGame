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
    var event;
    (function (event) {
        /**
         * Scroll components event
         * @author ituuz
         * @since 2017.01.19
         * @link http://www.ituuz.com
         */
        var ScrollEvent = (function (_super) {
            __extends(ScrollEvent, _super);
            function ScrollEvent(type, bubbles, cancelable) {
                if (bubbles === void 0) { bubbles = false; }
                if (cancelable === void 0) { cancelable = false; }
                return _super.call(this, type, bubbles, cancelable) || this;
            }
            return ScrollEvent;
        }(egret.Event));
        /** click scroll item */
        ScrollEvent.CLICK = "click_scroll_item";
        /** view scroll end */
        ScrollEvent.SCROLL_END = "view_scroll_end";
        event.ScrollEvent = ScrollEvent;
        __reflect(ScrollEvent.prototype, "burn.event.ScrollEvent");
    })(event = burn.event || (burn.event = {}));
})(burn || (burn = {}));
//# sourceMappingURL=ScrollEvent.js.map