var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WanbaGiftMeditor = (function (_super) {
    __extends(WanbaGiftMeditor, _super);
    function WanbaGiftMeditor(view) {
        return _super.call(this, view) || this;
    }
    WanbaGiftMeditor.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
    };
    WanbaGiftMeditor.prototype.init = function () {
        this.getView().initView();
    };
    WanbaGiftMeditor.prototype.destroy = function () {
        this.getView().destroy();
    };
    return WanbaGiftMeditor;
}(burn.mediator.SimpleMediator));
__reflect(WanbaGiftMeditor.prototype, "WanbaGiftMeditor");
//# sourceMappingURL=WanbaGiftMeditor.js.map