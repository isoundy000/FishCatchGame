class UnlockGunView extends burn.view.PopView {
	private _uiDisplay:UnLockGunCom;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	private _bPop:boolean = false;
	private _bShow:boolean;
	public constructor(bShow:boolean = false) {
		super();
		this._bShow = bShow;
		this._btnWrapList = new Array();
		game.util.UIUtil.startLoading();
	}
	private addBgResource(clazz:any,url:string):void
	{
		game.util.UIUtil.closeLoading();
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		let uiObj = new UnLockGunCom();
		this._uiDisplay = uiObj;
		this._uiDisplay.skinName = clazz;
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);
		if(!this._bPop)
		{
			game.util.UIUtil.popView(this._uiDisplay.root);
			this._bPop = true;
			let self = this;
			setTimeout(function(){
				burn.tools.TweenTools.hopOnce(self._uiDisplay.suo_0, 0.05 ,250);
				burn.tools.TweenTools.hopOnce(self._uiDisplay.suo_1, 0.05 ,250);
				burn.tools.TweenTools.hopOnce(self._uiDisplay.suo_2, 0.05 ,250);
			},1000);
		}
		//关闭当前界面
		let closeBtn = this._uiDisplay.btnClose;
		closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		//封装按钮
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnClose));
		this.setData();
    }
	//设置内容
	private setData():void
	{	
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		let curId = userModel.getCurGunID();
		let gunCurRateVo = game.table.T_Gun_Table.getVoByKey(curId+1);
		this._uiDisplay.curRateLab.text = gunCurRateVo.bulletNum + "";
		let unlockAwardStr = gunCurRateVo.upgradeOrForgeAward.split("_");
		this._uiDisplay.zengLab.text = unlockAwardStr[1] + "";
		let gunLast1RateVo = game.table.T_Gun_Table.getVoByKey(curId);
		let unlockCostStr = gunLast1RateVo.upgradeOrForgeCost.split("_");
		this._uiDisplay.curRateLab.textAlign = egret.HorizontalAlign.CENTER;
		this._uiDisplay.zengLab.textAlign = egret.HorizontalAlign.CENTER;
		this._uiDisplay.zengLab0.textAlign = egret.HorizontalAlign.CENTER;
		this._uiDisplay.zengLab0.text = unlockCostStr[1] + "";
		
		if(gunLast1RateVo)
		{
			this._uiDisplay.lastRate_0.textAlign = egret.HorizontalAlign.CENTER;
			this._uiDisplay.lastRate_0.text = gunLast1RateVo.bulletNum + "";
		}else
		{
			this._uiDisplay.last_0.visible = false;
		}

		let gunLast2RateVo = game.table.T_Gun_Table.getVoByKey(curId - 1);
		if(gunLast2RateVo)
		{
			this._uiDisplay.lastRate_1.textAlign = egret.HorizontalAlign.CENTER;
			this._uiDisplay.lastRate_1.text = gunLast2RateVo.bulletNum + "";
		}else
		{
			this._uiDisplay.last_1.visible = false;
		}

		let gunNext1RateVo = game.table.T_Gun_Table.getVoByKey(curId + 2);
		if(gunNext1RateVo)
		{
			this._uiDisplay.nextRate_0.textAlign = egret.HorizontalAlign.CENTER;
			this._uiDisplay.nextRate_0.text = gunNext1RateVo.bulletNum + "";
		}else
		{
			this._uiDisplay.next_0.visible = false;
		}

		let gunNext2RateVo = game.table.T_Gun_Table.getVoByKey(curId + 3);
		if(gunNext2RateVo)
		{
			this._uiDisplay.nextRate_1.textAlign = egret.HorizontalAlign.CENTER;
			this._uiDisplay.nextRate_1.text = gunNext2RateVo.bulletNum + "";
		}else
		{
			this._uiDisplay.next_1.visible = false;
		}

		burn.tools.TweenTools.showOutAndIn(this._uiDisplay.select, 1500);
		this.showGun(userModel.getCurSkinId());

		this._uiDisplay.cur.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tipCharge, this);
	}
	private showGun(nId):void
	{
		let self = this;
		RES.getResAsync("goodsicon_" + nId +  "_png",function():void {
			let icon1 = new egret.Bitmap(RES.getRes("goodsicon_" + nId +  "_png"));
			let icon2 = new egret.Bitmap(RES.getRes("goodsicon_" + nId +  "_png"));
			let icon3 = new egret.Bitmap(RES.getRes("goodsicon_" + nId +  "_png"));
			let icon4 = new egret.Bitmap(RES.getRes("goodsicon_" + nId +  "_png"));
			let icon5 = new egret.Bitmap(RES.getRes("goodsicon_" + nId +  "_png"));
			icon1.anchorOffsetX = icon2.anchorOffsetX = icon3.anchorOffsetX = icon4.anchorOffsetX = icon5.anchorOffsetX = icon1.width/2;
			icon1.anchorOffsetY = icon2.anchorOffsetY = icon3.anchorOffsetY = icon4.anchorOffsetY = icon5.anchorOffsetY = icon1.height/2;
			self._uiDisplay.icon_0.addChild(icon1);
			self._uiDisplay.iconLast_0.addChild(icon2);
			self._uiDisplay.iconLast_1.addChild(icon3);
			self._uiDisplay.iconNext_0.addChild(icon4);
			self._uiDisplay.iconNext_1.addChild(icon5);
		},this);
	}
	/** 弹充值 */
	private tipCharge(e:egret.TouchEvent)
	{
		burn.Director.popView();
		this.send(NotifyEnum.POP_CHARGE,{type:ChargeType.Gem});
	}
	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) 
	{
		burn.Director.popView();
	}
	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/unlockGun/UnlockGunUI.exml",this.addBgResource,this);
	}

	public destroy():void {
		let self = this;
		this._bPop = false;
		//关闭UI动画
		game.util.UIUtil.closeView(this._uiDisplay.root, function():void {
			//移除按钮封装
			while (self._btnWrapList.length > 0) {
				let wrap = self._btnWrapList.pop();
				wrap.destroy();
			}
			self._uiDisplay.cur.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.tipCharge, self);
			self._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
			self.parent.removeChild(self);

			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/unlockGun/UnlockGunUI.exml");
		});
	}
}

/***操作UI的对应类 */
class UnLockGunCom extends eui.Component{
	public constructor(){super();}
	public btnClose:eui.Button;//关闭
    public root:eui.Group;

	//cur 相关
	public cur:eui.Group;
	public icon_0:eui.Group;
	public curRateLab:egret.BitmapText;
	public zengLab:egret.BitmapText;
	public zengLab0:egret.BitmapText;

	//last_0
	public last_0:eui.Group;
	public iconLast_0:eui.Group;
	public lastRate_0:egret.BitmapText;

	//last_1
	public last_1:eui.Group;
	public iconLast_1:eui.Group;
	public lastRate_1:egret.BitmapText;

	//next_0
	public next_0:eui.Group;
	public iconNext_0:eui.Group;
	public nextRate_0:egret.BitmapText;

	//next_1
	public next_1:eui.Group;
	public iconNext_1:eui.Group;
	public nextRate_1:egret.BitmapText;

	//锁
	public suo_0:eui.Image;
	public suo_1:eui.Image;
	public suo_2:eui.Image;

	//闪一闪
	public select:eui.Image;
}