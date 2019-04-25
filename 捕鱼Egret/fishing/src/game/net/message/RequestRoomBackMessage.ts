//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class RequestRoomBackMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("RequestRoomBack");     
	}			
	
	public setFlag(flag:any):void {
		this._data.set("flag", flag);
	}

	public getFlag():any {
		return this._data.get("flag");
	}
			
	public setPort(port:any):void {
		this._data.set("port", port);
	}

	public getPort():any {
		return this._data.get("port");
	}
			
	public setIp(ip:any):void {
		this._data.set("ip", ip);
	}

	public getIp():any {
		return this._data.get("ip");
	}
			
	public setRoomId(roomId:any):void {
		this._data.set("roomId", roomId);
	}

	public getRoomId():any {
		return this._data.get("roomId");
	}
			
	public setType(type:any):void {
		this._data.set("type", type);
	}

	public getType():any {
		return this._data.get("type");
	}
			
	public getPID():number {
		return 2005;
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
			