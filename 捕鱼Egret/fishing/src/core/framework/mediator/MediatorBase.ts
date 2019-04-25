module burn.mediator {
	export class MediatorBase implements burn.base.IDestory {
		//当前中介者持有的view
		private _view:burn.view.ViewBase = null;
		//当前注册过的监听
		private _callback:Array<number> = null;

		private _name:string = "";

		public constructor(view:burn.view.ViewBase, name:string = "") {
			this._view = view;
			this._name = name;
			this._callback = new Array();
		}

		/**
		 * 添加到stage上之后调用
		 */
		public onAdded():void {

		}

		/**
		 * 初始化函数
		 */
		public init():void {

		}

		/**
		 * 重新显示时调研
		 */
		public update():void {
			
		}

		//获得当前中介者持有的view
		public getView():burn.view.ViewBase {
			return this._view;
		}

		public subscrib(type:number, callback:Function):void {
			burn._Notification_.subscrib(type, callback, this);
			this._callback.push(type);
		} 

		public unsubscrib():void {
			let len = this._callback.length;
			for (let i = 0; i < len; i++) {
				burn._Notification_.removebByType(this._callback[i]);
			}
			this._callback = null;
		}

		public unsubscribByType(type:number):void {
			burn._Notification_.removebByType(type);
		}

		public getModel(cls:any):burn.model.ModelBase {
			return burn.Director.getModelByKey(cls);
		}

		public getName():string {
			return this._name;
		}
 
		//销毁接口
		public destroy():void {
			throw(new burn.error.SimpleError("Subclass must be override destory!"));
		}
	}
}