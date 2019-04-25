class FirstChargeView extends burn.view.PopView {
	private _uiDisplay:FirstChargeCom;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	private _bPop:boolean = false;
	public constructor() {
		super();
		this._btnWrapList = new Array();
	}
	private addBgResource(clazz:any,url:string):void {
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer);
		let uiObj = new FirstChargeCom();
		this._uiDisplay = uiObj;
		this._uiDisplay.skinName = clazz;
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);
		if (!this._bPop) {
			game.util.UIUtil.popView(this._uiDisplay.root);
			this._bPop = true;
		}
		//关闭当前界面
		let closeBtn = this._uiDisplay.btnClose;
		closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		this._uiDisplay.chargeGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharge, this);
		//封装按钮chargeGroup
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnClose));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.chargeGroup));

		this._uiDisplay.listGroup.removeChildren();
		let str = game.table.T_Config_Table.getVoByKey(53).value;
		let datas = str.split(",");
		let len = datas.length;
		for (let i = 0; i < len; i++) {
			let itemStr = datas[i].split("_");
			let itemId = Number(itemStr[0]);
			let itemCount = Number(itemStr[1]);
			let item = new BagViewItem(itemId, itemCount);
			item.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/BagItem.exml";
			item.init();
			this._uiDisplay.listGroup.addChild(item);
		}

		let item = new BagViewItem(1,1);
		item.initAutoGun();
		this._uiDisplay.listGroup.addChild(item);

		let tLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
		tLayout.gap = 50;
		tLayout.horizontalAlign = egret.HorizontalAlign.LEFT;
		this._uiDisplay.listGroup.layout = tLayout;    /// 网格布局
		this._uiDisplay.listGroup.anchorOffsetX = this._uiDisplay.listGroup.width/2;
		this._uiDisplay.listGroup.anchorOffsetY = this._uiDisplay.listGroup.height/2;
    }
	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) {
		burn.Director.popView();
	}
	private onCharge(e:egret.TouchEvent) {
		burn.Director.popView();
		let chargeView:ChargeView = new ChargeView(ChargeType.Ticket);
		let chargeMed:ChargeMediator = new ChargeMediator(chargeView);
		burn.Director.pushView(chargeMed);
	}
	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/firstCharge/firstChargeUI.exml",this.addBgResource,this);
	}

	public destroy():void {
		let self = this;
		this._bPop = false;
		//关闭UI动画
		game.util.UIUtil.closeView(self._uiDisplay.root, function():void {
			//移除按钮封装
			while (self._btnWrapList.length > 0) {
				let wrap = self._btnWrapList.pop();
				wrap.destroy();
			}
			self._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
			self._uiDisplay.chargeGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onCharge, self);
			self.parent && self.parent.removeChild(self);
			self.send(NotifyEnum.CHECK_POP);

			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/firstCharge/firstChargeUI.exml");
		});
	}
}

/***操作UI的对应类 */
class FirstChargeCom extends eui.Component{
	public constructor(){super();}
	public btnClose:eui.Button;//关闭
	public listGroup:eui.Group;//list
    public chargeGroup:eui.Group;//chongzhi
	public root:eui.Group;
}