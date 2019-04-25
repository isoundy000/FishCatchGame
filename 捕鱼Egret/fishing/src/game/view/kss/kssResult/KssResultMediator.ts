class KssResultMediator extends burn.mediator.SimpleMediator {
	public constructor(view:burn.view.ViewBase) {
		super(view);
	}

	public onAdded() {
		super.onAdded();
		(this.getView() as KssResultView).initView();
	}
	public init():void {
		
	}

	public destroy():void {
		this.getView().destroy();
	}
}