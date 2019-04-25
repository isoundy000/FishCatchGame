var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var burn;
(function (burn) {
    var util;
    (function (util) {
        var Map = (function () {
            function Map() {
                this._elements = null;
                this._elements = new Array();
            }
            Map.prototype.put = function (_key, _value) {
                var isExist = this.contains(_key);
                if (isExist) {
                    this.remove(_key);
                }
                this._elements.push({
                    key: _key,
                    value: _value
                });
            };
            Map.prototype.get = function (_key) {
                try {
                    var len = this._elements.length;
                    for (var i = 0; i < len; i++) {
                        if (this._elements[i].key == _key) {
                            return this._elements[i].value;
                        }
                    }
                }
                catch (error) {
                    console.warn(error.name + ":[" + _key + "]不存在");
                    return null;
                }
            };
            Map.prototype.remove = function (_key) {
                try {
                    var len = this._elements.length;
                    for (var i = 0; i < len; i++) {
                        if (this._elements[i].key == _key) {
                            this._elements.splice(i, 1);
                            return true;
                        }
                    }
                }
                catch (error) {
                    console.warn(error.name + ":[" + _key + "]不存在");
                    return false;
                }
                return false;
            };
            Map.prototype.contains = function (_key) {
                try {
                    var len = this._elements.length;
                    for (var i = 0; i < len; i++) {
                        if (this._elements[i].key == _key) {
                            return true;
                        }
                    }
                }
                catch (error) {
                    console.warn(error.name + ":[" + _key + "]不存在");
                    return false;
                }
                return false;
            };
            Map.prototype.getList = function () {
                return this._elements;
            };
            Map.prototype.size = function () {
                return this._elements.length;
            };
            Map.prototype.isEmpty = function () {
                return (this._elements.length < 1);
            };
            Map.prototype.clear = function () {
                this._elements = new Array();
            };
            return Map;
        }());
        util.Map = Map;
        __reflect(Map.prototype, "burn.util.Map");
    })(util = burn.util || (burn.util = {}));
})(burn || (burn = {}));
//# sourceMappingURL=Map.js.map