var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 待冷却框的按钮组件
 */
var ProgresButton = (function (_super) {
    __extends(ProgresButton, _super);
    function ProgresButton(clazz) {
        var _this = _super.call(this) || this;
        //按钮的点击屏蔽
        _this._bClick = true;
        _this.time = 0;
        _this.wProgress = 130;
        _this.hProgress = 130;
        _this.skinName = clazz;
        //冰冻
        _this.btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
        _this.btn.addEventListener(egret.TouchEvent.TOUCH_END, _this.click, _this);
        _this.btn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, _this.click, _this);
        _this.icon.touchEnabled = false;
        _this.gemGroup.visible = false;
        _this.gemGroup.touchEnabled = false;
        _this.numGroup.touchEnabled = false;
        _this.cover.touchEnabled = false;
        _this.progress.touchEnabled = false;
        _this.progress.width = 110;
        _this.progress.height = 110;
        _this.wProgress = _this.root.width;
        _this.hProgress = _this.root.height;
        _this._shape = new egret.Shape();
        _this._shape.x = _this.root.width >> 1;
        _this._shape.y = _this.root.height >> 1;
        _this._shape.rotation = -90;
        _this.progress.mask = _this._shape;
        _this.addChild(_this._shape);
        _this._shape.touchEnabled = false;
        _this.numFont = new egret.BitmapText();
        _this.numFont.font = RES.getRes("iconNum_1_fnt");
        _this.numFont.text = "0";
        _this.numFont.scaleX = 1.04;
        _this.numFont.scaleY = 1.03;
        _this.numFont.anchorOffsetX = _this.numFont.width;
        _this.numFont.anchorOffsetY = _this.numFont.height / 2;
        _this.numGroup.addChild(_this.numFont);
        _this.gemCostFont = new egret.BitmapText();
        _this.gemCostFont.font = RES.getRes("iconNum_1_fnt");
        _this.gemCostFont.text = "0";
        _this.gemCostFont.scaleX = 1.04;
        _this.gemCostFont.scaleY = 1.03;
        _this.gemCostFont.anchorOffsetX = _this.gemCostFont.width;
        _this.gemCostFont.anchorOffsetY = _this.gemCostFont.height / 2;
        _this.gemCostGroup.addChild(_this.gemCostFont);
        _this.changeGraphics(0);
        _this.bNoGem = false;
        _this.noChange.cacheAsBitmap = true;
        return _this;
    }
    //设置冷却时间
    ProgresButton.prototype.setTimeTotal = function (nTime) {
        nTime += 1;
        this._nTimeTotal = 360 / (nTime * 1000.0); //360 / 20000.0;
    };
    //设置按钮回调函数
    ProgresButton.prototype.setButtonClickFun = function (fun) {
        this._funCall = fun;
    };
    //设置该道具所需钻石数量
    ProgresButton.prototype.setGemCost = function (str) {
        //this.gemCost.text = str;
        if (str == undefined) {
            this.gemCostGroup.visible = false;
            this.gemCostFont.text != "-1";
            this.bNoGem = true;
            return;
        }
        this.gemCostFont.text = str;
        this.gemCostFont.anchorOffsetX = this.gemCostFont.width;
        this.gemCostFont.anchorOffsetY = this.gemCostFont.height / 2;
    };
    ProgresButton.prototype.setTypeSide = function () {
        this.root.width = 77;
        this.root.height = 77;
        this.btn.width = 77;
        this.btn.height = 77;
        this.progress.width = 77;
        this.progress.height = 77;
        this.icon.width = 77;
        this.icon.height = 77;
        this._shape.x = 110 / 2;
        this._shape.y = 110 / 2;
        this.wProgress = 90;
        this.hProgress = 90;
        this.cover.visible = false;
        this.gemGroup.right = 0;
        this.gemGroup.bottom = 0;
        this.gemGroup.width = 75;
        this.numGroup.right = 3;
        this.numGroup.bottom = 15;
        this.numFont.scaleX = 0.76;
        this.numFont.scaleY = 0.72;
        this.gemCostFont.scaleX = 0.76;
        this.gemCostFont.scaleY = 0.72;
    };
    ProgresButton.prototype.setTypeWar = function () {
        this.setTypeSide();
        this.root.width = 77;
        this.root.height = 77;
        this.btn.width = 77;
        this.btn.height = 77;
        this.progress.width = 60;
        this.progress.height = 60;
        this.icon.width = 77;
        this.icon.height = 77;
        this._shape.x = 110 / 2;
        this._shape.y = 110 / 2;
        this.wProgress = 90;
        this.hProgress = 90;
        this.gemGroup.right = 5;
        this.gemGroup.bottom = 5;
        this.gemGroup.width = 75;
        this.numGroup.right = 8;
        this.numGroup.bottom = 20;
    };
    ProgresButton.prototype.setIcon = function (str) {
        this.icon.source = str;
    };
    ProgresButton.prototype.setNum = function (num) {
        if (this.bNoGem) {
            this.numFont.text = num;
            this.numFont.anchorOffsetX = this.numFont.width;
            this.numFont.anchorOffsetY = this.numFont.height / 2;
            this.gemGroup.visible = false;
            this.numGroup.visible = true;
            return;
        }
        if (num == "0" && this.gemCostFont.text != "-1") {
            this.gemGroup.visible = true;
            this.numGroup.visible = false;
        }
        else {
            this.gemGroup.visible = false;
            this.numGroup.visible = true;
        }
        this.numFont.text = num;
        this.numFont.anchorOffsetX = this.numFont.width;
        this.numFont.anchorOffsetY = this.numFont.height / 2;
    };
    ProgresButton.prototype.onTouchBegin = function (e) {
        var colorFlilter = new egret.ColorMatrixFilter(game.util.FilterEnmu.GRAY);
        this.icon.filters = [colorFlilter];
    };
    ProgresButton.prototype.click = function (evt) {
        this.icon.filters = null;
        if (!this._bClick) {
            return;
        }
        this._funCall(evt);
    };
    ProgresButton.prototype.startBtnTick = function () {
        this.changeGraphics(360);
        this._bClick = false;
        var angle = 0;
        this.time = egret.getTimer();
        var fun = function (timeStamp) {
            if (this._bClick) {
                return;
            }
            var now = timeStamp;
            var time = this.time;
            var pass = now - time; //平均时间间隔=1000ms/60=16.67ms
            this.time = now;
            angle += (this._nTimeTotal * pass);
            this.changeGraphics(angle);
            if (Math.floor(angle) > 340) {
                this.changeGraphics(0);
                egret.stopTick(fun, this);
                this._bClick = true;
            }
            return true;
        };
        egret.startTick(fun, this);
        // this.changeGraphics(360);
        // let pass = (this._nTimeTotal * 1000) / 360;
        // let timer = new egret.Timer(pass, 360);
        // let self = this;
        // let angle = 0;
        // timer.addEventListener(egret.TimerEvent.TIMER, function():void {
        //     angle += 10;
        //     self.changeGraphics(angle);
        //     if (angle >= 350) {
        //         this.changeGraphics(0);
        //     }
        //     if (angle >= 359) {
        //         this._bClick = true;
        //     }
        // }, this);
        // timer.start();
    };
    ProgresButton.prototype.changeGraphics = function (angle) {
        var w = this.wProgress;
        var h = this.hProgress;
        var r = Math.max(w, h) / 2 * 1.5;
        this._shape.graphics.clear();
        this._shape.graphics.beginFill(0x00ffff, 1);
        this._shape.graphics.lineTo(r, 0);
        this._shape.graphics.drawArc(0, 0, r, 0, angle * Math.PI / 180, true);
        this._shape.graphics.lineTo(0, 0);
        this._shape.graphics.endFill();
    };
    ProgresButton.prototype.stopBtnTick = function () {
        this.changeGraphics(0);
        this._bClick = true;
    };
    ProgresButton.prototype.isClick = function () {
        return this._bClick;
    };
    ProgresButton.prototype.destory = function () {
        this.btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.click, this);
        this.btn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.click, this);
    };
    return ProgresButton;
}(eui.Component));
__reflect(ProgresButton.prototype, "ProgresButton");
//# sourceMappingURL=progresButton.js.map