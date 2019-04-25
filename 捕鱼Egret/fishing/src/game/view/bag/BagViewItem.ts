class BagViewItem extends eui.Component{
	/** 道具id */
	private _itemId:number;
	/** 道具数量 */
	private _count:number;
	/** 是否选中 */
	private _selected:boolean;
	/** 是否选中 */
	public selectedBg:eui.Image;
	/** 图标背景 */
	public itemBg:eui.Group;
	/** 道具数量文本框 */
	public countTxt:eui.Label;
	/** 道具数量背景图 */
	public numBg:eui.Image;
	public root:eui.Group;
	public equipState:eui.Image;
	public constructor(itemId:number, count:number, select:boolean = false) {
		super();
		this._itemId = itemId;
		this._count = count;
		this._selected = select;
	}

	public init():void {
		let self = this;
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/BagItem.exml", ()=>{
			self.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/BagItem.exml";
			game.util.IconUtil.getIconByIdAsync(IconType.PROP, self._itemId, function(icon:egret.Bitmap):void {
				if (!icon) {
					return;
				}
				icon.width = 100;
				icon.height = 100;
				icon.anchorOffsetX = icon.width/2;
				icon.anchorOffsetY = icon.height/2;
				icon.x = self.itemBg.width/2;
				icon.y = self.itemBg.height/2;
				self.itemBg.addChild(icon);
				if (self._itemId == PropEnum.FISH_TICKIT) {
					self.countTxt.text = self._count/10 + "元";
				} else {
					//道具数量
					self.countTxt.text = "x" + self._count;
				}
			});
			let userModel:UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
			let vo = game.table.T_Item_Table.getVoByKey(self._itemId);
			if (self._itemId == userModel.getCurGunBgId()
			||self._itemId == userModel.getCurSkinId()) {
				self.equipState.visible = true;
				self.numBg.visible = true;
			}else{
				if (vo.type == BagItemType.BATTERY
					||vo.type == BagItemType.BARBETTE) {
						self.numBg.visible = false;
				}
			}
			
			if (vo.type == BagItemType.BATTERY
				||vo.type == BagItemType.BARBETTE) {
					self.countTxt.visible = false;
			}
			self.selected(self._selected);
		}, this);
	}
	public initAutoGun():void
	{
		let self = this;
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/BagItem.exml", ()=>{
			self.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/BagItem.exml";
			let txtr = "ZiDong_png";
			RES.getResAsync(txtr, function():void {
				let txture:egret.Texture = RES.getRes(txtr);
				let icon:egret.Bitmap = new egret.Bitmap(txture);
				if (!icon) {
					return;
				}
				icon.anchorOffsetX = icon.width/2;
				icon.anchorOffsetY = icon.height/2;
				icon.x = self.itemBg.width/2;
				icon.y = self.itemBg.height/2;
				self.itemBg.addChild(icon);
				self.countTxt.text = "自动开炮";
			}, this);
		}, this);
	}
	
	public selected(flag:boolean):void {
		if (flag) {
			this.selectedBg.visible = true;
		} else {
			this.selectedBg.visible = false;
		}
	}

	public setNull():void {
		this.itemBg.visible = false;
		this.numBg.visible = false;
		this.countTxt.visible = false;
	}
	public getItemId():number {
		return this._itemId;
	}
}