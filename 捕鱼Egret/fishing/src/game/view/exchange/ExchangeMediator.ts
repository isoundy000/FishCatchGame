class ExchangeMediator extends burn.mediator.SimpleMediator {
	public constructor(view:burn.view.ViewBase) {
		super(view);
	}

	public onAdded() {
		super.onAdded();
		(this.getView() as ExchangeView).initView();
	}

	public init():void {
		//注册观察者
		this.subscrib(NotifyEnum.SET_EXCHANGE_LIST, this.setList);
		this.subscrib(NotifyEnum.EXCHANGE_ITEM, this.exchangeItem);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.EXCHANGEGOODSBACK);
		let self = this;
        //监听
        game.net.MessageDispatcher.register(game.net.ResponseType.EXCHANGEBACK, function(msg:ExchangeBackMessage):void {
            self.exchangeBack(msg);
        });
		//监听
        game.net.MessageDispatcher.register(game.net.ResponseType.EXCHANGEGOODSBACK, function(msg:ExchangeGoodsBackMessage):void {
            self.exchangeGoodsBack(msg);
        });
        game.net.MessageDispatcher.register(game.net.ResponseType.LOOPEXCHANGERECORDSBACK, function(msg:LoopExchangeRecordsBackMessage):void {
            self.loopExchangeBack(msg);
        });
	}
	public loopExchangeBack(msg:LoopExchangeRecordsBackMessage):void
	{
		let list = msg.getRecordList();
		let view = (this.getView() as ExchangeView);
		view.setRecodeList(list);
	}
	public exchangeGoodsBack(msg:ExchangeGoodsBackMessage):void
	{
		let userModel:UserModel = this.getModel(UserModel) as UserModel;
		let exchangeModel:ExchangeModel = this.getModel(ExchangeModel) as ExchangeModel;
		exchangeModel.clearList();
		let items = msg.getItemList();
		let len = items.length;
		for(let i = 0; i < len; i++)
		{
			let item = items[i];
			let data = new game.model.ExchangeItem(item.id,item.name,item.type,item.exchangePriceId,item.exchangePrice,item.instruction,
												item.marketPrice,item.url,item.minVip,item.goodsId,item.goodsNum,item.serverNum, 
												item.orders, item.loopRecordColor, item.minGunId, item.deliveryState);
			exchangeModel.addItem(data);								
		}
		let view = (this.getView() as ExchangeView);
		let itemTicks = new game.model.Item(PropEnum.FISH_TICKIT,1);
		let num = 0;
		if(userModel.isExist(itemTicks))
		{
			num = userModel.getItemById(PropEnum.FISH_TICKIT).getCount();
		}
		let dantouNum = 0;
		let dantou = userModel.getItemById(PropEnum.GOLD_WARHEAD);
		if (dantou) {
			dantouNum = dantou.getCount();
		}
		//过滤已经兑换过的1、5、10元红包
		let exchangeList = new Array<game.model.ExchangeItem>();
		for (let temp of exchangeModel.getList()) {
			if (!userModel.isInExchanged(temp._id)) {
				exchangeList.push(temp);
			}
		}
		view.setList(exchangeList, num, dantouNum);
	}
	public exchangeBack(msg:ExchangeBackMessage):void
	{
		let state = msg.getState();
		if (state == 1) {
			let record = msg.getRecord();
			let goodsID = record.goodsId;
			let exchangeModel:ExchangeModel = this.getModel(ExchangeModel) as ExchangeModel;
			let vo = exchangeModel.getListById(goodsID);
            if (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET || CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
				game.util.GameUtil.popTips(game.util.Language.getText(67)); 
				let yaoQingView = new ShareZiYou(ShareType.Share_Money,vo);
				let view = this.getView() as ExchangeView;
				view.addChild(yaoQingView);
				return;
			}
		} else {
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
			} else if (state == 0) {
				game.util.GameUtil.popTips(game.util.Language.getText(89)); 
			} else if (state == 2) {
				game.util.GameUtil.popTips(game.util.Language.getText(90)); 
			} else if (state == 3) {
				game.util.GameUtil.popTips(game.util.Language.getText(91)); 
				//弹出vip界面
				let vipView:VipView = new VipView();
				let vipMed:VipMediator = new VipMediator(vipView);
				burn.Director.pushView(vipMed);
			} else if (state == 4) {
				game.util.GameUtil.popTips(game.util.Language.getText(92)); 
			} else if (state == 5) {
				game.util.GameUtil.popTips(game.util.Language.getText(170)); 
			} else if (state == 6) {
				game.util.GameUtil.popTips(game.util.Language.getText(171)); 
			}
			return;
		}
		//this.setList(null,this);
		let record = msg.getRecord();
		let goodsID = record.goodsId;
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		if (goodsID == 1100 || goodsID == 1101 || goodsID == 1102) {
			userModel.addExchangeGears(goodsID);
		}
		let exchangeModel:ExchangeModel = this.getModel(ExchangeModel) as ExchangeModel;
		let vo = exchangeModel.getListById(goodsID);
		if (vo._type == Exchange_type.Goods) {
			let gainArr = new Array<game.model.Item>();
			gainArr.push(new game.model.Item(vo._goodsId,vo._goodsNum));
			game.util.GameUtil.openCommongain(null,gainArr);
			burn._Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
			this.setList(null,this);
		}
		//更新数量显示
		let view = (this.getView() as ExchangeView);
		let ticketNum = 0;
		let ticket = userModel.getItemById(PropEnum.FISH_TICKIT);
		if (ticket) {
			ticketNum = ticket.getCount();
		}
		let dantouNum = 0;
		let dantou = userModel.getItemById(PropEnum.GOLD_WARHEAD);
		if (dantou) {
			dantouNum = dantou.getCount();
		}
		//过滤已经兑换过的1、5、10元红包
		let exchangeList = new Array<game.model.ExchangeItem>();
		for (let temp of exchangeModel.getList()) {
			if (!userModel.isInExchanged(temp._id)) {
				exchangeList.push(temp);
			}
		}
		view.setList(exchangeList, ticketNum, dantouNum);
	}
	public setList(obj:any, target:any):void
	{
		let send:ExchangeGoodsSendMessage = new ExchangeGoodsSendMessage();
        send.initData();
		NetManager.send(send);

		let send1:LoopExchangeRecordsSendMessage = new LoopExchangeRecordsSendMessage();
        send1.initData();
		NetManager.send(send1);
	}
	public exchangeItem(obj:any, target:any):void
	{
		let userModel:UserModel = target.getModel(UserModel) as UserModel;

		let exchangeModel:ExchangeModel = burn.Director.getModelByKey(ExchangeModel) as ExchangeModel;
		let vo = exchangeModel.getListById(Number(obj));

		let num = 0;
		let ite:game.model.Item = null;
		if (vo._exchangePriceId == PropEnum.FISH_TICKIT) {
			ite = userModel.getItemById(PropEnum.FISH_TICKIT);
		} else if (vo._exchangePriceId == PropEnum.GOLD_WARHEAD) {
			ite = userModel.getItemById(PropEnum.GOLD_WARHEAD);
		}
		if (ite) {
			num = ite.getCount();
		}
		if(num < vo._exchangePrice)
		{
			if (vo._exchangePriceId == PropEnum.FISH_TICKIT) {
				game.util.GameUtil.popTips(game.util.Language.getText(56));
			} else if (vo._exchangePriceId == PropEnum.GOLD_WARHEAD) {
				game.util.GameUtil.popTips(game.util.Language.getText(126));
			}
			return;
		}
		let vipLv = userModel.getVipLevel();
		if(vipLv < vo._minVip)
		{
			let arrName = new Array<string>();
			arrName.push((vo._minVip) + "");
			game.util.GameUtil.popTips(game.util.Language.getDynamicText(91,arrName)); 
			return;
		}
		if(vo._type == Exchange_type.Items)
		{
			let exchangeSureView:ExchangeSureView = new ExchangeSureView();
			let exchangeSureMed:ExchangeSureMediator = new ExchangeSureMediator(exchangeSureView);
			exchangeSureMed.setData(Number(obj));
			burn.Director.pushView(exchangeSureMed);
		} else if (vo._type == Exchange_type.Goods) {
			let str = game.util.Language.getDynamicText(169, [vo._name]);
			game.util.GameUtil.openConfirmByTwoButton(null, ()=>{
				let req:ExchangeSendMessage = new ExchangeSendMessage();
				req.initData();
				req.setGoodsId(vo._id);
				NetManager.send(req)
			}, target, str);
		} else if (vo._type == Exchange_type.Ticket) {
			let exchangeTicketView:ExchangeTicketView = new ExchangeTicketView(Number(obj));
			let exchangeTicketVMed:ExchangeTicketMediator = new ExchangeTicketMediator(exchangeTicketView);
			burn.Director.pushView(exchangeTicketVMed);
		} else if (vo._type == 4) {
			let strNum = Number(vo._name.substring(0, vo._name.length - 3)); //根据名字判断是一元红包
			if(strNum == 1){
				let exchangeRedPacketView:ExchangeRedPacketView = new ExchangeRedPacketView(Number(obj));
				let exchangeRedPacketMed:ExchangeRedPacketMediator = new ExchangeRedPacketMediator(exchangeRedPacketView);
				burn.Director.pushView(exchangeRedPacketMed);
				return;
			}
			let exchangeTicketView:ExchangeTicketView = new ExchangeTicketView(Number(obj));
			let exchangeTicketVMed:ExchangeTicketMediator = new ExchangeTicketMediator(exchangeTicketView);
			burn.Director.pushView(exchangeTicketVMed);
		}
	}
	
	public destroy():void {
		this.getView().destroy();
		this.unsubscribByType(NotifyEnum.SET_EXCHANGE_LIST);
		this.unsubscribByType(NotifyEnum.EXCHANGE_ITEM);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.EXCHANGEBACK);
		game.net.MessageDispatcher.unregister(game.net.ResponseType.EXCHANGEGOODSBACK);
		game.net.MessageDispatcher.unregister(game.net.ResponseType.LOOPEXCHANGERECORDSBACK);
	}
}