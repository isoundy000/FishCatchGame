//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class ReceiveWeChatShareAwardSendMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("ReceiveWeChatShareAwardSend");     
	}			
	
	public setType(type:any):void {
		this._data.set("type", type);
	}

	public getType():any {
		return this._data.get("type");
	}
			
	public setFunctionType(functionType:any):void {
		this._data.set("functionType", functionType);
	}

	public getFunctionType():any {
		return this._data.get("functionType");
	}
			
	public setFunctionParam(functionParam:any):void {
		this._data.set("functionParam", functionParam);
	}

	public getFunctionParam():any {
		return this._data.get("functionParam");
	}
			
	public getPID():number {
		return 2066;
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
			