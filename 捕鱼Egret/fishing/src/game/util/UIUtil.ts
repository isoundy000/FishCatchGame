module game.util {
	export class UIUtil {

		private static _loadingTimer:egret.Timer;

		private static _loadingImg:egret.DisplayObjectContainer;

		private static _isOpenLoading:boolean = false;

		/** 弹出 */
		public static popView(display:egret.DisplayObject, fun:Function = null):void {
			game.util.SoundManager.playUISound("B02");
			display.scaleX = display.scaleY = 1.25;
			let tw = egret.Tween.get(display);
			tw.to({scaleX:0.9, scaleY:0.9}, 200).
				to({scaleX:1, scaleY:1}, 70)
				.call(function():void {
					egret.Tween.removeTweens(display);
					fun && fun();
				});
		}

		/** 关闭 */
		public static closeView(display:egret.DisplayObject, fun:Function):void {
			let tw = egret.Tween.get(display);
			tw.to({scaleX:0, scaleY:0}, 200)
				.call(function():void {
					egret.Tween.removeTweens(display);
					fun && fun();
				});
		}

		/** 掉下来 */
		public static popViewCircle(display:egret.DisplayObject, fun:Function = null):void {
			game.util.SoundManager.playUISound("B02");
			display.y = -720;
			let tw = egret.Tween.get(display);
			tw.to({y:60}, 300, egret.Ease.backOut)
				.call(function():void {
					egret.Tween.removeTweens(display);
					fun && fun();
				});
		}
		/** 变大淡出 */
		public static closeViewCircle(display:egret.DisplayObject, fun:Function = null):void {
			game.util.SoundManager.playUISound("B02");
			let tw = egret.Tween.get(display);
			tw.to({y:-720}, 300)
				.call(function():void {
					egret.Tween.removeTweens(display);
					fun && fun();
				});
		}

		/** 转菊花 */
		public static startLoading():void {
			if (UIUtil._isOpenLoading) {
				return;
			}
			UIUtil._isOpenLoading = true;
			UIUtil._loadingImg = new egret.DisplayObjectContainer();
			UIUtil._loadingImg.touchEnabled = true;
			let shp:egret.Shape = new egret.Shape();
			shp.graphics.beginFill(0x000000, 0);
			shp.graphics.drawRect(0, 0, CONFIG.contentWidth, CONFIG.contentHeight);
			shp.graphics.endFill();

			UIUtil._loadingImg.addChild(shp);

			let loImg = new egret.Bitmap(RES.getRes("common_loading_png"));
			loImg.name = "common_loading_png";
			let stage = burn.Director.getStage();
			UIUtil._loadingImg.addChild(loImg);
			stage.addChildAt(UIUtil._loadingImg, 9999);
			loImg.anchorOffsetX = loImg.width >> 1;
			loImg.anchorOffsetY = loImg.height >> 1;
			loImg.x = CONFIG.contentWidth >> 1;
			loImg.y = CONFIG.contentHeight >> 1;
			burn.tools.TweenTools.rotation(loImg, 1000);
			UIUtil._loadingTimer = new egret.Timer(1000 * 10, 1);

			//注册事件侦听器
			UIUtil._loadingTimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
			//开始计时
			UIUtil._loadingTimer.start();
		}

		/** 关闭菊花 */
		public static closeLoading():void {
			if (UIUtil._isOpenLoading) {
				if (UIUtil._loadingImg) {
					UIUtil._loadingTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
					let loImg = UIUtil._loadingImg.getChildByName("common_loading_png");
					burn.tools.TweenTools.clearTween(loImg);
					UIUtil._loadingImg.parent && UIUtil._loadingImg.parent.removeChild(UIUtil._loadingImg);
				}
				UIUtil._isOpenLoading = false;
			} else {
				UIUtil._isOpenLoading = true;
			}
		}

		private static timerFunc():void {
			UIUtil.closeLoading();	
		}

		/** 屏幕适配者 */
		public static screenAdapter(screen:egret.DisplayObjectContainer, sW:number = 0, sH:number = 0, x:number = 0, y:number = 0):void {
			//UI适配逻辑
			// let standardRatio = CONFIG.contentWidth/CONFIG.contentHeight;
			// let currRatio = 0;
			// if (sW == 0 && sH == 0) {
			// 	currRatio = burn.Director.getStage().stageWidth/burn.Director.getStage().stageHeight;
			// } else {
			// 	currRatio = sW/sH;
			// }
			
			// if (currRatio > standardRatio) {
			// 	let leftSide = new egret.Bitmap(RES.getRes("adapt_side_bg_jpg"));
			// 	screen.addChild(leftSide);
			// 	leftSide.x = -leftSide.width;

			// 	let rightSide = new egret.Bitmap(RES.getRes("adapt_side_bg_jpg"));
			// 	screen.addChild(rightSide);
			// 	rightSide.x = CONFIG.contentWidth;
			// } else if (currRatio < standardRatio) {
			// 	let topSide = new egret.Bitmap(RES.getRes("adapt_bottom_bg_jpg"));
			// 	screen.addChild(topSide);
			// 	topSide.y = -topSide.height;
				
			// 	let downSide = new egret.Bitmap(RES.getRes("adapt_bottom_bg_jpg"));
			// 	screen.addChild(downSide);
			// 	downSide.y = CONFIG.contentHeight;
			// }
		}
		public static listTween(item:egret.DisplayObjectContainer,i:number):void {
			item.visible = false;
			item.scaleX = 1.8;
			item.scaleY = 1.8;
			(function (itemDown, i) {
				egret.Tween.get( itemDown, {loop:false})
					.wait(i * 100)
					.call(function(){
						itemDown.visible = true;
					}).to({scaleX:1, scaleY:1},150)
					.to({scaleX:0.95, scaleY:0.95},100)
					.to({scaleX:1, scaleY:1},100)
					.call(function(){
						egret.Tween.removeTweens(itemDown);
					});
			})(item,i);
		}
		public static listTweenFly(item:egret.DisplayObjectContainer,i:number,col:number):void {
			item.x = -650;
			let charge = 500;
			(function (itemDown, i) {
				let time = 0;
				if (Math.floor(i/col) > 0) {
					time = ((Math.floor(i/col) + 1) * charge);
				} else {
					time = charge;
				}
				egret.Tween.get(itemDown, {loop:false})
					.call(function(){
					}).to({x:20}, time, egret.Ease.backOut)
					.call(function(){
						egret.Tween.removeTweens(itemDown);
					});
			})(item, i);
		}
		public static listTweenFast(item:egret.DisplayObjectContainer,i:number,col:number):void {
			item.visible = false;
			item.scaleX = 1.8;
			item.scaleY = 1.8;
			let charge = 100;
			(function (itemDown, i) {
				let time = 0;
				if (Math.floor(i/col) > 0) {
					time = (Math.floor(i/col) * charge) + (Math.ceil(i%col) * charge);
				} else {
					time = (i * charge);
				}
				egret.Tween.get(itemDown, {loop:false})
					.wait(time)
					.call(function(){
						itemDown.visible = true;
					}).to({scaleX:1, scaleY:1}, 150)
					.to({scaleX:0.95, scaleY:0.95}, 100)
					.to({scaleX:1, scaleY:1}, 100)
					.call(function(){
						egret.Tween.removeTweens(itemDown);
					});
			})(item, i);
		}
	}
}