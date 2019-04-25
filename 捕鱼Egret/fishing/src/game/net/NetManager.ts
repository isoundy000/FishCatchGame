class NetManager {

	private static _net:NetManager = null;
	
	//消息最大长度
	private static MESSAGE_LEN:number = 128 * 1024;

	public constructor() {
		throw(new burn.error.SimpleError("NetManager can't call constructor!"));
	}

	public static initNet(addr:string, port:number, onOpenCallback:Function):void {
		game.net.ResponseType.init();
		burn.net.SocketManager.initSocket(addr, port, egret.WebSocket.TYPE_BINARY, onOpenCallback, this.onReceive, this.onClosed);
	}

	public static resetNet(addr:string, port:number, onOpenCallback:Function):void {
		burn.net.SocketManager.resetSocket();
		burn.net.SocketManager.initSocket(addr, port, egret.WebSocket.TYPE_BINARY, onOpenCallback, this.onReceive, this.onClosed);
	}

	public static send(message:MessageBase):void {
		let mss = new egret.ByteArray();
		//=============================================================
		//tag
		mss.writeByte(1);
		// 数据编码格式
		mss.writeByte(1);
		// 加密类型
		mss.writeByte(1);
		// 用于扩展协议
		mss.writeByte(1);
		// 协议类型
		mss.writeByte(1);
		// 协议ID
		mss.writeInt(message.getPID());
		// 发送时间
		mss.writeInt(1);
		let data = message.toByteArray();
		//消息长度
		mss.writeInt(data.length);
		//=============================================================
		mss.writeBytes(data);
		burn.net.SocketManager.send(mss);
	}

	private static onOpen():void {
		
	}
 
	private static onClosed():void {
		game.util.GameUtil.openConfirm(null, function():void {
			NetManager.resetNet(CONFIG.SERVER_IP, CONFIG.SERVER_PORT, function():void {
                GlobalManager.getInstance().reConnect2Server();
            });
		}, this, game.util.Language.getText(64));
	}

	private static onReceive(btyearray:egret.ByteArray):void {

		let msgBuff: ArrayBuffer;
		let b1 = btyearray.readByte();
		let b2 = btyearray.readByte();
		let b3 = btyearray.readByte();
		let b4 = btyearray.readByte();
		let b5 = btyearray.readByte();
		let pid = btyearray.readInt();
		let time = btyearray.readInt();
		let lent = btyearray.readInt();

		let barr: egret.ByteArray = new egret.ByteArray();
		btyearray.readBytes(barr);

		let len = barr.buffer.byteLength;
		let dataView = new DataView(barr.buffer);
		let pbView = new DataView(new ArrayBuffer(len));
		for (let i = 0;i < len;i++) {
			pbView.setInt8(i,dataView.getInt8(i));
		}
		msgBuff = pbView.buffer;
		//初始化返回对象
		let clazz = game.net.ResponseType.responseList.get(pid);
		let isObj = false;
		if(clazz instanceof MessageBase) {
			isObj = true;
		}
		if(isObj) {
			clazz.setData(msgBuff);
			//派发消息
			game.net.MessageDispatcher.dispatch(pid, clazz);
		} else {
			let res = new clazz();
			res.setData(msgBuff);
			//派发消息
			game.net.MessageDispatcher.dispatch(pid, res);
		}
	}
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     