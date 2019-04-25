class MonthCardRewardItem extends eui.Component {

	public root:eui.Group;
	/** 图标背景 */
	public itemBg:eui.Group;
	/** 道具数量文本框 */
	public countTxt:eui.Label;
	/** 道具数量背景图 */
	public numBg:eui.Image;
	/** 道具id */
	private _itemId:number;
	/** 道具数量 */
	private _count:number;

	public constructor(itemId:number, count:number) {
		super();
		this._itemId = itemId;
		this._count = count;
	}

	public init(){
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
		}, this);
	}

	public getItemId():number{
		return this._itemId;
	}

	public destroy(){
		RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/BagItem.exml");
	}

}