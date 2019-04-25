//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class WeChatShareInfoMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("WeChatShareInfo");     
	}			
	
	public setNewbieAwardState(newbieAwardState:any):void {
		this._data.set("newbieAwardState", newbieAwardState);
	}

	public getNewbieAwardState():any {
		return this._data.get("newbieAwardState");
	}
			
	public setInvitedUserNum(invitedUserNum:any):void {
		this._data.set("invitedUserNum", invitedUserNum);
	}

	public getInvitedUserNum():any {
		return this._data.get("invitedUserNum");
	}
			
	public setTodayShareTimes(todayShareTimes:any):void {
		this._data.set("todayShareTimes", todayShareTimes);
	}

	public getTodayShareTimes():any {
		return this._data.get("todayShareTimes");
	}
			
	public getPID():number {
		return 2065;
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
			