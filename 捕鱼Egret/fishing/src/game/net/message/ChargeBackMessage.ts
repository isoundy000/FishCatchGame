//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class ChargeBackMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("ChargeBack");     
	}			
	
	public setState(state:any):void {
		this._data.set("state", state);
	}

	public getState():any {
		return this._data.get("state");
	}
			
	public setIsFirst(isFirst:any):void {
		this._data.set("isFirst", isFirst);
	}

	public getIsFirst():any {
		return this._data.get("isFirst");
	}
			
	public setChargeId(chargeId:any):void {
		this._data.set("chargeId", chargeId);
	}

	public getChargeId():any {
		return this._data.get("chargeId");
	}
			
	public setCurCoupon(curCoupon:any):void {
		this._data.set("curCoupon", curCoupon);
	}

	public getCurCoupon():any {
		return this._data.get("curCoupon");
	}
			
	public setMonthEndTime(monthEndTime:any):void {
		this._data.set("monthEndTime", monthEndTime);
	}

	public getMonthEndTime():any {
		return this._data.get("monthEndTime");
	}
			
	public setVipExp(vipExp:any):void {
		this._data.set("vipExp", vipExp);
	}

	public getVipExp():any {
		return this._data.get("vipExp");
	}
			
	public setVipLevel(vipLevel:any):void {
		this._data.set("vipLevel", vipLevel);
	}

	public getVipLevel():any {
		return this._data.get("vipLevel");
	}
			
	public getPID():number {
		return 2038;
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
			