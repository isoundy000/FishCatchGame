//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class NextDayAwardBackMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("NextDayAwardBack");     
	}			
	
	public setResultState(resultState:any):void {
		this._data.set("resultState", resultState);
	}

	public getResultState():any {
		return this._data.get("resultState");
	}
			
	public getPID():number {
		return 2043;
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
			