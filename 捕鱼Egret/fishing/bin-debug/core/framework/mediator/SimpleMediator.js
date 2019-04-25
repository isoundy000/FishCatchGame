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
    var mediator;
    (function (mediator) {
        var SimpleMediator = (function (_super) {
            __extends(SimpleMediator, _super);
            function SimpleMediator(view, name) {
                if (name === void 0) { name = ""; }
                return _super.call(this, view, name) || this;
            }
            SimpleMediator.prototype.update = function () {
            };
            return SimpleMediator;
        }(mediator.MediatorBase));
        mediator.SimpleMediator = SimpleMediator;
        __reflect(SimpleMediator.prototype, "burn.mediator.SimpleMediator");
    })(mediator = burn.mediator || (burn.mediator = {}));
})(burn || (burn = {}));
//# sourceMappingURL=SimpleMediator.js.map