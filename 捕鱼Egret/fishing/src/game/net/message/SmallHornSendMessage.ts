//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class SmallHornSendMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.fishing);   
		this._clazz = builder.build("SmallHornSend");     
	}			
	
	public setWords(words:any):void {
		this._data.set("words", words);
	}

	public getWords():any {
		return this._data.get("words");
	}
			
	public getPID():number {
		return 3041;
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
			