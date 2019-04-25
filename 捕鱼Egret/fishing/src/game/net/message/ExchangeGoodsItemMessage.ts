//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class ExchangeGoodsItemMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.common);   
		this._clazz = builder.build("ExchangeGoodsItem");     
	}			
	
	public setId(id:any):void {
		this._data.set("id", id);
	}

	public getId():any {
		return this._data.get("id");
	}
			
	public setName(name:any):void {
		this._data.set("name", name);
	}

	public getName():any {
		return this._data.get("name");
	}
			
	public setType(type:any):void {
		this._data.set("type", type);
	}

	public getType():any {
		return this._data.get("type");
	}
			
	public setExchangePriceId(exchangePriceId:any):void {
		this._data.set("exchangePriceId", exchangePriceId);
	}

	public getExchangePriceId():any {
		return this._data.get("exchangePriceId");
	}
			
	public setExchangePrice(exchangePrice:any):void {
		this._data.set("exchangePrice", exchangePrice);
	}

	public getExchangePrice():any {
		return this._data.get("exchangePrice");
	}
			
	public setInstruction(instruction:any):void {
		this._data.set("instruction", instruction);
	}

	public getInstruction():any {
		return this._data.get("instruction");
	}
			
	public setMarketPrice(marketPrice:any):void {
		this._data.set("marketPrice", marketPrice);
	}

	public getMarketPrice():any {
		return this._data.get("marketPrice");
	}
			
	public setUrl(url:any):void {
		this._data.set("url", url);
	}

	public getUrl():any {
		return this._data.get("url");
	}
			
	public setMinVip(minVip:any):void {
		this._data.set("minVip", minVip);
	}

	public getMinVip():any {
		return this._data.get("minVip");
	}
			
	public setGoodsId(goodsId:any):void {
		this._data.set("goodsId", goodsId);
	}

	public getGoodsId():any {
		return this._data.get("goodsId");
	}
			
	public setGoodsNum(goodsNum:any):void {
		this._data.set("goodsNum", goodsNum);
	}

	public getGoodsNum():any {
		return this._data.get("goodsNum");
	}
			
	public setServerNum(serverNum:any):void {
		this._data.set("serverNum", serverNum);
	}

	public getServerNum():any {
		return this._data.get("serverNum");
	}
			
	public setLoopRecordColor(loopRecordColor:any):void {
		this._data.set("loopRecordColor", loopRecordColor);
	}

	public getLoopRecordColor():any {
		return this._data.get("loopRecordColor");
	}
			
	public setOrders(orders:any):void {
		this._data.set("orders", orders);
	}

	public getOrders():any {
		return this._data.get("orders");
	}
			
	public setMinGunId(minGunId:any):void {
		this._data.set("minGunId", minGunId);
	}

	public getMinGunId():any {
		return this._data.get("minGunId");
	}
			
	public getPID():number {
		return 1010;
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
			