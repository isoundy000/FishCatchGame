module burn.tools {
	export class UIWrap implements burn.base.IDestory{

		private _btn:egret.DisplayObjectContainer;

		public constructor(btn:egret.DisplayObjectContainer) {
			this._btn = btn;
			this._btn.anchorOffsetX = this._btn.width/2;
			this._btn.anchorOffsetY = this._btn.height/2;
			this._btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
			this._btn.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
			this._btn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
		}

		private onTouchBegin(e:egret.TouchEvent):void {
			this._btn.scaleX = this._btn.scaleY = 1.1;
			game.util.SoundManager.playUISound("B06");
		}

		private onTouchEnd(e:egret.TouchEvent):void {
			this._btn.scaleX = this._btn.scaleY = 1;
		}
		
		public destroy():void {
			this._btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
			this._btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
			this._btn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
		}
	}
}