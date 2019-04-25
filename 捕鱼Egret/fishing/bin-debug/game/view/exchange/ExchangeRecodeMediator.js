var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ExchangeRecodeMediator = (function (_super) {
    __extends(ExchangeRecodeMediator, _super);
    function ExchangeRecodeMediator(view) {
        return _super.call(this, view) || this;
    }
    ExchangeRecodeMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        this.getView().initView();
    };
    ExchangeRecodeMediator.prototype.init = function () {
        this.subscrib(NotifyEnum.EXCHANGE_RECODE_LOADED, this.setList);
        var self = this;
        game.net.MessageDispatcher.register(game.net.ResponseType.EXCHANGE, function (msg) {
            self.recodeBack(msg);
        });
    };
    ExchangeRecodeMediator.prototype.setList = function (obj, target) {
        var req = new CommonRequestMessage();
        req.initData();
        req.setType(CommonRequest.RECODE); //1 email
        NetManager.send(req);
    };
    ExchangeRecodeMediator.prototype.recodeBack = function (msg) {
        var dataList = msg.getRecords();
        var list = new Array();
        for (var i = 0; i < dataList.length; i++) {
            var item = dataList[i];
            var obj = { id: item.getGoodsId(), time: item.getTime(), state: item.getDeliveryState(), msg: item };
            list.push(obj);
        }
        var view = this.getView();
        view.setData(list);
    };
    ExchangeRecodeMediator.prototype.destroy = function () {
        this.getView().destroy();
        this.unsubscribByType(NotifyEnum.EXCHANGE_RECODE_LOADED);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.EXCHANGE);
    };
    return ExchangeRecodeMediator;
}(burn.mediator.SimpleMediator));
__reflect(ExchangeRecodeMediator.prototype, "ExchangeRecodeMediator");
//# sourceMappingURL=ExchangeRecodeMediator.js.map