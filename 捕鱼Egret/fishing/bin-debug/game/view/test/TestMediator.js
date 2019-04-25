var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TestMediator = (function (_super) {
    __extends(TestMediator, _super);
    function TestMediator(view) {
        return _super.call(this, view) || this;
    }
    TestMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        this.getView().initView();
    };
    TestMediator.prototype.destroy = function () {
        this.getView().destroy();
    };
    return TestMediator;
}(burn.mediator.SimpleMediator));
__reflect(TestMediator.prototype, "TestMediator");
//# sourceMappingURL=TestMediator.js.map