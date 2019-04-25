var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var room;
(function (room) {
    var base;
    (function (base) {
        var RoomBase = (function (_super) {
            __extends(RoomBase, _super);
            function RoomBase() {
                return _super.call(this) || this;
            }
            //初始化鱼群列表
            RoomBase.prototype.initFishList = function () {
                this._arrFish = new Array();
            };
            //当前房间内鱼群列表
            RoomBase.prototype.getFishList = function () {
                return this._arrFish;
            };
            //初始化子弹列表
            RoomBase.prototype.initBulletList = function () {
                this._arrBullet = new Array();
            };
            //获取当前子弹列表
            RoomBase.prototype.getBulletList = function () {
                return this._arrBullet;
            };
            //根据位置获取子弹数量
            RoomBase.prototype.getBulletNumByPos = function (pos, isFlip) {
                var count = 0;
                for (var i = 0; i < this._arrBullet.length; i++) {
                    var p = RoomUtil.getPosByFlip(pos, isFlip);
                    if (this._arrBullet[i].belongGun == p) {
                        count++;
                    }
                }
                return count;
            };
            return RoomBase;
        }(burn.view.FullView));
        base.RoomBase = RoomBase;
        __reflect(RoomBase.prototype, "room.base.RoomBase");
    })(base = room.base || (room.base = {}));
})(room || (room = {}));
//# sourceMappingURL=RoomBase.js.map