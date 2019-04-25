module room {
	/**
	 * 抽奖item
	 */
	export class LotteryItemUI extends eui.Component {
		
		public name_txt:eui.Label;
		public count_txt:eui.Label;
		public constructor(itemId:number, count:number) {
			super();
			this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/LotteryItem.exml";
			this.setData(itemId, count);
			this.anchorOffsetX = this.width/2;
			this.anchorOffsetY = this.height/2;
		}

		public setData(itemId:number, count:number):void {
			let itemVo = game.table.T_Item_Table.getVoByKey(itemId);
			this.name_txt.text = game.util.Language.getText(itemVo.name);
			if (itemVo.id == PropEnum.FISH_TICKIT) {
				this.count_txt.text = count/10 + "元";
			} else {
				this.count_txt.text = String(count);
			}
			let self = this;
			game.util.IconUtil.getIconByIdAsync(IconType.PROP, itemVo.id, function(icon:egret.Bitmap):void {
				if (!icon) {
					return;
				}
				let child = self.getChildByName("icon_lottery");
				child && self.removeChild(child);
				icon.width = 90;
				icon.height = 90;
				icon.anchorOffsetX = icon.width/2;
				icon.anchorOffsetY = icon.height/2;
				icon.x = icon.width/2 + 35;
				icon.y = icon.height/2 + 54;
				icon.name = "icon_lottery";
				self.addChildAt(icon, 2);
			});
		}
	}
}