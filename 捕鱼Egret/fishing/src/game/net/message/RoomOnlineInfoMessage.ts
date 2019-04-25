//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class RoomOnlineInfoMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("RoomOnlineInfo");     
	}			
	
	public setRoomType(roomType:any):void {
		this._data.set("roomType", roomType);
	}

	public getRoomType():any {
		return this._data.get("roomType");
	}
			
	public setNum(num:any):void {
		this._data.set("num", num);
	}

	public getNum():any {
		return this._data.get("num");
	}
			
	public getPID():number {
		return 2058;
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
			