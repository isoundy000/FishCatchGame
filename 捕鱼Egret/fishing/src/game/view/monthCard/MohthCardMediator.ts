class MonthCardMediator extends burn.mediator.SimpleMediator {
	public constructor(view:burn.view.ViewBase) {
		super(view);
	}

	public onAdded() {
		super.onAdded();
		(this.getView() as MonthCardView).initView();
		let uModel = this.getModel(UserModel) as UserModel;
		uModel.bOpenedMonthUI = true;
		game.net.MessageDispatcher.register(game.net.ResponseType.CHARGEBACK, (msg:ChargeBackMessage)=>{
			this.buyChargeItemBack(msg);
		});
	}
	private buyChargeItemBack(msg:ChargeBackMessage):void {
		let state = msg.getState();////0失败 1成功  3货币不足 2 不存在这个档位
		if (state == 1) {
			let vos = game.table.T_Charge_Table.getAllVo();
			let len = vos.length;
			let voMonthCard = null;
			for (let i = 0; i < len; i++) {
				if (vos[i].type == 4) {
					voMonthCard = vos[i];
					break;
				}
			}
			let priceArr = voMonthCard.price.split("_");
			let priceStr:string = "";
			if (priceArr[0] == 10012) {
				priceStr = priceArr[1] + "点券";
			}
			var self = this;
			game.util.GameUtil.openConfirmByTwoButton(null,function(){
				let id = msg.getChargeId();
				let vo = game.table.T_Charge_Table.getVoByKey(id);
				let userModel = self.getModel(UserModel) as UserModel;
				if((userModel.getMonthEndTime() - game.util.TimeUtil.getCurrTime())>0){	//在有效期
					game.util.GameUtil.openConfirm(null, null, this,  game.util.Language.getText(2422));
				}else{
					let view1:MonthCardRewardView = new MonthCardRewardView(true);
					let med1:MonthCardRewardMediator = new MonthCardRewardMediator(view1);
					burn.Director.pushView(med1);
				}
				userModel.setTicket(msg.getCurCoupon());
				userModel.setMonthEndTime(msg.getMonthEndTime());
				let view = self.getView() as MonthCardView;
				view.setData();
			}, self, game.util.Language.getDynamicText(125, [priceStr]));

		} else {
			if (state == 3) {
				game.util.GameUtil.openConfirmByTwoButton(null, ()=>{
					let chargeView:ChargeView = new ChargeView(ChargeType.Ticket);
					let chargeMed:ChargeMediator = new ChargeMediator(chargeView);
					burn.Director.pushView(chargeMed);
				}, this, game.util.Language.getText(204));
			}
		}
		burn._Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
	}

	public init():void {
		
	}

	public update():void {
		game.net.MessageDispatcher.unregister(game.net.ResponseType.CHARGEBACK);
		game.net.MessageDispatcher.register(game.net.ResponseType.CHARGEBACK, (msg:ChargeBackMessage)=>{
			this.buyChargeItemBack(msg);
		});
	}

	public destroy():void {
		game.net.MessageDispatcher.unregister(game.net.ResponseType.CHARGEBACK);
		this.getView().destroy();
	}
}