var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var burn;
(function (burn) {
    var _Notification_ = (function () {
        function _Notification_() {
            throw (new burn.error.SimpleError("The burn.Notification can't call constructor!"));
        }
        _Notification_.init = function () {
            //this._callbackList = new burn.util.Map();
        };
        _Notification_.subscrib = function (type, callback, target) {
            if (target === void 0) { target = null; }
            var isExist = this._callbackList.contains(type);
            if (isExist) {
                var arr = this._callbackList.get(type);
                arr.push([callback, target]);
            }
            else {
                var arrobj = new Array();
                arrobj.push([callback, target]);
                this._callbackList.put(type, arrobj);
            }
        };
        _Notification_.unsubscrib = function (type, callback) {
            var isExist = this._callbackList.contains(type);
            if (isExist) {
                var arr = this._callbackList.get(type);
                var len = arr.length;
                for (var i = 0; i < len; i++) {
                    if (arr[i][0] == callback) {
                        arr.splice(i, 1);
                        return true;
                    }
                }
                return false;
            }
            return false;
        };
        _Notification_.removebByType = function (type) {
            var isExist = this._callbackList.contains(type);
            if (isExist) {
                return this._callbackList.remove(type);
            }
            return false;
        };
        _Notification_.removeAll = function () {
            this._callbackList.clear();
        };
        _Notification_.send = function (type, obj) {
            if (obj === void 0) { obj = null; }
            var isExist = this._callbackList.contains(type);
            if (isExist) {
                var arr = this._callbackList.get(type);
                var len = arr.length;
                for (var i = 0; i < len; i++) {
                    var temp = arr[i];
                    if (temp) {
                        temp[0](obj, temp[1]);
                        break;
                    }
                }
            }
        };
        return _Notification_;
    }());
    _Notification_._callbackList = new burn.util.Map();
    burn._Notification_ = _Notification_;
    __reflect(_Notification_.prototype, "burn._Notification_");
})(burn || (burn = {}));
//# sourceMappingURL=_Notification_.js.map