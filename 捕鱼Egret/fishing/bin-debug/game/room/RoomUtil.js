var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoomUtil = (function () {
    function RoomUtil() {
    }
    /**
     * 分身相关枚举
     */
    RoomUtil.getAvaPosByFlip = function (pos, isFlip, nGunIndex) {
        if (isFlip) {
            switch (pos) {
                case RoomPosEnum.GUN_POS_0:
                    return RoomAvaPosEnum["GUN_POS_" + 3 + "_" + (nGunIndex + 1)];
                case RoomPosEnum.GUN_POS_1:
                    return RoomAvaPosEnum["GUN_POS_" + 2 + "_" + (nGunIndex + 1)];
                case RoomPosEnum.GUN_POS_2:
                    return RoomAvaPosEnum["GUN_POS_" + 1 + "_" + (nGunIndex + 1)];
                case RoomPosEnum.GUN_POS_3:
                    return RoomAvaPosEnum["GUN_POS_" + 0 + "_" + (nGunIndex + 1)];
            }
        }
        else {
            return RoomAvaPosEnum["GUN_POS_" + pos + "_" + (nGunIndex + 1)];
        }
    };
    /**
     * 跟进是否反转和位置获取UI显示位置
     */
    RoomUtil.getPosByFlip = function (pos, isFlip) {
        if (isFlip) {
            switch (pos) {
                case RoomPosEnum.GUN_POS_0:
                    return RoomPosEnum.GUN_POS_3;
                case RoomPosEnum.GUN_POS_1:
                    return RoomPosEnum.GUN_POS_2;
                case RoomPosEnum.GUN_POS_2:
                    return RoomPosEnum.GUN_POS_1;
                case RoomPosEnum.GUN_POS_3:
                    return RoomPosEnum.GUN_POS_0;
            }
        }
        else {
            return pos;
        }
    };
    /**
     * 获取玩家自己的位置
     */
    RoomUtil.getMyPosByFlip = function (pos) {
        switch (pos) {
            case RoomPosEnum.GUN_POS_0:
            case RoomPosEnum.GUN_POS_3:
                return RoomPosEnum.GUN_POS_0;
            case RoomPosEnum.GUN_POS_1:
            case RoomPosEnum.GUN_POS_2:
                return RoomPosEnum.GUN_POS_1;
        }
        return 0;
    };
    RoomUtil.getAngleByFlip = function (angle, isFlip) {
        if (isFlip) {
            return angle + 180;
        }
        else {
            return angle;
        }
    };
    RoomUtil.getAngleByPos = function (angle, pos) {
        switch (pos) {
            case RoomPosEnum.GUN_POS_0:
                return angle + 180;
            case RoomPosEnum.GUN_POS_1:
                return angle + 180;
            case RoomPosEnum.GUN_POS_2:
                return angle;
            case RoomPosEnum.GUN_POS_3:
                return angle + 180;
        }
    };
    /**
     * 根据玩家位置获取目标坐标
     */
    RoomUtil.getPointByPos = function (pos, isFlip) {
        if (isFlip) {
            switch (pos) {
                case RoomPosEnum.GUN_POS_0:
                    return new egret.Point(1115, 65);
                case RoomPosEnum.GUN_POS_1:
                    return new egret.Point(235, 65);
                case RoomPosEnum.GUN_POS_2:
                    return new egret.Point(1115, 629);
                case RoomPosEnum.GUN_POS_3:
                    return new egret.Point(235, 629);
            }
        }
        else {
            switch (pos) {
                case RoomPosEnum.GUN_POS_0:
                    return new egret.Point(235, 629);
                case RoomPosEnum.GUN_POS_1:
                    return new egret.Point(1115, 629);
                case RoomPosEnum.GUN_POS_2:
                    return new egret.Point(235, 65);
                case RoomPosEnum.GUN_POS_3:
                    return new egret.Point(1115, 65);
            }
        }
        return null;
    };
    /**
     * 根据玩家位置获取玩家炮台
     */
    RoomUtil.getGunPointByPos = function (pos, isFlip) {
        if (isFlip) {
            switch (pos) {
                case RoomPosEnum.GUN_POS_0:
                    return new egret.Point(890, 165);
                case RoomPosEnum.GUN_POS_1:
                    return new egret.Point(400, 165);
                case RoomPosEnum.GUN_POS_2:
                    return new egret.Point(890, 529);
                case RoomPosEnum.GUN_POS_3:
                    return new egret.Point(400, 529);
            }
        }
        else {
            switch (pos) {
                case RoomPosEnum.GUN_POS_0:
                    return new egret.Point(400, 529);
                case RoomPosEnum.GUN_POS_1:
                    return new egret.Point(880, 529);
                case RoomPosEnum.GUN_POS_2:
                    return new egret.Point(400, 165);
                case RoomPosEnum.GUN_POS_3:
                    return new egret.Point(880, 165);
            }
        }
        return null;
    };
    //获取倍率最高的一条鱼
    RoomUtil.getMaxScoreFish = function (arrFish) {
        var len = arrFish.length;
        if (len <= 0) {
            return null;
        }
        var maxFish = arrFish[0].getActor();
        if (maxFish.getType() == AddFishType.FISH) {
            for (var i = 1; i < len; i++) {
                var temp = arrFish[i].getActor();
                if (temp.getType() == AddFishType.FISH) {
                    var tempFish = temp;
                    if (maxFish.getFishScore() < tempFish.getFishScore()) {
                        maxFish = arrFish[i].getActor();
                    }
                }
                else if (temp.getType() == AddFishType.FISH_GROUP) {
                    var fishList = temp.getFishList();
                    var maxInGroup = RoomUtil.getMaxScoreFishFromGroup(fishList);
                    if (maxInGroup == null) {
                        continue;
                    }
                    if (maxFish.getFishScore() < maxInGroup.getFishScore()) {
                        maxFish = maxInGroup;
                    }
                }
            }
            return maxFish;
        }
        else if (maxFish.getType() == AddFishType.FISH_GROUP) {
            var maxInGroup = RoomUtil.getMaxScoreFishFromGroup(maxFish.getFishList());
            for (var i = 1; i < len; i++) {
                var temp = arrFish[i].getActor();
                if (temp.getType() == AddFishType.FISH) {
                    var tempFish = temp;
                    if (maxInGroup.getFishScore() < tempFish.getFishScore()) {
                        maxInGroup = tempFish;
                    }
                }
                else if (temp.getType() == AddFishType.FISH_GROUP) {
                    var fishList = temp.getFishList();
                    var tempMaxInGroup = RoomUtil.getMaxScoreFishFromGroup(fishList);
                    if (tempMaxInGroup == null) {
                        continue;
                    }
                    if (maxInGroup.getFishScore() < tempMaxInGroup.getFishScore()) {
                        maxInGroup = tempMaxInGroup;
                    }
                }
            }
            return maxInGroup;
        }
        return null;
    };
    /**
     * 从鱼组中获取最高分的鱼
     */
    RoomUtil.getMaxScoreFishFromGroup = function (list) {
        if (list.length <= 0) {
            return null;
        }
        var maxFish = list[0];
        for (var i = 1; i < list.length; i++) {
            if (maxFish.getFishScore() < list[i].getFishScore()) {
                maxFish = list[i];
            }
        }
        return maxFish;
    };
    //获取倍率最高的指定条数的条鱼
    RoomUtil.getMaxScoreFishByNum = function (arrFish, num) {
        var result = new Array();
        function compareFunction(a, b) {
            var item1 = 0;
            var item2 = 0;
            var actor = a.getActor();
            if (actor.getType() == AddFishType.FISH) {
                item1 = actor.getFishScore();
            }
            else if (actor.getType() == AddFishType.FISH_GROUP) {
                var fishList = actor.getFishList();
                if (fishList && fishList.length > 0) {
                    item1 = fishList[0].getFishScore();
                }
            }
            var actorb = b.getActor();
            if (actorb.getType() == AddFishType.FISH) {
                item2 = actorb.getFishScore();
            }
            else if (actorb.getType() == AddFishType.FISH_GROUP) {
                var fishList = actorb.getFishList();
                if (fishList && fishList.length > 0) {
                    item2 = fishList[0].getFishScore();
                }
            }
            if (item1 > item2) {
                return -1; // 如果是降序排序，返回-1。
            }
            else if (item1 === item2) {
                return 0;
            }
            else {
                return 1; // 如果是降序排序，返回1。
            }
        }
        arrFish.sort(compareFunction);
        var count = 0;
        for (var i = 0; i < arrFish.length; i++) {
            var actor = arrFish[i].getActor();
            if (count >= num) {
                break;
            }
            if (actor.getType() == AddFishType.FISH) {
                result.push(actor);
                count++;
            }
            else if (actor.getType() == AddFishType.FISH_GROUP) {
                var fishList = actor.getFishList();
                if (fishList && fishList.length > 0 && fishList[0]) {
                    result.push(fishList[0]);
                    count++;
                }
            }
        }
        /* 检测LOG
        for (let i = 0; i < arrFish.length; i++) {
            let actor = arrFish[i].getActor();
            if (actor.getType() == AddFishType.FISH) {
                console.log("##-------------score->",(actor as room.actor.FishBase).getFishScore());
            } else if (actor.getType() == AddFishType.FISH_GROUP) {
                let fishList = (actor as room.actor.FishGroup).getFishList();
                if (fishList && fishList.length > 0 && fishList[0]) {
                    console.log("##-------------score->",fishList[0].getFishScore());
                }
            }
        }
        console.log("##-------------num->",num);
        for(let i = 0; i < result.length; i++) {
            console.log("#-----------id--->",result[i].getUniqId());
        }
        */
        return result;
    };
    //跟进鱼的唯一id获取鱼
    RoomUtil.getFishById = function (allFish, id) {
        var len = allFish.length;
        for (var i = 0; i < len; i++) {
            var fish = allFish[i].getActor();
            if (fish.getType() == AddFishType.FISH_GROUP) {
                var fishGroup = fish.getFishList();
                var fGroupLen = fishGroup.length;
                for (var j = 0; j < fGroupLen; j++) {
                    var f = fishGroup[j];
                    if (id == f.getUniqId()) {
                        return f;
                    }
                }
            }
            else if (AddFishType.FISH) {
                var f = fish;
                if (f.getUniqId() == id) {
                    return f;
                }
            }
        }
        return null;
    };
    //跟进鱼的唯一id获取鱼action
    RoomUtil.getActionByUid = function (allFish, id) {
        var len = allFish.length;
        for (var i = 0; i < len; i++) {
            var fish = allFish[i].getActor();
            if (AddFishType.FISH) {
                var f = fish;
                var fishId = f.getUniqId();
                if (fishId == id) {
                    return allFish[i];
                }
            }
        }
        return null;
    };
    //获得奖金鱼列表
    RoomUtil.getBonusFish = function (allFish) {
        var bonusList = new Array();
        var len = allFish.length;
        for (var i = 0; i < len; i++) {
            var fish = allFish[i].getActor();
            if (fish.getType() == AddFishType.FISH_GROUP) {
                var fishGroup = fish.getFishList();
                for (var j = 0; j < fishGroup.length; j++) {
                    var f = fishGroup[j];
                    var fishId = f.getFishId();
                    var vo = game.table.T_Fish_Table.getVoByKey(fishId);
                    if (vo.functionType == FishType.BOUNS) {
                        bonusList.push(f);
                    }
                }
            }
            else if (AddFishType.FISH) {
                var f = fish;
                var fishId = f.getFishId();
                var vo = game.table.T_Fish_Table.getVoByKey(fishId);
                if (vo.functionType == FishType.BOUNS) {
                    bonusList.push(f);
                }
            }
        }
        return bonusList;
    };
    //跟进路径id获取路径数据
    RoomUtil.getFishPathById = function (id) {
        var strMove = game.table.T_FishPath_Table.getVoByKey(id);
        var dataMove = strMove.path.points;
        var arr = new Array();
        for (var i = 0; i < dataMove.length; i++) {
            var moveDataVo = dataMove[i];
            arr.push(new room.action.PathPoint(Number(moveDataVo.x), Number(moveDataVo.y), Number(moveDataVo.r), Number(moveDataVo.d), Number(moveDataVo.e)));
        }
        return arr;
    };
    /** 碰撞检查逻辑 */
    RoomUtil.hitRect = function (bullet, fish, type) {
        var hitId = -1;
        if (type == AddFishType.FISH || type == AddFishType.CATCH_WHOLE_FISH) {
            hitId = fish.hitRect(bullet.x, bullet.y);
        }
        else if (type == AddFishType.FISH_GROUP) {
            var fishList = fish.getFishList();
            if (!fishList) {
                return hitId;
            }
            var len = fishList.length;
            for (var k = 0; k < len; k++) {
                hitId = fishList[k].hitRect(bullet.x, bullet.y);
                if (hitId > 0) {
                    break;
                }
            }
        }
        return hitId;
    };
    /** 跟进类型获取地盘 */
    RoomUtil.getChasisByType = function (fishType, type) {
        if (fishType == ChasisFish.GROUP_FISH) {
            switch (type) {
                case ChasisType.GROUP_S:
                    return "chassis_group_small_png";
                case ChasisType.GROUP_B:
                    return "chassis_group_big_png";
                default:
                    return "chassis_group_big_png";
            }
        }
    };
    /** 跟进两点获取两点间角度 */
    RoomUtil.getAngle = function (px, py, mx, my) {
        var x = Math.abs(px - mx);
        var y = Math.abs(py - my);
        var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        var cos = y / z;
        var radina = Math.acos(cos);
        var angle = Math.floor(Math.asin(y / z) / Math.PI * 180);
        if (mx >= px && my <= py) {
            return angle;
        }
        else if (mx <= px && my <= py) {
            return 180 - angle;
        }
        else if (mx <= px && my >= py) {
            return 180 + angle;
        }
        else if (mx >= px && my >= py) {
            return 360 - angle;
        }
        return angle;
    };
    /**处理全民赛鱼死亡 */
    RoomUtil.fishDeadHandlerByQms = function (fishList, fishUid, userId, to, display, roomView) {
        var dropX = 0;
        var dropY = 0;
        var fishId = 0;
        var len = fishList.length;
        for (var i = 0; i < len; i++) {
            var fish = fishList[i].getActor();
            if (fish.getType() == AddFishType.FISH || fish.getType() == AddFishType.CATCH_WHOLE_FISH) {
                if (fish.getUniqId() == fishUid) {
                    var p = fish.localToGlobal();
                    dropX = p.x;
                    dropY = p.y;
                    fishId = fish.getFishId();
                    if (fish.getIsGroupFish()) {
                        fish.playDead(true);
                    }
                    else {
                        fish.playDead(false);
                    }
                    // fishList[i].destory();
                    var index = fishList.indexOf(fishList[i]);
                    if (index >= 0) {
                        fishList.splice(index, 1);
                    }
                    // FishingObjPool.getInstance().insertFishPool(fish);
                    break;
                }
            }
            else if (fish.getType() == AddFishType.FISH_GROUP) {
                var arr = fish.getFishList();
                for (var j = 0; j < arr.length; j++) {
                    var gFish = arr[j];
                    if (gFish.getUniqId() == fishUid) {
                        //播放特效
                        var p = gFish.localToGlobal();
                        dropX = p.x;
                        dropY = p.y;
                        fishId = gFish.getFishId();
                        //鱼死亡
                        gFish.playDead(true);
                        // gFish.destory();
                        //移除鱼组中的鱼
                        arr.splice(j, 1);
                        break;
                    }
                }
            }
            if (fishId != 0) {
                break;
            }
        }
        if (fishId <= 0) {
            return;
        }
        var roomer = burn.Director.getModelByKey(RoomModel).getRoomerById(userId);
        game.util.GameUtil.flyScores(fishId, new egret.Point(dropX, dropY), new egret.Point(to.x, to.y), display, userId);
        game.util.SoundManager.playEffectSound("drop_gold");
    };
    /** 处理鱼的死亡handler */
    RoomUtil.fishDeadHandler = function (fishList, fishUid, userId, to, items, display, roomView) {
        var dropX = 0;
        var dropY = 0;
        var fishId = 0;
        var len = fishList.length;
        for (var i = 0; i < len; i++) {
            var fish = fishList[i].getActor();
            if (fish.getType() == AddFishType.FISH || fish.getType() == AddFishType.CATCH_WHOLE_FISH) {
                if (fish.getUniqId() == fishUid) {
                    var p = fish.localToGlobal();
                    dropX = p.x;
                    dropY = p.y;
                    fishId = fish.getFishId();
                    if (fish.getIsGroupFish()) {
                        fish.playDead(true);
                    }
                    else {
                        fish.playDead(false);
                    }
                    // fishList[i].destory();
                    var index = fishList.indexOf(fishList[i]);
                    if (index >= 0) {
                        fishList.splice(index, 1);
                    }
                    // FishingObjPool.getInstance().insertFishPool(fish);
                    break;
                }
            }
            else if (fish.getType() == AddFishType.FISH_GROUP) {
                var arr = fish.getFishList();
                for (var j = 0; j < arr.length; j++) {
                    var gFish = arr[j];
                    if (gFish.getUniqId() == fishUid) {
                        //播放特效
                        var p = gFish.localToGlobal();
                        dropX = p.x;
                        dropY = p.y;
                        fishId = gFish.getFishId();
                        //鱼死亡
                        gFish.playDead(true);
                        // gFish.destory();
                        //移除鱼组中的鱼
                        arr.splice(j, 1);
                        break;
                    }
                }
            }
            if (fishId != 0) {
                break;
            }
        }
        if (fishId <= 0 || items == null || (to.x == 0 && to.y == 0)) {
            //DEBUG 查询未命中鱼概率的debug代码
            /*
            console.log("##-------------server_fishUid--->",fishUid);
            console.log("##-------------fishId--->",fishId);
            
            let len = fishList.length;
            for (let i = 0; i < len; i++) {
                let fish = fishList[i].getActor();
                if (fish.getType() == AddFishType.FISH) {
                    console.log("##--------FISH-----fishId--->",fish.getUniqId());
                    let nfishId = (fish as room.actor.FishBase).getFishId();
                    console.log("##--------FISH-----nfishId--->",nfishId);

                } else if (fish.getType() == AddFishType.FISH_GROUP) {
                    let arr:Array<room.actor.FishBase> = (fish as room.actor.FishGroup).getFishList();
                    for (let j = 0; j < arr.length; j ++) {
                        let gFish = arr[j] as  room.actor.FishBase;
                        console.log("##--------FISH_GROUP-----fishId--->",gFish.getUniqId());
                        let nfishId = gFish.getFishId();
                        console.log("##--------FISH_GROUP-----fishId--->",nfishId);
                    }
                }
            }
            */
            return;
        }
        var roomer = burn.Director.getModelByKey(RoomModel).getRoomerById(userId);
        //掉落内容
        var itemArr = new Array();
        //itemArr.push({itemId:PropEnum.FISH_TICKIT,count:10});
        //itemArr.push({itemId:40002,count:4});
        //itemArr.push({itemId:40002,count:2});
        for (var i = 0; i < items.length; i++) {
            var itemId = Number(items[i].itemId);
            var count = Number(items[i].count);
            if (itemId == 10001) {
                //display
                game.util.FrameUtil.playAddCoinsEff(count, new egret.Point(dropX, dropY), display, userId);
                game.util.GameUtil.flyCoins(count, fishId, new egret.Point(dropX, dropY), new egret.Point(to.x, to.y), display, userId);
                game.util.SoundManager.playEffectSound("drop_gold");
            }
            else if (itemId == PropEnum.FISH_TICKIT) {
                //点券单独显示
                game.util.GameUtil.flyTickets(count, new egret.Point(dropX, dropY), new egret.Point(to.x, to.y), display, userId);
            }
            else {
                itemArr.push(items[i]);
            }
        }
        if (itemArr.length > 0) {
            var len_1 = itemArr.length;
            for (var i = 0; i < len_1; i++) {
                var iId = Number(itemArr[i].itemId);
                var iCount = Number(itemArr[i].count);
                var point = new egret.Point(dropX, dropY);
                game.util.GameUtil.flyItems(iCount, iId, point, new egret.Point(to.x, to.y), display, userId);
                var name_1 = game.util.Language.getText(game.table.T_Item_Table.getVoByKey(iId).name);
                var str = name_1 + "X" + iCount;
                (function (str, i) {
                    setTimeout(function () {
                        game.util.GameUtil.popTips(str, new egret.Point(dropX, dropY));
                    }, i * 500);
                })(str, i);
            }
        }
    };
    //核弹的震屏
    RoomUtil.shakeWindow = function (view) {
        egret.Tween.get(view)
            .to({ x: 0, y: 0 }, 100)
            .wait(800).to({ x: 2, y: 2 }, 50).to({ x: -20, y: -20 }, 50).to({ x: 30, y: 25 }, 5)
            .to({ x: -20, y: -30 }, 50).to({ x: 0, y: 20 }, 50).to({ x: 20, y: 20 }, 50).to({ x: -20, y: -10 }, 50).
            to({ x: 14, y: 5 }, 50).to({ x: -14, y: -24 }, 50).to({ x: 0, y: 26 }, 50).
            to({ x: -20, y: -10 }, 50).
            to({ x: 14, y: 5 }, 50).to({ x: -14, y: -24 }, 50).to({ x: 0, y: 26 }, 50).
            to({ x: 2, y: 2 }, 50).to({ x: -20, y: -20 }, 50).to({ x: 0, y: 0 }, 5);
    };
    //炸弹的震屏
    RoomUtil.shakeWindowByBomb = function (view) {
        egret.Tween.get(view)
            .to({ x: 0, y: 0 }, 100)
            .to({ x: 2, y: 2 }, 50).to({ x: -20, y: -20 }, 50).to({ x: 30, y: 25 }, 5)
            .to({ x: -20, y: -30 }, 50).to({ x: 0, y: 20 }, 50).to({ x: 20, y: 20 }, 50).to({ x: -20, y: -10 }, 50).
            to({ x: 14, y: 5 }, 50).to({ x: -14, y: -24 }, 50).to({ x: 0, y: 26 }, 50).
            to({ x: -20, y: -10 }, 50).
            to({ x: 14, y: 5 }, 50).to({ x: -14, y: -24 }, 50).to({ x: 0, y: 26 }, 50).
            to({ x: 2, y: 2 }, 50).to({ x: -20, y: -20 }, 50).to({ x: 0, y: 0 }, 5);
    };
    //爆炸鱼的震屏
    RoomUtil.shakeWindowByFish = function (view) {
        egret.Tween.get(view)
            .to({ x: 0, y: 0 }, 100)
            .to({ x: 2, y: 2 }, 50).to({ x: -2, y: -2 }, 50).to({ x: 5, y: 7 }, 5)
            .to({ x: -4, y: -9 }, 50).to({ x: -4, y: -1 }, 50).to({ x: 0, y: 0 }, 5)
            .to({ x: -14, y: -24 }, 50).to({ x: 0, y: 26 }, 50).to({ x: 0, y: 0 }, 5);
    };
    //获取冰花的随机点数组
    RoomUtil.getFrozenEffectPos = function () {
        //426。360
        var arr = new Array();
        var randX = Math.random() * 200;
        var randY = Math.random() * 200;
        arr.push({ x: 100 + randX, y: randY + 100 });
        var randX1 = Math.random() * 200;
        var randY1 = Math.random() * 200;
        arr.push({ x: 626 + randX1, y: randY1 + 100 });
        var randX2 = Math.random() * 200;
        var randY2 = Math.random() * 200;
        arr.push({ x: 1060 + randX2, y: randY2 + 100 });
        var randX3 = Math.random() * 400;
        var randY3 = Math.random() * 200;
        arr.push({ x: 200 + randX3, y: randY3 + 460 });
        var randX4 = Math.random() * 400;
        var randY4 = Math.random() * 200;
        arr.push({ x: 725 + randX4, y: 460 + randY4 });
        return arr;
    };
    /**
     * 根据存活时间获取动态路径和初始坐标
     */
    RoomUtil.getPointsAndPos = function (points, aliveTime) {
        var result = new Array();
        var tempPoints = new Array();
        var totalTime = 0;
        var len = points.length;
        var addX = 0;
        var addY = 0;
        var addR = 0;
        var addFlipY = 0;
        for (var i = len - 1; i >= 0; i--) {
            totalTime += points[i].t;
            if (totalTime >= aliveTime && i < len - 1) {
                addX += points[i].x;
                addY += points[i].y;
                addR += points[i].r;
                if (points[i].e == room.PointEventEnum.FLIP_Y) {
                    addFlipY += 1;
                }
            }
            else {
                tempPoints.push(points[i]);
            }
        }
        tempPoints = tempPoints.reverse();
        result.push(tempPoints);
        result.push(new egret.Point(addX, addY));
        result.push(addR);
        var flipY = false;
        if (addFlipY % 2 == 0) {
            flipY = false;
        }
        else {
            flipY = true;
        }
        result.push(flipY);
        return result;
    };
    /**
     * 获取葫芦产鱼需要的数据
     */
    RoomUtil.getPointsAndPosByCala = function (points, pot) {
        var result = new Array();
        var tempPoints = new Array();
        var addX = 0;
        var addY = 0;
        var addR = 0;
        var addFlipY = 0;
        for (var i = 0; i < points.length; i++) {
            if (i < pot) {
                addX += points[i].x;
                addY += points[i].y;
                addR += points[i].r;
                if (points[i].e == room.PointEventEnum.FLIP_Y) {
                    addFlipY += 1;
                }
            }
            else {
                tempPoints.push(points[i]);
            }
        }
        // tempPoints = tempPoints.reverse();
        result.push(tempPoints);
        result.push(new egret.Point(addX, addY));
        result.push(addR);
        var flipY = false;
        if (addFlipY % 2 == 0) {
            flipY = false;
        }
        else {
            flipY = true;
        }
        result.push(flipY);
        return result;
    };
    RoomUtil.getPointsByCala = function (points, pot) {
        var addX = 0;
        var addY = 0;
        var r = 0;
        for (var i = 0; i < points.length; i++) {
            if (i < pot) {
                addX += points[i].x;
                addY += points[i].y;
                r += points[i].r;
            }
        }
        return { point: new egret.Point(addX, addY), rotation: r };
    };
    return RoomUtil;
}());
__reflect(RoomUtil.prototype, "RoomUtil");
//# sourceMappingURL=RoomUtil.js.map