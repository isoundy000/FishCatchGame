/**
 * 公告小喇叭
 */
class TrumpetMediator extends burn.mediator.SimpleMediator {

	public constructor(view:burn.view.ViewBase) {
		super(view, "TrumpetMediator");
	}

	public onAdded() {
		super.onAdded();
	}

	public init():void {
		this.subscrib(NotifyEnum.SEND_TRUMPET_MSG, this.sendTrumpetMsg);
		//监听消息返回
		game.net.MessageDispatcher.register(game.net.ResponseType.SMALLHORNBACK, (msg:SmallHornBackMessage)=>{
			this.sendMsgBack(msg);
		});
	}

	//发送消息
	private sendTrumpetMsg(obj:any, target:any):void {
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		let config = game.table.T_Config_Table.getVoByKey(84).value;

		let arr = config.split("_");
		let num = 0;
		if (Number(arr[0]) == PropEnum.GOLD) {
			num = userModel.getCoins();
			if (num < Number(arr[1])) {
				//TODO
				return;
			}
		} else if (Number(arr[0]) == PropEnum.GEM) {
			num = userModel.getMoney();
			if (num < Number(arr[1])) {
				game.util.GameUtil.openConfirmByTwoButton(null, function(){
					let chargeView:ChargeView = new ChargeView(ChargeType.Gem);
					let chargeMed:ChargeMediator = new ChargeMediator(chargeView);
					burn.Director.pushView(chargeMed);
				}, target, game.util.Language.getText(206));
				return;
			}
		} else if (Number(arr[0]) == PropEnum.TICKET) {
			num = userModel.getTicket();
			if (num < Number(arr[1])) {
				//TODO
				return;
			}
		}
		//向服务器发送消息
		let msg:SmallHornSendMessage = new SmallHornSendMessage();
		msg.initData();
		msg.setWords(obj);
		NetManager.send(msg);
	}

	//发送消息返回
	private sendMsgBack(msg:SmallHornBackMessage):void {
		if (msg.getResult() == 1) {
			let view = this.getView() as TrumpetView;
			view.setViewList();
		} else {

		}
	}

	public destroy():void {
		game.net.MessageDispatcher.unregister(game.net.ResponseType.SMALLHORNBACK);
		this.unsubscribByType(NotifyEnum.SEND_TRUMPET_MSG);
		
		this.getView().destroy();
	}
}



