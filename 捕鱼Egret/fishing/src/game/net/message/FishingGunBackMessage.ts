//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class FishingGunBackMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);   
		this._clazz = builder.build("FishingGunBack");     
	}			
	
	public setUid(uid:any):void {
		this._data.set("uid", uid);
	}

	public getUid():any {
		return this._data.get("uid");
	}
			
	public setGun(gun:any):void {
		this._data.set("gun", gun);
	}

	public getGun():any {
		return this._data.get("gun");
	}
			
	public getPID():number {
		return 3002;
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
			