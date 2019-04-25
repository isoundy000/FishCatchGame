var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MonthCardMediator = (function (_super) {
    __extends(MonthCardMediator, _super);
    function MonthCardMediator(view) {
        return _super.call(this, view) || this;
    }
    MonthCardMediator.prototype.onAdded = function () {
        var _this = this;
        _super.prototype.onAdded.call(this);
        this.getView().initView();
        var uModel = this.getModel(UserModel);
        uModel.bOpenedMonthUI = true;
        game.net.MessageDispatcher.register(game.net.ResponseType.CHARGEBACK, function (msg) {
            _this.buyChargeItemBack(msg);
        });
    };
    MonthCardMediator.prototype.buyChargeItemBack = function (msg) {
        var state = msg.getState(); ////0失败 1成功  3货币不足 2 不存在这个档位
        if (state == 1) {
            var vos = game.table.T_Charge_Table.getAllVo();
            var len = vos.length;
            var voMonthCard = null;
            for (var i = 0; i < len; i++) {
                if (vos[i].type == 4) {
                    voMonthCard = vos[i];
                    break;
                }
            }
            var priceArr = voMonthCard.price.split("_");
            var priceStr = "";
            if (priceArr[0] == 10012) {
                priceStr = priceArr[1] + "点券";
            }
            var self = this;
            game.util.GameUtil.openConfirmByTwoButton(null, function () {
                var id = msg.getChargeId();
                var vo = game.table.T_Charge_Table.getVoByKey(id);
                var userModel = self.getModel(UserModel);
                if ((userModel.getMonthEndTime() - game.util.TimeUtil.getCurrTime()) > 0) {
                    game.util.GameUtil.openConfirm(null, null, this, game.util.Language.getText(2422));
                }
                else {
                    var view1 = new MonthCardRewardView(true);
                    var med1 = new MonthCardRewardMediator(view1);
                    burn.Director.pushView(med1);
                }
                userModel.setTicket(msg.getCurCoupon());
                userModel.setMonthEndTime(msg.getMonthEndTime());
                var view = self.getView();
                view.setData();
            }, self, game.util.Language.getDynamicText(125, [priceStr]));
        }
        else {
            if (state == 3) {
                game.util.GameUtil.openConfirmByTwoButton(null, function () {
                    var chargeView = new ChargeView(ChargeType.Ticket);
                    var chargeMed = new ChargeMediator(chargeView);
                    burn.Director.pushView(chargeMed);
                }, this, game.util.Language.getText(204));
            }
        }
        burn._Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
    };
    MonthCardMediator.prototype.init = function () {
    };
    MonthCardMediator.prototype.update = function () {
        var _this = this;
        game.net.MessageDispatcher.unregister(game.net.ResponseType.CHARGEBACK);
        game.net.MessageDispatcher.register(game.net.ResponseType.CHARGEBACK, function (msg) {
            _this.buyChargeItemBack(msg);
        });
    };
    MonthCardMediator.prototype.destroy = function () {
        game.net.MessageDispatcher.unregister(game.net.ResponseType.CHARGEBACK);
        this.getView().destroy();
    };
    return MonthCardMediator;
}(burn.mediator.SimpleMediator));
__reflect(MonthCardMediator.prototype, "MonthCardMediator");
//# sourceMappingURL=MohthCardMediator.js.map