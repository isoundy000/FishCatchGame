//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class RoomOnlineMessageMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("RoomOnlineMessage");     
	}			
	
	public setOnlineList(onlineList:any):void {
		this._data.set("onlineList", onlineList);
	}

	public getOnlineList():any {
		return this._data.get("onlineList");
	}
			
	public getPID():number {
		return 2059;
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
			