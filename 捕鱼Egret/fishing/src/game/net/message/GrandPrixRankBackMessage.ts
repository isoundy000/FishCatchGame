//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class GrandPrixRankBackMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("GrandPrixRankBack");     
	}			
	
	public setMyData(myData:any):void {
		this._data.set("myData", myData);
	}

	public getMyData():any {
		return this._data.get("myData");
	}
			
	public setWeekData(weekData:any):void {
		this._data.set("weekData", weekData);
	}

	public getWeekData():any {
		return this._data.get("weekData");
	}
			
	public setDayData(dayData:any):void {
		this._data.set("dayData", dayData);
	}

	public getDayData():any {
		return this._data.get("dayData");
	}
			
	public setWeekIntegral(weekIntegral:any):void {
		this._data.set("weekIntegral", weekIntegral);
	}

	public getWeekIntegral():any {
		return this._data.get("weekIntegral");
	}
			
	public setRoomtType(roomtType:any):void {
		this._data.set("roomtType", roomtType);
	}

	public getRoomtType():any {
		return this._data.get("roomtType");
	}
			
	public getPID():number {
		return 2054;
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
			