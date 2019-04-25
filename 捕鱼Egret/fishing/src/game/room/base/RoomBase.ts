module room.base {
	export class RoomBase extends burn.view.FullView {

		//当前子弹集合
		private _arrBullet:Array<BulletBase>;
		//当前鱼集合
		private _arrFish:Array<room.action.ActionBase>;


		public constructor() {
			super();
		}

		//初始化鱼群列表
		public initFishList():void {
			this._arrFish = new Array<room.action.ActionBase>();
		}
		//当前房间内鱼群列表
		public getFishList():Array<room.action.ActionBase> {
			return this._arrFish;
		}

		//初始化子弹列表
		public initBulletList():void {
			this._arrBullet = new Array<BulletBase>();
		}
		//获取当前子弹列表
		public getBulletList():Array<BulletBase> {
			return this._arrBullet;
		}
		//根据位置获取子弹数量
		public getBulletNumByPos(pos:number,isFlip:boolean):number {
			let count = 0;
			for (let i = 0; i < this._arrBullet.length; i++) {
				let p = RoomUtil.getPosByFlip(pos, isFlip);
				if (this._arrBullet[i].belongGun == p) {
					count ++;
				}
			}
			return count;
		}
		
	}
}