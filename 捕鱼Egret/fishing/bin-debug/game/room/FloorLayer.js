var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 背景层的上一层，鱼的下一层，用于播放特效
 * @author ituuz
 */
var FloorLayer = (function (_super) {
    __extends(FloorLayer, _super);
    function FloorLayer() {
        var _this = _super.call(this) || this;
        _this.addBubble();
        return _this;
    }
    FloorLayer.prototype.addBubble = function () {
        var _this = this;
        if (game.util.GorgeousManager.getState()) {
            RES.getResAsync("stage_bubble_png", function (vet, key) {
                RES.getResAsync("stage_bubble_json", function (json, key) {
                    _this._mcFactory = new egret.MovieClipDataFactory(json, vet);
                    //定义Timer
                    _this._timer = new egret.Timer(3000, 0);
                    //注册事件侦听器
                    _this._timer.addEventListener(egret.TimerEvent.TIMER, _this.timerFunc, _this);
                    //开始计时
                    _this._timer.start();
                }, _this);
            }, this);
        }
        else {
            this._timer && this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        }
    };
    FloorLayer.prototype.timerFunc = function () {
        var bx = (CONFIG.contentWidth - 400) * Math.random() + 200;
        var by = (CONFIG.contentHeight - 400) * Math.random() + 200;
        var bubble = new MovieFish(this._mcFactory.generateMovieClipData("stageBubble"), egret.Event.COMPLETE);
        bubble.initEvent();
        bubble.gotoAndPlay("play", 1);
        bubble.frameRate = 8;
        bubble.scaleX = bubble.scaleY = 2;
        bubble.x = bx;
        bubble.y = by;
        this.addChild(bubble);
    };
    FloorLayer.prototype.destory = function () {
        this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
    };
    return FloorLayer;
}(egret.DisplayObjectContainer));
__reflect(FloorLayer.prototype, "FloorLayer");
//# sourceMappingURL=FloorLayer.js.map