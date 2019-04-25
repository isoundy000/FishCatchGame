var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DjsResultMediator = (function (_super) {
    __extends(DjsResultMediator, _super);
    function DjsResultMediator(view) {
        return _super.call(this, view, "DjsMediator") || this;
    }
    DjsResultMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        this.getView().initView();
    };
    DjsResultMediator.prototype.init = function () {
    };
    DjsResultMediator.prototype.destroy = function () {
        this.getView().destroy();
    };
    return DjsResultMediator;
}(burn.mediator.SimpleMediator));
__reflect(DjsResultMediator.prototype, "DjsResultMediator");
//# sourceMappingURL=DjsResultMediator.js.map