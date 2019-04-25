//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class FishPosInfoMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);   
		this._clazz = builder.build("FishPosInfo");     
	}			
	
	public setGroupId(groupId:any):void {
		this._data.set("groupId", groupId);
	}

	public getGroupId():any {
		return this._data.get("groupId");
	}
			
	public setFishId(fishId:any):void {
		this._data.set("fishId", fishId);
	}

	public getFishId():any {
		return this._data.get("fishId");
	}
			
	public setPos(pos:any):void {
		this._data.set("pos", pos);
	}

	public getPos():any {
		return this._data.get("pos");
	}
			
	public getPID():number {
		return 3040;
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
			