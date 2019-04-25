class UnlockGunMediator extends burn.mediator.SimpleMediator {
	public constructor(view:burn.view.ViewBase) {
		super(view, "UnlockGunMediator");
	}

	public onAdded() {
		super.onAdded();
		(this.getView() as UnlockGunView).initView();
	}

	public init():void {
		
	}

	public destroy():void {
		this.getView().destroy();
	}
}