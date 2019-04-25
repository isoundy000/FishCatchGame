module game.model {
	/**
	 * 道具对象
	 */
	export class Item {
		/** 道具id */
		private _itemId:number;
		/** 道具数量 */
		private _count:number;
		/** 有效期 */
		private _time:number;
		public constructor(itemId:number, count:number,time:number = null) {
			this._itemId = itemId;
			this._count = count;
			this._time = 0;
			if(time)
			{
				this._time = time;
			}
		}

		public getItemId():number {
			return this._itemId;
		}

		public setCount(count:number):void {
			this._count = count;
		}

		public getCount():number {
			return this._count;
		}

		public setTime(time:number):void
		{
			this._time = time;
		}

		public getTime():number
		{
			return this._time;
		}
		public isAct():boolean
		{
			if(this._time <= 0)
			{
				return true;
			}
			let residue = this._time - game.util.TimeUtil.getCurrTime();
			if(residue > 0)
			{
				return true;
			}else 
			{
				return false;
			}
		}
	}
}