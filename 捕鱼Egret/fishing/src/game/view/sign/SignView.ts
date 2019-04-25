class SignView extends burn.view.PopView {
	private _uiDisplay:SignCom;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	private _bPop:boolean = false;
	public constructor() {
		super();
		this._btnWrapList = new Array();
		game.util.UIUtil.startLoading();
	}
	private addBgResource(clazz:any,url:string):void {
		game.util.UIUtil.closeLoading();
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		let uiObj = new SignCom();
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
		this._uiDisplay.qiandao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQiandao, this);
		this._uiDisplay.buqian.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuqian, this);
		this._uiDisplay.help.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelp, this);
		//封装按钮
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnClose));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.qiandao));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.buqian));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.help));
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/sign/SignItem.exml", ()=>{
			this.send(NotifyEnum.SIGN_UI_LOADED);
        }, this);
    }
    public setListData(signObj:game.model.SignObj):void {
        let vos = game.table.T_MonthSign_Table.getAllVo();
		let month = signObj.CurMonth();
		let signTimes = signObj.getCumulativeSignTimes();//累计签到次数
		let shengyuTimes = signObj.getRemainMakeUpTimes();//剩余补签次数
		let isToday = signObj.IsTodaySign();//是否今天签到
		let isTodayMask = signObj.IsTodayMakeUp();//是否今天补签
		let len = vos.length;
		let arrData = new Array<game.table.T_MonthSign>();
		for (let i = 0; i < len; i++) {
			if (vos[i].month == month) {
				arrData.push(vos[i]);
			}
		}
		this._uiDisplay.listGroup.removeChildren();
		let lenNew = arrData.length;
		for (let i = 0; i < lenNew; i++) {
			let item = new SignItemCom();
			item.setData(signTimes,arrData[i]);
			this._uiDisplay.listGroup.addChild(item);
		}
		let tLayout:eui.TileLayout = new eui.TileLayout();
		tLayout.paddingTop = 10;
		tLayout.paddingLeft = 0;
		tLayout.paddingRight = 0;
		tLayout.paddingBottom = 20;
		this._uiDisplay.listGroup.layout = tLayout;    /// 网格布局

		//添加列表以外的东西
		RES.getResAsync("cardLeiji_fnt", ()=>{
			RES.getResAsync("cardLeiji_png", ()=>{
				this._uiDisplay.leijiGroup.removeChildren();
				this._uiDisplay.buqianGroup.removeChildren();
				let leijiFont = new egret.BitmapText();
				leijiFont.font = RES.getRes("cardLeiji_fnt");
				leijiFont.text = String(signTimes);
				leijiFont.anchorOffsetX = leijiFont.width/2;
				leijiFont.anchorOffsetY = leijiFont.height/2;
				this._uiDisplay.leijiGroup.addChild(leijiFont);
				
				let shengyuFont = new egret.BitmapText();
				shengyuFont.font = RES.getRes("cardLeiji_fnt");
				shengyuFont.text = String(shengyuTimes);
				shengyuFont.anchorOffsetX = shengyuFont.width/2;
				shengyuFont.anchorOffsetY = shengyuFont.height/2;
				this._uiDisplay.buqianGroup.addChild(shengyuFont);
			}, this);
		}, this);
		//
		if (signObj.IsTodaySign()) {
			//let colorFlilter = new egret.ColorMatrixFilter(game.util.FilterEnmu.DARK);
			//this._uiDisplay.qiandao.filters = [colorFlilter];
			this._uiDisplay.qiandao.visible = false;
		} else {
			this._uiDisplay.qiandao.visible = true;
		}

		if (signObj.IsTodayMakeUp()) {
			this._uiDisplay.buqian.visible = false;
		} else {
			this._uiDisplay.buqian.visible = true;
		}
    }
	/** 签到 */
	private onQiandao(e:egret.TouchEvent) {
		let model = burn.Director.getModelByKey(UserModel) as UserModel;
		let month = model.getSignObj().CurMonth();
		let send:MonthSignSendMessage = new MonthSignSendMessage();
        send.initData();
		send.setOperationType(0);
		send.setCurMonth(month);
		NetManager.send(send);
	}
	private onBuqian(e:egret.TouchEvent) {
		let model = burn.Director.getModelByKey(UserModel) as UserModel;
		let month = model.getSignObj().CurMonth();
		let send:MonthSignSendMessage = new MonthSignSendMessage();
        send.initData();
		send.setOperationType(1);
		send.setCurMonth(month);
		NetManager.send(send);
	}
	private onHelp(e:egret.TouchEvent) {
		game.util.GameUtil.openCommonHelp(null,1);
	}
	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) {
		burn.Director.popView();
	}
	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/sign/SignUI.exml",this.addBgResource,this);
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
			self._uiDisplay.qiandao.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onQiandao, self);
			self._uiDisplay.buqian.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onBuqian, self);
			self._uiDisplay.help.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onHelp, self);
			self.parent.removeChild(self);

			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/sign/SignUI.exml");
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/sign/SignItem.exml");
		});
	}
}

/***操作UI的对应类 */
class SignCom extends eui.Component{
	public constructor(){super();}
	public btnClose:eui.Button;//关闭
	public listGroup:eui.Group;
	public leijiGroup:eui.Group;
	public buqianGroup:eui.Group;

	public buqian:eui.Group;
	public qiandao:eui.Group;
	public help:eui.Button;
	public root:eui.Group;
}