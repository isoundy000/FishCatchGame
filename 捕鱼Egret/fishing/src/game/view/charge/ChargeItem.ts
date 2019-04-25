class ChargeItemUI extends eui.Component{
	/**iconGroup */
	public iconGroup:eui.Group;
	/**描述 */
	public desc:eui.Label;
	/**点击事件 */
	public sureGroup:eui.Group;
	/** price  */
	public priceGroup:eui.Group;
	public priceTypeGroup:eui.Group;

	/** chargeID */
	private _nChargeID:number;
	private _nType:number;
	public root:eui.Group;

	public _touchObj:burn.tools.UIWrap;
	//首冲标签
	public firstGroup:eui.Group;
	public sendLab:egret.BitmapText;
	public img_10001:eui.Image;
	public img_10002:eui.Image;
	public img_10012:eui.Image;

	public constructor() {
		super();
	}
    public setData(data:game.table.T_Charge):void {
		if (!data) {
			return;
		}
		this._nChargeID = data.id;

		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		this.sendLab.textAlign = egret.HorizontalAlign.CENTER;
		if (userModel.isCharged(this._nChargeID) || data.firstAward == "0") {
			this.firstGroup.visible = false;
		} else {
			this.firstGroup.visible = true;
			let firstAwardList = data.firstAward.split("_");
			let sendId = Number(firstAwardList[0]);
			let sendNum = Number(firstAwardList[1]);
			switch (sendId) {
				case PropEnum.GOLD:
					this.img_10001.visible = true;
					this.img_10002.visible = false;
					this.img_10012.visible = false;
					if (sendNum > 10000) {
						if(CONFIG.LANGUAGE == LanguageType.TW_Chinese){
							this.sendLab.text = (sendNum/10000) + "萬";
						}else{
							this.sendLab.text = (sendNum/10000) + "万";
						}
					} else {
						this.sendLab.text = sendNum + "";
					}
					break;
				case PropEnum.GEM:
					this.img_10001.visible = false;
					this.img_10002.visible = true;
					this.img_10012.visible = false;
					this.sendLab.text = sendNum + "";
					break;
				case PropEnum.TICKET:
					this.img_10001.visible = false;
					this.img_10002.visible = false;
					this.img_10012.visible = true;
					this.sendLab.text = sendNum + "";
					break;
			}
		}
		this._nType = data.type;
		game.util.IconUtil.getIconByIdAsync(IconType.CHARGE, Number(data.res), (icon:egret.Bitmap)=>{
			icon.anchorOffsetX = icon.width/2;
			icon.anchorOffsetY = icon.height/2;
			icon.x = this.iconGroup.width/2 + 5;
			icon.y = this.iconGroup.height/2 + 5;
			this.iconGroup.addChild(icon);
		});

		this.desc.text = game.util.Language.getText(data.desc);
		this.sureGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
		this._touchObj = new burn.tools.UIWrap(this.sureGroup);
		let Font = new egret.BitmapText();
		RES.getResAsync("chargeNum_fnt", (bData, key)=>{
			Font.font = bData;
			if (data.type == 3) {
				RES.getResAsync("R_FuHao_png", ()=>{
					let unit = new egret.Bitmap(RES.getRes("R_FuHao_png"));
					unit.anchorOffsetX = unit.width >> 1;
					unit.anchorOffsetY = unit.height >> 1;
					this.priceTypeGroup.addChild(unit);
				}, this);
				Font.text = Number(data.price)/100 + "";
				Font.textAlign = egret.HorizontalAlign.LEFT;
				Font.anchorOffsetX = Font.width >> 1;
				Font.anchorOffsetY = Font.height >> 1;
				this.priceGroup.addChild(Font);

				let arr = data.price.split("_");
				let type = Number(arr[0]);
				let num = Number(arr[1]);
				if (PropEnum.GOLD == type) {
					let unit = new egret.Bitmap(RES.getRes("common_coins_png"));
					unit.anchorOffsetX = unit.width >> 1;
					unit.anchorOffsetY = unit.height >> 1;
					unit.scaleX = unit.scaleY = 0.4;
					this.priceTypeGroup.addChild(unit);
				} else if (PropEnum.GEM == type) {
					let unit = new egret.Bitmap(RES.getRes("common_diamond_png"));
					unit.anchorOffsetX = unit.width >> 1;
					unit.anchorOffsetY = unit.height >> 1;
					unit.scaleX = unit.scaleY = 0.4;
					this.priceTypeGroup.addChild(unit);
				} else if (PropEnum.TICKET == type) {
					let unit = new egret.Bitmap(RES.getRes("common_point_ticket_png"));
					unit.anchorOffsetX = unit.width >> 1;
					unit.anchorOffsetY = unit.height >> 1;
					unit.scaleX = unit.scaleY = 0.4;
					this.priceTypeGroup.addChild(unit);
				}
			} else {
				let arr = data.price.split("_");
				let type = Number(arr[0]);
				let num = Number(arr[1]);
				if (PropEnum.GOLD == type) {
					let unit = new egret.Bitmap(RES.getRes("common_coins_png"));
					unit.anchorOffsetX = unit.width >> 1;
					unit.anchorOffsetY = unit.height >> 1;
					unit.scaleX = unit.scaleY = 0.4;
					this.priceTypeGroup.addChild(unit);
				} else if (PropEnum.GEM == type) {
					let unit = new egret.Bitmap(RES.getRes("common_diamond_png"));
					unit.anchorOffsetX = unit.width >> 1;
					unit.anchorOffsetY = unit.height >> 1;
					unit.scaleX = unit.scaleY = 0.4;
					this.priceTypeGroup.addChild(unit);
				} else if (PropEnum.TICKET == type) {
					let unit = new egret.Bitmap(RES.getRes("common_point_ticket_png"));
					unit.anchorOffsetX = unit.width >> 1;
					unit.anchorOffsetY = unit.height >> 1;
					unit.scaleX = unit.scaleY = 0.4;
					this.priceTypeGroup.addChild(unit);
				}
				Font.text = num + "";
				Font.textAlign = egret.HorizontalAlign.LEFT;
				Font.anchorOffsetX = Font.width >> 1;
				Font.anchorOffsetY = Font.height >> 1;
				this.priceGroup.addChild(Font);
			}
		}, this);
	}

	private onBuyClick(e:egret.TouchEvent) {
		if (this._nType == 4) {
			burn.Director.popView();
			let view1:MonthCardView = new MonthCardView();
			let med1:MonthCardMediator = new MonthCardMediator(view1);
			burn.Director.pushView(med1);
			return;
		}
		burn._Notification_.send(NotifyEnum.BUY_CHARGE_ITEM, {id:this._nChargeID, type:this._nType});
	}

	public clearItem():void {
		this.sureGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
	}
}