var CommonEnum;
(function (CommonEnum) {
    /** 登录失败 */
    CommonEnum[CommonEnum["LOGIN_FAIL"] = 0] = "LOGIN_FAIL";
    /** 重连成功 */
    CommonEnum[CommonEnum["RECONNECT"] = 1] = "RECONNECT";
    /** 服务器异常 */
    CommonEnum[CommonEnum["SERVER_EXCEPTION"] = 2] = "SERVER_EXCEPTION";
    /** 服务器维护 */
    CommonEnum[CommonEnum["SERVER_CLOSED"] = 3] = "SERVER_CLOSED";
    /** 请重新登录游戏*/
    CommonEnum[CommonEnum["RELOGIN"] = 4] = "RELOGIN";
    /** 被踢下线 */
    CommonEnum[CommonEnum["REPLACED"] = 5] = "REPLACED";
    /** 帐号已被封停 */
    CommonEnum[CommonEnum["ACCOUNT_BAN"] = 7] = "ACCOUNT_BAN";
    /** 延时登录 */
    CommonEnum[CommonEnum["DALAY_LOGIN"] = 8] = "DALAY_LOGIN";
})(CommonEnum || (CommonEnum = {}));
//服务器状态
var ServerState;
(function (ServerState) {
    ServerState[ServerState["SUCC"] = 200] = "SUCC";
    ServerState[ServerState["BAN"] = -113] = "BAN";
    ServerState[ServerState["CLOSED"] = -101] = "CLOSED"; //停服维护中
})(ServerState || (ServerState = {}));
/** 货币类型枚举 */
var CurrencyEnum;
(function (CurrencyEnum) {
    CurrencyEnum[CurrencyEnum["COINS"] = 1] = "COINS";
    CurrencyEnum[CurrencyEnum["MONEY"] = 2] = "MONEY"; //金钱
})(CurrencyEnum || (CurrencyEnum = {}));
/** 关卡内道具类型枚举 */
var PropEnum;
(function (PropEnum) {
    /** 金币 */
    PropEnum[PropEnum["GOLD"] = 10001] = "GOLD";
    /** 钻石 */
    PropEnum[PropEnum["GEM"] = 10002] = "GEM";
    /** 鱼券 */
    PropEnum[PropEnum["FISH_TICKIT"] = 30002] = "FISH_TICKIT";
    /** 锁定道具 */
    PropEnum[PropEnum["LOCK"] = 40001] = "LOCK";
    /** 冰冻道具 */
    PropEnum[PropEnum["FROZEN"] = 40002] = "FROZEN";
    /** 葫芦道具 */
    PropEnum[PropEnum["CALABASH"] = 40003] = "CALABASH";
    /** 狂暴道具 */
    PropEnum[PropEnum["RAGE"] = 40004] = "RAGE";
    /** 分身道具 */
    PropEnum[PropEnum["CLONE"] = 40005] = "CLONE";
    /** 全民赛狂暴道具 */
    PropEnum[PropEnum["FREE_RAGE"] = 40006] = "FREE_RAGE";
    /** 全民赛分身道具 */
    PropEnum[PropEnum["FREE_CLONE"] = 40007] = "FREE_CLONE";
    /** 黄金弹头 */
    PropEnum[PropEnum["GOLD_WARHEAD"] = 50001] = "GOLD_WARHEAD";
    /** 白银弹头 */
    PropEnum[PropEnum["SILVER_WARHEAD"] = 50002] = "SILVER_WARHEAD";
    /** 青铜弹头 */
    PropEnum[PropEnum["BRONZE_WARHEAD"] = 50003] = "BRONZE_WARHEAD";
    /** 核弹头 */
    PropEnum[PropEnum["NUCLEAR_WARHEAD"] = 50004] = "NUCLEAR_WARHEAD";
    /** 每日活跃度 */
    PropEnum[PropEnum["ACT_DAY"] = 10010] = "ACT_DAY";
    /** 每周活跃度 */
    PropEnum[PropEnum["ACT_WEED"] = 10011] = "ACT_WEED";
    /** 点券 */
    PropEnum[PropEnum["TICKET"] = 10012] = "TICKET";
})(PropEnum || (PropEnum = {}));
/** 图标类型枚举 */
var IconType;
(function (IconType) {
    IconType[IconType["PROP"] = 1] = "PROP";
    IconType[IconType["SKILL"] = 2] = "SKILL";
    IconType[IconType["EXCHANGE"] = 3] = "EXCHANGE";
    IconType[IconType["BIG_PROP"] = 4] = "BIG_PROP";
    IconType[IconType["CHARGE"] = 5] = "CHARGE";
    IconType[IconType["PAO"] = 6] = "PAO";
    IconType[IconType["PAOBG"] = 7] = "PAOBG";
    IconType[IconType["PAOSHOW"] = 8] = "PAOSHOW";
    IconType[IconType["PAO_CLONE"] = 9] = "PAO_CLONE";
    IconType[IconType["CAIPAN"] = 10] = "CAIPAN";
    IconType[IconType["VIP_SHOW"] = 11] = "VIP_SHOW"; //VIP图标
})(IconType || (IconType = {}));
//抽奖返回：0杀死奖金鱼不够，1成功，2积分不足，3前后应领档位不同
var GetLotteryState;
(function (GetLotteryState) {
    GetLotteryState[GetLotteryState["FISH_NOT_ENOUGH"] = 0] = "FISH_NOT_ENOUGH";
    GetLotteryState[GetLotteryState["GET_SUCC"] = 1] = "GET_SUCC";
    GetLotteryState[GetLotteryState["SCORE_NOT_ENOUGH"] = 2] = "SCORE_NOT_ENOUGH";
    GetLotteryState[GetLotteryState["C_S_INCONFORMITY"] = 3] = "C_S_INCONFORMITY";
})(GetLotteryState || (GetLotteryState = {}));
//请求进入房间的枚举
var RequesetRoomState;
(function (RequesetRoomState) {
    RequesetRoomState[RequesetRoomState["SelectRoom"] = 1] = "SelectRoom";
    RequesetRoomState[RequesetRoomState["AutoLowRoom"] = 2] = "AutoLowRoom";
    RequesetRoomState[RequesetRoomState["AutoHighRoom"] = 3] = "AutoHighRoom";
    RequesetRoomState[RequesetRoomState["NewbieRoom"] = 4] = "NewbieRoom";
    RequesetRoomState[RequesetRoomState["DjsRoom"] = 5] = "DjsRoom";
    RequesetRoomState[RequesetRoomState["QmsRoom"] = 6] = "QmsRoom";
    RequesetRoomState[RequesetRoomState["KssRoom"] = 7] = "KssRoom";
    RequesetRoomState[RequesetRoomState["KssRoomChu"] = 8] = "KssRoomChu";
    RequesetRoomState[RequesetRoomState["KssRoomZhong"] = 9] = "KssRoomZhong";
    RequesetRoomState[RequesetRoomState["KssRoomJingying"] = 10] = "KssRoomJingying";
    RequesetRoomState[RequesetRoomState["Phoenix"] = 99] = "Phoenix";
    RequesetRoomState[RequesetRoomState["QuickGame"] = 0] = "QuickGame"; //快速开始
})(RequesetRoomState || (RequesetRoomState = {}));
//背包道具类型枚举
var BagItemType;
(function (BagItemType) {
    BagItemType[BagItemType["BASE"] = 1] = "BASE";
    BagItemType[BagItemType["BATTERY"] = 2] = "BATTERY";
    BagItemType[BagItemType["HAMMER"] = 3] = "HAMMER";
    BagItemType[BagItemType["PROP_CARD"] = 4] = "PROP_CARD";
    BagItemType[BagItemType["FISH_TICKET"] = 5] = "FISH_TICKET";
    BagItemType[BagItemType["WARHEAN"] = 6] = "WARHEAN";
    BagItemType[BagItemType["TEAM_PROP"] = 7] = "TEAM_PROP";
    BagItemType[BagItemType["FORGE_PROP"] = 8] = "FORGE_PROP";
    BagItemType[BagItemType["BARBETTE"] = 9] = "BARBETTE"; //炮座
})(BagItemType || (BagItemType = {}));
//解锁炮倍返回枚举
var UpdateOrForgeType;
(function (UpdateOrForgeType) {
    //0类型不对，1成功(成功才有下面的optional)，2材料不够，3倍数已达上限
    UpdateOrForgeType[UpdateOrForgeType["TYPE_NULL"] = 0] = "TYPE_NULL";
    UpdateOrForgeType[UpdateOrForgeType["TYPE_SUC"] = 1] = "TYPE_SUC";
    UpdateOrForgeType[UpdateOrForgeType["TYPE_NOENOUGH"] = 2] = "TYPE_NOENOUGH";
    UpdateOrForgeType[UpdateOrForgeType["TYPE_MAX"] = 3] = "TYPE_MAX";
    UpdateOrForgeType[UpdateOrForgeType["TYPE_FAIL"] = 4] = "TYPE_FAIL"; //倍数已达上限
})(UpdateOrForgeType || (UpdateOrForgeType = {}));
//解锁炮倍枚举
var GunUpdateType;
(function (GunUpdateType) {
    //1解锁，2无精华锻造，3有精华锻造
    GunUpdateType[GunUpdateType["UNLOCK"] = 1] = "UNLOCK";
    GunUpdateType[GunUpdateType["NO_ESSENCE_FORGE_TYPE"] = 2] = "NO_ESSENCE_FORGE_TYPE";
    GunUpdateType[GunUpdateType["USE_ESSENCE_FORGE_TYPE"] = 3] = "USE_ESSENCE_FORGE_TYPE"; //3有精华锻造
})(GunUpdateType || (GunUpdateType = {}));
//救济金状态
var BankruptStauts;
(function (BankruptStauts) {
    BankruptStauts[BankruptStauts["BANKRUPT"] = 0] = "BANKRUPT";
    BankruptStauts[BankruptStauts["GET_SUCC"] = 1] = "GET_SUCC";
    BankruptStauts[BankruptStauts["NOT_TO_TIME"] = 2] = "NOT_TO_TIME";
    BankruptStauts[BankruptStauts["STATE_RESUME"] = 3] = "STATE_RESUME";
    BankruptStauts[BankruptStauts["GET_LIMIT"] = 5] = "GET_LIMIT"; //已达领取上限
})(BankruptStauts || (BankruptStauts = {}));
//common查询枚举
var CommonRequest;
(function (CommonRequest) {
    CommonRequest[CommonRequest["EMAIL"] = 1] = "EMAIL";
    CommonRequest[CommonRequest["RECODE"] = 2] = "RECODE";
    CommonRequest[CommonRequest["COMMON_REQUEST_WECHAT_SHARE_INFO"] = 5] = "COMMON_REQUEST_WECHAT_SHARE_INFO";
    CommonRequest[CommonRequest["SHARE"] = 10] = "SHARE"; //分享
})(CommonRequest || (CommonRequest = {}));
//赠送好友的枚举
//0;赠送方物品不足；1:赠送成功；2:接收方背包满了；3:赠送方赠送次数满了；4:接收方接收次数满了
var SendItemState;
(function (SendItemState) {
    SendItemState[SendItemState["ITEM_NO_ENOUGH"] = 0] = "ITEM_NO_ENOUGH";
    SendItemState[SendItemState["SUC"] = 1] = "SUC";
    SendItemState[SendItemState["USER_BAG_MAX"] = 2] = "USER_BAG_MAX";
    SendItemState[SendItemState["SEND_TIMES_MAX"] = 3] = "SEND_TIMES_MAX";
    SendItemState[SendItemState["USER_TIMES_MAX"] = 4] = "USER_TIMES_MAX";
    SendItemState[SendItemState["CHARGE_NO_ENOUGH"] = 5] = "CHARGE_NO_ENOUGH";
})(SendItemState || (SendItemState = {}));
/**
1,转圈 + 变大
2,加快速度 + 变大
3,加快速度
 */
var FishDeadType;
(function (FishDeadType) {
    FishDeadType[FishDeadType["RotationAndScale"] = 1] = "RotationAndScale";
    FishDeadType[FishDeadType["SpeedAndScale"] = 2] = "SpeedAndScale";
    FishDeadType[FishDeadType["Speed"] = 3] = "Speed";
    FishDeadType[FishDeadType["DeadAtOnce"] = 4] = "DeadAtOnce";
    FishDeadType[FishDeadType["N_1"] = 5] = "N_1";
    FishDeadType[FishDeadType["N_2"] = 6] = "N_2";
    FishDeadType[FishDeadType["Alpha"] = 7] = "Alpha"; //新的鱼死亡  直接淡出
})(FishDeadType || (FishDeadType = {}));
/** 使用道具失败原因 */
var UseItemFail;
(function (UseItemFail) {
    UseItemFail[UseItemFail["USE_ITEM_NO_ITEM_NO_MONEY"] = 0] = "USE_ITEM_NO_ITEM_NO_MONEY";
    UseItemFail[UseItemFail["USE_ITEM_NO_VIP_LEVEL"] = 2] = "USE_ITEM_NO_VIP_LEVEL";
    UseItemFail[UseItemFail["USE_ITEM_LOCK_CONFLICT"] = 3] = "USE_ITEM_LOCK_CONFLICT";
    UseItemFail[UseItemFail["USE_ITEM_BEFORE_TIDE"] = 4] = "USE_ITEM_BEFORE_TIDE";
    UseItemFail[UseItemFail["USE_ITEM_SCORE_TOO_SMALL_USE_TOKEN"] = 5] = "USE_ITEM_SCORE_TOO_SMALL_USE_TOKEN";
    UseItemFail[UseItemFail["USE_ITEM_ALIVE_FISHES_TOO_MUCH"] = 6] = "USE_ITEM_ALIVE_FISHES_TOO_MUCH"; //活鱼太多不能扔
})(UseItemFail || (UseItemFail = {}));
/** 引导类型 */
//触发类型
var GuideTrriger;
(function (GuideTrriger) {
    GuideTrriger[GuideTrriger["First"] = 1] = "First";
    GuideTrriger[GuideTrriger["GunSend"] = 2] = "GunSend";
    GuideTrriger[GuideTrriger["FishDead"] = 3] = "FishDead";
    GuideTrriger[GuideTrriger["GunSendTimes"] = 4] = "GunSendTimes";
    GuideTrriger[GuideTrriger["Open"] = 5] = "Open";
    GuideTrriger[GuideTrriger["TaskFinish"] = 6] = "TaskFinish"; //任务完成触发
})(GuideTrriger || (GuideTrriger = {}));
//引导表现功能
var GuideShow;
(function (GuideShow) {
    GuideShow[GuideShow["Texture"] = 1] = "Texture";
    GuideShow[GuideShow["Txt"] = 2] = "Txt";
    GuideShow[GuideShow["Finger"] = 3] = "Finger";
    GuideShow[GuideShow["Finger_Txt"] = 4] = "Finger_Txt";
    GuideShow[GuideShow["NONE"] = 5] = "NONE"; //没有表现
})(GuideShow || (GuideShow = {}));
//开启引导触发功能
var GuideOpen;
(function (GuideOpen) {
    GuideOpen[GuideOpen["GUIDE_OPEN_UNLOCK"] = 0] = "GUIDE_OPEN_UNLOCK";
    GuideOpen[GuideOpen["GUIDE_OPEN_ADDFISH"] = 1] = "GUIDE_OPEN_ADDFISH";
    GuideOpen[GuideOpen["GUIDE_OPEN_FISHDEAD"] = 2] = "GUIDE_OPEN_FISHDEAD";
    GuideOpen[GuideOpen["GUIDE_OPEN_OPENLOTTERY"] = 3] = "GUIDE_OPEN_OPENLOTTERY";
    GuideOpen[GuideOpen["GUIDE_OPEN_TRRIGERTASK"] = 4] = "GUIDE_OPEN_TRRIGERTASK";
    GuideOpen[GuideOpen["GUIDE_OPEN_EXCHANGE"] = 5] = "GUIDE_OPEN_EXCHANGE";
    GuideOpen[GuideOpen["GUIDE_OPEN_POP_RMB_GAIN"] = 7] = "GUIDE_OPEN_POP_RMB_GAIN"; //弹出人民币获得
})(GuideOpen || (GuideOpen = {}));
//结束引导触发功能
var GuideClose;
(function (GuideClose) {
    GuideClose[GuideClose["GUIDE_CLOSE_UNLOCK"] = 10] = "GUIDE_CLOSE_UNLOCK";
    GuideClose[GuideClose["GUIDE_CLOSE_TRRIGER_NEXT"] = 11] = "GUIDE_CLOSE_TRRIGER_NEXT";
    GuideClose[GuideClose["GUIDE_CLOSE_LOCK"] = 12] = "GUIDE_CLOSE_LOCK";
    GuideClose[GuideClose["GUIDE_CLOSE_OPENLOTTERY"] = 13] = "GUIDE_CLOSE_OPENLOTTERY";
    GuideClose[GuideClose["GUIDE_CLOSE_LOTTERY"] = 14] = "GUIDE_CLOSE_LOTTERY";
    GuideClose[GuideClose["GUIDE_CLOSE_INTOROOM"] = 15] = "GUIDE_CLOSE_INTOROOM";
    GuideClose[GuideClose["GUIDE_CLOSE_CLOSE_RMB_GAIN"] = 16] = "GUIDE_CLOSE_CLOSE_RMB_GAIN";
    GuideClose[GuideClose["GUIDE_CLOSE_CLICK_EXCHAGE"] = 17] = "GUIDE_CLOSE_CLICK_EXCHAGE";
    GuideClose[GuideClose["GUIDE_CLOSE_EXCHNANGE_END"] = 18] = "GUIDE_CLOSE_EXCHNANGE_END"; //兑换完成。弹出完成UI
})(GuideClose || (GuideClose = {}));
//任务类型
var TaskType;
(function (TaskType) {
    /**1.新手任务*/
    TaskType[TaskType["TASK_TYPE_NEWBIE"] = 1] = "TASK_TYPE_NEWBIE";
    /**2.每日任务*/
    TaskType[TaskType["TASK_TYPE_EVERYDAY"] = 2] = "TASK_TYPE_EVERYDAY";
    /**3.每周任务*/
    TaskType[TaskType["TASK_TYPE_EVERY_WEEK"] = 3] = "TASK_TYPE_EVERY_WEEK";
    /**4.终身任务*/
    TaskType[TaskType["TASK_TYPE_LIFETIME"] = 4] = "TASK_TYPE_LIFETIME";
    /**5.大奖赛*/
    TaskType[TaskType["TASK_TYPE_GRAND_PRIX"] = 5] = "TASK_TYPE_GRAND_PRIX";
    /**6.全民赛*/
    TaskType[TaskType["TASK_TYPE_THE_PEOPLE"] = 6] = "TASK_TYPE_THE_PEOPLE";
    /**7.快速赛*/
    TaskType[TaskType["TASK_TYPE_THE_FAST"] = 7] = "TASK_TYPE_THE_FAST";
    /**8.每日活跃任务 */
    TaskType[TaskType["TASK_TYPE_AVT_DAY"] = 8] = "TASK_TYPE_AVT_DAY";
    /**9.每周活跃任务 */
    TaskType[TaskType["TASK_TYPE_AVT_WEEK"] = 9] = "TASK_TYPE_AVT_WEEK";
    /**10.海盗悬赏任务 */
    TaskType[TaskType["TASK_TYPE_PRICE"] = 10] = "TASK_TYPE_PRICE";
})(TaskType || (TaskType = {}));
var TaskState;
(function (TaskState) {
    /**任务状态2.不能领取*/
    TaskState[TaskState["TAST_STATE_CANT_RECEIVE"] = 2] = "TAST_STATE_CANT_RECEIVE";
    /**任务状态1.能领取*/
    TaskState[TaskState["TAST_STATE_CAN_RECEIVE"] = 1] = "TAST_STATE_CAN_RECEIVE";
    /**任务状态0.已领取*/
    TaskState[TaskState["TAST_STATE_RECEIVED"] = 0] = "TAST_STATE_RECEIVED";
})(TaskState || (TaskState = {}));
/**
 * 充值界面货币类型
 */
var ChargeType;
(function (ChargeType) {
    ChargeType[ChargeType["Gold"] = 1] = "Gold";
    ChargeType[ChargeType["Gem"] = 2] = "Gem";
    ChargeType[ChargeType["Ticket"] = 3] = "Ticket";
})(ChargeType || (ChargeType = {}));
var GunState;
(function (GunState) {
    GunState[GunState["UnGain"] = 0] = "UnGain";
    GunState[GunState["UnAct"] = 1] = "UnAct";
    GunState[GunState["Act"] = 2] = "Act";
    GunState[GunState["Equip"] = 3] = "Equip"; //装备的
})(GunState || (GunState = {}));
var Exchange_type;
(function (Exchange_type) {
    Exchange_type[Exchange_type["Ticket"] = 1] = "Ticket";
    Exchange_type[Exchange_type["Items"] = 3] = "Items";
    Exchange_type[Exchange_type["Goods"] = 0] = "Goods"; //虚拟物品
})(Exchange_type || (Exchange_type = {}));
//0时间没到不可领取，1时间到了可领取，2已领取，3第三天开始已过期
var Ciri_State;
(function (Ciri_State) {
    Ciri_State[Ciri_State["Time_Up"] = 0] = "Time_Up";
    Ciri_State[Ciri_State["Un_Gain"] = 1] = "Un_Gain";
    Ciri_State[Ciri_State["Gained"] = 2] = "Gained";
    Ciri_State[Ciri_State["Expired"] = 3] = "Expired"; //过期
})(Ciri_State || (Ciri_State = {}));
var Sign_State;
(function (Sign_State) {
    Sign_State[Sign_State["ACTIVE_MONTH_SIGN_STATE_NO_TOKEN_MAKED_UP"] = -7] = "ACTIVE_MONTH_SIGN_STATE_NO_TOKEN_MAKED_UP";
    Sign_State[Sign_State["ACTIVE_MONTH_SIGN_STATE_TYPE_ERROR"] = -6] = "ACTIVE_MONTH_SIGN_STATE_TYPE_ERROR";
    Sign_State[Sign_State["ACTIVE_MONTH_SIGN_STATE_MAKED_UP_ERROR"] = -5] = "ACTIVE_MONTH_SIGN_STATE_MAKED_UP_ERROR";
    Sign_State[Sign_State["ACTIVE_MONTH_SIGN_STATE_MAKED_UP_TIMES_ERROR"] = -4] = "ACTIVE_MONTH_SIGN_STATE_MAKED_UP_TIMES_ERROR";
    Sign_State[Sign_State["ACTIVE_MONTH_SIGN_STATE_MAKED_UP_BEFORE_SIGN_ERROR"] = -3] = "ACTIVE_MONTH_SIGN_STATE_MAKED_UP_BEFORE_SIGN_ERROR";
    Sign_State[Sign_State["ACTIVE_MONTH_SIGN_STATE_MAKED_UP"] = -2] = "ACTIVE_MONTH_SIGN_STATE_MAKED_UP";
    Sign_State[Sign_State["ACTIVE_MONTH_SIGN_STATE_SIGNED"] = -1] = "ACTIVE_MONTH_SIGN_STATE_SIGNED";
    Sign_State[Sign_State["ACTIVE_MONTH_SIGN_STATE_FRESH"] = 0] = "ACTIVE_MONTH_SIGN_STATE_FRESH"; //跨月刷新                 112
})(Sign_State || (Sign_State = {}));
var Pop_State;
(function (Pop_State) {
    Pop_State[Pop_State["VIP"] = 0] = "VIP";
    Pop_State[Pop_State["FIRST_CHARGE"] = 1] = "FIRST_CHARGE";
    Pop_State[Pop_State["MONTH_CARD"] = 2] = "MONTH_CARD";
    Pop_State[Pop_State["CIRI"] = 3] = "CIRI";
    Pop_State[Pop_State["CIRCLE"] = 4] = "CIRCLE"; //转盘
})(Pop_State || (Pop_State = {}));
var Exchange_Color;
(function (Exchange_Color) {
    Exchange_Color[Exchange_Color["White"] = 1] = "White";
    Exchange_Color[Exchange_Color["Green"] = 2] = "Green";
    Exchange_Color[Exchange_Color["Blue"] = 3] = "Blue";
    Exchange_Color[Exchange_Color["Purple"] = 4] = "Purple";
    Exchange_Color[Exchange_Color["Origen"] = 5] = "Origen";
    Exchange_Color[Exchange_Color["Red"] = 6] = "Red";
})(Exchange_Color || (Exchange_Color = {}));
var Phoenix_State;
(function (Phoenix_State) {
    //当前状态0要来了 1在池塘中 2消失倒计时 3死亡
    Phoenix_State[Phoenix_State["Coming"] = 0] = "Coming";
    Phoenix_State[Phoenix_State["Ing"] = 1] = "Ing";
    Phoenix_State[Phoenix_State["ToDisappear"] = 2] = "ToDisappear";
    Phoenix_State[Phoenix_State["Dead"] = 3] = "Dead";
    Phoenix_State[Phoenix_State["ShieldDead"] = 4] = "ShieldDead";
    Phoenix_State[Phoenix_State["Paolule"] = 5] = "Paolule"; //凤凰跑路了
})(Phoenix_State || (Phoenix_State = {}));
//特属鱼的ID
var Especial_Fish;
(function (Especial_Fish) {
    Especial_Fish[Especial_Fish["Phoenix"] = 99] = "Phoenix";
    Especial_Fish[Especial_Fish["Shield"] = 98] = "Shield";
    Especial_Fish[Especial_Fish["Guide_Fish"] = 97] = "Guide_Fish"; //引导鱼
})(Especial_Fish || (Especial_Fish = {}));
//活动枚举
var Active_Type;
(function (Active_Type) {
    Active_Type[Active_Type["LIMIT_TIME_ACTIVE_TYPE_FISH_SEND"] = 1] = "LIMIT_TIME_ACTIVE_TYPE_FISH_SEND";
    Active_Type[Active_Type["LIMIT_TIME_ACTIVE_TYPE_CHARGE_SEND"] = 2] = "LIMIT_TIME_ACTIVE_TYPE_CHARGE_SEND";
    Active_Type[Active_Type["LIMIT_TIME_ACTIVE_TYPE_VIP_SEND"] = 3] = "LIMIT_TIME_ACTIVE_TYPE_VIP_SEND";
    Active_Type[Active_Type["LIMIT_TIME_ACTIVE_TYPE_SECRET_SHOP"] = 4] = "LIMIT_TIME_ACTIVE_TYPE_SECRET_SHOP"; //神秘商店
})(Active_Type || (Active_Type = {}));
//活动状态
var Active_State;
(function (Active_State) {
    Active_State[Active_State["LIMIT_TIME_ACTIVE_STATE_INIT"] = 0] = "LIMIT_TIME_ACTIVE_STATE_INIT";
    Active_State[Active_State["LIMIT_TIME_ACTIVE_STATE_CAN_RECEIVE"] = 1] = "LIMIT_TIME_ACTIVE_STATE_CAN_RECEIVE";
    Active_State[Active_State["LIMIT_TIME_ACTIVE_STATE_RECEIVED"] = 2] = "LIMIT_TIME_ACTIVE_STATE_RECEIVED";
    Active_State[Active_State["LIMIT_TIME_ACTIVE_STATE_OVERDUE"] = 3] = "LIMIT_TIME_ACTIVE_STATE_OVERDUE";
    Active_State[Active_State["LIMIT_TIME_ACTIVE_STATE_ACCEPTED"] = 4] = "LIMIT_TIME_ACTIVE_STATE_ACCEPTED"; // 接受了活动任务
})(Active_State || (Active_State = {}));
//报名状态枚举
var SignUp_State;
(function (SignUp_State) {
    SignUp_State[SignUp_State["ARENA_SIGN_UP_TIMES_MORE"] = -3] = "ARENA_SIGN_UP_TIMES_MORE";
    SignUp_State[SignUp_State["ARENA_SIGN_UP_TOCKEN_LESS"] = -2] = "ARENA_SIGN_UP_TOCKEN_LESS";
    SignUp_State[SignUp_State["ARENA_SIGN_UP_SIGNED"] = 0] = "ARENA_SIGN_UP_SIGNED";
    SignUp_State[SignUp_State["AERNA_SIGN_UP_SUCCESS"] = 1] = "AERNA_SIGN_UP_SUCCESS";
})(SignUp_State || (SignUp_State = {}));
//规则枚举
var Rule_State;
(function (Rule_State) {
    Rule_State[Rule_State["DjsRoom"] = 0] = "DjsRoom";
    Rule_State[Rule_State["KssRoom"] = 1] = "KssRoom";
    Rule_State[Rule_State["WorldBoss"] = 2] = "WorldBoss";
    Rule_State[Rule_State["QmsRoom"] = 3] = "QmsRoom";
})(Rule_State || (Rule_State = {}));
//语言类型配置
var LanguageType;
(function (LanguageType) {
    LanguageType[LanguageType["Simp_Chinese"] = 1] = "Simp_Chinese";
    LanguageType[LanguageType["TW_Chinese"] = 2] = "TW_Chinese";
    LanguageType[LanguageType["English"] = 3] = "English"; //英语
})(LanguageType || (LanguageType = {}));
//分享类型
var ShareType;
(function (ShareType) {
    ShareType[ShareType["Share_Money"] = 1] = "Share_Money";
    ShareType[ShareType["Share_Djs"] = 2] = "Share_Djs";
    ShareType[ShareType["Forge_Succ"] = 3] = "Forge_Succ";
    ShareType[ShareType["Circle_GoldWar"] = 4] = "Circle_GoldWar";
    ShareType[ShareType["Share_GuangYU"] = 5] = "Share_GuangYU";
    ShareType[ShareType["NORMAL"] = 6] = "NORMAL";
})(ShareType || (ShareType = {}));
//广播类型
var BroadType;
(function (BroadType) {
    BroadType[BroadType["NewsWorld"] = 3] = "NewsWorld";
    BroadType[BroadType["NewsActive"] = 1] = "NewsActive";
    BroadType[BroadType["NewsFishing"] = 2] = "NewsFishing";
})(BroadType || (BroadType = {}));
// 分享成功类型
var ShareSuccType;
(function (ShareSuccType) {
    ShareSuccType[ShareSuccType["EXCHANGE_SUCC"] = 1] = "EXCHANGE_SUCC";
    ShareSuccType[ShareSuccType["FORGING_SUCC"] = 2] = "FORGING_SUCC";
    ShareSuccType[ShareSuccType["DANTOU_SUCC"] = 3] = "DANTOU_SUCC";
    ShareSuccType[ShareSuccType["DAJIANGSAI_SUCC"] = 3] = "DAJIANGSAI_SUCC";
})(ShareSuccType || (ShareSuccType = {}));
//# sourceMappingURL=CommonEnum.js.map