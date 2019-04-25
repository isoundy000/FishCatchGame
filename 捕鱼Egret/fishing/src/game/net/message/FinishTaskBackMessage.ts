//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class FinishTaskBackMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("FinishTaskBack");     
	}			
	
	public setState(state:any):void {
		this._data.set("state", state);
	}

	public getState():any {
		return this._data.get("state");
	}
			
	public setTaskId(taskId:any):void {
		this._data.set("taskId", taskId);
	}

	public getTaskId():any {
		return this._data.get("taskId");
	}
			
	public setTaskAward(taskAward:any):void {
		this._data.set("taskAward", taskAward);
	}

	public getTaskAward():any {
		return this._data.get("taskAward");
	}
			
	public setNewTaskId(newTaskId:any):void {
		this._data.set("newTaskId", newTaskId);
	}

	public getNewTaskId():any {
		return this._data.get("newTaskId");
	}
			
	public getPID():number {
		return 2034;
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
			