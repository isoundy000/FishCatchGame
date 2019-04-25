var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var QmsMediator = (function (_super) {
    __extends(QmsMediator, _super);
    function QmsMediator(view) {
        return _super.call(this, view, "DjsMediator") || this;
    }
    QmsMediator.prototype.onAdded = function () {
        var _this = this;
        _super.prototype.onAdded.call(this);
        this.subscrib(NotifyEnum.DJS_ITEM_LOADED, this.viewInit);
        this.getView().initView();
        game.net.MessageDispatcher.register(game.net.ResponseType.GRANDPRIXRANKBACK, function (msg) {
            _this.grandBack(msg);
        });
    };
    //要信息back
    QmsMediator.prototype.grandBack = function (msg) {
        var view = this.getView();
        view.initList(msg);
    };
    QmsMediator.prototype.viewInit = function (obj, target) {
        var send = new GrandPrixRankSendMessage();
        send.initData();
        send.setRoomtType(RequesetRoomState.QmsRoom);
        NetManager.send(send);
    };
    QmsMediator.prototype.init = function () {
    };
    QmsMediator.prototype.destroy = function () {
        this.unsubscribByType(NotifyEnum.DJS_ITEM_LOADED);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.GRANDPRIXRANKBACK);
        this.getView().destroy();
    };
    return QmsMediator;
}(burn.mediator.SimpleMediator));
__reflect(QmsMediator.prototype, "QmsMediator");
//# sourceMappingURL=QmsMediator.js.map