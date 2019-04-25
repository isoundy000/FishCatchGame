class CircleMediator extends burn.mediator.SimpleMediator {
	public constructor(view:burn.view.ViewBase) {
		super(view);
	}

	public onAdded() {
		super.onAdded();
        game.net.MessageDispatcher.register(game.net.ResponseType.DAILYLOGINDRAWBACK, (msg:DailyLoginDrawBackMessage)=>{
            this.getDraw(msg);
        });
		(this.getView() as CircleView).initView();
	}
	public getDraw(msg:DailyLoginDrawBackMessage):void
	{
		let state = msg.getState();
		if (state != 1) {//0已经抽过了1成功
			//提示
			game.util.GameUtil.popTips(game.util.Language.getText(124));
			return;
		}
		let index = msg.getIndex();
		let view = this.getView() as CircleView;
		view.showResult(Number(index));
		let userModel = this.getModel(UserModel) as UserModel;
		userModel.setIsTodayDraw(1);
	}
	public init():void {
		
	}

	public destroy():void {
		this.getView().destroy();
		game.net.MessageDispatcher.unregister(game.net.ResponseType.DAILYLOGINDRAWBACK);
	}
}