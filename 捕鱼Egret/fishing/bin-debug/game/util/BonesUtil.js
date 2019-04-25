var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var util;
    (function (util) {
        /**
         * 播放骨骼动画工具类
         */
        var BonesUtil = (function () {
            function BonesUtil() {
            }
            //播放狂暴特效
            BonesUtil.kuangbaoEffct = function (display, view, posX, posY, pos) {
                if (display === void 0) { display = null; }
                var parentView;
                if (display == null) {
                    parentView = egret.MainContext.instance.stage;
                }
                else {
                    parentView = display;
                }
                RES.getResAsync("ef_KuangBao_png", function (data, key) {
                    var armature = new egret.Bitmap(data);
                    armature.anchorOffsetX = armature.width >> 1;
                    armature.anchorOffsetY = armature.height >> 1;
                    burn.tools.TweenTools.rotationFan(armature, 300);
                    //armature.blendMode = egret.BlendMode.ADD;
                    armature.name = "kuangbao" + pos;
                    armature.x = posX;
                    armature.y = posY;
                    parentView.addChild(armature);
                }, this);
                // if (pos > 1) {
                // 	armature.rotation = 180;
                // }
            };
            return BonesUtil;
        }());
        util.BonesUtil = BonesUtil;
        __reflect(BonesUtil.prototype, "game.util.BonesUtil");
    })(util = game.util || (game.util = {}));
})(game || (game = {}));
//# sourceMappingURL=BonesUtil.js.map