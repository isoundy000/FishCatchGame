var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CircleMediator = (function (_super) {
    __extends(CircleMediator, _super);
    function CircleMediator(view) {
        return _super.call(this, view) || this;
    }
    CircleMediator.prototype.onAdded = function () {
        var _this = this;
        _super.prototype.onAdded.call(this);
        game.net.MessageDispatcher.register(game.net.ResponseType.DAILYLOGINDRAWBACK, function (msg) {
            _this.getDraw(msg);
        });
        this.getView().initView();
    };
    CircleMediator.prototype.getDraw = function (msg) {
        var state = msg.getState();
        if (state != 1) {
            //提示
            game.util.GameUtil.popTips(game.util.Language.getText(124));
            return;
        }
        var index = msg.getIndex();
        var view = this.getView();
        view.showResult(Number(index));
        var userModel = this.getModel(UserModel);
        userModel.setIsTodayDraw(1);
    };
    CircleMediator.prototype.init = function () {
    };
    CircleMediator.prototype.destroy = function () {
        this.getView().destroy();
        game.net.MessageDispatcher.unregister(game.net.ResponseType.DAILYLOGINDRAWBACK);
    };
    return CircleMediator;
}(burn.mediator.SimpleMediator));
__reflect(CircleMediator.prototype, "CircleMediator");
//# sourceMappingURL=CircleMediator.js.map