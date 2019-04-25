module room.action {
	export class ActionBase {
		//动作对象
		private _actor:room.actor.ActorBase;
		//动作
		private _tween:egret.Tween;
		/** action是否在活动中， true：活动中， false：活动结束 */
		private _actionAlive:boolean;

		public constructor(actor:room.actor.ActorBase) {
			this._actor = actor;
			this._tween = egret.Tween.get(this._actor, {loop:false});
		}

		public getActor():room.actor.ActorBase {
			return this._actor;
		}

		public getTween():egret.Tween {
			return this._tween;
		}

		public action(type:number):void {
			
		}

		public runaway():void {
			egret.Tween.removeTweens(this._actor);
			this._actor.rotation = 180;
			if(this._actor.isFlipY())
			{
				this._actor.flipY(false);
			}
			this._tween = egret.Tween.get(this._actor, {loop:false});
			this._tween.to({x:-400, y:this._actor.y}, 1000);
			this._tween.call(()=>{
				this.setActionAlive(false);
				(this._actor as room.actor.FishBase).destory();
			});
		}

		public pause():void {
			egret.Tween.pauseTweens(this._actor);
		}

		public resume():void {
			egret.Tween.resumeTweens(this._actor);
		}

		/** 获取action状态 */
		public getActionAlive():boolean {
			return this._actionAlive;
		}

		public setActionAlive(alive:boolean):void {
			this._actionAlive = alive;
		}

		public destory():void {
			egret.Tween.removeTweens(this._actor);
			this._actor.destory();
			this._actor = null;
			this._tween = null;
		}
	}
}