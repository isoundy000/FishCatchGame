//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class LimitedTimeActiveItemMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("LimitedTimeActiveItem");     
	}			
	
	public setId(id:any):void {
		this._data.set("id", id);
	}

	public getId():any {
		return this._data.get("id");
	}
			
	public setState(state:any):void {
		this._data.set("state", state);
	}

	public getState():any {
		return this._data.get("state");
	}
			
	public setValue(value:any):void {
		this._data.set("value", value);
	}

	public getValue():any {
		return this._data.get("value");
	}
			
	public getPID():number {
		return 2062;
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
			