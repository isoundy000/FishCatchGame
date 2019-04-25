var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var table;
    (function (table) {
        var T_Guide = (function () {
            function T_Guide() {
                //引导id
                this.id = 0;
                //引导名称
                this.name = "";
                //触发类型
                this.trrigertype = 0;
                //表现类型
                this.showtype = 0;
                //开始类型
                this.opentype = 0;
                //结束类型
                this.closetype = 0;
                //引导内容
                this.contain = 0;
                //引导描述
                this.desc = 0;
                //引导参数
                this.param = "";
                //显示位置
                this.showPos = "";
                //引导奖励
                this.gain = "";
                //显示宽高
                this.containW_H = "";
            }
            return T_Guide;
        }());
        table.T_Guide = T_Guide;
        __reflect(T_Guide.prototype, "game.table.T_Guide");
        var T_Guide_Table = (function () {
            function T_Guide_Table() {
            }
            T_Guide_Table.getVoByKey = function (key) {
                var len = _T_Guide_.length;
                var data = table.SerchUtil.binary_search(_T_Guide_, "id", 0, len, key);
                return data;
            };
            T_Guide_Table.getAllVo = function () {
                return _T_Guide_;
            };
            return T_Guide_Table;
        }());
        table.T_Guide_Table = T_Guide_Table;
        __reflect(T_Guide_Table.prototype, "game.table.T_Guide_Table");
        var _T_Guide_ = [
            { id: 1, name: "第1步", trrigertype: 2, showtype: 2, opentype: -1, closetype: 11, contain: 2388, desc: 2402, param: "0", showPos: "704_358", gain: "0", containW_H: "0", },
            { id: 2, name: "第2步", trrigertype: 5, showtype: 4, opentype: -1, closetype: -1, contain: 2389, desc: 2403, param: "690_366", showPos: "704_358", gain: "0", containW_H: "160_160", },
            { id: 3, name: "第3步", trrigertype: 3, showtype: 4, opentype: 0, closetype: 10, contain: 2390, desc: 2404, param: "180_475", showPos: "659_398", gain: "0", containW_H: "160_160", },
            { id: 4, name: "第4步", trrigertype: 5, showtype: 2, opentype: -1, closetype: 11, contain: 2391, desc: 2405, param: "null", showPos: "704_358", gain: "0", containW_H: "160_160", },
            { id: 5, name: "第5步", trrigertype: 2, showtype: 3, opentype: 1, closetype: 11, contain: 2392, desc: 2406, param: "695_666", showPos: "637_328", gain: "0", containW_H: "160_160", },
            { id: 6, name: "第6步", trrigertype: 5, showtype: 3, opentype: -1, closetype: 12, contain: 2393, desc: 2407, param: "656_270", showPos: "704_358", gain: "0", containW_H: "520_160", },
            { id: 7, name: "第7步", trrigertype: 4, showtype: 2, opentype: 2, closetype: 11, contain: 2394, desc: 2408, param: "140_395", showPos: "704_358", gain: "0", containW_H: "160_160", },
            { id: 8, name: "第8步", trrigertype: 5, showtype: 3, opentype: 3, closetype: 13, contain: 2395, desc: null, param: "180_360", showPos: "527_328", gain: "0", containW_H: "160_160", },
            { id: 9, name: "第9步", trrigertype: 5, showtype: 3, opentype: -1, closetype: 14, contain: 2396, desc: 2410, param: "994_565", showPos: "900_264", gain: "30002_2", containW_H: "160_160", },
            { id: 10, name: "第10步", trrigertype: 2, showtype: 4, opentype: -1, closetype: 11, contain: 2397, desc: 2411, param: "45_268", showPos: "554_208", gain: "0", containW_H: "160_160", },
            { id: 11, name: "第11步", trrigertype: 5, showtype: 2, opentype: 5, closetype: -1, contain: 2398, desc: 2412, param: "null", showPos: "754_308", gain: "0", containW_H: "160_160", },
            { id: 12, name: "第12步", trrigertype: 2, showtype: 2, opentype: -1, closetype: -1, contain: 2399, desc: 2413, param: "635_380", showPos: "704_358", gain: "0", containW_H: "160_160", },
            { id: 13, name: "第17步", trrigertype: 2, showtype: 2, opentype: -1, closetype: -1, contain: 2400, desc: 2414, param: "null", showPos: "704_358", gain: "0", containW_H: "160_160", },
            { id: 9999, name: "起航礼包", trrigertype: 1, showtype: 1, opentype: -1, closetype: 15, contain: 2401, desc: 2415, param: "0", showPos: "697_328", gain: "30002_20,10001_2000,10002_5,40001_5", containW_H: "0", },
        ];
    })(table = game.table || (game.table = {}));
})(game || (game = {}));
//# sourceMappingURL=T_Guide.js.map