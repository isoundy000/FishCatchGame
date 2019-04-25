var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RankMediator = (function (_super) {
    __extends(RankMediator, _super);
    function RankMediator(view) {
        return _super.call(this, view, "RankMediator") || this;
    }
    RankMediator.prototype.onAdded = function () {
        var _this = this;
        _super.prototype.onAdded.call(this);
        this.subscrib(NotifyEnum.SET_RANK_LIST, this.showList);
        game.net.MessageDispatcher.register(game.net.ResponseType.GETRANKDATABACK, function (msg) {
            _this.getRankData(msg);
        });
        this.getView().initView();
    };
    RankMediator.prototype.getRankData = function (msg) {
        var userModel = this.getModel(UserModel);
        var list = msg.getRanklist();
        var len = list.length;
        var type = -1;
        for (var i = 0; i < len; i++) {
            var data = list[i];
            var item = new game.model.RankDataItem(data.rankType, data.rank, data.userId, data.roleLevel, data.vipLevel, data.rankValue, data.name, data.iconUrl);
            userModel.setRankList(item);
            type = item._nRankType;
        }
        var view = this.getView();
        var listData = userModel.getRankListByType(type);
        view.changeList(listData);
    };
    RankMediator.prototype.showList = function (obj, target) {
        var type = Number(obj.type);
        var userModel = target.getModel(UserModel);
        var list = userModel.getRankListByType(type);
        if (list.length == 0) {
            var send = new GetRankDataMessage();
            send.initData();
            send.setRankType(type);
            NetManager.send(send);
            return;
        }
        var view = target.getView();
        view.changeList(list);
    };
    RankMediator.prototype.init = function () {
    };
    RankMediator.prototype.destroy = function () {
        this.getView().destroy();
        this.unsubscribByType(NotifyEnum.SET_RANK_LIST);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.GETRANKDATABACK);
    };
    return RankMediator;
}(burn.mediator.SimpleMediator));
__reflect(RankMediator.prototype, "RankMediator");
//# sourceMappingURL=RankMediator.js.map