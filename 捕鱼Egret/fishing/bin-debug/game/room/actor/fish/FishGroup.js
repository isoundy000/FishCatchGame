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
    var actor;
    (function (actor) {
        var FishGroup = (function (_super) {
            __extends(FishGroup, _super);
            function FishGroup(id, uniqIds, loadCallback) {
                if (loadCallback === void 0) { loadCallback = null; }
                var _this = _super.call(this) || this;
                _this._loadCallback = loadCallback;
                _this._fishList = new Array();
                _this.init(id, uniqIds);
                return _this;
            }
            FishGroup.prototype.init = function (id, uniqIds) {
                var self = this;
                var vo = game.table.T_FishGroup_Table.getVoByKey(id);
                this._fid = id;
                var fishId = vo.fishId;
                var posArr = vo.pos.split("|");
                var fLen = uniqIds.length;
                var count = 0;
                for (var i = 0; i < fLen; i++) {
                    var fish = FishingObjPool.getInstance().getGroupFishById(fishId);
                    if (fish != null) {
                        fish.resetData();
                        var arr = posArr[i].split(",");
                        fish.setFishPosition(new egret.Point(Number(arr[0]), Number(arr[1])));
                        fish.setType(AddFishType.FISH);
                        fish.setUniqId(uniqIds[i]);
                        this.addChild(fish);
                        this._fishList.push(fish);
                        count++;
                        if (count >= fLen) {
                            var tw = egret.Tween.get(self, { loop: false });
                            tw.wait(50)
                                .call(function () {
                                egret.Tween.removeTweens(self);
                                self._loadCallback && self._loadCallback();
                            });
                        }
                    }
                    else {
                        fish = new room.actor.FishBase(fishId, function () {
                            count++;
                            if (count >= fLen) {
                                self._loadCallback && self._loadCallback();
                            }
                        });
                        var arr = posArr[i].split(",");
                        fish.setFishPosition(new egret.Point(Number(arr[0]), Number(arr[1])));
                        fish.setType(AddFishType.FISH);
                        fish.setUniqId(uniqIds[i]);
                        this.addChild(fish);
                        this._fishList.push(fish);
                    }
                }
            };
            //设置位置
            FishGroup.prototype.setFishPosition = function (pos) {
                this.x = pos.x;
                this.y = pos.y;
            };
            FishGroup.prototype.getFishList = function () {
                return this._fishList;
            };
            //翻转
            FishGroup.prototype.fishflipY = function () {
                for (var i = 0; i < this._fishList.length; i++) {
                    this._fishList[i].fishflipY();
                }
            };
            FishGroup.prototype.destory = function () {
                for (var i = 0; i < this._fishList.length; i++) {
                    FishingObjPool.getInstance().insertGroupFishPool(this._fishList[i]);
                    this._fishList[i].destory();
                }
                this.removeChildren();
                this.parent && this.parent.removeChild(this);
            };
            return FishGroup;
        }(room.actor.ActorBase));
        actor.FishGroup = FishGroup;
        __reflect(FishGroup.prototype, "room.actor.FishGroup");
    })(actor = room.actor || (room.actor = {}));
})(room || (room = {}));
//# sourceMappingURL=FishGroup.js.map