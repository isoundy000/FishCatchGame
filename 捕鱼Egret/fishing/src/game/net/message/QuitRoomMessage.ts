//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class QuitRoomMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("QuitRoom");     
	}			
	
	public setPosition(position:any):void {
		this._data.set("position", position);
	}

	public getPosition():any {
		return this._data.get("position");
	}
			
	public setPlayerId(playerId:any):void {
		this._data.set("playerId", playerId);
	}

	public getPlayerId():any {
		return this._data.get("playerId");
	}
			
	public getPID():number {
		return 2009;
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
			