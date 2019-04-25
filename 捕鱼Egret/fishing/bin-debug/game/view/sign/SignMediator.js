var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SignMediator = (function (_super) {
    __extends(SignMediator, _super);
    function SignMediator(view) {
        return _super.call(this, view) || this;
    }
    SignMediator.prototype.onAdded = function () {
        var _this = this;
        _super.prototype.onAdded.call(this);
        this.subscrib(NotifyEnum.SIGN_UI_LOADED, this.uiLoadEnd);
        //监听消息
        game.net.MessageDispatcher.register(game.net.ResponseType.MONTHSIGNBACK, function (msg) {
            _this.signBack(msg);
        });
        this.getView().initView();
    };
    SignMediator.prototype.uiLoadEnd = function (obj, target) {
        var view = target.getView();
        var model = target.getModel(UserModel);
        var signObj = model.getSignObj();
        view.setListData(signObj);
    };
    SignMediator.prototype.signBack = function (msg) {
        var state = msg.getState();
        if (state == 1 || state == 2) {
            var signMsg = msg.getMonthSignActiveInfo();
            var model = this.getModel(UserModel);
            model.setSignObj(signMsg);
            var signObj = model.getSignObj();
            var view = this.getView();
            view.setListData(signObj);
            var signTimes = signObj.getCumulativeSignTimes(); //累计签到次数
            var vos = game.table.T_MonthSign_Table.getAllVo();
            var month = signObj.CurMonth();
            var len = vos.length;
            var arrData = null;
            for (var i = 0; i < len; i++) {
                if (vos[i].month == month && vos[i].date == signTimes) {
                    arrData = vos[i];
                }
            }
            if (!arrData) {
                return;
            }
            var arr = arrData.award;
            var gainArr = new Array();
            var str = arr.split(",");
            len = str.length;
            var vipMin = arrData.vipMin;
            var userModel = burn.Director.getModelByKey(UserModel);
            for (var i = 0; i < len; i++) {
                var dataS = str[i].split("_");
                if (userModel.getVipLevel() >= vipMin && vipMin > 0) {
                    gainArr.push(new game.model.Item(Number(dataS[0]), Number(dataS[1]) * 2, 0));
                }
                else {
                    gainArr.push(new game.model.Item(Number(dataS[0]), Number(dataS[1]), 0));
                }
            }
            game.util.GameUtil.openCommongain(null, gainArr);
            burn._Notification_.send(NotifyEnum.CHECK_MAIN_ALERT);
            return;
        }
        else {
            if (state == 0) {
                var signMsg = msg.getMonthSignActiveInfo();
                var model = this.getModel(UserModel);
                model.setSignObj(signMsg);
                var signObj = model.getSignObj();
                var view = this.getView();
                view.setListData(signObj);
                return;
            }
            //提示 ///-2.今天已经补签,-1.今天已经签到,0.跨天更新,1.签到成功,2.补签成功
            /** public static final int ACTIVE_MONTH_SIGN_STATE_NO_TOKEN_MAKED_UP = -7;//没有补签货币 95
                public static final int ACTIVE_MONTH_SIGN_STATE_TYPE_ERROR = -6;//类型不对            96
                public static final int ACTIVE_MONTH_SIGN_STATE_MAKED_UP_ERROR = -5;//不需要补签      97
                public static final int ACTIVE_MONTH_SIGN_STATE_MAKED_UP_TIMES_ERROR = -4;//补签次数不足 98
                public static final int ACTIVE_MONTH_SIGN_STATE_MAKED_UP_BEFORE_SIGN_ERROR = -3;//补签前请签到   109
                public static final int ACTIVE_MONTH_SIGN_STATE_MAKED_UP = -2;//今日已经补签         110
                public static final int ACTIVE_MONTH_SIGN_STATE_SIGNED = -1;//今日已经签到           111
                public static final int ACTIVE_MONTH_SIGN_STATE_FRESH = 0;//跨月刷新                 112 */
            switch (state) {
                case Sign_State.ACTIVE_MONTH_SIGN_STATE_NO_TOKEN_MAKED_UP:
                    game.util.GameUtil.openConfirmByTwoButton(null, function () {
                        var chargeView = new ChargeView(ChargeType.Gem);
                        var chargeMed = new ChargeMediator(chargeView);
                        burn.Director.pushView(chargeMed);
                    }, this, game.util.Language.getText(222));
                    break;
                case Sign_State.ACTIVE_MONTH_SIGN_STATE_TYPE_ERROR:
                    game.util.GameUtil.popTips(game.util.Language.getText(96));
                    break;
                case Sign_State.ACTIVE_MONTH_SIGN_STATE_MAKED_UP_ERROR:
                    game.util.GameUtil.popTips(game.util.Language.getText(97));
                    break;
                case Sign_State.ACTIVE_MONTH_SIGN_STATE_MAKED_UP_TIMES_ERROR:
                    game.util.GameUtil.popTips(game.util.Language.getText(98));
                    break;
                case Sign_State.ACTIVE_MONTH_SIGN_STATE_MAKED_UP_BEFORE_SIGN_ERROR:
                    game.util.GameUtil.popTips(game.util.Language.getText(109));
                    break;
                case Sign_State.ACTIVE_MONTH_SIGN_STATE_MAKED_UP:
                    game.util.GameUtil.popTips(game.util.Language.getText(110));
                    break;
                case Sign_State.ACTIVE_MONTH_SIGN_STATE_SIGNED:
                    game.util.GameUtil.popTips(game.util.Language.getText(111));
                    break;
            }
        }
    };
    SignMediator.prototype.init = function () {
    };
    SignMediator.prototype.destroy = function () {
        this.unsubscribByType(NotifyEnum.SIGN_UI_LOADED);
        game.net.MessageDispatcher.unregisterByType(game.net.ResponseType.MONTHSIGNBACK);
        this.getView().destroy();
    };
    return SignMediator;
}(burn.mediator.SimpleMediator));
__reflect(SignMediator.prototype, "SignMediator");
//# sourceMappingURL=SignMediator.js.map