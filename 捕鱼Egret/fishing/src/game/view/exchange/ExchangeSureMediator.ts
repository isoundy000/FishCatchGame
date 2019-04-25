class ExchangeSureMediator extends burn.mediator.SimpleMediator {
	private _nId:number;
	public constructor(view:burn.view.ViewBase) {
		super(view);
	}

	public onAdded() {
		super.onAdded();
	}

	public init():void {
		(this.getView() as ExchangeSureView).initView();
		this.subscrib(NotifyEnum.EXCHANGE_SURE_LOADED, this.setList);
	}

	public setData(nId:number):void
	{
		this._nId = nId;
	}
	public setList(obj:any, target:any):void
	{
		let view = (target.getView()) as ExchangeSureView;
		view.setOption(target._nId);
	}
	public destroy():void {
		this.getView().destroy();
		this.unsubscribByType(NotifyEnum.EXCHANGE_SURE_LOADED);
	}
}