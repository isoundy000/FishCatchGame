//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class DrawLotterySendMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);   
		this._clazz = builder.build("DrawLotterySend");     
	}			
	
	public setGear(gear:any):void {
		this._data.set("gear", gear);
	}

	public getGear():any {
		return this._data.get("gear");
	}
			
	public getPID():number {
		return 3018;
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
			