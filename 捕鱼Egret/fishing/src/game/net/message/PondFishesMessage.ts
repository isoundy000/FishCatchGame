//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class PondFishesMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);   
		this._clazz = builder.build("PondFishes");     
	}			
	
	public setFishes(fishes:any):void {
		this._data.set("fishes", fishes);
	}

	public getFishes():any {
		return this._data.get("fishes");
	}
			
	public getPID():number {
		return 3007;
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
			