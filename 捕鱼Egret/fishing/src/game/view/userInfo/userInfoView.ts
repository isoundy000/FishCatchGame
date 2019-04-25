// TypeScript file
class UserInfoView extends burn.view.PopView {
	private _uiDisplay:UserInfoUI;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	//功能列表索引
	private _nIndexFun:number;
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
		let uiObj = new UserInfoUI();
		this._uiDisplay = uiObj;
		this._uiDisplay.skinName = clazz;
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);
		//打开UI动画
		game.util.UIUtil.popView(this._uiDisplay.root);
		this._uiDisplay.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);

		this._uiDisplay.chakanGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenVip, this);
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.closeBtn));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.chakanGroup));
		this.addAvator();
	}
	private addAvator():void
	{
		let self = this;
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		let headUrl:string = "";
		if(CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG){
			headUrl = userModel.getHeadUrl().replace("yiwantang/","");
		}else{
			headUrl = userModel.getHeadUrl();
		}
		game.util.IconUtil.getHeadIcon(headUrl, (bmp)=>{
			//设置玩家头像
			bmp.x = bmp.y = -47;
			self._uiDisplay.avatorGroup.addChild(bmp);
		});
		this.send(NotifyEnum.USER_INFO_UI_LOADED);
	}
	public setData(lvStr:string, idStr:string, uName:string, vipStr:string ):void
	{
		this._uiDisplay.userId.text = "ID:" + idStr;
		this._uiDisplay.userName.text = uName;
		//lvGroup    数字
		let numFont = new egret.BitmapText();
		numFont.font = RES.getRes("bitmapNum_2_fnt");
		numFont.text = "" + lvStr;
		numFont.anchorOffsetX = numFont.width/2;
		numFont.anchorOffsetY = numFont.height/2;
		numFont.textAlign = egret.HorizontalAlign.LEFT;
		numFont.scaleX = 0.5;
		numFont.scaleY = 0.5;
		this._uiDisplay.lvGroup.addChild(numFont);

		//vipNumGroup vip 数字
		let numFontVip = new egret.BitmapText();
		numFontVip.font = RES.getRes("bitmapNum_2_fnt");
		numFontVip.text = "" + vipStr;
		numFontVip.anchorOffsetX = numFontVip.width/2;
		numFontVip.anchorOffsetY = numFontVip.height/2;
		numFontVip.textAlign = egret.HorizontalAlign.CENTER;
		numFontVip.scaleX = 0.5;
		numFontVip.scaleY = 0.5;
		this._uiDisplay.vipNumGroup.addChild(numFontVip);
		//设置按钮切换

		this._uiDisplay.scoreGroup.name = "scoreGroup";
		this._uiDisplay.areaGroup.name = "areaGroup";
		this._uiDisplay.scoreGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeFunClick, this);
		this._uiDisplay.areaGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeFunClick1, this);
		this.changeFunList(0);

	}
	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/userInfo/UserInfoUI.exml",this.addBgResource,this);
	}
	private changeFunList(nIndex:number):void
	{
		if(nIndex == this._nIndexFun)
		{
			return;
		}
		this._nIndexFun = nIndex;
		if(this._nIndexFun == 0)
		{
			//this._uiDisplay.an.visible = false;
			this._uiDisplay.liang.visible = true;
			//this._uiDisplay.an0.visible = true;
			this._uiDisplay.liang0.visible = false;
		}else if(this._nIndexFun == 1)
		{
			//this._uiDisplay.an.visible = true;
			this._uiDisplay.liang.visible = false;
			//this._uiDisplay.an0.visible = false;
			this._uiDisplay.liang0.visible = true;
		}
	}
	private changeFunClick(e:egret.TouchEvent) 
	{
		this.changeFunList(0);
	}
	private changeFunClick1(e:egret.TouchEvent) 
	{
		this.changeFunList(1);
	}
	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) 
	{
		burn.Director.popView();
	}
	private onOpenVip(e:egret.TouchEvent) 
	{
		burn.Director.popView();
		let view:VipView = new VipView();
		let med:VipMediator = new VipMediator(view);
		burn.Director.pushView(med);
	}
	public destroy():void {
		let self = this;
		game.util.UIUtil.closeView(this._uiDisplay.root, function():void {
			//移除按钮封装
			while (self._btnWrapList.length > 0) {
				let wrap = self._btnWrapList.pop();
				wrap.destroy();
			}
			self._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
			self._uiDisplay.scoreGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.changeFunClick, self);
			self._uiDisplay.areaGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.changeFunClick1, self);
			self._uiDisplay.chakanGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onOpenVip, self);
            
			self.parent && self.parent.removeChild(self);

			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/userInfo/UserInfoUI.exml");
		});
	}
}

/***操作UI的对应类 */
class UserInfoUI extends eui.Component{
	public constructor(){super();}
	public closeBtn:eui.Button;//关闭
	public gunShow:eui.Group;//加炮的地方
	public gunRate:eui.Label;
	public fishTickets:eui.Label;
	public userAva:eui.Image;
	public userName:eui.Label;
	public userId:eui.Label;
	public root:eui.Group;
	public avatorGroup:eui.Group;
	public lvGroup:eui.Group;
	public vipNumGroup:eui.Group;

	public scoreGroup:eui.Group;
	public areaGroup:eui.Group;

	public an:eui.Image;
	public liang:eui.Image;
	public an0:eui.Image;
	public liang0:eui.Image;
	
	public chakanGroup:eui.Group;
}

class AvatorUI extends eui.Component{
	public constructor(){super();}

}
