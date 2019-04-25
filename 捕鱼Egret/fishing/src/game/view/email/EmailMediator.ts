/**
 * 邮件中介者
 */
class EmailMediator extends burn.mediator.SimpleMediator {
	private _curMailId:number;
	private _listIndex:number;
	public constructor(view:burn.view.ViewBase) {
		super(view);
	}

	public onAdded():void {
		super.onAdded();
		(this.getView() as EmailView).initView();
		
	}

	public init():void {
		//注册观察者
		this.subscrib(NotifyEnum.SHOW_EMAIL_LIST, this.viewInit);
		this.subscrib(NotifyEnum.RECEIVE_MAIL_SEND, this.receiveMail);
		this.subscrib(NotifyEnum.REFRESH_EMAIL,this.refreshMail);
		//注册消息
		//监听服务器
		let self = this;
        game.net.MessageDispatcher.register(game.net.ResponseType.RECEIVEMAILBACK, function(msg:ReceiveMailBackMessage):void {
            self.receiMailBack(msg);
        });
		
        this._curMailId = -1;
		this._listIndex = -1;
	}

	private refreshMail(obj:any, target:any):void {
		let msg = obj as MailboxMessage;
		let view = (target.getView() as EmailView);
		let emialModel:EmailModel = target.getModel(EmailModel) as EmailModel;
		let list = emialModel.getMailListByType(target._listIndex);
		let bAlert = false;
		if (target._listIndex == 1) {
			let bShowList = emialModel.getMailListByType(2);
			let listLen = bShowList.length;
			for(let i = 0; i < listLen; i++)
			{
				let emailItemState = bShowList[i].getState();
				if(emailItemState == 0)
				{
					bAlert = true;
					break;
				}
			}
		} else if (target._listIndex == 2) {
			let bShowList = emialModel.getMailListByType(1);
			let listLen = bShowList.length;
			for(let i = 0; i < listLen; i++)
			{
				let emailItemState = bShowList[i].getState();
				if(emailItemState == 0)
				{
					bAlert = true;
					break;
				}
			}
		}
		view.changeListByIndex(target._listIndex,list,false,bAlert);
	}
	private sendRefreshMail():void {
		let req = new CommonRequestMessage();
		req.initData();
		req.setType(CommonRequest.EMAIL);//1 email
		NetManager.send(req);
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
			burn._Notification_.send(NotifyEnum.CHECK_MAIN_ALERT);
			return;
		}
		let state = msg.getState();
		//0:背包已满，1：领取（查看）成功
		if (state == 0) {
			game.util.GameUtil.popTips(game.util.Language.getText(48));
			burn._Notification_.send(NotifyEnum.CHECK_MAIN_ALERT);
			return;
		}
		if (state == 1) {
			let mailObj = emialModel.getMailListById(this._curMailId);
			if (mailObj == null) {
				burn._Notification_.send(NotifyEnum.CHECK_MAIN_ALERT);
				return;
			}
			emialModel.updateMailState(this._curMailId,1);
        	let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
			//emialModel.removeItem(mailObj.getMailId());
			this._curMailId = -1;
			let view = (this.getView() as EmailView);
			let list = emialModel.getMailListByType(this._listIndex);
			let bAlert = false;
			if (this._listIndex == 1) {
				let bShowList = emialModel.getMailListByType(2);
				let listLen = bShowList.length;
				for(let i = 0; i < listLen; i++)
				{
					let emailItemState = bShowList[i].getState();
					if(emailItemState == 0)
					{
						bAlert = true;
						break;
					}
				}
			} else if (this._listIndex == 2) {
				let bShowList = emialModel.getMailListByType(1);
				let listLen = bShowList.length;
				for(let i = 0; i < listLen; i++)
				{
					let emailItemState = bShowList[i].getState();
					if(emailItemState == 0)
					{
						bAlert = true;
						break;
					}
				}
			}
			view.changeListByIndex(this._listIndex,list,true,bAlert);
		}
		burn._Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
		burn._Notification_.send(NotifyEnum.CHECK_MAIN_ALERT);
		//burn.Director.popView();
	}
	public viewInit(obj:any, target:any):void {
		if (target._listIndex == -1) {
			target.sendRefreshMail();
			target._listIndex = Number(obj);
		} else {
			let view = (target.getView() as EmailView);
			let emialModel:EmailModel = target.getModel(EmailModel) as EmailModel;
			target._listIndex = Number(obj);
			let list = emialModel.getMailListByType(target._listIndex);
			let bAlert = false;
			if (target._listIndex == 1) {
				let bShowList = emialModel.getMailListByType(2);
				let listLen = bShowList.length;
				for(let i = 0; i < listLen; i++)
				{
					let emailItemState = bShowList[i].getState();
					if(emailItemState == 0)
					{
						bAlert = true;
						break;
					}
				}
			} else if (target._listIndex == 2) {
				let bShowList = emialModel.getMailListByType(1);
				let listLen = bShowList.length;
				for(let i = 0; i < listLen; i++)
				{
					let emailItemState = bShowList[i].getState();
					if(emailItemState == 0)
					{
						bAlert = true;
						break;
					}
				}
			}
			view.changeListByIndex(target._listIndex,list,false,bAlert);
		}
	}

	public destroy():void {
		this.getView().destroy();
		this.unsubscribByType(NotifyEnum.SHOW_EMAIL_LIST);
		this.unsubscribByType(NotifyEnum.RECEIVE_MAIL_SEND);
		this.unsubscribByType(NotifyEnum.REFRESH_EMAIL);
		game.net.MessageDispatcher.unregister(game.net.ResponseType.RECEIVEMAILBACK);
	}
}