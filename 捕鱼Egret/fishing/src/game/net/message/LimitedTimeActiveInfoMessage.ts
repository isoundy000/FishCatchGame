//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class LimitedTimeActiveInfoMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("LimitedTimeActiveInfo");     
	}			
	
	public setSendAwardActiveInfo(sendAwardActiveInfo:any):void {
		this._data.set("sendAwardActiveInfo", sendAwardActiveInfo);
	}

	public getSendAwardActiveInfo():any {
		return this._data.get("sendAwardActiveInfo");
	}
			
	public setSecretShopActiveInfo(secretShopActiveInfo:any):void {
		this._data.set("secretShopActiveInfo", secretShopActiveInfo);
	}

	public getSecretShopActiveInfo():any {
		return this._data.get("secretShopActiveInfo");
	}
			
	public setActiveCoin(activeCoin:any):void {
		this._data.set("activeCoin", activeCoin);
	}

	public getActiveCoin():any {
		return this._data.get("activeCoin");
	}
			
	public getPID():number {
		return 2061;
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
			