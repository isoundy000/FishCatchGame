class ExchangeTicketView extends burn.view.PopView {
	private _uiDisplay:ExchangesTicketUI;
	/**scroview */
	private _itemGroup:eui.Group;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	private _nId:number;
	public constructor(nId) {
		super();
		this._btnWrapList = new Array();
		this._nId = nId;
	}
	private addBgResource(clazz:any,url:string):void
	{
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		let uiObj = new ExchangesTicketUI();
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
		
		this._uiDisplay.name_Edit.alpha = 0.4;
		this._uiDisplay.phone_Edit.alpha = 0.4;
		this._uiDisplay.name_Edit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChange,this);
		this._uiDisplay.phone_Edit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChange,this);

		this._uiDisplay.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExchange, this);
		
		let exchangeModel:ExchangeModel = burn.Director.getModelByKey(ExchangeModel) as ExchangeModel;
		let item = exchangeModel.getListById(this._nId);
		//161-168
		if(item._type != 4)
		{
			this._uiDisplay.nameT.text = game.util.Language.getText(161);
			this._uiDisplay.phoneT.text = game.util.Language.getText(162);
			this._uiDisplay.name_Edit.text = game.util.Language.getText(163);
			this._uiDisplay.phone_Edit.text = game.util.Language.getText(164);
		}else
		{
			this._uiDisplay.nameT.text = game.util.Language.getText(165);
			this._uiDisplay.phoneT.text = game.util.Language.getText(166);
			this._uiDisplay.name_Edit.text = game.util.Language.getText(167);
			this._uiDisplay.phone_Edit.text = game.util.Language.getText(168);
		}

		//this._uiDisplay.descLab.text = game.table.T_Language_Table.getVoByKey(174).value;
		let str = game.table.T_Language_Table.getVoByKey(174).value;
		let contentTxt = new egret.TextField();
		contentTxt.textAlign = egret.HorizontalAlign.LEFT;
		contentTxt.textFlow = (new egret.HtmlTextParser).parser(str);
		contentTxt.touchEnabled = false;
		contentTxt.lineSpacing = 5;
        contentTxt.width = this._uiDisplay.descGroup.width;
        contentTxt.height = this._uiDisplay.descGroup.height;
		this._uiDisplay.descGroup.addChild(contentTxt)
	}
	private onExchange(e:egret.TouchEvent) 
	{
		let strName = this._uiDisplay.name_Edit.text;
		let strPhone = this._uiDisplay.phone_Edit.text;

		if (strName == "" || strPhone == "") {
			game.util.GameUtil.popTips(game.util.Language.getText(172)); 
			return 
		}
		if(strName != strPhone)
		{
			game.util.GameUtil.popTips(game.util.Language.getText(69)); 
			return;
		}

		let exchangeModel:ExchangeModel = burn.Director.getModelByKey(ExchangeModel) as ExchangeModel;
		let item = exchangeModel.getListById(this._nId);
		if(item._type != 4)
		{
			let self = this;
			let strTips = game.util.Language.getText(161) + strPhone + "\n";
				strTips += "您确认兑换吗?"
			game.util.GameUtil.openConfirmByTwoButton(null,function(){
				let req:ExchangeSendMessage = new ExchangeSendMessage();
				req.initData();
				req.setGoodsId(self._nId);
				req.setReceiverPhone(strPhone);
				NetManager.send(req)
				self.onClosttButtonClick(null);
			},this,strTips);
		}else
		{
			
			let self = this;
			let strTips = game.util.Language.getText(165) + strPhone + "\n";
				strTips += "您确认兑换吗?"
			game.util.GameUtil.openConfirmByTwoButton(null,function(){
				let req:ExchangeSendMessage = new ExchangeSendMessage();
				req.initData();
				req.setGoodsId(self._nId);
				req.setReceiverZFB(strPhone);
				NetManager.send(req)
				self.onClosttButtonClick(null);
			},this,strTips);
		}
	}
	public onChange(e:egret.Event){
    	e.target.text = "";
		e.target.alpha = 1;
	}
	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) 
	{
		burn.Director.popView();
	}
	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/exchange/ExchangeTicket.exml",this.addBgResource,this);
	}

	public destroy():void {
		let self = this;
		game.util.UIUtil.closeView(this._uiDisplay.root, function():void {
			//移除按钮封装
			while (self._btnWrapList.length > 0) {
				let wrap = self._btnWrapList.pop();
				wrap.destroy();
			}
			self._uiDisplay.name_Edit.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onChange, self);
			self._uiDisplay.phone_Edit.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onChange, self);
			self._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
			self.parent && self.parent.removeChild(self);
		});
	}
}

/***操作UI的对应类 */
class ExchangesTicketUI extends eui.Component{
	public constructor(){super();}
	public closeBtn:eui.Button;//关闭
	public root:eui.Group;
	public name_Edit:eui.EditableText;
	public phone_Edit:eui.EditableText;
	public okBtn:eui.Group;

	public phoneT:eui.Label;
	public nameT:eui.Label;

	public descGroup:eui.Group;
}