var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RoomModel = (function (_super) {
    __extends(RoomModel, _super);
    function RoomModel() {
        return _super.call(this) || this;
    }
    RoomModel.prototype.init = function () {
        this._roomerList = new Array();
        this._fishList = new Array();
    };
    //向房间添加玩家
    RoomModel.prototype.addRoomer = function (roomer) {
        if (this._roomerList.length < 4) {
            this._roomerList.push(roomer);
        }
        else {
            console.error("房间人数已满!");
        }
    };
    //将玩家移除房间
    RoomModel.prototype.removeRoomer = function (roomer) {
        for (var i = 0; i < this._roomerList.length; i++) {
            if (this._roomerList[i].getUserId() == roomer.getUserId()) {
                this._roomerList.splice(i, 1);
                break;
            }
        }
    };
    //根据userId获取roomer对象
    RoomModel.prototype.getRoomerById = function (uid) {
        var len = this._roomerList.length;
        for (var i = 0; i < len; i++) {
            if (this._roomerList[i].getUserId() == uid) {
                return this._roomerList[i];
            }
        }
        return null;
    };
    //根据位置。获取roomer对象
    RoomModel.prototype.getRoomerByPos = function (pos) {
        var len = this._roomerList.length;
        for (var i = 0; i < len; i++) {
            if (this._roomerList[i].getRoomPos() == pos) {
                return this._roomerList[i];
            }
        }
        return null;
    };
    //获取房间内的玩家
    RoomModel.prototype.getRoomerList = function () {
        return this._roomerList;
    };
    //初始化房间中已存在的鱼
    RoomModel.prototype.addRoomLiveFish = function (fish) {
        this._fishList.push(fish);
    };
    //判断房间内已有的鱼是否有重复路径
    RoomModel.prototype.isPathExist = function (pathId) {
        for (var i = 0; i < this._fishList.length; i++) {
            var fish = this._fishList[i];
            if (fish.pathId == pathId) {
                return true;
            }
        }
        return false;
    };
    //获取房间内已存在的鱼
    RoomModel.prototype.getFishList = function () {
        return this._fishList;
    };
    //塞入凤凰的对象
    RoomModel.prototype.setPhoenix = function (obj) {
        this._phoenixObj = obj;
    };
    //获取凤凰对象
    RoomModel.prototype.getPhoenix = function () {
        return this._phoenixObj;
    };
    //清空房间数据
    RoomModel.prototype.clearRoom = function () {
        this._roomerList = new Array();
        this._fishList = new Array();
        this._phoenixObj = null;
    };
    RoomModel.prototype.clear = function () {
    };
    RoomModel.prototype.destroy = function () {
        this._roomerList = null;
        this._fishList = null;
    };
    return RoomModel;
}(burn.model.ModelBase));
__reflect(RoomModel.prototype, "RoomModel");
//# sourceMappingURL=RoomModel.js.map