class ExchangeView extends burn.view.PopView {
	private _uiDisplay:ExchangesUI;
	/**scroview */
	private _itemGroup:eui.Group;
	//数据集合
	private _itemList:Array<ExchangeItemUI>;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	private _bIsSendMsg:boolean;

	//兑换记录的timer
	private _recodeTimer:egret.Timer;
	private _simpleV:number;
	public constructor(bIsSendMsg:boolean = true) {
		super();
		this._bIsSendMsg = bIsSendMsg;
		if (this._bIsSendMsg) {
			game.util.ReyunUtil.sendEvent(game.util.LogEnum.FISH_CLICK_EXCHANGE_COUNT);
		} else {
			game.util.ReyunUtil.sendEvent(game.util.LogEnum.HALL_CLICK_EXCHANGE_COUNT);
		}
		game.util.ReyunUtil.sendEvent(game.util.LogEnum.CLICK_EXCHANGE_COUNT);
		
		this._btnWrapList = new Array();
		this._itemList = new Array<ExchangeItemUI>();
		game.util.UIUtil.startLoading();
	}
	private addBgResource(clazz:any,url:string):void {
		game.util.UIUtil.closeLoading();
		if (this._bIsSendMsg) {
			let send:PondStateMessage = new PondStateMessage();
			send.initData();
			send.setType(4);
			NetManager.send(send);
		}
		let uiLayer:eui.UILayer = new eui.UILayer();
		uiLayer.name = "uiLayer";
        this.addChild(uiLayer); 
		let uiObj = new ExchangesUI();
		uiObj.name = "ExchangesUI";
		this._uiDisplay = uiObj;
		this._uiDisplay.skinName = url;
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);
		//打开UI动画
		//game.util.UIUtil.popView(this._uiDisplay.root);
		game.util.SoundManager.playUISound("B02");
		//关闭当前界面
		let closeBtn = this._uiDisplay.closeBtn;
		closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.closeBtn));

		this._uiDisplay.recoderGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenRecode, this);

		this._itemGroup = this._uiDisplay.itemGroup;
		this.send(NotifyEnum.SET_EXCHANGE_LIST);
		this._uiDisplay.listScroller.touchEnabled = false;
		this._uiDisplay.listScroller.stopAnimation();
		this._uiDisplay.listScroller.enabled = false;
	}
	public setRecodeList(list:any):void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/Recode.exml", ()=>{
			let exchangeModel:ExchangeModel = burn.Director.getModelByKey(ExchangeModel) as ExchangeModel;
			this._uiDisplay.recodeList.removeChildren();
			let len = list.length;
			for (let i = 0; i < len; i++) {
				let item = new RecodeItemUI();
				item.touchEnabled = false;
				let obj:game.model.ExchangeItem = exchangeModel.getListById(list[i].exchangeGoodsId);
				if (obj) {
					item.setData(list[i]);
					egret.Tween.removeTweens(item);
					this._uiDisplay.recodeList.addChild(item);
				}
			}
			let tLayout:eui.VerticalLayout = new eui.VerticalLayout();
			tLayout.gap = -10;
			this._uiDisplay.recodeList.touchEnabled = false;
			this._uiDisplay.recodeList.layout = tLayout;    

			this.playRecodeAct();
			this._uiDisplay.des_txt.textFlow = (new egret.HtmlTextParser).parser(game.util.Language.getText(127))
		}, this,true);
		
	}
	public playRecodeAct():void {
		let childNum = this._uiDisplay.recodeList.numElements;
		if (childNum <= 4) {
			return;
		}

		let self = this;
		if(self._recodeTimer)
		{
			this._uiDisplay.listScroller.viewport.scrollV = 0;
			self._recodeTimer.stop();
			self._recodeTimer.removeEventListener(egret.TimerEvent.TIMER, self.tiemFun, self);
			self._recodeTimer = null;
		}
		let totalV = ((childNum*96));
		self._simpleV = (96.0/50);
		self._recodeTimer = new egret.Timer(30, 50*(childNum));
		self._recodeTimer.addEventListener(egret.TimerEvent.TIMER, self.tiemFun, self);
		self._recodeTimer.start();
		setTimeout(function(){
			self.playRecodeAct();
		}, 1500*(childNum));
	}
	private tiemFun(){
		this._uiDisplay.listScroller.viewport.scrollV += this._simpleV;
	}
	public setList(listVo:Array<game.model.ExchangeItem>, ticketNum:number, dantou:number):void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeItem.exml", ()=>{
			//排序
			function compareFun(item1:game.model.ExchangeItem, item2:game.model.ExchangeItem) {
				if (item1._order < item2._order) {
					return -1; // 如果是降序排序，返回-1。
				} else if (item1._order === item2._order) {
					return 0;
				} else {
					return 1; // 如果是降序排序，返回1。
				}
			}
			for (let item of this._itemList) {
				item.destory();
			}
			listVo.sort(compareFun);

			if (this._itemGroup) {
				this._itemGroup.removeChildren();
				for (let i = 0; i < listVo.length; i++) {
					let strNum = Number(listVo[i]._name.substring(0, listVo[i]._name.length - 3)); //根据名字判断是一元红包
					if(strNum == 1 && CONFIG.PLATFORM_ID != PlatformTypeEnum.YI_WAN_TANG){
						continue;
					}
					let item = new ExchangeItemUI();
					item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeItem.exml";
					item.setData(listVo[i]);
					if (listVo[i]._type == 4) {
						item.setMoney();
					}
					this._itemGroup.addChild(item);
					// game.util.UIUtil.listTween(item.root,i);
				}

				let tLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
				this._itemGroup.layout = tLayout;    /// 网格布局

				this._uiDisplay.num.text = ticketNum/10 + "元";
				this._uiDisplay.d_num.text = dantou + "";
			}
		}, this,true);
	}

	/** 关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) {
		burn.Director.popView();
		let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
		let curId = userModle.getGuideID();
		if (curId == 15) {
			let id = Number(curId) + 1;
			let vo = game.table.T_Guide_Table.getVoByKey(id);
			game.util.Guide.checkGuide(vo.trrigertype);
		}
	}
	/** 打开记录 */
	private onOpenRecode(e:egret.TouchEvent) {
		let exchangeRecodeView:ExchangeRecodeView = new ExchangeRecodeView();
		let exchangeRecodeMed:ExchangeRecodeMediator = new ExchangeRecodeMediator(exchangeRecodeView);
		burn.Director.pushView(exchangeRecodeMed);
	}
	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeUI.exml", this.addBgResource, this);
	}

	public destroy():void {
		if (this._bIsSendMsg) {
			let send:PondStateMessage = new PondStateMessage();
			send.initData();
			send.setType(5);
			NetManager.send(send);
		}
		game.util.UIUtil.closeView(this._uiDisplay.root, ()=>{
			if(this._recodeTimer)
			{
				this._uiDisplay.listScroller.viewport.scrollV = 0;
				this._recodeTimer.stop();
				this._recodeTimer.removeEventListener(egret.TimerEvent.TIMER, this.tiemFun, this);
				this._recodeTimer = null;
			}
			let childNum = this._uiDisplay.recodeList.numElements;
			for (let i = 0; i < childNum; i++) {
				let item = this._uiDisplay.recodeList.getElementAt(i) as RecodeItemUI;
				egret.Tween.removeTweens(item);
			}
			this._uiDisplay.recodeList.removeChildren();
			
			let childItemNum = this._itemGroup.numElements;
			for (let i = 0; i < childItemNum; i++) {
				let item = this._itemGroup.getElementAt(i) as ExchangeItemUI;
				item.destory();
				egret.Tween.removeTweens(item);
			}
			this._itemGroup.removeChildren();
			let uiLayer = this.getChildByName("uiLayer") as eui.UILayer;
			if(uiLayer) {
				let ExchangesUI = uiLayer.getChildByName("ExchangesUI") as ExchangesUI;
				if(ExchangesUI) {
					ExchangesUI.removeChildren();
				}
				uiLayer.removeChildren();
			}
			this.removeChildren();
			//移除按钮封装
			while (this._btnWrapList.length > 0) {
				let wrap = this._btnWrapList.pop();
				wrap.destroy();
			}
			this._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
			this._uiDisplay.recoderGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenRecode, this);

			this.parent && this.parent.removeChild(this);

			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeUI.exml");
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeItem.exml");
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/Recode.exml");
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeRecode.exml");
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeRecodeItem.exml");
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeSure.exml");
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeTicket.exml");
		});
	}
}

/***操作UI的对应类 */
class ExchangesUI extends eui.Component{
	
	public closeBtn:eui.Button;//关闭
	public itemGroup:eui.Group;
	public num:eui.Label;
	public d_num:eui.Label;
	public root:eui.Group;
	public recoderGroup:eui.Group;
	public recodeList:eui.Group;
	public des_txt:eui.Label;

	public listScroller:eui.Scroller;

	public constructor(){
		super();
	}
}