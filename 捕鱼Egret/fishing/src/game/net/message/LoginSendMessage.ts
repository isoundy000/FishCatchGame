//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class LoginSendMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("LoginSend");     
	}			
	
	public setId(id:any):void {
		this._data.set("id", id);
	}

	public getId():any {
		return this._data.get("id");
	}
			
	public setAccount(account:any):void {
		this._data.set("account", account);
	}

	public getAccount():any {
		return this._data.get("account");
	}
			
	public setPlatform(platform:any):void {
		this._data.set("platform", platform);
	}

	public getPlatform():any {
		return this._data.get("platform");
	}
			
	public setSecret(secret:any):void {
		this._data.set("secret", secret);
	}

	public getSecret():any {
		return this._data.get("secret");
	}
			
	public getPID():number {
		return 2001;
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
			