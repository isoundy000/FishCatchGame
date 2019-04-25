class VipItemUI extends eui.Component{
	public root:eui.Group;
	public vipLvGroup:eui.Group;
	public iconGroup:eui.Group;
	public desc:eui.Label;
	public desc0:eui.Label;
	public nameLab:eui.Label;
	public lock:eui.Image;
	private strVipDescID:number;
	public constructor(vo:game.table.T_VipLevel,Lv:number) 
	{
		super();
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/vip/VipItem.exml";
		let lvlUpExpVo = game.table.T_VipLevel_Table.getVoByKey(vo.vipLevel - 1);
		let curLv = new egret.BitmapText();
		curLv.font = RES.getRes("vipShow_fnt");
		curLv.text = String(vo.vipLevel);
		this.vipLvGroup.addChild(curLv);
		curLv.textAlign = egret.HorizontalAlign.CENTER;
		curLv.anchorOffsetX = curLv.width/2;
		curLv.anchorOffsetY = curLv.height/2;

		if(Lv >= vo.vipLevel)
		{
			this.lock.visible = false;
		}

		this.desc0.text = vo.desc;
		this.nameLab.text = vo.name;
		let arrName = new Array<string>();
		arrName.push(lvlUpExpVo.levelUpExp/100 + "");
		this.desc.text = game.util.Language.getDynamicText(94,arrName);

		let self = this;
		game.util.IconUtil.getIconByIdAsync(IconType.VIP_SHOW, vo.vipLevel, function(icon:egret.Bitmap):void {
			if(!icon)
			{ 
				return; 
			}
			icon.anchorOffsetX = icon.width/2;
			icon.anchorOffsetY = icon.height/2;
			self.iconGroup.addChild(icon);
		});
		this.strVipDescID = Number(vo.descVip);
		this.root.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
	}
	private onTap(e:egret.TouchEvent) 
	{
		game.util.GameUtil.openCommonHelp(null,this.strVipDescID);
	}
}