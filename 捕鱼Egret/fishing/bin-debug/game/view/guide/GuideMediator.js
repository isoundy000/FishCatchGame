var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GuideMediator = (function (_super) {
    __extends(GuideMediator, _super);
    function GuideMediator(view, nId) {
        var _this = _super.call(this, view) || this;
        _this._nCurID = nId;
        return _this;
    }
    GuideMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        //获取类型。根据类型。设置显示内容。截取点击事件
        this.getView().initView(this._nCurID);
    };
    GuideMediator.prototype.init = function () {
    };
    GuideMediator.prototype.destroy = function () {
        this.getView().destroy();
    };
    return GuideMediator;
}(burn.mediator.SimpleMediator));
__reflect(GuideMediator.prototype, "GuideMediator");
//# sourceMappingURL=GuideMediator.js.map