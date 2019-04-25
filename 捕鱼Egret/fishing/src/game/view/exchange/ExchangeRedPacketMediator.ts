class ExchangeRedPacketMediator extends burn.mediator.SimpleMediator {

	public constructor(view:burn.view.ViewBase) {
		super(view);
	}

	public onAdded() {
		super.onAdded();
	}

	public init():void {
		(this.getView() as ExchangeSureView).initView();
	}
	
	public destroy():void {
		this.getView().destroy();
	}
	
}