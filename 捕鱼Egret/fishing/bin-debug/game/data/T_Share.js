var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var table;
    (function (table) {
        var T_Share = (function () {
            function T_Share() {
                //id
                this.id = 0;
                //类型
                this.type = 0;
                //参数
                this.parameter = 0;
                //说明
                this.dec = "";
                //奖励
                this.award = "";
            }
            return T_Share;
        }());
        table.T_Share = T_Share;
        __reflect(T_Share.prototype, "game.table.T_Share");
        var T_Share_Table = (function () {
            function T_Share_Table() {
            }
            T_Share_Table.getVoByKey = function (key) {
                var len = _T_Share_.length;
                var data = table.SerchUtil.binary_search(_T_Share_, "id", 0, len, key);
                return data;
            };
            T_Share_Table.getAllVo = function () {
                return _T_Share_;
            };
            return T_Share_Table;
        }());
        table.T_Share_Table = T_Share_Table;
        __reflect(T_Share_Table.prototype, "game.table.T_Share_Table");
        var _T_Share_ = [
            { id: 101, type: 1, parameter: 30, dec: "2426", award: "10001_5000", },
            { id: 102, type: 1, parameter: 300, dec: "2427", award: "10002_100", },
            { id: 201, type: 2, parameter: 0, dec: "2428", award: "30002_10", },
            { id: 301, type: 3, parameter: 50, dec: "2429", award: "30002_50", },
            { id: 302, type: 3, parameter: 100, dec: "2430", award: "30002_100", },
        ];
    })(table = game.table || (game.table = {}));
})(game || (game = {}));
//# sourceMappingURL=T_Share.js.map