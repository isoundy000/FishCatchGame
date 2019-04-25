module burn {
	export class Director {

		//缓存的stage对象
		private static _stage:egret.Stage = null;

		//UI中介者列表
		private static _uiMedList:Array<burn.mediator.MediatorBase> = null;

		//当前场景ui中介者
		private static _viewMed:burn.mediator.MediatorBase = null;

		//model集合
		private static _modelList:burn.util.Map = null;

		public constructor() {
			throw (new burn.error.SimpleError("The burn.Director can't call constructor!"));
		}

		/**
		 * 初始化函数
		 */
		public static initFramework(stage:egret.Stage):void {
			this._stage = stage;
			this._uiMedList = new Array<burn.mediator.MediatorBase>();
			this._modelList = new burn.util.Map();
		}

		/**
		 * 切换UI，销毁当前UI
		 */
		public static repleaceView(viewMed:burn.mediator.MediatorBase):void {
			let len = this._uiMedList.length;
			for (let i = 0; i < len; i++) {
				let test = this._uiMedList[i];
				this._uiMedList[i].unsubscrib();
				this._uiMedList[i].destroy();
			} 
			this._uiMedList = [];
			this._viewMed = viewMed;
			this._stage.addChild(viewMed.getView());
			this._uiMedList.push(viewMed);
			viewMed.onAdded();
			viewMed.init();
		}

		public static repleaceViewWithTransform(viewMed:burn.mediator.MediatorBase):void {
			
		}


		/**  
		 * 打开新UI，保存上一个UI。
		 */
		public static pushView(viewMed:burn.mediator.MediatorBase):void {
			//增加一个是否打开过这个view的判断
			if (this._uiMedList.length > 0) {
				let temp = this._uiMedList[this._uiMedList.length - 1];
				if (viewMed.getName() != "" && viewMed.getName() == temp.getName()) {
					//重复弹出了相同界面
					return;
				}
			}
			this._viewMed = viewMed;
			this._stage.addChild(viewMed.getView());
			this._uiMedList.push(viewMed);
			viewMed.onAdded();
			viewMed.init();
		}

		/**
		 * 弹出最上层view并销毁
		 */
		public static popView():void {
			let med:burn.mediator.MediatorBase = this._uiMedList.pop();
			med.unsubscrib();
			med.destroy();
			this._viewMed = this._uiMedList[this._uiMedList.length - 1];
			this._viewMed.update();
		}

		public static getStage():egret.Stage {
			return this._stage;
		}

		/**
		 * 注册model对象
		 */
		public static registerModel(cls:any, model:burn.model.ModelBase):void {
			model.init();
			let isExist = this._modelList.contains(cls);
			if (isExist) {
				console.warn("Model:" + cls + " have already exists!");
			} else {
				this._modelList.put(cls, model);
			}
		}
		
		/** 
		 * 获取model对象
		 */
		public static getModelByKey(cls:any):burn.model.ModelBase {
			return this._modelList.get(cls);
		}
		
		/**
		 * 清除所有model数据
		 */
		public static clearAllModel():void {
			let list = this._modelList.getList();
			for (let i = 0; i < list.length; i++) {
				list[i].value.clear();
			}
		}
	}
}