class ExchangeSureView extends burn.view.PopView {
	private _uiDisplay:ExchangesSureUI;
	/**scroview */
	private _itemGroup:eui.Group;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	private _nId:number;
	private oldName:string;
	private oldAdd:string;
	public constructor() {
		super();
		this._btnWrapList = new Array();
	}
	private addBgResource(clazz:any,url:string):void
	{
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		let uiObj = new ExchangesSureUI();
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
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/exchange/ExchangeItem.exml",this.loadItem,this);
		this._uiDisplay.name_Edit.alpha = 0.4;
		this._uiDisplay.phone_Edit.alpha = 0.4;
		this._uiDisplay.qq_Edit.alpha = 0.4;
		this._uiDisplay.add_Edit.alpha = 0.4;
		this._uiDisplay.name_Edit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChange,this);
		this._uiDisplay.phone_Edit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChange,this);
		this._uiDisplay.qq_Edit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChange,this);
		this._uiDisplay.add_Edit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChange,this);
	}
	public loadItem(clazz:any,url:string):void
	{
		this.send(NotifyEnum.EXCHANGE_SURE_LOADED);
	}
	public setOption(nId:number):void
	{
		let exchangeModel:ExchangeModel = burn.Director.getModelByKey(ExchangeModel) as ExchangeModel;
		let vo = exchangeModel.getListById(nId);
		this._nId = nId;
		let item = new ExchangeItemUI();
		item.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/exchange/ExchangeItem.exml";
		item.setData(vo);
		item.setType();
		item.anchorOffsetX = item.width/2;
		item.anchorOffsetY = item.height/2;
		this._uiDisplay.itemGroup.addChild(item);
		this._uiDisplay.exchangeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExchange, this);

		this._uiDisplay.psLab.text = game.util.Language.getText(66);
		this.oldName = this._uiDisplay.name_Edit.text;
		this.oldAdd = this._uiDisplay.add_Edit.text;
	}
	private onExchange(e:egret.TouchEvent) 
	{
		let strName = this._uiDisplay.name_Edit.text;
		let strPhone = this._uiDisplay.phone_Edit.text;
		let strQQ = this._uiDisplay.qq_Edit.text;
		let strAdd = this._uiDisplay.add_Edit.text;
		
		if(strName.trim() == "" || this.oldName == strName.trim())
		{//
			game.util.GameUtil.popTips(game.util.Language.getText(72)); 
			return;
		}

		if(strAdd.trim() == "" || this.oldAdd == strAdd.trim())
		{//73
			game.util.GameUtil.popTips(game.util.Language.getText(73)); 
			return;
		}
		let judgePhone = /^1\d{10}$/;
		let reg = new RegExp("^[0-9a-zA-Z]*$");
		
		if (!judgePhone.test(strPhone)) {
			game.util.GameUtil.popTips(game.util.Language.getText(2455)); 
			return;
		}
		if(!reg.test(strQQ))
		{
			game.util.GameUtil.popTips(game.util.Language.getText(70)); 
			return;
		}
		let self = this;
		let strTips = "姓名:" + strName + "\n";
			strTips += "电话" + strPhone + "\n";
			strTips += "QQ:" + strQQ + "\n";
			strTips += "地址:" + strAdd + "\n";
			strTips += "您确认兑换吗?";
		game.util.GameUtil.openConfirmByTwoButton(null,function(){
			let req:ExchangeSendMessage = new ExchangeSendMessage();
			req.initData();
			req.setGoodsId(self._nId);
			req.setReceiverName(strName);
			req.setReceiverPhone(strPhone);
			req.setReceiverQQ(strQQ);
			req.setReceiverAddress(strAdd);
			NetManager.send(req)
			self.onClosttButtonClick(null);
		},this,strTips);
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
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/exchange/ExchangeSure.exml",this.addBgResource,this);
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
			self._uiDisplay.exchangeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onExchange, self);
			self._uiDisplay.name_Edit.addEventListener(egret.TouchEvent.TOUCH_TAP,self.onChange,self);
			self._uiDisplay.phone_Edit.addEventListener(egret.TouchEvent.TOUCH_TAP,self.onChange,self);
			self._uiDisplay.qq_Edit.addEventListener(egret.TouchEvent.TOUCH_TAP,self.onChange,self);
			self._uiDisplay.add_Edit.addEventListener(egret.TouchEvent.TOUCH_TAP,self.onChange,self);
			self.parent && self.parent.removeChild(self);
		});
	}
}

/***操作UI的对应类 */
class ExchangesSureUI extends eui.Component{
	public constructor(){super();}
	public closeBtn:eui.Button;//关闭
	public root:eui.Group;
	public itemGroup:eui.Group;
	public exchangeBtn:eui.Group;//确认按钮
	public name_Edit:eui.EditableText;
	public phone_Edit:eui.EditableText;
	public qq_Edit:eui.EditableText;
	public add_Edit:eui.EditableText;
	public psLab:eui.Label;
}