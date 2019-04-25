class TrumpetView extends burn.view.PopView {
	
	public _trumpetUI:TrumpetUIView;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	
	public constructor() {
		super();
		this._btnWrapList = new Array();
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/trumpet/TrumpetUI.exml", this.loadUIComplete, this);
	}

	public loadUIComplete(clazz:any, url:string) {
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer);
		this._trumpetUI = new TrumpetUIView();
		this._trumpetUI.skinName = clazz;
		this._trumpetUI.horizontalCenter = 0;
        this._trumpetUI.verticalCenter = 0;
		uiLayer.addChild(this._trumpetUI);

		this._trumpetUI.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		this._trumpetUI.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendButtonClick, this);

		this._btnWrapList.push(new burn.tools.UIWrap(this._trumpetUI.closeBtn));
		this._btnWrapList.push(new burn.tools.UIWrap(this._trumpetUI.sendBtn));

		this._trumpetUI.input_txt.addEventListener(egret.Event.CHANGE, this.onChang, this);
		//输入限制提示
		this._trumpetUI.des_txt.text = game.util.Language.getText(205);

		this.setViewList();
	}

	public setViewList():void {
		//显示聊天内容
		this._trumpetUI.itemList.removeChildren();
		let msgList = GlobalManager.getInstance().trumpetMsgList;

		for (let msg of msgList) {
			let container = new eui.Group();
			let tf = new egret.TextField();
			tf.text = game.util.Language.getText(221) + " " + msg;
			tf.width = 870;
			tf.textColor = 0xffe58c;
			container.addChild(tf);

			let shp:egret.Shape = new egret.Shape();
			shp.graphics.lineStyle(2, 0xffffff);
			shp.graphics.moveTo(0, tf.height + 15);
			shp.graphics.lineTo(900, tf.height + 15);
			shp.graphics.endFill();
			shp.alpha = 0.5;
			container.addChild(shp);
			container.height = tf.height + 25;
			this._trumpetUI.itemList.addChild(container);
			container.cacheAsBitmap = true;
		}

		let tLayout:eui.VerticalLayout = new eui.VerticalLayout();
		this._trumpetUI.itemList.layout = tLayout;    //线性布局
	}

	private onChang(e:egret.Event){
		let text = this._trumpetUI.input_txt.text;
		//最多显示30字
		if (text.length > 30) {
			text = text.substring(0, 30);
			this._trumpetUI.input_txt.text = text;
			game.util.GameUtil.popTips(game.util.Language.getText(205));
		}
	}

	private onClosttButtonClick(e:egret.TouchEvent) {
		burn.Director.popView();
	}

	private onSendButtonClick(e:egret.TouchEvent) {
		let text = this._trumpetUI.input_txt.text;
		if (text.length > 30) {
			text = text.substring(0, 30);
		}
		this._trumpetUI.input_txt.text = "";
		this.send(NotifyEnum.SEND_TRUMPET_MSG, text);
		burn.Director.popView();
	}

	public destroy():void {
		//移除按钮封装
		while (this._btnWrapList.length > 0) {
			let wrap = this._btnWrapList.pop();
			wrap.destroy();
		}
		this.parent && this.parent.removeChild(this);
	}
}

class TrumpetUIView extends eui.Component {
	public closeBtn:eui.Button;
	public sendBtn:eui.Group;
	public des_txt:eui.Label;
	public input_txt:eui.EditableText;
	public scroller:eui.Scroller;
	public itemList:eui.Group;

	public constructor() {
		super();
	}
}

