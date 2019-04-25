//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class LimitedTimeActiveSendMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("LimitedTimeActiveSend");     
	}			
	
	public setId(id:any):void {
		this._data.set("id", id);
	}

	public getId():any {
		return this._data.get("id");
	}
			
	public setGoodsId(goodsId:any):void {
		this._data.set("goodsId", goodsId);
	}

	public getGoodsId():any {
		return this._data.get("goodsId");
	}
			
	public setState(state:any):void {
		this._data.set("state", state);
	}

	public getState():any {
		return this._data.get("state");
	}
			
	public setPriceIndex(priceIndex:any):void {
		this._data.set("priceIndex", priceIndex);
	}

	public getPriceIndex():any {
		return this._data.get("priceIndex");
	}
			
	public getPID():number {
		return 2063;
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
			