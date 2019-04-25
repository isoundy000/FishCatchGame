//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class MailMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("Mail");     
	}			
	
	public setMailId(mailId:any):void {
		this._data.set("mailId", mailId);
	}

	public getMailId():any {
		return this._data.get("mailId");
	}
			
	public setMailType(mailType:any):void {
		this._data.set("mailType", mailType);
	}

	public getMailType():any {
		return this._data.get("mailType");
	}
			
	public setUserId(userId:any):void {
		this._data.set("userId", userId);
	}

	public getUserId():any {
		return this._data.get("userId");
	}
			
	public setReceiveUserName(receiveUserName:any):void {
		this._data.set("receiveUserName", receiveUserName);
	}

	public getReceiveUserName():any {
		return this._data.get("receiveUserName");
	}
			
	public setSendUserId(sendUserId:any):void {
		this._data.set("sendUserId", sendUserId);
	}

	public getSendUserId():any {
		return this._data.get("sendUserId");
	}
			
	public setSendUserName(sendUserName:any):void {
		this._data.set("sendUserName", sendUserName);
	}

	public getSendUserName():any {
		return this._data.get("sendUserName");
	}
			
	public setItems(items:any):void {
		this._data.set("items", items);
	}

	public getItems():any {
		return this._data.get("items");
	}
			
	public setTime(time:any):void {
		this._data.set("time", time);
	}

	public getTime():any {
		return this._data.get("time");
	}
			
	public setState(state:any):void {
		this._data.set("state", state);
	}

	public getState():any {
		return this._data.get("state");
	}
			
	public setMailContent(mailContent:any):void {
		this._data.set("mailContent", mailContent);
	}

	public getMailContent():any {
		return this._data.get("mailContent");
	}
			
	public setMailTitle(mailTitle:any):void {
		this._data.set("mailTitle", mailTitle);
	}

	public getMailTitle():any {
		return this._data.get("mailTitle");
	}
			
	public getPID():number {
		return 2018;
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
			