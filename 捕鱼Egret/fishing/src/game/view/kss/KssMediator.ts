class KssMediator extends burn.mediator.SimpleMediator {
	public constructor(view:burn.view.ViewBase) {
		super(view);
	}

	public onAdded() {
		super.onAdded();
		(this.getView() as KssView).initView();
	}

	public init():void {
		
	}

	public destroy():void {
		this.getView().destroy();
	}
}