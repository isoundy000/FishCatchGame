//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class ChargeSendMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("ChargeSend");     
	}			
	
	public setChargeId(chargeId:any):void {
		this._data.set("chargeId", chargeId);
	}

	public getChargeId():any {
		return this._data.get("chargeId");
	}
			
	public getPID():number {
		return 2037;
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
			