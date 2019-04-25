var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var util;
    (function (util) {
        var DragonBonesUtil = (function (_super) {
            __extends(DragonBonesUtil, _super);
            function DragonBonesUtil(id, type) {
                var _this = _super.call(this) || this;
                //flag_dragon_start
                _this.movie = undefined;
                //子弹 骨骼与资源文件名
                _this.dbmvArr = ["bullet_bomb_1_ske_dbmv", "bullet_bomb_2_ske_dbmv", "bullet_bomb_3_ske_dbmv", "bullet_bomb_4_ske_dbmv", "bullet_bomb_5_ske_dbmv", "bullet_bomb_6_ske_dbmv"];
                _this.pngArr = ["bullet_bomb_1_tex_png", "bullet_bomb_2_tex_png", "bullet_bomb_3_tex_png", "bullet_bomb_4_tex_png", "bullet_bomb_5_tex_png", "bullet_bomb_6_tex_png"];
                //主页Item 骨骼与资源文件名
                _this.itemDbmvArr = ["XinShouChang_DongHua_ske_dbmv", "DiBeiChang_DongHua_ske_dbmv", "GaoBeiChang_DongHua_ske_dbmv", "ShouDongXuanZuo_DongHua_ske_dbmv", "DaJiangSai_DongHua_ske_dbmv"];
                _this.itemPngArr = ["XinShouChang_DongHua_tex_png", "DiBeiChang_DongHua_tex_png", "GaoBeiChang_DongHua_tex_png", "ShouDongXuanZuo_DongHua_tex_png", "DaJiangSai_DongHua_tex_png"];
                //flag_dragon_start
                _this.nId = id;
                var res1 = RES.getRes(_this.dbmvArr[0]);
                var res2 = RES.getRes(_this.pngArr[0]);
                if (!res1 && !res2) {
                    _this.bInPool = false;
                }
                else {
                    _this.bInPool = true;
                }
                if (type == game.util.DragonBonesUtil.bulletMovie) {
                    _this.dbmvObj = _this.dbmvArr[id - 1];
                    _this.pngObj = _this.pngArr[id - 1];
                    _this.scaleX = 0.75;
                    _this.scaleY = 0.75;
                }
                else {
                    _this.dbmvObj = _this.itemDbmvArr[id - 1];
                    _this.pngObj = _this.itemPngArr[id - 1];
                    _this.anchorOffsetX = _this.width / 2;
                    _this.anchorOffsetY = _this.height / 2;
                }
                return _this;
                //flag_dragon_end
            }
            /**
             * 创建一个龙骨动画
             * dragonBones.addMovieGroup 与 dragonBones.buildMovie 执行时需添加唯一动画组名
             * @param callback 创建完成回调
             */
            DragonBonesUtil.prototype.createMovie = function (callback) {
                var _this = this;
                if (callback === void 0) { callback = null; }
                //flag_dragon_start
                var dragonbonesData;
                var texture;
                RES.getResAsync(this.dbmvObj, function (data, key) {
                    dragonbonesData = data;
                    _this.skeLoadComplete = true;
                    _this.createMovieFn(dragonbonesData, texture, callback);
                }, this);
                RES.getResAsync(this.pngObj, function (data, key) {
                    texture = data;
                    _this.picLoadComplete = true;
                    _this.createMovieFn(dragonbonesData, texture, callback);
                }, this);
                //flag_dragon_end
            };
            DragonBonesUtil.prototype.createMovieFn = function (skeData, picData, callback) {
                if (callback === void 0) { callback = null; }
                //flag_dragon_start
                if (this.skeLoadComplete && this.picLoadComplete) {
                    this.skeLoadComplete = false;
                    this.picLoadComplete = false;
                    dragonBones.addMovieGroup(skeData, picData, this.nId + "");
                    this.movie = dragonBones.buildMovie(game.util.DragonBonesUtil.ANIM_OBJ, this.nId + "");
                    this.addChild(this.movie);
                    callback && callback();
                }
                //flag_dragon_end
            };
            /**
             * 播放一个动画 (动作对象及动作名统一指定)
             * @param count 播放次数 0为无限循环 -1为播放默认动画
             * @param callback 播放一次完成回调
             */
            DragonBonesUtil.prototype.playMovie = function (count, callback) {
                if (callback === void 0) { callback = null; }
                //flag_dragon_start
                this.movie.play(game.util.DragonBonesUtil.ANIM_ACTION, count);
                this.movie.addEventListener(egret.Event.COMPLETE, function (e) {
                    callback && callback();
                }, this);
                //flag_dragon_end
            };
            /**
             * 设置movieXY
             */
            DragonBonesUtil.prototype.setMovieXY = function (x, y) {
                //flag_dragon_start
                this.movie.x = x;
                this.movie.y = y;
                //flag_dragon_end
            };
            /**
             * 暂停播放动画
             */
            DragonBonesUtil.prototype.pauseMovie = function () {
                //flag_dragon_start
                this.movie.stop();
                //flag_dragon_end
            };
            /**
             * 停止到second处
             * @param second 进行到second(单位秒)处并停止
             */
            DragonBonesUtil.prototype.gotoAndStopMovie = function (second) {
                if (second === void 0) { second = 2; }
                //flag_dragon_start
                this.movie.gotoAndStop(game.util.DragonBonesUtil.ANIM_ACTION, second);
                //flag_dragon_end
            };
            /**
             * 停止播放动画
             */
            DragonBonesUtil.prototype.stopMovie = function () {
                //flag_dragon_start
                this.movie.stop();
                dragonBones.removeMovieGroup(this.nId + "");
                this.movie.parent && this.movie.parent.removeChild(this.movie);
                //flag_dragon_end
            };
            return DragonBonesUtil;
        }(eui.Group));
        //动做列表 统一为 newAnimation
        DragonBonesUtil.ANIM_ACTION = "newAnimation";
        //动作对象 统一为 Armature
        DragonBonesUtil.ANIM_OBJ = "Armature";
        //动画类型 (渔网/主页item)
        DragonBonesUtil.bulletMovie = "bullet";
        DragonBonesUtil.itemMovie = "item";
        util.DragonBonesUtil = DragonBonesUtil;
        __reflect(DragonBonesUtil.prototype, "game.util.DragonBonesUtil");
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
//# sourceMappingURL=DragonBonesUtil.js.map