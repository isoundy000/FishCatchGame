module burn.model {
	export class ModelBase implements burn.base.IDestory {
		public constructor() {
		}

		public init():void {
			
		}

		public send(type:number, obj:any):void {
			burn._Notification_.send(type, obj);
		}

		public clear():void {
			
		}

		public destroy():void {
			throw(new burn.error.SimpleError("Subclass must be override destory!"));
		}
	}
}