//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class ManualChooseRoomBackMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("ManualChooseRoomBack");     
	}			
	
	public setServerInfo(serverInfo:any):void {
		this._data.set("serverInfo", serverInfo);
	}

	public getServerInfo():any {
		return this._data.get("serverInfo");
	}
			
	public setRoomInfo(roomInfo:any):void {
		this._data.set("roomInfo", roomInfo);
	}

	public getRoomInfo():any {
		return this._data.get("roomInfo");
	}
			
	public getPID():number {
		return 2015;
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
			