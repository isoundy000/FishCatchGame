/**
 * 邮箱界面view
 */
class EmailView extends burn.view.FullView {
	//邮箱UI
	private _emialUI:EmailViewUI;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	//
	private selectIndex:number;
	
	public constructor() {
		super();
		game.util.UIUtil.startLoading();
	}

	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/EmailItme.exml", ()=>{
			EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/EmailUI.exml", function(clazz:any,url:string){
				this.loadComplete(clazz, url);
			}, this);
		}, this);
		this._btnWrapList = new Array();
	}


	private loadComplete(clazz:any,url:string):void
	{
		game.util.UIUtil.closeLoading();
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		//添加操作UI
		let uiObj = new EmailViewUI();
		this._emialUI = uiObj;
		this._emialUI.skinName = clazz;
		this._emialUI.horizontalCenter = 0;
        this._emialUI.verticalCenter = 0;
		uiLayer.addChild(this._emialUI);

		//打开UI动画
		game.util.UIUtil.popView(this._emialUI.root);

		//添加关闭按钮事件
		this._emialUI.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseEvent, this);

		//添加按钮事件
		this._emialUI.giftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeList, this);
		this._emialUI.serverBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeList, this);

		//封装按钮状态功能
		this._btnWrapList.push(new burn.tools.UIWrap(this._emialUI.closeBtn));
		this.send(NotifyEnum.SHOW_EMAIL_LIST,1);
		//this.changeListByIndex(1);
    }
	//显示礼物列表
	public showGiftList(list:Array<game.model.EmailItem>):void
	{
		this._emialUI.scrolGroup.removeChildren();
		for(let i = 0; i < list.length; i++)
		{
			let item = new EmailViewItem();
			item.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/EmailItme.exml";
			item.setData(list[i]);
			item.lingquBtn.name = list[i].getMailId() + "";
			item.lingquBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.touchItemEvent, this);
			item.chakanBtn.name = list[i].getMailId() + "";
			item.chakanBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.touchItemEvent, this);
			this._emialUI.scrolGroup.addChild(item);
		}

		let tLayout:eui.TileLayout = new eui.TileLayout();
        tLayout.paddingTop = 10;
        tLayout.paddingLeft = 0;
        tLayout.paddingRight = 0;
        tLayout.paddingBottom = 20;
		this._emialUI.scrolGroup.layout = tLayout;    /// 网格布局
	}

	private touchItemEvent(e:egret.TouchEvent)
	{
		let name = e.currentTarget.name;
		let emialModel:EmailModel = burn.Director.getModelByKey(EmailModel) as EmailModel;
		let itemList= emialModel.getMailListById(Number(name));
		game.util.GameUtil.openEmailChakan(null, ()=>{
			this.send(NotifyEnum.RECEIVE_MAIL_SEND, name);
		},itemList.getMailContent(),itemList.getItems(),itemList.getState());
	}
	//显示系统消息列表
	public showServerList(list:Array<game.model.EmailItem>):void
	{
		this._emialUI.scrolGroup.removeChildren();
		for(let i = 0; i < list.length; i++)
		{
			let item = new EmailViewItem();
			item.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/EmailItme.exml";
			item.setData(list[i]);
			item.lingquBtn.name = list[i].getMailId() + "";
			item.lingquBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.touchItemEvent, this);
			item.chakanBtn.name = list[i].getMailId() + "";
			item.chakanBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.touchItemEvent, this);
			this._emialUI.scrolGroup.addChild(item);
		}

		let tLayout:eui.TileLayout = new eui.TileLayout();
        tLayout.paddingTop = 10;
        tLayout.paddingLeft = 0;
        tLayout.paddingRight = 0;
        tLayout.paddingBottom = 20;
		this._emialUI.scrolGroup.layout = tLayout;    /// 网格布局
	}
	/** 切换列表 */
	private changeList(e:egret.TouchEvent) 
	{
		if(e.target == this._emialUI.giftBtn)
		{
			//this.changeListByIndex(1);
			this.send(NotifyEnum.SHOW_EMAIL_LIST,1);
		}else if(e.target == this._emialUI.serverBtn)
		{
			//this.changeListByIndex(2);
			this.send(NotifyEnum.SHOW_EMAIL_LIST,2);
		}
	}
	public changeListByIndex(nIndex:number, list:Array<game.model.EmailItem>,update:boolean,bAlert:boolean):void
	{
		function sortFun(a:game.model.EmailItem, b:game.model.EmailItem) {
            if(a.getState() > b.getState())
            {
                return 1;
            }else if(a.getState() < b.getState())
            {
                return -1;
            }else 
            {
                return 0;
            }
        }
		list.sort(sortFun);
		if(this.selectIndex == nIndex && !update)
		{
			return;
		}
		if(nIndex == 1)
		{
			this._emialUI.unSel.visible = false;
			this._emialUI.Sel.visible = true;
			this._emialUI.unSelServer.visible = true;
			this._emialUI.SelServer.visible = false;
			this._emialUI.giftAlert.visible = false;
			this._emialUI.serverAlert.visible = bAlert;
			this.showGiftList(list);
		}else if(nIndex == 2)
		{
			this._emialUI.unSelServer.visible = false;
			this._emialUI.SelServer.visible = true;
			this._emialUI.unSel.visible = true;
			this._emialUI.Sel.visible = false;
			this._emialUI.serverAlert.visible = false;
			this._emialUI.giftAlert.visible = bAlert;
			this.showServerList(list);
		}
		this.selectIndex = nIndex;
	}
	/** 关闭界面按钮事件 */
	private onCloseEvent(e:egret.TouchEvent) {
		burn.Director.popView();
	}

	public destroy():void {
		let self = this;
		game.util.UIUtil.closeView(this._emialUI.root, function():void {
			//移除按钮封装
			while (self._btnWrapList.length > 0) {
				let wrap = self._btnWrapList.pop();
				wrap.destroy();
			}
			self._emialUI.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onCloseEvent, self);
			self._emialUI.giftBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.changeList, self);
			self._emialUI.serverBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.changeList, self);
			self.parent.removeChild(self);

			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/EmailItme.exml");
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/EmailUI.exml");
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/EmailChakanPanel.exml");

		});
	}
}

class EmailViewUI extends eui.Component{
	public closeBtn:eui.Button;

	public unSel:eui.Group;
	public Sel:eui.Group;
	public giftBtn:eui.Button;

	public unSelServer:eui.Group;
	public SelServer:eui.Group;
	public serverBtn:eui.Button;

	public scrol:eui.Scroller;
	public scrolGroup:eui.Group;
	public root:eui.Group;

	public giftAlert:eui.Image;
	public serverAlert:eui.Image;
	public constructor(){
		super();
	}
}