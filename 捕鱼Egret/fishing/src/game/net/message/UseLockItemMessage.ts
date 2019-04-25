//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class UseLockItemMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);   
		this._clazz = builder.build("UseLockItem");     
	}			
	
	public setItemId(itemId:any):void {
		this._data.set("itemId", itemId);
	}

	public getItemId():any {
		return this._data.get("itemId");
	}
			
	public setFishId(fishId:any):void {
		this._data.set("fishId", fishId);
	}

	public getFishId():any {
		return this._data.get("fishId");
	}
			
	public setUserId(userId:any):void {
		this._data.set("userId", userId);
	}

	public getUserId():any {
		return this._data.get("userId");
	}
			
	public setGunIndex(gunIndex:any):void {
		this._data.set("gunIndex", gunIndex);
	}

	public getGunIndex():any {
		return this._data.get("gunIndex");
	}
			
	public getPID():number {
		return 3020;
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
			