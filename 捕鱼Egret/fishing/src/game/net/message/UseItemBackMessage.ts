//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class UseItemBackMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);   
		this._clazz = builder.build("UseItemBack");     
	}			
	
	public setUserId(userId:any):void {
		this._data.set("userId", userId);
	}

	public getUserId():any {
		return this._data.get("userId");
	}
			
	public setItemId(itemId:any):void {
		this._data.set("itemId", itemId);
	}

	public getItemId():any {
		return this._data.get("itemId");
	}
			
	public setAddFish(addFish:any):void {
		this._data.set("addFish", addFish);
	}

	public getAddFish():any {
		return this._data.get("addFish");
	}
			
	public setState(state:any):void {
		this._data.set("state", state);
	}

	public getState():any {
		return this._data.get("state");
	}
			
	public setFrozenFishIds(frozenFishIds:any):void {
		this._data.set("frozenFishIds", frozenFishIds);
	}

	public getFrozenFishIds():any {
		return this._data.get("frozenFishIds");
	}
			
	public getPID():number {
		return 3012;
	}

	public initData():void {                
		this._data = new this._clazz();  
	}

	public setData(buff:egret.ByteArray):void {
		this._data = this._clazz.decode(buff);  
	}

	public toByteArray():egret.ByteArray {
		var arraybuffer: ArrayBuffer = this._data.toArrayBuffer();
		return new egret.ByteArray(arraybuffer);
	}
}
			