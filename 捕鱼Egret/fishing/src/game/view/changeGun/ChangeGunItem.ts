class ChangeGunItemItem extends eui.Component{
    public nameLab:eui.Label;
	public lock:eui.Image;
	public bgGroup:eui.Group;
	public iconGroup:eui.Group;
	public starGroup:eui.Group;

	public equipGroup:eui.Group;
	public getGroup:eui.Group;
	public renewGroup:eui.Group;
	public euipedGroup:eui.Group;

	public vip:eui.Group;
	public vipLv:eui.Label;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	private _state:number;
	private _id:number;
	public constructor() {
		super();
		this._btnWrapList = new Array();
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/changeGun/ChangeGunItem.exml";
	}
	public setData(data:game.model.GunItem) {
		let vo = data.getVO();
		let voGun = game.table.T_Gun_skin_Table.getVoByKey(vo.id);
		let state = data.getState();
		this._state = state;
		this._id = vo.id;
		let self = this;
		game.util.IconUtil.getIconByIdAsync(IconType.PAO, vo.id, function(icon:egret.Bitmap):void {
			if (icon) {
				icon.anchorOffsetX = icon.width/2;
				icon.anchorOffsetY = icon.height/2;
				self.iconGroup.addChild(icon);
			}
		});
		this.nameLab.text = game.util.Language.getText(vo.name);
		let star = voGun.star;
		for (let i = 5; i > star; i --) {
			this.starGroup.getChildByName("star_" + i).visible = false;
		}
		switch (state) {
			case GunState.UnGain:
				this.getGroup.visible = true;
				this.getGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchItemEvent, this);
				this._btnWrapList.push(new burn.tools.UIWrap(this.getGroup));
				this.lock.visible = true;
			break;
			case GunState.UnAct:
				this.renewGroup.visible = true;
				this._btnWrapList.push(new burn.tools.UIWrap(this.renewGroup));
				this.renewGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchItemEvent, this);
			break;
			case GunState.Equip:
				this.euipedGroup.visible = true;
				this._btnWrapList.push(new burn.tools.UIWrap(this.euipedGroup));
			break;
			case GunState.Act:
				this.equipGroup.visible = true;
				this._btnWrapList.push(new burn.tools.UIWrap(this.equipGroup));
				this.equipGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchItemEvent, this);
			break;
		}
		if (this.isContainedVip()) {
			this.vip.visible = true;
			this.vipLv.textAlign = egret.HorizontalAlign.CENTER;
			this.vipLv.text = this.getCotainedVipLv() + "";
		} else {
			this.vip.visible = false;
		}
	}
	private touchItemEvent(e:egret.TouchEvent) {
		switch (this._state) {
			case GunState.UnGain:
				burn.Director.popView();
				if (this.isContainedVip()) {
					let view:VipView = new VipView();
					let med:VipMediator = new VipMediator(view);
					burn.Director.pushView(med);
				} else {
					let itemShopView:ItemShopView = new ItemShopView();
					let itemShopMed:ItemShopMediator = new ItemShopMediator(itemShopView);
					burn.Director.pushView(itemShopMed);
				}
			break;
			case GunState.UnAct:
				burn.Director.popView();
				if (this.isContainedVip()) {
					let view:VipView = new VipView();
					let med:VipMediator = new VipMediator(view);
					burn.Director.pushView(med);
				} else {
					let itemShopView:ItemShopView = new ItemShopView();
					let itemShopMed:ItemShopMediator = new ItemShopMediator(itemShopView);
					burn.Director.pushView(itemShopMed);
				}
			break;
			case GunState.Equip:
			break;
			case GunState.Act:
				let send:ChangeGunSendMessage = new ChangeGunSendMessage();
				send.initData();
				send.setType(ChangeGunState.CHANGE_SKIN);
				send.setSkinId(Number(this._id));
				NetManager.send(send);
			break;
		}
	}
	public isContainedVip():boolean {
		let vipVos = game.table.T_VipLevel_Table.getAllVo();
		let len = vipVos.length;
		for (let i = 0; i < len; i++) {
			let voVip = vipVos[i];
			if (voVip.levelUpAward != "0") {
				let datas = voVip.levelUpAward.split("_");
				let gunId = Number(datas[0]);
				if (this._id == gunId) {
					return true;
				}
			}
		}
		return false;
	}

	public getCotainedVipLv():number {
		let vipVos = game.table.T_VipLevel_Table.getAllVo();
		let len = vipVos.length;
		for (let i = 0; i < len; i++) {
			let voVip = vipVos[i];
			if (voVip.levelUpAward != "0") {
				let datas = voVip.levelUpAward.split("_");
				let gunId = Number(datas[0]);
				if (this._id == gunId) {
					return voVip.vipLevel + 1;
				}
			}
		}
		return 0;
	}

	public clearItem():void {
		//移除按钮封装
		while (this._btnWrapList.length > 0) {
			let wrap = this._btnWrapList.pop();
			wrap.destroy();
		}
		this.getGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchItemEvent, this);
		this.renewGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchItemEvent, this);
		this.equipGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchItemEvent, this);
	}
}