/**
 * 冰冻和锁定功能
 */
class FrozenAndLockUI extends eui.Component {
	/** 冰冻卡 */
	public buttonFrozenNN:NewProgresButton;
	/** 锁定卡 */
	public buttonLockNN:NewProgresButton;
	public frozenGroup:eui.Group;
	public lockGroup:eui.Group;
	public constructor(clazz:any) {
		super();
		this.skinName = clazz;
		//冰冻
		//this.buttonFrozenN.addEventListener(egret.TouchEvent.TOUCH_TAP, this.frozenBtn, this);
		//锁定
		//this.buttonLockN.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lockBtn, this);
		//加载解锁炮倍UI
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/newProgressButton.exml", this.loaded, this);
	}
	public loaded(clazz:any, url:string):void {
		this.buttonFrozenNN = new NewProgresButton(clazz,"frozen_skill");
		this.buttonFrozenNN.setButtonClickFun(function(){
			burn._Notification_.send(NotifyEnum.USE_PROP_ITEM, PropEnum.FROZEN);
		});
		this.buttonFrozenNN.setIcon("frozen_skill");
		let frozenVo = game.table.T_Item_Table.getVoByKey(PropEnum.FROZEN);
		let str = frozenVo.worth.split('_')[2];
		this.buttonFrozenNN.setGemCost(str);

		let f_time = 8;
		let c_vo = game.table.T_Config_Table.getVoByKey(88);
		if (c_vo) {
			f_time = Number(c_vo.value);
		}
		this.buttonFrozenNN.setTimeTotal(f_time);
		this.buttonFrozenNN.anchorOffsetX = this.buttonFrozenNN.width >> 1;
		this.buttonFrozenNN.anchorOffsetY = this.buttonFrozenNN.height >> 1;
		this.frozenGroup.addChild(this.buttonFrozenNN);

		this.buttonLockNN = new NewProgresButton(clazz,"lock_skill");
		this.buttonLockNN.setButtonClickFun(function(){
			burn._Notification_.send(NotifyEnum.USE_PROP_ITEM, PropEnum.LOCK);
		});
		this.buttonLockNN.setIcon("lock_skill");
		let LockVo = game.table.T_Item_Table.getVoByKey(PropEnum.LOCK);
		let Lockstr = LockVo.worth.split('_')[2];
		this.buttonLockNN.setGemCost(Lockstr);

		let l_time = 20;
		let l_vo = game.table.T_Config_Table.getVoByKey(87);
		if (l_vo) {
			l_time = Number(l_vo.value);
		}
		this.buttonLockNN.setTimeTotal(l_time);
		this.buttonLockNN.anchorOffsetX = this.buttonLockNN.width >> 1;
		this.buttonLockNN.anchorOffsetY = this.buttonLockNN.height >> 1;
		this.lockGroup.addChild(this.buttonLockNN);

		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
        let frozenItem:game.model.Item = userModel.getItemById(PropEnum.FROZEN);
        let frozenNum = 0;
        if (frozenItem) {
            frozenNum = frozenItem.getCount();
        }
		this.setFrozenTxt("" + frozenNum);
        let lockItem:game.model.Item = userModel.getItemById(PropEnum.LOCK);
        let lockNum = 0;
        if (lockItem) {
            lockNum = lockItem.getCount();
        }
		this.setLockTxt("" + lockNum);
	}
	/** 点击锁定道具 */
	private lockBtn(evt:egret.TouchEvent) {
		burn._Notification_.send(NotifyEnum.USE_PROP_ITEM, PropEnum.LOCK);
	}

	/** 点击使用冰冻道具 */
	private frozenBtn(evt:egret.TouchEvent):void {
		burn._Notification_.send(NotifyEnum.USE_PROP_ITEM, PropEnum.FROZEN);
	}

	/** 设置冰冻道具数量 */
	public setFrozenTxt(txt:string):void {
		if (this.buttonFrozenNN) {
			this.buttonFrozenNN.setNum(txt);
		}
	}

	/** 设置锁定道具数量 */
	public setLockTxt(txt:string):void {
		if (this.buttonLockNN) {
			this.buttonLockNN.setNum(txt);
		}
	}
}