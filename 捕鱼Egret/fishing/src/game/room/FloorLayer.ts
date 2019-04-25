/**
 * 背景层的上一层，鱼的下一层，用于播放特效
 * @author ituuz
 */
class FloorLayer extends egret.DisplayObjectContainer {
	//循环Timer
    private _timer:egret.Timer;
	//气泡动画缓存
	private _mcFactory:egret.MovieClipDataFactory;
	public constructor() {
		super();
		this.addBubble();		
	}

	public addBubble():void {
		if (game.util.GorgeousManager.getState()) {
			RES.getResAsync("stage_bubble_png", (vet, key)=>{
				RES.getResAsync("stage_bubble_json", (json, key)=>{
					this._mcFactory = new egret.MovieClipDataFactory(json, vet);
					//定义Timer
					this._timer = new egret.Timer(3000, 0);
					//注册事件侦听器
					this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
					//开始计时
					this._timer.start();
				}, this);
			}, this);
		} else {
			this._timer && this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
		}
	}

	private timerFunc():void {
		let bx = (CONFIG.contentWidth - 400) * Math.random() + 200;
		let by = (CONFIG.contentHeight - 400) * Math.random() + 200;
		let bubble = new MovieFish(this._mcFactory.generateMovieClipData("stageBubble"), egret.Event.COMPLETE);	
		bubble.initEvent();
		bubble.gotoAndPlay("play", 1);
		bubble.frameRate = 8;
		bubble.scaleX = bubble.scaleY = 2;
		bubble.x = bx;
		bubble.y = by;
		this.addChild(bubble);
	}

	public destory():void {
		this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
	}
}