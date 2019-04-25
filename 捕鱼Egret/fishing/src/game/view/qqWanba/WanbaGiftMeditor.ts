class WanbaGiftMeditor extends burn.mediator.SimpleMediator {
	public constructor(view:burn.view.ViewBase) {
		super(view);
	}

	public onAdded():void {
		super.onAdded();
		
	}

	public init():void {
		(this.getView() as WanbaGiftView).initView();
	}

	public destroy():void {
		this.getView().destroy();
	}
}