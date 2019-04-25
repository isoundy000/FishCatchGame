//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class UpgradeOrForgeBackMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);   
		this._clazz = builder.build("UpgradeOrForgeBack");     
	}			
	
	public setState(state:any):void {
		this._data.set("state", state);
	}

	public getState():any {
		return this._data.get("state");
	}
			
	public setType(type:any):void {
		this._data.set("type", type);
	}

	public getType():any {
		return this._data.get("type");
	}
			
	public setUserId(userId:any):void {
		this._data.set("userId", userId);
	}

	public getUserId():any {
		return this._data.get("userId");
	}
			
	public setAfterGunId(afterGunId:any):void {
		this._data.set("afterGunId", afterGunId);
	}

	public getAfterGunId():any {
		return this._data.get("afterGunId");
	}
			
	public setItemProto(itemProto:any):void {
		this._data.set("itemProto", itemProto);
	}

	public getItemProto():any {
		return this._data.get("itemProto");
	}
			
	public getPID():number {
		return 3023;
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
			