//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class PirateRankResultMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);   
		this._clazz = builder.build("PirateRankResult");     
	}			
	
	public setType(type:any):void {
		this._data.set("type", type);
	}

	public getType():any {
		return this._data.get("type");
	}
			
	public setRank(rank:any):void {
		this._data.set("rank", rank);
	}

	public getRank():any {
		return this._data.get("rank");
	}
			
	public setAward(award:any):void {
		this._data.set("award", award);
	}

	public getAward():any {
		return this._data.get("award");
	}
			
	public getPID():number {
		return 3037;
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
			