//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class VipLevelUpMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);   
		this._clazz = builder.build("VipLevelUp");     
	}			
	
	public setOldLevel(oldLevel:any):void {
		this._data.set("oldLevel", oldLevel);
	}

	public getOldLevel():any {
		return this._data.get("oldLevel");
	}
			
	public setNewLevel(newLevel:any):void {
		this._data.set("newLevel", newLevel);
	}

	public getNewLevel():any {
		return this._data.get("newLevel");
	}
			
	public getPID():number {
		return 3026;
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
			