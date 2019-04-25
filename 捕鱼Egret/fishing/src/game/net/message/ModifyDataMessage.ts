//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class ModifyDataMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.common);   
		this._clazz = builder.build("ModifyData");     
	}			
	
	public setId(id:any):void {
		this._data.set("id", id);
	}

	public getId():any {
		return this._data.get("id");
	}
			
	public setCount(count:any):void {
		this._data.set("count", count);
	}

	public getCount():any {
		return this._data.get("count");
	}
			
	public getPID():number {
		return 1006;
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
			