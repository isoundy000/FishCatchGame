var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CONFIG = (function () {
    function CONFIG() {
    }
    return CONFIG;
}());
/** 是否处于Debug模式 */
CONFIG.DEBUG = true;
/** 是否是页游版本 */
CONFIG.IS_WEB = false;
/** 语言版本 */
CONFIG.LANGUAGE = LanguageType.Simp_Chinese; // Simp_Chinese TW_Chinese English
/** account */
CONFIG.ACCOUNT = "";
/** 登录服务器地址(*****可以增加新的行，但注释格式不要修改，打包脚本使用******) */
//"http://192.168.1.221:8080/LoginServer/";   //嘉林
//"http://192.168.1.9:8080/LoginServer/";   //明雷
//"http://192.168.1.243:8066/LoginServer/";   //内网
//"http://120.77.83.214:8080/LoginServer/";   //版号
//"http://120.92.138.194:8066/LoginServer/";     //外网测试服
//"http://s1.fishing.combunet.com:9066/LoginServer/";    //自由游戏
//"http://3d311a-0.bj.1251991358.clb.myqcloud.com/LoginServer/";    //玩吧测试服
//"http://s1.fishing.combunet.com:7066/LoginServer/";       //燃烧游戏
//"http://gamecenter.combunet.com/LoginServer4yiwantang/yiwantang/";    //亿玩堂
CONFIG.LOGIN_ADDR = "http://3d311a-0.bj.1251991358.clb.myqcloud.com/LoginServer/";
/** 服务器帐号状态 */
CONFIG.SERVER_USER_STATE = 200;
/** 缓存服务器ip和端口 */
CONFIG.USER_NAME = "游客";
CONFIG.USER_ID = 0;
CONFIG.SERVER_IP = "";
CONFIG.SERVER_PORT = 0;
CONFIG.USER_SECRET = "";
CONFIG.OPEN_ID = "";
CONFIG.OPEN_KEY = "";
CONFIG.APP_ID = "";
/** 平台帐号id */
CONFIG.PLATFORM_ID = window["FISHING_CONFIG"]["platformId"];
CONFIG.SUB_PLATFORM_ID = window["FISHING_CONFIG"]["subplatform"];
/** 渠道id */
CONFIG.CHANNEL_ID = "";
/** 渠道拓展类型 */
CONFIG.CHANNEL_EXT_TYPE = "";
/** 资源所在目录前缀 */
CONFIG.RES_PATH_PREFIX = "";
/** 基准适配比例 */
CONFIG.contentWidth = 1280;
CONFIG.contentHeight = 720;
/** 适配偏移量 */
CONFIG.adaptX = 0;
CONFIG.adaptY = 0;
/** 鱼的默认动作帧频 */
CONFIG.defaultFishFrameRate = 9;
/** 是否打开音效 */
CONFIG.isOpenMusic = false;
/** 是否是运行在移动端 */
CONFIG.isInMobile = egret.Capabilities.isMobile;
/** 热云appID */
CONFIG.logAppID = "21a1681fe559a559726e7f051cd3bff5";
/** 是否开启本地引导功能 */
CONFIG.openGuide = true;
/** 子弹速度 */
CONFIG.BULLET_SPEED = 1.2;
/////////////////////////////////以下配置为调试时使用///////////////////////////////
/** 鱼动画播放帧频 */
CONFIG.TEST_fishFrameRate = -1;
/**刷新鱼的ID */
CONFIG.TEST_FISH_ID = 2; //23;
/**测试路径的ID */
CONFIG.TEST_PATH_ID = -1; //100301;//110201;
/** 第一个特效名称 */
CONFIG.EFFECT_1 = "ef_jinbiDi";
CONFIG.EFFECT_1_SCALE = 1.5;
CONFIG.EFFECT_2 = "ef_jinbiS";
CONFIG.EFFECT_2_SCALE = 1.5;
CONFIG.EFFECT_DELAY = 200;
__reflect(CONFIG.prototype, "CONFIG");
//# sourceMappingURL=config.js.map