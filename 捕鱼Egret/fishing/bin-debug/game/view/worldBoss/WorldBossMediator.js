var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WorldBossMediator = (function (_super) {
    __extends(WorldBossMediator, _super);
    function WorldBossMediator(view) {
        return _super.call(this, view, "WorldBossMediator") || this;
    }
    WorldBossMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        this.subscrib(NotifyEnum.DJS_ITEM_LOADED, this.viewInit);
        this.getView().initView();
        var self = this;
        game.net.MessageDispatcher.register(game.net.ResponseType.GRANDPRIXRANKBACK, function (msg) {
            self.grandBack(msg);
        });
    };
    //要信息back
    WorldBossMediator.prototype.grandBack = function (msg) {
        var view = this.getView();
        view.initList(msg);
    };
    WorldBossMediator.prototype.viewInit = function (obj, target) {
        var send = new GrandPrixRankSendMessage();
        send.initData();
        send.setRoomtType(RequesetRoomState.Phoenix);
        NetManager.send(send);
    };
    WorldBossMediator.prototype.init = function () {
    };
    WorldBossMediator.prototype.destroy = function () {
        this.unsubscribByType(NotifyEnum.DJS_ITEM_LOADED);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.GRANDPRIXRANKBACK);
        this.getView().destroy();
    };
    return WorldBossMediator;
}(burn.mediator.SimpleMediator));
__reflect(WorldBossMediator.prototype, "WorldBossMediator");
//# sourceMappingURL=WorldBossMediator.js.map