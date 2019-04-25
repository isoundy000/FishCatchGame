var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var util;
    (function (util) {
        var IconUtil = (function () {
            function IconUtil() {
            }
            /**
             * 获取头像
             * url:头像地址
             * type：头像类型1-圆头像 2-方头像
             */
            IconUtil.getHeadIcon = function (url, callback, type) {
                if (type === void 0) { type = 1; }
                //设置玩家头像
                var imgLoadHandler = function (evt) {
                    var avatar = new egret.DisplayObjectContainer();
                    var avatarContainer = new egret.DisplayObjectContainer();
                    var bg = new egret.Bitmap(RES.getRes("main_iamge_avaBgR_png"));
                    bg.x = bg.y = -6;
                    avatar.addChild(bg);
                    var loader = evt.currentTarget;
                    var bmd = loader.data;
                    var bmp = new egret.Bitmap(bmd);
                    bmp.width = bmp.height = 94;
                    avatarContainer.addChild(bmp);
                    avatar.addChild(avatarContainer);
                    callback(avatar);
                };
                var imgLoadErrorHandler = function (evt) {
                    RES.getResAsync("TouXiang_2_png", function () {
                        var avatar = new egret.DisplayObjectContainer();
                        var avatarContainer = new egret.DisplayObjectContainer();
                        var bg = new egret.Bitmap(RES.getRes("main_iamge_avaBgR_png"));
                        bg.x = bg.y = -6;
                        avatar.addChild(bg);
                        var bmp = new egret.Bitmap(RES.getRes("TouXiang_2_png"));
                        bmp.width = bmp.height = 94;
                        avatarContainer.addChild(bmp);
                        avatar.addChild(avatarContainer);
                        callback(avatar);
                    }, self);
                };
                var userModel = burn.Director.getModelByKey(UserModel);
                var imgLoader = new egret.ImageLoader;
                imgLoader.crossOrigin = "anonymous";
                imgLoader.once(egret.Event.COMPLETE, imgLoadHandler, self);
                imgLoader.once(egret.IOErrorEvent.IO_ERROR, imgLoadErrorHandler, self);
                imgLoader.load(url);
            };
            /** 动态获取图标 */
            IconUtil.getIconByIdAsync = function (type, id, fun) {
                if (type == IconType.PROP) {
                    var txtr_1 = "";
                    if (id == 10001) {
                        txtr_1 = "common_coins_png";
                    }
                    else if (id == 10002) {
                        txtr_1 = "common_diamond_png";
                    }
                    else if (id == 30002) {
                        txtr_1 = "common_fish_ticket_png";
                    }
                    else if (id == 10012) {
                        txtr_1 = "common_point_ticket_png";
                    }
                    else if (id == 10013) {
                        txtr_1 = "common_active_icon_png";
                    }
                    else {
                        var itemVo = game.table.T_Item_Table.getVoByKey(id);
                        if (itemVo == null) {
                            console.warn("道具[" + id + "]不存在！");
                            fun(null);
                            return;
                        }
                        txtr_1 = "goodsicon_" + id + "_png";
                    }
                    if (!RES.hasRes(txtr_1)) {
                        console.warn("贴图资源不存在：" + txtr_1);
                        fun(null);
                        return;
                    }
                    RES.getResAsync(txtr_1, function () {
                        var txture = RES.getRes(txtr_1);
                        var img = new egret.Bitmap(txture);
                        fun(img);
                    }, this);
                }
                else if (type == IconType.BIG_PROP) {
                    var txtr_2 = "";
                    if (id == 10001) {
                        txtr_2 = "common_coins_png";
                    }
                    else if (id == 10002) {
                        txtr_2 = "common_diamond_png";
                    }
                    else if (id == 30002) {
                        txtr_2 = "common_fish_ticket_png";
                    }
                    else {
                        var itemVo = game.table.T_Item_Table.getVoByKey(id);
                        if (itemVo == null) {
                            console.warn("道具[" + id + "]不存在！");
                            fun(null);
                            return;
                        }
                        txtr_2 = "goodsicon_big_" + id + "_png";
                    }
                    if (!RES.hasRes(txtr_2)) {
                        console.warn("贴图资源不存在：" + txtr_2);
                        fun(null);
                        return;
                    }
                    RES.getResAsync(txtr_2, function () {
                        var txture = RES.getRes(txtr_2);
                        var img = new egret.Bitmap(txture);
                        fun(img);
                    }, this);
                }
                else if (type == IconType.EXCHANGE) {
                }
                else if (type == IconType.CHARGE) {
                    var txtr_3 = "";
                    txtr_3 = "charge_" + id + "_png";
                    if (!RES.hasRes(txtr_3)) {
                        console.warn("贴图资源不存在：" + txtr_3);
                        fun(null);
                        return;
                    }
                    RES.getResAsync(txtr_3, function () {
                        var txture = RES.getRes(txtr_3);
                        var img = new egret.Bitmap(txture);
                        fun(img);
                    }, this);
                }
                else if (type == IconType.PAO) {
                    var txtr_4 = "";
                    var itemPaoVo = game.table.T_Item_Table.getVoByKey(id);
                    if (itemPaoVo == null) {
                        console.warn("道具[" + id + "]不存在！");
                        fun(null);
                        return;
                    }
                    txtr_4 = "gunsicon_" + id + "_png";
                    if (!RES.hasRes(txtr_4)) {
                        console.warn("贴图资源不存在：" + txtr_4);
                        fun(null);
                        return;
                    }
                    RES.getResAsync(txtr_4, function () {
                        var txture = RES.getRes(txtr_4);
                        var img = new egret.Bitmap(txture);
                        fun(img);
                    }, this);
                }
                else if (type == IconType.PAOBG) {
                    var txtr_5 = "";
                    var itemPaoBgVo = game.table.T_Item_Table.getVoByKey(id);
                    if (itemPaoBgVo == null) {
                        console.warn("道具[" + id + "]不存在！");
                        fun(null);
                        return;
                    }
                    txtr_5 = "gunBgsicon_" + id + "_png";
                    if (!RES.hasRes(txtr_5)) {
                        console.warn("贴图资源不存在：" + txtr_5);
                        fun(null);
                        return;
                    }
                    RES.getResAsync(txtr_5, function () {
                        var txture = RES.getRes(txtr_5);
                        var img = new egret.Bitmap(txture);
                        fun(img);
                    }, this);
                }
                else if (type == IconType.PAOSHOW) {
                    var txtr_6 = "";
                    var itemPaoBgVo = game.table.T_Item_Table.getVoByKey(id);
                    if (itemPaoBgVo == null) {
                        console.warn("道具[" + id + "]不存在！");
                        fun(null);
                        return;
                    }
                    txtr_6 = "gunShowsicon_" + id + "_png";
                    if (!RES.hasRes(txtr_6)) {
                        console.warn("贴图资源不存在：" + txtr_6);
                        fun(null);
                        return;
                    }
                    RES.getResAsync(txtr_6, function () {
                        var txture = RES.getRes(txtr_6);
                        var img = new egret.Bitmap(txture);
                        fun(img);
                    }, this);
                }
                else if (type == IconType.PAO_CLONE) {
                    var txtr_7 = "";
                    var itemPaoVo = game.table.T_Item_Table.getVoByKey(id);
                    if (itemPaoVo == null) {
                        console.warn("道具[" + id + "]不存在！");
                        fun(null);
                        return;
                    }
                    txtr_7 = "gunsiconClone_" + id + "_png";
                    if (!RES.hasRes(txtr_7)) {
                        console.warn("贴图资源不存在：" + txtr_7);
                        fun(null);
                        return;
                    }
                    RES.getResAsync(txtr_7, function () {
                        var txture = RES.getRes(txtr_7);
                        var img = new egret.Bitmap(txture);
                        fun(img);
                    }, this);
                }
                else if (type == IconType.CAIPAN) {
                    var txtr_8 = "";
                    txtr_8 = "caipan_" + id + "_png";
                    if (!RES.hasRes(txtr_8)) {
                        console.warn("贴图资源不存在：" + txtr_8);
                        fun(null);
                        return;
                    }
                    RES.getResAsync(txtr_8, function () {
                        var txture = RES.getRes(txtr_8);
                        var img = new egret.Bitmap(txture);
                        fun(img);
                    }, this);
                }
                else if (type == IconType.VIP_SHOW) {
                    var txtr_9 = "";
                    txtr_9 = "vip_" + id + "_png";
                    if (!RES.hasRes(txtr_9)) {
                        console.warn("贴图资源不存在：" + txtr_9);
                        fun(null);
                        return;
                    }
                    RES.getResAsync(txtr_9, function () {
                        var txture = RES.getRes(txtr_9);
                        var img = new egret.Bitmap(txture);
                        fun(img);
                    }, this);
                }
            };
            return IconUtil;
        }());
        util.IconUtil = IconUtil;
        __reflect(IconUtil.prototype, "game.util.IconUtil");
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
//# sourceMappingURL=IconUtil.js.map