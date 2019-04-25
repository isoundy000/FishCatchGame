//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class DailyLoginDrawBackMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("DailyLoginDrawBack");     
	}			
	
	public setState(state:any):void {
		this._data.set("state", state);
	}

	public getState():any {
		return this._data.get("state");
	}
			
	public setIndex(index:any):void {
		this._data.set("index", index);
	}

	public getIndex():any {
		return this._data.get("index");
	}
			
	public getPID():number {
		return 2051;
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
			