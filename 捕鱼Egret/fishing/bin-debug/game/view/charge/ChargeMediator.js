var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChargeMediator = (function (_super) {
    __extends(ChargeMediator, _super);
    function ChargeMediator(view) {
        return _super.call(this, view, "ChargeMediator") || this;
    }
    ChargeMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        this.getView().initView();
    };
    ChargeMediator.prototype.init = function () {
        var _this = this;
        //注册观察者
        this.subscrib(NotifyEnum.BUY_CHARGE_ITEM, this.buyChargeItem);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.CHARGEBACK);
        game.net.MessageDispatcher.register(game.net.ResponseType.CHARGEBACK, function (msg) {
            _this.buyChargeItemBack(msg);
        });
    };
    ChargeMediator.prototype.showList = function (obj, target) {
        var view = target.getView();
        if (obj == null) {
            view.showListByType(ChargeType.Gold);
            return;
        }
        view.showListByType(Number(obj));
    };
    ChargeMediator.prototype.buyChargeItem = function (obj, target) {
        if (obj.type == ChargeType.Ticket) {
            if (false && CONFIG.PLATFORM_ID > 0) {
                var vo = game.table.T_Charge_Table.getVoByKey(obj.id);
                game.platform.PaymentManager.pay(obj.id, Number(vo.price));
            }
            else {
                var msg = new ChargeSendMessage();
                msg.initData();
                msg.setChargeId(obj.id);
                NetManager.send(msg);
            }
        }
        else {
            var itemVo = game.table.T_Charge_Table.getVoByKey(obj.id);
            if (itemVo) {
                var userModel = burn.Director.getModelByKey(UserModel);
                var num = Number(itemVo.price.split("_")[1]);
                if (userModel.getTicket() < num) {
                    game.util.GameUtil.openConfirmByTwoButton(null, function () {
                        var view = target.getView();
                        view.showListByType(ChargeType.Ticket);
                    }, target, game.util.Language.getText(204));
                }
                else {
                    var msg = new ChargeSendMessage();
                    msg.initData();
                    msg.setChargeId(obj.id);
                    NetManager.send(msg);
                }
            }
        }
    };
    ChargeMediator.prototype.buyChargeItemBack = function (msg) {
        //PC端 关闭扫码支付页面
        if (IsInPC() && CONFIG.IS_WEB) {
            closeQrPayPanel();
        }
        var state = msg.getState();
        if (state == 1) {
            var id = msg.getChargeId();
            var isFirst = msg.getIsFirst(); //1:是首充， 0：不是首冲
            var vo = game.table.T_Charge_Table.getVoByKey(id);
            var gainArr = new Array();
            var arr = vo.award.split("_");
            var num = Number(arr[1]);
            if (isFirst == 1 && vo.firstAward != "0") {
                var firstAwardList = vo.firstAward.split("_");
                //num += Number(firstAwardList[1]);
                var item = new game.model.Item(Number(firstAwardList[0]), Number(firstAwardList[1]));
                gainArr.push(item);
            }
            var awardItem = new game.model.Item(Number(arr[0]), num);
            gainArr.push(awardItem);
            //当前vip等级
            var vipLeve = Number(msg.getVipLevel());
            //处理VIP额外赠送的部分
            var vipVo = game.table.T_VipLevel_Table.getVoByKey(vipLeve);
            if (vipVo) {
                if (vipVo.couponBuyAdditionRatioByType != "0") {
                    var vipArr = vipVo.couponBuyAdditionRatioByType.split("_");
                    if (Number(vipArr[0]) == vo.type) {
                        var vipItem = void 0;
                        if (vo.type == 1) {
                            vipItem = new game.model.Item(PropEnum.GOLD, Math.floor(num * Number(vipArr[1]) / 100));
                        }
                        else if (vo.type == 2) {
                            vipItem = new game.model.Item(PropEnum.GEM, Math.floor(num * Number(vipArr[1]) / 100));
                        }
                        else if (vo.type == 3) {
                            vipItem = new game.model.Item(PropEnum.TICKET, Math.floor(num * Number(vipArr[1]) / 100));
                        }
                        gainArr.push(vipItem);
                    }
                }
            }
            game.util.GameUtil.openCommongain(null, gainArr);
            var userModel = burn.Director.getModelByKey(UserModel);
            if (vo.type == 3) {
                if (userModel.getTatolChargeRMB() == 0) {
                    var str = game.table.T_Config_Table.getVoByKey(53).value;
                    var datas = str.split(",");
                    var len = datas.length;
                    var gainArr1 = new Array();
                    for (var i = 0; i < len; i++) {
                        var itemStr = datas[i].split("_");
                        var itemId = Number(itemStr[0]);
                        var itemCount = Number(itemStr[1]);
                        var tempItem = new game.model.Item(itemId, itemCount);
                        gainArr1.push(tempItem);
                    }
                    game.util.GameUtil.openCommongain(null, gainArr1);
                    userModel.setTatolChargeRMB(num);
                }
                userModel.setTicket(msg.getCurCoupon());
            }
            userModel.setVipLevel(vipLeve);
            userModel.setTatolChargeRMB(Number(msg.getVipExp()));
            userModel.addChargedGears(id);
            var view = this.getView();
            view.showListByType(view._toType, true);
            burn._Notification_.send(NotifyEnum.CHECN_VIP_ITEM);
        }
        else {
            game.util.GameUtil.popTips(game.util.Language.getText(173));
        }
        burn._Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
    };
    ChargeMediator.prototype.destroy = function () {
        this.getView().destroy();
        this.unsubscribByType(NotifyEnum.BUY_CHARGE_ITEM);
        //清除消息
        game.net.MessageDispatcher.unregister(game.net.ResponseType.CHARGEBACK);
    };
    return ChargeMediator;
}(burn.mediator.SimpleMediator));
__reflect(ChargeMediator.prototype, "ChargeMediator");
//# sourceMappingURL=ChargeMediator.js.map