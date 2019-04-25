//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class LimitedTimeActiveBackMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("LimitedTimeActiveBack");     
	}			
	
	public setResult(result:any):void {
		this._data.set("result", result);
	}

	public getResult():any {
		return this._data.get("result");
	}
			
	public setInfo(info:any):void {
		this._data.set("info", info);
	}

	public getInfo():any {
		return this._data.get("info");
	}
			
	public getPID():number {
		return 2064;
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
			