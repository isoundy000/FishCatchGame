class ChargeMediator extends burn.mediator.SimpleMediator {

	public constructor(view:burn.view.ViewBase) {
		super(view, "ChargeMediator");
	}

	public onAdded() {
		super.onAdded();
		(this.getView() as ChargeView).initView();
	}

	public init():void {
		//注册观察者
		this.subscrib(NotifyEnum.BUY_CHARGE_ITEM, this.buyChargeItem);
		game.net.MessageDispatcher.unregister(game.net.ResponseType.CHARGEBACK);
		game.net.MessageDispatcher.register(game.net.ResponseType.CHARGEBACK, (msg:ChargeBackMessage)=>{
			this.buyChargeItemBack(msg);
		});
	}

	public showList(obj:any, target:any):void
	{
		let view = target.getView() as ChargeView;
		if (obj == null) {
			view.showListByType(ChargeType.Gold);
			return;
		}
		view.showListByType(Number(obj));
	}

	public buyChargeItem(obj:any, target:any):void {
		if (obj.type == ChargeType.Ticket) {
			if (RELEASE && CONFIG.PLATFORM_ID > 0) {
				let vo = game.table.T_Charge_Table.getVoByKey(obj.id);
				game.platform.PaymentManager.pay(obj.id, Number(vo.price));
			} else {
				let msg:ChargeSendMessage = new ChargeSendMessage();
				msg.initData();
				msg.setChargeId(obj.id);
				NetManager.send(msg);
			}
		} else {
			let itemVo = game.table.T_Charge_Table.getVoByKey(obj.id);
			if (itemVo) {
				let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
				let num = Number(itemVo.price.split("_")[1]);
				if (userModel.getTicket() < num) {
					game.util.GameUtil.openConfirmByTwoButton(null, ()=>{
						let view = target.getView() as ChargeView;
						view.showListByType(ChargeType.Ticket);
					}, target, game.util.Language.getText(204));
				} else {
					let msg:ChargeSendMessage = new ChargeSendMessage();
					msg.initData();
					msg.setChargeId(obj.id);
					NetManager.send(msg);
				}
			}
		}
	}

	private buyChargeItemBack(msg:ChargeBackMessage):void {
		//PC端 关闭扫码支付页面
		if( IsInPC() && CONFIG.IS_WEB){
			closeQrPayPanel();
		}
		let state = msg.getState();
		if (state == 1) {
			let id = msg.getChargeId();
			let isFirst = msg.getIsFirst(); //1:是首充， 0：不是首冲
			let vo = game.table.T_Charge_Table.getVoByKey(id);
			let gainArr = new Array<game.model.Item>();
			let arr = vo.award.split("_");
			let num = Number(arr[1]);
			if (isFirst == 1 && vo.firstAward != "0") {
				let firstAwardList = vo.firstAward.split("_");
				//num += Number(firstAwardList[1]);
				let item = new game.model.Item(Number(firstAwardList[0]), Number(firstAwardList[1]));
				gainArr.push(item);
			}
			let awardItem = new game.model.Item(Number(arr[0]), num);
			gainArr.push(awardItem);
			//当前vip等级
			let vipLeve = Number(msg.getVipLevel());
			//处理VIP额外赠送的部分
			let vipVo = game.table.T_VipLevel_Table.getVoByKey(vipLeve);
			if (vipVo) {
				if (vipVo.couponBuyAdditionRatioByType != "0") {
					let vipArr = vipVo.couponBuyAdditionRatioByType.split("_");
					if (Number(vipArr[0]) == vo.type) {
						let vipItem:game.model.Item;
						if (vo.type == 1) {
							vipItem = new game.model.Item(PropEnum.GOLD, Math.floor(num * Number(vipArr[1])/100));
						} else if (vo.type == 2) {
							vipItem = new game.model.Item(PropEnum.GEM, Math.floor(num * Number(vipArr[1])/100));
						} else if (vo.type == 3) {
							vipItem = new game.model.Item(PropEnum.TICKET, Math.floor(num * Number(vipArr[1])/100));
						}
						gainArr.push(vipItem);
					}
				}
			}

			game.util.GameUtil.openCommongain(null, gainArr);
        	let userModel = burn.Director.getModelByKey(UserModel) as UserModel;

			if (vo.type == 3) {//充钱
				if (userModel.getTatolChargeRMB() == 0) {
					let str = game.table.T_Config_Table.getVoByKey(53).value;
					let datas = str.split(",");
					let len = datas.length;
					let gainArr1 = new Array<game.model.Item>();
					for (let i = 0; i < len; i++) {
						let itemStr = datas[i].split("_");
						let itemId = Number(itemStr[0]);
						let itemCount = Number(itemStr[1]);
						let tempItem = new game.model.Item(itemId, itemCount);
						gainArr1.push(tempItem);
					}
					game.util.GameUtil.openCommongain(null, gainArr1);
					userModel.setTatolChargeRMB(num);
				}
				userModel.setTicket(msg.getCurCoupon());
			}
			userModel.setVipLevel(vipLeve);
			userModel.setTatolChargeRMB(Number(msg.getVipExp()));
			userModel.addChargedGears(id);
			let view = this.getView() as ChargeView;
			view.showListByType(view._toType, true);
			burn._Notification_.send(NotifyEnum.CHECN_VIP_ITEM);
		} else {
            game.util.GameUtil.popTips(game.util.Language.getText(173));
		}
		burn._Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
	}

	public destroy():void {
		this.getView().destroy();
		this.unsubscribByType(NotifyEnum.BUY_CHARGE_ITEM);
		//清除消息
		game.net.MessageDispatcher.unregister(game.net.ResponseType.CHARGEBACK);
	}
}