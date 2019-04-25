var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ExchangeMediator = (function (_super) {
    __extends(ExchangeMediator, _super);
    function ExchangeMediator(view) {
        return _super.call(this, view) || this;
    }
    ExchangeMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        this.getView().initView();
    };
    ExchangeMediator.prototype.init = function () {
        //注册观察者
        this.subscrib(NotifyEnum.SET_EXCHANGE_LIST, this.setList);
        this.subscrib(NotifyEnum.EXCHANGE_ITEM, this.exchangeItem);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.EXCHANGEGOODSBACK);
        var self = this;
        //监听
        game.net.MessageDispatcher.register(game.net.ResponseType.EXCHANGEBACK, function (msg) {
            self.exchangeBack(msg);
        });
        //监听
        game.net.MessageDispatcher.register(game.net.ResponseType.EXCHANGEGOODSBACK, function (msg) {
            self.exchangeGoodsBack(msg);
        });
        game.net.MessageDispatcher.register(game.net.ResponseType.LOOPEXCHANGERECORDSBACK, function (msg) {
            self.loopExchangeBack(msg);
        });
    };
    ExchangeMediator.prototype.loopExchangeBack = function (msg) {
        var list = msg.getRecordList();
        var view = this.getView();
        view.setRecodeList(list);
    };
    ExchangeMediator.prototype.exchangeGoodsBack = function (msg) {
        var userModel = this.getModel(UserModel);
        var exchangeModel = this.getModel(ExchangeModel);
        exchangeModel.clearList();
        var items = msg.getItemList();
        var len = items.length;
        for (var i = 0; i < len; i++) {
            var item = items[i];
            var data = new game.model.ExchangeItem(item.id, item.name, item.type, item.exchangePriceId, item.exchangePrice, item.instruction, item.marketPrice, item.url, item.minVip, item.goodsId, item.goodsNum, item.serverNum, item.orders, item.loopRecordColor, item.minGunId, item.deliveryState);
            exchangeModel.addItem(data);
        }
        var view = this.getView();
        var itemTicks = new game.model.Item(PropEnum.FISH_TICKIT, 1);
        var num = 0;
        if (userModel.isExist(itemTicks)) {
            num = userModel.getItemById(PropEnum.FISH_TICKIT).getCount();
        }
        var dantouNum = 0;
        var dantou = userModel.getItemById(PropEnum.GOLD_WARHEAD);
        if (dantou) {
            dantouNum = dantou.getCount();
        }
        //过滤已经兑换过的1、5、10元红包
        var exchangeList = new Array();
        for (var _i = 0, _a = exchangeModel.getList(); _i < _a.length; _i++) {
            var temp = _a[_i];
            if (!userModel.isInExchanged(temp._id)) {
                exchangeList.push(temp);
            }
        }
        view.setList(exchangeList, num, dantouNum);
    };
    ExchangeMediator.prototype.exchangeBack = function (msg) {
        var state = msg.getState();
        if (state == 1) {
            var record_1 = msg.getRecord();
            var goodsID_1 = record_1.goodsId;
            var exchangeModel_1 = this.getModel(ExchangeModel);
            var vo_1 = exchangeModel_1.getListById(goodsID_1);
            if (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET || CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
                game.util.GameUtil.popTips(game.util.Language.getText(67));
                var yaoQingView = new ShareZiYou(ShareType.Share_Money, vo_1);
                var view_1 = this.getView();
                view_1.addChild(yaoQingView);
                return;
            }
        }
        else {
            /**
             *  public static final int EXCHANGE_ERROR_NO_GOODSID = -1;
                public static final int EXCHANGE_ERROR_CURRENCY_SHORTAGE = 0;// 0因为货币不足失败
                public static final int EXCHANGE_SUCCESSS = 1;// 1成功
                public static final int EXCHANGE_ERROR_SERVER_NONE = 2;// 2因为服务器数目不足
                public static final int EXCHANGE_ERROR_VIP = 3;// 3vip不够
                public static final int EXCHANGE_ERROR_BACKPACK_MAX = 4;// 4背包满了
            */
            if (state == -1) {
                game.util.GameUtil.popTips(game.util.Language.getText(51));
            }
            else if (state == 0) {
                game.util.GameUtil.popTips(game.util.Language.getText(89));
            }
            else if (state == 2) {
                game.util.GameUtil.popTips(game.util.Language.getText(90));
            }
            else if (state == 3) {
                game.util.GameUtil.popTips(game.util.Language.getText(91));
                //弹出vip界面
                var vipView = new VipView();
                var vipMed = new VipMediator(vipView);
                burn.Director.pushView(vipMed);
            }
            else if (state == 4) {
                game.util.GameUtil.popTips(game.util.Language.getText(92));
            }
            else if (state == 5) {
                game.util.GameUtil.popTips(game.util.Language.getText(170));
            }
            else if (state == 6) {
                game.util.GameUtil.popTips(game.util.Language.getText(171));
            }
            return;
        }
        //this.setList(null,this);
        var record = msg.getRecord();
        var goodsID = record.goodsId;
        var userModel = burn.Director.getModelByKey(UserModel);
        if (goodsID == 1100 || goodsID == 1101 || goodsID == 1102) {
            userModel.addExchangeGears(goodsID);
        }
        var exchangeModel = this.getModel(ExchangeModel);
        var vo = exchangeModel.getListById(goodsID);
        if (vo._type == Exchange_type.Goods) {
            var gainArr = new Array();
            gainArr.push(new game.model.Item(vo._goodsId, vo._goodsNum));
            game.util.GameUtil.openCommongain(null, gainArr);
            burn._Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
            this.setList(null, this);
        }
        //更新数量显示
        var view = this.getView();
        var ticketNum = 0;
        var ticket = userModel.getItemById(PropEnum.FISH_TICKIT);
        if (ticket) {
            ticketNum = ticket.getCount();
        }
        var dantouNum = 0;
        var dantou = userModel.getItemById(PropEnum.GOLD_WARHEAD);
        if (dantou) {
            dantouNum = dantou.getCount();
        }
        //过滤已经兑换过的1、5、10元红包
        var exchangeList = new Array();
        for (var _i = 0, _a = exchangeModel.getList(); _i < _a.length; _i++) {
            var temp = _a[_i];
            if (!userModel.isInExchanged(temp._id)) {
                exchangeList.push(temp);
            }
        }
        view.setList(exchangeList, ticketNum, dantouNum);
    };
    ExchangeMediator.prototype.setList = function (obj, target) {
        var send = new ExchangeGoodsSendMessage();
        send.initData();
        NetManager.send(send);
        var send1 = new LoopExchangeRecordsSendMessage();
        send1.initData();
        NetManager.send(send1);
    };
    ExchangeMediator.prototype.exchangeItem = function (obj, target) {
        var userModel = target.getModel(UserModel);
        var exchangeModel = burn.Director.getModelByKey(ExchangeModel);
        var vo = exchangeModel.getListById(Number(obj));
        var num = 0;
        var ite = null;
        if (vo._exchangePriceId == PropEnum.FISH_TICKIT) {
            ite = userModel.getItemById(PropEnum.FISH_TICKIT);
        }
        else if (vo._exchangePriceId == PropEnum.GOLD_WARHEAD) {
            ite = userModel.getItemById(PropEnum.GOLD_WARHEAD);
        }
        if (ite) {
            num = ite.getCount();
        }
        if (num < vo._exchangePrice) {
            if (vo._exchangePriceId == PropEnum.FISH_TICKIT) {
                game.util.GameUtil.popTips(game.util.Language.getText(56));
            }
            else if (vo._exchangePriceId == PropEnum.GOLD_WARHEAD) {
                game.util.GameUtil.popTips(game.util.Language.getText(126));
            }
            return;
        }
        var vipLv = userModel.getVipLevel();
        if (vipLv < vo._minVip) {
            var arrName = new Array();
            arrName.push((vo._minVip) + "");
            game.util.GameUtil.popTips(game.util.Language.getDynamicText(91, arrName));
            return;
        }
        if (vo._type == Exchange_type.Items) {
            var exchangeSureView = new ExchangeSureView();
            var exchangeSureMed = new ExchangeSureMediator(exchangeSureView);
            exchangeSureMed.setData(Number(obj));
            burn.Director.pushView(exchangeSureMed);
        }
        else if (vo._type == Exchange_type.Goods) {
            var str = game.util.Language.getDynamicText(169, [vo._name]);
            game.util.GameUtil.openConfirmByTwoButton(null, function () {
                var req = new ExchangeSendMessage();
                req.initData();
                req.setGoodsId(vo._id);
                NetManager.send(req);
            }, target, str);
        }
        else if (vo._type == Exchange_type.Ticket) {
            var exchangeTicketView = new ExchangeTicketView(Number(obj));
            var exchangeTicketVMed = new ExchangeTicketMediator(exchangeTicketView);
            burn.Director.pushView(exchangeTicketVMed);
        }
        else if (vo._type == 4) {
            var strNum = Number(vo._name.substring(0, vo._name.length - 3)); //根据名字判断是一元红包
            if (strNum == 1) {
                var exchangeRedPacketView = new ExchangeRedPacketView(Number(obj));
                var exchangeRedPacketMed = new ExchangeRedPacketMediator(exchangeRedPacketView);
                burn.Director.pushView(exchangeRedPacketMed);
                return;
            }
            var exchangeTicketView = new ExchangeTicketView(Number(obj));
            var exchangeTicketVMed = new ExchangeTicketMediator(exchangeTicketView);
            burn.Director.pushView(exchangeTicketVMed);
        }
    };
    ExchangeMediator.prototype.destroy = function () {
        this.getView().destroy();
        this.unsubscribByType(NotifyEnum.SET_EXCHANGE_LIST);
        this.unsubscribByType(NotifyEnum.EXCHANGE_ITEM);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.EXCHANGEBACK);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.EXCHANGEGOODSBACK);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.LOOPEXCHANGERECORDSBACK);
    };
    return ExchangeMediator;
}(burn.mediator.SimpleMediator));
__reflect(ExchangeMediator.prototype, "ExchangeMediator");
//# sourceMappingURL=ExchangeMediator.js.map