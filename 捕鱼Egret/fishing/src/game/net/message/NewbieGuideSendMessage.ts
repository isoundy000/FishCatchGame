//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class NewbieGuideSendMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("NewbieGuideSend");     
	}			
	
	public setGuideId(guideId:any):void {
		this._data.set("guideId", guideId);
	}

	public getGuideId():any {
		return this._data.get("guideId");
	}
			
	public getPID():number {
		return 2031;
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
			