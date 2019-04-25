//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class ExchangeGoodsBackMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.common);   
		this._clazz = builder.build("ExchangeGoodsBack");     
	}			
	
	public setItemList(itemList:any):void {
		this._data.set("itemList", itemList);
	}

	public getItemList():any {
		return this._data.get("itemList");
	}
			
	public getPID():number {
		return 1012;
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
			