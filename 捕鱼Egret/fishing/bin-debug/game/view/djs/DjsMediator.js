var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DjsMediator = (function (_super) {
    __extends(DjsMediator, _super);
    function DjsMediator(view) {
        return _super.call(this, view, "DjsMediator") || this;
    }
    DjsMediator.prototype.onAdded = function () {
        var _this = this;
        _super.prototype.onAdded.call(this);
        this.subscrib(NotifyEnum.DJS_ITEM_LOADED, this.viewInit);
        this.getView().initView();
        game.net.MessageDispatcher.register(game.net.ResponseType.GRANDPRIXRANKBACK, function (msg) {
            _this.grandBack(msg);
        });
    };
    //要信息back
    DjsMediator.prototype.grandBack = function (msg) {
        var view = this.getView();
        view.initList(msg);
    };
    DjsMediator.prototype.viewInit = function (obj, target) {
        var send = new GrandPrixRankSendMessage();
        send.initData();
        send.setRoomtType(RequesetRoomState.DjsRoom);
        NetManager.send(send);
    };
    DjsMediator.prototype.init = function () {
    };
    DjsMediator.prototype.destroy = function () {
        this.unsubscribByType(NotifyEnum.DJS_ITEM_LOADED);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.GRANDPRIXRANKBACK);
        this.getView().destroy();
    };
    return DjsMediator;
}(burn.mediator.SimpleMediator));
__reflect(DjsMediator.prototype, "DjsMediator");
//# sourceMappingURL=DjsMediator.js.map