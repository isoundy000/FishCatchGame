//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class GiveItemSendMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("GiveItemSend");     
	}			
	
	public setReceiveUserId(receiveUserId:any):void {
		this._data.set("receiveUserId", receiveUserId);
	}

	public getReceiveUserId():any {
		return this._data.get("receiveUserId");
	}
			
	public setGiveItem(giveItem:any):void {
		this._data.set("giveItem", giveItem);
	}

	public getGiveItem():any {
		return this._data.get("giveItem");
	}
			
	public getPID():number {
		return 2023;
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
			