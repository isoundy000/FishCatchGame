class CONFIG 
{
    /** 是否处于Debug模式 */
	static DEBUG = true;
    /** 是否是页游版本 */
    static IS_WEB = false;
    /** 语言版本 */
    static LANGUAGE = LanguageType.Simp_Chinese;  // Simp_Chinese TW_Chinese English
    /** account */
    static ACCOUNT = "";
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
	static LOGIN_ADDR = "http://3d311a-0.bj.1251991358.clb.myqcloud.com/LoginServer/";
    /** 服务器帐号状态 */
    static SERVER_USER_STATE = 200;
    /** 缓存服务器ip和端口 */
    static USER_NAME = "游客";
    static USER_ID = 0;
    static SERVER_IP = ""; 
    static SERVER_PORT = 0;
    static USER_SECRET = "";
    static OPEN_ID = "";
    static OPEN_KEY = "";
    static APP_ID = "";
    /** 平台帐号id */
    static PLATFORM_ID = window["FISHING_CONFIG"]["platformId"];
    static SUB_PLATFORM_ID = window["FISHING_CONFIG"]["subplatform"];
    /** 渠道id */
    static CHANNEL_ID = "";
    /** 渠道拓展类型 */
    static CHANNEL_EXT_TYPE = "";
    /** 资源所在目录前缀 */
    static RES_PATH_PREFIX = "";
    /** 基准适配比例 */
    static contentWidth = 1280; 
    static contentHeight = 720;
    /** 适配偏移量 */
    static adaptX = 0;
    static adaptY = 0;
    /** 鱼的默认动作帧频 */ 
    static defaultFishFrameRate = 9;
    /** 是否打开音效 */
    static isOpenMusic = false;
    /** 是否是运行在移动端 */
    static isInMobile = egret.Capabilities.isMobile;
    /** 热云appID */
    static logAppID = "21a1681fe559a559726e7f051cd3bff5";

    /** 是否开启本地引导功能 */
    static openGuide = true;
    /** 子弹速度 */
    static BULLET_SPEED = 1.2;
/////////////////////////////////以下配置为调试时使用///////////////////////////////
    /** 鱼动画播放帧频 */
    static TEST_fishFrameRate = -1;
    /**刷新鱼的ID */
    static TEST_FISH_ID = 2;//23;
    /**测试路径的ID */
    static TEST_PATH_ID = -1;//100301;//110201;

    /** 第一个特效名称 */
    static EFFECT_1 = "ef_jinbiDi";
    static EFFECT_1_SCALE = 1.5;

    static EFFECT_2 = "ef_jinbiS";
    static EFFECT_2_SCALE = 1.5;
    static EFFECT_DELAY = 200;

}
