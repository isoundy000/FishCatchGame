//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class IntoRoomBackMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("IntoRoomBack");     
	}			
	
	public setFlag(flag:any):void {
		this._data.set("flag", flag);
	}

	public getFlag():any {
		return this._data.get("flag");
	}
			
	public setPlayerInfo(playerInfo:any):void {
		this._data.set("playerInfo", playerInfo);
	}

	public getPlayerInfo():any {
		return this._data.get("playerInfo");
	}
			
	public getPID():number {
		return 2007;
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
			