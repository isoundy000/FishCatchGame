class GuideMediator extends burn.mediator.SimpleMediator {
	private _nCurID:number;
	public constructor(view:burn.view.ViewBase,nId:number) {
		super(view);
		this._nCurID = nId;
	}

	public onAdded() {
		super.onAdded();
		//获取类型。根据类型。设置显示内容。截取点击事件
		(this.getView() as GuideView).initView(this._nCurID);
	}

	public init():void {
		
	}

	public destroy():void {
		this.getView().destroy();
	}
}