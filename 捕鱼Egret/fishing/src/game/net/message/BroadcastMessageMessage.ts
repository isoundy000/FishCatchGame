//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class BroadcastMessageMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.common);   
		this._clazz = builder.build("BroadcastMessage");     
	}			
	
	public setBroadType(broadType:any):void {
		this._data.set("broadType", broadType);
	}

	public getBroadType():any {
		return this._data.get("broadType");
	}
			
	public setMsg(msg:any):void {
		this._data.set("msg", msg);
	}

	public getMsg():any {
		return this._data.get("msg");
	}
			
	public setLangId(langId:any):void {
		this._data.set("langId", langId);
	}

	public getLangId():any {
		return this._data.get("langId");
	}
			
	public setParams(params:any):void {
		this._data.set("params", params);
	}

	public getParams():any {
		return this._data.get("params");
	}
			
	public getPID():number {
		return 1007;
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
			