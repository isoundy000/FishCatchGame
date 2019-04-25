var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ExchangeSureMediator = (function (_super) {
    __extends(ExchangeSureMediator, _super);
    function ExchangeSureMediator(view) {
        return _super.call(this, view) || this;
    }
    ExchangeSureMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
    };
    ExchangeSureMediator.prototype.init = function () {
        this.getView().initView();
        this.subscrib(NotifyEnum.EXCHANGE_SURE_LOADED, this.setList);
    };
    ExchangeSureMediator.prototype.setData = function (nId) {
        this._nId = nId;
    };
    ExchangeSureMediator.prototype.setList = function (obj, target) {
        var view = (target.getView());
        view.setOption(target._nId);
    };
    ExchangeSureMediator.prototype.destroy = function () {
        this.getView().destroy();
        this.unsubscribByType(NotifyEnum.EXCHANGE_SURE_LOADED);
    };
    return ExchangeSureMediator;
}(burn.mediator.SimpleMediator));
__reflect(ExchangeSureMediator.prototype, "ExchangeSureMediator");
//# sourceMappingURL=ExchangeSureMediator.js.map