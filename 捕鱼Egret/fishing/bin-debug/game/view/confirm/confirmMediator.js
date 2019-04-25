var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var ConfirmMediator = (function (_super) {
    __extends(ConfirmMediator, _super);
    function ConfirmMediator(view) {
        return _super.call(this, view) || this;
    }
    ConfirmMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        this.subscrib(NotifyEnum.TRIGGER_CONFIRM_OK, this.okFun);
        this.isTwoGroup = false;
    };
    ConfirmMediator.prototype.setTips = function (str) {
    };
    ConfirmMediator.prototype.setOneButton = function () {
    };
    ConfirmMediator.prototype.setTwoButton = function () {
    };
    ConfirmMediator.prototype.okFun = function (obj, target) {
    };
    ConfirmMediator.prototype.destroy = function () {
        this.getView().destroy();
        //移除观察者
        this.unsubscribByType(NotifyEnum.TRIGGER_CONFIRM_OK);
    };
    return ConfirmMediator;
}(burn.mediator.SimpleMediator));
__reflect(ConfirmMediator.prototype, "ConfirmMediator");
//# sourceMappingURL=confirmMediator.js.map