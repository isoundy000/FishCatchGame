/**
 * 公告UI界面View
 */
class NoticeView extends burn.view.FullView {

	private _ui:NoticeViewUI;
	private _tx:egret.TextField;

	private _contentTxt:egret.TextField;

	private _itemList:Array<NoticeTitleItemView>;

	private _callback:Function;

	public constructor() {
		super();
		this._itemList = new Array<NoticeTitleItemView>();
	}

	public initView(callback:Function):void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/notice/NoticeUI.exml", this.addUIResource, this);
		this._callback = callback;
	}

	private addUIResource(clazz:any, url:string):void {
		let uiLayer:eui.UILayer = new eui.UILayer();
		this._ui = new NoticeViewUI();
		this._ui.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/notice/NoticeUI.exml";
		this._ui.horizontalCenter = 0;
        this._ui.verticalCenter = 0;
		uiLayer.addChild(this._ui);
		this.addChild(uiLayer);
		this._ui.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeEvent, this);
		this._callback && this._callback();
	}

	public setNoticeData(data:Array<any>):void {
		if(data.length == 0)
		{
			burn.Director.popView();
			return;
		}
		this._ui.left_group.removeChildren();
		for (let i = 0; i < data.length; i++) {
			if (i == 0) {	
				let item = new NoticeTitleItemView(data[i].orders, data[i].title, true);
				this.setContent(data[i].title, data[i].content);
				this._ui.left_group.addChild(item);
				this._itemList.push(item);
			} else {
				let item = new NoticeTitleItemView(data[i].orders, data[i].title, false);
				this._ui.left_group.addChild(item);
				this._itemList.push(item);
			}
		}
		let tLayout:eui.VerticalLayout  = new eui.VerticalLayout();
        tLayout.paddingLeft = 0;
        tLayout.paddingRight = 0;
		this._ui.left_group.layout = tLayout;   
		if (this._ui.left_scroller.verticalScrollBar) {
			this._ui.left_scroller.verticalScrollBar.autoVisibility = false;
		} 
	}

	/** 设置右侧面板公告内容 */
	private setContent(title:string, str:string):void {
		this._ui.right_group.removeChildren();
		let titleGroup = new eui.Group();
		let contentGroup = new eui.Group();

		let W = 595;

		this._tx = new egret.TextField();
		this._tx.textAlign = egret.HorizontalAlign.CENTER;
		this._tx.text = title;
		this._tx.size = 33;
		this._tx.bold = true;
		titleGroup.addChild(this._tx);
		titleGroup.width = W;
		this._tx.width = W;
		titleGroup.height = this._tx.height;

		this._contentTxt = new egret.TextField();
		this._contentTxt.textAlign = egret.HorizontalAlign.LEFT;
		this._contentTxt.textFlow = (new egret.HtmlTextParser).parser(str);
		this._contentTxt.touchEnabled = false;
		this._contentTxt.lineSpacing = 16;
		contentGroup.addChild(this._contentTxt);
		contentGroup.width = W;
		this._contentTxt.width = W;
		contentGroup.height = this._contentTxt.height;

		this._ui.right_group.addChild(titleGroup);
		this._ui.right_group.addChild(contentGroup);

		let tLayout:eui.VerticalLayout  = new eui.VerticalLayout();
        tLayout.paddingLeft = 20;
        tLayout.paddingRight = 20;
		this._ui.right_group.layout = tLayout;    
	}

	public clickItem(id:number, title:string, content:string):void {
		for (let i = 0; i < this._itemList.length; i++) {
			if (id == this._itemList[i].getId()) {
				this._itemList[i].setSelected(true);
			} else {
				this._itemList[i].setSelected(false);
			}
		}
		this.setContent(title, content);
	}

	private closeEvent(evt:egret.TouchEvent):void {
		burn.Director.popView();
	}

	/**
	 * 销毁函数
	 */
	public destroy():void {
		this._itemList = null;
		this._ui.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeEvent, this);

		this.removeChildren();
		this.parent && this.parent.removeChild(this);

		RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/notice/NoticeUI.exml");
		RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/notice/NoticeItemBtnUI.exml");
	}

}

class NoticeViewUI extends eui.Component {

	public root:eui.Group;
	public bg:eui.Image;
	public titleBg:eui.Image;
	public titleBg0:eui.Image;
	public closeBtn:eui.Button;
	public left_scroller:eui.Scroller;
	public right_scroller:eui.Scroller;

	public left_group:eui.Group;
	public right_group:eui.Group;

	public constructor(){
		super();
	}
}