class ShareGainMediator extends burn.mediator.SimpleMediator {
	private _curMailId:number;
	public constructor(view:burn.view.ViewBase) {
		super(view);
	}

	public onAdded() {
		super.onAdded();
		(this.getView() as ShareGainView).initView();
	}

	public init():void {
		let self = this;
        game.net.MessageDispatcher.register(game.net.ResponseType.RECEIVEMAILBACK, function(msg:ReceiveMailBackMessage):void {
            self.receiMailBack(msg);
        });
        this._curMailId = -1;
		
		this.subscrib(NotifyEnum.REFRESH_EMAIL,this.refreshMail);
		this.subscrib(NotifyEnum.RECEIVE_MAIL_SEND, this.receiveMail);
		this.subscrib(NotifyEnum.SHARE_GAIN_UI_LOADED, this.uiLoaded);
	}
	private receiveMail(obj:any, target:any):void {
		if (obj == null) {
			return;
		}
		let emialModel:EmailModel = target.getModel(EmailModel) as EmailModel;
		let mailObj = emialModel.getMailListById(Number(obj));
		if (mailObj == null) {
			return;
		}
		let req:ReceiveMailSendMessage = new ReceiveMailSendMessage();
        req.initData();
		req.setMailId(mailObj.getMailId());
        NetManager.send(req);
		target._curMailId = mailObj.getMailId();
		emialModel.setCurrEmialId(mailObj.getMailId());
	}
	private receiMailBack(msg:ReceiveMailBackMessage):void {
		let emialModel:EmailModel = this.getModel(EmailModel) as EmailModel;
		this._curMailId = emialModel.getCurrEmailId();
		if (this._curMailId == -1) {
			//tips
			return;
		}
		let state = msg.getState();
		//0:背包已满，1：领取（查看）成功
		if (state == 0) {
			game.util.GameUtil.popTips(game.util.Language.getText(48));
			return;
		}
		if (state == 1) {
			let mailObj = emialModel.getMailListById(this._curMailId);
			if (mailObj == null) {
				//tips
				return;
			}
			emialModel.updateMailState(this._curMailId,1);
        	let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
			//emialModel.removeItem(mailObj.getMailId());
			this._curMailId = -1;
			let view = (this.getView() as ShareGainView);
			let list = emialModel.getMailListByType(5);
			view.showList(list);
		}
		burn._Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
		burn._Notification_.send(NotifyEnum.CHECK_MAIN_ALERT);
		//burn.Director.popView();
	}
	private uiLoaded(obj:any, target:any):void 
	{
		target.sendRefreshMail();
	}
	private refreshMail(obj:any, target:any):void {
		let msg = obj as MailboxMessage;
		let view = (target.getView() as ShareGainView);
		let emialModel:EmailModel = target.getModel(EmailModel) as EmailModel;
		let list = emialModel.getMailListByType(5);
		view.showList(list);
	}
	private sendRefreshMail():void {
		let req = new CommonRequestMessage();
		req.initData();
		req.setType(CommonRequest.EMAIL);//1 email
		NetManager.send(req);
	}

	public destroy():void {
		this.getView().destroy();
		game.net.MessageDispatcher.unregister(game.net.ResponseType.RECEIVEMAILBACK);
	}
}