var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var burn;
(function (burn) {
    var net;
    (function (net) {
        var SocketManager = (function () {
            function SocketManager() {
                throw (new burn.error.SimpleError("SocketManager can't call constructor!"));
            }
            SocketManager.initSocket = function (addr, port, type, onOpen, onReceive, onClosed) {
                if (type === void 0) { type = egret.WebSocket.TYPE_BINARY; }
                if (onOpen === void 0) { onOpen = null; }
                if (onReceive === void 0) { onReceive = null; }
                if (onClosed === void 0) { onClosed = null; }
                this._onOpen = onOpen;
                this._onClosed = onClosed;
                this._onReceive = onReceive;
                this._socket = new egret.WebSocket();
                this._socket.type = type;
                this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
                this._socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
                this._socket.addEventListener(egret.Event.CLOSE, this.onSocketClosed, this);
                this._socket.connectByUrl("ws://" + addr + ":" + port + "/ws");
            };
            SocketManager.resetSocket = function () {
                this._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
                this._socket.removeEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
                this._socket.removeEventListener(egret.Event.CLOSE, this.onSocketClosed, this);
                this._socket.close();
            };
            SocketManager.send = function (msg) {
                // this._socket.writeBytes(msg);
            };
            SocketManager.onSocketOpen = function () {
                this._onOpen && this._onOpen();
            };
            SocketManager.onReceiveMessage = function (e) {
                var btyearray = new egret.ByteArray();
                this._socket.readBytes(btyearray);
                this._onReceive && this._onReceive(btyearray);
            };
            SocketManager.onSocketClosed = function () {
                this._onClosed && this._onClosed();
            };
            return SocketManager;
        }());
        SocketManager._socket = null;
        //连接创建成功回调
        SocketManager._onOpen = null;
        //消息关闭回调
        SocketManager._onClosed = null;
        //消息返回回调
        SocketManager._onReceive = null;
        net.SocketManager = SocketManager;
        __reflect(SocketManager.prototype, "burn.net.SocketManager");
    })(net = burn.net || (burn.net = {}));
})(burn || (burn = {}));
//# sourceMappingURL=SocketManager.js.map