//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class MajorParameterChangeMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("MajorParameterChange");     
	}			
	
	public setUserId(userId:any):void {
		this._data.set("userId", userId);
	}

	public getUserId():any {
		return this._data.get("userId");
	}
			
	public setCoins(coins:any):void {
		this._data.set("coins", coins);
	}

	public getCoins():any {
		return this._data.get("coins");
	}
			
	public setGems(gems:any):void {
		this._data.set("gems", gems);
	}

	public getGems():any {
		return this._data.get("gems");
	}
			
	public setLevel(level:any):void {
		this._data.set("level", level);
	}

	public getLevel():any {
		return this._data.get("level");
	}
			
	public setItem(item:any):void {
		this._data.set("item", item);
	}

	public getItem():any {
		return this._data.get("item");
	}
			
	public setCoupon(coupon:any):void {
		this._data.set("coupon", coupon);
	}

	public getCoupon():any {
		return this._data.get("coupon");
	}
			
	public getPID():number {
		return 2010;
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
			