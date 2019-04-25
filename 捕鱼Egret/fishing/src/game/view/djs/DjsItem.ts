class DjsUIItem extends eui.Component{
	//第几名
	public rankLab:eui.Label;
	public ava_1:eui.Image;
	public ava_2:eui.Image;
	public ava_3:eui.Image;
	//积分
	public scoreLab:eui.Label;
	//名称
	public namelab:eui.Label;
	//提示
	public infoTip:eui.Label;
	//奖励数量
	public gainNumLab:eui.Label;
	//奖励组
	public iconGroup:eui.Group;
	public img_1:eui.Image;
	public img_2:eui.Image;
	public img_3:eui.Image;
	public img_4:eui.Image;
	public constructor() {
		super();
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Djs/DjsItem.exml";
	}
	public setData(msg:any,strRank:string,data:game.table.T_GrandPrixRankRange,i:number):void {
		
		let score = null;
		let name = null;
		if (msg == null) {
			score = "未上榜";
			this.rankLab.text = strRank;
			let nameStr = strRank.split("-");
			name = "第" + data.rangeMax +　"名";
			this.namelab.visible = false;
			this.scoreLab.visible = false;
			this.infoTip.text = game.util.Language.getText(2424);
			this.infoTip.visible = true;
		} else {
			this.namelab.visible = true;
			this.scoreLab.visible = true;
			this.infoTip.text = game.util.Language.getText(2424);
			this.infoTip.visible = false;
			score = msg.rankValue;
			name = msg.name;
		}
		if (strRank == "1") {
			this.rankLab.visible = false;
			this.ava_1.visible = true;
			this.ava_2.visible = false;
			this.ava_3.visible = false;
			this.namelab.text = name;
			this.img_2.visible = false;
			this.img_3.visible = false;
			this.img_4.visible = false;
		} else if (strRank == "2") {
			this.rankLab.visible = false;
			this.ava_1.visible = false;
			this.ava_2.visible = true;
			this.ava_3.visible = false;
			this.namelab.text = name;
			this.img_3.visible = false;
			this.img_4.visible = false;
		} else if(strRank == "3") {
			this.rankLab.visible = false;
			this.ava_1.visible = false;
			this.ava_2.visible = false;
			this.ava_3.visible = true;
			this.namelab.text = name;
			this.img_4.visible = false;
		} else {
			this.ava_1.visible = false;
			this.ava_2.visible = false;
			this.ava_3.visible = false;
			this.rankLab.text = strRank;
			let nameStr = strRank.split("-");
			this.namelab.text = "第" + data.rangeMax +　"名";
		}

		this.scoreLab.text = "积分:" + score;

		//奖励
		let award = data.award;
		let awardData = award.split("_");
		this.gainNumLab.text = "x" + awardData[1];
		let itemId = Number(awardData[0]);
		let self = this;
		game.util.IconUtil.getIconByIdAsync(IconType.PROP,itemId, function(icon:egret.Bitmap):void {
			if (!icon) {
				return;
			}
			icon.anchorOffsetX = icon.width/2;
			icon.anchorOffsetY = icon.height/2;
			self.iconGroup.addChild(icon);
		});
	}
}