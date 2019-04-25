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
var NewProgresButton = (function (_super) {
    __extends(NewProgresButton, _super);
    function NewProgresButton(clazz, str) {
        var _this = _super.call(this) || this;
        _this.time = 0;
        //按钮的点击屏蔽
        _this._bClick = true;
        //angle
        _this.angle = 0;
        //是否切换过状态
        _this._bSwrap = false;
        _this.skinName = clazz;
        _this._str = str;
        // right rightCover left leftCover
        //CD 时间过一半之后
        // left leftCover right rightCover
        _this.root.addEventListener(egret.TouchEvent.TOUCH_END, _this.click, _this);
        _this.scaleX = 1;
        _this.scaleY = 1;
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
        _this.bNoGem = false;
        _this.initOld();
        return _this;
    }
    NewProgresButton.prototype.setTypeSide = function () {
        this.scaleX = 0.7;
        this.scaleY = 0.7;
        this.coverLeftR.scaleX = 0.85;
        this.coverLeftR.scaleY = 0.85;
        this.coverRightR.scaleX = 0.85;
        this.coverRightR.scaleY = 0.85;
        this.cover.visible = false;
        this.gemGroup.right = 0;
        this.gemGroup.bottom = 0;
        this.gemGroup.width = 75;
        this.rect.width = 90;
        this.rect.x -= 15;
        this.rect.bottom = 8;
        this.gemIcon.y -= 5;
        this.gemCostGroup.y -= 5;
        this.numGroup.right = 3;
        this.numGroup.bottom = 15;
    };
    NewProgresButton.prototype.setTypeWar = function () {
        this.scaleX = 0.75;
        this.scaleY = 0.75;
        this.coverLeftR.scaleX = 0.85;
        this.coverLeftR.scaleY = 0.85;
        this.coverRightR.scaleX = 0.85;
        this.coverRightR.scaleY = 0.85;
        this.cover.visible = false;
        this.gemGroup.right = 5;
        this.gemGroup.bottom = 5;
        this.gemGroup.width = 90;
        this.rect.width = 90;
        this.rect.height = 30;
        this.rect.x -= 6;
        this.rect.bottom = 4;
        this.gemIcon.y -= 5;
        this.gemIcon.x -= 8;
        this.gemCostGroup.y -= 5;
        this.numGroup.right = 8;
        this.numGroup.bottom = 20;
    };
    NewProgresButton.prototype.setNum = function (num) {
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
    //设置该道具所需钻石数量
    NewProgresButton.prototype.setGemCost = function (str) {
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
    NewProgresButton.prototype.initOld = function () {
        if (this._imageRight) {
            this.icon.removeChild(this._imageRight);
        }
        if (this._imageLeft) {
            this.icon.removeChild(this._imageLeft);
        }
        if (this.icon.getChildByName("_Leftshape")) {
            this.icon.removeChild(this._Leftshape);
        }
        if (this.icon.getChildByName("_Rightshape")) {
            this.icon.removeChild(this._Rightshape);
        }
        this._imageRight = new egret.Bitmap(RES.getRes(this._str + "_2_png"));
        this._imageRight.anchorOffsetX = 0;
        this._imageRight.anchorOffsetY = this._imageRight.height >> 1;
        this._imageLeft = new egret.Bitmap(RES.getRes(this._str + "_1_png"));
        this._imageLeft.anchorOffsetX = this._imageLeft.width;
        this._imageLeft.anchorOffsetY = this._imageLeft.height >> 1;
        this.icon.addChildAt(this._imageRight, 0);
        this.icon.addChildAt(this._imageLeft, 2);
    };
    NewProgresButton.prototype.setIcon = function (str) {
    };
    NewProgresButton.prototype.initObj = function () {
        this._bClick = true;
        this._bSwrap = false;
        if (this._imageRight) {
            this.icon.removeChild(this._imageRight);
        }
        if (this._imageLeft) {
            this.icon.removeChild(this._imageLeft);
        }
        if (this.icon.getChildByName("_Leftshape")) {
            this.icon.removeChild(this._Leftshape);
        }
        if (this.icon.getChildByName("_Rightshape")) {
            this.icon.removeChild(this._Rightshape);
        }
        this._imageRight = new egret.Bitmap(RES.getRes(this._str + "_2_png"));
        this._imageRight.anchorOffsetX = 0;
        this._imageRight.anchorOffsetY = this._imageRight.height >> 1;
        this._imageLeft = new egret.Bitmap(RES.getRes(this._str + "_1_png"));
        this._imageLeft.anchorOffsetX = this._imageLeft.width;
        this._imageLeft.anchorOffsetY = this._imageLeft.height >> 1;
        this._imageLeft.x = 0;
        this._Leftshape = new eui.Rect();
        this._Leftshape.alpha = 0.7;
        this._Leftshape.width = 139;
        this._Leftshape.height = 139;
        this._Leftshape.name = "_Leftshape";
        this._Leftshape.anchorOffsetX = this._Leftshape.width;
        this._Leftshape.anchorOffsetY = this._Leftshape.height >> 1;
        this._Leftshape.mask = this.coverLeftR;
        this._Leftshape.x = 0;
        this._Rightshape = new eui.Rect();
        this._Rightshape.alpha = 0.7;
        this._Rightshape.width = 139;
        this._Rightshape.height = 139;
        this._Rightshape.name = "_Rightshape";
        this._Rightshape.anchorOffsetX = 0;
        this._Rightshape.anchorOffsetY = this._Rightshape.height >> 1;
        this._Rightshape.mask = this.coverRightR;
        this.icon.addChild(this._imageRight);
        this.icon.addChild(this._Rightshape);
        this.icon.addChild(this._imageLeft);
        this.icon.addChild(this._Leftshape);
    };
    //设置冷却时间
    NewProgresButton.prototype.setTimeTotal = function (nTime) {
        nTime += 1;
        this._nTimeTotal = 360 / (nTime * 1000.0); //360 / 20000.0;
    };
    //设置按钮回调函数
    NewProgresButton.prototype.setButtonClickFun = function (fun) {
        this._funCall = fun;
    };
    NewProgresButton.prototype.click = function (evt) {
        this.icon.filters = null;
        if (!this._bClick) {
            return;
        }
        this._funCall(evt);
    };
    NewProgresButton.prototype.startBtnTick = function () {
        this.initObj();
        this._bClick = false;
        this.angle = 0;
        this.time = egret.getTimer();
        var self = this;
        egret.startTick(this.fun, this);
    };
    NewProgresButton.prototype.fun = function (timeStamp) {
        if (this._bClick) {
            return;
        }
        var now = timeStamp;
        var time = this.time;
        var pass = now - time; //平均时间间隔=1000ms/60=16.67ms
        this.time = now;
        this.angle += (this._nTimeTotal * pass);
        this.changeGraphics(this.angle);
        if (Math.floor(this.angle) >= 180 && !this._bSwrap) {
            this.changeWrap();
        }
        if (Math.floor(this.angle) >= 360) {
            this.changeGraphics(-1);
            egret.stopTick(this.fun, this);
            this._bClick = true;
        }
        return true;
    };
    NewProgresButton.prototype.changeGraphics = function (angle) {
        if (angle == 0) {
            return;
        }
        if (angle == -1) {
            this.initOld();
            return;
        }
        // return;
        if (this._bSwrap) {
            this._Leftshape.rotation = (angle - 180);
        }
        else {
            this._Rightshape.rotation = angle;
        }
    };
    NewProgresButton.prototype.changeWrap = function () {
        this._bSwrap = true;
        this.icon.swapChildrenAt(0, 2);
        this.icon.swapChildrenAt(1, 3);
        this._Rightshape.visible = false;
        this._imageLeft.x = 0;
        this._Leftshape.x = 0;
    };
    NewProgresButton.prototype.stopBtnTick = function () {
        this.changeGraphics(-1);
        this._bClick = true;
    };
    NewProgresButton.prototype.isClick = function () {
        return this._bClick;
    };
    NewProgresButton.prototype.destory = function () {
        this.root.removeEventListener(egret.TouchEvent.TOUCH_END, this.click, this);
        if (this._bClick) {
            egret.stopTick(this.fun, this);
        }
    };
    return NewProgresButton;
}(eui.Component));
__reflect(NewProgresButton.prototype, "NewProgresButton");
//# sourceMappingURL=NewProgressButton.js.map