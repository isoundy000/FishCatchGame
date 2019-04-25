//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class ThePeopleChangeMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);   
		this._clazz = builder.build("ThePeopleChange");     
	}			
	
	public setGrandPrixIntegral(grandPrixIntegral:any):void {
		this._data.set("grandPrixIntegral", grandPrixIntegral);
	}

	public getGrandPrixIntegral():any {
		return this._data.get("grandPrixIntegral");
	}
			
	public setUserId(userId:any):void {
		this._data.set("userId", userId);
	}

	public getUserId():any {
		return this._data.get("userId");
	}
			
	public setFishId(fishId:any):void {
		this._data.set("fishId", fishId);
	}

	public getFishId():any {
		return this._data.get("fishId");
	}
			
	public getPID():number {
		return 3030;
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
			