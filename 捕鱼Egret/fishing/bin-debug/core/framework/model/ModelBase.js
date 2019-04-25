var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var burn;
(function (burn) {
    var model;
    (function (model) {
        var ModelBase = (function () {
            function ModelBase() {
            }
            ModelBase.prototype.init = function () {
            };
            ModelBase.prototype.send = function (type, obj) {
                burn._Notification_.send(type, obj);
            };
            ModelBase.prototype.clear = function () {
            };
            ModelBase.prototype.destroy = function () {
                throw (new burn.error.SimpleError("Subclass must be override destory!"));
            };
            return ModelBase;
        }());
        model.ModelBase = ModelBase;
        __reflect(ModelBase.prototype, "burn.model.ModelBase", ["burn.base.IDestory"]);
    })(model = burn.model || (burn.model = {}));
})(burn || (burn = {}));
//# sourceMappingURL=ModelBase.js.map