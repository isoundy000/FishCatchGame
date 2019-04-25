// TypeScript file
class ConfirmView  extends eui.Component {
	public closeBtn:eui.Button;//关闭
    public showTips:eui.Label;//提示字符创
    //两个按钮
    public twoGroup:eui.Group;//
    public okBtn:eui.Group;//
    public cancleBtn:eui.Group;//
    //单个按钮
    public oneGroup:eui.Group;//
    public okOneBtn:eui.Group;//

	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
    //回调函数
    private _callFun:Function;
    //回调对象
    private _callObj:any;
    //父控件
    private _parentView:any;
    //加载完的回调
    private _pCall:Function;

	public constructor(fun:Function = null) {
		super();
		this._btnWrapList = new Array();
        this._pCall = fun;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/Confirm.exml", this.addResources, this);
	}

    private addResources(claz:any, url:string):void {
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/Confirm.exml";
		let closeBtn = this.closeBtn;
		closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		//关闭当前界面
		let okBtn = this.okBtn;
		okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
		
		let cancleBtn = this.cancleBtn;
		cancleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        
		let okOneBtn = this.okOneBtn;
		okOneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
		//封装按钮
		this._btnWrapList.push(new burn.tools.UIWrap(this.closeBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this.okOneBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this.cancleBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this.okBtn));

        this._pCall && this._pCall();
    } 

    /**
     * 
    //回调函数
    private _callFun:Function;
    //回调对象
    private _callObj:any;
     */
    public setOkCallFun(callFun:Function,obj:any,parent:egret.DisplayObject):void
    {
        this._callFun = callFun;
        this._callObj = obj;
        this._parentView = parent;
    }
    public setTips(str:string):void
    {
        this.showTips.text = str;
    }
    public setGroupTwo():void
    {
         this.twoGroup.visible = true;
         this.oneGroup.visible = false;
    }
    public setGroupOne():void
    {
         this.twoGroup.visible = false;
         this.oneGroup.visible = true;
    }
	public initView():void {
	}
	/**关闭游戏 */
	public onClosttButtonClick(e:egret.TouchEvent) 
	{
		if(this._parentView)
        {
            this._parentView.removeChild(this);
        }
	}
    /**确定按钮 */
    private onOKButtonClick(e:egret.TouchEvent) 
	{
        if(this._callFun && this._callObj)
        {
            this._callFun(this._callObj);
        }
		if(this._parentView)
        {
            this._parentView.removeChild(this);
        }
	}
    private onOKClickNoClose(e:egret.TouchEvent) 
	{
        if(this._callFun && this._callObj)
        {
            this._callFun(this._callObj);
        }
    }
    public closePanel():void
    {
		if(this._parentView)
        {
            this._parentView.removeChild(this);
        }
    }
	public destroy():void {
		//移除按钮封装
		while (this._btnWrapList.length > 0) {
			let wrap = this._btnWrapList.pop();
			wrap.destroy();
		}
		this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
		this.cancleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		this.okOneBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);

		this.parent && this.parent.removeChild(this);
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/Confirm.exml");
	}
}