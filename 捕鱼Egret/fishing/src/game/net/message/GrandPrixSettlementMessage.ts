//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class GrandPrixSettlementMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("GrandPrixSettlement");     
	}			
	
	public setBeforeIntegral(beforeIntegral:any):void {
		this._data.set("beforeIntegral", beforeIntegral);
	}

	public getBeforeIntegral():any {
		return this._data.get("beforeIntegral");
	}
			
	public setGunPlus(gunPlus:any):void {
		this._data.set("gunPlus", gunPlus);
	}

	public getGunPlus():any {
		return this._data.get("gunPlus");
	}
			
	public setVipPlus(vipPlus:any):void {
		this._data.set("vipPlus", vipPlus);
	}

	public getVipPlus():any {
		return this._data.get("vipPlus");
	}
			
	public setTimesPlus(timesPlus:any):void {
		this._data.set("timesPlus", timesPlus);
	}

	public getTimesPlus():any {
		return this._data.get("timesPlus");
	}
			
	public setAfterIntegral(afterIntegral:any):void {
		this._data.set("afterIntegral", afterIntegral);
	}

	public getAfterIntegral():any {
		return this._data.get("afterIntegral");
	}
			
	public setItem(item:any):void {
		this._data.set("item", item);
	}

	public getItem():any {
		return this._data.get("item");
	}
			
	public setRoomtType(roomtType:any):void {
		this._data.set("roomtType", roomtType);
	}

	public getRoomtType():any {
		return this._data.get("roomtType");
	}
			
	public setCurRank(curRank:any):void {
		this._data.set("curRank", curRank);
	}

	public getCurRank():any {
		return this._data.get("curRank");
	}
			
	public getPID():number {
		return 2056;
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
			