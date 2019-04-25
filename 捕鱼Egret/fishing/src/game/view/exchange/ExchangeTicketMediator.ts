class ExchangeTicketMediator extends burn.mediator.SimpleMediator {
	public constructor(view:burn.view.ViewBase) {
		super(view);
	}

	public onAdded() {
		super.onAdded();
	}

	public init():void {
		(this.getView() as ExchangeTicketView).initView();
	}
	public destroy():void {
		this.getView().destroy();
	}
}