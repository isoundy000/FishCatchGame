//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class MonthSignSendMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("MonthSignSend");     
	}			
	
	public setOperationType(operationType:any):void {
		this._data.set("operationType", operationType);
	}

	public getOperationType():any {
		return this._data.get("operationType");
	}
			
	public setCurMonth(curMonth:any):void {
		this._data.set("curMonth", curMonth);
	}

	public getCurMonth():any {
		return this._data.get("curMonth");
	}
			
	public getPID():number {
		return 2040;
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
			