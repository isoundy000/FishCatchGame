//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class WorldBossInfoBackMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);   
		this._clazz = builder.build("WorldBossInfoBack");     
	}			
	
	public setBossId(bossId:any):void {
		this._data.set("bossId", bossId);
	}

	public getBossId():any {
		return this._data.get("bossId");
	}
			
	public setFishId(fishId:any):void {
		this._data.set("fishId", fishId);
	}

	public getFishId():any {
		return this._data.get("fishId");
	}
			
	public setState(state:any):void {
		this._data.set("state", state);
	}

	public getState():any {
		return this._data.get("state");
	}
			
	public setTime(time:any):void {
		this._data.set("time", time);
	}

	public getTime():any {
		return this._data.get("time");
	}
			
	public setShieldMax(shieldMax:any):void {
		this._data.set("shieldMax", shieldMax);
	}

	public getShieldMax():any {
		return this._data.get("shieldMax");
	}
			
	public setCurShieldValue(curShieldValue:any):void {
		this._data.set("curShieldValue", curShieldValue);
	}

	public getCurShieldValue():any {
		return this._data.get("curShieldValue");
	}
			
	public setUserId(userId:any):void {
		this._data.set("userId", userId);
	}

	public getUserId():any {
		return this._data.get("userId");
	}
			
	public setItems(items:any):void {
		this._data.set("items", items);
	}

	public getItems():any {
		return this._data.get("items");
	}
			
	public getPID():number {
		return 3035;
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
			