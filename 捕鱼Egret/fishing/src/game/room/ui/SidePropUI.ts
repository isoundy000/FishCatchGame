/**
 * 侧边栏道具
 * 葫芦-分身-狂暴
 */
class SidePropUI extends eui.Component {
	public buttonCalabashNN:NewProgresButton;
	public buttonRageNN:NewProgresButton;
	public buttonCloneNN:NewProgresButton;

	//rageGroup  rageBtn_png
	//calabashGroup calabashBtn_png
	//cloneGroup cloneBtn_png
	public calabashGroup:eui.Group;
	public rageGroup:eui.Group;
	public cloneGroup:eui.Group;

	public constructor(clazz:any) {
		super();
		this.skinName = clazz;

		//葫芦
		//this.calabashBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.calabash, this);
		//狂暴
		//this.buttonRage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rageBtn, this);
		//分身
		//this.buttonClone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cloneBtn, this);
		//加载解锁炮倍UI
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/newProgressButton.exml", this.loaded, this);
	}

	public loaded(clazz:any, url:string):void {
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		this.buttonCalabashNN = new NewProgresButton(clazz, "calabashBtn");
		this.buttonCalabashNN.setButtonClickFun(function() {
			burn._Notification_.send(NotifyEnum.USE_PROP_ITEM, PropEnum.CALABASH);
		});
		this.buttonCalabashNN.setIcon("calabashBtn_png");
		let CalabashVo = game.table.T_Item_Table.getVoByKey(PropEnum.CALABASH);
		let Calabashstr = CalabashVo.worth.split('_')[2];
		this.buttonCalabashNN.setGemCost(Calabashstr);

		let c_vo = game.table.T_Config_Table.getVoByKey(89);
		let c_time = 2;
		if (c_vo) {
			c_time = Number(c_vo.value);
		}
		this.buttonCalabashNN.setTimeTotal(c_time);
		this.buttonCalabashNN.anchorOffsetX = this.buttonCalabashNN.width/2;
		this.buttonCalabashNN.anchorOffsetY = this.buttonCalabashNN.height/2;
		this.calabashGroup.addChild(this.buttonCalabashNN);

		this.buttonRageNN = new NewProgresButton(clazz, "rageBtn");
		this.buttonRageNN.setButtonClickFun(function() {
			burn._Notification_.send(NotifyEnum.USE_PROP_ITEM, PropEnum.RAGE);
		});
		this.buttonRageNN.setIcon("rageBtn_png");
		let RageVo = game.table.T_Item_Table.getVoByKey(PropEnum.RAGE);
		let Ragestr = RageVo.worth.split('_')[2];
		if (userModel.getMatchRoomLevel() == RequesetRoomState.QmsRoom) {
			this.buttonRageNN.setGemCost(undefined);
		} else {
			this.buttonRageNN.setGemCost(Ragestr);
		}
		let r_vo = game.table.T_Config_Table.getVoByKey(90);
		let r_time = 30;
		if (r_vo) {
			r_time = Number(r_vo.value);
		}
		this.buttonRageNN.setTimeTotal(r_time);
		this.buttonRageNN.anchorOffsetX = this.buttonRageNN.width/2;
		this.buttonRageNN.anchorOffsetY = this.buttonRageNN.height/2;
		this.rageGroup.addChild(this.buttonRageNN);
		if (userModel.getMatchRoomLevel() == RequesetRoomState.QmsRoom) {
			this.buttonRageNN.freeImg.visible = true;
		} else {
			let lockedRageLv = game.table.T_Config_Table.getVoByKey(34).value.split("_")[0];
			if (userModel.getVipLevel() < Number(lockedRageLv)) {
				this.buttonRageNN.lockedImg.visible = true;
			}
		}

		this.buttonCloneNN = new NewProgresButton(clazz, "cloneBtn");
		this.buttonCloneNN.setButtonClickFun(function() {
			burn._Notification_.send(NotifyEnum.USE_PROP_ITEM, PropEnum.CLONE);
		});
		this.buttonCloneNN.setIcon("cloneBtn_png");
		let CloneVo = game.table.T_Item_Table.getVoByKey(PropEnum.CLONE);
		let Clonestr = CloneVo.worth.split('_')[2];
		if (userModel.getMatchRoomLevel() == RequesetRoomState.QmsRoom) {
			this.buttonCloneNN.setGemCost(undefined);
		} else {
			this.buttonCloneNN.setGemCost(Clonestr);
		}
		let cl_vo = game.table.T_Config_Table.getVoByKey(90);
		let cl_time = 30;
		if (cl_vo) {
			cl_time = Number(cl_vo.value);
		}
		this.buttonCloneNN.setTimeTotal(cl_time);
		this.buttonCloneNN.anchorOffsetX = this.buttonCloneNN.width/2;
		this.buttonCloneNN.anchorOffsetY = this.buttonCloneNN.height/2;
		this.cloneGroup.addChild(this.buttonCloneNN);
		if (userModel.getMatchRoomLevel() == RequesetRoomState.QmsRoom) {
			this.buttonCloneNN.freeImg.visible = true;
		} else {
			let lockedCloneLv = game.table.T_Config_Table.getVoByKey(35).value.split("_")[0];
			if (userModel.getVipLevel() < Number(lockedCloneLv)) {
				this.buttonCloneNN.lockedImg.visible = true;
			}
		}

		this.buttonCalabashNN.setTypeSide();
		this.buttonRageNN.setTypeSide();
		this.buttonCloneNN.setTypeSide();

        let cloneItem:game.model.Item = userModel.getItemById(PropEnum.CLONE);
        let rageItem:game.model.Item = userModel.getItemById(PropEnum.RAGE);
        let calabashItem:game.model.Item = userModel.getItemById(PropEnum.CALABASH);
		
		if (userModel.getMatchRoomLevel() == RequesetRoomState.QmsRoom) {
			rageItem = userModel.getItemById(PropEnum.FREE_RAGE);
        	cloneItem = userModel.getItemById(PropEnum.FREE_CLONE);
		}

        let cloneNum = 0;
        let rageNum = 0;
        let calabashNum = 0;
        if (cloneItem) {
            cloneNum = cloneItem.getCount();
        }
		this.setCloneTxt("" + cloneNum);
        if (rageItem) {
            rageNum = rageItem.getCount();
        }
		this.setRageTxt("" + rageNum);
        if (calabashItem) {
            calabashNum = calabashItem.getCount();
        }
		this.setCalabashTxt("" + calabashNum);

	}
	/** 使用葫芦道具 */
	public calabash(evt:egret.TouchEvent):void {
		burn._Notification_.send(NotifyEnum.USE_PROP_ITEM, PropEnum.CALABASH);
	}

	/** 点击狂暴道具 */
	private rageBtn(evt:egret.TouchEvent):void {
		burn._Notification_.send(NotifyEnum.USE_PROP_ITEM, PropEnum.RAGE);
	}

	/** 点击分身道具 */
	private cloneBtn(evt:egret.TouchEvent):void {
		burn._Notification_.send(NotifyEnum.USE_PROP_ITEM, PropEnum.CLONE);
	}

	public setCalabashTxt(txt:string):void {
		//this.calabashTxt.text = txt;
		if (this.buttonCalabashNN) {
			this.buttonCalabashNN.setNum(txt);
		}
	}
	
	public setRageTxt(txt:string):void {
		//this.rageTxt.text = txt;
		if (this.buttonRageNN) {
			this.buttonRageNN.setNum(txt);
		}
	}

	public setCloneTxt(txt:string):void {
		//this.cloneTxt.text = txt;
		if (this.buttonCloneNN) {
			this.buttonCloneNN.setNum(txt);
		}
	}

}