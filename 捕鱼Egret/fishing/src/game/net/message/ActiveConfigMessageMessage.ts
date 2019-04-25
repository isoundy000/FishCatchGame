//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class ActiveConfigMessageMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.common);   
		this._clazz = builder.build("ActiveConfigMessage");     
	}			
	
	public setId(id:any):void {
		this._data.set("id", id);
	}

	public getId():any {
		return this._data.get("id");
	}
			
	public setType(type:any):void {
		this._data.set("type", type);
	}

	public getType():any {
		return this._data.get("type");
	}
			
	public setStartTime(startTime:any):void {
		this._data.set("startTime", startTime);
	}

	public getStartTime():any {
		return this._data.get("startTime");
	}
			
	public setEndTime(endTime:any):void {
		this._data.set("endTime", endTime);
	}

	public getEndTime():any {
		return this._data.get("endTime");
	}
			
	public setActiveState(activeState:any):void {
		this._data.set("activeState", activeState);
	}

	public getActiveState():any {
		return this._data.get("activeState");
	}
			
	public setParameter1(parameter1:any):void {
		this._data.set("parameter1", parameter1);
	}

	public getParameter1():any {
		return this._data.get("parameter1");
	}
			
	public setParameter2(parameter2:any):void {
		this._data.set("parameter2", parameter2);
	}

	public getParameter2():any {
		return this._data.get("parameter2");
	}
			
	public setDescVip(descVip:any):void {
		this._data.set("descVip", descVip);
	}

	public getDescVip():any {
		return this._data.get("descVip");
	}
			
	public setNameUrl(nameUrl:any):void {
		this._data.set("nameUrl", nameUrl);
	}

	public getNameUrl():any {
		return this._data.get("nameUrl");
	}
			
	public setOrder(order:any):void {
		this._data.set("order", order);
	}

	public getOrder():any {
		return this._data.get("order");
	}
			
	public getPID():number {
		return 1017;
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
			