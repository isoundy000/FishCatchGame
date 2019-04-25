//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class RandomFishHitBackMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);   
		this._clazz = builder.build("RandomFishHitBack");     
	}			
	
	public setUserId(userId:any):void {
		this._data.set("userId", userId);
	}

	public getUserId():any {
		return this._data.get("userId");
	}
			
	public setFishFunctionType(fishFunctionType:any):void {
		this._data.set("fishFunctionType", fishFunctionType);
	}

	public getFishFunctionType():any {
		return this._data.get("fishFunctionType");
	}
			
	public setFishId(fishId:any):void {
		this._data.set("fishId", fishId);
	}

	public getFishId():any {
		return this._data.get("fishId");
	}
			
	public setFishingHitback(fishingHitback:any):void {
		this._data.set("fishingHitback", fishingHitback);
	}

	public getFishingHitback():any {
		return this._data.get("fishingHitback");
	}
			
	public getPID():number {
		return 3005;
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
			