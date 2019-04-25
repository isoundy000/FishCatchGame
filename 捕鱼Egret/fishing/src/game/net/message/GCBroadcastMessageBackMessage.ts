//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class GCBroadcastMessageBackMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.common);   
		this._clazz = builder.build("GCBroadcastMessageBack");     
	}			
	
	public setMessageList(messageList:any):void {
		this._data.set("messageList", messageList);
	}

	public getMessageList():any {
		return this._data.get("messageList");
	}
			
	public getPID():number {
		return 1009;
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
			