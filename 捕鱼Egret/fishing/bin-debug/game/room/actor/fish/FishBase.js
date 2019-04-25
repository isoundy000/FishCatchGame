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
        var FishBase = (function (_super) {
            __extends(FishBase, _super);
            function FishBase(id, loadCallback, bViewFlip) {
                if (loadCallback === void 0) { loadCallback = null; }
                if (bViewFlip === void 0) { bViewFlip = false; }
                var _this = _super.call(this) || this;
                /** 是否是组合鱼 */
                _this._isGroupFish = false;
                _this._preLoadMaxCount = 1;
                _this._preLoadCount = 0;
                _this._loadCallback = loadCallback;
                _this._bIsBling = false;
                _this._bModifed = false;
                _this._bFlipY = false;
                _this._rectList = new Array();
                _this.CHASIS_LAYER = new egret.DisplayObjectContainer();
                _this.CHASIS_LAYER.anchorOffsetX = _this.CHASIS_LAYER.width / 2;
                _this.CHASIS_LAYER.anchorOffsetY = _this.CHASIS_LAYER.height / 2;
                _this.addChild(_this.CHASIS_LAYER);
                _this.FISH_LAYER = new egret.DisplayObjectContainer();
                _this.FISH_LAYER.anchorOffsetX = _this.FISH_LAYER.width / 2;
                _this.FISH_LAYER.anchorOffsetY = _this.FISH_LAYER.height / 2;
                _this.addChild(_this.FISH_LAYER);
                _this.EFFECT_LAYER = new egret.DisplayObjectContainer();
                _this.EFFECT_LAYER.anchorOffsetX = _this.EFFECT_LAYER.width / 2;
                _this.EFFECT_LAYER.anchorOffsetY = _this.EFFECT_LAYER.height / 2;
                _this.addChild(_this.EFFECT_LAYER);
                _this.FISH_POP_LAYER = new egret.DisplayObjectContainer();
                _this.FISH_POP_LAYER.anchorOffsetX = _this.FISH_POP_LAYER.width / 2;
                _this.FISH_POP_LAYER.anchorOffsetY = _this.FISH_POP_LAYER.height / 2;
                _this.addChild(_this.FISH_POP_LAYER);
                _this._bViewFlip = bViewFlip;
                _this.init(id);
                return _this;
            }
            /** 初始化鱼的数据 */
            FishBase.prototype.init = function (id) {
                var _this = this;
                this._fid = id;
                var dataVo = game.table.T_Fish_Table.getVoByKey(id);
                if (dataVo == null) {
                    console.log("Warnning!!!the fish data is null,id--->", id);
                    return;
                }
                //初始化鱼的倍率
                this._fishScore = dataVo.score;
                this._groupFishList = new Array();
                if (dataVo.groupId <= 0) {
                    this.preLoadData(dataVo.resRunUrl, 0, 0, dataVo.frameRate);
                }
                else {
                    this._isGroupFish = true;
                    var data = game.table.T_FishGroup_Table.getVoByKey(dataVo.groupId);
                    if (data) {
                        this._groupChasisArr = new Array();
                        var posStr = data.pos;
                        var singleFishArr = posStr.split("|");
                        var singLen = singleFishArr.length;
                        this._chasisModify = new Array();
                        this._preLoadMaxCount = singLen;
                        var _loop_1 = function (i) {
                            var fishData = singleFishArr[i].split("_");
                            var fishId = fishData[0].split(",");
                            var pos = fishData[1].split(",");
                            var fishVo = game.table.T_Fish_Table.getVoByKey(Number(fishId[0]));
                            this_1.preLoadData(fishVo.resRunUrl, Number(pos[0]), Number(pos[1]), dataVo.frameRate);
                            //鱼的底盘
                            var chasisStr = RoomUtil.getChasisByType(ChasisFish.GROUP_FISH, Number(fishId[1]));
                            RES.getResAsync(chasisStr, function (tData, key) {
                                var chasisImg = new egret.Bitmap(tData);
                                _this.CHASIS_LAYER.addChild(chasisImg);
                                chasisImg.scaleX = chasisImg.scaleY = Number(fishId[2]);
                                chasisImg.anchorOffsetX = chasisImg.width / 2;
                                chasisImg.anchorOffsetY = chasisImg.height / 2;
                                chasisImg.x = Number(fishId[3]);
                                chasisImg.y = Number(fishId[4]);
                                burn.tools.TweenTools.rotationFan(chasisImg, 2000);
                                _this._groupChasisArr.push(chasisImg);
                                _this._chasisModify.push(Number(fishId[4]) - Number(pos[1]));
                            }, this_1);
                        };
                        var this_1 = this;
                        for (var i = 0; i < singLen; i++) {
                            _loop_1(i);
                        }
                        //添加帧事件
                        this._groupChasisLen = this._groupChasisArr.length;
                    }
                    else {
                        console.error("没有这个组合鱼！");
                    }
                }
            };
            FishBase.prototype.preLoadData = function (url, posX, posY, frameRate) {
                var _this = this;
                RES.getResAsync(url + "_json", function () {
                    RES.getResAsync(url + "_png", function () {
                        if (RES.hasRes(url + "_rect_json")) {
                            RES.getResAsync(url + "_rect_json", function () {
                                _this.initFishData(url, posX, posY, frameRate);
                                _this._preLoadCount++;
                                if (_this._preLoadCount >= _this._preLoadMaxCount) {
                                    _this._loadCallback && _this._loadCallback();
                                }
                            }, _this);
                        }
                        else {
                            _this.initFishData(url, posX, posY, frameRate);
                            _this._preLoadCount++;
                            if (_this._preLoadCount >= _this._preLoadMaxCount) {
                                _this._loadCallback && _this._loadCallback();
                            }
                        }
                    }, _this);
                }, this);
            };
            FishBase.prototype.initFishData = function (url, posX, posY, frameRate) {
                var _this = this;
                var data = RES.getRes(url + "_json");
                var txtr = RES.getRes(url + "_png");
                if (false) {
                    if (data == undefined || txtr == undefined) {
                        var userM = burn.Director.getModelByKey(UserModel);
                        console.error("类型为" + userM.getMatchRoomLevel() + "的房间不存在这条鱼：" + url);
                        data = RES.getRes("xiaochouyu_json");
                        txtr = RES.getRes("xiaochouyu_png");
                        url = "xiaochouyu";
                    }
                }
                if (true) {
                    if (data == undefined || txtr == undefined) {
                        var userM = burn.Director.getModelByKey(UserModel);
                        console.error("类型为" + userM.getMatchRoomLevel() + "的房间不存在这条鱼：" + url);
                    }
                }
                var mcFactory = new egret.MovieClipDataFactory(data, txtr);
                var mcFish = new egret.MovieClip(mcFactory.generateMovieClipData(url));
                var dataMc = mcFish.movieClipData;
                var frameCur = 0;
                this._modifyRect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
                mcFish.anchorOffsetX = mcFish.width / 2;
                mcFish.anchorOffsetY = mcFish.height / 2;
                mcFish.x = posX;
                mcFish.y = posY;
                //对鱼的资源进行缩放使用
                mcFish.scaleX = mcFish.scaleY = 1.5;
                this.FISH_LAYER.addChild(mcFish);
                //保存到集合中
                this._groupFishList.push(mcFish);
                if (CONFIG.DEBUG) {
                    if (CONFIG.TEST_fishFrameRate > 0) {
                        mcFish.frameRate = CONFIG.TEST_fishFrameRate;
                    }
                    else {
                        if (frameRate > 0) {
                            mcFish.frameRate = frameRate;
                        }
                        else {
                            mcFish.frameRate = CONFIG.defaultFishFrameRate;
                        }
                    }
                }
                else {
                    if (frameRate > 0) {
                        mcFish.frameRate = frameRate;
                    }
                    else {
                        mcFish.frameRate = CONFIG.defaultFishFrameRate;
                    }
                }
                mcFish.gotoAndPlay("run", -1);
                var rectData = RES.getRes(url + "_rect_json");
                if (rectData != null) {
                    var dataRect = rectData.rect;
                    var rectLen = dataRect.length;
                    for (var i = 0; i < rectLen; i++) {
                        var rect = new egret.Rectangle(dataRect[i].x, dataRect[i].y, dataRect[i].w, dataRect[i].h);
                        var shape = new egret.Shape();
                        shape.graphics.beginFill(0xff0000, 0);
                        if (CONFIG.DEBUG) {
                            shape.graphics.lineStyle(2, 0x000000);
                            shape.visible = true;
                        }
                        else {
                            shape.graphics.lineStyle(2, 0x000000, 0);
                            shape.visible = false;
                        }
                        shape.graphics.drawRect(rect.x, rect.y, rect.width, rect.height);
                        shape.graphics.endFill();
                        shape.x = posX;
                        shape.y = posY;
                        this.FISH_LAYER.addChild(shape);
                        this._rectList.push(shape);
                    }
                }
                var self = this;
                //boss_shield
                //如果是凤凰
                if (url == "fenghuang") {
                    var userModel = burn.Director.getModelByKey(UserModel);
                    var roomModel = burn.Director.getModelByKey(RoomModel);
                    if (roomModel.getPhoenix()) {
                        var phoenixObj = roomModel.getPhoenix();
                        var cur = phoenixObj.getCurShield();
                        var max = phoenixObj.getMaxShield();
                        if ((max - cur) <= 0) {
                            return;
                        }
                    }
                    RES.getResAsync("boss_shield_png", function () {
                        self._shield = new egret.Bitmap(RES.getRes("boss_shield_png"));
                        var vo = game.table.T_Fish_Table.getVoByKey(self._fid);
                        var strPos = vo.posLocked;
                        var arrPos = strPos.split(",");
                        var isFlipY = self.isFlipY();
                        var isGroup = self.getIsGroupFish();
                        self._shield.x = parseInt(arrPos[0]) + self.getModifyRect().x;
                        self._shield.y = parseInt(arrPos[1]) + self.getModifyRect().y;
                        if (isFlipY) {
                            if (!isGroup) {
                                self._shield.y = -self._shield.y;
                            }
                            else {
                                if (self.getChasisModify()) {
                                    self._shield.y -= (self.getChasisModify() * 2);
                                }
                            }
                        }
                        self._shield.anchorOffsetX = self._shield.width / 2;
                        self._shield.anchorOffsetY = self._shield.height / 2;
                        self._shield.name = "boss_shield_png";
                        self.addEffect(self._shield, "boss_shield_png");
                    }, self);
                }
                if (url == "guanyu") {
                    RES.getResAsync("GuanYu_Tips_png", function () {
                        var guanyuTips = new egret.Bitmap(RES.getRes("GuanYu_Tips_png"));
                        var vo = game.table.T_Fish_Table.getVoByKey(self._fid);
                        var strPos = vo.posLocked;
                        var arrPos = strPos.split(",");
                        var isFlipY = self.isFlipY();
                        var isGroup = self.getIsGroupFish();
                        guanyuTips.x = parseInt(arrPos[0]) + self.getModifyRect().x - 20;
                        guanyuTips.y = parseInt(arrPos[1]) + self.getModifyRect().y - 200;
                        if (isFlipY) {
                            guanyuTips.y = -guanyuTips.y;
                            if (_this._bFlipY != _this._bViewFlip) {
                                if (!_this._bFlipY) {
                                    guanyuTips.scaleY = guanyuTips.scaleY;
                                    guanyuTips.scaleX = guanyuTips.scaleX;
                                }
                                else {
                                    guanyuTips.scaleY = -guanyuTips.scaleY;
                                    guanyuTips.scaleX = -guanyuTips.scaleX;
                                }
                            }
                            else {
                                if (!_this._bFlipY) {
                                    guanyuTips.scaleY = -guanyuTips.scaleY;
                                    guanyuTips.scaleX = -guanyuTips.scaleX;
                                }
                                else {
                                    guanyuTips.scaleY = guanyuTips.scaleY;
                                    guanyuTips.scaleX = guanyuTips.scaleX;
                                }
                            }
                        }
                        guanyuTips.anchorOffsetX = guanyuTips.width / 2;
                        guanyuTips.anchorOffsetY = guanyuTips.height;
                        guanyuTips.name = "GuanYu_Tips_png";
                        self.FISH_POP_LAYER.addChild(guanyuTips);
                    }, this);
                }
            };
            //设置位置
            FishBase.prototype.setFishPosition = function (pos) {
                this.x = pos.x;
                this.y = pos.y;
            };
            /** 碰撞检测 */
            FishBase.prototype.hitRect = function (x, y) {
                var hitId = -1;
                var len = this._rectList.length;
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        var isHit = this._rectList[i].hitTestPoint(x, y);
                        if (isHit) {
                            hitId = this.getUniqId();
                            // this.playHitEffect();
                            break;
                        }
                    }
                    return hitId;
                }
                else {
                    var isHit = this.hitTestPoint(x, y);
                    if (isHit) {
                        hitId = this.getUniqId();
                    }
                    return hitId;
                }
            };
            //在鱼身上加特效
            FishBase.prototype.addEffect = function (dis, name) {
                var child = this.EFFECT_LAYER.getChildByName(name);
                if (child == null) {
                    //dis.x = this.width/2;
                    //dis.y = this.height/2;
                    this.EFFECT_LAYER.addChildAt(dis, 7);
                    return true;
                }
                return false;
            };
            //移除鱼身上增加的特效
            FishBase.prototype.removeEffect = function (name) {
                var child = this.EFFECT_LAYER.getChildByName(name);
                if (child) {
                    this.EFFECT_LAYER.removeChild(child);
                }
            };
            FishBase.prototype.playHitEffect = function () {
                var vo = game.table.T_Fish_Table.getVoByKey(this._fid);
                var colorFlilter = new egret.ColorMatrixFilter(game.util.FilterEnmu.LESS_LIGTH);
                if (vo.Matrix == game.util.FilterEnmu.FISH_TYPE_MATRIX_1) {
                    colorFlilter = new egret.ColorMatrixFilter(game.util.FilterEnmu.FISH_TYPE_1);
                }
                else if (vo.Matrix == game.util.FilterEnmu.FISH_TYPE_MATRIX_2) {
                    colorFlilter = new egret.ColorMatrixFilter(game.util.FilterEnmu.FISH_TYPE_2);
                }
                this.getFISH_LAYER().filters = [colorFlilter];
                if (this._bIsBling) {
                    return;
                }
                this._blingTimer = new egret.Timer(300, 1);
                this._blingTimer.addEventListener(egret.TimerEvent.TIMER, this.timeFun, this);
                this._blingTimer.start();
                this._bIsBling = true;
            };
            FishBase.prototype.timeFun = function () {
                if (!this._blingTimer) {
                    return;
                }
                this._blingTimer.removeEventListener(egret.TimerEvent.TIMER, this.timeFun, this);
                this.getFISH_LAYER().filters = null;
                this._bIsBling = false;
            };
            FishBase.prototype.playDead = function (isGroup) {
                if (isGroup === void 0) { isGroup = false; }
                //播放死亡音效
                game.util.SoundManager.playFishDeathSound(this._fid);
                if (isGroup) {
                    this.destory();
                }
                else {
                    //暂时停止其它动作
                    egret.Tween.removeTweens(this);
                    //播放死亡特效
                    var self_1 = this;
                    var obj_1 = this.getFISH_LAYER();
                    var vo = game.table.T_Fish_Table.getVoByKey(this._fid);
                    if (vo.deadType == FishDeadType.RotationAndScale) {
                        var tw = egret.Tween.get(obj_1, { loop: false });
                        tw.
                            to({ scaleX: 1.8, scaleY: 1.8 }, 200).
                            to({ rotation: obj_1.rotation + 360 }, 800).
                            to({ alpha: 0 }, 200).call(function () {
                            egret.Tween.removeTweens(self_1.getFISH_LAYER());
                            self_1.poolPushFish();
                        });
                    }
                    else if (vo.deadType == FishDeadType.Speed) {
                        //加快频率
                        //this._groupFishList
                        for (var i = 0; i < this._groupFishList.length; i++) {
                            this._groupFishList[i].frameRate = 25;
                        }
                        var tw = egret.Tween.get(obj_1, { loop: false });
                        tw.wait(1000).
                            to({ alpha: 0 }, 200).call(function () {
                            egret.Tween.removeTweens(self_1.getFISH_LAYER());
                            self_1.poolPushFish();
                        });
                    }
                    else if (vo.deadType == FishDeadType.SpeedAndScale) {
                        for (var i = 0; i < this._groupFishList.length; i++) {
                            this._groupFishList[i].frameRate = 25;
                        }
                        var tw = egret.Tween.get(obj_1, { loop: false });
                        tw.
                            to({ scaleX: 1.5, scaleY: 1.5 }, 200).
                            wait(1000).
                            to({ alpha: 0 }, 200).call(function () {
                            egret.Tween.removeTweens(self_1.getFISH_LAYER());
                            self_1.poolPushFish();
                        });
                    }
                    else if (vo.deadType == FishDeadType.DeadAtOnce) {
                        self_1.poolPushFish();
                    }
                    else if (vo.deadType == FishDeadType.N_1) {
                        obj_1.scaleX = 1.3;
                        obj_1.scaleY = 1.3;
                        for (var i = 0; i < this._groupFishList.length; i++) {
                            this._groupFishList[i].frameRate = 25;
                        }
                        var tw = egret.Tween.get(obj_1, { loop: false });
                        tw.wait(500).
                            to({ scaleX: 1.2, scaleY: 1.2 }, 100).
                            to({ scaleX: 1.3, scaleY: 1.3 }, 100).
                            to({ scaleX: 1.2, scaleY: 1.2 }, 100).
                            to({ scaleX: 1.3, scaleY: 1.3 }, 100).
                            to({ scaleX: 1.2, scaleY: 1.2 }, 100).
                            to({ scaleX: 1.3, scaleY: 1.3 }, 100).
                            to({ scaleX: 0.2, scaleY: 0.2, alpha: 0, rotation: obj_1.rotation - 360 }, 1200).call(function () {
                            egret.Tween.removeTweens(self_1.getFISH_LAYER());
                            self_1.poolPushFish();
                        });
                    }
                    else if (vo.deadType == FishDeadType.N_2) {
                        var tw = egret.Tween.get(obj_1, { loop: false });
                        tw.
                            wait(180).
                            call(function () {
                            obj_1.rotation -= 120;
                        }).
                            wait(180).
                            call(function () {
                            obj_1.rotation -= 120;
                        }).
                            wait(180).
                            call(function () {
                            obj_1.rotation -= 120;
                        }).
                            wait(180).
                            call(function () {
                            obj_1.rotation -= 150;
                            obj_1.alpha -= 0.125;
                        }).
                            wait(180).
                            call(function () {
                            obj_1.rotation -= 150;
                            obj_1.alpha -= 0.125;
                        }).
                            wait(180).
                            call(function () {
                            obj_1.rotation -= 150;
                            obj_1.alpha -= 0.125;
                        }).
                            wait(180).
                            call(function () {
                            obj_1.rotation -= 150;
                            obj_1.alpha -= 0.125;
                        }).
                            wait(180).
                            call(function () {
                            obj_1.rotation -= 150;
                            obj_1.alpha -= 0.25;
                        }).
                            wait(180).
                            call(function () {
                            obj_1.rotation -= 150;
                            obj_1.alpha -= 0.25;
                        }).
                            call(function () {
                            egret.Tween.removeTweens(self_1.getFISH_LAYER());
                            self_1.poolPushFish();
                        });
                    }
                    else if (vo.deadType == FishDeadType.Alpha) {
                        var tw = egret.Tween.get(obj_1, { loop: false });
                        tw.
                            to({ alpha: 0 }, 416).
                            call(function () {
                            egret.Tween.removeTweens(self_1.getFISH_LAYER());
                            self_1.poolPushFish();
                        });
                    }
                }
                if (this.EFFECT_LAYER) {
                    this.EFFECT_LAYER.removeChildren();
                }
            };
            //将死亡鱼加入对象池
            FishBase.prototype.poolPushFish = function () {
                FishingObjPool.getInstance().insertFishPool(this);
            };
            //鱼的积分倍率
            FishBase.prototype.getFishScore = function () {
                return this._fishScore;
            };
            //获取显示特效偏移量
            FishBase.prototype.getModifyRect = function () {
                return this._modifyRect;
            };
            FishBase.prototype.getIsGroupFish = function () {
                return this._isGroupFish;
            };
            FishBase.prototype.fishflipY = function () {
                if (this._isGroupFish) {
                    this.scaleY = -this.scaleY;
                    return;
                }
                var childFishs = this.FISH_LAYER.numChildren;
                for (var i = 0; i < childFishs; i++) {
                    var fish = this.FISH_LAYER.getChildAt(i);
                    fish.scaleY = -fish.scaleY;
                    if (fish.scaleY < 0) {
                        this._bFlipY = true;
                    }
                    else {
                        this._bFlipY = false;
                    }
                }
                //return;
                var childs = this.CHASIS_LAYER.numChildren;
                var bFind = false;
                for (var i = 0; i < childs; i++) {
                    var child = this.CHASIS_LAYER.getChildAt(i);
                    if (this._isGroupFish) {
                        child.scaleY = -child.scaleY;
                        if (this._chasisModify[i]) {
                            if (!this._bModifed) {
                                child.y -= (this._chasisModify[i] * 2);
                            }
                            else {
                                child.y += (this._chasisModify[i] * 2);
                            }
                            bFind = true;
                        }
                    }
                    else {
                        child.y = -child.y;
                    }
                }
                //特效翻转
                var childEffects = this.EFFECT_LAYER.numChildren;
                for (var i = 0; i < childEffects; i++) {
                    var child = this.EFFECT_LAYER.getChildAt(i);
                    if (this._isGroupFish) {
                        if (this._chasisModify[0]) {
                            if (!this._bModifed) {
                                child.y -= (this._chasisModify[0] * 2);
                            }
                            else {
                                child.y += (this._chasisModify[0] * 2);
                            }
                        }
                    }
                    else {
                        child.y = -child.y;
                    }
                }
                if (this._fid == 100) {
                    var childPop = this.FISH_POP_LAYER.numChildren;
                    for (var i = 0; i < childPop; i++) {
                        var child = this.FISH_POP_LAYER.getChildAt(i);
                        child.y = -child.y;
                        if (this._bFlipY != this._bViewFlip) {
                            if (!this._bFlipY) {
                                child.scaleY = child.scaleY;
                                child.scaleX = child.scaleX;
                            }
                            else {
                                child.scaleY = -child.scaleY;
                                child.scaleX = -child.scaleX;
                            }
                        }
                        else {
                            if (!this._bFlipY) {
                                child.scaleY = -child.scaleY;
                                child.scaleX = -child.scaleX;
                            }
                            else {
                                child.scaleY = child.scaleY;
                                child.scaleX = child.scaleX;
                            }
                        }
                    }
                }
                if (bFind) {
                    this._bModifed = !this._bModifed;
                }
            };
            FishBase.prototype.getChasisModify = function () {
                return this._chasisModify[0];
            };
            FishBase.prototype.resetData = function () {
                this.scaleX = 1;
                this.scaleY = 1;
                this.getFISH_LAYER().alpha = 1;
                this.getFISH_LAYER().scaleX = 1;
                this.getFISH_LAYER().scaleY = 1;
                this.rotation = 0;
                var dataVo = game.table.T_Fish_Table.getVoByKey(this._fid);
                var frameRate = dataVo.frameRate;
                if (frameRate <= 0) {
                    frameRate = CONFIG.defaultFishFrameRate;
                }
                for (var i = 0; i < this._groupFishList.length; i++) {
                    this._groupFishList[i].frameRate = frameRate;
                }
                var numChild = this.numChildren;
                for (var i = 0; i < numChild; i++) {
                    var child = this.getChildAt(i);
                    child.alpha = 1;
                    child.rotation = 0;
                }
                if (this._bFlipY) {
                    this.fishflipY();
                }
                if (this.EFFECT_LAYER) {
                    this.EFFECT_LAYER.removeChildren();
                }
                // for (let i = 0; i < this._groupChasisLen; i++) {
                // 	let chasisImg = this._groupChasisArr[i];
                // 	burn.tools.TweenTools.rotationFan(chasisImg, 2000);
                // }
                var numChasisChild = this.CHASIS_LAYER.numChildren;
                for (var i = 0; i < numChasisChild; i++) {
                    burn.tools.TweenTools.rotationFan(this.CHASIS_LAYER.getChildAt(i), 2000);
                }
                // for(let i = 0; i < this.numChildren; i++){
                // 	if(this.getChildAt(i) instanceof egret.MovieClip){
                // 		this.removeChild(this.getChildAt(i));
                // 	}
                // }
            };
            FishBase.prototype.destory = function () {
                var numChild = this.numChildren;
                for (var i = 0; i < numChild; i++) {
                    var child = this.getChildAt(i);
                    child.alpha = 0;
                }
                this.timeFun();
                //this.CHASIS_LAYER.addChild(chasisImg);
                var numChasisChild = this.CHASIS_LAYER.numChildren;
                for (var i = 0; i < numChasisChild; i++) {
                    egret.Tween.removeTweens(this.CHASIS_LAYER.getChildAt(i));
                }
                egret.Tween.removeTweens(this.getFISH_LAYER());
                egret.Tween.removeTweens(this);
                this.parent && this.parent.removeChild(this);
                //this._rectList = [];
                // for (let i = 0; i < this._groupChasisLen; i++) {
                // 	let img = this._groupChasisArr[i];
                // 	burn.tools.TweenTools.clearTween(img);
                // }
                //this.removeChildren();
                //this.parent && this.parent.removeChild(this);
            };
            return FishBase;
        }(room.actor.ActorBase));
        actor.FishBase = FishBase;
        __reflect(FishBase.prototype, "room.actor.FishBase");
    })(actor = room.actor || (room.actor = {}));
})(room || (room = {}));
//# sourceMappingURL=FishBase.js.map