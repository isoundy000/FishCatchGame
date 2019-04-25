class FishingObjPool {
	private static _instance:FishingObjPool = null;
	private _isInit:boolean = false;
	/**子弹的对象池 */
	public nBulletObjPool:Array<BulletBase>;

	/** 渔网缓存 */
	public nFishingNetPool:Array<any>;

	/** 鱼的缓存 */
	public nFishPool:Array<room.actor.ActorBase>;
	public nGroupFishPool:Array<room.actor.FishBase>;
	public constructor() {
		if (this._isInit) {
			throw(new burn.error.SimpleError(""));
		}
		this._isInit = true;
		this.reset();
	}
	public reset():void {
		this.nBulletObjPool = new Array<BulletBase>();
		this.nFishingNetPool = new Array<any>();
		this.nFishPool = new Array<room.actor.ActorBase>();
		this.nGroupFishPool = new Array<room.actor.FishBase>();
	}

	public static getInstance():FishingObjPool {
		if (this._instance == null) {
			this._instance = new FishingObjPool();
		}
		return this._instance;
	}

	public getBulletObj(nId:number):BulletBase {
		if (this.nBulletObjPool.length == 0) {
			return new BulletBase(nId);
		} else { 
			let nType = game.table.T_Bullet_Table.getVoByKey(nId).type;
			let bulletObj = this.getBulletObjByType(nId, nType);
			bulletObj.resetData();
			return bulletObj;
		}
	}

	private getBulletObjByType(nType:number,nId:number):BulletBase {
		let bulletObj:BulletBase = null;
		let len = this.nBulletObjPool.length;
		for (let i = 0; i < len; i++) {
			let objItem = this.nBulletObjPool[i];
			if (objItem.getBulletType() == nType) {
				bulletObj = objItem;
				break;
			}
		}
		if (bulletObj == null) {
			bulletObj = new BulletBase(nId);
		} else {
			let index = this.nBulletObjPool.indexOf(bulletObj);
			this.nBulletObjPool.splice(index,1);
		}
		return bulletObj;
	}

	//获取渔网
	public getFishingNetById(id:number):any {
		let len = this.nFishingNetPool.length;
		if(CONFIG.IS_WEB){
			if (len <= 0) {
				let bombweb = new game.util.DragonBonesUtil(id,game.util.DragonBonesUtil.bulletMovie);
				return bombweb;
			}
			else{
				let bombweb = this.getNetByID(id);
				return bombweb;
			}
		}else{
			if (len <= 0) {
				let bomb = new netObj(id);
				return bomb;
			} else {
				let bomb = this.getNetByID(id);
				return bomb;
			}
		}
	}
	private getNetByID(id:number):any {
		if(CONFIG.IS_WEB){
			let bulletObj:game.util.DragonBonesUtil = null;
			let len = this.nFishingNetPool.length;
			for (let i = 0; i < len; i++) {
				let objItem = this.nFishingNetPool[i];
				if (objItem.nId == id) {
					bulletObj = objItem;
					break;
				}
			}
			if (bulletObj == null) {
				bulletObj = new game.util.DragonBonesUtil(id,game.util.DragonBonesUtil.bulletMovie);
			} else {
				let index = this.nFishingNetPool.indexOf(bulletObj);
				this.nFishingNetPool.splice(index,1);
			}
			bulletObj.scaleX = 0.75;
			bulletObj.scaleY = 0.75;
			bulletObj.alpha = 1;
			return bulletObj;
		}else{
			let bulletObj:netObj = null;
			let len = this.nFishingNetPool.length;
			for (let i = 0; i < len; i++) {
				let objItem = this.nFishingNetPool[i];
				if (objItem.nId == id) {
					bulletObj = objItem;
					break;
				}
			}
			if (bulletObj == null) {
				bulletObj = new netObj(id);
			} else {
				let index = this.nFishingNetPool.indexOf(bulletObj);
				this.nFishingNetPool.splice(index,1);
			}
			bulletObj.scaleX = 0.75;
			bulletObj.scaleY = 0.75;
			bulletObj.alpha = 1;
			return bulletObj;
		}
	}
	public getGroupFishById(id:number):room.actor.FishBase {
		let fish = null;
		let nIndex = -1;
		let len = this.nGroupFishPool.length;
		for (let i = 0; i < len; i++) {
			let fishItem = this.nGroupFishPool[i];
			if (fishItem.getFishId() == id) {
				fish = fishItem;
				nIndex = i;
				break;
			}
		}
		if (nIndex != -1) {
			this.nGroupFishPool.splice(nIndex,1);
			fish.resetData();
			return fish;
		} else {
			return null;
		}
	}
	public insertGroupFishPool(fish:room.actor.FishBase):void {
		this.nGroupFishPool.push(fish);
	}
	public getFishById(id:number):room.actor.ActorBase {
		let fish = null;
		let nIndex = -1;
		let len = this.nFishPool.length;
		for (let i = 0; i < len; i++) {
			let fishItem = this.nFishPool[i];
			if (fishItem.getFishId() == id) {
				fish = fishItem;
				nIndex = i;
				break;
			}
		}
		if (nIndex != -1) {
			this.nFishPool.splice(nIndex,1);
			fish.resetData();
			return fish;
		} else {
			return null;
		}
	}
	/**
	 * 根据ID判断是否达到上限
	 */
	public isMaxFishById(id: number):boolean {
		let maxNum = 0;
		let vo = game.table.T_Fish_Table.getVoByKey(id);
		if(vo) {
			maxNum = vo.cacheNum;
		}
		let num = 0;
		let len = this.nFishPool.length;
		for (let i = 0; i < len; i++) {
			let fishItem = this.nFishPool[i];
			if (fishItem.getFishId() == id) {
				num ++;
				if(num >= maxNum) {
					return true;
				}
			}
		}
		return false;
	}
	public insertFishPool(fish:room.actor.ActorBase):void {
		//看下池子里有多少个,多的就不要往池子里放了
		let fishId = fish.getFishId();
		//如果鱼超过池子上限
		if(this.isMaxFishById(fishId)) {
			fish.destory();
			if(fish && fish.parent) {
				fish.parent.removeChild(fish);
				fish = null;
			}
			return;
		}
		fish.destory();
		fish.resetData();
		this.nFishPool.push(fish);
	}
}

class netObj extends egret.Bitmap{
	public nId:number;
	public bInPool:boolean;
	public constructor(id:number) {
		let res = RES.getRes("bullet_bomb_" + id + "_png");
        if (!res) {
			super(RES.getRes("bullet_bomb_1_png"));
            RES.getResAsync("bullet_bomb_" + id + "_png", function(){}, this);
			this.bInPool = false;
        } else {
			super(RES.getRes("bullet_bomb_" + id + "_png"));
			this.bInPool = true;
        }
		this.nId = id;
		this.scaleX = 0.75;
		this.scaleY = 0.75;
		this.anchorOffsetX = this.width/2;
		this.anchorOffsetY = this.height/2;
	}
}