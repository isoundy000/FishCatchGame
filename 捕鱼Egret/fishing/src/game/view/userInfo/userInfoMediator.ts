// TypeScript file
class UserInfoMediator extends burn.mediator.SimpleMediator {
	private isUseEns:boolean;
	public constructor(view:burn.view.ViewBase) {
		super(view);
	}

	public onAdded() {
		super.onAdded();
		(this.getView() as UserInfoView).initView();
		//注册观察者
		this.subscrib(NotifyEnum.USER_INFO_UI_LOADED, this.viewInit);
	}
	public viewInit(obj:any, target:any):void
	{
		let view = (target.getView() as UserInfoView);
		let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
		let lvStr = userModle.getLevel();
		let idStr = userModle.getUserId();
		let vipLvStr = userModle.getVipLevel();
		view.setData(String(lvStr),String(idStr), userModle.getUserName(), vipLvStr+"");
	}
	public destroy():void {
		this.getView().destroy();
		this.unsubscribByType(NotifyEnum.USER_INFO_UI_LOADED);
	}
}