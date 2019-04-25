//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class ExchangeMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("Exchange");     
	}			
	
	public setRecords(records:any):void {
		this._data.set("records", records);
	}

	public getRecords():any {
		return this._data.get("records");
	}
			
	public getPID():number {
		return 2030;
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
			