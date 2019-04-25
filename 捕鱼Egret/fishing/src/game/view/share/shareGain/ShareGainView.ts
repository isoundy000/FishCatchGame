class ShareGainView extends burn.view.PopView {
	private _uiDisplay:ShareGainCom;
	/**scroview */
	private _roomListGroup:eui.Group;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	public constructor() {
		super();
		game.util.ReyunUtil.sendEvent(game.util.LogEnum.CHECK_FISH_FUN_COUNT);
		this._btnWrapList = new Array();
	}
	private addBgResource(clazz:any,url:string):void
	{
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		let uiObj = new ShareGainCom();
		this._uiDisplay = uiObj;
		this._uiDisplay.skinName = clazz;
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);
		//关闭当前界面
		this._uiDisplay.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);

        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/share/ShareGainItemB.exml", ()=>{
            this.send(NotifyEnum.SHARE_GAIN_UI_LOADED);
        },this);
    }
    public showList(list:Array<game.model.EmailItem>):void
    {
        this._uiDisplay.llistGroup.removeChildren();
		let len = list.length;
        for(let i = 0; i < len; i++)
        {
            let item = new ShareGainItem();
            item.init(list[i]);
			item.lingqu.name = list[i].getMailId() + "";
			item.lingqu.addEventListener(egret.TouchEvent.TOUCH_END, this.touchItemEvent, this);
            this._uiDisplay.llistGroup.addChild(item);
        }
        let tLayout:eui.TileLayout = new eui.TileLayout();
        tLayout.paddingTop = 10;
        tLayout.paddingLeft = 0;
        tLayout.paddingRight = 0;
        tLayout.paddingBottom = 20;
        this._uiDisplay.llistGroup.layout = tLayout;    /// 网格布局
    }
	private touchItemEvent(e:egret.TouchEvent)
	{
		let name = e.currentTarget.name;
		let emialModel:EmailModel = burn.Director.getModelByKey(EmailModel) as EmailModel;
		let itemList= emialModel.getMailListById(Number(name));
		game.util.GameUtil.openEmailChakan(null, ()=>{
			this.send(NotifyEnum.RECEIVE_MAIL_SEND, name);
		},itemList.getMailContent(),itemList.getItems(),itemList.getState());
	}
	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) {
		burn.Director.popView();
	}
	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/share/ShareGainUI.exml",this.addBgResource,this);
	}

	public destroy():void {
		//移除按钮封装
		while (this._btnWrapList.length > 0) {
			let wrap = this._btnWrapList.pop();
			wrap.destroy();
		}
		this._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		this.parent && this.parent.removeChild(this);
		
		RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/share/ShareGainUI.exml");
	}
}

/***操作UI的对应类 */
class ShareGainCom extends eui.Component{
	public constructor(){super();}
	public btnClose:eui.Button;//关闭
	public llistGroup:eui.Group;

}