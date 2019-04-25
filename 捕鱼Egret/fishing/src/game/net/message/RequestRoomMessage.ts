//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class RequestRoomMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("RequestRoom");     
	}			
	
	public setType(type:any):void {
		this._data.set("type", type);
	}

	public getType():any {
		return this._data.get("type");
	}
			
	public setId(id:any):void {
		this._data.set("id", id);
	}

	public getId():any {
		return this._data.get("id");
	}
			
	public setRoomId(roomId:any):void {
		this._data.set("roomId", roomId);
	}

	public getRoomId():any {
		return this._data.get("roomId");
	}
			
	public getPID():number {
		return 2004;
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
			