var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var burn;
(function (burn) {
    var mediator;
    (function (mediator) {
        var MediatorBase = (function () {
            function MediatorBase(view, name) {
                if (name === void 0) { name = ""; }
                //当前中介者持有的view
                this._view = null;
                //当前注册过的监听
                this._callback = null;
                this._name = "";
                this._view = view;
                this._name = name;
                this._callback = new Array();
            }
            /**
             * 添加到stage上之后调用
             */
            MediatorBase.prototype.onAdded = function () {
            };
            /**
             * 初始化函数
             */
            MediatorBase.prototype.init = function () {
            };
            /**
             * 重新显示时调研
             */
            MediatorBase.prototype.update = function () {
            };
            //获得当前中介者持有的view
            MediatorBase.prototype.getView = function () {
                return this._view;
            };
            MediatorBase.prototype.subscrib = function (type, callback) {
                burn._Notification_.subscrib(type, callback, this);
                this._callback.push(type);
            };
            MediatorBase.prototype.unsubscrib = function () {
                var len = this._callback.length;
                for (var i = 0; i < len; i++) {
                    burn._Notification_.removebByType(this._callback[i]);
                }
                this._callback = null;
            };
            MediatorBase.prototype.unsubscribByType = function (type) {
                burn._Notification_.removebByType(type);
            };
            MediatorBase.prototype.getModel = function (cls) {
                return burn.Director.getModelByKey(cls);
            };
            MediatorBase.prototype.getName = function () {
                return this._name;
            };
            //销毁接口
            MediatorBase.prototype.destroy = function () {
                throw (new burn.error.SimpleError("Subclass must be override destory!"));
            };
            return MediatorBase;
        }());
        mediator.MediatorBase = MediatorBase;
        __reflect(MediatorBase.prototype, "burn.mediator.MediatorBase", ["burn.base.IDestory"]);
    })(mediator = burn.mediator || (burn.mediator = {}));
})(burn || (burn = {}));
//# sourceMappingURL=MediatorBase.js.map