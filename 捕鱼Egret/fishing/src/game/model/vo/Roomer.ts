module game.model {
	export class Roomer {
		/** 玩家id */
		private _userrId:number;
		/** 玩家位置 */
		private _roomPos:number;
		/** 玩家名字 */
		private _roomName:string;
		/** 玩家炮倍 */
		private _gunRate:number;
		/** 玩家金币 */
		private _coins:number;
		/** 玩家金钱 */
		private _money:number;
		/** 玩家vip等级 */
		private _viplevel:number;
		/** 几个炮管 */
		private _nGunNum:number;

		////////////////////////捕鱼状态////////////////////////
		/**是否处于分身 */
		private _arrItemId:Array<number>;
		/**锁定鱼的结构体集合 */
		private _arrLockedId:Array<any>;
		
		private _isInLock:boolean;
		private _isInRage:boolean;
		private _isInClone:boolean;

		private _isBankrupt:boolean;
		/** 炮台皮肤 */
		private _curSkinId:number;
		/** 炮座皮肤 */
		private _curSkinBgId:number;

		private _nLv:number;
		/**  大奖赛信息 */
		private _djsObj:DjsObj;
		public constructor(pid:number, pos:number, name:string, gunRate:number,coins:number, money:number,
						   arrItemId:Array<number>,arrLockedId:Array<any>, vipLv:number, curSkinId:number, curSkinBgId:number, lv:number) {
			this._userrId = pid;
			this._roomPos = pos;
			this._roomName = name;
			this._gunRate = gunRate;
			this._coins = coins;
			this._money = money;
			this._isInLock = false;
			this._isInClone = false;
			this._isInRage = false;
			this._arrItemId = arrItemId;
			this._arrLockedId = arrLockedId;
			for(var i = 0; i < arrItemId.length; i++)
			{
				if(arrItemId[i] == PropEnum.LOCK)
				{
					this._isInLock = true;
				}else if(arrItemId[i] == PropEnum.RAGE)
				{
					this._isInRage = true;
				}else if(arrItemId[i] == PropEnum.CLONE)
				{
					this._isInClone = true;
				}
			}
			this._isBankrupt = false;
			this._viplevel = vipLv;
			this._nGunNum = 2;
			this.setGunNum();
			if(curSkinId == 0)
			{
				var value = game.table.T_Config_Table.getVoByKey(51).value;
				curSkinId = Number(value);
			}
			this._curSkinId = curSkinId;
			this._curSkinBgId = curSkinBgId;

			this._nLv = lv;
		}

		public getUserId():number {
			return this._userrId;
		}

		public getRoomPos():number {
			return this._roomPos;
		}

		public getName():string {
			return this._roomName;
		}

		public setGunRate(rate:number):void {
			this._gunRate = rate;
		}

		public getGunRate():number {
			return this._gunRate;
		}

		public getCoins():number {
			return this._coins;
		}
		public setCoins(coins:number):void {
			this._coins = coins;
		}

		public getMoney():number {
			// return this._money;
			return 100000;
		}
		public setMoney(money:number):void {
			this._money = money;
		}
		
		public setIsClone(bClone:boolean):void
		{
			this._isInClone = bClone;
		}
		public getIsClone():boolean
		{
			return this._isInClone;
		}
		public setIsRage(bRage:boolean):void
		{
			this._isInRage = bRage;
		}
		public getIsRage():boolean
		{
			return this._isInRage;
		}
		public setIsLock(bLock:boolean):void
		{
			this._isInLock = bLock;
		}
		public getIsLock():boolean
		{
			return this._isInLock;
		}
		public getBankrupt():boolean
		{
			return this._isBankrupt;
		}
		public setBankrupt(bFlag:boolean):void
		{
			this._isBankrupt = bFlag;
		}
		public getVipLevel():number{
			return this._viplevel;
		}
		public setGunNum():void
		{
			var vipLevel = this._viplevel;
			var data = game.table.T_Config_Table.getVoByKey(35).value;
			var datas = data.split("_");
			var min = Number(datas[0]);
			var max = Number(datas[1]);
			var state = 2;
			if(vipLevel >= min && vipLevel < max)
			{
				state = 2;
			}else if(vipLevel >= max)
			{
				state = 3;
			}
			this._nGunNum = state;
			let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
			if(userModel.getMatchRoomLevel() == RequesetRoomState.QmsRoom)
			{
				this._nGunNum = 3;
			}
		}
		public getGunNum():number
		{
			return this._nGunNum;
		}
		public getLockedIdByGun(gunIndex:number):number
		{
			if(this._arrLockedId.length < gunIndex)
			{
				return -1;
			}
			return this._arrLockedId[gunIndex];
		}

		public setCurSkinId(skinId:number):void
		{
			this._curSkinId = skinId;
		}
		public getCurSkinId():number
		{
			return this._curSkinId;
		}
		public setCurSkinBgId(skinBgId:number):void
		{
			this._curSkinBgId = skinBgId;
		}
		public getCurSkinBgId():number
		{
			return this._curSkinBgId;
		}

		public getLv():number
		{
			return this._nLv;
		}
		public setLv(value:number):void
		{
			this._nLv = value;
		}

		public getDjsObj():game.model.DjsObj
		{
			return this._djsObj;
		}
		public setDjsObj(obj:DjsObj):void
		{
			this._djsObj = obj;
		}
	}
}