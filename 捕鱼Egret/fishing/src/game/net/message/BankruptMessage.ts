//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class BankruptMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("Bankrupt");     
	}			
	
	public setState(state:any):void {
		this._data.set("state", state);
	}

	public getState():any {
		return this._data.get("state");
	}
			
	public setCanReliefTime(canReliefTime:any):void {
		this._data.set("canReliefTime", canReliefTime);
	}

	public getCanReliefTime():any {
		return this._data.get("canReliefTime");
	}
			
	public setCoins(coins:any):void {
		this._data.set("coins", coins);
	}

	public getCoins():any {
		return this._data.get("coins");
	}
			
	public setUserId(userId:any):void {
		this._data.set("userId", userId);
	}

	public getUserId():any {
		return this._data.get("userId");
	}
			
	public getPID():number {
		return 2017;
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
			