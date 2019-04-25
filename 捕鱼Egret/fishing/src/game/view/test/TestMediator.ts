class TestMediator extends burn.mediator.SimpleMediator {
	public constructor(view:burn.view.ViewBase) {
		super(view);
	}

	public onAdded():void {
		super.onAdded();
		(this.getView() as LoginView).initView();
	}

	public destroy():void {
		this.getView().destroy();
	}
}