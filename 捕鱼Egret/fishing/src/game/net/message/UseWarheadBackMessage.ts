//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class UseWarheadBackMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);   
		this._clazz = builder.build("UseWarheadBack");     
	}			
	
	public setUserId(userId:any):void {
		this._data.set("userId", userId);
	}

	public getUserId():any {
		return this._data.get("userId");
	}
			
	public setUniId(uniId:any):void {
		this._data.set("uniId", uniId);
	}

	public getUniId():any {
		return this._data.get("uniId");
	}
			
	public setAddCoins(addCoins:any):void {
		this._data.set("addCoins", addCoins);
	}

	public getAddCoins():any {
		return this._data.get("addCoins");
	}
			
	public getPID():number {
		return 3016;
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
			