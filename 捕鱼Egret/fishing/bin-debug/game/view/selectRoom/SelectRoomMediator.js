var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SelectRoomMediator = (function (_super) {
    __extends(SelectRoomMediator, _super);
    function SelectRoomMediator(view) {
        return _super.call(this, view) || this;
    }
    SelectRoomMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        this.getView().initView();
        this.subscrib(NotifyEnum.ROOMLIST_RESOUCE_LOADED, this.onResouceLoaded);
    };
    SelectRoomMediator.prototype.onResouceLoaded = function (obj, target) {
        var self = target;
        //监听服务器房间信息
        game.net.MessageDispatcher.register(game.net.ResponseType.MANUALCHOOSEROOMBACK, function (msg) {
            self.getRoomList(msg);
        });
        //首次进入发送-1索引的消息
        self.sendLeftRoom(-1);
    };
    //发送换区请求
    SelectRoomMediator.prototype.sendLeftRoom = function (nId) {
        var req = new ManualChooseRoomSendMessage();
        req.initData();
        req.setServerId(nId);
        NetManager.send(req);
    };
    //获取区域返回列表
    SelectRoomMediator.prototype.getRoomList = function (msg) {
        var view = this.getView();
        var leftRoomList = msg.getServerInfo();
        //required uint32 serverId = 1;
        //required uint32 state = 2;//1流畅(0<100)，2繁忙(101<150)，3拥挤(151~180)，4满员(181~200)
        var rightRoomList = msg.getRoomInfo();
        //required uint32 roomId = 1;
        //required uint32 userCount = 2;
        if (leftRoomList.length != 0) {
            view.showLeftList(leftRoomList);
            view.showRightList(rightRoomList);
        }
        else {
            if (rightRoomList.length == 1) {
                view.updateRightItem(rightRoomList[0]);
            }
            else {
                view.showRightList(rightRoomList);
            }
        }
    };
    SelectRoomMediator.prototype.destroy = function () {
        this.getView().destroy();
        //移除消息监听
        game.net.MessageDispatcher.unregister(game.net.ResponseType.MANUALCHOOSEROOMBACK);
        //
        this.unsubscribByType(NotifyEnum.ROOMLIST_RESOUCE_LOADED);
    };
    return SelectRoomMediator;
}(burn.mediator.SimpleMediator));
__reflect(SelectRoomMediator.prototype, "SelectRoomMediator");
//# sourceMappingURL=SelectRoomMediator.js.map