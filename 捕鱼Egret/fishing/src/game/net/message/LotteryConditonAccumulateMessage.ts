//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class LotteryConditonAccumulateMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);   
		this._clazz = builder.build("LotteryConditonAccumulate");     
	}			
	
	public setIntegral(integral:any):void {
		this._data.set("integral", integral);
	}

	public getIntegral():any {
		return this._data.get("integral");
	}
			
	public setKillNum(killNum:any):void {
		this._data.set("killNum", killNum);
	}

	public getKillNum():any {
		return this._data.get("killNum");
	}
			
	public setTodayDrawTimes(todayDrawTimes:any):void {
		this._data.set("todayDrawTimes", todayDrawTimes);
	}

	public getTodayDrawTimes():any {
		return this._data.get("todayDrawTimes");
	}
			
	public getPID():number {
		return 3017;
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
			