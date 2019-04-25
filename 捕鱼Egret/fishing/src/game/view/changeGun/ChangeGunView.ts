
class ChangeGunView extends burn.view.PopView {
	private _uiDisplay:ChangeGunUI;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	public constructor() {
		super();
		this._btnWrapList = new Array();
		game.util.UIUtil.startLoading();
	}
	private addBgResource(clazz:any,url:string):void
	{
		game.util.UIUtil.closeLoading();
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		let uiObj = new ChangeGunUI();
		this._uiDisplay = uiObj;
		this._uiDisplay.skinName = clazz;
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);
		//打开UI动画
		game.util.UIUtil.popView(this._uiDisplay.root);
		//关闭当前界面
		let closeBtn = this._uiDisplay.closeBtn;
		closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		//封装按钮
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.closeBtn));

		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/changeGun/ChangeGunItem.exml", ()=>{
			this.send(NotifyEnum.CHANGE_GUN_UI_LOADED);
		}, this);
	}

	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/changeGun/ChangeGun.exml",this.addBgResource,this);
	}
    public showList(arr:Array<game.model.GunItem>):void
    {
		let childNum = this._uiDisplay.listGroup.numChildren;
		for(let i = 0; i < childNum; i++)
		{
			let child = this._uiDisplay.listGroup.getElementAt(i) as ChargeItemUI;
			child.clearItem();
		}
        this._uiDisplay.listGroup.removeChildren();
        let len = arr.length;
        for(let i = 0; i < len; i++)
		{
			let itemDown = new ChangeGunItemItem();
            itemDown.setData(arr[i]);
			this._uiDisplay.listGroup.addChild(itemDown);
		}
		let tLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
		this._uiDisplay.listGroup.layout = tLayout;    /// 网格布局
    }
	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) 
	{
		burn.Director.popView();
	}
	public destroy():void {
		game.util.UIUtil.closeView(this._uiDisplay.root, ()=>{
			//移除按钮封装
			while (this._btnWrapList.length > 0) {
				let wrap = this._btnWrapList.pop();
				wrap.destroy();
			}
			this._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
			this.parent && this.parent.removeChild(this);

			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/changeGun/ChangeGun.exml");
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/changeGun/ChangeGunItem.exml");
		});
	}
}

/***操作UI的对应类 */
class ChangeGunUI extends eui.Component{
	public constructor(){super();}
	public closeBtn:eui.Button;//关闭
	public root:eui.Group;
    public listGroup:eui.Group;
}
