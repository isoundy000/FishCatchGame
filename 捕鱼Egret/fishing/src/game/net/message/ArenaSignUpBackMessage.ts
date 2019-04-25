//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class ArenaSignUpBackMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);   
		this._clazz = builder.build("ArenaSignUpBack");     
	}			
	
	public setType(type:any):void {
		this._data.set("type", type);
	}

	public getType():any {
		return this._data.get("type");
	}
			
	public setState(state:any):void {
		this._data.set("state", state);
	}

	public getState():any {
		return this._data.get("state");
	}
			
	public setGrandPrixIntegral(grandPrixIntegral:any):void {
		this._data.set("grandPrixIntegral", grandPrixIntegral);
	}

	public getGrandPrixIntegral():any {
		return this._data.get("grandPrixIntegral");
	}
			
	public setGrandPrixBulletNum(grandPrixBulletNum:any):void {
		this._data.set("grandPrixBulletNum", grandPrixBulletNum);
	}

	public getGrandPrixBulletNum():any {
		return this._data.get("grandPrixBulletNum");
	}
			
	public getPID():number {
		return 3028;
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
			