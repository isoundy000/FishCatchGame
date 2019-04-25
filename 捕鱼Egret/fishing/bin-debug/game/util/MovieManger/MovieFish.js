var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 捕鱼的动画类，继承egret.MovieClip,
 * 添加事件类型和回调
 */
var MovieFish = (function (_super) {
    __extends(MovieFish, _super);
    function MovieFish(movieClipData, type, callFun) {
        if (type === void 0) { type = egret.Event.COMPLETE; }
        if (callFun === void 0) { callFun = null; }
        var _this = _super.call(this, movieClipData) || this;
        _this._type = type;
        _this._callFun = callFun;
        return _this;
    }
    MovieFish.prototype.initEvent = function () {
        this.addEventListener(this._type, this.complete, this);
    };
    MovieFish.prototype.complete = function (e) {
        this.removeEventListener(this._type, this.complete, this);
        if (this && this._callFun) {
            this._callFun();
        }
        //清空UI
        this.parent && this.parent.removeChild(this);
        this._callFun = null;
        this._type = null;
    };
    return MovieFish;
}(egret.MovieClip));
__reflect(MovieFish.prototype, "MovieFish");
//# sourceMappingURL=MovieFish.js.map