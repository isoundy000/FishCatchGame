class KssWaitMediator extends burn.mediator.SimpleMediator {
	public constructor(view:burn.view.ViewBase) {
		super(view);
	}

	public onAdded() {
		super.onAdded();
		(this.getView() as KssWaitView).initView();
        this.subscrib(NotifyEnum.CHANGE_WAIT_PEOPLE, this.uiLoadEnd);
	}
    private uiLoadEnd(obj:any, target:any):void {
		let view = target.getView() as KssWaitView;
		view.setPeople(Number(obj.num));
		if (Number(obj.num) >= 8) {
			view.onClose();
		}
	}

	public init():void {
		
	}

	public destroy():void {
		this.unsubscribByType(NotifyEnum.CHANGE_WAIT_PEOPLE);
		this.getView().destroy();
	}
}