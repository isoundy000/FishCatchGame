//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class ReplaceUserMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.common);   
		this._clazz = builder.build("ReplaceUser");     
	}			
	
	public setUserId(userId:any):void {
		this._data.set("userId", userId);
	}

	public getUserId():any {
		return this._data.get("userId");
	}
			
	public setGameServerId(gameServerId:any):void {
		this._data.set("gameServerId", gameServerId);
	}

	public getGameServerId():any {
		return this._data.get("gameServerId");
	}
			
	public setRoomServerId(roomServerId:any):void {
		this._data.set("roomServerId", roomServerId);
	}

	public getRoomServerId():any {
		return this._data.get("roomServerId");
	}
			
	public getPID():number {
		return 1005;
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
			