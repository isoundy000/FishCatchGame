var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var table;
    (function (table) {
        /**
         * 检表工具,二分查找
         * @author Ojq
         */
        var SerchUtil = (function () {
            function SerchUtil() {
            }
            SerchUtil.binary_search = function (arr, serchKey, low, high, key) {
                if (low > high) {
                    return null;
                }
                var mid = Math.floor((high + low) / 2);
                if (mid >= arr.length) {
                    return null;
                }
                if (arr[mid][serchKey] == key) {
                    return arr[mid];
                }
                else if (arr[mid][serchKey] > key) {
                    high = mid - 1;
                    return SerchUtil.binary_search(arr, serchKey, low, high, key);
                }
                else if (arr[mid][serchKey] < key) {
                    low = mid + 1;
                    return SerchUtil.binary_search(arr, serchKey, low, high, key);
                }
            };
            ;
            return SerchUtil;
        }());
        table.SerchUtil = SerchUtil;
        __reflect(SerchUtil.prototype, "game.table.SerchUtil");
    })(table = game.table || (game.table = {}));
})(game || (game = {}));
//# sourceMappingURL=SerchUtil.js.map