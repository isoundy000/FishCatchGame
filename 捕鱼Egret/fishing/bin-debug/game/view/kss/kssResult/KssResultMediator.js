var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var KssResultMediator = (function (_super) {
    __extends(KssResultMediator, _super);
    function KssResultMediator(view) {
        return _super.call(this, view) || this;
    }
    KssResultMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        this.getView().initView();
    };
    KssResultMediator.prototype.init = function () {
    };
    KssResultMediator.prototype.destroy = function () {
        this.getView().destroy();
    };
    return KssResultMediator;
}(burn.mediator.SimpleMediator));
__reflect(KssResultMediator.prototype, "KssResultMediator");
//# sourceMappingURL=KssResultMediator.js.map