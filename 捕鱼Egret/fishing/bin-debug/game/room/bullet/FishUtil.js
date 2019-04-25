var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FishUtil = (function () {
    function FishUtil() {
    }
    /**获取一个子弹的移动逻辑 */
    FishUtil.GET_BULLET_MOVELOGIC = function (target, destX, destY, type, costTime) {
        var logicMove = new MoveLogicBase();
        var destPos = new egret.Point(destX, destY); //(this.x + this.stage.stageWidth + 10,this.y + this.stage.stageHeight);
        logicMove.create(type, target, 0, destPos, costTime);
        return logicMove;
    };
    /**获取显示区域 */
    FishUtil.GET_FISHING_RECT = function () {
        var stageWidth = egret.MainContext.instance.stage.stageWidth;
        var stageHeight = egret.MainContext.instance.stage.stageHeight;
        return new egret.Rectangle((stageWidth - CONFIG.contentWidth) / 2, (stageHeight - CONFIG.contentHeight) / 2, (stageWidth - CONFIG.contentWidth) / 2 + CONFIG.contentWidth, (stageHeight - CONFIG.contentHeight) / 2 + CONFIG.contentHeight);
    };
    FishUtil.getAngle = function (px, py, mx, my) {
        var x = Math.abs(px - mx);
        var y = Math.abs(py - my);
        var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        var cos = y / z;
        var radina = Math.acos(cos); //用反三角函数求弧度
        var angle = Math.floor(180 / (Math.PI / radina)); //将弧度转换成角度
        if (mx > px && my > py) {
            angle = 180 - angle;
        }
        if (mx == px && my > py) {
            angle = 180;
        }
        if (mx > px && my == py) {
            angle = 90;
        }
        if (mx < px && my > py) {
            angle = 180 + angle;
        }
        if (mx < px && my == py) {
            angle = 270;
        }
        if (mx < px && my < py) {
            angle = 360 - angle;
        }
        return angle;
    };
    //获取背景音乐
    FishUtil.getMusicByRoomType = function (rType) {
        switch (rType) {
            case RequesetRoomState.NewbieRoom:
                return "bgm_scene1_mp3";
            default:
                return "bgm_scene2_mp3";
        }
    };
    return FishUtil;
}());
/**分身个数 */
FishUtil.CLONE_NUM = 3;
/**分身炮口初始角度 */
FishUtil.CLONE_GUN_ROTATION = [0, -45, 45];
/**分身单个炮管的最大子弹数 */
FishUtil.CLONE_GUN_MAXBULLET = 20;
/**鱼积分的最大值 */
FishUtil.FISH_SCORE_MAX = 99999999;
/**闪电链的动画文件索引 */
FishUtil.ELE_FRAME_RESNAME = "eleFrame";
/**鱼被电中的特效 */
FishUtil.FISH_ELE_FRAME_RESNAME = "fishEleFrame";
/**金币的特效 */
FishUtil.GOLD_MOVIE_RESNAME = "fishEleFrame";
/**闪电播放的帧率 */
FishUtil.FISH_ELE_MAXFRAME = 3;
/**是否处于Debug模式 */
FishUtil.FISHING_DEBUG = true;
__reflect(FishUtil.prototype, "FishUtil");
var BULLET_TYPE;
(function (BULLET_TYPE) {
    BULLET_TYPE[BULLET_TYPE["BASE"] = 1] = "BASE";
    BULLET_TYPE[BULLET_TYPE["REBOUND"] = 2] = "REBOUND";
})(BULLET_TYPE || (BULLET_TYPE = {}));
var BULLET_ANI_TYPE;
(function (BULLET_ANI_TYPE) {
    BULLET_ANI_TYPE[BULLET_ANI_TYPE["RUN"] = 1] = "RUN";
    BULLET_ANI_TYPE[BULLET_ANI_TYPE["DEAD"] = 2] = "DEAD";
})(BULLET_ANI_TYPE || (BULLET_ANI_TYPE = {}));
var FISH_ANIMATION_TYPE;
(function (FISH_ANIMATION_TYPE) {
    FISH_ANIMATION_TYPE[FISH_ANIMATION_TYPE["RUN"] = 1] = "RUN";
    FISH_ANIMATION_TYPE[FISH_ANIMATION_TYPE["AROUND"] = 2] = "AROUND";
    FISH_ANIMATION_TYPE[FISH_ANIMATION_TYPE["DEAD"] = 3] = "DEAD";
})(FISH_ANIMATION_TYPE || (FISH_ANIMATION_TYPE = {}));
//# sourceMappingURL=FishUtil.js.map