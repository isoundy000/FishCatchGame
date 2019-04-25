//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class LoopExchangeRecordsBackMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.common);   
		this._clazz = builder.build("LoopExchangeRecordsBack");     
	}			
	
	public setRecordList(recordList:any):void {
		this._data.set("recordList", recordList);
	}

	public getRecordList():any {
		return this._data.get("recordList");
	}
			
	public getPID():number {
		return 1016;
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
			