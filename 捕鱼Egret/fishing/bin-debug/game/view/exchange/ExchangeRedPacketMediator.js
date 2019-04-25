var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ExchangeRedPacketMediator = (function (_super) {
    __extends(ExchangeRedPacketMediator, _super);
    function ExchangeRedPacketMediator(view) {
        return _super.call(this, view) || this;
    }
    ExchangeRedPacketMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
    };
    ExchangeRedPacketMediator.prototype.init = function () {
        this.getView().initView();
    };
    ExchangeRedPacketMediator.prototype.destroy = function () {
        this.getView().destroy();
    };
    return ExchangeRedPacketMediator;
}(burn.mediator.SimpleMediator));
__reflect(ExchangeRedPacketMediator.prototype, "ExchangeRedPacketMediator");
//# sourceMappingURL=ExchangeRedPacketMediator.js.map