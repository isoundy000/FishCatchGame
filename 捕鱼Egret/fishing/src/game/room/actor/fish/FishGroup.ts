module room.actor {
	export class FishGroup extends room.actor.ActorBase {
		/** 鱼组中的鱼 */
		private _fishList:Array<room.actor.FishBase>;
		/** MC加载完成回调 */
		private _loadCallback:Function;

		public constructor(id:number, uniqIds:Array<number>, loadCallback:Function = null) {
			super();
			this._loadCallback = loadCallback;
			this._fishList = new Array<room.actor.FishBase>();
			this.init(id, uniqIds);
		}

		private init(id:number, uniqIds:Array<number>):void {
			let self = this;
			let vo = game.table.T_FishGroup_Table.getVoByKey(id);
			this._fid = id;
			let fishId = vo.fishId;
			let posArr = vo.pos.split("|");
			let fLen = uniqIds.length;
			let count = 0;
			for (let i = 0; i < fLen; i++) {
				let fish = FishingObjPool.getInstance().getGroupFishById(fishId);
				if (fish != null) {
					fish.resetData();
					let arr = posArr[i].split(",");
					fish.setFishPosition(new egret.Point(Number(arr[0]), Number(arr[1])));
					fish.setType(AddFishType.FISH);
					fish.setUniqId(uniqIds[i]);
					this.addChild(fish);
					this._fishList.push(fish);
					count++;
					if (count >= fLen) {
						let tw = egret.Tween.get(self, {loop:false});
						tw.wait(50)
						.call(function(){
							egret.Tween.removeTweens(self);
							self._loadCallback && self._loadCallback();
						});
					}
				} else {
					fish = new room.actor.FishBase(fishId, function(){
						count++;
						if (count >= fLen) {
							self._loadCallback && self._loadCallback();
						}
					});
					let arr = posArr[i].split(",");
					fish.setFishPosition(new egret.Point(Number(arr[0]), Number(arr[1])));
					fish.setType(AddFishType.FISH);
					fish.setUniqId(uniqIds[i]);
					this.addChild(fish);
					this._fishList.push(fish);
				}
			}
		}

		//设置位置
		public setFishPosition(pos:egret.Point):void {
			this.x = pos.x;
			this.y = pos.y;
		}

		public getFishList():Array<room.actor.FishBase> {
			return this._fishList;
		}

		//翻转
		public fishflipY():void {
			for (let i = 0; i < this._fishList.length; i++) {
				this._fishList[i].fishflipY();
			}
		}

		public destory():void {
			for (let i = 0; i < this._fishList.length; i++) {
				FishingObjPool.getInstance().insertGroupFishPool(this._fishList[i]);
				this._fishList[i].destory();
			}
			this.removeChildren();
			this.parent && this.parent.removeChild(this);
		}
		
	}
}