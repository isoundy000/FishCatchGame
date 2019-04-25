//凤凰护盾I
class PhoenixShield extends eui.Component {
	public shieldLab:eui.Label;
	public cur_362:eui.Image;
	public constructor() {
		super();
		this.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/worldBoss/worldBossShield.exml";
	}
    public setData(cur:number, max:number) {
		this.shieldLab.text = (max - cur) + "/" + max;
		let percentW = (max - cur) * 362.0 / max;
		this.cur_362.width = percentW;
	}

	/** 销毁函数 */
	public destroy():void {
	}
}

//凤凰顶部
class PhoenixTop extends eui.Component {
    public timeLab_0:egret.BitmapText;
	public timeLab_1:egret.BitmapText;
	public _timer:egret.Timer;
	public time:number;
	public constructor() {
		super();
		this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/worldBoss/worldBossTips.exml";
		this.timeLab_0.textAlign = egret.HorizontalAlign.RIGHT;
		this.timeLab_1.textAlign = egret.HorizontalAlign.LEFT;
	}
	//开启定时器刷新自己的时间
    public start():void {
		if (this._timer) {
			this._timer.stop();
        	this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
			this._timer = null;
		}
		//定义Timer
        this._timer = new egret.Timer(1000, 0);
        //注册事件侦听器
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
		this._timer.start();
        let roomerModel = burn.Director.getModelByKey(RoomModel) as RoomModel;
		this.time = roomerModel.getPhoenix().getTime();
	}
	private timerFunc():void {
		let residueTime = this.time - game.util.TimeUtil.getCurrTime();
		if (residueTime <= 0) {
			if (this._timer) {
				this._timer.stop();
				this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
				this._timer = null;
			}
			this.timeLab_0.text = "00";
			this.timeLab_1.text = "00";
			return;
		}
		let timeStr = game.util.TimeUtil.sceonds2MinStr(residueTime);
		let timeArr = timeStr.split(":");
		this.timeLab_0.text = timeArr[0];
		this.timeLab_1.text = timeArr[1];
	}
	/** 销毁函数 */
	public destroy():void {
		this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
	}
}