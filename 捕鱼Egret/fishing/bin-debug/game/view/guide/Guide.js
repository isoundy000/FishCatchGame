var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var two;
(function (two) {
    var Guide = (function (_super) {
        __extends(Guide, _super);
        function Guide() {
            return _super.call(this) || this;
        }
        /**
         * dp 确保已经定位并且没有加入到显示列表中。
         */
        Guide.prototype.init = function (dp, w, h) {
            var container = new egret.DisplayObjectContainer();
            var bg = new egret.Shape();
            bg.graphics.beginFill(0x000000, 0.5);
            bg.graphics.drawRect(0, 0, w, h);
            bg.graphics.endFill();
            container.addChild(bg);
            container.addChild(dp);
            dp.blendMode = egret.BlendMode.ERASE;
            var renderTexture = new egret.RenderTexture();
            renderTexture.drawToTexture(container);
            var bitmap = new egret.Bitmap(renderTexture);
            this.addChild(bitmap);
        };
        return Guide;
    }(egret.DisplayObjectContainer));
    two.Guide = Guide;
    __reflect(Guide.prototype, "two.Guide");
})(two || (two = {}));
//# sourceMappingURL=Guide.js.map