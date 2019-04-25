class ExchangeRecodeMediator extends burn.mediator.SimpleMediator {
	public constructor(view:burn.view.ViewBase) {
		super(view);
	}

	public onAdded() {
		super.onAdded();
		(this.getView() as ExchangeRecodeView).initView();
	}

	public init():void {
		this.subscrib(NotifyEnum.EXCHANGE_RECODE_LOADED, this.setList);
		let self = this;
        game.net.MessageDispatcher.register(game.net.ResponseType.EXCHANGE, function(msg:ExchangeMessage):void {
            self.recodeBack(msg);
        });
	}

	public setList(obj:any, target:any):void
	{
		let req = new CommonRequestMessage();
		req.initData();
		req.setType(CommonRequest.RECODE);//1 email
		NetManager.send(req);
	}
	public recodeBack(msg:ExchangeMessage):void
	{
		let dataList = msg.getRecords();
		let list = new Array<any>();
		for(let i = 0; i < dataList.length; i ++)
		{
			let item = dataList[i] as ExchangeRecordMessage;
			let obj = {id: item.getGoodsId(), time: item.getTime(), state:item.getDeliveryState(), msg:item};
			list.push(obj);
		}
		let view = this.getView() as ExchangeRecodeView;
		view.setData(list);
	}
	public destroy():void {
		this.getView().destroy();
		this.unsubscribByType(NotifyEnum.EXCHANGE_RECODE_LOADED);
        game.net.MessageDispatcher.unregister(game.net.ResponseType.EXCHANGE);
	}
}