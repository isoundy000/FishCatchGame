module game.model {
	/**
	 * Gun对象
	 */
	export class GunItem {
        private _vo:game.table.T_Item;
        private _state:number;
		public constructor(vo:game.table.T_Item, state:number) {
            this._vo = vo;
            this._state = state;
		}
        public getVO():game.table.T_Item
        {
            return this._vo;
        }
        public getState():number
        {
            return this._state;
        }
        public setState(state:number):void
        {
            this._state = state;
        }
	}
}