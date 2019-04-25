var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var util;
    (function (util) {
        var FrameUtil = (function () {
            function FrameUtil() {
            }
            //彩盘特效
            FrameUtil.playCaipan = function (view, roomer, goldNum, warId, isWarDead /**是否是炸弹弄死*/) {
                if (goldNum === void 0) { goldNum = 0; }
                if (warId === void 0) { warId = "-1"; }
                if (isWarDead === void 0) { isWarDead = false; } /**是否是炸弹弄死*/
                var pos = roomer.getRoomPos();
                var gunPos1 = view.getRoomUI().getGunPointByPos(pos, view.getIsFlip());
                var gunPos = new egret.Point(gunPos1.x, gunPos1.y);
                gunPos.x += CONFIG.adaptX;
                gunPos.y += CONFIG.adaptY;
                var poY = gunPos.y;
                if (poY > 360) {
                    poY = 470 + CONFIG.adaptY;
                }
                else {
                    poY = 250 + CONFIG.adaptY;
                }
                var viewBul = view.getBulletLayer();
                var child = viewBul.getChildByName("caipan" + pos);
                child && viewBul.removeChild(child);
                var childNum = viewBul.getChildByName("caipanNum" + pos);
                childNum && viewBul.removeChild(childNum);
                var childMovie = viewBul.getChildByName("movie" + pos);
                childMovie && viewBul.removeChild(childMovie);
                var chilGuang = viewBul.getChildByName("caipanGuang" + pos);
                chilGuang && viewBul.removeChild(chilGuang);
                var data = RES.getRes("ef_caipanBg_json");
                var txtr = RES.getRes("ef_caipanBg_png");
                var mcFactory = new egret.MovieClipDataFactory(data, txtr);
                var movie = new MovieFish(mcFactory.generateMovieClipData("ef_caipanBg"), egret.Event.COMPLETE);
                movie.initEvent();
                var dataMc = movie.movieClipData;
                var frameCur = 0;
                var modifyRect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
                movie.frameRate = 14;
                movie.x = gunPos.x;
                movie.y = poY;
                movie.scaleX = 1.2;
                movie.scaleY = 1.2;
                movie.anchorOffsetX = movie.width / 2 + modifyRect.x;
                movie.anchorOffsetY = movie.height / 2 + modifyRect.y;
                movie.name = "movie" + pos;
                movie.visible = false;
                viewBul.addChild(movie);
                var caipanGuang = null;
                caipanGuang = new egret.Bitmap(RES.getRes("ef_rotation_bg2_png"));
                caipanGuang.name = "caipanGuang" + pos;
                caipanGuang.anchorOffsetX = caipanGuang.width >> 1;
                caipanGuang.anchorOffsetY = caipanGuang.height >> 1;
                caipanGuang.x = gunPos.x;
                caipanGuang.y = poY;
                caipanGuang.visible = false;
                viewBul.addChildAt(caipanGuang, 1);
                var t = 400;
                if (warId == "-1") {
                    //处理美术字
                    var numFont_1 = new egret.BitmapText();
                    var userModel = burn.Director.getModelByKey(UserModel);
                    var roomModel = burn.Director.getModelByKey(RoomModel);
                    if (roomer.getRoomPos() == pos) {
                        //bitmapNum_1_fnt
                        numFont_1.font = RES.getRes("bitmapNum_2_fnt");
                        util.SoundManager.playEffectSound("CoinLightMove");
                        util.SoundManager.playEffectSound("ubomb");
                    }
                    else {
                        //bitmapNum_2_fnt
                        numFont_1.font = RES.getRes("bitmapNum_1_fnt");
                        util.SoundManager.playEffectSound("CoinLightMove_o");
                    }
                    var rate = game.table.T_Config_Table.getVoByKey(30).value;
                    if (!isWarDead) {
                        goldNum /= (100 - parseInt(rate)) * 0.01;
                    }
                    goldNum = Math.floor(goldNum);
                    numFont_1.text = "" + goldNum;
                    viewBul.addChildAt(numFont_1, 5);
                    numFont_1.anchorOffsetX = numFont_1.width / 2;
                    numFont_1.anchorOffsetY = numFont_1.height / 2;
                    //numFont.scaleX = 0.75;
                    //numFont.scaleY = 0.75;
                    numFont_1.x = gunPos.x;
                    numFont_1.y = poY + 4;
                    numFont_1.name = "caipanNum" + pos;
                    numFont_1.scaleX = 0.01;
                    numFont_1.scaleY = 0.01;
                    egret.Tween.get(numFont_1)
                        .to({ scaleX: 1.75, scaleY: 1.75 }, 300)
                        .to({ scaleX: 0.2, scaleY: 0.2 }, 200)
                        .to({ scaleX: 1.2, scaleY: 1.2 }, 200)
                        .to({ rotation: 20 }, t)
                        .to({ rotation: -20 }, t)
                        .to({ rotation: 20 }, t)
                        .to({ rotation: -20 }, t)
                        .to({ rotation: 20 }, t)
                        .to({ rotation: -20 }, t)
                        .to({ rotation: 20 }, t)
                        .to({ rotation: -20 }, t)
                        .to({ rotation: 20 }, t)
                        .to({ rotation: -20 }, t).call(function () {
                        egret.Tween.removeTweens(numFont_1);
                    });
                }
                else {
                    var str = "warHead_" + warId + "_png";
                    var img_1 = new egret.Bitmap(RES.getRes(str));
                    viewBul.addChildAt(img_1, 5);
                    img_1.anchorOffsetX = img_1.width / 2;
                    img_1.anchorOffsetY = img_1.height / 2;
                    img_1.x = gunPos.x;
                    img_1.y = poY - 14;
                    img_1.name = "caipanNum" + pos;
                    img_1.scaleX = 0.01;
                    img_1.scaleY = 0.01;
                    egret.Tween.get(img_1)
                        .to({ scaleX: 1.75, scaleY: 1.75 }, 300)
                        .to({ scaleX: 0.2, scaleY: 0.2 }, 200)
                        .to({ scaleX: 1, scaleY: 1 }, 200)
                        .to({ rotation: 20 }, t)
                        .to({ rotation: -20 }, t)
                        .to({ rotation: 20 }, t)
                        .to({ rotation: -20 }, t)
                        .to({ rotation: 20 }, t)
                        .to({ rotation: -20 }, t)
                        .to({ rotation: 20 }, t)
                        .to({ rotation: -20 }, t)
                        .to({ rotation: 20 }, t)
                        .to({ rotation: -20 }, t).call(function () {
                        egret.Tween.removeTweens(img_1);
                    });
                }
                var caipan = null;
                var skinId = roomer.getCurSkinId();
                var vo = game.table.T_Gun_skin_Table.getVoByKey(skinId);
                var caipanUrl = vo.caipanUrl;
                RES.getResAsync(caipanUrl, function () {
                    var txture = RES.getRes(caipanUrl);
                    var icon = new egret.Bitmap(txture);
                    if (!icon) {
                        return;
                    }
                    caipan = icon;
                    caipan.name = "caipan" + pos;
                    caipan.anchorOffsetX = caipan.width >> 1;
                    caipan.anchorOffsetY = caipan.height >> 1;
                    caipan.x = gunPos.x;
                    caipan.y = poY;
                    viewBul.addChildAt(caipan, 2);
                    caipan.scaleX = 0.01;
                    caipan.scaleY = 0.01;
                    egret.Tween.get(caipan)
                        .to({ scaleX: 1.75, scaleY: 1.75 }, 200)
                        .to({ scaleX: 0.2, scaleY: 0.2 }, 200)
                        .call(function () {
                        movie.visible = true;
                        movie.gotoAndPlay("play", 1);
                    })
                        .to({ scaleX: 1, scaleY: 1 }, 100)
                        .call(function () {
                        caipanGuang.visible = true;
                        burn.tools.TweenTools.rotationFan(caipanGuang, 3000);
                    })
                        .to({ rotation: 360 }, 900)
                        .to({ rotation: 720 }, 900)
                        .to({ rotation: 360 + 360 + 360 }, 900)
                        .to({ rotation: 360 + 360 + 360 + 360 }, 900)
                        .wait(10).call(function () {
                        var child = viewBul.getChildByName("caipan" + pos);
                        if (child) {
                            viewBul.removeChild(child);
                        }
                        var childNum = viewBul.getChildByName("caipanNum" + pos);
                        if (childNum) {
                            viewBul.removeChild(childNum);
                        }
                        var chilGuang = viewBul.getChildByName("caipanGuang" + pos);
                        if (chilGuang) {
                            viewBul.removeChild(chilGuang);
                        }
                        egret.Tween.removeTweens(caipan);
                    });
                }, this);
            };
            ///////////播放葫芦特效////////////////////////////////////////////////////////////////////////////////////////
            FrameUtil.playHuluEffect = function (roomerPos, uniqId, fishId, pathId, pathPoint, cx, cy, x, y, view) {
                var self = view;
                //播放葫芦特效
                var gunPos = RoomUtil.getGunPointByPos(roomerPos, view.getIsFlip());
                if (view.getIsFlip()) {
                    x = CONFIG.contentWidth - x;
                    y = CONFIG.contentHeight - y;
                }
                var pox1 = gunPos.x;
                var poy1 = gunPos.y;
                if (pox1 < CONFIG.contentWidth / 2) {
                    pox1 -= 200;
                }
                else {
                    pox1 += 200;
                }
                var isFlip = false;
                if (gunPos.y < CONFIG.contentHeight / 2) {
                    //反着扔
                    isFlip = true;
                }
                var point = new egret.Point(x, y);
                var imageHulu = new egret.Bitmap(RES.getRes("ef_hulu_png"));
                imageHulu.y = isFlip ? 0 : 720;
                imageHulu.x = pox1;
                imageHulu.name = "hulu";
                imageHulu.anchorOffsetX = imageHulu.width / 2;
                imageHulu.anchorOffsetY = imageHulu.height / 2;
                self.getBulletLayer().addChild(imageHulu);
                egret.Tween.get(imageHulu)
                    .to({ rotation: 270, y: isFlip ? 820 : -100 }, 1000)
                    .to({ scale: 1.5, rotation: 540, y: point.y, x: point.x }, 400)
                    .call(function () {
                    if (imageHulu == null) {
                        return;
                    }
                    imageHulu.visible = false;
                    egret.Tween.removeTweens(imageHulu);
                    self.getBulletLayer().removeChild(imageHulu);
                    imageHulu = null;
                    var data = RES.getRes("ef_hulu_bomb_json");
                    var txtr = RES.getRes("ef_hulu_bomb_png");
                    var mcFactory = new egret.MovieClipDataFactory(data, txtr);
                    var animation = new MovieFish(mcFactory.generateMovieClipData("ef_hulu_bomb"), egret.Event.COMPLETE);
                    animation.initEvent();
                    animation.scaleX = 2.2;
                    animation.scaleY = 2.2;
                    animation.frameRate = 9;
                    animation.gotoAndPlay("play", 1);
                    animation.x = point.x;
                    animation.y = point.y;
                    self.getBulletLayer().addChild(animation);
                    game.util.SoundManager.playEffectSound("godlamp_end");
                    setTimeout(function () {
                        if (uniqId > 0 && fishId > 0 && pathId > 0) {
                            self.addUnitFish(AddFishType.FISH, [uniqId], fishId, pathId, new egret.Point(cx, cy), 0, pathPoint);
                        }
                    }, 500);
                });
            };
            ////////////////////////////////////////////////end/////////////////////////////////////////////
            ////////////////////////////ef_gunPos///////////////////////////////////////////
            FrameUtil.getEfGunPos = function () {
                var data = RES.getRes("ef_gunPos_json");
                var txtr = RES.getRes("ef_gunPos_png");
                var mcFactory = new egret.MovieClipDataFactory(data, txtr);
                var caipan = new egret.MovieClip(mcFactory.generateMovieClipData("ef_gunPos"));
                caipan.gotoAndPlay("play", -1);
                caipan.frameRate = 12;
                return caipan;
            };
            ////////////////////////////////////////////////////////////////////////////////
            //////////////////////////ef_gunPosRage////////////////////////////////////////
            //ef_gunPosRage
            FrameUtil.getEfGunRagePos = function () {
                var data = RES.getRes("ef_gunPosRage_json");
                var txtr = RES.getRes("ef_gunPosRage_png");
                var mcFactory = new egret.MovieClipDataFactory(data, txtr);
                var caipan = new egret.MovieClip(mcFactory.generateMovieClipData("ef_gunPosRage"));
                caipan.gotoAndPlay("play", -1);
                caipan.frameRate = 12;
                return caipan;
            };
            ////////////////////////////////////////////////////////////////////////////////
            //添加金币的+999数字特效
            FrameUtil.playAddCoinsEff = function (num, pos, display, userId) {
                var parentView;
                if (display) {
                    parentView = display;
                }
                else {
                    parentView = egret.MainContext.instance.stage;
                }
                var container = new egret.DisplayObjectContainer();
                var txtr = null;
                var img = null;
                //处理美术字
                var numFont = new egret.BitmapText();
                var userModel = burn.Director.getModelByKey(UserModel);
                if (userId == userModel.getUserId()) {
                    //bitmapNum_1_fnt
                    numFont.font = RES.getRes("bitmapNum_2_fnt");
                    txtr = RES.getRes("bitmap2Add_png");
                    img = new egret.Bitmap(txtr);
                }
                else {
                    //bitmapNum_2_fnt
                    numFont.font = RES.getRes("bitmapNum_1_fnt");
                    txtr = RES.getRes("bitmap1Add_png");
                    img = new egret.Bitmap(txtr);
                }
                img.anchorOffsetY = img.height >> 1;
                container.addChild(img);
                numFont.text = "" + num;
                container.addChild(numFont);
                numFont.anchorOffsetX = 0;
                numFont.anchorOffsetY = numFont.height >> 1;
                numFont.x = img.width;
                container.x = pos.x;
                container.y = pos.y;
                container.anchorOffsetX = container.width >> 1;
                container.anchorOffsetY = container.height >> 1;
                container.cacheAsBitmap = true;
                parentView.addChild(container);
                container.scaleX = 0.01;
                container.scaleY = 0.01;
                egret.Tween.get(container)
                    .to({ scaleX: 1.4, scaleY: 1.4 }, 30)
                    .to({ scaleX: 1.32, scaleY: 1.32 }, 60)
                    .to({ scaleX: 0.96, scaleY: 0.96 }, 180)
                    .to({ scaleX: 0.8, scaleY: 0.8 }, 60)
                    .to({ scaleX: 0.96, scaleY: 0.96 }, 200)
                    .to({ scaleX: 0.8, scaleY: 0.8 }, 200)
                    .to({ alpha: 0 }, 800)
                    .call(function () {
                    egret.Tween.removeTweens(container);
                    parentView.removeChild(container);
                });
            };
            //每个人的金币标签上。显示的+999数字标签
            FrameUtil.playAddCoinsOnLab = function (num, pos, display) {
                var parentView;
                if (display) {
                    parentView = display;
                }
                else {
                    parentView = egret.MainContext.instance.stage;
                }
                var container = new egret.DisplayObjectContainer;
                var txtr = null;
                var img = null;
                //处理美术字
                var numFont = new egret.BitmapText();
                var userModel = burn.Director.getModelByKey(UserModel);
                numFont.font = RES.getRes("bitmapNum_2_fnt");
                txtr = RES.getRes("bitmap2Add_png");
                img = new egret.Bitmap(txtr);
                img.anchorOffsetY = img.height >> 1;
                container.addChild(img);
                numFont.text = "" + num;
                container.addChild(numFont);
                numFont.anchorOffsetX = 0;
                numFont.anchorOffsetY = numFont.height >> 1;
                numFont.x = img.width;
                container.scaleX = 0.5;
                container.scaleY = 0.5;
                container.x = pos.x + CONFIG.adaptX;
                container.y = pos.y + CONFIG.adaptY;
                container.anchorOffsetX = container.width >> 1;
                container.anchorOffsetY = container.height >> 1;
                container.cacheAsBitmap = true;
                parentView.addChild(container);
                container.scaleX = 0;
                container.scaleY = 0;
                egret.Tween.get(container)
                    .to({ scaleX: 0.7, scaleY: 0.7 }, 600, egret.Ease.quadIn)
                    .to({ scaleX: 0.5, scaleY: 0.5 }, 200, egret.Ease.quadInOut).call(function () {
                    egret.Tween.removeTweens(container);
                    parentView.removeChild(container);
                });
            };
            FrameUtil.playCaipanTest = function (view, roomer, goldNum, warId, isWarDead /**是否是炸弹弄死*/) {
                if (goldNum === void 0) { goldNum = 0; }
                if (warId === void 0) { warId = "-1"; }
                if (isWarDead === void 0) { isWarDead = false; } /**是否是炸弹弄死*/
                var pos = roomer.getRoomPos();
                var gunPos1 = view.getRoomUI().getGunPointByPos(pos, view.getIsFlip());
                var gunPos = new egret.Point(gunPos1.x, gunPos1.y);
                gunPos.x += CONFIG.adaptX;
                gunPos.y += CONFIG.adaptY;
                var poY = gunPos.y;
                if (poY > 360) {
                    poY = 470 + CONFIG.adaptY;
                }
                else {
                    poY = 250 + CONFIG.adaptY;
                }
                var viewBul = view.getBulletLayer();
                var child = viewBul.getChildByName("caipan" + pos);
                child && viewBul.removeChild(child);
                var childNum = viewBul.getChildByName("caipanNum" + pos);
                childNum && viewBul.removeChild(childNum);
                var childMovie = viewBul.getChildByName("movie" + pos);
                childMovie && viewBul.removeChild(childMovie);
                var chilGuang = viewBul.getChildByName("caipanGuang" + pos);
                chilGuang && viewBul.removeChild(chilGuang);
                var data = RES.getRes("ef_caipanBg_json");
                var txtr = RES.getRes("ef_caipanBg_png");
                var mcFactory = new egret.MovieClipDataFactory(data, txtr);
                var movie = new MovieFish(mcFactory.generateMovieClipData("ef_caipanBg"), egret.Event.COMPLETE);
                movie.initEvent();
                var dataMc = movie.movieClipData;
                var frameCur = 0;
                var modifyRect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
                movie.frameRate = 14;
                movie.x = gunPos.x;
                movie.y = poY;
                movie.scaleX = 1.2;
                movie.scaleY = 1.2;
                movie.anchorOffsetX = movie.width / 2 + modifyRect.x;
                movie.anchorOffsetY = movie.height / 2 + modifyRect.y;
                movie.name = "movie" + pos;
                movie.visible = false;
                viewBul.addChild(movie);
                var caipanGuang = null;
                caipanGuang = new egret.Bitmap(RES.getRes("ef_rotation_bg2_png"));
                caipanGuang.name = "caipanGuang" + pos;
                caipanGuang.anchorOffsetX = caipanGuang.width >> 1;
                caipanGuang.anchorOffsetY = caipanGuang.height >> 1;
                caipanGuang.x = gunPos.x;
                caipanGuang.y = poY;
                caipanGuang.visible = false;
                viewBul.addChildAt(caipanGuang, 1);
                var t = 400;
                if (warId == "-1") {
                    //处理美术字
                    var numFont_2 = new egret.BitmapText();
                    var userModel = burn.Director.getModelByKey(UserModel);
                    var roomModel = burn.Director.getModelByKey(RoomModel);
                    var roomer_1 = roomModel.getRoomerById(userModel.getUserId());
                    if (roomer_1.getRoomPos() == pos) {
                        //bitmapNum_1_fnt
                        numFont_2.font = RES.getRes("bitmapNum_2_fnt");
                        util.SoundManager.playEffectSound("CoinLightMove");
                        util.SoundManager.playEffectSound("ubomb");
                    }
                    else {
                        //bitmapNum_2_fnt
                        numFont_2.font = RES.getRes("bitmapNum_1_fnt");
                        util.SoundManager.playEffectSound("CoinLightMove_o");
                    }
                    var rate = game.table.T_Config_Table.getVoByKey(30).value;
                    if (!isWarDead) {
                        goldNum /= (100 - parseInt(rate)) * 0.01;
                    }
                    goldNum = Math.floor(goldNum);
                    numFont_2.text = "" + goldNum;
                    viewBul.addChildAt(numFont_2, 5);
                    numFont_2.anchorOffsetX = numFont_2.width / 2;
                    numFont_2.anchorOffsetY = numFont_2.height / 2;
                    //numFont.scaleX = 0.75;
                    //numFont.scaleY = 0.75;
                    numFont_2.x = gunPos.x;
                    numFont_2.y = poY + 4;
                    numFont_2.name = "caipanNum" + pos;
                    numFont_2.scaleX = 0.01;
                    numFont_2.scaleY = 0.01;
                    egret.Tween.get(numFont_2)
                        .to({ scaleX: 1.75, scaleY: 1.75 }, 300)
                        .to({ scaleX: 0.2, scaleY: 0.2 }, 200)
                        .to({ scaleX: 1.2, scaleY: 1.2 }, 200)
                        .to({ rotation: 20 }, t)
                        .to({ rotation: -20 }, t)
                        .to({ rotation: 20 }, t)
                        .to({ rotation: -20 }, t)
                        .to({ rotation: 20 }, t)
                        .to({ rotation: -20 }, t)
                        .to({ rotation: 20 }, t)
                        .to({ rotation: -20 }, t)
                        .to({ rotation: 20 }, t)
                        .to({ rotation: -20 }, t).call(function () {
                        egret.Tween.removeTweens(numFont_2);
                    });
                }
                var caipan = null;
                var skinId = roomer.getCurSkinId();
                var vo = game.table.T_Gun_skin_Table.getVoByKey(skinId);
                var caipanUrl = vo.caipanUrl;
                RES.getResAsync(caipanUrl, function () {
                    var txture = RES.getRes(caipanUrl);
                    var icon = new egret.Bitmap(txture);
                    if (!icon) {
                        return;
                    }
                    caipan = icon;
                    caipan.name = "caipan" + pos;
                    caipan.anchorOffsetX = caipan.width >> 1;
                    caipan.anchorOffsetY = caipan.height >> 1;
                    caipan.x = gunPos.x;
                    caipan.y = poY;
                    viewBul.addChildAt(caipan, 2);
                    caipan.scaleX = 0.01;
                    caipan.scaleY = 0.01;
                    egret.Tween.get(caipan)
                        .to({ scaleX: 1.75, scaleY: 1.75 }, 200)
                        .to({ scaleX: 0.2, scaleY: 0.2 }, 200)
                        .call(function () {
                        movie.visible = true;
                        movie.gotoAndPlay("play", 1);
                    })
                        .to({ scaleX: 1, scaleY: 1 }, 100)
                        .call(function () {
                        caipanGuang.visible = true;
                        burn.tools.TweenTools.rotationFan(caipanGuang, 3000);
                    })
                        .to({ rotation: 360 }, 900)
                        .to({ rotation: 720 }, 900)
                        .to({ rotation: 360 + 360 + 360 }, 900)
                        .to({ rotation: 360 + 360 + 360 + 360 }, 900)
                        .wait(10).call(function () {
                        var child = viewBul.getChildByName("caipan" + pos);
                        if (child) {
                            viewBul.removeChild(child);
                        }
                        var childNum = viewBul.getChildByName("caipanNum" + pos);
                        if (childNum) {
                            viewBul.removeChild(childNum);
                        }
                        var chilGuang = viewBul.getChildByName("caipanGuang" + pos);
                        if (chilGuang) {
                            viewBul.removeChild(chilGuang);
                        }
                        egret.Tween.removeTweens(caipan);
                    });
                }, this);
            };
            return FrameUtil;
        }());
        util.FrameUtil = FrameUtil;
        __reflect(FrameUtil.prototype, "game.util.FrameUtil");
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
//# sourceMappingURL=FrameUtil.js.map