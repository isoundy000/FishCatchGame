var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var table;
    (function (table) {
        var T_Gun_skin = (function () {
            function T_Gun_skin() {
                //皮肤id
                this.id = 0;
                //普通子弹ID
                this.bulletId = 0;
                //狂暴子弹ID
                this.rageBulletId = 0;
                //贴图
                this.resUrl = "";
                //分身贴图
                this.resCloneUrl = "";
                //底座
                this.zuoUrl = "";
                //转盘
                this.caipanUrl = "";
                //锚点
                this.anchor = "";
                //枪口位置
                this.gunPos = "";
                //枪口特效
                this.effGun = "";
                //狂暴特效
                this.effRage = "";
                //星级
                this.star = 0;
                //渔网
                this.net = 0;
            }
            return T_Gun_skin;
        }());
        table.T_Gun_skin = T_Gun_skin;
        __reflect(T_Gun_skin.prototype, "game.table.T_Gun_skin");
        var T_Gun_skin_Table = (function () {
            function T_Gun_skin_Table() {
            }
            T_Gun_skin_Table.getVoByKey = function (key) {
                var len = _T_Gun_skin_.length;
                var data = table.SerchUtil.binary_search(_T_Gun_skin_, "id", 0, len, key);
                return data;
            };
            T_Gun_skin_Table.getAllVo = function () {
                return _T_Gun_skin_;
            };
            return T_Gun_skin_Table;
        }());
        table.T_Gun_skin_Table = T_Gun_skin_Table;
        __reflect(T_Gun_skin_Table.prototype, "game.table.T_Gun_skin_Table");
        var _T_Gun_skin_ = [
            { id: 20000, bulletId: 1, rageBulletId: 2, resUrl: "gun_png", resCloneUrl: "rageGun_png", zuoUrl: "gunBgsicon_20000_png", caipanUrl: "caipan_20000_png", anchor: "0_15", gunPos: "76_90", effGun: "1", effRage: "2", star: 3, net: 1, },
            { id: 20001, bulletId: 1021, rageBulletId: 1022, resUrl: "gun_png", resCloneUrl: "rageGun_png", zuoUrl: "gunBgsicon_20001_png", caipanUrl: "caipan_20000_png", anchor: "0_15", gunPos: "76_90", effGun: "1", effRage: "2", star: 1, net: 4, },
            { id: 20002, bulletId: 1011, rageBulletId: 1012, resUrl: "gun_png", resCloneUrl: "rageGun_png", zuoUrl: "gunBgsicon_20002_png", caipanUrl: "caipan_20000_png", anchor: "0_15", gunPos: "76_90", effGun: "1", effRage: "2", star: 2, net: 3, },
            { id: 20003, bulletId: 1001, rageBulletId: 1002, resUrl: "gun_png", resCloneUrl: "rageGun_png", zuoUrl: "gunBgsicon_20003_png", caipanUrl: "caipan_20000_png", anchor: "0_15", gunPos: "76_90", effGun: "1", effRage: "2", star: 1, net: 1, },
            { id: 20004, bulletId: 1051, rageBulletId: 1052, resUrl: "gun_png", resCloneUrl: "rageGun_png", zuoUrl: "gunBgsicon_20004_png", caipanUrl: "caipan_20004_png", anchor: "0_15", gunPos: "76_90", effGun: "1", effRage: "2", star: 4, net: 2, },
            { id: 20005, bulletId: 1041, rageBulletId: 1042, resUrl: "gun_png", resCloneUrl: "rageGun_png", zuoUrl: "gunBgsicon_20005_png", caipanUrl: "caipan_20005_png", anchor: "0_15", gunPos: "76_90", effGun: "1", effRage: "2", star: 5, net: 6, },
            { id: 20006, bulletId: 1031, rageBulletId: 1032, resUrl: "gun_png", resCloneUrl: "rageGun_png", zuoUrl: "gunBgsicon_20006_png", caipanUrl: "caipan_20006_png", anchor: "0_15", gunPos: "76_90", effGun: "1", effRage: "2", star: 5, net: 5, },
            { id: 20051, bulletId: 1, rageBulletId: 2, resUrl: "gun_png", resCloneUrl: "rageGun_png", zuoUrl: "gunBgsicon_20000_png", caipanUrl: "caipan_20000_png", anchor: "0_15", gunPos: "76_90", effGun: "1", effRage: "2", star: 1, net: 3, },
            { id: 20052, bulletId: 1, rageBulletId: 2, resUrl: "gun_png", resCloneUrl: "rageGun_png", zuoUrl: "gunBgsicon_20000_png", caipanUrl: "caipan_20000_png", anchor: "0_15", gunPos: "76_90", effGun: "1", effRage: "2", star: 2, net: 3, },
            { id: 20053, bulletId: 1, rageBulletId: 2, resUrl: "gun_png", resCloneUrl: "rageGun_png", zuoUrl: "gunBgsicon_20000_png", caipanUrl: "caipan_20000_png", anchor: "0_15", gunPos: "76_90", effGun: "1", effRage: "2", star: 2, net: 3, },
            { id: 20054, bulletId: 1, rageBulletId: 2, resUrl: "gun_png", resCloneUrl: "rageGun_png", zuoUrl: "gunBgsicon_20000_png", caipanUrl: "caipan_20000_png", anchor: "0_15", gunPos: "76_90", effGun: "1", effRage: "2", star: 3, net: 3, },
            { id: 20055, bulletId: 1, rageBulletId: 2, resUrl: "gun_png", resCloneUrl: "rageGun_png", zuoUrl: "gunBgsicon_20000_png", caipanUrl: "caipan_20000_png", anchor: "0_15", gunPos: "76_90", effGun: "1", effRage: "2", star: 3, net: 3, },
            { id: 20056, bulletId: 1, rageBulletId: 2, resUrl: "gun_png", resCloneUrl: "rageGun_png", zuoUrl: "gunBgsicon_20000_png", caipanUrl: "caipan_20000_png", anchor: "0_15", gunPos: "76_90", effGun: "1", effRage: "2", star: 4, net: 3, },
            { id: 20057, bulletId: 1, rageBulletId: 2, resUrl: "gun_png", resCloneUrl: "rageGun_png", zuoUrl: "gunBgsicon_20000_png", caipanUrl: "caipan_20000_png", anchor: "0_15", gunPos: "76_90", effGun: "1", effRage: "2", star: 4, net: 3, },
            { id: 20058, bulletId: 1, rageBulletId: 2, resUrl: "gun_png", resCloneUrl: "rageGun_png", zuoUrl: "gunBgsicon_20000_png", caipanUrl: "caipan_20000_png", anchor: "0_15", gunPos: "76_90", effGun: "1", effRage: "2", star: 5, net: 3, },
        ];
    })(table = game.table || (game.table = {}));
})(game || (game = {}));
//# sourceMappingURL=T_Gun_skin.js.map