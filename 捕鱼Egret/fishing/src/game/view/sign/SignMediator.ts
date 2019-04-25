class SignMediator extends burn.mediator.SimpleMediator {
	public constructor(view:burn.view.ViewBase) {
		super(view);
	}

	public onAdded() {
		super.onAdded();
        this.subscrib(NotifyEnum.SIGN_UI_LOADED, this.uiLoadEnd);
		//监听消息
        game.net.MessageDispatcher.register(game.net.ResponseType.MONTHSIGNBACK, (msg:MonthSignBackMessage)=>{
            this.signBack(msg);
        });
		(this.getView() as SignView).initView();
	}
    private uiLoadEnd(obj:any, target:any):void {   
        let view = (target.getView() as SignView);
        let model = target.getModel(UserModel) as UserModel;
		let signObj:game.model.SignObj = model.getSignObj();
		view.setListData(signObj);
    }
	public signBack(msg:MonthSignBackMessage):void {
		let state = msg.getState();
		if (state == 1 || state == 2) {///-2.今天已经补签,-1.今天已经签到,0.跨天更新,1.签到成功,2.补签成功
			let signMsg = msg.getMonthSignActiveInfo();
			let model = this.getModel(UserModel) as UserModel;
			model.setSignObj(signMsg);
			let signObj:game.model.SignObj = model.getSignObj();
			let view = (this.getView() as SignView);
			view.setListData(signObj);

			
			let signTimes = signObj.getCumulativeSignTimes();//累计签到次数
			let vos = game.table.T_MonthSign_Table.getAllVo();
			let month = signObj.CurMonth();
			let len = vos.length;
			let arrData:game.table.T_MonthSign = null;
			for (let i = 0; i < len; i++) {
				if (vos[i].month == month && vos[i].date == signTimes) {
					arrData = vos[i];
				}
			}
			if (!arrData) {
				return;
			}
			let arr = arrData.award;
			let gainArr = new Array<game.model.Item>();
			let str = arr.split(",");
			len = str.length;
			let vipMin = arrData.vipMin;
			let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
			
			for (let i = 0; i < len; i++) {
				let dataS = str[i].split("_");
				if (userModel.getVipLevel() >= vipMin && vipMin > 0) {
					gainArr.push(new game.model.Item(Number(dataS[0]), Number(dataS[1]) * 2,0));
				} else {
					gainArr.push(new game.model.Item(Number(dataS[0]), Number(dataS[1]),0));
				}
			}
			game.util.GameUtil.openCommongain(null, gainArr);
			burn._Notification_.send(NotifyEnum.CHECK_MAIN_ALERT);
			return;
		} else {
			if (state == 0) {
				let signMsg = msg.getMonthSignActiveInfo();
				let model = this.getModel(UserModel) as UserModel;
				model.setSignObj(signMsg);
				let signObj:game.model.SignObj = model.getSignObj();
				let view = (this.getView() as SignView);
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
			switch(state) {
				case Sign_State.ACTIVE_MONTH_SIGN_STATE_NO_TOKEN_MAKED_UP:
					game.util.GameUtil.openConfirmByTwoButton(null, function(){
						let chargeView:ChargeView = new ChargeView(ChargeType.Gem);
						let chargeMed:ChargeMediator = new ChargeMediator(chargeView);
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
	}
	public init():void {
		
	}

	public destroy():void {
        this.unsubscribByType(NotifyEnum.SIGN_UI_LOADED);
		game.net.MessageDispatcher.unregisterByType(game.net.ResponseType.MONTHSIGNBACK);
		this.getView().destroy();
	}
}