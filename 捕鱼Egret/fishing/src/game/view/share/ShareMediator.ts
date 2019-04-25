class ShareMediator extends burn.mediator.SimpleMediator {
	public constructor(view:burn.view.ViewBase) {
		super(view);
	}

	public onAdded() {
		super.onAdded();
		(this.getView() as ShareView).initView();
		
		let self = this;
        game.net.MessageDispatcher.register(game.net.ResponseType.WECHATSHAREINFO, function(msg:WeChatShareInfoMessage):void {
            self.receiveWechat(msg);
        });
        game.net.MessageDispatcher.register(game.net.ResponseType.RECEIVEWECHATSHAREAWARDBACK, function(msg:ReceiveWeChatShareAwardBackMessage):void {
            self.shareBack(msg);
        });
	}
	private shareBack(msg:ReceiveWeChatShareAwardBackMessage):void
	{
		//required uint32 type = 1;//新人奖励1，邀请成功奖励2
		//required uint32 state = 2;//1成功，0不是通过分享连接进入，2通过自己的分享连接进入，3领取过
		let type = msg.getType();
		let state = msg.getState();
		if(state == 1)
		{
			game.util.GameUtil.popTips(game.util.Language.getText(2434));
			let req = new CommonRequestMessage();
			req.initData();
			req.setType(CommonRequest.COMMON_REQUEST_WECHAT_SHARE_INFO);//1 email
			NetManager.send(req);

			if(type == 1)
			{
				let configData = game.table.T_Config_Table.getVoByKey(91).value.split(",");
				let configArr1 = configData[0].split("_");
				let configArr2 = configData[1].split("_");
				let gainId_1 = Number(configArr1[0]);
				let gainNum_1 = Number(configArr1[1]);
				let gainId_2 = Number(configArr2[0]);
				let gainNum_2 = Number(configArr2[1]);
				let gainArr = new Array<game.model.Item>();
				gainArr.push(new game.model.Item(gainId_1,gainNum_1));
				gainArr.push(new game.model.Item(gainId_2,gainNum_2));
				game.util.GameUtil.openCommongain(null,gainArr);
			}else if(type == 2)
			{
				let configData = game.table.T_Config_Table.getVoByKey(92).value;
				let config = configData.split("_");
				let gainId_1 = Number(config[0]);
				let gainNum_1 = Number(config[1]);
				let gainArr = new Array<game.model.Item>();
				gainArr.push(new game.model.Item(gainId_1,gainNum_1));
				game.util.GameUtil.openCommongain(null,gainArr);
			}
		}else if(state == 2)
		{
			game.util.GameUtil.popTips(game.util.Language.getText(2436));
		}else if(state == 3)
		{
			game.util.GameUtil.popTips(game.util.Language.getText(2437));
		}else if(state == 0)
		{
			game.util.GameUtil.popTips(game.util.Language.getText(2435));
		}else if(state == 5)
		{
			game.util.GameUtil.popTips("//今日分享次数超过上限");
		}
	}

	private receiveWechat(msg:WeChatShareInfoMessage):void
	{
		let newbieAwardState = msg.getNewbieAwardState();//新人奖励状态
		let invitedUserNum = msg.getInvitedUserNum();//邀请人数
		let todayShareTimes = msg.getTodayShareTimes();//今日成功分享次数
		(this.getView() as ShareView).initShareData(newbieAwardState,invitedUserNum,todayShareTimes);
	}

	public init():void {
		
	}

	public destroy():void {
		this.getView().destroy();
		game.net.MessageDispatcher.unregister(game.net.ResponseType.WECHATSHAREINFO);
		game.net.MessageDispatcher.unregister(game.net.ResponseType.RECEIVEWECHATSHAREAWARDBACK);
	}
}