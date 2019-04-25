//破产UI
class BankruptView extends eui.Component {
	public timeTxt:eui.Label;

	public getBtn:eui.Group;

	private _timer:egret.Timer;
	private _parent:eui.Group;
	private bg:eui.Image;
	public constructor() {
		super();
		this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BankruptUI.exml";
		// this.timeTxt.textFlow
		this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getCoinsBtn, this);
        //定义Timer
        this._timer = new egret.Timer(1000, 0);
        //注册事件侦听器
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
		this._parent = null;
	}

	/**
	 * 设置文本内容
	 */
	public setText(content:string):void {
		this.timeTxt.text = content;
	}
	public setParent(display:eui.Group):void {
		this.getBtn.visible = false;
		this.bg.visible = false;
		this._parent = display;
	}
	public startTick():void {
        //开始计时
        this._timer.start();
	}
	private timerFunc():void {
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		let time = userModel.getBankruptTime();
		let residueTime = time - game.util.TimeUtil.getCurrTime();
		let timeStr = game.util.TimeUtil.sceonds2MinStr(residueTime);
		let content = game.util.Language.getDynamicText(36, [timeStr]);
		if (this._parent) {
			content = timeStr;
		}
		this.timeTxt.text = content;
		if (residueTime <= 0) {
			this._timer.stop();
			//burn.tools.TweenTools.hop(this.getBtn,4000);
			this.timeTxt.text = "可以领取救济金";
			return;
		}
	}
	/**
	 * 获取救济金
	 */
	private getCoinsBtn(evt:egret.TouchEvent):void {
		let req:BankruptMessage = new BankruptMessage();
		req.initData();
		req.setState(7);
		NetManager.send(req);
	}

	/** 销毁函数 */
	public destroy():void {
		this._timer.stop();
        //注册事件侦听器
        this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
		this.getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getCoinsBtn, this);
	}
}