class ActiveMediator extends burn.mediator.SimpleMediator {
	private _nIndex:number;
	public constructor(view:burn.view.ViewBase) {
		super(view);
		this._nIndex = 0;
	}

	public onAdded() {
		super.onAdded();
		this.subscrib(NotifyEnum.CHANGE_ACTIVE, this.clickItem);
		(this.getView() as ActiveView).initView();
		
		//监听服务器
        game.net.MessageDispatcher.register(game.net.ResponseType.LIMITEDTIMEACTIVEINFO, (msg:LimitedTimeActiveInfoMessage)=>{
            this.activeInfo(msg);
        });
		//返回
        game.net.MessageDispatcher.register(game.net.ResponseType.LIMITEDTIMEACTIVEBACK, (msg:LimitedTimeActiveBackMessage)=>{
            this.activeBack(msg);
        });
		let userModel = this.getModel(UserModel) as UserModel;
		userModel.bOpenedActiveUI = true;
		burn._Notification_.send(NotifyEnum.ACTIVE_CONFIG_DATA_LOAEDED);
	}
	public activeBack(msg:LimitedTimeActiveBackMessage):void
	{
		let result = msg.getResult();
		/** 	
		 *  LIMIT_TIME_ACTIVE_RESULT_STATE_OPERAITONED = 0;// 执行过已经领取或接受过了
			LIMIT_TIME_ACTIVE_RESULT_STATE_SUCCESS = 1;// 成功
			LIMIT_TIME_ACTIVE_RESULT_STATE_NO_PRICE = 2;// 钱不够
			LIMIT_TIME_ACTIVE_RESULT_STATE_NO_PRICE_INDEX = 3;// 没有该货币
			LIMIT_TIME_ACTIVE_RESULT_STATE_CHARGE_LESS = 4;// 充值金额不够 
			LIMIT_TIME_ACTIVE_RESULT_STATE_VIP_NO_AWARD = 5;// 当前vip等级没有奖励*/
		let view = this.getView() as ActiveView;
		let activeModel = burn.Director.getModelByKey(ActiveModel) as ActiveModel;
		switch(result) {
			case 0:// 执行过已经领取或接受过了
				break;
			case 1:// 成功
				if (view._list[this._nIndex]._type == Active_Type.LIMIT_TIME_ACTIVE_TYPE_CHARGE_SEND) {
					//console.log("充值送送送，领取奖励成功");
					game.util.ReyunUtil.sendEvent(game.util.LogEnum.CHONGZHISONG_RECEIVE_COUNT);
		        	game.util.GameUtil.popTips(game.util.Language.getText(184));
				} else if(view._list[this._nIndex]._type == Active_Type.LIMIT_TIME_ACTIVE_TYPE_VIP_SEND) {
					//console.log("vip 领取奖励成功");
		        	game.util.GameUtil.popTips(game.util.Language.getText(183));
					game.util.ReyunUtil.sendEvent(game.util.LogEnum.VIPFREESEND_RECEIVE_COUNT);
				} else if(view._list[this._nIndex]._type == Active_Type.LIMIT_TIME_ACTIVE_TYPE_SECRET_SHOP) {
					//console.log("神秘商店购买成功");
		        	game.util.GameUtil.popTips(game.util.Language.getText(188));
					//console.log("任务领取成功");
				} else if(view._list[this._nIndex]._type == Active_Type.LIMIT_TIME_ACTIVE_TYPE_FISH_SEND) {
					let activeModel = this.getModel(ActiveModel) as ActiveModel;
					let info = msg.getInfo() as LimitedTimeActiveInfoMessage;
        			let awardData = info.getSendAwardActiveInfo() as Array<LimitedTimeActiveItemMessage>;
					let lenAward = awardData.length;
					for(var i = 0; i < lenAward; i++){
						let obj = activeModel.getActiveObjById(awardData[i].getId());
						let dataObj = new game.model.ActiveData(awardData[i], obj);
						if(dataObj._state == Active_State.LIMIT_TIME_ACTIVE_STATE_ACCEPTED && obj._type == Active_Type.LIMIT_TIME_ACTIVE_TYPE_FISH_SEND)
						{
							game.util.ReyunUtil.sendEvent(game.util.LogEnum.DAYUSONGLI_START_COUNT);
 							game.util.GameUtil.popTips(game.util.Language.getText(2438));
							break;
						}
					}
				}
				break;
			case 2:// 钱不够
				if (view._list[this._nIndex]._type == Active_Type.LIMIT_TIME_ACTIVE_TYPE_SECRET_SHOP) {
					//console.log("神秘商店 货币不足");
		        	game.util.GameUtil.popTips(game.util.Language.getText(189));
				}
				break;
			case 3:// 没有该货币
				break;
			case 4:// 充值金额不够
				if (view._list[this._nIndex]._type == Active_Type.LIMIT_TIME_ACTIVE_TYPE_CHARGE_SEND) {
					//console.log("#充值金额不足，不能领取奖励");
		        	game.util.GameUtil.popTips(game.util.Language.getText(185));
				}
				break;
		}
		if (msg.getInfo() == null) {
			return;
		}
		let info = msg.getInfo() as LimitedTimeActiveInfoMessage;
		this.activeInfo(info);
		burn._Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
	}
	public activeInfo(msg:LimitedTimeActiveInfoMessage):void
	{
		//处理活动数据
		let view = this.getView() as ActiveView;
		let activeModel = this.getModel(ActiveModel) as ActiveModel;
		activeModel.setActiveCoin(Number(msg.getActiveCoin()));
		//获取服务器数据，缓存至model
		activeModel.setActiveInfo(msg);
		view.setLeftList(activeModel.getActiveList());
		//选择第一个活动
		view.changeActive(this._nIndex);
	}
	private clickItem(obj:any, target:any):void 
	{
		let nIndex = Number(obj);
		let view = target.getView() as ActiveView;
		view.changeActive(nIndex);
		target._nIndex = nIndex;
	}

	public init():void {
		
	}
	public destroy():void {
		this.getView().destroy();
		this.unsubscribByType(NotifyEnum.CHANGE_ACTIVE);
		game.net.MessageDispatcher.unregister(game.net.ResponseType.LIMITEDTIMEACTIVEINFO);
		game.net.MessageDispatcher.unregister(game.net.ResponseType.LIMITEDTIMEACTIVEBACK);
	}
}