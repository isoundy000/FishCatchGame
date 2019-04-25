module burn.net {
	export class SocketManager {

		private static _socket:egret.WebSocket = null;

		//连接创建成功回调
		private static _onOpen:Function = null;
		//消息关闭回调
		private static _onClosed:Function = null;
		//消息返回回调
		private static _onReceive:Function = null;

		public constructor() {
			throw(new burn.error.SimpleError("SocketManager can't call constructor!"));
		}

		public static initSocket(addr:string, port:number, type:string = egret.WebSocket.TYPE_BINARY,
								 onOpen:Function = null, onReceive:Function = null, onClosed:Function = null):void {
			this._onOpen = onOpen;
			this._onClosed = onClosed;
			this._onReceive = onReceive;			

			this._socket = new egret.WebSocket();
			this._socket.type = type;
			this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);                            
    		this._socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);    
			this._socket.addEventListener(egret.Event.CLOSE, this.onSocketClosed, this);  
			
			this._socket.connectByUrl("ws://" + addr + ":" + port + "/ws");
			
		}

		public static resetSocket():void {
			this._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
			this._socket.removeEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
			this._socket.removeEventListener(egret.Event.CLOSE, this.onSocketClosed, this);
			this._socket.close();
		}

		public static send(msg:egret.ByteArray):void {
			// this._socket.writeBytes(msg);
		}

		private static onSocketOpen():void {       
			this._onOpen && this._onOpen();
		}

		private static onReceiveMessage(e:egret.Event):void {    
			let btyearray: egret.ByteArray = new egret.ByteArray();
			this._socket.readBytes(btyearray);
			this._onReceive && this._onReceive(btyearray);
		}

		private static onSocketClosed():void {       
			this._onClosed && this._onClosed();
		}
	}
}