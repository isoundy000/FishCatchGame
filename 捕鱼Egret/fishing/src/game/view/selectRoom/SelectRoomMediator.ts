class SelectRoomMediator extends burn.mediator.SimpleMediator {
	public constructor(view:burn.view.ViewBase) {
		super(view);
	}

	public onAdded() {
		super.onAdded();
		(this.getView() as SelectRoomView).initView();
		this.subscrib(NotifyEnum.ROOMLIST_RESOUCE_LOADED, this.onResouceLoaded);
	}
	public onResouceLoaded(obj:any, target:any):void {
		let self = target as SelectRoomMediator;
		//监听服务器房间信息
        game.net.MessageDispatcher.register(game.net.ResponseType.MANUALCHOOSEROOMBACK, function(msg:ManualChooseRoomBackMessage):void {
			self.getRoomList(msg);
        });

		//首次进入发送-1索引的消息
		self.sendLeftRoom(-1);
	}
	//发送换区请求
	public sendLeftRoom(nId:number):void {
		let req:ManualChooseRoomSendMessage = new ManualChooseRoomSendMessage();
        req.initData();
        req.setServerId(nId);
        NetManager.send(req);
	}
	//获取区域返回列表
	private getRoomList(msg:ManualChooseRoomBackMessage):void {
		let view = this.getView() as SelectRoomView;
		let leftRoomList = msg.getServerInfo();
		//required uint32 serverId = 1;
	    //required uint32 state = 2;//1流畅(0<100)，2繁忙(101<150)，3拥挤(151~180)，4满员(181~200)
		let rightRoomList = msg.getRoomInfo();
		//required uint32 roomId = 1;
	    //required uint32 userCount = 2;
		if (leftRoomList.length != 0) {
			view.showLeftList(leftRoomList);
			view.showRightList(rightRoomList);
		} else {
			if (rightRoomList.length == 1) {
				view.updateRightItem(rightRoomList[0]);
			} else {
				view.showRightList(rightRoomList);
			}
		}
	}
	public destroy():void {
		this.getView().destroy();
		//移除消息监听
        game.net.MessageDispatcher.unregister(game.net.ResponseType.MANUALCHOOSEROOMBACK);
		//
		this.unsubscribByType(NotifyEnum.ROOMLIST_RESOUCE_LOADED);
	}
}