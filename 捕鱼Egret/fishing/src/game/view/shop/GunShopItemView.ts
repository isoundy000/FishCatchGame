class GunShopItemView extends eui.Component {
	
	private _type:number;
	private _id:number;
	private _itemId:number;
	private _priceType:number;
	private _price:number;
	private _num:number;
	public icon_point:eui.Group;
	public buy:eui.Group;

	public item_name:eui.Label;
	public desTxt:eui.Label;
	public priceTxt:eui.Label;  //28 167  28 67
	public buyIcon:eui.Image;
	public xufeiIcon:eui.Image;
	/** 选中状态 */
	public select:eui.Image;
	public timeImg:eui.Image;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	public constructor(type:number, id:number, itemId:number, priceType:number, price:number, num:number) {
		super();
		this._type = type;
		this._id = id;
		this._itemId = itemId;
		this._priceType = priceType;
		this._price = price;
		this._num = num;
		this.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/shop/GunShopItem.exml";
		this._btnWrapList = new Array();
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/shop/GunShopItem.exml", this.addResource, this);
	}

	//UI加载完成
	private addResource(clazz:any,url:string):void {
		let self = this;
		let priceName = game.util.Language.getText(game.table.T_Item_Table.getVoByKey(this._priceType).name);
		if (this._type == 3) {
			game.util.IconUtil.getIconByIdAsync(IconType.PROP, this._itemId, function(icon:egret.Bitmap):void {
				if (icon) {
					icon.anchorOffsetX = icon.width >> 1;
					icon.anchorOffsetY = icon.height + 20;
					self.icon_point.addChild(icon);
				}
			});

			this.desTxt.text = "x" + this._num;
			let itemVo = game.table.T_Item_Table.getVoByKey(this._itemId);
			this.item_name.text = game.util.Language.getText(itemVo.name);
			this.priceTxt.text = this._price + priceName;
		} else if (this._type == 1) {//炮
			game.util.IconUtil.getIconByIdAsync(IconType.PAO, this._itemId, function(icon:egret.Bitmap):void {
				if (icon) {
					icon.anchorOffsetX = icon.width >> 1;
					icon.anchorOffsetY = icon.height - 17;
					self.icon_point.addChild(icon);
				}
			});

			this.desTxt.text = "x" + this._num;
			let itemVo = game.table.T_Item_Table.getVoByKey(this._itemId);
			this.item_name.text = game.util.Language.getText(itemVo.name);
			this.priceTxt.text = this._price + priceName;
			this.priceTxt.y -= 100;
			this.timeImg.visible = true;
			this.desTxt.visible = false;
		} else if (this._type == 2) {//炮座
			game.util.IconUtil.getIconByIdAsync(IconType.PAOBG, this._itemId, function(icon:egret.Bitmap):void {
				if (icon) {
					icon.anchorOffsetX = icon.width >> 1;
					icon.anchorOffsetY = icon.height;
					self.icon_point.addChild(icon);
				}
			});

			this.desTxt.text = "x" + this._num;
			let itemVo = game.table.T_Item_Table.getVoByKey(this._itemId);
			this.item_name.text = game.util.Language.getText(itemVo.name);
			this.priceTxt.text = this._price + priceName;
			this.priceTxt.y -= 100;
			this.timeImg.visible = true;
			this.desTxt.visible = false;
		}
		this.buy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyBtn, this);
		this._btnWrapList.push(new burn.tools.UIWrap(this.buy));
        let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
		let itemObj = new game.model.Item(this._itemId, 1, 0);
		if (userModle.isExist(itemObj) && this._type != 3) {
			this.xufeiIcon.visible = true;
			this.buyIcon.visible = false;
		} else {
			this.xufeiIcon.visible = false;
			this.buyIcon.visible = true;
		}
	}

	private onBuyBtn(e:egret.TouchEvent):void {
		burn._Notification_.send(NotifyEnum.SHOP_BUY_ITEM, {itemId:this._id});
	}
}