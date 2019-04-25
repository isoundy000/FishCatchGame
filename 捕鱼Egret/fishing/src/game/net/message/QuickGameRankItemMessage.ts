//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class QuickGameRankItemMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);   
		this._clazz = builder.build("QuickGameRankItem");     
	}			
	
	public setUserId(userId:any):void {
		this._data.set("userId", userId);
	}

	public getUserId():any {
		return this._data.get("userId");
	}
			
	public setName(name:any):void {
		this._data.set("name", name);
	}

	public getName():any {
		return this._data.get("name");
	}
			
	public setRank(rank:any):void {
		this._data.set("rank", rank);
	}

	public getRank():any {
		return this._data.get("rank");
	}
			
	public setIntegral(integral:any):void {
		this._data.set("integral", integral);
	}

	public getIntegral():any {
		return this._data.get("integral");
	}
			
	public setBulletNum(bulletNum:any):void {
		this._data.set("bulletNum", bulletNum);
	}

	public getBulletNum():any {
		return this._data.get("bulletNum");
	}
			
	public getPID():number {
		return 3032;
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
			