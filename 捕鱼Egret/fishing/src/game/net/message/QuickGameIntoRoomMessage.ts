//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class QuickGameIntoRoomMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);   
		this._clazz = builder.build("QuickGameIntoRoom");     
	}			
	
	public setCurNum(curNum:any):void {
		this._data.set("curNum", curNum);
	}

	public getCurNum():any {
		return this._data.get("curNum");
	}
			
	public setEndSec(endSec:any):void {
		this._data.set("endSec", endSec);
	}

	public getEndSec():any {
		return this._data.get("endSec");
	}
			
	public getPID():number {
		return 3034;
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
			