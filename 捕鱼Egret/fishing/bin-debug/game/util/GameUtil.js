var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var util;
    (function (util) {
        var GameUtil = (function () {
            function GameUtil() {
            }
            //播放锁定法阵特效
            GameUtil.fazhenEffect = function (display, view, posX, posY, pos) {
                if (display === void 0) { display = null; }
                var parentView;
                if (display == null) {
                    parentView = egret.MainContext.instance.stage;
                }
                else {
                    parentView = display;
                }
                var faz = parentView.getChildByName("fazhen" + pos);
                if (faz) {
                    return;
                }
                var armature = new egret.Bitmap(RES.getRes("ef_fazhen_png"));
                burn.tools.TweenTools.rotation(armature, 4000);
                armature.name = "fazhen" + pos;
                parentView.addChild(armature);
                armature.anchorOffsetX = armature.width / 2;
                armature.anchorOffsetY = armature.height / 2;
                armature.x = posX;
                armature.y = posY;
            };
            //播放分身法阵特效
            GameUtil.cloneEffect = function (display, view, posX, posY, pos) {
                if (display === void 0) { display = null; }
                var parentView;
                if (display == null) {
                    parentView = egret.MainContext.instance.stage;
                }
                else {
                    parentView = display;
                }
                var disp = new egret.DisplayObjectContainer();
                var armature = new egret.Bitmap(RES.getRes("ef_fazhen_png"));
                burn.tools.TweenTools.rotation(armature, 4000);
                armature.anchorOffsetX = armature.width / 2;
                armature.anchorOffsetY = armature.height / 2;
                disp.addChild(armature);
                var armature1 = new egret.Bitmap(RES.getRes("ef_clone_png"));
                burn.tools.TweenTools.showOutAndInAndScale(armature1, 500);
                armature1.anchorOffsetX = armature1.width / 2;
                armature1.anchorOffsetY = armature1.height / 2;
                disp.addChild(armature1);
                disp.x = posX;
                disp.y = posY;
                disp.name = "clone" + pos;
                parentView.addChild(disp);
            };
            //播放核弹爆炸特效
            GameUtil.bobmHexEffect = function (display, fun, obj, msg, view) {
                var _this = this;
                if (display === void 0) { display = null; }
                var parentView;
                if (display == null) {
                    parentView = egret.MainContext.instance.stage;
                }
                else {
                    parentView = display;
                }
                RES.getResAsync("ef_war_json", function (wjson, wkey) {
                    RES.getResAsync("ef_war_png", function (wpng, wkey) {
                        var imgJi = new egret.Bitmap(RES.getRes("ef_war_ji_png"));
                        imgJi.rotation = -36;
                        imgJi.alpha = 0.7;
                        imgJi.scaleX = 10;
                        imgJi.scaleY = 6;
                        imgJi.x = 732;
                        imgJi.y = 680;
                        parentView.addChild(imgJi);
                        var tw1 = egret.Tween.get(imgJi);
                        tw1.to({ x: -488, y: -471, scaleX: 0.6, scaleY: 0.6 }, 700).call(function () {
                            egret.Tween.removeTweens(imgJi);
                            parentView.removeChild(imgJi);
                        });
                        var imgDan = new egret.Bitmap(RES.getRes("ef_war_dan_png"));
                        imgDan.x = 960;
                        imgDan.y = 0;
                        imgDan.anchorOffsetX = imgDan.width / 2;
                        imgDan.anchorOffsetY = imgDan.height / 2;
                        imgDan.scaleX = 0.7;
                        imgDan.scaleY = 0.7;
                        imgDan.visible = false;
                        parentView.addChild(imgDan);
                        var tw = egret.Tween.get(imgDan);
                        tw.wait(400).call(function () {
                            imgDan.visible = true;
                        }).
                            to({ x: CONFIG.contentWidth / 2 + CONFIG.adaptX, y: CONFIG.contentHeight / 2 + CONFIG.adaptY }, 200).call(function () {
                            egret.Tween.removeTweens(imgDan);
                            parentView.removeChild(imgDan);
                            var mcFactory = new egret.MovieClipDataFactory(wjson, wpng);
                            var ef_war = new MovieFish(mcFactory.generateMovieClipData("ef_war"), egret.Event.COMPLETE);
                            ef_war.initEvent();
                            ef_war.scaleX = ef_war.scaleY = 2;
                            ef_war.gotoAndPlay("play", 1);
                            ef_war.frameRate = 10;
                            ef_war.x = CONFIG.contentWidth / 2 + CONFIG.adaptX;
                            ef_war.y = CONFIG.contentHeight / 2 + CONFIG.adaptY;
                            ef_war.scaleX = 3.6;
                            ef_war.scaleY = 3.6;
                            var dataMc = ef_war.movieClipData;
                            var frameCur = 0;
                            var Rect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
                            ef_war.anchorOffsetX = ef_war.width / 2 + Rect.x;
                            ef_war.anchorOffsetY = ef_war.height / 2 + Rect.y;
                            parentView.addChild(ef_war);
                            setTimeout(function () {
                                fun.call(obj, msg, view);
                            }, 200);
                        });
                    }, _this);
                }, this);
            };
            GameUtil.baoFuEffect = function (num, display) {
                if (display === void 0) { display = null; }
                var parentView;
                if (display == null) {
                    parentView = egret.MainContext.instance.stage;
                }
                else {
                    parentView = display;
                }
                var data = RES.getRes("baofu_json");
                var txtr = RES.getRes("baofu_png");
                var mcFactory = new egret.MovieClipDataFactory(data, txtr);
                var armature = new egret.MovieClip(mcFactory.generateMovieClipData("baofu"));
                armature.scaleX = armature.scaleY = 0.95;
                armature.y = 20;
                var disp = new egret.DisplayObjectContainer();
                disp.scaleX = 3;
                disp.scaleY = 3;
                parentView.addChildAt(disp, 1000);
                disp.addChild(armature);
                disp.x = CONFIG.contentWidth / 2 + CONFIG.adaptX;
                disp.y = CONFIG.contentHeight / 2 + CONFIG.adaptY;
                //处理美术字
                var numFont = new egret.BitmapText();
                numFont.font = RES.getRes("number_fnt");
                numFont.text = String(num);
                numFont.anchorOffsetX = numFont.width / 2;
                numFont.anchorOffsetY = numFont.height / 2;
                numFont.scaleX = 0.55;
                numFont.scaleY = 0.55;
                numFont.x = disp.width / 2;
                numFont.y = CONFIG.contentHeight / 2 - 6;
                disp.addChild(numFont);
                disp.anchorOffsetX = disp.width / 2;
                disp.anchorOffsetY = disp.height / 2 + 50;
                armature.gotoAndPlay("play", -1);
                //变大动画
                var tw = egret.Tween.get(disp);
                tw.
                    to({ scaleX: 1.125, scaleY: 1.125 }, 250).
                    to({ scaleX: 1.8, scaleY: 1.8 }, 250).
                    to({ scaleX: 1.5, scaleY: 1.5 }, 400).wait(2000).call(function () {
                    egret.Tween.removeTweens(disp);
                    parentView.removeChild(disp);
                });
            };
            //根据类型和id获取图标
            GameUtil.getIconById = function (type, id, num, isShowName) {
                if (num === void 0) { num = 0; }
                if (isShowName === void 0) { isShowName = false; }
                if (type == IconType.PROP) {
                    if (id == 10001) {
                        var txtr = RES.getRes("common_coins_png");
                        var img = new egret.Bitmap(txtr);
                        return img;
                    }
                    else if (id == 10002) {
                        var txtr = RES.getRes("common_diamond_png");
                        var img = new egret.Bitmap(txtr);
                        return img;
                    }
                    else if (id == 30002) {
                        var txtr = RES.getRes("common_fish_ticket_png");
                        var img = new egret.Bitmap(txtr);
                        return img;
                    }
                    else {
                        var itemVo = game.table.T_Item_Table.getVoByKey(id);
                        if (itemVo == null) {
                            console.warn("道具[" + id + "]不存在！");
                            return null;
                        }
                        var txtr = RES.getRes("goodsicon_" + id + "_png");
                        var img = new egret.Bitmap(txtr);
                        return img;
                    }
                }
                else if (type == IconType.SKILL) {
                }
                return null;
            };
            //飞话费
            GameUtil.flyTickets = function (num, from, to, display, userId) {
                if (display === void 0) { display = null; }
                if (userId === void 0) { userId = 0; }
                var parentView;
                if (display == null) {
                    parentView = egret.MainContext.instance.stage;
                }
                else {
                    parentView = display;
                }
                var userModel = burn.Director.getModelByKey(UserModel);
                if (userModel.getUserId() == userId) {
                    burn._Notification_.send(NotifyEnum.POP_EXCHANGE);
                    to = new egret.Point(55, 260);
                }
                var width = 60;
                var height = 60;
                var disp = new egret.DisplayObjectContainer();
                var effect = new egret.Bitmap(RES.getRes("icon_tickets_bg_png"));
                //burn.tools.TweenTools.rotation(effect,4000);
                //effect.blendMode = egret.BlendMode.ADD;
                effect.anchorOffsetX = effect.width >> 1;
                effect.anchorOffsetY = effect.height >> 1;
                disp.addChild(effect);
                var numLab = new eui.Label;
                //numLab.textColor = 0xffff00;
                numLab.stroke = 1;
                numLab.strokeColor = 0xffff00;
                numLab.text = num / 10 + "元";
                numLab.anchorOffsetX = numLab.width / 2;
                numLab.anchorOffsetY = numLab.height / 2;
                numLab.x = 0;
                numLab.y = 60;
                disp.addChild(numLab);
                disp.scaleX = 0;
                disp.scaleY = 0;
                var point = new egret.Point(from.x, from.y);
                var isXAdd = Math.random() > 0.5 ? true : false;
                var isYAdd = Math.random() > 0.5 ? true : false;
                if (isXAdd) {
                    point.x += Math.random() * width;
                }
                else {
                    point.x -= Math.random() * width;
                }
                if (isYAdd) {
                    point.y += Math.random() * height;
                }
                else {
                    point.y -= Math.random() * height;
                }
                disp.x = point.x;
                disp.y = point.y;
                parentView.addChild(disp);
                var time = egret.Point.distance(point, to) / 0.4;
                egret.Tween.get(disp)
                    .to({ y: disp.y + 20, scaleX: 1.1, scaleY: 1.1, alpha: 1 }, 400)
                    .to({ y: disp.y - 20, scaleX: 1.05, scaleY: 1.05 }, 200)
                    .to({ y: disp.y - 20, scaleX: 1, scaleY: 1 }, 200)
                    .to({ y: disp.y + 20, scaleX: 1, scaleY: 1 }, 200) //0.95
                    .to({ x: to.x, y: to.y, scaleX: 1, scaleY: 1 }, time, egret.Ease.backIn).call(function () {
                    if (disp == null) {
                        return;
                    }
                    parentView.removeChild(disp);
                    disp = null;
                    game.util.SoundManager.playEffectSound("diamondChange");
                    burn._Notification_.send(NotifyEnum.POP_UPDATEEXCHANGE);
                    //添加一个特效
                    var txtr = RES.getRes("ef_addcoin_png");
                    var effct = new egret.Bitmap(txtr);
                    effct.anchorOffsetX = effct.width / 2;
                    effct.anchorOffsetY = effct.height / 2;
                    parentView.addChild(effct, 81);
                    effct.x = to.x;
                    effct.y = to.y;
                    effct.scaleX = 0.2;
                    effct.scaleY = 0.2;
                    var tw = egret.Tween.get(effct, { loop: false });
                    tw.to({ scaleX: 0.7, scaleY: 0.7 }, 120)
                        .to({ scaleX: 1.2, scaleY: 1.2, alpha: 0 }, 50)
                        .call(function () {
                        egret.Tween.removeTweens(effct);
                        parentView.removeChild(effct);
                    });
                });
            };
            //飞道具
            GameUtil.flyItems = function (num, itemId, from, to, display, userId) {
                if (display === void 0) { display = null; }
                if (userId === void 0) { userId = 0; }
                var parentView;
                if (display == null) {
                    parentView = egret.MainContext.instance.stage;
                }
                else {
                    parentView = display;
                }
                if (num > 10) {
                    num = 10;
                }
                var width = 60;
                var height = 60;
                if (num < 3) {
                    width = 150 / 2;
                    height = 150 / 2;
                }
                else if (num <= 5 && num >= 3) {
                    width = 200 / 2;
                    height = 180 / 2;
                }
                else {
                    width = 400 / 2;
                    height = 250 / 2;
                }
                var userModel = burn.Director.getModelByKey(UserModel);
                if (itemId == PropEnum.FISH_TICKIT) {
                    if (userModel.getUserId() == userId) {
                        burn._Notification_.send(NotifyEnum.POP_EXCHANGE);
                        to = new egret.Point(55, 260);
                    }
                }
                for (var i = 0; i < num; i++) {
                    var disp = new egret.DisplayObjectContainer();
                    (function (disp, i) {
                        game.util.IconUtil.getIconByIdAsync(IconType.PROP, itemId, function (icon) {
                            var effect = null;
                            if (itemId == 10002) {
                                effect = new egret.Bitmap(RES.getRes("gain_gem_effect_png"));
                                //burn.tools.TweenTools.rotation(effect,4000);
                                //effect.blendMode = egret.BlendMode.ADD;
                                effect.anchorOffsetX = effect.width >> 1;
                                effect.anchorOffsetY = effect.height >> 1;
                                effect.scaleX = 0.8;
                                effect.scaleY = 0.8;
                                disp.addChild(effect);
                            }
                            disp.addChild(icon);
                            icon.anchorOffsetX = icon.width >> 1;
                            icon.anchorOffsetY = icon.height >> 1;
                            disp.scaleX = 0;
                            disp.scaleY = 0;
                            var point = new egret.Point(from.x, from.y);
                            var isXAdd = Math.random() > 0.5 ? true : false;
                            var isYAdd = Math.random() > 0.5 ? true : false;
                            if (isXAdd) {
                                point.x += Math.random() * width;
                            }
                            else {
                                point.x -= Math.random() * width;
                            }
                            if (isYAdd) {
                                point.y += Math.random() * height;
                            }
                            else {
                                point.y -= Math.random() * height;
                            }
                            disp.x = point.x;
                            disp.y = point.y;
                            parentView.addChild(disp);
                            var time = egret.Point.distance(point, to) / 0.8;
                            egret.Tween.get(disp)
                                .to({ y: disp.y + 20, scaleX: 1.1, scaleY: 1.1, alpha: 1 }, 200)
                                .to({ y: disp.y - 20, scaleX: 1.05, scaleY: 1.05 }, 100)
                                .to({ y: disp.y - 20, scaleX: 1, scaleY: 1 }, 100)
                                .to({ y: disp.y + 20, scaleX: 1, scaleY: 1 }, 100) //0.95
                                .to({ x: to.x, y: to.y, scaleX: 1, scaleY: 1 }, time, egret.Ease.backIn).call(function () {
                                if (disp == null) {
                                    return;
                                }
                                parentView.removeChild(disp);
                                disp = null;
                                if (itemId == 10002) {
                                    burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, { userId: userId });
                                    game.util.SoundManager.playEffectSound("ls_blinkc");
                                }
                                else {
                                    burn._Notification_.send(NotifyEnum.SET_PROP_NUM);
                                    game.util.SoundManager.playEffectSound("diamondChange");
                                }
                                //添加一个特效
                                var txtr = RES.getRes("ef_addcoin_png");
                                var effct = new egret.Bitmap(txtr);
                                effct.anchorOffsetX = effct.width / 2;
                                effct.anchorOffsetY = effct.height / 2;
                                parentView.addChild(effct, 81);
                                effct.x = to.x;
                                effct.y = to.y;
                                effct.scaleX = 0.2;
                                effct.scaleY = 0.2;
                                var tw = egret.Tween.get(effct, { loop: false });
                                tw.to({ scaleX: 0.7, scaleY: 0.7 }, 120)
                                    .to({ scaleX: 1.2, scaleY: 1.2, alpha: 0 }, 50)
                                    .call(function () {
                                    egret.Tween.removeTweens(effct);
                                    parentView.removeChild(effct);
                                });
                            });
                        });
                    })(disp, i);
                    ;
                }
            };
            //飞金币 突突突
            GameUtil.flyCoinsTOTOTO = function (num, count, to, display, userId) {
                if (display === void 0) { display = null; }
                if (userId === void 0) { userId = 0; }
                var parentView;
                if (display == null) {
                    parentView = egret.MainContext.instance.stage;
                }
                else {
                    parentView = display;
                }
                var data = RES.getRes("iconEffect_json");
                var txtr = RES.getRes("iconEffect_png");
                var mcFactory = new egret.MovieClipDataFactory(data, txtr);
                count = 20;
                var from = new egret.Point(200, 500);
                var pArr = this.getPosByCountOld(count, from);
                for (var i = 0; i < pArr.length; i++) {
                    var goldIcon = new egret.MovieClip(mcFactory.generateMovieClipData("iconEffect"));
                    goldIcon.anchorOffsetX = goldIcon.width >> 1;
                    goldIcon.anchorOffsetY = goldIcon.height >> 1;
                    goldIcon.x = pArr[i].x;
                    goldIcon.y = pArr[i].y;
                    parentView.addChildAt(goldIcon, 81);
                    goldIcon.visible = false;
                    goldIcon.frameRate = 15;
                    var pox = to.x;
                    var poy = to.y;
                    var time = egret.Point.distance(to, new egret.Point(goldIcon.x, goldIcon.y)) / 0.8;
                    (function (goldIcon, i, pox, poy, time) {
                        egret.Tween.get(goldIcon)
                            .wait(800 + i * 100)
                            .call(function () {
                            goldIcon.visible = true;
                            goldIcon.gotoAndPlay("play", -1);
                        })
                            .to({ y: goldIcon.y + 20 }, 120)
                            .to({ y: goldIcon.y - 20 }, 90)
                            .to({ y: goldIcon.y - 20 }, 75)
                            .to({ y: goldIcon.y + 20 }, 120)
                            .to({ x: to.x, y: to.y }, time, egret.Ease.backIn).call(function () {
                            if (goldIcon == null) {
                                return;
                            }
                            parentView.removeChild(goldIcon);
                            goldIcon = null;
                            if (i == 0) {
                                //添加加金币的逻辑
                                burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, { userId: userId, isTween: true, count: num });
                                game.util.SoundManager.playEffectSound("ls_blinkc");
                            }
                            var userModle = burn.Director.getModelByKey(UserModel);
                            if (userModle.getUserId() != userId) {
                                return;
                            }
                            //添加一个特效
                            var txtr = RES.getRes("ef_addcoin_png");
                            var effct = new egret.Bitmap(txtr);
                            effct.anchorOffsetX = effct.width / 2;
                            effct.anchorOffsetY = effct.height / 2;
                            parentView.addChild(effct, 81);
                            effct.x = pox;
                            effct.y = poy;
                            effct.scaleX = 0.2;
                            effct.scaleY = 0.2;
                            var tw = egret.Tween.get(effct, { loop: false });
                            tw.to({ scaleX: 0.7, scaleY: 0.7 }, 120)
                                .to({ scaleX: 1.2, scaleY: 1.2, alpha: 0 }, 50)
                                .call(function () {
                                egret.Tween.removeTweens(effct);
                                parentView.removeChild(effct);
                            });
                        });
                    })(goldIcon, i, pox, poy, time);
                }
            };
            //飞积分
            GameUtil.flyScores = function (fishId, from, to, display, userId) {
                if (display === void 0) { display = null; }
                if (userId === void 0) { userId = 0; }
                var parentView;
                if (display == null) {
                    parentView = egret.MainContext.instance.stage;
                }
                else {
                    parentView = display;
                }
                var vo = game.table.T_Fish_Table.getVoByKey(fishId);
                var count = this.getCoinNumByScore(vo.score);
                var data = RES.getRes("ef_score_json");
                var txtr = RES.getRes("ef_score_png");
                var mcFactory = new egret.MovieClipDataFactory(data, txtr);
                var pArr = this.getPosByCount(count, from);
                for (var i = 0; i < pArr.length; i++) {
                    var goldIcon = new egret.MovieClip(mcFactory.generateMovieClipData("ef_score"));
                    goldIcon.anchorOffsetX = goldIcon.width >> 1;
                    goldIcon.anchorOffsetY = goldIcon.height >> 1;
                    goldIcon.x = pArr[i].x;
                    goldIcon.y = pArr[i].y;
                    parentView.addChildAt(goldIcon, 81);
                    goldIcon.visible = false;
                    goldIcon.frameRate = 15;
                    var pox = to.x;
                    var poy = to.y;
                    var time = egret.Point.distance(to, new egret.Point(goldIcon.x, goldIcon.y)) / 0.5;
                    (function (goldIcon, i, pox, poy, time) {
                        egret.Tween.get(goldIcon)
                            .wait(800 + i * 50)
                            .call(function () {
                            goldIcon.visible = true;
                            goldIcon.gotoAndPlay("play", -1);
                        })
                            .to({ y: goldIcon.y + 60 }, 120)
                            .to({ y: goldIcon.y - 20 }, 90)
                            .to({ y: goldIcon.y - 20 }, 75)
                            .to({ y: goldIcon.y + 20 }, 120)
                            .wait(200)
                            .to({ x: to.x, y: to.y }, 400, egret.Ease.backIn).call(function () {
                            if (goldIcon == null) {
                                return;
                            }
                            parentView.removeChild(goldIcon);
                            goldIcon = null;
                        });
                    })(goldIcon, i, pox, poy, time);
                }
            };
            //飞金币
            GameUtil.flyCoins = function (num, fishId, from, to, display, userId) {
                if (display === void 0) { display = null; }
                if (userId === void 0) { userId = 0; }
                var parentView;
                if (display == null) {
                    parentView = egret.MainContext.instance.stage;
                }
                else {
                    parentView = display;
                }
                var vo = game.table.T_Fish_Table.getVoByKey(fishId);
                var count = this.getCoinNumByScore(vo.score);
                var data = RES.getRes("iconEffect_json");
                var txtr = RES.getRes("iconEffect_png");
                var mcFactory = new egret.MovieClipDataFactory(data, txtr);
                var pArr = this.getPosByCount(count, from);
                for (var i = 0; i < pArr.length; i++) {
                    var goldIcon = new egret.MovieClip(mcFactory.generateMovieClipData("iconEffect"));
                    goldIcon.anchorOffsetX = goldIcon.width >> 1;
                    goldIcon.anchorOffsetY = goldIcon.height >> 1;
                    goldIcon.x = pArr[i].x;
                    goldIcon.y = pArr[i].y;
                    parentView.addChildAt(goldIcon, 81);
                    goldIcon.visible = false;
                    goldIcon.frameRate = 15;
                    var pox = to.x;
                    var poy = to.y;
                    var time = egret.Point.distance(to, new egret.Point(goldIcon.x, goldIcon.y)) / 0.5;
                    (function (goldIcon, i, pox, poy, time) {
                        egret.Tween.get(goldIcon)
                            .wait(800 + i * 50)
                            .call(function () {
                            goldIcon.visible = true;
                            goldIcon.gotoAndPlay("play", -1);
                        })
                            .to({ y: goldIcon.y + 60 }, 120)
                            .to({ y: goldIcon.y - 20 }, 90)
                            .to({ y: goldIcon.y - 20 }, 75)
                            .to({ y: goldIcon.y + 20 }, 120)
                            .wait(200)
                            .to({ x: to.x, y: to.y }, 400, egret.Ease.backIn).call(function () {
                            if (goldIcon == null) {
                                return;
                            }
                            parentView.removeChild(goldIcon);
                            goldIcon = null;
                            if (i == 0) {
                                //添加加金币的逻辑
                                burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, { userId: userId, isTween: true, count: num });
                                game.util.SoundManager.playEffectSound("ls_blinkc");
                            }
                            var userModle = burn.Director.getModelByKey(UserModel);
                            if (userModle.getUserId() != userId) {
                                return;
                            }
                            //添加一个特效
                            var txtr = RES.getRes("ef_addcoin_png");
                            var effct = new egret.Bitmap(txtr);
                            effct.anchorOffsetX = effct.width / 2;
                            effct.anchorOffsetY = effct.height / 2;
                            parentView.addChild(effct, 81);
                            effct.x = pox;
                            effct.y = poy;
                            effct.scaleX = 0.2;
                            effct.scaleY = 0.2;
                            var tw = egret.Tween.get(effct, { loop: false });
                            tw.to({ scaleX: 0.7, scaleY: 0.7 }, 120)
                                .to({ scaleX: 1.2, scaleY: 1.2, alpha: 0 }, 50)
                                .call(function () {
                                egret.Tween.removeTweens(effct);
                                parentView.removeChild(effct);
                            });
                        });
                    })(goldIcon, i, pox, poy, time);
                }
            };
            //跟进跳金币的个数返回金币位置坐标
            GameUtil.getPosByCount = function (count, from, rectWidth) {
                if (rectWidth === void 0) { rectWidth = -1; }
                var arr = new Array();
                var xParam = count * 75 / 2;
                for (var i = 0; i < count; i++) {
                    var isXAdd = Math.random() > 0.5 ? true : false;
                    var isYAdd = Math.random() > 0.5 ? true : false;
                    var point = new egret.Point(from.x, from.y);
                    point.x += (i * 75 - xParam);
                    arr.push(point);
                }
                return arr;
            };
            GameUtil.getPosByCountOld = function (count, from, rectWidth) {
                if (rectWidth === void 0) { rectWidth = -1; }
                var arr = new Array();
                var width = 20;
                if (count <= 8) {
                    width = 20;
                }
                else if (count > 8 && count <= 15) {
                    width = 40;
                }
                else if (count > 15) {
                    width = 60;
                }
                if (rectWidth != -1) {
                    width = rectWidth;
                }
                for (var i = 0; i < count; i++) {
                    var isXAdd = Math.random() > 0.5 ? true : false;
                    var isYAdd = Math.random() > 0.5 ? true : false;
                    var point = new egret.Point(from.x, from.y);
                    if (isXAdd) {
                        point.x += Math.random() * width;
                    }
                    else {
                        point.x -= Math.random() * width;
                    }
                    if (isYAdd) {
                        point.y += Math.random() * width;
                    }
                    else {
                        point.y -= Math.random() * width;
                    }
                    arr.push(point);
                }
                return arr;
            };
            //根据鱼的倍数获取跳金币的个数
            GameUtil.getCoinNumByScore = function (score) {
                var count = 1;
                if (score >= 2 && score < 3) {
                    count = 2;
                }
                else if (score >= 3 && score < 6) {
                    return 2;
                }
                else if (score >= 6 && score < 9) {
                    return 2;
                }
                else if (score >= 10 && score < 11) {
                    return 3;
                }
                else if (score >= 11 && score < 13) {
                    return 3;
                }
                else if (score >= 13 && score < 45) {
                    return 5;
                }
                else if (score >= 45 && score < 101) {
                    return 7;
                }
                else if (score >= 101) {
                    return 9;
                }
                return count * 2;
            };
            //判断条件是否满足
            GameUtil.isEnough = function (type, num, bPopCharge) {
                if (bPopCharge === void 0) { bPopCharge = true; }
                var userModel = burn.Director.getModelByKey(UserModel);
                if (type == CurrencyEnum.COINS) {
                    var coins = userModel.getCoins();
                    if (coins >= num) {
                        return true;
                    }
                    else {
                        if (bPopCharge) {
                            burn._Notification_.send(NotifyEnum.POP_CHARGE, { type: ChargeType.Gold });
                        }
                        return false;
                    }
                }
                else if (type == CurrencyEnum.MONEY) {
                    var money = userModel.getMoney();
                    if (money >= num) {
                        return true;
                    }
                    else {
                        if (bPopCharge) {
                            burn._Notification_.send(NotifyEnum.POP_CHARGE, { type: ChargeType.Gem });
                        }
                        return false;
                    }
                }
                return false;
            };
            //弹出POP TIPS
            GameUtil.popTips = function (str, pos) {
                if (pos === void 0) { pos = null; }
                var stage = egret.MainContext.instance.stage;
                //
                var display = new egret.DisplayObjectContainer();
                var label = new egret.TextField();
                label.size = 35;
                label.text = str;
                label.cacheAsBitmap = true;
                label.anchorOffsetX = label.width >> 1;
                label.anchorOffsetY = label.height >> 1;
                label.textAlign = egret.HorizontalAlign.CENTER;
                var txtr = RES.getRes("tipsBg_png"); //83,0,6,42
                var img = new egret.Bitmap(txtr);
                img.scale9Grid = new egret.Rectangle(83, 0, 6, 42);
                img.width = label.width + 70;
                img.anchorOffsetX = img.width >> 1;
                img.anchorOffsetY = img.height >> 1;
                display.addChild(img);
                display.addChild(label);
                stage.addChildAt(display, 9999);
                if (pos == null) {
                    display.x = (CONFIG.contentWidth / 2 + CONFIG.adaptX);
                    display.y = (CONFIG.contentHeight / 2 + CONFIG.adaptY);
                }
                else {
                    display.x = pos.x;
                    display.y = pos.y;
                }
                display.cacheAsBitmap = true;
                var tw = egret.Tween.get(display, { loop: false });
                tw.to({ y: display.y - 100, alpha: 0 }, 1500).call(function () {
                    egret.Tween.removeTweens(display);
                    stage.removeChild(display);
                });
            };
            //获取一个锁定特效
            GameUtil.setLockedEffect = function (fishObj, strEffectName, strImg, bFirst) {
                if (bFirst === void 0) { bFirst = false; }
                if (fishObj == null) {
                    return;
                }
                var vo = game.table.T_Fish_Table.getVoByKey(fishObj.getFishId());
                var strPos = vo.posLocked;
                var arrPos = strPos.split(",");
                if (fishObj.getEFFECT_LAYER().getChildByName(strEffectName)) {
                    return;
                }
                var locked = new egret.Bitmap(RES.getRes(strImg));
                if (locked == null) {
                    return;
                }
                locked.name = strEffectName;
                var isFlipY = fishObj.isFlipY();
                var isGroup = fishObj.getIsGroupFish();
                if (!bFirst) {
                    locked.x = parseInt(arrPos[0]) + fishObj.getModifyRect().x;
                    locked.y = parseInt(arrPos[1]) + fishObj.getModifyRect().y;
                    if (isFlipY) {
                        if (!isGroup) {
                            locked.y = -locked.y;
                        }
                        else {
                            if (fishObj.getChasisModify()) {
                                locked.y -= (fishObj.getChasisModify() * 2);
                            }
                        }
                    }
                    var flag = fishObj.addEffect(locked, strEffectName);
                    if (flag) {
                        locked.anchorOffsetX = locked.width / 2;
                        locked.anchorOffsetY = locked.height / 2;
                        burn.tools.TweenTools.rotation(locked, 3000);
                        locked.scaleX = 0.8;
                        locked.scaleY = 0.8;
                    }
                }
                else {
                    locked.scaleX = 12;
                    locked.scaleY = 12;
                    locked.x = parseInt(arrPos[0]) + fishObj.getModifyRect().x;
                    locked.y = parseInt(arrPos[1]) + fishObj.getModifyRect().y;
                    if (isFlipY) {
                        if (!isGroup) {
                            locked.y = -locked.y;
                        }
                        else {
                            if (fishObj.getChasisModify()) {
                                locked.y -= (fishObj.getChasisModify() * 2);
                            }
                        }
                    }
                    var flag = fishObj.addEffect(locked, strEffectName);
                    if (flag) {
                        locked.anchorOffsetX = locked.width / 2;
                        locked.anchorOffsetY = locked.height / 2;
                    }
                    var tw = egret.Tween.get(locked, { loop: false });
                    var self_1 = this;
                    tw.
                        to({ scaleX: 8, scaleY: 8, rotation: 60 }, 350).
                        to({ scaleX: 2.5, scaleY: 2.5, rotation: 150 }, 250).
                        to({ scaleX: 0.8, scaleY: 0.8, rotation: 240 }, 150).call(function () {
                        egret.Tween.removeTweens(locked);
                        burn.tools.TweenTools.rotation(locked, 3000);
                    });
                }
            };
            //核弹板子上按钮的果冻效果
            GameUtil.playWarAction = function (arr) {
                for (var i = 0; i < arr.length; i++) {
                    var item = egret.Tween.get(arr[i], { loop: false });
                    arr[i].scaleX = 0;
                    arr[i].scaleY = 0;
                    var time = 20;
                    item.wait(300 - (i * 60)).to({ scaleY: 0.2, scaleX: 0.15 }, time).to({ scaleY: 0.4, scaleX: 0.3 }, time)
                        .to({ scaleY: 0.6, scaleX: 0.45 }, time).to({ scaleY: 0.8, scaleX: 0.6 }, time).to({ scaleY: 1, scaleX: 0.75 }, time)
                        .to({ scaleY: 1.05, scaleX: 0.9 }, time).to({ scaleY: 1.15, scaleX: 1.05 }, time).to({ scaleY: 1.13, scaleX: 1.10 }, time)
                        .to({ scaleY: 1.05, scaleX: 1.15 }, time).to({ scaleY: 1, scaleX: 1.10 }, time).to({ scaleY: 0.9, scaleX: 1.05 }, time)
                        .to({ scaleY: 0.75, scaleX: 1 }, time).to({ scaleY: 0.65, scaleX: 0.85 }, time).to({ scaleY: 0.75, scaleX: 0.70 }, time)
                        .to({ scaleY: 0.85, scaleX: 0.75 }, time).to({ scaleY: 1, scaleX: 0.9 }, time).to({ scaleY: 1, scaleX: 1 }, time);
                }
            };
            GameUtil.playWaitAction = function (arr) {
                for (var i = 0; i < arr.length; i++) {
                    var item = egret.Tween.get(arr[i], { loop: false });
                    var time = 100;
                    var posY = arr[i].y;
                    item.wait(600 - (i * 60)).to({ y: posY - 60 }, time)
                        .to({ y: posY - 20 }, time).to({ y: posY + 10 }, time)
                        .to({ y: posY - 5 }, time).to({ y: posY }, time);
                }
                setTimeout(function () {
                    game.util.GameUtil.playWaitAction(arr);
                }, 3000);
            };
            GameUtil.playChakanAction = function (arr) {
                for (var i = 0; i < arr.length; i++) {
                    var item = egret.Tween.get(arr[i], { loop: false });
                    arr[i].scaleX = 0;
                    arr[i].scaleY = 0;
                    var oldX = arr[i].x;
                    var oldY = arr[i].y;
                    var time = 20;
                    item.wait(200 - (i * 150)).
                        to({ x: 150, y: 200 }, 10).to({ scaleY: 0.2, scaleX: 0.15, x: oldX, y: oldY }, 200).to({ scaleY: 0.4, scaleX: 0.3 }, time)
                        .to({ scaleY: 0.6, scaleX: 0.45 }, time).to({ scaleY: 0.8, scaleX: 0.6 }, time).to({ scaleY: 1, scaleX: 0.75 }, time)
                        .to({ scaleY: 1.05, scaleX: 0.9 }, time).to({ scaleY: 1.15, scaleX: 1.05 }, time).to({ scaleY: 1.13, scaleX: 1.10 }, time)
                        .to({ scaleY: 1.05, scaleX: 1.15 }, time).to({ scaleY: 1, scaleX: 1.10 }, time).to({ scaleY: 0.9, scaleX: 1.05 }, time)
                        .to({ scaleY: 0.75, scaleX: 1 }, time).to({ scaleY: 0.65, scaleX: 0.85 }, time).to({ scaleY: 0.75, scaleX: 0.70 }, time)
                        .to({ scaleY: 0.85, scaleX: 0.75 }, time).to({ scaleY: 1, scaleX: 0.9 }, time).to({ scaleY: 1, scaleX: 1 }, time);
                }
            };
            GameUtil.openUserLvip = function (display, lv) {
                if (display === void 0) { display = null; }
                var parentView;
                var width = 0;
                var height = 0;
                if (display == null) {
                    parentView = egret.MainContext.instance.stage;
                    width = CONFIG.contentWidth;
                    height = CONFIG.contentHeight;
                }
                else {
                    parentView = display;
                    width = parentView.width;
                    height = parentView.height;
                }
                EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/userInfo/UserLvUp.exml", function () {
                    var confirm = new UserLvUpView(lv, parentView);
                    confirm.anchorOffsetX = confirm.width >> 1;
                    confirm.anchorOffsetY = confirm.height >> 1;
                    confirm.x = width >> 1;
                    confirm.y = height >> 1;
                    if (parentView) {
                        parentView.addChild(confirm);
                    }
                }, this);
            };
            GameUtil.openConfirmByTwoButton = function (display, fun, tar, strTips) {
                if (display === void 0) { display = null; }
                var parentView;
                var width = 0;
                var height = 0;
                if (display == null) {
                    parentView = egret.MainContext.instance.stage;
                    width = CONFIG.contentWidth;
                    height = CONFIG.contentHeight;
                }
                else {
                    parentView = display;
                    width = parentView.width;
                    height = parentView.height;
                }
                EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Confirm.exml", function () {
                    var confirm = new ConfirmView(function () {
                        confirm.setGroupTwo();
                        confirm.setTips(strTips);
                    });
                    confirm.setOkCallFun(fun, tar, parentView);
                    confirm.anchorOffsetX = confirm.width / 2;
                    confirm.anchorOffsetY = confirm.height / 2;
                    if (parentView) {
                        parentView.addChild(confirm);
                    }
                }, this);
            };
            GameUtil.openConfirm = function (display, fun, tar, strTips) {
                if (display === void 0) { display = null; }
                var parentView;
                var width = 0;
                var height = 0;
                if (display == null) {
                    parentView = egret.MainContext.instance.stage;
                    width = CONFIG.contentWidth;
                    height = CONFIG.contentHeight;
                }
                else {
                    parentView = display;
                    width = parentView.width;
                    height = parentView.height;
                }
                EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Confirm.exml", function () {
                    var confirm = new ConfirmView(function () {
                        confirm.setGroupOne();
                        confirm.setTips(strTips);
                    });
                    confirm.setOkCallFun(fun, tar, parentView);
                    confirm.anchorOffsetX = confirm.width / 2;
                    confirm.anchorOffsetY = confirm.height / 2;
                    if (parentView) {
                        parentView.addChild(confirm);
                    }
                }, this);
            };
            GameUtil.openEmailChakan = function (display, fun, strTips, list, state) {
                if (display === void 0) { display = null; }
                var parentView;
                var width = 0;
                var height = 0;
                if (display == null) {
                    parentView = egret.MainContext.instance.stage;
                    width = CONFIG.contentWidth;
                    height = CONFIG.contentHeight;
                }
                else {
                    parentView = display;
                    width = parentView.width;
                    height = parentView.height;
                }
                EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/EmailChakanPanel.exml", function () {
                    var confirm = new EmailChakanView(strTips, fun, parentView, list, state);
                    confirm.anchorOffsetX = confirm.width / 2;
                    confirm.anchorOffsetY = confirm.height / 2;
                    confirm.x = width / 2;
                    confirm.y = height / 2;
                    if (parentView) {
                        parentView.addChild(confirm);
                    }
                }, this);
            };
            GameUtil.addGoldEffect = function (display) {
                if (display === void 0) { display = null; }
                var parentView;
                if (display == null) {
                    parentView = egret.MainContext.instance.stage;
                }
                else {
                    parentView = display;
                }
                var txtr = RES.getRes("ef_goldGuangtiao_png"); //ef_goldGuandian_png //ef_goldGuangtiao_png
                var img = new egret.Bitmap(txtr);
                img.blendMode = egret.BlendMode.ADD;
                img.anchorOffsetX = img.width / 2;
                img.anchorOffsetY = img.height / 2;
                var circle = new egret.Shape();
                circle.graphics.beginFill(0x0000ff);
                circle.graphics.drawCircle(26, 26, 25);
                circle.graphics.endFill();
                if (parentView) {
                    img.x = -50;
                    img.y = 0;
                    img.name = "imgName";
                    circle.name = "circleName";
                    var childImg = parentView.getChildByName("imgName");
                    if (childImg) {
                        parentView.removeChild(childImg);
                    }
                    var childCircle = parentView.getChildByName("circleName");
                    if (childCircle) {
                        parentView.removeChild(childCircle);
                    }
                    parentView.addChild(img);
                    parentView.addChild(circle);
                    img.mask = circle;
                }
                game.util.GameUtil.playOnce(img, parentView);
            };
            GameUtil.playOnce = function (obj, parent) {
                game.util.GameUtil._playLoop(obj, parent);
            };
            GameUtil._playLoop = function (obj, parent) {
                var tw = egret.Tween.get(obj, { loop: false });
                tw.wait(9000).to({ x: 200 }, 1500).call(function () {
                    egret.Tween.removeTweens(obj);
                    var txtr = RES.getRes("ef_goldGuandian_png"); //ef_goldGuandian_png //ef_goldGuangtiao_png
                    var img = new egret.Bitmap(txtr);
                    if (parent) {
                        img.anchorOffsetX = img.width / 2;
                        img.anchorOffsetY = img.height / 2;
                        img.x = parent.width - 10;
                        img.y = 10;
                        parent.addChild(img);
                        var twDian = egret.Tween.get(img, { loop: false });
                        twDian.to({ rotation: 270 }, 500).call(function () {
                            egret.Tween.removeTweens(img);
                            parent.removeChild(img);
                            obj.x = -50;
                            game.util.GameUtil._playLoop(obj, parent);
                        });
                    }
                });
            };
            /** 验证金币是否满足进入房间条件 */
            GameUtil.verifyRoomCoins = function (roomType, coins) {
                var roomCoinsVo = game.table.T_Config_Table.getVoByKey(32);
                if (roomCoinsVo == null) {
                    console.log("T_Config_Table[32] is null");
                    return false;
                }
                var coinsArr = roomCoinsVo.value.split("_");
                var needCoins = 0;
                switch (roomType) {
                    case RequesetRoomState.AutoLowRoom:
                        needCoins = Number(coinsArr[0]);
                        break;
                    case RequesetRoomState.AutoHighRoom:
                        needCoins = Number(coinsArr[1]);
                        break;
                    case RequesetRoomState.SelectRoom:
                        needCoins = Number(coinsArr[2]);
                        break;
                }
                if (coins >= needCoins) {
                    return true;
                }
                return false;
            };
            /** 获取指定类型房间需要的金币数量 */
            GameUtil.getNeedCoinsByRoomType = function (t) {
                var roomCoinsVo = game.table.T_Config_Table.getVoByKey(32);
                if (roomCoinsVo == null) {
                    console.log("T_Config_Table[32] is null");
                    return 0;
                }
                var coinsArr = roomCoinsVo.value.split("_");
                var needCoins = 0;
                switch (t) {
                    case RequesetRoomState.AutoLowRoom:
                        needCoins = Number(coinsArr[0]);
                        break;
                    case RequesetRoomState.AutoHighRoom:
                        needCoins = Number(coinsArr[1]);
                        break;
                    case RequesetRoomState.SelectRoom:
                        needCoins = Number(coinsArr[2]);
                        break;
                }
                return needCoins;
            };
            /** 获取指定类型房间需要的炮倍 */
            GameUtil.getNeedGunByRoomType = function (t, gunId) {
                var roomCoinsVo = game.table.T_Config_Table.getVoByKey(36);
                if (roomCoinsVo == null) {
                    console.log("T_Config_Table[36] is null");
                    return 0;
                }
                var coinsArr = roomCoinsVo.value.split("_");
                var needId = 0;
                switch (t) {
                    case RequesetRoomState.AutoLowRoom:
                        needId = Number(coinsArr[0]);
                        break;
                    case RequesetRoomState.AutoHighRoom:
                        needId = Number(coinsArr[1]);
                        break;
                    case RequesetRoomState.SelectRoom:
                        needId = Number(coinsArr[2]);
                        break;
                }
                if (gunId >= needId) {
                    return -1;
                }
                return needId;
            };
            /** 获取当前金额满足的最高炮倍 */
            GameUtil.getMaxGunRateByGold = function (coins) {
                var id = -1;
                var vos = game.table.T_Gun_Table.getAllVo();
                var len = vos.length;
                for (var i = len - 1; i >= 0; i--) {
                    if (vos[i].bulletNum <= coins) {
                        id = vos[i].id;
                        break;
                    }
                }
                return id;
            };
            /**
             * 根据金币和炮倍获取可进入的房间类型
             */
            GameUtil.getRoomTypeByCoinsAndRate = function (coins, gunRate) {
                //金币的判断
                var roomCoinsVo = game.table.T_Config_Table.getVoByKey(32);
                if (roomCoinsVo == null) {
                    console.log("T_Config_Table[32] is null");
                    return 0;
                }
                var coinsArr = roomCoinsVo.value.split("_");
                var coinsIdx = 0;
                if (coins < Number(coinsArr[0])) {
                    coinsIdx = 0;
                }
                else if (coins >= Number(coinsArr[0]) && coins < Number(coinsArr[1])) {
                    coinsIdx = 2;
                }
                else if (coins >= Number(coinsArr[1])) {
                    coinsIdx = 3;
                }
                //炮倍的判断
                var gunRateVo = game.table.T_Config_Table.getVoByKey(36);
                if (gunRateVo == null) {
                    console.log("T_Config_Table[36] is null");
                    return 0;
                }
                var gunsArr = gunRateVo.value.split("_");
                var gunIdx = 0;
                if (gunRate < Number(gunsArr[0])) {
                    gunIdx = 0;
                }
                else if (gunRate >= Number(gunsArr[0]) && gunRate < Number(gunsArr[1])) {
                    gunIdx = 2;
                }
                else if (gunRate >= Number(gunsArr[1])) {
                    gunIdx = 3;
                }
                var idx = Math.min(coinsIdx, gunIdx);
                //根据idx 得出 type
                if (idx < 2) {
                    return RequesetRoomState.NewbieRoom;
                }
                var type = 0;
                switch (idx) {
                    case 2:
                        type = RequesetRoomState.AutoLowRoom;
                        break;
                    case 3:
                        type = RequesetRoomState.AutoHighRoom;
                        break;
                }
                return type;
            };
            //恭喜获得
            GameUtil.openCommongain = function (display, arr) {
                if (display === void 0) { display = null; }
                var parentView;
                var width = 0;
                var height = 0;
                if (display == null) {
                    parentView = egret.MainContext.instance.stage;
                    width = CONFIG.contentWidth;
                    height = CONFIG.contentHeight;
                }
                else {
                    parentView = display;
                    width = parentView.width;
                    height = parentView.height;
                }
                EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/userInfo/UserLvUp.exml", function () {
                    var confirm = new CommonGainView(arr, parentView);
                    confirm.anchorOffsetX = confirm.width >> 1;
                    confirm.anchorOffsetY = confirm.height >> 1;
                    confirm.x = width >> 1;
                    confirm.y = height >> 1;
                    if (parentView) {
                        parentView.addChild(confirm);
                    }
                }, this);
            };
            //恭喜获得飞入背包
            GameUtil.openCommonGainByPos = function (display, arr, to, fun) {
                if (display === void 0) { display = null; }
                var parentView;
                var width = 0;
                var height = 0;
                if (display == null) {
                    parentView = egret.MainContext.instance.stage;
                    width = CONFIG.contentWidth;
                    height = CONFIG.contentHeight;
                }
                else {
                    parentView = display;
                    width = parentView.width;
                    height = parentView.height;
                }
                EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/userInfo/UserLvUp.exml", function () {
                    var confirm = new CommonGainView(arr, parentView);
                    confirm.setPosFun(to, fun);
                    confirm.anchorOffsetX = confirm.width >> 1;
                    confirm.anchorOffsetY = confirm.height >> 1;
                    confirm.x = width >> 1;
                    confirm.y = height >> 1;
                    if (parentView) {
                        parentView.addChild(confirm);
                    }
                }, this);
            };
            //恭喜获得 1元礼包
            GameUtil.openRMBGain = function (display) {
                if (display === void 0) { display = null; }
                var parentView;
                var width = 0;
                var height = 0;
                if (display == null) {
                    parentView = egret.MainContext.instance.stage;
                    width = CONFIG.contentWidth;
                    height = CONFIG.contentHeight;
                }
                else {
                    parentView = display;
                    width = parentView.width;
                    height = parentView.height;
                }
                EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/guide/RmbGain.exml", function () {
                    var confirm = new RmbGainView(parentView);
                    confirm.anchorOffsetX = confirm.width >> 1;
                    confirm.anchorOffsetY = confirm.height >> 1;
                    confirm.x = width >> 1;
                    confirm.y = height >> 1;
                    confirm.name = "RMBGAIN";
                    if (parentView) {
                        parentView.addChild(confirm);
                    }
                }, this);
            };
            GameUtil.openQihangByPos = function (display, arr, to, fun) {
                if (display === void 0) { display = null; }
                var parentView;
                var width = 0;
                var height = 0;
                if (display == null) {
                    parentView = egret.MainContext.instance.stage;
                    width = CONFIG.contentWidth;
                    height = CONFIG.contentHeight;
                }
                else {
                    parentView = display;
                    width = parentView.width;
                    height = parentView.height;
                }
                EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Qihang/Qihang.exml", function () {
                    var confirm = new QihangView(arr, parentView, true);
                    confirm.setPosFun(to, fun);
                    confirm.anchorOffsetX = confirm.width >> 1;
                    confirm.anchorOffsetY = confirm.height >> 1;
                    confirm.x = width >> 1;
                    confirm.y = height >> 1;
                    if (parentView) {
                        parentView.addChild(confirm);
                    }
                }, this);
            };
            GameUtil.getCircle = function () {
                var txtr = RES.getRes("ef_addcoin_png");
                var effct = new egret.Bitmap(txtr);
                effct.anchorOffsetX = effct.width / 2;
                effct.anchorOffsetY = effct.height / 2;
                burn.tools.TweenTools.circle(effct);
                return effct;
            };
            GameUtil.getCircle1 = function () {
                var txtr = RES.getRes("ef_addcoin_png");
                var effct = new egret.Bitmap(txtr);
                effct.anchorOffsetX = effct.width / 2;
                effct.anchorOffsetY = effct.height / 2;
                setTimeout(function () {
                    burn.tools.TweenTools.circle(effct);
                }, 500);
                return effct;
            };
            GameUtil.openCiriByPos = function (display, arr, to, fun) {
                if (display === void 0) { display = null; }
                if (to === void 0) { to = null; }
                if (fun === void 0) { fun = null; }
                var parentView;
                var width = 0;
                var height = 0;
                if (display == null) {
                    parentView = egret.MainContext.instance.stage;
                    width = CONFIG.contentWidth;
                    height = CONFIG.contentHeight;
                }
                else {
                    parentView = display;
                    width = parentView.width;
                    height = parentView.height;
                }
                EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Qihang/Qihang.exml", function () {
                    var confirm = new QihangView(arr, parentView);
                    if (fun) {
                        confirm.setPosFun(to, fun);
                        confirm.setCiri(game.util.TimeUtil.expireTime(game.table.T_Language_Table.getVoByKey(119).value));
                    }
                    else {
                        confirm.setPosFun(null, null);
                        confirm.setCiri(game.util.TimeUtil.expireTime(game.table.T_Language_Table.getVoByKey(118).value));
                    }
                    confirm.anchorOffsetX = confirm.width >> 1;
                    confirm.anchorOffsetY = confirm.height >> 1;
                    confirm.x = width >> 1;
                    confirm.y = height >> 1;
                    if (parentView) {
                        parentView.addChild(confirm);
                    }
                }, this);
            };
            GameUtil.openCommonHelp = function (display, id) {
                if (display === void 0) { display = null; }
                if (id === void 0) { id = 1; }
                var parentView;
                var width = 0;
                var height = 0;
                if (display == null) {
                    parentView = egret.MainContext.instance.stage;
                    width = CONFIG.contentWidth;
                    height = CONFIG.contentHeight;
                }
                else {
                    parentView = display;
                    width = parentView.width;
                    height = parentView.height;
                }
                var confirm = new CommonHelpView(parentView, id);
                confirm.anchorOffsetX = confirm.width >> 1;
                confirm.anchorOffsetY = confirm.height >> 1;
                if (parentView) {
                    parentView.addChild(confirm);
                }
            };
            //VIP 每日弹板
            GameUtil.openVipCommonPanel = function (display, arr, to, fun, goldNum) {
                if (display === void 0) { display = null; }
                if (to === void 0) { to = null; }
                if (fun === void 0) { fun = null; }
                var parentView;
                var width = 0;
                var height = 0;
                if (display == null) {
                    parentView = egret.MainContext.instance.stage;
                    width = CONFIG.contentWidth;
                    height = CONFIG.contentHeight;
                }
                else {
                    parentView = display;
                    width = parentView.width;
                    height = parentView.height;
                }
                EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Qihang/CommonVip.exml", function () {
                    var confirm = new CommonVipPanel(arr, parentView);
                    confirm.setPosFun(to, fun);
                    confirm.setGoldNum(goldNum);
                    confirm.anchorOffsetX = confirm.width >> 1;
                    confirm.anchorOffsetY = confirm.height >> 1;
                    confirm.x = width >> 1;
                    confirm.y = height >> 1;
                    if (parentView) {
                        parentView.addChild(confirm);
                    }
                }, this);
            };
            //判断类型是不是快速赛
            GameUtil.isKss = function (roomType) {
                if (roomType != RequesetRoomState.KssRoom
                    && roomType != RequesetRoomState.KssRoomChu
                    && roomType != RequesetRoomState.KssRoomZhong
                    && roomType != RequesetRoomState.KssRoomJingying) {
                    return false;
                }
                return true;
            };
            //播放动画
            GameUtil.play321Go = function (display, fun) {
                var parentView;
                var width = 0;
                var height = 0;
                if (display == null) {
                    parentView = egret.MainContext.instance.stage;
                    width = CONFIG.contentWidth;
                    height = CONFIG.contentHeight;
                }
                else {
                    parentView = display;
                    width = parentView.width;
                    height = parentView.height;
                }
                var disContainer = new egret.DisplayObjectContainer();
                disContainer.width = width;
                disContainer.height = height;
                disContainer.anchorOffsetX = disContainer.width >> 1;
                disContainer.anchorOffsetY = disContainer.height >> 1;
                disContainer.x = CONFIG.contentWidth / 2;
                disContainer.y = CONFIG.contentHeight / 2;
                if (parentView) {
                    parentView.addChild(disContainer);
                }
                var rect = new eui.Rect();
                rect.alpha = 0.5;
                rect.width = width;
                rect.height = height;
                rect.x = CONFIG.contentWidth / 2 + CONFIG.adaptX;
                rect.y = CONFIG.contentHeight / 2 + CONFIG.adaptY;
                rect.anchorOffsetX = rect.width / 2;
                rect.anchorOffsetY = rect.height / 2;
                disContainer.addChild(rect);
                var numFont = new egret.BitmapText();
                numFont.font = RES.getRes("number_fnt");
                numFont.text = "3";
                numFont.x = CONFIG.contentWidth / 2 + CONFIG.adaptX;
                numFont.y = CONFIG.contentHeight / 2 + CONFIG.adaptY;
                numFont.anchorOffsetX = numFont.width / 2;
                numFont.anchorOffsetY = numFont.height / 2;
                numFont.scaleX = 3.6;
                numFont.scaleY = 3.6;
                disContainer.addChild(numFont);
                var self = this;
                var tw = egret.Tween.get(numFont, { loop: false });
                tw.to({ scaleX: 1.8, scaleY: 1.8 }, 300)
                    .to({ scaleX: 2.2, scaleY: 2.21 }, 200)
                    .to({ scaleX: 1.9, scaleY: 1.9 }, 150).call(function () {
                    numFont.visible = false;
                    numFont.text = "2";
                }).to({ scaleX: 3.6, scaleY: 3.6 }, 10).wait(500).call(function () {
                    numFont.visible = true;
                }).to({ scaleX: 1.8, scaleY: 1.8 }, 300)
                    .to({ scaleX: 2.2, scaleY: 2.21 }, 200)
                    .to({ scaleX: 1.9, scaleY: 1.9 }, 150).call(function () {
                    numFont.visible = false;
                    numFont.text = "1";
                }).to({ scaleX: 3.6, scaleY: 3.6 }, 10).wait(500).call(function () {
                    numFont.visible = true;
                }).to({ scaleX: 1.8, scaleY: 1.8 }, 300)
                    .to({ scaleX: 2.2, scaleY: 2.21 }, 200)
                    .to({ scaleX: 1.9, scaleY: 1.9 }, 150).call(function () {
                    egret.Tween.removeTweens(numFont);
                    disContainer.removeChild(numFont);
                    var imgGo = new egret.Bitmap(RES.getRes("Go_png"));
                    imgGo.x = CONFIG.contentWidth / 2 + CONFIG.adaptX;
                    imgGo.y = CONFIG.contentHeight / 2 + CONFIG.adaptY;
                    imgGo.anchorOffsetX = imgGo.width / 2;
                    imgGo.anchorOffsetY = imgGo.height / 2;
                    imgGo.scaleX = 3.6;
                    imgGo.scaleY = 3.6;
                    disContainer.addChild(imgGo);
                    var twGo = egret.Tween.get(imgGo, { loop: false });
                    twGo.to({ scaleX: 1.8, scaleY: 1.8 }, 300)
                        .to({ scaleX: 2.2, scaleY: 2.21 }, 200)
                        .to({ scaleX: 1.9, scaleY: 1.9 }, 150).call(function () {
                        egret.Tween.removeTweens(imgGo);
                        disContainer.removeChild(imgGo);
                        parentView.removeChild(disContainer);
                        fun && fun();
                    });
                });
            };
            return GameUtil;
        }());
        util.GameUtil = GameUtil;
        __reflect(GameUtil.prototype, "game.util.GameUtil");
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
//# sourceMappingURL=GameUtil.js.map