class RoomModel extends burn.model.ModelBase {

	//房间内玩家列表
	private _roomerList:Array<game.model.Roomer>;
	//房间内存活的鱼的列表
	private _fishList:Array<game.model.Fish>;

	//凤凰属性
	private _phoenixObj:game.model.PhoenixObj;
	public constructor() {
		super();
	}

	public init():void {
		this._roomerList = new Array<game.model.Roomer>();		
		this._fishList = new Array<game.model.Fish>();
	}

	//向房间添加玩家
	public addRoomer(roomer:game.model.Roomer):void {
		if (this._roomerList.length < 4) {
			this._roomerList.push(roomer);
		} else {
			console.error("房间人数已满!");
		}
	}

	//将玩家移除房间
	public removeRoomer(roomer:game.model.Roomer):void {
		for (var i = 0; i < this._roomerList.length; i++) {
			if (this._roomerList[i].getUserId() == roomer.getUserId()) {
				this._roomerList.splice(i, 1);
				break;
			}
		}
	}

	//根据userId获取roomer对象
	public getRoomerById(uid:number):game.model.Roomer {
		var len = this._roomerList.length;
		for (var i = 0; i < len; i++) {
			if (this._roomerList[i].getUserId() == uid) {
				return this._roomerList[i];
			}
		}
		return null;
	}

	//根据位置。获取roomer对象
	public getRoomerByPos(pos:number):game.model.Roomer {
		var len = this._roomerList.length;
		for (var i = 0; i < len; i++) {
			if (this._roomerList[i].getRoomPos() == pos) {
				return this._roomerList[i];
			}
		}
		return null;
	}

	//获取房间内的玩家
	public getRoomerList():Array<game.model.Roomer> {
		return this._roomerList;
	}

	//初始化房间中已存在的鱼
	public addRoomLiveFish(fish:game.model.Fish):void {
		this._fishList.push(fish);
	}

	//判断房间内已有的鱼是否有重复路径
	public isPathExist(pathId:number):boolean {
		for (var i = 0; i < this._fishList.length; i++) {
			var fish:game.model.Fish = this._fishList[i];
			if (fish.pathId == pathId) {
				return true;
			}
		}
		return false;
	}

	//获取房间内已存在的鱼
	public getFishList():Array<game.model.Fish> {
		return this._fishList;
	}

	//塞入凤凰的对象
	public setPhoenix(obj:game.model.PhoenixObj):void
	{
		this._phoenixObj = obj;
	}

	//获取凤凰对象
	public getPhoenix():game.model.PhoenixObj
	{
		return this._phoenixObj;
	}
	
	//清空房间数据
	public clearRoom():void {
		this._roomerList = new Array<game.model.Roomer>();		
		this._fishList = new Array<game.model.Fish>();
		this._phoenixObj = null;
	}

	public clear():void {
				
	}

	public destroy():void {
		this._roomerList = null;		
		this._fishList = null;
	}
}