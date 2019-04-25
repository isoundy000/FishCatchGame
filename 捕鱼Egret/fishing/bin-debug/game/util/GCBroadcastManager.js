var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var util;
    (function (util) {
        var BroadcastObj = (function () {
            function BroadcastObj() {
            }
            return BroadcastObj;
        }());
        util.BroadcastObj = BroadcastObj;
        __reflect(BroadcastObj.prototype, "game.util.BroadcastObj");
        /**
         * 服务器广播通知
         */
        var GCBroadcastManager = (function () {
            function GCBroadcastManager() {
            }
            GCBroadcastManager.init = function () {
                GCBroadcastManager._hallBroadcastList = new Array();
                GCBroadcastManager._roomBroadcastList = new Array();
                GCBroadcastManager.initStatic();
                //初始化播放相关参数
                var configVO = game.table.T_Config_Table.getVoByKey(42);
                GCBroadcastManager._playInterval = Number(configVO.value) * 1000;
            };
            GCBroadcastManager.initStatic = function () {
                GCBroadcastManager._roomMsgIsInPlay = false;
            };
            //添加大厅广播消息
            GCBroadcastManager.addHallBroadcast = function (msg) {
                GCBroadcastManager._hallBroadcastList = msg;
                GCBroadcastManager.playHallBroadcast();
            };
            //添加房间消息
            GCBroadcastManager.addRoomBroadcast = function (msg, type, priority) {
                if (priority === void 0) { priority = 0; }
                var obj = new BroadcastObj();
                obj.type = type;
                obj.msg = msg;
                if (priority) {
                    obj.priority = priority;
                }
                GCBroadcastManager._roomBroadcastList.push(obj);
                if (priority) {
                    this.sortMsgByPriority(GCBroadcastManager._roomBroadcastList);
                }
                if (GCBroadcastManager._roomBroadcastList.length > 20) {
                    GCBroadcastManager._roomBroadcastList.length = 20;
                }
                GCBroadcastManager.playRoomBroadcast();
            };
            //根据priority排序 较小的排在前面
            GCBroadcastManager.sortMsgByPriority = function (arr) {
                arr.sort(function (a, b) {
                    return a.priority - b.priority;
                });
            };
            //大厅播放跑马灯
            GCBroadcastManager.playHallBroadcast = function () {
                var _this = this;
                var stage = burn.Director.getStage();
                GCBroadcastManager.clearHallBroadcast();
                var boardUI = new game.util.GCBroadcastView(1);
                boardUI.setHallData(GCBroadcastManager._hallBroadcastList);
                boardUI.x = 640 + CONFIG.adaptX;
                boardUI.y = 130 + CONFIG.adaptY;
                boardUI.name = "boardUI";
                stage.addChild(boardUI);
                var tw = egret.Tween.get(boardUI, { loop: false });
                boardUI.alpha = 0;
                tw.to({ alpha: 1 }, 500).call(function () {
                    egret.Tween.removeTweens(boardUI);
                });
                boardUI.startHallMsg(function () {
                    GCBroadcastManager._timer = new egret.Timer(GCBroadcastManager._playInterval, 1);
                    GCBroadcastManager._timer.addEventListener(egret.TimerEvent.TIMER, GCBroadcastManager.playHallBroadcast, _this);
                    GCBroadcastManager._timer.start();
                });
            };
            //房间内播放通知
            GCBroadcastManager.playRoomBroadcast = function () {
                if (GCBroadcastManager._roomMsgIsInPlay) {
                    return;
                }
                GCBroadcastManager._roomMsgIsInPlay = true;
                GCBroadcastManager._timer = new egret.Timer(2500, 1);
                GCBroadcastManager._timer.addEventListener(egret.TimerEvent.TIMER, GCBroadcastManager.playRoomBroardcastItem, this);
                GCBroadcastManager._timer.start();
            };
            //播放房间内的单条数据
            GCBroadcastManager.playRoomBroardcastItem = function () {
                if (GCBroadcastManager._roomBroadcastList.length > 0) {
                    var stage = burn.Director.getStage();
                    var obj = GCBroadcastManager._roomBroadcastList.shift();
                    var boardUI_1 = new game.util.GCBroadcastView(obj.type);
                    boardUI_1.setRoomData(obj.msg);
                    boardUI_1.x = 640 + CONFIG.adaptX;
                    boardUI_1.y = 155 + CONFIG.adaptY;
                    boardUI_1.name = "boardUI";
                    stage.addChild(boardUI_1);
                    var tw = egret.Tween.get(boardUI_1, { loop: false });
                    boardUI_1.alpha = 0;
                    boardUI_1.cacheAsBitmap = true;
                    tw.to({ alpha: 1 }, 500).call(function () {
                        egret.Tween.removeTweens(boardUI_1);
                    });
                    boardUI_1.startRoomMsg(function () {
                        GCBroadcastManager.playRoomBroardcastItem();
                    });
                }
                else {
                    GCBroadcastManager._roomMsgIsInPlay = false;
                    if (GCBroadcastManager._timer) {
                        GCBroadcastManager._timer.removeEventListener(egret.TimerEvent.TIMER, GCBroadcastManager.playRoomBroardcastItem, this);
                    }
                }
            };
            //清除大厅内的滚动公告
            GCBroadcastManager.clearHallBroadcast = function () {
                var stage = burn.Director.getStage();
                var currBoardUI = stage.getChildByName("boardUI");
                if (currBoardUI) {
                    currBoardUI.destroy();
                    currBoardUI.parent && currBoardUI.parent.removeChild(currBoardUI);
                }
                if (GCBroadcastManager._timer) {
                    GCBroadcastManager._timer.removeEventListener(egret.TimerEvent.TIMER, GCBroadcastManager.playHallBroadcast, this);
                    GCBroadcastManager._timer = null;
                }
            };
            //清除房间内的滚动公告
            GCBroadcastManager.clearRoomBroadcast = function () {
                var stage = burn.Director.getStage();
                var currBoardUI = stage.getChildByName("boardUI");
                if (currBoardUI) {
                    currBoardUI.destroy();
                    currBoardUI.parent && currBoardUI.parent.removeChild(currBoardUI);
                }
                if (GCBroadcastManager._timer) {
                    GCBroadcastManager._timer.removeEventListener(egret.TimerEvent.TIMER, GCBroadcastManager.playRoomBroardcastItem, this);
                }
            };
            return GCBroadcastManager;
        }());
        util.GCBroadcastManager = GCBroadcastManager;
        __reflect(GCBroadcastManager.prototype, "game.util.GCBroadcastManager");
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
(function (game) {
    var util;
    (function (util) {
        //跑马灯UI
        var GCBroadcastView = (function (_super) {
            __extends(GCBroadcastView, _super);
            function GCBroadcastView(type) {
                var _this = _super.call(this) || this;
                _this._type = type;
                return _this;
            }
            GCBroadcastView.prototype.setHallData = function (msg) {
                this.createHallUI(msg);
            };
            GCBroadcastView.prototype.setRoomData = function (msg) {
                this.createRoomUI(msg);
            };
            GCBroadcastView.prototype.createHallUI = function (msg) {
                var disp = new egret.DisplayObjectContainer();
                var bg = new egret.Bitmap(RES.getRes("common_laba_bg_png"));
                var rect = new egret.Rectangle(13, 13, 31, 18);
                bg.scale9Grid = rect;
                bg.width = 650;
                bg.height = 38;
                bg.anchorOffsetX = bg.width >> 1;
                bg.anchorOffsetY = bg.height >> 1;
                this.addChild(bg);
                this._tx = new egret.TextField();
                this._tx.height = bg.height - 5;
                this._tx.textAlign = egret.HorizontalAlign.LEFT;
                this._tx.y -= (bg.height >> 1) - 8;
                this._tx.x = (CONFIG.contentWidth + CONFIG.adaptX) >> 1;
                this._tx.size = 23;
                var str = "";
                for (var i = 0; i < msg.length; i++) {
                    str += msg[i];
                    if (i != (msg.length - 1)) {
                        str += "                      ";
                    }
                }
                this._tx.textFlow = (new egret.HtmlTextParser).parser(str);
                disp.addChild(this._tx);
                var laba = new egret.Bitmap(RES.getRes("common_laba_png"));
                this.addChild(laba);
                laba.x = -315;
                laba.y = -16;
                ;
                var shp = new egret.Shape();
                shp.graphics.beginFill(0xff0000, 1);
                shp.graphics.drawRect(0, 0, 580, 40);
                shp.graphics.endFill();
                disp.addChild(shp);
                shp.anchorOffsetX = bg.width / 2 + 60;
                shp.anchorOffsetY = bg.height >> 1;
                shp.x = bg.x + 115;
                shp.y = bg.y;
                disp.mask = shp;
                this.addChild(disp);
            };
            GCBroadcastView.prototype.createRoomUI = function (msg) {
                var bg = new egret.Bitmap(RES.getRes("common_laba_bg_png"));
                var rect = new egret.Rectangle(13, 13, 31, 18);
                bg.scale9Grid = rect;
                bg.height = 40;
                this._tx = new egret.TextField();
                this._tx.height = bg.height - 5;
                if (this._type == 3) {
                    this._tx.textFlow = (new egret.HtmlTextParser).parser("<font color='#2ca3fe' size='24'><b>" + game.util.Language.getText(221)
                        + "</b></font><font color='#ff60cb' size='24'><b>" + msg + "</b></font>");
                }
                else {
                    this._tx.textFlow = (new egret.HtmlTextParser).parser(msg);
                }
                this._tx.anchorOffsetX = this._tx.width >> 1;
                this._tx.anchorOffsetY = (this._tx.height >> 1) - 5;
                bg.width = this._tx.width + 100;
                bg.anchorOffsetX = bg.width >> 1;
                bg.anchorOffsetY = bg.height >> 1;
                this.addChild(bg);
                this.addChild(this._tx);
            };
            GCBroadcastView.prototype.startHallMsg = function (fun) {
                var self = this;
                var tw = egret.Tween.get(this._tx, { loop: false });
                var t = (this._tx.width + (CONFIG.contentWidth >> 1)) / 100 * 1000;
                tw.to({ x: -(this._tx.width + (CONFIG.contentWidth >> 1)) }, t).call(function () {
                    egret.Tween.removeTweens(self._tx);
                    self.parent && self.parent.removeChild(self);
                    fun();
                });
            };
            GCBroadcastView.prototype.startRoomMsg = function (fun) {
                var _this = this;
                //普通通知3.5秒，小喇叭喊话10秒
                var time = 3500;
                if (this._type == 3) {
                    time = 1000 * 10;
                }
                egret.setTimeout(function () {
                    var tw = egret.Tween.get(_this);
                    tw.to({ alpha: 0 }, 500).call(function () {
                        _this.parent && _this.parent.removeChild(_this);
                        fun();
                    });
                }, this, time);
            };
            GCBroadcastView.prototype.destroy = function () {
                egret.Tween.removeTweens(this._tx);
                egret.Tween.removeTweens(this);
            };
            return GCBroadcastView;
        }(egret.DisplayObjectContainer));
        util.GCBroadcastView = GCBroadcastView;
        __reflect(GCBroadcastView.prototype, "game.util.GCBroadcastView");
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
//# sourceMappingURL=GCBroadcastManager.js.map