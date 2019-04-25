class MonthCardView extends burn.view.PopView {
	private _uiDisplay:MonthCardCom;
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
		let uiObj = new MonthCardCom();
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
		this._uiDisplay.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		this._uiDisplay.gainCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGain, this);
		//封装按钮
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnClose));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.gainCard));
		this.setData();
    }
	public setData():void {
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		let monthCardTime = userModel.getMonthEndTime() - game.util.TimeUtil.getCurrTime();
		//monthCardTime = 1000*60*60*24*7;
		if (monthCardTime > 0) {
			let str = game.util.TimeUtil.sceondsMonthCard(monthCardTime);
			this._uiDisplay.remainLab.text = str;
			this._uiDisplay.renewTxt.visible = true;
			this._uiDisplay.getMonthTxt.visible = false;
		} else {
			this._uiDisplay.renewTxt.visible = false;
			this._uiDisplay.getMonthTxt.visible = true;
			this._uiDisplay.remainLab.text = "当前没有月卡";
		}
	}
	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) {
		burn.Director.popView();
		if (this._bShow) {
			this.send(NotifyEnum.CHECK_POP);
		}
	}
	private onGain(e:egret.TouchEvent) {
		if (this._bShow) {
			burn.Director.popView();
			this.send(NotifyEnum.CHECK_POP);
			return;
		}
		//购买
		let vos = game.table.T_Charge_Table.getAllVo();
		let len = vos.length;
		let voMonthCard = null;
		for (let i = 0; i < len; i++) {
			if (vos[i].type == 4) {
				voMonthCard = vos[i];
				break;
			}
		}
		// let priceArr = voMonthCard.price.split("_");
		// let priceStr:string = "";
		// if (priceArr[0] == 10012) {
		// 	priceStr = priceArr[1] + "点券";
		// }
		// game.util.GameUtil.openConfirmByTwoButton(null,function(){
		let msg:ChargeSendMessage = new ChargeSendMessage();
		msg.initData();
		msg.setChargeId(voMonthCard.id);
		NetManager.send(msg);
		// }, this, game.util.Language.getDynamicText(125, [priceStr]));
	}
	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/monthCard/MonthCardUI.exml",this.addBgResource,this);
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
			self._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
			self._uiDisplay.gainCard.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onGain, self);
			self.parent.removeChild(self);
			
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/monthCard/MonthCardUI.exml");
		});
	}
}

/***操作UI的对应类 */
class MonthCardCom extends eui.Component{
	public constructor(){super();}
	public gainCard:eui.Group;//
	public btnClose:eui.Button;//关闭
	public root:eui.Group;
	public remainLab:eui.Label;
	public renewTxt:eui.Image;
	public getMonthTxt:eui.Image;
}