var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var table;
    (function (table) {
        var T_Active = (function () {
            function T_Active() {
                //活动ID
                this.id = 0;
                //活动类别
                this.type = 0;
                //特权描述
                this.descVip = "";
                //名称Url
                this.nameUrl = "";
            }
            return T_Active;
        }());
        table.T_Active = T_Active;
        __reflect(T_Active.prototype, "game.table.T_Active");
        var T_Active_Table = (function () {
            function T_Active_Table() {
            }
            T_Active_Table.getVoByKey = function (key) {
                var len = _T_Active_.length;
                var data = table.SerchUtil.binary_search(_T_Active_, "id", 0, len, key);
                return data;
            };
            T_Active_Table.getAllVo = function () {
                return _T_Active_;
            };
            return T_Active_Table;
        }());
        table.T_Active_Table = T_Active_Table;
        __reflect(T_Active_Table.prototype, "game.table.T_Active_Table");
        var _T_Active_ = [
            { id: 1, type: 1, descVip: "xx1", nameUrl: "active_dian", },
            { id: 2, type: 2, descVip: "xx2", nameUrl: "active_song", },
            { id: 3, type: 3, descVip: "xx3", nameUrl: "active_song_li", },
            { id: 4, type: 4, descVip: "xx4", nameUrl: "active_song_ling", },
        ];
    })(table = game.table || (game.table = {}));
})(game || (game = {}));
//# sourceMappingURL=T_Active.js.map