//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class CommonStatusMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.common);   
		this._clazz = builder.build("CommonStatus");     
	}			
	
	public setStatus(status:any):void {
		this._data.set("status", status);
	}

	public getStatus():any {
		return this._data.get("status");
	}
			
	public getPID():number {
		return 1002;
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
			