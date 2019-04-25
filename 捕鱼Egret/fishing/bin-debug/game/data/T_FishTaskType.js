var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var table;
    (function (table) {
        var T_FishTaskType = (function () {
            function T_FishTaskType() {
                //任务类型
                this.type = 0;
                //是否有序
                this.isIndex = 0;
                //显示几个
                this.showNum = 0;
                //任务累计的房间类型
                this.roomType = "";
            }
            return T_FishTaskType;
        }());
        table.T_FishTaskType = T_FishTaskType;
        __reflect(T_FishTaskType.prototype, "game.table.T_FishTaskType");
        var T_FishTaskType_Table = (function () {
            function T_FishTaskType_Table() {
            }
            T_FishTaskType_Table.getVoByKey = function (key) {
                var len = _T_FishTaskType_.length;
                var data = table.SerchUtil.binary_search(_T_FishTaskType_, "type", 0, len, key);
                return data;
            };
            T_FishTaskType_Table.getAllVo = function () {
                return _T_FishTaskType_;
            };
            return T_FishTaskType_Table;
        }());
        table.T_FishTaskType_Table = T_FishTaskType_Table;
        __reflect(T_FishTaskType_Table.prototype, "game.table.T_FishTaskType_Table");
        var _T_FishTaskType_ = [
            { type: 1, isIndex: 1, showNum: 0, roomType: "1,2,3,4", },
            { type: 2, isIndex: 0, showNum: 0, roomType: "1,2,3,4,5,6,7", },
            { type: 3, isIndex: 0, showNum: 0, roomType: "1,2,3,4,5,6,7", },
            { type: 4, isIndex: 0, showNum: 0, roomType: "1,2,3,4,5,6,7", },
            { type: 5, isIndex: 1, showNum: 3, roomType: "5", },
            { type: 6, isIndex: 1, showNum: 3, roomType: "6", },
            { type: 7, isIndex: 1, showNum: 3, roomType: "7", },
            { type: 8, isIndex: 0, showNum: 0, roomType: "1,2,3,4,5,6,7", },
            { type: 9, isIndex: 0, showNum: 0, roomType: "1,2,3,4,5,6,7", },
            { type: 10, isIndex: 1, showNum: 3, roomType: "1,2,3", },
        ];
    })(table = game.table || (game.table = {}));
})(game || (game = {}));
//# sourceMappingURL=T_FishTaskType.js.map