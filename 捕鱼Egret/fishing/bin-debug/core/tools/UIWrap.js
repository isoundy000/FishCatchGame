var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var burn;
(function (burn) {
    var tools;
    (function (tools) {
        var UIWrap = (function () {
            function UIWrap(btn) {
                this._btn = btn;
                this._btn.anchorOffsetX = this._btn.width / 2;
                this._btn.anchorOffsetY = this._btn.height / 2;
                this._btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                this._btn.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
                this._btn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
            }
            UIWrap.prototype.onTouchBegin = function (e) {
                this._btn.scaleX = this._btn.scaleY = 1.1;
                game.util.SoundManager.playUISound("B06");
            };
            UIWrap.prototype.onTouchEnd = function (e) {
                this._btn.scaleX = this._btn.scaleY = 1;
            };
            UIWrap.prototype.destroy = function () {
                this._btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                this._btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
                this._btn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
            };
            return UIWrap;
        }());
        tools.UIWrap = UIWrap;
        __reflect(UIWrap.prototype, "burn.tools.UIWrap", ["burn.base.IDestory"]);
    })(tools = burn.tools || (burn.tools = {}));
})(burn || (burn = {}));
//# sourceMappingURL=UIWrap.js.map