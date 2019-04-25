// TypeScript file
/**
 * 炮倍解锁功能
 */
class UnlockGunUpdateUI extends eui.Component {
	public root:eui.Group;
	//是否开启解锁炮倍面板
	public isOpenGunUpdateGroup:boolean;
	//提示解锁炮倍的tislabel
	public gunUpdateTips:eui.Label;
	//解锁炮倍的数字label
	public updateGunCost:egret.BitmapText;
	public updateGunCostGroup:eui.Group;
    //是否可以发送解锁消息
    public isCanUnlock:boolean;
	public gunUpdateBg:eui.Image;
	public icon:eui.Image;
	//赠送板子
	public send:eui.Group;
	//数字的板子
	public numGroup:eui.Group;
	public goldLab_num_1:egret.BitmapText;
	public constructor(clazz:any) {
		super();
		this.skinName = clazz;
		this.isOpenGunUpdateGroup = false;
        this.isCanUnlock = false;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendMsg, this);

		this.goldLab_num_1 = new egret.BitmapText();
		this.goldLab_num_1.font = RES.getRes("bitmapNum_2_fnt");
		this.goldLab_num_1.text = "1";
		this.goldLab_num_1.scaleX = 0.5;
		this.goldLab_num_1.scaleY = 0.5;
		this.numGroup.addChild(this.goldLab_num_1);
		this.goldLab_num_1.textAlign = egret.HorizontalAlign.CENTER;
		this.goldLab_num_1.anchorOffsetX = this.goldLab_num_1.width/2;
		this.goldLab_num_1.anchorOffsetY = this.goldLab_num_1.height/2;
		this.send.visible = false;


		this.updateGunCost = new egret.BitmapText();
		this.updateGunCost.font = RES.getRes("bitmapNum_4_fnt");
		this.updateGunCost.text = "1";
		this.updateGunCostGroup.addChild(this.updateGunCost);
		this.updateGunCost.textAlign = egret.HorizontalAlign.CENTER;
		this.updateGunCost.anchorOffsetX = this.updateGunCost.width/2;
		this.updateGunCost.anchorOffsetY = this.updateGunCost.height/2;
	}
    private sendMsg(evt:egret.TouchEvent):void {
		if (!this.isCanUnlock) {
			let view1:UnlockGunView = new UnlockGunView();
			let med:UnlockGunMediator = new UnlockGunMediator(view1);
			burn.Director.pushView(med);
			return;
		}
        let req:UpgradeOrForgeSendMessage = new UpgradeOrForgeSendMessage();
        req.initData(); 
		req.setType(GunUpdateType.UNLOCK);
        NetManager.send(req);
		//this.openGunUpdateGroup();
	}
	//设置解锁炮倍需要的
	public setUpdateGunNum(gunId:number, value:number, max:number):void {
		//提示解锁炮倍的tislabel
		let arrName = new Array<string>();
        let curGunRateVo = game.table.T_Gun_Table.getVoByKey(gunId + 1);
		if (!curGunRateVo) {
			return;
		}
		arrName.push(curGunRateVo.bulletNum + "");
		this.gunUpdateTips.text = game.util.Language.getDynamicText(24,arrName);
		//解锁炮倍的数字label
		this.updateGunCost.text = value + "/" + max;
		this.updateGunCost.anchorOffsetX = this.updateGunCost.width/2;
		this.updateGunCost.anchorOffsetY = this.updateGunCost.height/2;
        if (value >= max && max != 0) {
            this.isCanUnlock = true;
			this.send.visible = true;
        	let gunRateVo = game.table.T_Gun_Table.getVoByKey(gunId);
			let str = gunRateVo.upgradeOrForgeAward;
			let data = str.split("_");
			let num = parseInt(data[1]);
			this.goldLab_num_1.text = "" + num;
			this.goldLab_num_1.anchorOffsetX = this.goldLab_num_1.width/2;
			this.goldLab_num_1.anchorOffsetY = this.goldLab_num_1.height/2;

			this.gunUpdateBg.visible = false;
			this.icon.visible = false;
			this.updateGunCost.visible = false;
			this.gunUpdateTips.visible = true;
        } else {
			this.gunUpdateBg.visible = true;
			this.icon.visible = true;
			this.send.visible = false;
			this.updateGunCost.visible = true;
			this.gunUpdateTips.visible = true;
			this.isCanUnlock = false;
		}
	}
	/**打开解锁炮倍界面 */
	public openGunUpdateGroup():void {
		let self = this;
        let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
        let gunRate = userModle.getCurGunID();
        let gunRateVo = game.table.T_Gun_Table.getVoByKey(gunRate);
		let bulletNum  = game.table.T_Config_Table.getVoByKey(52).value;
		//30炮倍
		if (!this.gunUpdateBg.visible && gunRateVo.bulletNum <= Number(bulletNum)) {
			if (self.isOpenGunUpdateGroup) {
				this.checkEnough();
				return;
			}
			egret.Tween.removeTweens(self);
			self.scaleX = 0;
			self.x = 0;
			self.isOpenGunUpdateGroup = true;
			let tw = egret.Tween.get(this, {loop:false});
			tw.to({scaleX:1}, 200).call(function():void{
				egret.Tween.removeTweens(self);
			});
			return;
		}
		egret.Tween.removeTweens(self);
		if (self.isOpenGunUpdateGroup) {
			self.isOpenGunUpdateGroup = false;
			let tw = egret.Tween.get(this, {loop:false});
			tw.to({scaleX:0}, 200).call(function():void{
				egret.Tween.removeTweens(self);
				self.x = -400;
				self.scaleX = 1;
			});
		} else {
			self.scaleX = 0;
			self.x = 0;
			self.isOpenGunUpdateGroup = true;
			let tw = egret.Tween.get(this, {loop:false});
			tw.to({scaleX:1}, 200).call(function():void{
				egret.Tween.removeTweens(self);
			});
		}
		this.checkEnough();
	}
	/** 只能打开炮倍解锁 */
	public openGunUpdateGroupByEnough():void {
		let self = this;
		if (self.isOpenGunUpdateGroup || self.scaleX == 1) {
			this.checkEnough();
			return;
		}
		egret.Tween.removeTweens(self);
		self.scaleX = 0;
		self.x = 0;
		self.isOpenGunUpdateGroup = true;
		let tw = egret.Tween.get(this, {loop:false});
		tw.to({scaleX:1}, 200).call(function():void{
			egret.Tween.removeTweens(self);
		});
		this.checkEnough();
	}
	/** 不能打开炮倍 */
	public openGunUpdateGroupByNoEnough():void {
		let self = this;
		if (!self.isOpenGunUpdateGroup || self.scaleX == 0) {
			this.checkEnough();
			return;
		}
		egret.Tween.removeTweens(self);
		self.isOpenGunUpdateGroup = false;
		let tw = egret.Tween.get(this, {loop:false});
		tw.to({scaleX:0}, 200).call(function():void{
			egret.Tween.removeTweens(self);
			self.scaleX = 1;
			self.x = -400;
		});
		this.checkEnough();
	}
	/** 用引导打开 */
	public openGunUpdateByGuide():void {
		let self = this;
		egret.Tween.removeTweens(self);
		self.scaleX = 0;
		self.x = 0;
		self.isOpenGunUpdateGroup = true;
		let tw = egret.Tween.get(this, {loop:false});
		tw.to({scaleX:1}, 200).call(function():void {
			egret.Tween.removeTweens(self);
		});
		//造假
		let hintChild = this.root.getChildByName("hint_effect");
		if (!hintChild) {
			let hint = new egret.Bitmap(RES.getRes("ef_lottery_hint_png"));
			hint.name = "hint_effect";
			hint.anchorOffsetX = 0;
			hint.anchorOffsetY = hint.height/2;
			hint.width = 272;
			hint.height = 94;
			hint.x = 12;
			hint.y = hint.height/2 - 1;
			hint.blendMode = egret.BlendMode.ADD;
			self.root.addChild(hint);
		}
		this.checkEnough();
	}
	private checkEnough():void {
        let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
        let userId = userModle.getUserId();
        let gunRate = userModle.getCurGunID();
        let gunRateVo = game.table.T_Gun_Table.getVoByKey(gunRate);
		let bEnough = true;
		if (gunRateVo) {
            let arr = gunRateVo.upgradeOrForgeCost;
            let arrData = arr.split(",");
            let nEnoughNum = 0;
            let nCurNum = 0;
            if (arrData.length > 1) {
				bEnough = false;
                return;
            }
            for (let i = 0; i < 1; i++) {
                let item = arrData[i];
                let arrStr = item.split("_");
                let id = parseInt(arrStr[0]);
                let num = parseInt(arrStr[1]);
				let itemObj = new game.model.Item(id, 0);
                nEnoughNum = num;
                nCurNum = userModle.getMoney();
				
                if (nCurNum < num) {
                    bEnough = false;
                    break;
                }
            }
		}
		if (bEnough) {
			let hintChild = this.root.getChildByName("hint_effect");
			if (!hintChild) {
				let hint = new egret.Bitmap(RES.getRes("ef_lottery_hint_png"));
				hint.name = "hint_effect";
				hint.anchorOffsetX = 0;
				hint.anchorOffsetY = hint.height/2;
				hint.width = 272;
				hint.height = 94;
				hint.x = 12;
				hint.y = hint.height/2 - 1;
				hint.blendMode = egret.BlendMode.ADD;
				this.root.addChild(hint);
				burn.tools.TweenTools.showOutAndIn(hint, 1500);
			}
		} else {
			let hintChild = this.root.getChildByName("hint_effect");
			if (hintChild) {
				this.root.removeChild(hintChild);
			}
		}
	}
    public destory():void {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendMsg, this);
    }
}