class VipView extends burn.view.PopView {
	private _uiDisplay:VipCom;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	private _bPop:boolean = false;
	public constructor() {
		super();
		this._btnWrapList = new Array();
	}
	private addBgResource():void
	{
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		let uiObj = new VipCom();
		this._uiDisplay = uiObj;
		this._uiDisplay.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/vip/VipUI.exml";
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);
		if(!this._bPop)
		{
			game.util.UIUtil.popView(this._uiDisplay.root);
			this._bPop = true;
		}
		//关闭当前界面
		let closeBtn = this._uiDisplay.btnClose;
		closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		this._uiDisplay.chargeGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharge, this);
		//封装按钮
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnClose));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnClose));
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/vip/VipItem.exml", ()=>{
			RES.getResAsync("vipShow_png", ()=>{
					RES.getResAsync("vipShow_fnt", ()=>{
						this.setData();
					},this);
			},this);
		}, this);
    }
	private setData():void
	{
		/**
		public desc:eui.Label;
		public proLab:eui.Label;
		public cur_350:eui.Image; */
        let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		let vipLv = userModel.getVipLevel();
		let totalRMB = userModel.getTatolChargeRMB();
		this._uiDisplay.listGroup.removeChildren();
		let vos = game.table.T_VipLevel_Table.getAllVo();
		let len = vos.length;
		let maxLv = 0;
		for (let i = 1; i < len; i++) {
			let item = new VipItemUI(vos[i],vipLv);
			this._uiDisplay.listGroup.addChild(item);
			maxLv = vos[i].vipLevel;
		}
		let tLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
		this._uiDisplay.listGroup.layout = tLayout;    /// 网格布局

		let curLv = new egret.BitmapText();
		curLv.font = RES.getRes("vipShow_fnt");
		curLv.text = String(vipLv);
		this._uiDisplay.vipCurGroup.addChild(curLv);
		curLv.textAlign = egret.HorizontalAlign.CENTER;
		curLv.anchorOffsetX = curLv.width/2;
		curLv.anchorOffsetY = curLv.height/2;

		let nextLv = new egret.BitmapText();
		nextLv.font = RES.getRes("vipShow_fnt");
		nextLv.text = String(vipLv + 1);
		this._uiDisplay.vipNextGroup.addChild(nextLv);
		nextLv.textAlign = egret.HorizontalAlign.CENTER;
		nextLv.anchorOffsetX = nextLv.width/2;
		nextLv.anchorOffsetY = nextLv.height/2;

		if (maxLv <= vipLv) {
			this._uiDisplay.cur_350.width = 350.0;
			let curVo = game.table.T_VipLevel_Table.getVoByKey(vipLv - 1);
			this._uiDisplay.proLab.text = curVo.levelUpExp/100 + "/" + curVo.levelUpExp/100;
			this._uiDisplay.desc.text = game.util.Language.getText(175);
			this._uiDisplay.vipNextGroup.visible = false;
			this._uiDisplay.nextVipIcon.visible = false;
		} else {
			let curVo = game.table.T_VipLevel_Table.getVoByKey(vipLv);
			let lastVo = game.table.T_VipLevel_Table.getVoByKey(vipLv - 1);
			if (lastVo) {
				let maxExp = curVo.levelUpExp/100;
				let chargeTxt = totalRMB/100;
				let percent = chargeTxt * 1.0 / (curVo.levelUpExp/100);
				
				this._uiDisplay.proLab.text = chargeTxt + "/" + curVo.levelUpExp/100;
				this._uiDisplay.cur_350.width = 350.0 * percent;
				let arrName = new Array<string>();
				arrName.push(curVo.levelUpExp/100 - chargeTxt + "");
				arrName.push(curVo.vipLevel + "");
				this._uiDisplay.desc.text = game.util.Language.getDynamicText(93,arrName);
			} else {
				let maxExp = curVo.levelUpExp/100;
				let chargeTxt = totalRMB/100;
				let percent = chargeTxt * 1.0 / (curVo.levelUpExp/100);
				
				this._uiDisplay.proLab.text = chargeTxt + "/" + curVo.levelUpExp/100;
				this._uiDisplay.cur_350.width = 350.0 * percent;
				let arrName = new Array<string>();
				arrName.push(curVo.levelUpExp/100 - chargeTxt + "");
				arrName.push(curVo.vipLevel + "");
				this._uiDisplay.desc.text = game.util.Language.getDynamicText(93,arrName);
			}
		}
	}
	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) 
	{
		burn.Director.popView();
	}
	private onCharge(e:egret.TouchEvent) 
	{
		burn.Director.popView();
		let chargeView:ChargeView = new ChargeView(ChargeType.Ticket);
		let chargeMed:ChargeMediator = new ChargeMediator(chargeView);
		burn.Director.pushView(chargeMed);
	}
	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/vip/VipUI.exml", this.addBgResource, this);
	}
	public destroy():void {
		//移除按钮封装
		let self = this;
		this._bPop = false;
		//关闭UI动画
		game.util.UIUtil.closeView(this._uiDisplay.root, function():void {
			//移除按钮封装
			while (self._btnWrapList.length > 0) {
				let wrap = self._btnWrapList.pop();
				wrap.destroy();
			}
			self._uiDisplay.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
			self._uiDisplay.chargeGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onCharge, self);
			self.parent.removeChild(self);

			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/vip/VipUI.exml");
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/vip/VipItem.exml");
			RES.destroyRes("vipShow_png");
			RES.destroyRes("vipShow_fnt");
		});
	}
}

/***操作UI的对应类 */
class VipCom extends eui.Component{
	public constructor(){super();}
	public btnClose:eui.Button;//关闭
	public listGroup:eui.Group;//listGroup
	public vipCurGroup:eui.Group;
	public vipNextGroup:eui.Group;
	public nextVipIcon:eui.Image;
	public desc:eui.Label;
	public proLab:eui.Label;
	public cur_350:eui.Image;
	public chargeGroup:eui.Group;

	public root:eui.Group;
}