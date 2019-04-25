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
        var PageEvent = (function (_super) {
            __extends(PageEvent, _super);
            function PageEvent(type, bubbles, cancelable) {
                if (bubbles === void 0) { bubbles = false; }
                if (cancelable === void 0) { cancelable = false; }
                return _super.call(this, type, bubbles, cancelable) || this;
            }
            return PageEvent;
        }(egret.Event));
        PageEvent.SCROLL_END = "view_scroll_end";
        event.PageEvent = PageEvent;
        __reflect(PageEvent.prototype, "burn.event.PageEvent");
    })(event = burn.event || (burn.event = {}));
})(burn || (burn = {}));
//# sourceMappingURL=PageEvent.js.map