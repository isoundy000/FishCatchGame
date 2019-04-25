var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RoomView = (function (_super) {
    __extends(RoomView, _super);
    function RoomView() {
        var _this = _super.call(this) || this;
        //当前炮台倍率
        // private _gunRate:number;
        //上一次开炮时间
        _this._preGunTime = 0;
        //锁定功能改
        _this._arrLockedObj = null;
        //分身更换锁定鱼的枪口索引
        _this._nAvaGunIndex = 0;
        _this._inHandWarHeadFish = -1; //使用弹头时手选的奖金鱼
        _this._isBgInit = false;
        _this._frameCount = 0;
        _this.initFishList();
        _this.initBulletList();
        _this._gunToPos = new egret.Point();
        _this._isFlip = false;
        _this._myPositon = 0;
        _this._isInFire = false;
        _this._autoFire = false;
        _this._selectFishState = false;
        _this._nGunNum = 2;
        _this._bulletId = 0;
        _this.BULLET_MAX_COUNT = Number(game.table.T_Config_Table.getVoByKey(29).value);
        _this._userModel = burn.Director.getModelByKey(UserModel);
        _this._roomModel = burn.Director.getModelByKey(RoomModel);
        return _this;
    }
    RoomView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/GameFishing.exml", this.addBgResource, this);
        //初始化层级
        this._bgLayer = new egret.DisplayObjectContainer();
        this.addChildAt(this._bgLayer, 10);
        this._floorLayer = new FloorLayer();
        this.addChildAt(this._floorLayer, 20);
        this._objectLayer = new ObjectLayer();
        this.addChildAt(this._objectLayer, 50);
        this._bulletLayer = new BulletLayer;
        this.addChildAt(this._bulletLayer, 60);
        // this._ceilingLayer = new CeilingLayer();
        // this.addChildAt(this._ceilingLayer, 70);
        this._tipsLayer = new egret.DisplayObjectContainer();
        this.addChildAt(this._tipsLayer, 99);
        var self = this;
        var bgUrl = "background_" + this._userModel.getMatchRoomLevel() + "_jpg";
        RES.getResAsync(bgUrl, function (data, key) {
            //添加背景
            var bg = new egret.Bitmap(data);
            self._bgLayer.addChild(bg);
            self._bgLayer.anchorOffsetX = bg.width >> 1;
            self._bgLayer.anchorOffsetY = bg.height >> 1;
            self._bgLayer.x = egret.MainContext.instance.stage.stageWidth >> 1;
            self._bgLayer.y = egret.MainContext.instance.stage.stageHeight >> 1;
            if (self._isBgInit) {
                self._bgLayer.touchEnabled = true;
                self._bgLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.touchBegin, self);
                self._bgLayer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, self.touchCacel, self);
                self._bgLayer.addEventListener(egret.TouchEvent.TOUCH_MOVE, self.touchMove, self);
                self._bgLayer.addEventListener(egret.TouchEvent.TOUCH_END, self.touchEnd, self);
            }
            self.addBoguang();
            self._isBgInit = true;
        }, this);
        //适配宽度偏移量
        this._offsetWidth = (egret.MainContext.instance.stage.stageWidth - CONFIG.contentWidth) >> 1;
    };
    //添加波光粼粼效果
    RoomView.prototype.addBoguang = function () {
        var _this = this;
        if (game.util.GorgeousManager.getState()) {
            RES.getResAsync("ef_boguang_json", function () {
                RES.getResAsync("ef_boguang_png", function () {
                    var mcFactory = new egret.MovieClipDataFactory(RES.getRes("ef_boguang_json"), RES.getRes("ef_boguang_png"));
                    var bowen = new egret.MovieClip(mcFactory.generateMovieClipData("ef_boguang"));
                    bowen.name = "bowen";
                    _this._bgLayer.addChild(bowen);
                    bowen.scaleX = 6.8;
                    bowen.scaleY = 6.8;
                    bowen.frameRate = 7;
                    bowen.alpha = 0.5;
                    bowen.blendMode = egret.BlendMode.ADD;
                    bowen.gotoAndPlay("play", -1);
                }, self);
            }, self);
        }
        else {
            var child = this._bgLayer.getChildByName("bowen");
            if (child) {
                this._bgLayer.removeChild(child);
            }
        }
    };
    RoomView.prototype.startRoom = function () {
        this._isBgInit = true;
        //添加触摸事件
        this._objectLayer.touchEnabled = false;
        this._objectLayer.addEventListener(egret.TouchEvent.TOUCH_END, this.fishTouchEnd, this);
        if (this._isBgInit) {
            this._bgLayer.touchEnabled = true;
            this._bgLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
            this._bgLayer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchCacel, this);
            this._bgLayer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
            this._bgLayer.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        }
        //添加帧事件
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this._preGunTime = 0;
        this._timeOnEnterFrame = egret.getTimer();
    };
    //UI加载完成
    RoomView.prototype.addBgResource = function (clazz, url) {
        this._roomUI = new DajiangsaiRoomUI(clazz);
        this._roomUI.y += 10;
        this.addChildAt(this._roomUI, 80);
        this._roomUI.touchEnabled = false;
        //增加UI适配边框
        game.util.UIUtil.screenAdapter(this._roomUI);
    };
    //根据服务器信息设置UI数据
    RoomView.prototype.resetView = function (isFlip, roomerList, myPos) {
        this._isFlip = isFlip;
        this._myPositon = myPos;
        //设置界面反转
        if (this._isFlip) {
            this._objectLayer.rotation = 180;
            this._objectLayer.x = egret.MainContext.instance.stage.stageWidth;
            this._objectLayer.y = egret.MainContext.instance.stage.stageHeight;
        }
        //设置炮台显示
        for (var i = 0; i < roomerList.length; i++) {
            var roomer = roomerList[i];
            if (this._isFlip) {
                this._roomUI.setGunVisableByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), this._isFlip), true);
            }
            else {
                this._roomUI.setGunVisableByPos(roomer.getRoomPos(), true);
            }
        }
    };
    /** 显示您在此处 */
    RoomView.prototype.showYourPos = function (pos) {
        var rPos = RoomUtil.getMyPosByFlip(pos);
        this._roomUI.showYourPos(rPos);
    };
    /** 隐藏您在此处的提示 */
    RoomView.prototype.hideYourPos = function (pos) {
        var rPos = RoomUtil.getMyPosByFlip(pos);
        this._roomUI.hideYourPos(rPos);
    };
    RoomView.prototype.touchBegin = function (evt) {
        this._isInFire = true;
        //this._preGunTime = 0;
        this._timeOnEnterFrame = egret.getTimer();
        this._gunToPos.x = evt.stageX;
        this._gunToPos.y = evt.stageY;
        var container = new egret.DisplayObjectContainer();
        var imgClick = new egret.Bitmap(RES.getRes("fish_click_png"));
        imgClick.scaleX = 0.1;
        imgClick.scaleY = 0.1;
        imgClick.anchorOffsetX = imgClick.width / 2;
        imgClick.anchorOffsetY = imgClick.height / 2;
        container.addChild(imgClick);
        var imgClick1 = new egret.Bitmap(RES.getRes("fish_click_png"));
        imgClick1.scaleX = 0.3;
        imgClick1.scaleY = 0.3;
        imgClick1.anchorOffsetX = imgClick1.width / 2;
        imgClick1.anchorOffsetY = imgClick1.height / 2;
        container.addChild(imgClick1);
        container.x = evt.stageX;
        container.y = evt.stageY;
        var scaleParam = 1.5;
        var tw = egret.Tween.get(imgClick);
        var self = this;
        tw.to({ scaleX: scaleParam, scaleY: scaleParam, alpha: 0.1 }, 400).
            call(function () {
            egret.Tween.removeTweens(imgClick);
        });
        var tw1 = egret.Tween.get(imgClick1);
        imgClick1.visible = false;
        tw1.wait(190).
            call(function () {
            imgClick1.visible = true;
        }).to({ scaleX: scaleParam, scaleY: scaleParam, alpha: 0.1 }, 400).
            call(function () {
            egret.Tween.removeTweens(imgClick1);
            self._tipsLayer.removeChild(container);
        });
        this._tipsLayer.addChild(container);
        /*
        按住不丢。开枪速度。为最大速率
        //开枪
        this.gunFire(RoomUtil.getPosByFlip(this._myPositon, this._isFlip), evt.stageX, evt.stageY);
        */
    };
    RoomView.prototype.touchMove = function (evt) {
        this._gunToPos.x = evt.stageX;
        this._gunToPos.y = evt.stageY;
    };
    RoomView.prototype.touchCacel = function (evt) {
        this._isInFire = false;
    };
    RoomView.prototype.touchEnd = function (evt) {
        if (this._preGunTime >= GlobalManager.getInstance().GUN_FRAME_TIME) {
            this.gunFire(RoomUtil.getPosByFlip(this._myPositon, this._isFlip), this._gunToPos.x, this._gunToPos.y);
            this._preGunTime = 0;
        }
        this._isInFire = false;
        if (this.getRoomUI().getIsChakan()) {
            this.getRoomUI().setHideChakan();
        }
    };
    RoomView.prototype.fishTouchEnd = function (evt) {
        var fishTarget = null;
        var len = this.getFishList().length;
        for (var i = 0; i < len; i++) {
            var fish = this.getFishList()[i].getActor();
            if (fish.getType() == AddFishType.FISH || fish.getType() == AddFishType.CATCH_WHOLE_FISH) {
                if (fish.hitTestPoint(evt.stageX, evt.stageY)) {
                    this.send(NotifyEnum.SEND_CLICK_FISH, fish.getUniqId());
                    fishTarget = fish;
                    break;
                }
            }
            else if (fish.getType() == AddFishType.FISH_GROUP) {
                var fishList = fish.getFishList();
                var fLen = fishList.length;
                for (var j = 0; j < fLen; j++) {
                    if (fishList[j].hitTestPoint(evt.stageX, evt.stageY)) {
                        this.send(NotifyEnum.SEND_CLICK_FISH, fishList[j].getUniqId());
                        fishTarget = fishList[j];
                        break;
                    }
                }
            }
        }
        if (fishTarget == null) {
            return;
        }
        if (this._isLocked || this._isRage || this._isClone) {
            if (this._isClone) {
                if (this._nAvaGunIndex == this._nGunNum) {
                    this._nAvaGunIndex = 0;
                }
                this.changeLockedFish(this._userModel.getUserId(), fishTarget, this._nAvaGunIndex);
                this._nAvaGunIndex++;
                //发消息。。。。告诉其他人。更改了枪and鱼
                this.send(NotifyEnum.LOCKED_FISH_CHANGE, { fishId: fishTarget.getUniqId(), gunIndex: this._nAvaGunIndex });
            }
            else {
                var curId = this._userModel.getGuideID();
                if (curId < 8 && CONFIG.openGuide) {
                    return;
                }
                this.changeLockedFish(this._userModel.getUserId(), fishTarget);
                this.send(NotifyEnum.LOCKED_FISH_CHANGE, { fishId: fishTarget.getUniqId(), gunIndex: 0 });
            }
        }
    };
    //主循环帧事件
    RoomView.prototype.onEnterFrame = function (e) {
        //每3帧抽一帧
        if (this._frameCount == 2) {
            this._frameCount = 0;
            return;
        }
        else {
            this._frameCount++;
        }
        if (this._isLocked || this._isRage || this._isClone) {
            this._objectLayer.touchEnabled = true;
            this._bgLayer.touchEnabled = false;
        }
        //碰撞检测
        this.hitUpdate();
        //更新子弹逻辑
        this.bulletLogicUpdate();
        //更新炮台状态
        this.updateGunStatus();
    };
    /** 更新炮台显示 */
    RoomView.prototype.updateGunStatus = function () {
        var now = egret.getTimer();
        var time = this._timeOnEnterFrame;
        var pass = now - time;
        this._timeOnEnterFrame = egret.getTimer();
        this._preGunTime += pass;
        if (this._isLocked || this._isRage || this._isClone) {
            if (this._isClone) {
                if (this._preGunTime >= GlobalManager.getInstance().GUN_FRAME_TIME) {
                    var UserId = this._userModel.getUserId();
                    var bulletN = this._nGunNum;
                    for (var gunIndex = 0; gunIndex < bulletN; gunIndex++) {
                        var fishId = this.getLockedFishId(UserId, gunIndex);
                        var fish = RoomUtil.getFishById(this.getFishList(), fishId);
                        if (!fish) {
                            this.send(NotifyEnum.LOCKED_FISH_DISAPPEAR, { index: gunIndex, simple: false });
                            return;
                        }
                        var lock = fish.getEFFECT_LAYER().getChildByName("locked");
                        if (lock) {
                            var pt = fish.localToGlobal(lock.x, lock.y);
                            this.gunFire(RoomUtil.getPosByFlip(this._myPositon, this._isFlip), pt.x, pt.y, gunIndex);
                        }
                        else {
                            this.send(NotifyEnum.LOCKED_FISH_DISAPPEAR, { index: gunIndex, simple: false });
                        }
                        this._preGunTime = 0;
                    }
                }
            }
            else {
                if (this._preGunTime >= GlobalManager.getInstance().GUN_FRAME_TIME) {
                    var UserId = this._userModel.getUserId();
                    var fish = RoomUtil.getFishById(this.getFishList(), this.getLockedFishId(UserId));
                    if (!fish) {
                        this.send(NotifyEnum.LOCKED_FISH_DISAPPEAR, { index: 0, simple: true });
                        return;
                    }
                    var lock = fish.getEFFECT_LAYER().getChildByName("locked");
                    if (lock) {
                        var pt = fish.localToGlobal(lock.x, lock.y);
                        this.gunFire(RoomUtil.getPosByFlip(this._myPositon, this._isFlip), pt.x, pt.y);
                    }
                    else {
                        this.send(NotifyEnum.LOCKED_FISH_DISAPPEAR, { index: 0, simple: true });
                    }
                    this._preGunTime = 0;
                }
            }
        }
        else if (this._isRage) {
            if (this._preGunTime >= GlobalManager.getInstance().GUN_FRAME_TIME) {
                this.gunFire(RoomUtil.getPosByFlip(this._myPositon, this._isFlip), this._gunToPos.x, this._gunToPos.y);
                this._preGunTime = 0;
            }
        }
        else {
            //更新按住自动开枪逻辑
            if (this._isInFire || this._autoFire) {
                if (this._preGunTime >= GlobalManager.getInstance().GUN_FRAME_TIME) {
                    this.gunFire(RoomUtil.getPosByFlip(this._myPositon, this._isFlip), this._gunToPos.x, this._gunToPos.y);
                    this._preGunTime = 0;
                }
            }
        }
    };
    /**子弹逻辑更新 */
    RoomView.prototype.bulletLogicUpdate = function () {
        var bulletList = this.getBulletList();
        if (!bulletList) {
            return;
        }
        var bLen = bulletList.length;
        for (var i = 0; i < bLen; i++) {
            var bullet = bulletList[i];
            bullet && bullet.logicUpdate();
        }
        var arrDeadBullet = new Array();
        for (var i = 0; i < bLen; i++) {
            var bullet = bulletList[i];
            if (bullet.getBDead()) {
                arrDeadBullet.push(bullet);
            }
        }
        var deadLen = arrDeadBullet.length;
        for (var i = 0; i < deadLen; i++) {
            var bullet = arrDeadBullet[i];
            var index = bulletList.indexOf(bullet);
            bulletList.splice(index, 1);
            this._bulletLayer.removeChild(bullet);
            if (bullet.isPushPool) {
                FishingObjPool.getInstance().nBulletObjPool.push(bullet);
            }
        }
    };
    //碰撞检测
    RoomView.prototype.hitUpdate = function () {
        var fLen = this.getFishList().length;
        for (var i = 0; i < fLen; i++) {
            var fish = this.getFishList()[i];
            var bulletLen = this.getBulletList().length;
            for (var j = 0; j < bulletLen; j++) {
                var bullet = this.getBulletList()[j];
                if (!bullet.getBUpdate()) {
                    continue;
                }
                var actor = fish.getActor();
                var type = actor.getType();
                if (this.isBulletLocked(bullet.belongGun) && bullet.getReboundTimes() == 0) {
                    var lockId = -1;
                    if (bullet.nGunIndex != -1) {
                        lockId = this.getBulletLockedId(bullet.belongGun)[bullet.nGunIndex];
                    }
                    else {
                        lockId = this.getBulletLockedId(bullet.belongGun)[0];
                    }
                    //console.log("#----------------1----bullet.nGunIndex--->",bullet.nGunIndex,"----lockId---->",lockId);
                    if (type == AddFishType.FISH || type == AddFishType.CATCH_WHOLE_FISH) {
                        if (actor.getUniqId() == lockId) {
                            //判断这条鱼是否在屏幕内
                            var pos = actor.localToGlobal();
                            if (pos.x + (actor.measuredWidth >> 1) >= 0 && pos.x - (actor.measuredWidth >> 1) <= 1280
                                && pos.y + (actor.measuredHeight >> 1) >= 0 && pos.y - (actor.measuredHeight >> 1) <= 720) {
                                var hitId = RoomUtil.hitRect(bullet, actor, AddFishType.FISH);
                                if (this.sendHitFish(bullet, hitId, actor)) {
                                    return;
                                }
                            }
                        }
                    }
                    else if (type == AddFishType.FISH_GROUP) {
                        var fishList = actor.getFishList();
                        var groupFLen = fishList.length;
                        for (var k = 0; k < groupFLen; k++) {
                            if (fishList[k].getUniqId() == lockId) {
                                //判断这条鱼是否在屏幕内
                                var pos = actor.localToGlobal();
                                if (pos.x + actor.measuredWidth / 2 >= 0 && pos.x - actor.measuredWidth / 2 <= 1280
                                    && pos.y + actor.measuredHeight / 2 >= 0 && pos.y - actor.measuredHeight / 2 <= 720) {
                                    var hitId = RoomUtil.hitRect(bullet, fishList[k], AddFishType.FISH);
                                    if (this.sendHitFish(bullet, hitId, fishList[k])) {
                                        return;
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    if (type == AddFishType.FISH || type == AddFishType.CATCH_WHOLE_FISH) {
                        var hitId = RoomUtil.hitRect(bullet, fish.getActor(), type);
                        if (this.sendHitFish(bullet, hitId, fish.getActor())) {
                            return;
                        }
                    }
                    else if (type == AddFishType.FISH_GROUP) {
                        var fishList = actor.getFishList();
                        var groupFLen = fishList.length;
                        for (var k = 0; k < groupFLen; k++) {
                            var hitId = RoomUtil.hitRect(bullet, fishList[k], AddFishType.FISH);
                            if (this.sendHitFish(bullet, hitId, fishList[k])) {
                                return;
                            }
                        }
                    }
                }
            }
        }
    };
    //子弹碰撞结果的处理
    RoomView.prototype.sendHitFish = function (bullet, hitId, fish) {
        if (hitId > 0) {
            if (bullet.belongGun == this._myPositon) {
                fish.playHitEffect();
                //自己击中鱼的时候发送击中事件
                this.send(NotifyEnum.HIT_FISH, { fId: hitId, bId: bullet.getBulletId() });
            }
            bullet.setBDead(true);
            //显示渔网位置
            var skinVo = game.table.T_Gun_skin_Table.getVoByKey(bullet.bePos);
            this._bulletLayer.showBulletBomb(skinVo.net, bullet.x, bullet.y, FishingObjPool.getInstance());
            return true;
        }
        return false;
    };
    //检测领取救济金
    RoomView.prototype.checkBankrupt = function () {
        var time = this._userModel.getBankruptTime();
        if (time > 0) {
            var currTime = game.util.TimeUtil.getCurrTime();
            var residue = time - currTime;
            if (residue <= 0) {
                var req = new BankruptMessage();
                req.initData();
                //7:领取救济金
                req.setState(7);
                NetManager.send(req);
            }
        }
    };
    //开炮
    RoomView.prototype.gunFire = function (pos, mx, my, gunIndex) {
        if (gunIndex === void 0) { gunIndex = 2; }
        var bulletCount = this.getBulletNumByPos(pos, this._isFlip);
        this.checkBankrupt();
        if (bulletCount >= this.BULLET_MAX_COUNT && this._userModel.getCoins() > 0) {
            return;
        }
        var roomer = this._roomModel.getRoomerById(this._userModel.getUserId());
        if (!roomer) {
            return;
        }
        var gunRateVo = game.table.T_Gun_Table.getVoByKey(roomer.getGunRate());
        var roomType = this._userModel.getMatchRoomLevel();
        if (game.util.GameUtil.isKss(roomType)) {
            if (roomer.getDjsObj().grandPrixBulletNum <= 0) {
                if (this._autoFire) {
                    this._autoFire = false;
                }
                game.util.GameUtil.popTips(game.util.Language.getText(180));
                //不能开枪
                this.cleanBuff();
                return;
            }
        }
        if (roomType == RequesetRoomState.DjsRoom || roomType == RequesetRoomState.QmsRoom) {
            if (roomer.getDjsObj()) {
                if (roomer.getDjsObj().grandPrixSignUp == 0) {
                    if (this._autoFire) {
                        this._autoFire = false;
                    }
                    //弹出报名界面
                    this.getRoomUI().openArenaSignView();
                    return;
                }
                if (roomer.getDjsObj().grandPrixBulletNum <= 0) {
                    if (bulletCount <= 0) {
                        //发送结算消息
                        burn._Notification_.send(NotifyEnum.AUTO_GUN_FIRE, 1);
                        burn._Notification_.send(NotifyEnum.DJS_RESULT_SEND);
                        return;
                    }
                    //不能开枪
                    this.cleanBuff();
                    return;
                }
            }
            //破产或者待着
            var flagDjs = game.util.GameUtil.isEnough(CurrencyEnum.COINS, gunRateVo.bulletNum, false);
            if (!flagDjs) {
                game.util.GameUtil.popTips(game.util.Language.getText(2));
                if (bulletCount == 0 && this._userModel.getCoins() <= 0 && this._userModel.getBankruptTime() <= 0) {
                    var req = new BankruptMessage();
                    req.initData();
                    req.setState(0);
                    NetManager.send(req);
                    this.cleanBuff();
                }
                return;
            }
        }
        //检测当前炮倍是否高于房间内要求最低炮倍
        var flag_min = game.util.GameUtil.getNeedGunByRoomType(this._userModel.getMatchRoomLevel(), roomer.getGunRate());
        if (flag_min != -1) {
            var maxId = game.util.GameUtil.getMaxGunRateByGold(this._userModel.getCoins());
            if (maxId != -1 && gunRateVo.id < maxId && this._userModel.getCoins() > 0) {
                var send = new ChangeGunSendMessage();
                send.initData();
                send.setType(ChangeGunState.AUTO_CHANGE);
                NetManager.send(send);
                return;
            }
        }
        var flag = game.util.GameUtil.isEnough(CurrencyEnum.COINS, gunRateVo.bulletNum, false);
        if (flag) {
            var gunObj = this._roomUI.gunList[pos];
            if (gunObj) {
                if (gunObj.getGunLocked()) {
                    this.send(NotifyEnum.CHECK_UNLOCKGUNUI_LOADED, true);
                    gunObj.setLocked(false);
                    return;
                }
            }
            //获取真实炮台
            var gunPos = this.getRoomUI().getGunByPos(pos, this._isClone, gunIndex);
            gunPos.x -= CONFIG.adaptX;
            // if(my >= gunPos.y)
            // {
            // 	my = gunPos.y;
            // }
            //计算炮台角度
            var rotationGun = FishUtil.getAngle(gunPos.x + this._offsetWidth, gunPos.y, mx, my);
            //添加检测狂暴的
            var skinVo = game.table.T_Gun_skin_Table.getVoByKey(this._userModel.getCurSkinId());
            var bulId = skinVo.bulletId;
            if (this._isRage) {
                bulId = skinVo.rageBulletId;
                this._roomUI.setGunRageEff(pos, true, this._isClone, gunIndex);
            }
            var bullet = null;
            if (FishingObjPool.getInstance()) {
                bullet = FishingObjPool.getInstance().getBulletObj(bulId);
            }
            else {
                bullet = new BulletBase(bulId);
            }
            //270 360 0 90
            //设置炮台UI显示
            this._roomUI.gunfire(pos, rotationGun, this._isClone, gunIndex);
            if (this._isClone) {
                bullet.belongGun = RoomUtil.getPosByFlip(pos, this._isFlip);
                bullet.bePos = roomer.getCurSkinId();
                bullet.nGunIndex = gunIndex;
            }
            else {
                bullet.belongGun = RoomUtil.getPosByFlip(pos, this._isFlip);
                bullet.bePos = roomer.getCurSkinId();
                bullet.nGunIndex = -1;
            }
            //bullet.belongGun = RoomUtil.getPosByFlip(pos, this._isFlip);
            bullet.setBulletPos(gunPos.x + this._offsetWidth, gunPos.y, rotationGun);
            var degree = Math.PI / 180 * (bullet.rotation - 270);
            var destX = mx + Math.cos(degree) * 2000;
            var destY = my + Math.sin(degree) * 2000;
            //计算路径
            var destPos = new egret.Point(destX, destY);
            var costTime = egret.Point.distance(new egret.Point(gunPos.x + this._offsetWidth, gunPos.y), destPos) / CONFIG.BULLET_SPEED;
            /**给子弹绑定移动逻辑**/
            bullet.moveLogicBind(FishUtil.GET_BULLET_MOVELOGIC(bullet, destX, destY, 1, costTime));
            this._bulletLayer.addChild(bullet);
            this.getBulletList().push(bullet);
            this._bulletId++;
            bullet.setBulletId(this._bulletId);
            //发送开炮消息
            this.send(NotifyEnum.GUN_SEND, { angle: RoomUtil.getAngleByFlip(rotationGun, this._isFlip), gunIndex: gunIndex, bulletId: this._bulletId });
        }
        else {
            var gunObj = this._roomUI.gunList[pos];
            if (gunObj) {
                if (gunObj.getGunLocked()) {
                    this.send(NotifyEnum.CHECK_UNLOCKGUNUI_LOADED, true);
                    gunObj.setLocked(false);
                    return;
                }
            }
            var flag_0 = game.util.GameUtil.isEnough(CurrencyEnum.COINS, 0, false);
            if (flag_0 && this._userModel.getCoins() > 0) {
                var send = new ChangeGunSendMessage();
                send.initData();
                send.setType(ChangeGunState.AUTO_CHANGE);
                NetManager.send(send);
            }
            if (bulletCount == 0 && this._userModel.getCoins() <= 0 && this._userModel.getBankruptTime() <= 0) {
                game.util.GameUtil.popTips(game.util.Language.getText(2));
                var req = new BankruptMessage();
                req.initData();
                req.setState(0);
                NetManager.send(req);
                this.cleanBuff();
            }
            //破产时候。弹出充值
            if (bulletCount == 0 && this._userModel.getCoins() <= 0 && this._userModel.getBankruptTime() > 0) {
                this.cleanBuff();
                burn._Notification_.send(NotifyEnum.AUTO_GUN_FIRE, 1);
                this.send(NotifyEnum.POP_CHARGE, { type: ChargeType.Gold });
            }
        }
    };
    //其他玩家开炮
    RoomView.prototype.otherGunFire = function (pos, angle, bClone, gunIndex, isRage, skinId) {
        if (bClone === void 0) { bClone = false; }
        if (gunIndex === void 0) { gunIndex = 0; }
        if (isRage === void 0) { isRage = false; }
        var bulletCount = this.getBulletNumByPos(pos, this._isFlip);
        if (bulletCount >= this.BULLET_MAX_COUNT) {
            return;
        }
        var gunPos = this.getRoomUI().getGunByPos(pos, bClone, gunIndex);
        gunPos.x -= CONFIG.adaptX;
        //创建子弹
        var skinVo = game.table.T_Gun_skin_Table.getVoByKey(skinId);
        var bulId = skinVo.bulletId;
        if (isRage) {
            bulId = skinVo.rageBulletId;
            this._roomUI.setGunRageEff(pos, true, bClone, gunIndex);
        }
        var bullet = null;
        if (FishingObjPool.getInstance()) {
            bullet = FishingObjPool.getInstance().getBulletObj(bulId);
        }
        else {
            bullet = new BulletBase(bulId);
        }
        //设置炮台UI旋转角度
        this._roomUI.gunfire(pos, angle, bClone, gunIndex);
        if (bClone) {
            bullet.belongGun = RoomUtil.getPosByFlip(pos, this._isFlip);
            bullet.bePos = skinId;
            bullet.nGunIndex = gunIndex;
        }
        else {
            bullet.belongGun = RoomUtil.getPosByFlip(pos, this._isFlip);
            bullet.bePos = skinId;
            bullet.nGunIndex = -1;
        }
        //bullet.belongGun = pos;
        bullet.setBulletPos(gunPos.x + this._offsetWidth, gunPos.y, angle);
        var degree = Math.PI / 180 * (bullet.rotation - 270);
        var destX = gunPos.x + this._offsetWidth + Math.cos(degree) * 2000;
        var destY = gunPos.y + Math.sin(degree) * 2000;
        var destPos = new egret.Point(destX, destY);
        var costTime = egret.Point.distance(new egret.Point(gunPos.x + this._offsetWidth, gunPos.y), destPos) / CONFIG.BULLET_SPEED;
        //给子弹绑定移动逻辑
        bullet.moveLogicBind(FishUtil.GET_BULLET_MOVELOGIC(bullet, destX, destY, 1, costTime));
        this._bulletLayer.addChild(bullet);
        this.getBulletList().push(bullet);
    };
    //加鱼
    RoomView.prototype.addUnitFish = function (type, uniqIdArr, fishId, pahtId, pos, aliveTime, pathPot) {
        if (aliveTime === void 0) { aliveTime = 0; }
        if (pathPot === void 0) { pathPot = -1; }
        //测试提供接口
        if (CONFIG.DEBUG) {
            if (CONFIG.TEST_FISH_ID > 0) {
                fishId = CONFIG.TEST_FISH_ID;
                type = AddFishType.FISH;
            }
            if (CONFIG.TEST_PATH_ID > 0) {
                pahtId = CONFIG.TEST_PATH_ID;
            }
        }
        var self = this;
        var fish;
        //处理鱼的出生handler
        var drawFishHandler = function () {
            //处理已经在鱼塘中存活的鱼，让其不让在起始点出生。
            var rota = 0;
            var flipY = false;
            if (aliveTime > 0) {
                var result = RoomUtil.getPointsAndPos(arr, aliveTime);
                arr = result[0];
                pos.x = pos.x + result[1].x;
                pos.y = pos.y + result[1].y;
                rota = result[2];
                flipY = result[3];
            }
            //处理葫芦产生的鱼路径问题 
            if (pathPot >= 0) {
                var result = RoomUtil.getPointsAndPosByCala(arr, pathPot);
                arr = result[0];
                pos.x = pos.x + result[1].x;
                pos.y = pos.y + result[1].y;
                rota = result[2];
                flipY = result[3];
            }
            //设置actor对象锚点为中心
            //fish.anchorOffsetX = fish.width/2;
            //fish.anchorOffsetY = fish.height/2;
            pos.x += CONFIG.adaptX;
            pos.y += CONFIG.adaptY;
            fish.setFishPosition(pos);
            fish.rotation = rota;
            //处理已经在鱼塘中存活的鱼反转问题
            if ((aliveTime > 0)
                || (pathPot >= 0)) {
                if (self._isFlip) {
                    if (flipY) {
                        fish.fishflipY();
                    }
                }
                else {
                    if (flipY) {
                        fish.fishflipY();
                    }
                }
            }
            if (type == AddFishType.FISH || type == AddFishType.CATCH_WHOLE_FISH) {
                var fishVo = game.table.T_Fish_Table.getVoByKey(fishId);
                self._objectLayer.addFishAt(fish, fishVo.layer);
            }
            else if (type == AddFishType.FISH_GROUP) {
                var fishGroupVo = game.table.T_FishGroup_Table.getVoByKey(fishId);
                var fishVo = game.table.T_Fish_Table.getVoByKey(fishGroupVo.fishId);
                self._objectLayer.addFishAt(fish, fishVo.layer);
            }
            else {
                self._objectLayer.addFishAt(fish, 1);
            }
            // this._objectLayer.addChild(fish);
            var action = new room.action.PointsAction(fish);
            action.runByData(arr);
            self.getFishList().push(action);
            if (true) {
                //如果是调试状态，则显示路径id 
                if (CONFIG.DEBUG) {
                    var label = new egret.TextField();
                    label.text = "PATH:" + pahtId;
                    fish.addChild(label);
                }
            }
        };
        //给鱼绑定移动逻辑
        var strMove = game.table.T_FishPath_Table.getVoByKey(pahtId);
        var arr = RoomUtil.getFishPathById(pahtId);
        //创建鱼 
        if (type == AddFishType.FISH) {
            fish = FishingObjPool.getInstance().getFishById(fishId);
            if (fish == null) {
                fish = new room.actor.FishBase(fishId, function () {
                    if (self._isFlip) {
                        fish.fishflipY();
                    }
                    fish.setType(type);
                    drawFishHandler();
                });
                fish.setUniqId(uniqIdArr[0]);
            }
            else {
                if (self._isFlip) {
                    fish.fishflipY();
                }
                fish.setType(type);
                drawFishHandler();
                fish.setUniqId(uniqIdArr[0]);
            }
        }
        else if (type == AddFishType.FISH_GROUP) {
            fish = new room.actor.FishGroup(fishId, uniqIdArr, function () {
                if (self._isFlip) {
                    fish.fishflipY();
                }
                fish.setType(type);
                drawFishHandler();
            });
        }
        else if (type == AddFishType.CATCH_WHOLE_FISH) {
            fish = FishingObjPool.getInstance().getFishById(fishId);
            if (fish == null) {
                fish = new room.actor.FishBase(fishId, function () {
                    fish.setUniqId(uniqIdArr[0]);
                    fish.addChassis(fishId);
                    if (self._isFlip) {
                        fish.fishflipY();
                    }
                    fish.setType(type);
                    drawFishHandler();
                }, self._isFlip);
            }
            else {
                fish.setUniqId(uniqIdArr[0]);
                fish.addChassis(fishId);
                if (self._isFlip) {
                    fish.fishflipY();
                }
                fish.setType(type);
                drawFishHandler();
            }
        }
    };
    //冰冻
    RoomView.prototype.frozen = function (fishIds) {
        //播放冰冻特效
        this._bulletLayer.playFrozenEffect();
        /*
        let len = fishIds.length;
        //暂停鱼的游动
        for(let i = 0; i < len; i++) {
            let fish = RoomUtil.getActionByUid(this.getFishList(),fishIds[i]);
            fish && fish.pause();
        }
        */
        var len = this.getFishList().length;
        //让鱼重新游动
        for (var i = 0; i < len; i++) {
            var action = this.getFishList()[i];
            if (action.getActor().getUniqId() != Especial_Fish.Phoenix) {
                action.pause();
            }
        }
    };
    //解除冰冻
    RoomView.prototype.unfrozen = function () {
        this._bulletLayer.clearFrozenEffect();
        var len = this.getFishList().length;
        //让鱼重新游动
        for (var i = 0; i < len; i++) {
            var action = this.getFishList()[i];
            action.resume();
        }
    };
    //BOSS来临
    RoomView.prototype.bossComing = function (fId) {
        this._bulletLayer.bossComing(fId);
    };
    //显示鱼潮来临
    RoomView.prototype.showWave = function (callback) {
        this._bulletLayer.showWave(callback, this._isFlip);
    };
    /**
     * 使用葫芦
     * roomerPos:玩家位置
     * pathPoint：鱼从pathId的哪个点开始
     * cx,cy：是鱼原始的出生点
     * x, y：是仍葫芦鱼产生的点
     */
    RoomView.prototype.useCalabash = function (roomerPos, uniqId, fishId, pathId, cx, cy, x, y, pathPoint) {
        var pathVo = game.table.T_FishPath_Table.getVoByKey(pathId);
        //播放仍葫芦特效
        x += CONFIG.adaptX;
        y += CONFIG.adaptY;
        game.util.FrameUtil.playHuluEffect(roomerPos, uniqId, fishId, pathId, pathPoint, cx, cy, x, y, this);
    };
    /** 打开抽奖提示面板 */
    RoomView.prototype.openLotteryTips = function (score, killNum, max) {
        this._roomUI.openLotteryGroupWithData(score, killNum, max);
    };
    /**设置解锁炮倍面板内容 */
    RoomView.prototype.setGunUpdateContains = function (gunId, value, max) {
        this._roomUI.setUpdateGunNum(gunId, value, max);
    };
    /**打开解锁炮倍面板 */
    RoomView.prototype.openGunUpdateTips = function () {
        this._roomUI.openGunUpdateGroup(null);
    };
    /** 只能打开解锁炮倍面板 */
    RoomView.prototype.openGunUpdateGroupByEnough = function () {
        this._roomUI.openGunUpdateGroupByEnough();
    };
    //打开抽奖UI
    RoomView.prototype.openLotteryUI = function (to) {
        var lotterUI = new room.LotteryUI(to);
        lotterUI.x += CONFIG.adaptX;
        lotterUI.y += CONFIG.adaptY;
        this.addChildAt(lotterUI, 82);
    };
    //根据玩家位置设置玩家金币数量显示
    RoomView.prototype.setRoomerCoins = function (pos, num, isTween) {
        if (isTween === void 0) { isTween = false; }
        var newPos = RoomUtil.getPosByFlip(pos, this._isFlip);
        this._roomUI.updateRoomerCoins(newPos, num, isTween);
    };
    //根据玩家位置设置玩家子弹数量显示
    RoomView.prototype.setRoomerBullet = function (pos, num, isTween) {
        if (isTween === void 0) { isTween = false; }
        var newPos = RoomUtil.getPosByFlip(pos, this._isFlip);
        this._roomUI.updateRoomerCoins(newPos, num, isTween);
    };
    //根据玩家位置设置炮台皮肤
    RoomView.prototype.changeGunSkin = function (roomer) {
        this._roomUI.changeGunSkin(roomer, this._isFlip);
    };
    //根据玩家位置设置玩家钻石数量显示
    RoomView.prototype.setRoomerMoney = function (pos, num) {
        var newPos = RoomUtil.getPosByFlip(pos, this._isFlip);
        this._roomUI.updateRoomerMoney(newPos, num);
    };
    //根据玩家位置设置玩家金币数量显示
    RoomView.prototype.setRoomerGunRate = function (pos, num, bClone) {
        if (bClone === void 0) { bClone = false; }
        var newPos = RoomUtil.getPosByFlip(pos, this._isFlip);
        this._roomUI.updateGunRate(newPos, num, bClone);
    };
    //设置道具数量
    RoomView.prototype.setPropNum = function (frozen, lock, clone, rage, calabash, goleHead, silverHead, bronzeHead, nuclearHead) {
        if (this._roomUI.getFrozenAndLockUI()) {
            this._roomUI.getFrozenAndLockUI().setFrozenTxt("" + frozen);
            this._roomUI.getFrozenAndLockUI().setLockTxt("" + lock);
        }
        if (this._roomUI.getSidePropUI()) {
            this._roomUI.getSidePropUI().setCloneTxt("" + clone);
            this._roomUI.getSidePropUI().setRageTxt("" + rage);
            this._roomUI.getSidePropUI().setCalabashTxt("" + calabash);
        }
        if (this._roomUI.getGoldBtn()) {
            this._roomUI.getGoldBtn().setNum("" + goleHead);
        }
        if (this._roomUI.getSilverBtn()) {
            this._roomUI.getSilverBtn().setNum("" + silverHead);
        }
        if (this._roomUI.getBronzeBtn()) {
            this._roomUI.getBronzeBtn().setNum("" + bronzeHead);
        }
        if (this._roomUI.getNuclearBtn()) {
            this._roomUI.getNuclearBtn().setNum("" + nuclearHead);
        }
    };
    //设置对象池
    RoomView.prototype.setObjPool = function () {
        FishingObjPool.getInstance().reset();
    };
    //获取子弹层
    RoomView.prototype.getBulletLayer = function () {
        return this._bulletLayer;
    };
    //获取tips层
    RoomView.prototype.getCeilingLayer = function () {
        return this._ceilingLayer;
    };
    //获取UI层
    RoomView.prototype.getRoomUI = function () {
        return this._roomUI;
    };
    //获取反转状态
    RoomView.prototype.getIsFlip = function () {
        return this._isFlip;
    };
    RoomView.prototype.setLocked = function (flag) {
        this._isLocked = flag;
    };
    RoomView.prototype.getLocked = function () {
        return this._isLocked;
    };
    //设置狂暴状态
    RoomView.prototype.setRage = function (flag) {
        this._isRage = flag;
    };
    //设置狂暴特效
    RoomView.prototype.setRageEffect = function (flag, pos) {
        if (flag) {
            var child = this.getBulletLayer().getChildByName("fazhen" + pos);
            if (child) {
                this.getBulletLayer().removeChild(child);
            }
            var posObj = this._roomUI.getGunPointByPos(pos, this.isFlip());
            var posPoint = new egret.Point(posObj.x, posObj.y);
            var posX = posPoint.x + CONFIG.adaptX;
            var posY = posPoint.y + CONFIG.adaptY;
            var posFlip = RoomUtil.getPosByFlip(pos, this._isFlip);
            //播放动画
            game.util.BonesUtil.kuangbaoEffct(this.getBulletLayer(), this, posX, posY, posFlip);
        }
        else {
            var posFlip = RoomUtil.getPosByFlip(pos, this._isFlip);
            var child = this.getBulletLayer().getChildByName("kuangbao" + posFlip);
            if (child) {
                this.getBulletLayer().removeChild(child);
            }
        }
    };
    //设置分身特效
    RoomView.prototype.setCloneEffect = function (flag, pos) {
        if (flag) {
            var child = this.getBulletLayer().getChildByName("fazhen" + pos);
            if (child) {
                this.getBulletLayer().removeChild(child);
            }
            var child1 = this.getBulletLayer().getChildByName("kuangbao" + pos);
            if (child1) {
                this.getBulletLayer().removeChild(child1);
            }
            var posObj = this._roomUI.getGunPointByPos(pos, this.isFlip());
            var posPoint = new egret.Point(posObj.x, posObj.y);
            var posX = posPoint.x + CONFIG.adaptX;
            var posY = posPoint.y + CONFIG.adaptY;
            //播放动画
            game.util.GameUtil.cloneEffect(this.getBulletLayer(), this, posX, posY, pos);
        }
        else {
            var child = this.getBulletLayer().getChildByName("clone" + pos);
            if (child) {
                this.getBulletLayer().removeChild(child);
            }
        }
    };
    //设置锁定特效
    RoomView.prototype.setLockedEffect = function (flag, pos) {
        if (flag) {
            var posObj = this._roomUI.getGunPointByPos(pos, this.isFlip());
            var posPoint = new egret.Point(posObj.x, posObj.y);
            var posX = posPoint.x + CONFIG.adaptX;
            var posY = posPoint.y + CONFIG.adaptY;
            //播放动画
            game.util.GameUtil.fazhenEffect(this.getBulletLayer(), this, posX, posY, pos);
        }
        else {
            var child = this.getBulletLayer().getChildByName("fazhen" + pos);
            if (child) {
                this.getBulletLayer().removeChild(child);
            }
        }
    };
    RoomView.prototype.getRage = function () {
        return this._isRage;
    };
    //锁定功能改
    RoomView.prototype.setLockedObj = function (objLocked) {
        if (this._arrLockedObj == null) {
            this._arrLockedObj = new Array();
        }
        var len = this._arrLockedObj.length;
        for (var i = 0; i < len; i++) {
            if (this._arrLockedObj[i].getLockedPos() == objLocked.getLockedPos()) {
                this._arrLockedObj[i] = objLocked;
                return;
            }
        }
        this._arrLockedObj.push(objLocked);
    };
    //去掉锁定对象
    RoomView.prototype.deleteLockedObj = function (nUserId, isAll) {
        if (isAll === void 0) { isAll = true; }
        if (this._arrLockedObj == null) {
            this._arrLockedObj = new Array();
        }
        var index = -1;
        var len = this._arrLockedObj.length;
        for (var i = 0; i < len; i++) {
            if (this._arrLockedObj[i].getUserId() == nUserId) {
                index = i;
                break;
            }
        }
        if (index != -1) {
            var UserId = this._userModel.getUserId();
            if (nUserId == UserId && isAll) {
                this.setSelectFishState(false);
            }
            if (this._arrLockedObj[index] != null) {
                var ids = this._arrLockedObj[index].getLockedID();
                for (var i = 0; i < ids.length; i++) {
                    var fish = RoomUtil.getFishById(this.getFishList(), ids[i]);
                    if (fish) {
                        fish.removeEffect("locked");
                    }
                }
            }
            if (isAll) {
                this._arrLockedObj.splice(index, 1);
            }
            else {
                this._arrLockedObj[index].spliceLockedID();
            }
        }
    };
    //锁定者是自己
    RoomView.prototype.isLockedMine = function () {
        if (this._arrLockedObj) {
            var len = this._arrLockedObj.length;
            if (len == 0) {
                return false;
            }
            var UserId = this._userModel.getUserId();
            for (var i = 0; i < len; i++) {
                if (this._arrLockedObj[i].getUserId() == UserId) {
                    return true;
                }
            }
        }
        return false;
    };
    //设置自己锁定的鱼
    RoomView.prototype.setLockedFishMindeId = function (nUserId, nLockedId, gunIndex) {
        if (this._arrLockedObj == null || this._arrLockedObj.length == 0) {
            return;
        }
        var len = this._arrLockedObj.length;
        for (var i = 0; i < len; i++) {
            if (this._arrLockedObj[i].getUserId() == nUserId) {
                this._arrLockedObj[i].setLockedId(nLockedId, gunIndex);
                break;
            }
        }
    };
    //获取自己锁定的鱼ID
    RoomView.prototype.getLockedFishId = function (nUserId, nGunIndex) {
        if (nGunIndex === void 0) { nGunIndex = 0; }
        if (this._arrLockedObj == null) {
            return -1;
        }
        var len = this._arrLockedObj.length;
        if (len == 0) {
            return -1;
        }
        for (var i = 0; i < len; i++) {
            var obj = this._arrLockedObj[i];
            if (obj.getUserId() == nUserId) {
                return obj.getLockedID()[nGunIndex];
            }
        }
        return -1;
    };
    //更改自己锁定的鱼
    RoomView.prototype.changeLockedFish = function (nUserId, fishTarget, gunIndex) {
        if (gunIndex === void 0) { gunIndex = 0; }
        var preFish = RoomUtil.getFishById(this.getFishList(), this.getLockedFishId(nUserId, gunIndex));
        if (preFish && nUserId == this._userModel.getUserId()) {
            preFish.removeEffect("locked");
        }
        //如果别人锁定的鱼为空。则跳过该阶段 
        if (fishTarget == null) {
            return;
        }
        var fishId = fishTarget.getUniqId();
        this.setLockedFishMindeId(nUserId, fishId, gunIndex);
        if (nUserId == this._userModel.getUserId()) {
            game.util.GameUtil.setLockedEffect(fishTarget, "locked", "locked_circle_png");
        }
    };
    //当前子弹是否是碰撞子弹
    RoomView.prototype.isBulletLocked = function (bBelongGun) {
        var bLocked = false;
        var obj = this._arrLockedObj;
        if (obj) {
            var len = obj.length;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    if (obj[i].getLockedPos() == bBelongGun) {
                        return true;
                    }
                }
            }
        }
        return bLocked;
    };
    //当前子弹锁定的鱼的ID
    RoomView.prototype.getBulletLockedId = function (bBelongGun) {
        var obj = this._arrLockedObj;
        if (obj) {
            var len = obj.length;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    if (obj[i].getLockedPos() == bBelongGun) {
                        return obj[i].getLockedID();
                    }
                }
            }
        }
        return null;
    };
    //分身状态
    RoomView.prototype.setClone = function (flag) {
        this._isClone = flag;
        if (this._isClone) {
            this.getRoomUI().setGunState(RoomUtil.getPosByFlip(this._myPositon, this._isFlip), true, 3, this._myPositon);
        }
        else {
            this.getRoomUI().setGunState(RoomUtil.getPosByFlip(this._myPositon, this._isFlip), false, 3, this._myPositon);
        }
    };
    RoomView.prototype.setGunNum = function (nGunNum) {
        this._nGunNum = nGunNum;
    };
    RoomView.prototype.getClone = function () {
        return this._isClone;
    };
    RoomView.prototype.setPaobeiAddState = function (isLeft) {
        if (isLeft) {
            this._roomUI.addRateBtn_0.visible = true;
            this._roomUI.reduceRateBtn_0.visible = true;
            this._roomUI.addRateBtn_1.visible = false;
            this._roomUI.reduceRateBtn_1.visible = false;
            this._roomUI.addRateBtn_1.touchEnabled = false;
            this._roomUI.reduceRateBtn_1.touchEnabled = false;
        }
        else {
            this._roomUI.addRateBtn_0.visible = false;
            this._roomUI.reduceRateBtn_0.visible = false;
            this._roomUI.addRateBtn_0.touchEnabled = false;
            this._roomUI.reduceRateBtn_0.touchEnabled = false;
            this._roomUI.addRateBtn_1.visible = true;
            this._roomUI.reduceRateBtn_1.visible = true;
        }
    };
    //手选奖金鱼id
    RoomView.prototype.getInHandWarHeadFish = function () {
        return this._inHandWarHeadFish;
    };
    RoomView.prototype.setInHandWarheadFish = function (id) {
        this._inHandWarHeadFish = id;
    };
    RoomView.prototype.resetInHandWarHeadFish = function () {
        this._inHandWarHeadFish = -1;
    };
    //设置选择鱼的状态
    RoomView.prototype.setSelectFishState = function (state) {
        this._selectFishState = state;
        if (this._selectFishState) {
            this._objectLayer.touchEnabled = true;
            this._bgLayer.touchEnabled = false;
        }
        else {
            this._objectLayer.touchEnabled = false;
            this._bgLayer.touchEnabled = true;
        }
    };
    //更新背景层的气泡特效
    RoomView.prototype.updateStageBubble = function () {
        this._floorLayer.addBubble();
    };
    //破产。清除自己的状态
    RoomView.prototype.cleanBuff = function () {
        var roomer = this._roomModel.getRoomerById(this._userModel.getUserId());
        //去除身上的锁定,狂暴,分身效果
        roomer.setIsLock(false);
        this.setLockedEffect(false, roomer.getRoomPos());
        this.setLocked(false);
        roomer.setIsClone(false);
        this.setCloneEffect(false, roomer.getRoomPos());
        this.setClone(false);
        roomer.setIsRage(false);
        this.setRageEffect(false, roomer.getRoomPos());
        this.setRage(false);
        this.deleteLockedObj(this._userModel.getUserId(), true);
    };
    //设置破产
    RoomView.prototype.setBackrupt = function (pos, time, showTime) {
        if (showTime === void 0) { showTime = false; }
        var rPos = RoomUtil.getPosByFlip(pos, this._isFlip);
        this._roomUI.setBankrupt(rPos, time, showTime);
    };
    //移除破产状态
    RoomView.prototype.removeBankrupt = function (pos) {
        var rPos = RoomUtil.getPosByFlip(pos, this._isFlip);
        this._roomUI.removeBankrupt(rPos);
    };
    //显示倒计时数字
    RoomView.prototype.showNum = function (num) {
        this._bulletLayer.showNum(num);
    };
    RoomView.prototype.showChakan = function (roomer) {
        if (!this.getRoomUI().chakanUI) {
            return;
        }
        this.getRoomUI().setShowChakan(roomer, this.isFlip());
    };
    //获取自己炮口位置
    RoomView.prototype.getMyPosition = function () {
        return this._myPositon;
    };
    //获取自己炮口的偏移量
    RoomView.prototype.getOffsetWidth = function () {
        return this._offsetWidth;
    };
    //获取自己是否是翻转状态
    RoomView.prototype.isFlip = function () {
        return this._isFlip;
    };
    //设置自动开炮
    RoomView.prototype.setAutoGunFire = function (bAuto) {
        if (bAuto) {
            this._autoFire = false;
            return;
        }
        if (this._autoFire) {
            this._autoFire = false;
        }
        else {
            this._autoFire = true;
        }
    };
    ///////////////////////////////////////////////新手引导相关/////////////////////////////////////////////////////
    RoomView.prototype.guide_addFish = function () {
        //测试提供接口
        //创建鱼 
        var fish = new room.actor.FishBase(22);
        fish.setUniqId(Especial_Fish.Guide_Fish);
        var type = AddFishType.FISH;
        fish.setType(type);
        //处理已经在鱼塘中存活的鱼，让其不让在起始点出生。
        var rota = 0;
        //处理已经在鱼塘中存活的鱼反转问题
        if (this.isFlip()) {
            fish.fishflipY();
            var pos = new egret.Point(CONFIG.contentWidth / 2 - 100, CONFIG.contentHeight / 2 + 120);
            pos.x += CONFIG.adaptX;
            pos.y += CONFIG.adaptY;
            fish.setFishPosition(pos);
        }
        else {
            var pos = new egret.Point(CONFIG.contentWidth / 2 - 100, CONFIG.contentHeight / 2 - 50);
            pos.x += CONFIG.adaptX;
            pos.y += CONFIG.adaptY;
            fish.setFishPosition(pos);
        }
        var tw = egret.Tween.get(fish, { loop: false });
        tw.to({ scaleX: 1.7, scaleY: 1.7 }, 400)
            .call(function () {
            egret.Tween.removeTweens(fish);
        });
        this._objectLayer.addFishAt(fish, 3);
        // this._objectLayer.addChild(fish);
        var action = new room.action.PointsAction(fish);
        action.setActionAlive(true);
        this.getFishList().push(action);
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //销毁
    RoomView.prototype.destroy = function () {
        //销毁RoomUI
        this._roomUI.destory();
        //消耗floor层
        this._floorLayer.destory();
        //移除触摸事件
        this._bgLayer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this._bgLayer.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this._bgLayer.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this._bgLayer.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchCacel, this);
        //移除帧事件
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.removeChildren();
        this.parent && this.parent.removeChild(this);
    };
    return RoomView;
}(room.base.RoomBase));
__reflect(RoomView.prototype, "RoomView");
//# sourceMappingURL=RoomView.js.map