class WanbaGiftView extends burn.view.FullView {
	
	private _ui:WanbaGiftUI;

	private _state:number;
	private _itemList:Array<any>;

	public constructor(state:number, itemList:Array<any>) {
		super();
		this._state = state;
		this._itemList = itemList;
	}

	public initView():void {			 
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/qqZone/QZoneGift.exml", this.addUIResource, this);
	}

	private addUIResource(clazz:any, url:string):void {
		let uiLayer:eui.UILayer = new eui.UILayer();
		this._ui = new WanbaGiftUI();
		this._ui.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/qqZone/QZoneGift.exml";
		this._ui.horizontalCenter = 0;
        this._ui.verticalCenter = 0;
		uiLayer.addChild(this._ui);
		this.addChild(uiLayer);
		//初始化文案
		if (this._state == 1) {	//1成功
			this._ui.title_txt.text = "领取成功";
			this._ui.tips_txt.text = "恭喜你获得：";
		} else if (this._state == 2) { //2已经领取过
			this._ui.title_txt.text = "每天只能领取一次哦";
			this._ui.tips_txt.text = "你今天已经领取过：";
		}
		let giftListStr = "";
		//显示道具列表
		for (let i = 0; i < this._itemList.length; i++) {
			let vo = this._itemList[i];
			let itemId = vo.itemId;
			let num = vo.totalCount;
			let itemVo = game.table.T_Item_Table.getVoByKey(itemId);
			let name = game.util.Language.getText(itemVo.name);
			giftListStr += name + " x " + num + "\n"; 
		}
		this._ui.gift_txt.text = giftListStr;
		this._ui.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeUI, this);

		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/BagItem.exml", this.addList, this);
	}

	private addList(clazz:any, url:string):void 
	{
		//显示道具列表
		for (let i = 0; i < this._itemList.length; i++) {
			let vo = this._itemList[i];
			let itemId = vo.itemId;
			let num = vo.totalCount;
			let itemVo = game.table.T_Item_Table.getVoByKey(itemId);
			let name = game.util.Language.getText(itemVo.name);
			let item = new BagViewItem(itemId, num, false);
			item.scaleX = item.scaleY = 0.9;
			item.skinName = clazz;
			item.init();
			this._ui.gift_grop.addChild(item);
		}
		let tLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
		tLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
		this._ui.gift_grop.layout = tLayout;    /// 网格布局
	}
	/** 关闭UI */
	private closeUI(e:egret.TouchEvent) {
		burn.Director.popView();
		this.send(NotifyEnum.CLOSE_QQZONE_GIFT);
	}

	/**
	 * 销毁函数
	 */
	public destroy():void {
		let self = this;

		self.removeChildren();
		self.parent && self.parent.removeChild(self);

		RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/qqZone/QZoneGift.exml");
	}
}

class WanbaGiftUI extends eui.Component {
	public title_txt:eui.Label;
	public tips_txt:eui.Label;
	public gift_grop:eui.Group;
	public gift_txt:eui.Label;
	public closeBtn:eui.Button;
	public constructor(){
		super();
	}
}