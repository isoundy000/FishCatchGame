var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/** 显示鱼的对象层 */
var ObjectLayer = (function (_super) {
    __extends(ObjectLayer, _super);
    function ObjectLayer() {
        var _this = _super.call(this) || this;
        _this._layer_1 = new egret.DisplayObjectContainer();
        _this._layer_2 = new egret.DisplayObjectContainer();
        _this._layer_3 = new egret.DisplayObjectContainer();
        _this.addChildAt(_this._layer_1, 1);
        _this.addChildAt(_this._layer_2, 2);
        _this.addChildAt(_this._layer_3, 3);
        return _this;
    }
    /** 添加 */
    ObjectLayer.prototype.addFishAt = function (fish, at) {
        switch (at) {
            case 1:
                this._layer_1.addChildAt(fish, at);
                break;
            case 2:
                this._layer_2.addChildAt(fish, at);
                break;
            case 3:
                this._layer_3.addChildAt(fish, at);
                break;
        }
    };
    return ObjectLayer;
}(egret.DisplayObjectContainer));
__reflect(ObjectLayer.prototype, "ObjectLayer");
//# sourceMappingURL=ObjectLayer.js.map