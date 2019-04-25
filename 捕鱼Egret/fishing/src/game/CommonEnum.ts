enum CommonEnum {
	/** 登录失败 */
	LOGIN_FAIL = 0,
	/** 重连成功 */	
	RECONNECT = 1, 
	/** 服务器异常 */
	SERVER_EXCEPTION = 2, 
	/** 服务器维护 */
	SERVER_CLOSED = 3,
	/** 请重新登录游戏*/
	RELOGIN = 4,
	/** 被踢下线 */
	REPLACED = 5,
	/** 帐号已被封停 */
	ACCOUNT_BAN = 7,
	/** 延时登录 */
	DALAY_LOGIN = 8

}

//服务器状态
enum ServerState {
	SUCC = 200,		//登录成功
	BAN = -113,		//帐号被封停
	CLOSED = -101	//停服维护中
}

/** 货币类型枚举 */
enum CurrencyEnum {
	COINS = 1,		//金币
	MONEY = 2		//金钱
}

/** 关卡内道具类型枚举 */
enum PropEnum {
	/** 金币 */
	GOLD = 10001,
	/** 钻石 */
	GEM = 10002,
	/** 鱼券 */
	FISH_TICKIT = 30002,
	/** 锁定道具 */	
	LOCK = 40001,
	/** 冰冻道具 */	
	FROZEN = 40002,
	/** 葫芦道具 */	
	CALABASH = 40003,
	/** 狂暴道具 */	
	RAGE = 40004,
	/** 分身道具 */
	CLONE = 40005,
	/** 全民赛狂暴道具 */
	FREE_RAGE = 40006,
	/** 全民赛分身道具 */
	FREE_CLONE = 40007,
	/** 黄金弹头 */
	GOLD_WARHEAD = 50001,
	/** 白银弹头 */
	SILVER_WARHEAD = 50002,
	/** 青铜弹头 */
	BRONZE_WARHEAD = 50003,
	/** 核弹头 */
	NUCLEAR_WARHEAD = 50004,
	/** 每日活跃度 */
	ACT_DAY = 10010,
	/** 每周活跃度 */
	ACT_WEED = 10011,
	/** 点券 */
	TICKET = 10012
}

/** 图标类型枚举 */
enum IconType {
	PROP = 1,		//道具
	SKILL = 2,		//技能
	EXCHANGE = 3,    //兑换道具
	BIG_PROP = 4,     //大个道具
	CHARGE  = 5,      //充值的ICON
	PAO     = 6,      //炮的相关内容
	PAOBG     = 7,       //炮座的相关内容
	PAOSHOW     = 8,       //炮展示的相关内容
	PAO_CLONE   = 9,      //分身炮的相关内容
	CAIPAN     = 10,       //转盘
	VIP_SHOW   = 11          //VIP图标
}

//抽奖返回：0杀死奖金鱼不够，1成功，2积分不足，3前后应领档位不同
enum GetLotteryState {
	FISH_NOT_ENOUGH = 0,
	GET_SUCC = 1,
	SCORE_NOT_ENOUGH = 2,
	C_S_INCONFORMITY = 3
}

//请求进入房间的枚举
enum RequesetRoomState {
	SelectRoom = 1,		//手动选座
	AutoLowRoom = 2,	//初级场
	AutoHighRoom = 3,	//高级场
	NewbieRoom = 4,		//新手场
	DjsRoom = 5,        //大奖赛
	QmsRoom = 6,        //全民赛
	KssRoom = 7,        //快速赛
	KssRoomChu = 8,        //快速赛初级
	KssRoomZhong = 9,        //快速赛中级
	KssRoomJingying = 10,        //快速赛高级
	Phoenix        = 99,        //凤凰
	QuickGame = 0		//快速开始
}

//背包道具类型枚举
enum BagItemType {
	BASE = 1,		//基础属性（不显示在背包中）
	BATTERY = 2, 	//炮台
	HAMMER = 3,		//锤子
	PROP_CARD = 4,	//道具卡
	FISH_TICKET = 5,//鱼券
	WARHEAN = 6,	//弹头
	TEAM_PROP = 7,	//组队副本材料
	FORGE_PROP = 8,	//锻造材料
	BARBETTE = 9	//炮座
}

//解锁炮倍返回枚举
enum UpdateOrForgeType{
	//0类型不对，1成功(成功才有下面的optional)，2材料不够，3倍数已达上限
	TYPE_NULL = 0,             //类型不对
	TYPE_SUC  = 1,             //成功
	TYPE_NOENOUGH = 2,         //材料不够
	TYPE_MAX = 3,               //倍数已达上限
	TYPE_FAIL = 4               //倍数已达上限
}

//解锁炮倍枚举
enum GunUpdateType {
	//1解锁，2无精华锻造，3有精华锻造
	UNLOCK = 1,                //1解锁
	NO_ESSENCE_FORGE_TYPE = 2, //2无精华锻造
	USE_ESSENCE_FORGE_TYPE = 3 //3有精华锻造
}

//救济金状态
enum BankruptStauts {
	BANKRUPT = 0,	//破产
	GET_SUCC = 1, 		//领取成功
	NOT_TO_TIME = 2,	//时间未到
	STATE_RESUME = 3,	//又有钱了，破产状态解除
	GET_LIMIT = 5 		//已达领取上限
}
//common查询枚举
enum CommonRequest {
	EMAIL = 1,              //邮件
	RECODE = 2,             //兑换记录
	COMMON_REQUEST_WECHAT_SHARE_INFO = 5,  //微信分享
	SHARE = 10				//分享
}

//赠送好友的枚举
//0;赠送方物品不足；1:赠送成功；2:接收方背包满了；3:赠送方赠送次数满了；4:接收方接收次数满了
enum SendItemState {
	ITEM_NO_ENOUGH = 0,
	SUC            = 1,
	USER_BAG_MAX   = 2,
	SEND_TIMES_MAX = 3,
	USER_TIMES_MAX = 4,
	CHARGE_NO_ENOUGH = 5
}

/** 
1,转圈 + 变大
2,加快速度 + 变大
3,加快速度
 */
enum FishDeadType {
	RotationAndScale = 1,
	SpeedAndScale = 2,
	Speed = 3,
	DeadAtOnce = 4,
	N_1 = 5, //新的鱼死亡  方鱼
	N_2 = 6,  //新的鱼死亡  长鱼
	Alpha = 7  //新的鱼死亡  直接淡出
}

/** 使用道具失败原因 */
enum UseItemFail {
	USE_ITEM_NO_ITEM_NO_MONEY = 0,//原因是既没物品又没钱为0
	USE_ITEM_NO_VIP_LEVEL = 2,//狂暴、分身使用VIP等级不够错误代码为2
	USE_ITEM_LOCK_CONFLICT = 3,//用狂暴、分身的时候不能用锁定
	USE_ITEM_BEFORE_TIDE = 4,//鱼潮来临前使用	
	USE_ITEM_SCORE_TOO_SMALL_USE_TOKEN = 5,//炮倍太小不能使用代币
	USE_ITEM_ALIVE_FISHES_TOO_MUCH = 6 //活鱼太多不能扔
}

/** 引导类型 */
//触发类型
enum GuideTrriger {
	First = 1,                       //第一次进入
	GunSend = 2,                 //点击屏幕开枪
	FishDead = 3,                   //鱼死亡
	GunSendTimes = 4,                  //固定开多少枪
	Open = 5,                     //直接触发
	TaskFinish = 6                   //任务完成触发
}
//引导表现功能
enum GuideShow {
	Texture = 1,               //图片
	Txt     = 2,               //描述文字
	Finger  = 3,               //小手
	Finger_Txt = 4,             //小手&描述文字
	NONE    = 5                //没有表现
}

//开启引导触发功能
enum GuideOpen {
	GUIDE_OPEN_UNLOCK = 0,               //弹出解锁炮倍
	GUIDE_OPEN_ADDFISH = 1,                //添加一条鱼
	GUIDE_OPEN_FISHDEAD = 2,               //鱼死亡
	GUIDE_OPEN_OPENLOTTERY = 3,             //弹出抽奖板子
	GUIDE_OPEN_TRRIGERTASK = 4,              //触发新手任务
	GUIDE_OPEN_EXCHANGE = 5,				//打开兑换界面
	GUIDE_OPEN_POP_RMB_GAIN = 7           //弹出人民币获得
}
//结束引导触发功能
enum GuideClose {
	GUIDE_CLOSE_UNLOCK = 10,            //触发解锁炮倍功能
	GUIDE_CLOSE_TRRIGER_NEXT = 11,      //引导下一条
	GUIDE_CLOSE_LOCK = 12,              //锁定
	GUIDE_CLOSE_OPENLOTTERY = 13,       //触发打开抽奖界面 
	GUIDE_CLOSE_LOTTERY = 14,            //触发抽奖功能
	GUIDE_CLOSE_INTOROOM = 15,           //进入房间
	GUIDE_CLOSE_CLOSE_RMB_GAIN = 16,     //关闭人民币获得
	GUIDE_CLOSE_CLICK_EXCHAGE = 17,     //引导兑换。
	GUIDE_CLOSE_EXCHNANGE_END = 18      //兑换完成。弹出完成UI
}

//任务类型
enum TaskType {
	/**1.新手任务*/
	TASK_TYPE_NEWBIE = 1,
	/**2.每日任务*/
	TASK_TYPE_EVERYDAY = 2,
	/**3.每周任务*/
	TASK_TYPE_EVERY_WEEK =3,
	/**4.终身任务*/
	TASK_TYPE_LIFETIME = 4, 
	/**5.大奖赛*/
	TASK_TYPE_GRAND_PRIX = 5,
	/**6.全民赛*/
	TASK_TYPE_THE_PEOPLE = 6,
	/**7.快速赛*/
	TASK_TYPE_THE_FAST = 7,
	/**8.每日活跃任务 */
	TASK_TYPE_AVT_DAY = 8,
	/**9.每周活跃任务 */
	TASK_TYPE_AVT_WEEK = 9,
	/**10.海盗悬赏任务 */
	TASK_TYPE_PRICE = 10
}

enum TaskState {
	/**任务状态2.不能领取*/
	TAST_STATE_CANT_RECEIVE = 2,
	/**任务状态1.能领取*/
	TAST_STATE_CAN_RECEIVE = 1,
	/**任务状态0.已领取*/
	TAST_STATE_RECEIVED = 0
}

/**
 * 充值界面货币类型
 */
enum ChargeType {
	Gold = 1,
	Gem = 2,
	Ticket = 3
}

enum GunState {
	UnGain = 0,          //未获取
	UnAct = 1,           //失效的
	Act   = 2,            //可用的
	Equip = 3            //装备的
}

enum Exchange_type {
	Ticket = 1, //话费
	Items  = 3, //实物
	Goods  = 0  //虚拟物品
}

//0时间没到不可领取，1时间到了可领取，2已领取，3第三天开始已过期
enum Ciri_State {
	Time_Up    =   0, //时间没到不可领取
	Un_Gain    =   1,
	Gained     =   2,
	Expired    =   3  //过期
}

enum Sign_State {
	ACTIVE_MONTH_SIGN_STATE_NO_TOKEN_MAKED_UP = -7,//没有补签货币 95
	ACTIVE_MONTH_SIGN_STATE_TYPE_ERROR = -6,//类型不对            96
	ACTIVE_MONTH_SIGN_STATE_MAKED_UP_ERROR = -5,//不需要补签      97
	ACTIVE_MONTH_SIGN_STATE_MAKED_UP_TIMES_ERROR = -4,//补签次数不足 98
	ACTIVE_MONTH_SIGN_STATE_MAKED_UP_BEFORE_SIGN_ERROR = -3,//补签前请签到   109
	ACTIVE_MONTH_SIGN_STATE_MAKED_UP = -2,//今日已经补签         110
	ACTIVE_MONTH_SIGN_STATE_SIGNED = -1,//今日已经签到           111
	ACTIVE_MONTH_SIGN_STATE_FRESH = 0 //跨月刷新                 112
}

enum Pop_State {
	VIP   =   0,
	FIRST_CHARGE = 1,
	MONTH_CARD   = 2,
	CIRI         = 3,   //次日礼包
	CIRCLE       = 4    //转盘
}

enum Exchange_Color {
	White = 1,
	Green = 2,
	Blue  = 3,
	Purple = 4,  //紫色
	Origen = 5,  //橙色
	Red    = 6,  //红色
}

enum Phoenix_State {
	//当前状态0要来了 1在池塘中 2消失倒计时 3死亡
	Coming    = 0,
	Ing       = 1,
	ToDisappear = 2,
	Dead      = 3,
	ShieldDead = 4,      //护盾碎了,时间和状态不重置
	Paolule = 5       //凤凰跑路了
}

//特属鱼的ID
enum Especial_Fish {
	Phoenix  = 99,    //凤凰
	Shield   = 98,     //护盾
	Guide_Fish = 97    //引导鱼
}

//活动枚举
enum Active_Type {
	LIMIT_TIME_ACTIVE_TYPE_FISH_SEND = 1,//捕鱼送礼
	LIMIT_TIME_ACTIVE_TYPE_CHARGE_SEND = 2,//充值送礼
	LIMIT_TIME_ACTIVE_TYPE_VIP_SEND = 3,//VIP送礼
	LIMIT_TIME_ACTIVE_TYPE_SECRET_SHOP = 4//神秘商店
}

//活动状态
enum Active_State {
	LIMIT_TIME_ACTIVE_STATE_INIT = 0,// 未达条件
	LIMIT_TIME_ACTIVE_STATE_CAN_RECEIVE = 1,// 可以领取
	LIMIT_TIME_ACTIVE_STATE_RECEIVED = 2,// 已经领取
	LIMIT_TIME_ACTIVE_STATE_OVERDUE = 3,// 已经过期
	LIMIT_TIME_ACTIVE_STATE_ACCEPTED = 4// 接受了活动任务
}

//报名状态枚举
enum SignUp_State
{
	ARENA_SIGN_UP_TIMES_MORE = -3,
    ARENA_SIGN_UP_TOCKEN_LESS = -2,
    ARENA_SIGN_UP_SIGNED = 0,
    AERNA_SIGN_UP_SUCCESS = 1
}

//规则枚举
enum Rule_State
{
	DjsRoom = 0,
	KssRoom = 1,
	WorldBoss = 2,
	QmsRoom = 3
}

//语言类型配置
enum LanguageType {
	Simp_Chinese = 1,	//简体中文
	TW_Chinese = 2,		//繁体中文
	English = 3			//英语
}

//分享类型
enum ShareType {
	Share_Money = 1,   	//现金红包
	Share_Djs   = 2,    //大奖赛
	Forge_Succ  = 3,    //锻造成功
	Circle_GoldWar = 4, //抽奖黄金弹头
	Share_GuangYU = 5,   //关羽
	NORMAL = 6,
}

//广播类型
enum BroadType {
	NewsWorld = 3,		//小喇叭消息	世界广播
	NewsActive = 1,		//活动广播
	NewsFishing = 2,	//房间捕鱼消息
}

// 分享成功类型
enum ShareSuccType{
	EXCHANGE_SUCC = 1,	//1兑换
	FORGING_SUCC = 2,	//2锻造
	DANTOU_SUCC = 3,	//3获得物品
	DAJIANGSAI_SUCC = 3,//4大奖赛
}
