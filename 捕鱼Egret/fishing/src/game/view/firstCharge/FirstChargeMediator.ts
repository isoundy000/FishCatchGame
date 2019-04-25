class FirstChargeMediator extends burn.mediator.SimpleMediator {
	public constructor(view:burn.view.ViewBase) {
		super(view, "ChargeMediator");
	}

	public onAdded() {
		super.onAdded();
		(this.getView() as FirstChargeView).initView();
	}

	public init():void {
		
	}

	public destroy():void {
		this.getView().destroy();
	}
}