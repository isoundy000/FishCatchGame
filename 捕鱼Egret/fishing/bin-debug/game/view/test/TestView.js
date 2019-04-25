var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TestView = (function (_super) {
    __extends(TestView, _super);
    ////////////////////////////////////
    function TestView() {
        var _this = _super.call(this) || this;
        //操作类型 1：画    2：挪    3：删    4：导
        _this._state = 1;
        _this.toggleBtns = [];
        _this.kuangList = new Array();
        return _this;
    }
    TestView.prototype.initView = function () {
        var self = this;
        //资源加载完成
        var onResourceLoadComplete = function (event) {
            if (event.groupName == "fishing") {
                var fishId = CONFIG.TEST_FISH_ID;
                var fVo = game.table.T_Fish_Table.getVoByKey(fishId);
                if (fVo) {
                    if (fVo.groupId > 0) {
                        var resArr = [];
                        var groupVo = game.table.T_FishGroup_Table.getVoByKey(fVo.groupId);
                        var fishArr = groupVo.pos.split("|");
                        for (var i = 0; i < fishArr.length; i++) {
                            var fishItem = fishArr[i].split(",");
                            var tempFish = game.table.T_Fish_Table.getVoByKey(Number(fishItem[0]));
                            resArr.push(tempFish.resRunUrl + "_png");
                            resArr.push(tempFish.resRunUrl + "_json");
                            resArr.push(tempFish.resRunUrl + "_rect_json");
                        }
                        RES.createGroup("fff", resArr);
                        RES.loadGroup("fff");
                        return;
                    }
                    else {
                        RES.createGroup("fff", [fVo.resRunUrl + "_png", fVo.resRunUrl + "_json", fVo.resRunUrl + "_rect_json"]);
                        RES.loadGroup("fff");
                        return;
                    }
                }
            }
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResourceLoadComplete, self);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, onResourceProgress, self);
            self.loadSecond();
        };
        //资源加载进度
        var onResourceProgress = function (event) {
            if (event.groupName == "fishing") {
            }
        };
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, onResourceProgress, this);
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Loading.exml", function () {
            self._loadingUI = new LoadingUI();
            self.addChild(self._loadingUI);
            RES.loadGroup("fishing");
        }, this);
        //初始化操作状态为0
        this._state = 0;
    };
    TestView.prototype.loadSecond = function () {
        var self = this;
        var onResourceLoadComplete = function (event) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResourceLoadComplete, self);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, onResourceProgress, self);
            self.showUI();
        };
        //资源加载进度
        var onResourceProgress = function (event) {
        };
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, onResourceProgress, this);
        RES.loadGroup("test");
    };
    TestView.prototype.showUI = function () {
        var self = this;
        //初始化层级
        this.drawLayer = new egret.DisplayObjectContainer();
        this.addChildAt(this.drawLayer, 50);
        this.uiLayer = new egret.DisplayObjectContainer();
        this.addChildAt(this.uiLayer, 100);
        RES.getResAsync("background_1_jpg", function (data, key) {
            var bg = new egret.Bitmap(data);
            this.drawLayer.addChildAt(bg, 0);
        }, this);
        this._fish = new room.actor.FishBase(CONFIG.TEST_FISH_ID);
        this._fish.setUniqId(123123);
        this._fish.anchorOffsetX = 0;
        this._fish.anchorOffsetY = 0;
        this._fish.setFishPosition(new egret.Point(640, 360));
        this.drawLayer.addChild(this._fish);
        //	game.util.GameUtil.setLockedEffect(this._fish,"locked","locked_circle_png");
        //添加触摸事件
        this.drawLayer.touchEnabled = true;
        this.drawLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.drawLayer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.drawLayer.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        //GM工具
        var addId = new eui.EditableText();
        addId.borderColor = 0xFF0000;
        addId.border = true;
        this.addChild(addId);
        addId.x = 40;
        addId.y = 35;
        var addCount = new eui.EditableText();
        addCount.border = true;
        addCount.borderColor = 0xFF0000;
        this.addChild(addCount);
        addCount.x = 150;
        addCount.y = 35;
        var huaBtn = new eui.Button();
        huaBtn.width = 80;
        huaBtn.height = 40;
        huaBtn.label = "加";
        huaBtn.x = 290;
        huaBtn.y = 30;
        this.addChild(huaBtn);
        huaBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var msg = new ModifyDataMessage();
            msg.initData();
            msg.setId(Number(addId.text));
            msg.setCount(Number(addCount.text));
            NetManager.send(msg);
        }, this);
        this.initTabBar();
    };
    TestView.prototype.initTabBar = function () {
        for (var i = 0; i < 6; i++) {
            var btn = new eui.ToggleButton();
            btn.y = 100;
            btn.width = 80;
            btn.height = 60;
            btn.x = 20 + i * 80;
            btn.addEventListener(eui.UIEvent.CHANGE, this.toggleChangeHandler, this);
            this.toggleBtns.push(btn);
            this.uiLayer.addChild(btn);
            if (i == 0) {
                btn.label = i + 1 + "画";
            }
            else if (i == 1) {
                btn.label = i + 1 + "挪";
            }
            else if (i == 2) {
                btn.label = i + 1 + "删";
            }
            else if (i == 3) {
                btn.label = i + 1 + "导";
            }
            else if (i == 4) {
                btn.label = i + 1 + "放";
            }
            else if (i == 5) {
                btn.label = i + 1 + "翻";
            }
        }
    };
    TestView.prototype.toggleChangeHandler = function (evt) {
        var fx = this._fish.x;
        var fy = this._fish.y;
        for (var i = 0; i < this.toggleBtns.length; i++) {
            var btn = this.toggleBtns[i];
            if (btn == evt.target) {
                btn.selected = true;
                this._state = i + 1;
                if (i == 3) {
                    var json = "{\"rect\":\n" +
                        "\t[\n";
                    for (var j = 0; j < this.kuangList.length; j++) {
                        var temp = this.kuangList[j];
                        json += "\t\t{\n";
                        json += "\t\t\t\"x\":" + (temp.x - fx) + ",\n";
                        json += "\t\t\t\"y\":" + (temp.y - fy) + ",\n";
                        json += "\t\t\t\"w\":" + temp.width + ",\n";
                        json += "\t\t\t\"h\":" + temp.height + "\n";
                        json += "\t\t},";
                        if (j == this.kuangList.length - 1) {
                            json = json.substr(0, json.length - 1);
                        }
                    }
                    json += "\n\t]\n" +
                        "}\n";
                    console.log(json);
                }
            }
            else {
                btn.selected = false;
            }
        }
    };
    TestView.prototype.touchBegin = function (evt) {
        console.log("============touchBegin===========");
        var x = evt.stageX;
        var y = evt.stageY;
        this.beginPoint = new egret.Point(x, y);
        this.prevPoint = new egret.Point(x, y);
        if (this._state == 1) {
            this.currKuang = new egret.Bitmap();
            this.currKuang.texture = RES.getRes("test_png");
            var rect = new egret.Rectangle(15, 15, 10, 10);
            this.currKuang.scale9Grid = rect;
            this.currKuang.width = 10;
            this.currKuang.height = 10;
            this.currKuang.x = x;
            this.currKuang.y = y;
            this.drawLayer.addChild(this.currKuang);
        }
        else if (this._state == 2) {
            for (var i = 0; i < this.kuangList.length; i++) {
                var temp = this.kuangList[i];
                var flag = temp.hitTestPoint(x, y);
                if (flag) {
                    this.currKuang = temp;
                    break;
                }
            }
        }
        else if (this._state == 6) {
            game.util.GameUtil.setLockedEffect(this._fish, "locked", "locked_circle_png");
            this._fish.fishflipY();
        }
        else if (this._state == 5) {
            var dropX = CONFIG.contentWidth / 2;
            var dropY = CONFIG.contentHeight / 2;
            var parent_1 = this.drawLayer;
            var data = RES.getRes(CONFIG.EFFECT_1 + "_json");
            var txtr = RES.getRes(CONFIG.EFFECT_1 + "_png");
            var mcFactory = new egret.MovieClipDataFactory(data, txtr);
            var goldIcon_1 = new egret.MovieClip(mcFactory.generateMovieClipData(CONFIG.EFFECT_1));
            goldIcon_1.blendMode = egret.BlendMode.ADD;
            goldIcon_1.scaleX = CONFIG.EFFECT_1_SCALE;
            goldIcon_1.scaleY = CONFIG.EFFECT_1_SCALE;
            goldIcon_1.gotoAndPlay("play", 1);
            var dataMc = goldIcon_1.movieClipData;
            var frameCur = 0;
            var Rect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
            goldIcon_1.anchorOffsetX = goldIcon_1.width / 2 + Rect.x;
            goldIcon_1.anchorOffsetY = goldIcon_1.height / 2 + Rect.y;
            goldIcon_1.frameRate = 10;
            goldIcon_1.x = dropX;
            goldIcon_1.y = dropY;
            parent_1.addChild(goldIcon_1);
            goldIcon_1.addEventListener(egret.Event.COMPLETE, function (e) {
                parent_1.removeChild(goldIcon_1);
            }, this);
            if (CONFIG.EFFECT_2 == null) {
                return;
            }
            var data1 = RES.getRes(CONFIG.EFFECT_2 + "_json");
            var txtr1 = RES.getRes(CONFIG.EFFECT_2 + "_png");
            var mcFactory1 = new egret.MovieClipDataFactory(data1, txtr1);
            var goldIcon1_1 = new egret.MovieClip(mcFactory1.generateMovieClipData(CONFIG.EFFECT_2));
            var dataMc1 = goldIcon1_1.movieClipData;
            var Rect1 = new egret.Rectangle(dataMc1.frames[frameCur].x, dataMc1.frames[frameCur].y, 0, 0);
            goldIcon1_1.visible = false;
            goldIcon1_1.frameRate = 10;
            goldIcon1_1.scaleX = CONFIG.EFFECT_1_SCALE;
            goldIcon1_1.scaleY = CONFIG.EFFECT_1_SCALE;
            var tw = egret.Tween.get(goldIcon1_1);
            tw.wait(CONFIG.EFFECT_DELAY).call(function () {
                egret.Tween.removeTweens(goldIcon1_1);
                goldIcon1_1.visible = true;
                goldIcon1_1.gotoAndPlay("play", 1);
            });
            goldIcon1_1.anchorOffsetX = goldIcon1_1.width / 2 + Rect1.x;
            goldIcon1_1.anchorOffsetY = goldIcon1_1.height / 2 + Rect1.y;
            goldIcon1_1.x = dropX;
            goldIcon1_1.y = dropY;
            parent_1.addChild(goldIcon1_1);
            goldIcon1_1.addEventListener(egret.Event.COMPLETE, function (e) {
                parent_1.removeChild(goldIcon1_1);
            }, this);
        }
    };
    TestView.prototype.touchMove = function (evt) {
        console.log("============touchMove===========");
        var x = evt.stageX;
        var y = evt.stageY;
        if (this._state == 1) {
            var px = this.beginPoint.x;
            var py = this.beginPoint.y;
            var w = Math.abs(px - x);
            var h = Math.abs(py - y);
            this.currKuang.width = w;
            this.currKuang.height = h;
        }
        else if (this._state == 2) {
            var px = this.prevPoint.x;
            var py = this.prevPoint.y;
            var w = x - px;
            var h = y - py;
            this.currKuang.x += w;
            this.currKuang.y += h;
        }
        this.prevPoint.x = x;
        this.prevPoint.y = y;
    };
    TestView.prototype.touchEnd = function (evt) {
        console.log("============touchEnd===========");
        var x = evt.stageX;
        var y = evt.stageY;
        if (this._state == 1) {
            this.kuangList.push(this.currKuang);
        }
        else if (this._state == 3) {
            for (var i = 0; i < this.kuangList.length; i++) {
                var temp = this.kuangList[i];
                var flag = temp.hitTestPoint(x, y);
                if (flag) {
                    this.drawLayer.removeChild(temp);
                    this.kuangList.splice(i, 1);
                    break;
                }
            }
        }
    };
    TestView.prototype.destroy = function () {
    };
    return TestView;
}(burn.view.FullView));
__reflect(TestView.prototype, "TestView");
//# sourceMappingURL=TestView.js.map