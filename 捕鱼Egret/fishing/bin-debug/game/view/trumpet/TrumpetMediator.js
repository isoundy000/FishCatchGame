var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 公告小喇叭
 */
var TrumpetMediator = (function (_super) {
    __extends(TrumpetMediator, _super);
    function TrumpetMediator(view) {
        return _super.call(this, view, "TrumpetMediator") || this;
    }
    TrumpetMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
    };
    TrumpetMediator.prototype.init = function () {
        var _this = this;
        this.subscrib(NotifyEnum.SEND_TRUMPET_MSG, this.sendTrumpetMsg);
        //监听消息返回
        game.net.MessageDispatcher.register(game.net.ResponseType.SMALLHORNBACK, function (msg) {
            _this.sendMsgBack(msg);
        });
    };
    //发送消息
    TrumpetMediator.prototype.sendTrumpetMsg = function (obj, target) {
        var userModel = burn.Director.getModelByKey(UserModel);
        var config = game.table.T_Config_Table.getVoByKey(84).value;
        var arr = config.split("_");
        var num = 0;
        if (Number(arr[0]) == PropEnum.GOLD) {
            num = userModel.getCoins();
            if (num < Number(arr[1])) {
                //TODO
                return;
            }
        }
        else if (Number(arr[0]) == PropEnum.GEM) {
            num = userModel.getMoney();
            if (num < Number(arr[1])) {
                game.util.GameUtil.openConfirmByTwoButton(null, function () {
                    var chargeView = new ChargeView(ChargeType.Gem);
                    var chargeMed = new ChargeMediator(chargeView);
                    burn.Director.pushView(chargeMed);
                }, target, game.util.Language.getText(206));
                return;
            }
        }
        else if (Number(arr[0]) == PropEnum.TICKET) {
            num = userModel.getTicket();
            if (num < Number(arr[1])) {
                //TODO
                return;
            }
        }
        //向服务器发送消息
        var msg = new SmallHornSendMessage();
        msg.initData();
        msg.setWords(obj);
        NetManager.send(msg);
    };
    //发送消息返回
    TrumpetMediator.prototype.sendMsgBack = function (msg) {
        if (msg.getResult() == 1) {
            var view = this.getView();
            view.setViewList();
        }
        else {
        }
    };
    TrumpetMediator.prototype.destroy = function () {
        game.net.MessageDispatcher.unregister(game.net.ResponseType.SMALLHORNBACK);
        this.unsubscribByType(NotifyEnum.SEND_TRUMPET_MSG);
        this.getView().destroy();
    };
    return TrumpetMediator;
}(burn.mediator.SimpleMediator));
__reflect(TrumpetMediator.prototype, "TrumpetMediator");
//# sourceMappingURL=TrumpetMediator.js.map