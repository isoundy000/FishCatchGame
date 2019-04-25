//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class ManualChooseRoomSendMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("ManualChooseRoomSend");     
	}			
	
	public setServerId(serverId:any):void {
		this._data.set("serverId", serverId);
	}

	public getServerId():any {
		return this._data.get("serverId");
	}
			
	public getPID():number {
		return 2014;
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
			