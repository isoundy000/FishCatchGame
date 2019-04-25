class MessageBase {
	
	private _pid:number = 0;
	
	public constructor() {
	}

	public setPID(pid:number):void {
		this._pid = pid;
	}

	public getPID():number {
		return this._pid;
	}

	public toByteArray():egret.ByteArray {
		return null;
	}

	public setData(buff:egret.ByteArray):void {
	
	}

	public initData():void {

	}
}