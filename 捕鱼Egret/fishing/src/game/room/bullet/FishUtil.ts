class FishUtil 
{
    /**分身个数 */
    static CLONE_NUM = 3;
    /**分身炮口初始角度 */
    static CLONE_GUN_ROTATION = [0,-45,45];
    /**分身单个炮管的最大子弹数 */
    static CLONE_GUN_MAXBULLET = 20;
    /**鱼积分的最大值 */
    static FISH_SCORE_MAX = 99999999;
    /**闪电链的动画文件索引 */
    static ELE_FRAME_RESNAME = "eleFrame";
    /**鱼被电中的特效 */
    static FISH_ELE_FRAME_RESNAME = "fishEleFrame";
    /**金币的特效 */
    static GOLD_MOVIE_RESNAME = "fishEleFrame";
    /**闪电播放的帧率 */
    static FISH_ELE_MAXFRAME = 3;
    /**是否处于Debug模式 */
    static FISHING_DEBUG = true;

    /**获取一个子弹的移动逻辑 */
    static GET_BULLET_MOVELOGIC(target:egret.DisplayObjectContainer,destX:number,destY:number,type:number,costTime:number):MoveLogicBase {
        let logicMove = new MoveLogicBase();
        let destPos:egret.Point = new egret.Point(destX, destY);//(this.x + this.stage.stageWidth + 10,this.y + this.stage.stageHeight);
        logicMove.create(type, target, 0, destPos, costTime);
        return logicMove;
    }


    /**获取显示区域 */
    static GET_FISHING_RECT():egret.Rectangle {
        let stageWidth = egret.MainContext.instance.stage.stageWidth;
        let stageHeight = egret.MainContext.instance.stage.stageHeight;
        return new egret.Rectangle((stageWidth - CONFIG.contentWidth)/2, (stageHeight - CONFIG.contentHeight)/2,
            (stageWidth - CONFIG.contentWidth)/2 + CONFIG.contentWidth,(stageHeight - CONFIG.contentHeight)/2 + CONFIG.contentHeight);
    }

    
    public static getAngle(px,py,mx,my):number {//获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
		let x = Math.abs(px-mx);
        let y = Math.abs(py-my);
        let z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        let cos = y/z;
        let radina = Math.acos(cos);//用反三角函数求弧度
        let angle = Math.floor(180/(Math.PI/radina));//将弧度转换成角度

        if (mx > px && my > py) {//鼠标在第四象限
            angle = 180 - angle;
        }
        if (mx == px && my > py) {//鼠标在y轴负方向上
            angle = 180;
        }
        if (mx > px && my == py) {//鼠标在x轴正方向上
            angle = 90;
        }
        if (mx < px && my > py) {//鼠标在第三象限
            angle = 180 + angle;
        }
        if (mx < px && my == py) {//鼠标在x轴负方向
            angle = 270;
        }
        if (mx < px && my < py) {//鼠标在第二象限
            angle = 360 - angle;
        }
        return angle;
    }

    //获取背景音乐
    public static getMusicByRoomType(rType:number):string {
        switch (rType) {
            case RequesetRoomState.NewbieRoom:
                return "bgm_scene1_mp3";
            default:
                return "bgm_scene2_mp3";
        }
    }
}
enum BULLET_TYPE{
    BASE = 1,
    REBOUND = 2
}
enum BULLET_ANI_TYPE{
    RUN = 1,
    DEAD = 2
}
enum FISH_ANIMATION_TYPE{
    RUN = 1,
    AROUND = 2,
    DEAD = 3
}