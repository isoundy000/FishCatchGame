var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NetManager = (function () {
    function NetManager() {
        throw (new burn.error.SimpleError("NetManager can't call constructor!"));
    }
    NetManager.initNet = function (addr, port, onOpenCallback) {
        game.net.ResponseType.init();
        burn.net.SocketManager.initSocket(addr, port, egret.WebSocket.TYPE_BINARY, onOpenCallback, this.onReceive, this.onClosed);
    };
    NetManager.resetNet = function (addr, port, onOpenCallback) {
        burn.net.SocketManager.resetSocket();
        burn.net.SocketManager.initSocket(addr, port, egret.WebSocket.TYPE_BINARY, onOpenCallback, this.onReceive, this.onClosed);
    };
    NetManager.send = function (message) {
        var mss = new egret.ByteArray();
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
        var data = message.toByteArray();
        //消息长度
        mss.writeInt(data.length);
        //=============================================================
        mss.writeBytes(data);
        burn.net.SocketManager.send(mss);
    };
    NetManager.onOpen = function () {
    };
    NetManager.onClosed = function () {
        game.util.GameUtil.openConfirm(null, function () {
            NetManager.resetNet(CONFIG.SERVER_IP, CONFIG.SERVER_PORT, function () {
                GlobalManager.getInstance().reConnect2Server();
            });
        }, this, game.util.Language.getText(64));
    };
    NetManager.onReceive = function (btyearray) {
        var msgBuff;
        var b1 = btyearray.readByte();
        var b2 = btyearray.readByte();
        var b3 = btyearray.readByte();
        var b4 = btyearray.readByte();
        var b5 = btyearray.readByte();
        var pid = btyearray.readInt();
        var time = btyearray.readInt();
        var lent = btyearray.readInt();
        var barr = new egret.ByteArray();
        btyearray.readBytes(barr);
        var len = barr.buffer.byteLength;
        var dataView = new DataView(barr.buffer);
        var pbView = new DataView(new ArrayBuffer(len));
        for (var i = 0; i < len; i++) {
            pbView.setInt8(i, dataView.getInt8(i));
        }
        msgBuff = pbView.buffer;
        //初始化返回对象
        var clazz = game.net.ResponseType.responseList.get(pid);
        var isObj = false;
        if (clazz instanceof MessageBase) {
            isObj = true;
        }
        if (isObj) {
            clazz.setData(msgBuff);
            //派发消息
            game.net.MessageDispatcher.dispatch(pid, clazz);
        }
        else {
            var res = new clazz();
            res.setData(msgBuff);
            //派发消息
            game.net.MessageDispatcher.dispatch(pid, res);
        }
    };
    return NetManager;
}());
NetManager._net = null;
//消息最大长度
NetManager.MESSAGE_LEN = 128 * 1024;
__reflect(NetManager.prototype, "NetManager");
//# sourceMappingURL=NetManager.js.map