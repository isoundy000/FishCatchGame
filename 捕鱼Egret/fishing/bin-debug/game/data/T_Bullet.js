var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var table;
    (function (table) {
        var T_Bullet = (function () {
            function T_Bullet() {
                //子弹id
                this.id = 0;
                //鱼类型
                this.type = 0;
                //图片
                this.resUrl = "";
            }
            return T_Bullet;
        }());
        table.T_Bullet = T_Bullet;
        __reflect(T_Bullet.prototype, "game.table.T_Bullet");
        var T_Bullet_Table = (function () {
            function T_Bullet_Table() {
            }
            T_Bullet_Table.getVoByKey = function (key) {
                var len = _T_Bullet_.length;
                var data = table.SerchUtil.binary_search(_T_Bullet_, "id", 0, len, key);
                return data;
            };
            T_Bullet_Table.getAllVo = function () {
                return _T_Bullet_;
            };
            return T_Bullet_Table;
        }());
        table.T_Bullet_Table = T_Bullet_Table;
        __reflect(T_Bullet_Table.prototype, "game.table.T_Bullet_Table");
        var _T_Bullet_ = [
            { id: 1, type: 1, resUrl: "bullet_png", },
            { id: 2, type: 2, resUrl: "bullet_rage_png", },
            { id: 1001, type: 1001, resUrl: "JiXie_ZiDan_png", },
            { id: 1002, type: 1002, resUrl: "JiXie_KuangBao_png", },
            { id: 1011, type: 1011, resUrl: "Lv_ZiDan_png", },
            { id: 1012, type: 1012, resUrl: "Lv_KuangBao_png", },
            { id: 1021, type: 1021, resUrl: "Nu_ZiDan_png", },
            { id: 1022, type: 1022, resUrl: "Nu_KuangBao_png", },
            { id: 1031, type: 1031, resUrl: "Xin_ZiDan_png", },
            { id: 1032, type: 1032, resUrl: "Xin_KuangBao_png", },
            { id: 1041, type: 1041, resUrl: "ZhangYu_ZiDan_png", },
            { id: 1042, type: 1042, resUrl: "ZhangYu_KuangBao_png", },
            { id: 1051, type: 1051, resUrl: "BoLi_ZiDan_png", },
            { id: 1052, type: 1052, resUrl: "BoLi_KuangBao_png", },
        ];
    })(table = game.table || (game.table = {}));
})(game || (game = {}));
//# sourceMappingURL=T_Bullet.js.map