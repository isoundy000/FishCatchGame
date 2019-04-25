var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var room;
(function (room) {
    /**
     * 一条鱼杀死多条鱼逻辑
     * 针对特殊鱼：一网打尽、电鳗、炸弹
     */
    var OneKillMany = (function () {
        function OneKillMany() {
        }
        /**
         * 杀死多条鱼
         * userId：出发的玩家
         * mainFish：触发的鱼uid
         * others：波及鱼的数组，包括鱼uid和掉落
         * type：特效类型，一网打尽、电鳗、炸弹
         */
        OneKillMany.killMany = function (view, userId, mainFish, others, type, allFish, isFlip, display) {
            var _this = this;
            //获取主鱼
            var mFishAction = RoomUtil.getActionByUid(allFish, mainFish);
            if (mFishAction == null) {
                console.log("#--------warnning-----killMany--mainFish is null---id-->", mainFish);
                return;
            }
            mFishAction.pause();
            if (type == OneKillManyType.ELECTRIC) {
                this.lockedAllFish(view, userId, mFishAction, others, allFish, type, isFlip, display);
            }
            else {
                var mFish_1 = mFishAction.getActor();
                //播放触发鱼的特效
                var effect = this.getEffectByType(type);
                var data = RES.getRes(effect + "_json");
                var txtr = RES.getRes(effect + "_png");
                var mcFactory = new egret.MovieClipDataFactory(data, txtr);
                var mainEffect_1 = new egret.MovieClip(mcFactory.generateMovieClipData(effect));
                mFish_1.getEFFECT_LAYER().addChild(mainEffect_1);
                var roOld = mFish_1.rotation;
                if (roOld != 0) {
                    mFish_1.getFISH_LAYER().rotation = roOld;
                }
                mFish_1.rotation = 0;
                mainEffect_1.frameRate = 10;
                if (type == OneKillManyType.BOMB) {
                    mainEffect_1.frameRate = 7;
                }
                mainEffect_1.scaleX = mainEffect_1.scaleY = 4;
                mainEffect_1.gotoAndPlay("play", 1);
                var dataMc = mainEffect_1.movieClipData;
                var frameCur = 0;
                var Rect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
                mainEffect_1.anchorOffsetX = mainEffect_1.width / 2 + Rect.x;
                mainEffect_1.anchorOffsetY = mainEffect_1.height / 2 + Rect.y;
                var count_1 = 0;
                mainEffect_1.addEventListener(egret.Event.COMPLETE, function (e) {
                    if (count_1 == 0) {
                        _this.lockedAllFish(view, userId, mFishAction, others, allFish, type, isFlip, display);
                    }
                    mFish_1.getEFFECT_LAYER().removeChild(mainEffect_1);
                    mainEffect_1.stop();
                }, this);
            }
        };
        //锁定所有要死亡的鱼
        OneKillMany.lockedAllFish = function (view, userId, main, others, allFish, type, isFlip, display) {
            var mainUid = main.getActor().getUniqId();
            for (var i = 0; i < others.length; i++) {
                var fishAction = RoomUtil.getActionByUid(allFish, others[i].fishId);
                if (fishAction == null)
                    continue;
                fishAction.pause();
                if (type != OneKillManyType.BOMB) {
                    this.addLineEffect(main, fishAction, type, isFlip);
                }
            }
            if (type == OneKillManyType.ELECTRIC) {
                var data = RES.getRes("electric_qiu_json");
                var txtr = RES.getRes("electric_qiu_png");
                var mFish = main.getActor();
                var mcFactory = new egret.MovieClipDataFactory(data, txtr);
                var mainEffect_2 = new egret.MovieClip(mcFactory.generateMovieClipData("electric_qiu"));
                var dataMc = mainEffect_2.movieClipData;
                var frameCur = 0;
                var Rect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
                mainEffect_2.anchorOffsetX = mainEffect_2.width / 2 + Rect.x;
                mainEffect_2.anchorOffsetY = mainEffect_2.height / 2 + Rect.y;
                mFish.getEFFECT_LAYER().addChild(mainEffect_2);
                mainEffect_2.gotoAndPlay("play", -1);
                mainEffect_2.once(egret.Event.REMOVED_FROM_STAGE, function (e) {
                    mainEffect_2.stop();
                }, this);
            }
            var roomer = burn.Director.getModelByKey(RoomModel).getRoomerById(userId);
            var item = view.getRoomUI().getGunPointByPos(roomer.getRoomPos(), isFlip);
            var to = new egret.Point(item.x, item.y);
            //延迟处理鱼的死亡和掉落
            setTimeout(function () {
                RoomUtil.fishDeadHandler(allFish, mainUid, userId, to, null, display, view);
                for (var i = 0; i < others.length; i++) {
                    var fishAction = RoomUtil.getActionByUid(allFish, others[i].fishId);
                    if (fishAction == null)
                        continue;
                    RoomUtil.fishDeadHandler(allFish, others[i].fishId, userId, to, others[i].items, display, view);
                }
            }, 750);
        };
        //如果有，播放连接特效
        OneKillMany.addLineEffect = function (main, other, type, isFlip) {
            var fish = other.getActor();
            var mainFish = main.getActor();
            //每个鱼身上播放特效
            var effect = this.getEffectByType(type);
            var data = RES.getRes(effect + "_json");
            var txtr = RES.getRes(effect + "_png");
            var mcFactory = new egret.MovieClipDataFactory(data, txtr);
            var mainEffect = new egret.MovieClip(mcFactory.generateMovieClipData(effect));
            fish.getEFFECT_LAYER().addChild(mainEffect);
            if (type == OneKillManyType.ELECTRIC) {
                mainEffect.anchorOffsetX = mainEffect.width / 2;
                mainEffect.anchorOffsetY = mainEffect.height / 2;
            }
            mainEffect.gotoAndPlay("play", -1);
            mainEffect.once(egret.Event.REMOVED_FROM_STAGE, function (e) {
                mainEffect.stop();
            }, this);
            //增加连线
            var lineData = RES.getRes(effect + "_line_json");
            var lineTxtr = RES.getRes(effect + "_line_png");
            var lmcFactory = new egret.MovieClipDataFactory(lineData, lineTxtr);
            var lineEffect = new egret.MovieClip(lmcFactory.generateMovieClipData(effect + "_line"));
            lineEffect.gotoAndPlay("play", -1);
            var roOld = mainFish.rotation;
            if (roOld != 0) {
                mainFish.getFISH_LAYER().rotation = roOld;
            }
            mainFish.rotation = 0;
            mainFish.getEFFECT_LAYER().addChild(lineEffect);
            lineEffect.anchorOffsetY = lineEffect.height / 2;
            lineEffect.anchorOffsetX = 0;
            var mainFishPt = mainFish.localToGlobal();
            var fishPt = fish.localToGlobal();
            //计算两个鱼之间的角度
            var angle = FishUtil.getAngle(mainFishPt.x, mainFishPt.y, fishPt.x, fishPt.y);
            if (isFlip) {
                lineEffect.rotation = angle + 90;
            }
            else {
                lineEffect.rotation = angle - 90;
            }
            var x = Math.abs(mainFishPt.x - fishPt.x);
            var y = Math.abs(mainFishPt.y - fishPt.y);
            var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            lineEffect.scaleX = dist / lineEffect.width;
            lineEffect.scaleY = 1.3;
            lineEffect.once(egret.Event.REMOVED_FROM_STAGE, function (e) {
                lineEffect.stop();
            }, this);
        };
        //跟进类型获取特效：电鳗、炸弹、一网打尽
        OneKillMany.getEffectByType = function (type) {
            switch (type) {
                case OneKillManyType.ELECTRIC: return "electric";
                case OneKillManyType.BOMB: return "bomb";
                case OneKillManyType.CATCH_WHOLE: return "electric";
                default: return "electric";
            }
        };
        return OneKillMany;
    }());
    room.OneKillMany = OneKillMany;
    __reflect(OneKillMany.prototype, "room.OneKillMany");
})(room || (room = {}));
//# sourceMappingURL=OneKillMany.js.map