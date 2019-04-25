module burn.view {
	
	export class ViewBase extends egret.DisplayObjectContainer implements burn.base.IDestory {
		
		public constructor() {
			super();
		}

		public show():void {
			
		}

		public setLayout(layout:burn.ViewEnum):void {
			let width = this.stage.width;
			let height = this.stage.height;
			if (layout == burn.ViewEnum.CENTER) {
				this.x = width/2;
				this.y = height/2;
			}
		}

		public send(type:number, obj:any = null):void {
			burn._Notification_.send(type, obj);
		}

		/**
		 * 销毁函数
		 */
		public destroy():void {
			throw(new burn.error.SimpleError("Subclass must be override destory!"));
		} 
	}
}