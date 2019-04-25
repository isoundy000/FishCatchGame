//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class FishingGunSendMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);   
		this._clazz = builder.build("FishingGunSend");     
	}			
	
	public setAngle(angle:any):void {
		this._data.set("angle", angle);
	}

	public getAngle():any {
		return this._data.get("angle");
	}
			
	public setGunIndex(gunIndex:any):void {
		this._data.set("gunIndex", gunIndex);
	}

	public getGunIndex():any {
		return this._data.get("gunIndex");
	}
			
	public setBulletId(bulletId:any):void {
		this._data.set("bulletId", bulletId);
	}

	public getBulletId():any {
		return this._data.get("bulletId");
	}
			
	public getPID():number {
		return 3001;
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
			