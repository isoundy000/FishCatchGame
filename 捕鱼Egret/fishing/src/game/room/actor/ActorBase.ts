module room.actor {
	export class ActorBase extends egret.DisplayObjectContainer {
		// 对象的唯一id 
		private _uniqId:number;
		// 对象类型
		private _actorType:number;
		/** 是否发生过翻转 */
		protected _bFlipY:boolean;
		//鱼的显示分层
		protected FISH_LAYER:egret.DisplayObjectContainer;
		protected CHASIS_LAYER:egret.DisplayObjectContainer;
		protected EFFECT_LAYER:egret.DisplayObjectContainer;

		protected FISH_POP_LAYER:egret.DisplayObjectContainer;
		/** 鱼的类型id */
		protected _fid:number;
		
		public constructor() {
			super();
		}

		/** 行为结束回调 */
		public actionEndCallback():void {

		}

		/** 获取鱼的id */
		public getFishId():number {
			return this._fid;
		}

		/** 重置鱼的数据 */
		public resetData():void
		{
			
		}

		public hitRect(x: number, y: number):number {
			let isHit = this.hitTestPoint(x, y);;
			if (isHit) {
				return 0;
			}
			return -1;
		}

		public setUniqId(uid:number):void {
			this._uniqId = uid;
		}

		public getUniqId():number {
			return this._uniqId;
		}

		public setType(type:number):void {
			this._actorType = type;
		}

		public getType():number {
			return this._actorType;
		}
		
		public flipX(f:boolean):void {
			this.FISH_LAYER.scaleX = (f == true?-1:1);
		}

		public flipY(f:boolean):void {
			let childFishs = this.FISH_LAYER.numChildren;
			for (let i = 0; i < childFishs; i++) {
				let fish = this.FISH_LAYER.getChildAt(i);
				fish.scaleY = (f == true? -1.5 : 1.5);
			}
		}

		public isFlipY():boolean{
			return this._bFlipY;
		}

		public fishflipY():void {

		}

		public playHitEffect():void {
			
		}

		public playDead(isGroup:boolean = false):void {
			
		}
		public getFISH_LAYER():egret.DisplayObjectContainer
		{
			return this.FISH_LAYER;
		}
		public getEFFECT_LAYER():egret.DisplayObjectContainer
		{
			return this.EFFECT_LAYER;
		}
		public destory():void {
			this.removeChildren();
		}
	}
}