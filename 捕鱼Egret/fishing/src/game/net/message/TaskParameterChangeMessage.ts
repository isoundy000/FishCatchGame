//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class TaskParameterChangeMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("TaskParameterChange");     
	}			
	
	public setChangedTasks(changedTasks:any):void {
		this._data.set("changedTasks", changedTasks);
	}

	public getChangedTasks():any {
		return this._data.get("changedTasks");
	}
			
	public setArenaTaskTimes(arenaTaskTimes:any):void {
		this._data.set("arenaTaskTimes", arenaTaskTimes);
	}

	public getArenaTaskTimes():any {
		return this._data.get("arenaTaskTimes");
	}
			
	public setPirateTaskEndTime(pirateTaskEndTime:any):void {
		this._data.set("pirateTaskEndTime", pirateTaskEndTime);
	}

	public getPirateTaskEndTime():any {
		return this._data.get("pirateTaskEndTime");
	}
			
	public getPID():number {
		return 2032;
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
			