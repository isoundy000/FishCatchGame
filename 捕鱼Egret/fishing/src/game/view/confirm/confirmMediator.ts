// TypeScript file
class ConfirmMediator extends burn.mediator.SimpleMediator {
    public isTwoGroup:boolean;
	public constructor(view:burn.view.ViewBase) {
		super(view);
	}
 
	public onAdded() {
		super.onAdded();
        this.subscrib(NotifyEnum.TRIGGER_CONFIRM_OK, this.okFun);
        this.isTwoGroup = false;
	}
    public setTips(str:string):void
    {
    }
    public setOneButton():void
    {
    }
    public setTwoButton():void
    {
    }
    private okFun(obj:any, target:any):void
    {
        
    }
	public destroy():void {
		this.getView().destroy();
        //移除观察者
        this.unsubscribByType(NotifyEnum.TRIGGER_CONFIRM_OK);
	}
}