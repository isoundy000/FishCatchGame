//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class ExchangeSendMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("ExchangeSend");     
	}			
	
	public setGoodsId(goodsId:any):void {
		this._data.set("goodsId", goodsId);
	}

	public getGoodsId():any {
		return this._data.get("goodsId");
	}
			
	public setReceiverName(receiverName:any):void {
		this._data.set("receiverName", receiverName);
	}

	public getReceiverName():any {
		return this._data.get("receiverName");
	}
			
	public setReceiverPhone(receiverPhone:any):void {
		this._data.set("receiverPhone", receiverPhone);
	}

	public getReceiverPhone():any {
		return this._data.get("receiverPhone");
	}
			
	public setReceiverQQ(receiverQQ:any):void {
		this._data.set("receiverQQ", receiverQQ);
	}

	public getReceiverQQ():any {
		return this._data.get("receiverQQ");
	}
			
	public setReceiverAddress(receiverAddress:any):void {
		this._data.set("receiverAddress", receiverAddress);
	}

	public getReceiverAddress():any {
		return this._data.get("receiverAddress");
	}
			
	public setReceiverWX(receiverWX:any):void {
		this._data.set("receiverWX", receiverWX);
	}

	public getReceiverWX():any {
		return this._data.get("receiverWX");
	}
			
	public setReceiverZFB(receiverZFB:any):void {
		this._data.set("receiverZFB", receiverZFB);
	}

	public getReceiverZFB():any {
		return this._data.get("receiverZFB");
	}
			
	public getPID():number {
		return 2027;
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
			