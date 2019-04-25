class DjsResultMediator extends burn.mediator.SimpleMediator {
	public constructor(view:burn.view.ViewBase) {
		super(view, "DjsMediator");
	}

	public onAdded() {
		super.onAdded();
		(this.getView() as DjsResultView).initView();
	}

	public init():void {
		
	}

	public destroy():void {
		this.getView().destroy();
	}
}