//ChakanPanelUI
class ChakanPanelUI extends eui.Component 
{
    public root:eui.Group;
    //自己
    public mine:eui.Group;
    public emoji:eui.Button;
    public chat:eui.Button;
    public change:eui.Button;
    public auto:eui.Button;
    //other
    public other:eui.Group;
    public di:eui.Image;
    public kuang:eui.Image;
    public nameLab:eui.Label;
    public gun:eui.Label;
    public lvLab:eui.Label;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	public constructor() {
		super();
		this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/ChakanPanel.exml";
        this.mine.cacheAsBitmap = true;
        this.other.touchEnabled = false;
		this.emoji.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shouTips, this);
		this.chat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shouTips, this);
		this.change.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shouTips, this);
		this.auto.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shouTips, this);
		this._btnWrapList = new Array();
		this._btnWrapList.push(new burn.tools.UIWrap(this.change));
		this._btnWrapList.push(new burn.tools.UIWrap(this.auto));
	}

	private shouTips(evt:egret.TouchEvent):void {

        if (this.auto == evt.target) {  //自动开炮功能
            if(CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
                burn._Notification_.send(NotifyEnum.SHOW_CHAKAN_PANEL);
                burn._Notification_.send(NotifyEnum.AUTO_GUN_FIRE);
                return;
            }
            let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
            let monthCardTime = userModel.getMonthEndTime() - game.util.TimeUtil.getCurrTime();
            //monthCardTime = 1000*60*60*24*7;
            if (userModel.getTatolChargeRMB() <= 0) {
                game.util.GameUtil.popTips(game.util.Language.getText(143));
                //弹出月卡
                let firstChargeView:FirstChargeView = new FirstChargeView();
				let firstChargeMed:FirstChargeMediator = new FirstChargeMediator(firstChargeView);
				burn.Director.pushView(firstChargeMed);
                return;
            }
            burn._Notification_.send(NotifyEnum.SHOW_CHAKAN_PANEL);
            burn._Notification_.send(NotifyEnum.AUTO_GUN_FIRE);
        } else if (this.change == evt.target) {
			let changeGunView:ChangeGunView = new ChangeGunView();
			let changeGunMed:ChangeGunMediator = new ChangeGunMediator(changeGunView);
			burn.Director.pushView(changeGunMed);
        } else {
            game.util.GameUtil.popTips(game.util.Language.getText(47));
        }
	}
    public setMine():void {
        this.mine.visible = true;
        this.other.visible = false;
        // let arr = new Array<eui.Button>();
        // arr.push(this.auto);
        // arr.push(this.change);
        //arr.push(this.chat);
        //arr.push(this.emoji);
        //game.util.GameUtil.playChakanAction(arr);

        let self = this;
        let tw = egret.Tween.get(this.change,{loop:false});
        let oldX = this.change.x;
        this.change.scaleX = 0;
        this.change.scaleY = 0;
        this.change.x = this.width/2;
        tw.to({x:60, y:140, scaleX:1, scaleY:1}, 350, egret.Ease.backOut)
        .call(function(){
            egret.Tween.removeTweens(self.change);
        });

        let tw1 = egret.Tween.get(this.auto,{loop:false});
        let oldX1 = this.auto.x;
        this.auto.scaleX = 0;
        this.auto.scaleY = 0;
        this.auto.x = this.width/2;
        tw1.to({x:240, y: 148, scaleX:1, scaleY:1}, 350, egret.Ease.backOut)
        .call(function(){
            egret.Tween.removeTweens(self.auto);
        });

        burn._Notification_.send(NotifyEnum.AUTO_GUN_FIRE,1);
    }
    public setOther(isFlip:boolean,roomer:game.model.Roomer):void {
        this.mine.visible = false;
        this.other.visible = true;
        if (isFlip) {
            this.di.rotation = 0;
        } else {
            this.di.rotation = 180;
        }
        if (roomer) {
            let name = roomer.getName();
            let lv = roomer.getLv();
            //nameLab
            let str = name ;
            this.nameLab.text = str;

            this.lvLab.text = " Lv." + lv
        }
        let skinId = roomer.getCurSkinId();
        let vo = game.table.T_Item_Table.getVoByKey(skinId);
        this.gun.text = game.util.Language.getText(vo.name);
    }

	/** 销毁函数 */
	public destroy():void {
		this.emoji.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.shouTips, this);
		this.chat.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.shouTips, this);
		this.change.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.shouTips, this);
		this.auto.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.shouTips, this);
	}
}