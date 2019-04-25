//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class AddFishMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);   
		this._clazz = builder.build("AddFish");     
	}			
	
	public setType(type:any):void {
		this._data.set("type", type);
	}

	public getType():any {
		return this._data.get("type");
	}
			
	public setFishId(fishId:any):void {
		this._data.set("fishId", fishId);
	}

	public getFishId():any {
		return this._data.get("fishId");
	}
			
	public setPathId(pathId:any):void {
		this._data.set("pathId", pathId);
	}

	public getPathId():any {
		return this._data.get("pathId");
	}
			
	public setUniId(uniId:any):void {
		this._data.set("uniId", uniId);
	}

	public getUniId():any {
		return this._data.get("uniId");
	}
			
	public setCoordinate(coordinate:any):void {
		this._data.set("coordinate", coordinate);
	}

	public getCoordinate():any {
		return this._data.get("coordinate");
	}
			
	public setAliveTime(aliveTime:any):void {
		this._data.set("aliveTime", aliveTime);
	}

	public getAliveTime():any {
		return this._data.get("aliveTime");
	}
			
	public getPID():number {
		return 3008;
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
			