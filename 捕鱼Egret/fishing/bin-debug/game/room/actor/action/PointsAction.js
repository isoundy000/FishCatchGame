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
    var action;
    (function (action) {
        /**
         * @author ybb
         * 由点构成的路径
         */
        var PointsAction = (function (_super) {
            __extends(PointsAction, _super);
            function PointsAction(actor) {
                return _super.call(this, actor) || this;
            }
            //开始行为
            PointsAction.prototype.runByData = function (points, aliveTime) {
                if (aliveTime === void 0) { aliveTime = 0; }
                var self = this;
                this.setActionAlive(true);
                var tw = this.getTween();
                var ac = this.getActor();
                var len = points.length;
                var tempX = ac.x;
                var tempY = ac.y;
                var tempR = ac.rotation;
                for (var i = 0; i < len; i++) {
                    var p = points[i];
                    tempX += p.x;
                    tempY += p.y;
                    tempR += p.r;
                    var event_1 = p.e;
                    tw.to({ x: tempX, y: tempY, rotation: tempR }, p.t);
                    (function (evt) {
                        tw.call(function () {
                            if (evt > 0) {
                                var type = ac.getType();
                                if (type == AddFishType.FISH) {
                                    if (evt == room.PointEventEnum.FLIP_Y) {
                                        ac.fishflipY();
                                    }
                                    else if (evt == room.PointEventEnum.FLIP_X) {
                                    }
                                }
                                else if (type == AddFishType.FISH_GROUP) {
                                    var fList = ac.getFishList();
                                    var fListLen = fList.length;
                                    for (var j = 0; j < fListLen; j++) {
                                        fList[j].fishflipY();
                                    }
                                }
                            }
                        });
                    })(event_1);
                }
                tw.call(function () {
                    self.setActionAlive(false);
                });
            };
            PointsAction.prototype.destory = function () {
                _super.prototype.destory.call(this);
            };
            return PointsAction;
        }(room.action.ActionBase));
        action.PointsAction = PointsAction;
        __reflect(PointsAction.prototype, "room.action.PointsAction");
        /**
         * 由点构成的路径单位
         */
        var PathPoint = (function () {
            function PathPoint(x, y, r, t, e) {
                this.x = x;
                this.y = y;
                this.r = r;
                this.t = t;
                this.e = e;
            }
            return PathPoint;
        }());
        action.PathPoint = PathPoint;
        __reflect(PathPoint.prototype, "room.action.PathPoint");
    })(action = room.action || (room.action = {}));
})(room || (room = {}));
//# sourceMappingURL=PointsAction.js.map