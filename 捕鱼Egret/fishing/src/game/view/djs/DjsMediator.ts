class DjsMediator extends burn.mediator.SimpleMediator {
	public constructor(view:burn.view.ViewBase) {
		super(view, "DjsMediator");
	}

	public onAdded() {
		super.onAdded();
		this.subscrib(NotifyEnum.DJS_ITEM_LOADED, this.viewInit);
		
		(this.getView() as DjsView).initView();
        game.net.MessageDispatcher.register(game.net.ResponseType.GRANDPRIXRANKBACK, (msg:GrandPrixRankBackMessage)=>{
            this.grandBack(msg);
        });

	}
	//要信息back
	private grandBack(msg:GrandPrixRankBackMessage):void {
		let view = this.getView() as DjsView;
		view.initList(msg);
	}
	private viewInit(obj:any, target:any):void {
		let send:GrandPrixRankSendMessage = new GrandPrixRankSendMessage();
        send.initData();
		send.setRoomtType(RequesetRoomState.DjsRoom);
		NetManager.send(send);
	}
	public init():void {
		
	}

	public destroy():void {
		this.unsubscribByType(NotifyEnum.DJS_ITEM_LOADED);
		game.net.MessageDispatcher.unregister(game.net.ResponseType.GRANDPRIXRANKBACK);
		this.getView().destroy();
	}
}