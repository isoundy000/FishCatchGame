class SettingView extends burn.view.PopView {
	private _uiDisplay:SettingUI;
	/**scroview */
	private _roomListGroup:eui.Group;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	private _bPop:boolean = false;
	public constructor() {
		super();
		this._btnWrapList = new Array();
		this._bPop = false;
	}
	private addBgResource(clazz:any,url:string):void
	{
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		let uiObj = new SettingUI();
		this._uiDisplay = uiObj;
		this._uiDisplay.skinName = clazz;
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);
		//关闭当前界面
		let closeBtn = this._uiDisplay.closeBtn;
		closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);

		if (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET || CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
			this._uiDisplay.icon_change.visible = true;
			this._uiDisplay.icon_change.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onchangIdBtn, this);
		}	

        this._uiDisplay.groupMus.name = "groupMus";
        this._uiDisplay.groupSel.name = "groupSel";
        this._uiDisplay.groupMus.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeState, this);
        this._uiDisplay.groupSel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeState, this);
        this.send(NotifyEnum.CHANGE_SETTING);

		if (!this._bPop) {
			//打开UI动画
			game.util.UIUtil.popView(this._uiDisplay.root);
			this._bPop = true;
		}
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.closeBtn));
	}
    public changeMusicState(state:boolean):void {
        this._uiDisplay.music_sel.visible = state;
		this._uiDisplay.bg_1.visible = !state;
		this._uiDisplay.icon0.visible = !state;
		this._uiDisplay.iconKai0.visible = !state;
    }
    public changeSoundState(state:boolean):void {
        this._uiDisplay.sound_sel.visible = state;
		this._uiDisplay.bg_2.visible = !state;
		this._uiDisplay.icon1.visible = !state;
		this._uiDisplay.iconKai1.visible = !state;
    }
    private changeState(e:egret.TouchEvent) {
		let target = e.target;
        if (target.name == "groupMus")
        {
            this.send(NotifyEnum.CHANGE_SETTING,{type:"music"});
        } else if (target.name == "groupSel") {
            this.send(NotifyEnum.CHANGE_SETTING,{type:"sound"});
        }
	}
	/**切换账号 */
	private onchangIdBtn(e:egret.TouchEvent) {
		game.util.GameUtil.openConfirmByTwoButton(null,function() {
			if(CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG){
				deleteCookie4YWT();
			}else{
				deleteCookie4ChangeAccount();
			}
		}, this, game.table.T_Language_Table.getVoByKey(2439).value);
	}
	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) 
	{
		burn.Director.popView();
	}
	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/setting/SettingUI.exml",this.addBgResource,this);
	}

	public destroy():void {
		//关闭UI动画
		let self = this;
		game.util.UIUtil.closeView(this._uiDisplay.root, function():void {
			//移除按钮封装
			while (self._btnWrapList.length > 0) {
				let wrap = self._btnWrapList.pop();
				wrap.destroy();
			}
			self.parent && self.parent.removeChild(self);
			
			self._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
			self._uiDisplay.groupMus.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.changeState, self);
			self._uiDisplay.groupSel.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.changeState, self);
			self._uiDisplay.icon_change.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onchangIdBtn, self);

			self._bPop = false;
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/setting/SettingUI.exml");
		});
	}
}

/***操作UI的对应类 */
class SettingUI extends eui.Component{
	public constructor(){super();}
	public closeBtn:eui.Button;//关闭

    public groupMus:eui.Group;
    public groupSel:eui.Group;
	public icon_change:eui.Button;
    
    public music_sel:eui.Group;
	public bg_1:eui.Image;
	public icon0:eui.Image;
	public iconKai0:eui.Image;

    public sound_sel:eui.Group;
	public bg_2:eui.Image;
	public icon1:eui.Image;
	public iconKai1:eui.Image;

	public root:eui.Group;


}