var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ActiveMediator = (function (_super) {
    __extends(ActiveMediator, _super);
    function ActiveMediator(view) {
        var _this = _super.call(this, view) || this;
        _this._nIndex = 0;
        return _this;
    }
    ActiveMediator.prototype.onAdded = function () {
        var _this = this;
        _super.prototype.onAdded.call(this);
        this.subscrib(NotifyEnum.CHANGE_ACTIVE, this.clickItem);
        this.getView().initView();
        //监听服务器
        game.net.MessageDispatcher.register(game.net.ResponseType.LIMITEDTIMEACTIVEINFO, function (msg) {
            _this.activeInfo(msg);
        });
        //返回
        game.net.MessageDispatcher.register(game.net.ResponseType.LIMITEDTIMEACTIVEBACK, function (msg) {
            _this.activeBack(msg);
        });
        var userModel = this.getModel(UserModel);
        userModel.bOpenedActiveUI = true;
        burn._Notification_.send(NotifyEnum.ACTIVE_CONFIG_DATA_LOAEDED);
    };
    ActiveMediator.prototype.activeBack = function (msg) {
        var result = msg.getResult();
        /**
         *  LIMIT_TIME_ACTIVE_RESULT_STATE_OPERAITONED = 0;// 执行过已经领取或接受过了
            LIMIT_TIME_ACTIVE_RESULT_STATE_SUCCESS = 1;// 成功
            LIMIT_TIME_ACTIVE_RESULT_STATE_NO_PRICE = 2;// 钱不够
            LIMIT_TIME_ACTIVE_RESULT_STATE_NO_PRICE_INDEX = 3;// 没有该货币
            LIMIT_TIME_ACTIVE_RESULT_STATE_CHARGE_LESS = 4;// 充值金额不够
            LIMIT_TIME_ACTIVE_RESULT_STATE_VIP_NO_AWARD = 5;// 当前vip等级没有奖励*/
        var view = this.getView();
        var activeModel = burn.Director.getModelByKey(ActiveModel);
        switch (result) {
            case 0:
                break;
            case 1:
                if (view._list[this._nIndex]._type == Active_Type.LIMIT_TIME_ACTIVE_TYPE_CHARGE_SEND) {
                    //console.log("充值送送送，领取奖励成功");
                    game.util.ReyunUtil.sendEvent(game.util.LogEnum.CHONGZHISONG_RECEIVE_COUNT);
                    game.util.GameUtil.popTips(game.util.Language.getText(184));
                }
                else if (view._list[this._nIndex]._type == Active_Type.LIMIT_TIME_ACTIVE_TYPE_VIP_SEND) {
                    //console.log("vip 领取奖励成功");
                    game.util.GameUtil.popTips(game.util.Language.getText(183));
                    game.util.ReyunUtil.sendEvent(game.util.LogEnum.VIPFREESEND_RECEIVE_COUNT);
                }
                else if (view._list[this._nIndex]._type == Active_Type.LIMIT_TIME_ACTIVE_TYPE_SECRET_SHOP) {
                    //console.log("神秘商店购买成功");
                    game.util.GameUtil.popTips(game.util.Language.getText(188));
                }
                else if (view._list[this._nIndex]._type == Active_Type.LIMIT_TIME_ACTIVE_TYPE_FISH_SEND) {
                    var activeModel_1 = this.getModel(ActiveModel);
                    var info_1 = msg.getInfo();
                    var awardData = info_1.getSendAwardActiveInfo();
                    var lenAward = awardData.length;
                    for (var i = 0; i < lenAward; i++) {
                        var obj = activeModel_1.getActiveObjById(awardData[i].getId());
                        var dataObj = new game.model.ActiveData(awardData[i], obj);
                        if (dataObj._state == Active_State.LIMIT_TIME_ACTIVE_STATE_ACCEPTED && obj._type == Active_Type.LIMIT_TIME_ACTIVE_TYPE_FISH_SEND) {
                            game.util.ReyunUtil.sendEvent(game.util.LogEnum.DAYUSONGLI_START_COUNT);
                            game.util.GameUtil.popTips(game.util.Language.getText(2438));
                            break;
                        }
                    }
                }
                break;
            case 2:
                if (view._list[this._nIndex]._type == Active_Type.LIMIT_TIME_ACTIVE_TYPE_SECRET_SHOP) {
                    //console.log("神秘商店 货币不足");
                    game.util.GameUtil.popTips(game.util.Language.getText(189));
                }
                break;
            case 3:
                break;
            case 4:
                if (view._list[this._nIndex]._type == Active_Type.LIMIT_TIME_ACTIVE_TYPE_CHARGE_SEND) {
                    //console.log("#充值金额不足，不能领取奖励");
                    game.util.GameUtil.popTips(game.util.Language.getText(185));
                }
                break;
        }
        if (msg.getInfo() == null) {
            return;
        }
        var info = msg.getInfo();
        this.activeInfo(info);
        burn._Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
    };
    ActiveMediator.prototype.activeInfo = function (msg) {
        //处理活动数据
        var view = this.getView();
        var activeModel = this.getModel(ActiveModel);
        activeModel.setActiveCoin(Number(msg.getActiveCoin()));
        //获取服务器数据，缓存至model
        activeModel.setActiveInfo(msg);
        view.setLeftList(activeModel.getActiveList());
        //选择第一个活动
        view.changeActive(this._nIndex);
    };
    ActiveMediator.prototype.clickItem = function (obj, target) {
        var nIndex = Number(obj);
        var view = target.getView();
        view.changeActive(nIndex);
        target._nIndex = nIndex;
    };
    ActiveMediator.prototype.init = function () {
    };
    ActiveMediator.prototype.destroy = function () {
        this.getView().destroy();
        this.unsubscribByType(NotifyEnum.CHANGE_ACTIVE);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.LIMITEDTIMEACTIVEINFO);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.LIMITEDTIMEACTIVEBACK);
    };
    return ActiveMediator;
}(burn.mediator.SimpleMediator));
__reflect(ActiveMediator.prototype, "ActiveMediator");
//# sourceMappingURL=ActiveMediator.js.map