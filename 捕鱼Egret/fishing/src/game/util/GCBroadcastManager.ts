module game.util {
	export class BroadcastObj {
		public type:number;
		public msg:string;
		public priority:number;
	}
	/**
	 * 服务器广播通知
	 */
	export class GCBroadcastManager {
		//大厅消息广播列表
		private static _hallBroadcastList:Array<string>;
		//房间消息广播列表
		private static _roomBroadcastList:Array<BroadcastObj>;
		//房间内消息队列是否还在播放中
		private static _roomMsgIsInPlay:boolean;
		//大厅广播消息间隔
		private static _playInterval:number;
		//timer
		private static _timer:egret.Timer;

		public static init() {
			GCBroadcastManager._hallBroadcastList = new Array<string>();
			GCBroadcastManager._roomBroadcastList = new Array<BroadcastObj>();
			GCBroadcastManager.initStatic();
			//初始化播放相关参数
			let configVO = game.table.T_Config_Table.getVoByKey(42);
			GCBroadcastManager._playInterval = Number(configVO.value) * 1000;
		}
		public static initStatic():void
		{
			GCBroadcastManager._roomMsgIsInPlay = false;
		}

		//添加大厅广播消息
		public static addHallBroadcast(msg:Array<string>) {
			GCBroadcastManager._hallBroadcastList = msg;
			GCBroadcastManager.playHallBroadcast();
		}

		//添加房间消息
		public static addRoomBroadcast(msg:string, type:number, priority:number = 0) {
			let obj = new BroadcastObj();
			obj.type = type;
			obj.msg = msg;
			if(priority){
				obj.priority = priority;
			}
			GCBroadcastManager._roomBroadcastList.push(obj);
			if(priority){
				this.sortMsgByPriority(GCBroadcastManager._roomBroadcastList);
			}
			if(GCBroadcastManager._roomBroadcastList.length > 20){
				GCBroadcastManager._roomBroadcastList.length = 20;
			}
			GCBroadcastManager.playRoomBroadcast();
		}

		//根据priority排序 较小的排在前面
		private static sortMsgByPriority(arr:Array<any>){
			arr.sort(function( a, b) {
				return a.priority - b.priority;
			});
		}

		//大厅播放跑马灯
		private static playHallBroadcast() {
			let stage = burn.Director.getStage();
			GCBroadcastManager.clearHallBroadcast();
			let boardUI = new game.util.GCBroadcastView(1);
			boardUI.setHallData(GCBroadcastManager._hallBroadcastList);
			
			boardUI.x = 640 + CONFIG.adaptX;
			boardUI.y = 130 + CONFIG.adaptY;
			boardUI.name = "boardUI";
			stage.addChild(boardUI);

			let tw = egret.Tween.get(boardUI, {loop:false});
			boardUI.alpha = 0;
			tw.to({alpha: 1}, 500).call(() => {
				egret.Tween.removeTweens(boardUI);
			});
			boardUI.startHallMsg(() => {
				GCBroadcastManager._timer = new egret.Timer(GCBroadcastManager._playInterval, 1);
				GCBroadcastManager._timer.addEventListener(egret.TimerEvent.TIMER, GCBroadcastManager.playHallBroadcast, this);
				GCBroadcastManager._timer.start();
			});
		}

		//房间内播放通知
		public static playRoomBroadcast() {
			if (GCBroadcastManager._roomMsgIsInPlay) {
				return;
			}
			GCBroadcastManager._roomMsgIsInPlay = true;
			GCBroadcastManager._timer = new egret.Timer(2500, 1);
			GCBroadcastManager._timer.addEventListener(egret.TimerEvent.TIMER, GCBroadcastManager.playRoomBroardcastItem, this);
			GCBroadcastManager._timer.start();
		}

		//播放房间内的单条数据
		private static playRoomBroardcastItem():void {
			if (GCBroadcastManager._roomBroadcastList.length > 0) {
				let stage = burn.Director.getStage();
				let obj = GCBroadcastManager._roomBroadcastList.shift();
				let boardUI = new game.util.GCBroadcastView(obj.type);
				boardUI.setRoomData(obj.msg);
				boardUI.x = 640 + CONFIG.adaptX;
				boardUI.y = 155 + CONFIG.adaptY;
				boardUI.name = "boardUI";
				stage.addChild(boardUI);

				let tw = egret.Tween.get(boardUI, {loop:false});
				boardUI.alpha = 0;
				boardUI.cacheAsBitmap = true;
				tw.to({alpha: 1}, 500).call(() => {
					egret.Tween.removeTweens(boardUI);
				});
				boardUI.startRoomMsg(()=>{
					GCBroadcastManager.playRoomBroardcastItem();
				});
			} else {
				GCBroadcastManager._roomMsgIsInPlay = false;
				if(GCBroadcastManager._timer)
				{
					GCBroadcastManager._timer.removeEventListener(egret.TimerEvent.TIMER, GCBroadcastManager.playRoomBroardcastItem, this);
				}
			}
		}

		//清除大厅内的滚动公告
		public static clearHallBroadcast():void {
			let stage = burn.Director.getStage();
			let currBoardUI:GCBroadcastView = stage.getChildByName("boardUI") as GCBroadcastView;
			if (currBoardUI) {
				currBoardUI.destroy();
				currBoardUI.parent && currBoardUI.parent.removeChild(currBoardUI);
			}
			if (GCBroadcastManager._timer) {
				GCBroadcastManager._timer.removeEventListener(egret.TimerEvent.TIMER, GCBroadcastManager.playHallBroadcast, this);
				GCBroadcastManager._timer = null;
			}
		}

		//清除房间内的滚动公告
		public static clearRoomBroadcast():void {
			let stage = burn.Director.getStage();
			let currBoardUI:GCBroadcastView = stage.getChildByName("boardUI") as GCBroadcastView;
			if (currBoardUI) {
				currBoardUI.destroy();
				currBoardUI.parent && currBoardUI.parent.removeChild(currBoardUI);
			}
			if (GCBroadcastManager._timer) {
				GCBroadcastManager._timer.removeEventListener(egret.TimerEvent.TIMER, GCBroadcastManager.playRoomBroardcastItem, this);
			}
		}
	}
}

module game.util {
	//跑马灯UI
	export class GCBroadcastView extends egret.DisplayObjectContainer {

		private _tx:egret.TextField;
		private _type:number;
		
		public constructor(type:number) {
			super();
			this._type = type;
		}

		public setHallData(msg:Array<string>):void {
			this.createHallUI(msg);
		}

		public setRoomData(msg:string):void {
			this.createRoomUI(msg);
		}

		public createHallUI(msg:Array<string>):void {
			let disp = new egret.DisplayObjectContainer();
			let bg:egret.Bitmap = new egret.Bitmap(RES.getRes("common_laba_bg_png"));
			let rect:egret.Rectangle = new egret.Rectangle(13, 13, 31, 18);
        	bg.scale9Grid = rect;
			bg.width = 650;
			bg.height = 38;
			bg.anchorOffsetX = bg.width >> 1;
			bg.anchorOffsetY = bg.height >> 1;
			this.addChild(bg);

			this._tx = new egret.TextField();
			this._tx.height = bg.height - 5;
			this._tx.textAlign = egret.HorizontalAlign.LEFT;
			this._tx.y -= (bg.height >> 1) - 8;
			this._tx.x = (CONFIG.contentWidth + CONFIG.adaptX) >> 1;
			this._tx.size = 23;

			let str = "";
			for (let i = 0; i < msg.length; i++) {
				str += msg[i];
				if (i != (msg.length - 1)) {
					str += "                      ";
				}
			}
			this._tx.textFlow = (new egret.HtmlTextParser).parser(str);
			disp.addChild(this._tx);

			let laba:egret.Bitmap = new egret.Bitmap(RES.getRes("common_laba_png"));
			this.addChild(laba);
			laba.x = - 315;
			laba.y = -16;;

			let shp:egret.Shape = new egret.Shape();
			shp.graphics.beginFill(0xff0000, 1);
			shp.graphics.drawRect(0, 0, 580, 40);
			shp.graphics.endFill();
			disp.addChild(shp);
			shp.anchorOffsetX = bg.width / 2 + 60;
			shp.anchorOffsetY = bg.height >> 1;
			shp.x = bg.x + 115;
			shp.y = bg.y;

			disp.mask = shp;
			this.addChild(disp);
		}

		public createRoomUI(msg:string):void {
			let bg:egret.Bitmap = new egret.Bitmap(RES.getRes("common_laba_bg_png"));
			let rect:egret.Rectangle = new egret.Rectangle(13, 13, 31, 18);
        	bg.scale9Grid = rect;
			bg.height = 40;

			this._tx = new egret.TextField();
			this._tx.height = bg.height - 5;
			if (this._type == 3) {
				this._tx.textFlow = (new egret.HtmlTextParser).parser(
					"<font color='#2ca3fe' size='24'><b>" + game.util.Language.getText(221) 
					+ "</b></font><font color='#ff60cb' size='24'><b>" + msg + "</b></font>");
			} else {
				this._tx.textFlow = (new egret.HtmlTextParser).parser(msg);
			}
			this._tx.anchorOffsetX = this._tx.width >> 1;
			this._tx.anchorOffsetY = (this._tx.height >> 1) - 5;

			bg.width = this._tx.width + 100;
			bg.anchorOffsetX = bg.width >> 1;
			bg.anchorOffsetY = bg.height >> 1;
			this.addChild(bg);
			this.addChild(this._tx);
		}

		public startHallMsg(fun:Function):void {
			let self = this;
			let tw = egret.Tween.get(this._tx, {loop:false});
			let t = (this._tx.width + (CONFIG.contentWidth >> 1)) / 100 * 1000;
			tw.to({x:-(this._tx.width + (CONFIG.contentWidth >> 1))}, t).call(() => {
				egret.Tween.removeTweens(self._tx);
				self.parent && self.parent.removeChild(self);
				fun();
			});
		}

		public startRoomMsg(fun:Function):void {
			//普通通知3.5秒，小喇叭喊话10秒
			let time = 3500;
			if (this._type == 3) {
				time = 1000 * 10;
			}
			egret.setTimeout(()=>{
				let tw = egret.Tween.get(this);
				tw.to({alpha:0}, 500).call(()=>{
					this.parent && this.parent.removeChild(this);
					fun();
				});
			}, this, time);
		}

		public destroy():void {
			egret.Tween.removeTweens(this._tx);
			egret.Tween.removeTweens(this);
		}
	}
}