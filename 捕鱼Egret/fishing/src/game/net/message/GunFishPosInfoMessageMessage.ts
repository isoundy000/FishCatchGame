//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class GunFishPosInfoMessageMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);   
		this._clazz = builder.build("GunFishPosInfoMessage");     
	}			
	
	public setFishPostList(fishPostList:any):void {
		this._data.set("fishPostList", fishPostList);
	}

	public getFishPostList():any {
		return this._data.get("fishPostList");
	}
			
	public getPID():number {
		return 3011;
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
			