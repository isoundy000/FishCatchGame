var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MonthCardRewardMediator = (function (_super) {
    __extends(MonthCardRewardMediator, _super);
    function MonthCardRewardMediator(view) {
        return _super.call(this, view) || this;
    }
    MonthCardRewardMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        this.getView().initView();
    };
    MonthCardRewardMediator.prototype.init = function () {
    };
    MonthCardRewardMediator.prototype.update = function () {
    };
    MonthCardRewardMediator.prototype.destroy = function () {
        this.getView().destroy();
    };
    return MonthCardRewardMediator;
}(burn.mediator.SimpleMediator));
__reflect(MonthCardRewardMediator.prototype, "MonthCardRewardMediator");
//# sourceMappingURL=MonthCardRewardMediator.js.map