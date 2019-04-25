//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class ItemProtoMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);   
		this._clazz = builder.build("ItemProto");     
	}			
	
	public setItemId(itemId:any):void {
		this._data.set("itemId", itemId);
	}

	public getItemId():any {
		return this._data.get("itemId");
	}
			
	public setCount(count:any):void {
		this._data.set("count", count);
	}

	public getCount():any {
		return this._data.get("count");
	}
			
	public setExpried(expried:any):void {
		this._data.set("expried", expried);
	}

	public getExpried():any {
		return this._data.get("expried");
	}
			
	public getPID():number {
		return 3006;
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
			