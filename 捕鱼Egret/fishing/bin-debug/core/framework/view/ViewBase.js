var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var burn;
(function (burn) {
    var view;
    (function (view) {
        var ViewBase = (function (_super) {
            __extends(ViewBase, _super);
            function ViewBase() {
                return _super.call(this) || this;
            }
            ViewBase.prototype.show = function () {
            };
            ViewBase.prototype.setLayout = function (layout) {
                var width = this.stage.width;
                var height = this.stage.height;
                if (layout == burn.ViewEnum.CENTER) {
                    this.x = width / 2;
                    this.y = height / 2;
                }
            };
            ViewBase.prototype.send = function (type, obj) {
                if (obj === void 0) { obj = null; }
                burn._Notification_.send(type, obj);
            };
            /**
             * 销毁函数
             */
            ViewBase.prototype.destroy = function () {
                throw (new burn.error.SimpleError("Subclass must be override destory!"));
            };
            return ViewBase;
        }(egret.DisplayObjectContainer));
        view.ViewBase = ViewBase;
        __reflect(ViewBase.prototype, "burn.view.ViewBase", ["burn.base.IDestory"]);
    })(view = burn.view || (burn.view = {}));
})(burn || (burn = {}));
//# sourceMappingURL=ViewBase.js.map