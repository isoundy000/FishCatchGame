module burn.tools {
	export class TweenTools {
		
		/** 
		 * 循环上下播放动画 
		 * amplitude：振幅
		 * during：单次上下的时间
		 * */
		public static upAndDown(obj:egret.DisplayObject, amplitude:number, during:number):void {
			TweenTools.upOutIn(obj, amplitude, during);
		}

		/** 
		 * 渐隐渐现 
		 * during：单次消失和出现的时间
		 * */
		public static showOutAndIn(obj:egret.DisplayObject, during:number):void {
			TweenTools.outAndIn(obj, during);
		}
		/** 
		 * 渐隐渐现 0.5 - 1
		 * during：单次消失和出现的时间
		 * */
		public static showOutAndInHalf(obj:egret.DisplayObject, during:number):void {
			TweenTools.outAndInHalf(obj, during);
		}
		/** 新手任务渐隐
		 * 
		 */
		public static ShowOutAndInMoreHalf(obj:egret.DisplayObject, during:number):void
		{
			TweenTools.outAndInMoreHalf(obj, during);
		}
		/***
		 * 分身特效
		 */
		public static showOutAndInAndScale(obj:egret.DisplayObject, during:number):void {
			TweenTools.outAndInAndScale(obj, during);
		}
		public static showOuntAndInAndRotation(obj:egret.DisplayObject, during:number):void{
			TweenTools.outAndInAndRotation(obj, during);
		}
		/** 
		 * 旋转动画 
		 * during：单圈旋转的时间
		 * */
		public static rotation(obj:egret.DisplayObject, during:number):void {
			TweenTools._rotate(obj, during);
		}
		public static doop(obj:egret.DisplayObject, during:number):void
		{
			TweenTools._doop(obj, during);
		}

		/** 反着转 */
		public static rotationFan(obj:egret.DisplayObject, during:number):void {
			TweenTools._rotateFan(obj, during);
		}
		/**
		 * 循环收缩
		 * amplitude：振幅
		 * during：单次时间
		 */
		public static shrink(obj:egret.DisplayObject, amplitude:number, during:number):void {
			TweenTools._shrink(obj, amplitude, during);
		}

		public static circle(obj:egret.DisplayObject):void
		{
			TweenTools._circle(obj);
		}
		private static _circle(obj:egret.DisplayObject):void
		{
			obj.scaleX = 0.2;
			obj.scaleY = 0.2;
			obj.alpha = 1;
			let tw = egret.Tween.get(obj, {loop:false});
			tw.to({scaleX:0.7, scaleY:0.7},700)
				.to({scaleX:1.2, scaleY:1.2, alpha:0},300)
				.call(function(){
					egret.Tween.removeTweens(obj);
					TweenTools._circle(obj);
				})
		}
		/** hop循环跳一跳 */
		public static hop(obj:egret.DisplayObject, amplitude:number, during:number):void {
			TweenTools._hop(obj, amplitude, during);
		}

		public static hopOnce(obj:egret.DisplayObject, amplitude:number, during:number):void {
			let tw = egret.Tween.get(obj, {loop:false});
			tw.to({rotation: -4}, 100)
			  .to({rotation: -8}, 30)
			  .to({rotation: 0}, 30)
			  .to({rotation: 8}, 30)
			  .to({rotation: 0}, 30)
			  .to({rotation: -8}, 30)
			  .to({rotation: 0}, 30)
			  .to({rotation: 8}, 30)
			  .to({rotation: 4}, 30)
			  .to({rotation: 0}, 30)
			  .wait(1000)
				.call(function():void {
				egret.Tween.removeTweens(obj);
			});
		}
		
		private static _hop(obj:egret.DisplayObject, amplitude:number, during:number):void {
			let tw = egret.Tween.get(obj, {loop:false});
			tw.to({rotation: -4}, 100)
			  .to({rotation: -8}, 30)
			  .to({rotation: 0}, 30)
			  .to({rotation: 8}, 30)
			  .to({rotation: 0}, 30)
			  .to({rotation: -8}, 30)
			  .to({rotation: 0}, 30)
			  .to({rotation: 8}, 30)
			  .to({rotation: 4}, 30)
			  .to({rotation: 0}, 30)
			  .wait(1000)
				.call(function():void {
				egret.Tween.removeTweens(obj);
				TweenTools._hop(obj, amplitude, during);
			});
		}


		private static _shrink(obj:egret.DisplayObject, amplitude:number, during:number):void {
			let tw = egret.Tween.get(obj, {loop:false});
			tw.to({scaleX:1 - amplitude, scaleY:1 - amplitude}, during/2)
				.to({scaleX:1 + amplitude, scaleY:1 + amplitude}, during/2)
				.call(function():void {
				egret.Tween.removeTweens(obj);
				TweenTools._shrink(obj, amplitude, during);
			});
		}

		private static _rotate(obj:egret.DisplayObject, during:number):void {
			let tw = egret.Tween.get(obj, {loop:false});
			tw.to({rotation:obj.rotation + 360}, during).call(function():void {
				egret.Tween.removeTweens(obj);
				TweenTools._rotate(obj, during);
			});
		}

		private static _doop(obj:egret.DisplayObject, during:number):void {
			let tw = egret.Tween.get(obj, {loop:false});
			tw.to({scaleY:0.8,y:obj.y + 10}, during/4)
			   .to({y:obj.y - 30}, during/2)
			   .to({scaleY:1, y:obj.y}, during/4).call(function():void {
				egret.Tween.removeTweens(obj);
				TweenTools._doop(obj, during);
			});
		}

		private static _rotateFan(obj:egret.DisplayObject, during:number):void {
			let tw = egret.Tween.get(obj, {loop:false});
			tw.to({rotation:obj.rotation - 360}, during).call(function():void {
				egret.Tween.removeTweens(obj);
				TweenTools._rotateFan(obj, during);
			});
		}

		private static outAndIn(obj:egret.DisplayObject, during:number):void {
			let tw = egret.Tween.get(obj, {loop:false});
			tw.to({alpha:0}, during/2).to({alpha:1}, during/2).call(function():void {
				egret.Tween.removeTweens(obj);
				TweenTools.outAndIn(obj, during);
			});
		}
		private static outAndInHalf(obj:egret.DisplayObject, during:number):void {
			let tw = egret.Tween.get(obj, {loop:false});
			tw.to({alpha:0.5}, during/2).to({alpha:1}, during/2).call(function():void {
				egret.Tween.removeTweens(obj);
				TweenTools.outAndInHalf(obj, during);
			});
		}

		private static outAndInMoreHalf(obj:egret.DisplayObject, during:number):void {
			let tw = egret.Tween.get(obj, {loop:false});
			tw.to({alpha:0.5}, during/2).to({alpha:1}, during/2).wait(1000).call(function():void {
				egret.Tween.removeTweens(obj);
				TweenTools.outAndInHalf(obj, during);
			});
		}

		private static outAndInAndScale(obj:egret.DisplayObject, during:number):void {
			let tw = egret.Tween.get(obj, {loop:false});
			tw.to({alpha:0, scaleX: 1.2, scaleY: 1.2}, during).call(function():void {
				obj.alpha = 1;
				obj.scaleX = 1;
				obj.scaleY = 1;
				egret.Tween.removeTweens(obj);
				TweenTools.outAndInAndScale(obj, during);
			});
		}

		private static outAndInAndRotation(obj:egret.DisplayObject, during:number):void {
			let tw = egret.Tween.get(obj, {loop:false});
			tw.to({alpha:0, rotation:obj.rotation + 180}, during/2).to({alpha:1, rotation:obj.rotation + 360}, during/2).call(function():void {
				egret.Tween.removeTweens(obj);
				TweenTools.outAndInAndRotation(obj, during);
			});
		}

		private static downOutIn(obj:egret.DisplayObject, amplitude:number, during:number):void {
			let tw = egret.Tween.get(obj, {loop:false});
			tw.to({y:obj.y + amplitude}, during/2).to({y:obj.y - amplitude}, during/2).call(function():void {
				egret.Tween.removeTweens(obj);
				TweenTools.upOutIn(obj, amplitude, during);
			});
		}

		private static upOutIn(obj:egret.DisplayObject, amplitude:number, during:number):void {
			let tw = egret.Tween.get(obj, {loop:false});
			tw.to({y:obj.y - amplitude}, during/2).to({y:obj.y + amplitude}, during/2).call(function():void {
				egret.Tween.removeTweens(obj);
				TweenTools.downOutIn(obj, amplitude, during);
			});
		}

		public static clearTween(obj:egret.DisplayObject):void {
			egret.Tween.removeTweens(obj);
		}


		public static jump(obj:egret.DisplayObjectContainer):void {
			TweenTools.jumpOnce(obj);
		}
		private static jumpOnce(obj:egret.DisplayObjectContainer):void {
			obj.anchorOffsetY = obj.height - 12.4;
			let x = obj.x;
			let y = obj.y;
			let tw = egret.Tween.get(obj, {loop:false});
			tw.to({x:x,y:y,scaleX:1,scaleY:1},10)
			  .to({x:x,y:y,scaleX:1,scaleY:0.84},30)
			  .to({x:x,y:y - 19,scaleX:1,scaleY:1.12},210)
			  .to({x:x,y:y,scaleX:1,scaleY:0.71},90)
			  .to({x:x,y:y,scaleX:1,scaleY:1.04},90)
			  .to({x:x,y:y,scaleX:1,scaleY:1},60)
				.wait(690).call(function(){
					egret.Tween.removeTweens(obj);
					TweenTools.jump(obj);
				})
		}
	}
}