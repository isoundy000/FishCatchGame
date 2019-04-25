//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

module game.net {
	export class ProtoFileEnum {

		public static common = `
			message ReConnect {
				required int32 userId = 1;
			}
			message CommonStatus {
				required int32 status = 1;//0.表示登陆失败;5.表示被人挤掉
			}
			message Heartbeat {
			}
			message CommonRequest {
				required uint32 type = 1;
			}
			message ReplaceUser {
				required uint32 userId = 1;
				required uint32 gameServerId = 2;
				required uint32 roomServerId = 3;
			}
			message ModifyData {
				required uint32 id = 1;
				required uint32 count = 2;
			}
			message BroadcastMessage {
				optional uint32 broadType = 1;//类型1活动广告，2房间捕鱼
				optional string msg = 2;//广告内容
				optional uint32 langId = 3;//语言ID
				repeated string params = 4;//语言ID对应的参数
				optional uint32 priority = 5;//显示优先级
			}
			message CGBroadcastMessageSend {
			}
			message GCBroadcastMessageBack {
				repeated BroadcastMessage messageList = 1;//跑马灯广告列表	
			}
			message ExchangeGoodsItem {
				required uint32 id = 1;//兑换货品id
				required string name = 2;
				required uint32 type = 3;//游戏中的物品：0;话费：1;京东卡：2;实物：3
				required uint32 exchangePriceId = 4;//货币在游戏里item表中的id
				required uint32 exchangePrice = 5;
				required string instruction = 6;
				required uint32 marketPrice = 7;
				required string url = 8;
				required uint32 minVip = 9;
				required uint32 goodsId = 10;//0表示实物
				required uint32 goodsNum = 11;
				required int32 serverNum = 12;//服务器剩余数量
				required int32 loopRecordColor = 13;//循环播放的兑换记录的文字颜色
				required uint32 orders = 14;//排序序号
				required uint32 minGunId = 15;//可兑换最小炮倍
			}
			message ExchangeGoodsSend {
			}
			message ExchangeGoodsBack {
				repeated ExchangeGoodsItem itemList = 1;
			}
			message LogicalLogSend {
				required string type = 1;
				required string content = 2;	
			}
			message LoopExchangeRecord {
				required uint32 exchangeGoodsId = 1;//兑换货品id
				required string phone = 2;//手机
				required uint64 time = 3;//兑换时间
			}
			message LoopExchangeRecordsSend {
			}
			message LoopExchangeRecordsBack {
				repeated LoopExchangeRecord recordList = 1;
			}
			message ActiveConfigMessage {
				required uint32 id = 1;//活动id
				required uint32 type = 2;//类型
				required uint32 startTime = 3;//开始时间
				required uint32 endTime = 4;//结束时间
				required uint32 activeState = 5;//活动状态  0: 过期;1: 正在进行;3: 暂停;
				required string parameter1 = 6;//参数1
				required string parameter2 = 7;//参数1
				required string descVip = 8;//特权描述
				required string nameUrl = 9;//名称Url
				required uint32 order = 10;//排序
			}
			message ActiveConfigMessagesSend {
			}
			message ActiveConfigMessagesBack {
				repeated ActiveConfigMessage messageList = 1;
			}
		`;

		public static user = `
			message LoginSend {
			    required uint32 id = 1;
			    required string account = 2;//账号字符串
				required uint32 platform = 3;//平台id
				required string secret = 4;//登陆服务器给的密钥
			}
			message LoginBack {
				required uint32 id = 1;
			    repeated TaskInfo taskInfo = 2;
				repeated ItemInfo itemInfo = 3;//背包系统
				required uint64 coins = 4;
				required uint32 gems = 5;
				required uint32 vipLevel = 6;
				required uint32 systemTime = 7;//当前系统时间（单位秒）
				required uint32 maxGunId = 8;
				required uint32 canReliefTime = 9;//救济金可领取时间，0为不在破产状态
				repeated MailListByType mailListByType = 10; //按类型发邮件
				required uint32 roleLevel = 11;
				required uint32 roleExp = 12;
				required uint32 everydayActive = 13;
				required uint32 everyWeekActive = 14;
				required uint32 newbieGuideId = 15;
				required uint32 batterySkinId = 16;//炮台皮肤
				required uint32 gunrestSkinId = 17;//炮座皮肤
				required uint32 coupon = 18;//点券
				required uint32 totalChargeRMB = 19;//累计充值金额(单位是分)
				required uint32 monthEndTime = 20;//月卡过期时间
				required MonthSignActiveInfo monthSignActiveInfo = 21;//月签到相关消息
				required uint32 isTodayFirstLogin = 22;//是否今日首次登录(0不是，1是)
				optional NextDayAwardActiveInfo nextDayAwardActiveInfo = 23;//次日礼包
				required uint32 isTodayDraw = 24;//是否进行了每日抽奖(0不是，1是)
			    optional string name = 25;//玩家昵称
			    optional string iconUrl = 26;//玩家头像
				optional ActiveInfoMessage activeInfo = 27;//活动信息
				repeated uint32 chargedGears = 28;//充值的档位id
				repeated uint32 exchangedGears = 29;//兑换的档位id
				required string selfInviteCode = 30;//自己的邀请码
			}
			message TaskInfo {
				required int32 taskId = 1;	
			    required int32 taskStatus = 2;
				required int32 curParameterValue = 3;
			}
			message RequestRoom {
				required uint32 type = 1; //请求进入房间类型
				required uint32 id = 2;	//userId
				optional int32 roomId = 3;
			}
			message RequestRoomBack {
				required uint32 flag = 1;
				required uint32 port = 2;
				required string ip = 3;
				required int32 roomId = 4;
				required uint32 type = 5;
			}
			message IntoRoomSend {
				required uint32 id = 1;	//房间号
				required uint32 uid = 2;
			}
			message IntoRoomBack {
				required uint32 flag = 1;
				repeated PlayerInfo playerInfo = 2;
			}
			message PlayerInfo {
			    required uint32 playerId = 1;
			    required string name = 2;
				required uint32 playerLv = 3;
				required uint32 gems = 4;
				required uint64 coins = 5;
				required uint32 position = 6;
				required uint32 gunId = 7;
				repeated uint32 items = 8;//正在使用的锁定道具ID
				repeated LockRelation lockRelation = 9;
				required uint32 vipLevel = 10;
				required uint32 batterySkinId = 11;//炮台皮肤
				required uint32 gunrestSkinId = 12;//炮座皮肤
				optional uint32 coupon = 13;//点券
				optional uint32 totalChargeRMB = 14;//累计充值金额(单位是分)
				optional uint32 monthEndTime = 15;//月卡过期时间
				required uint32 roleLevel = 16;//角色等级
				optional GrandPrixMessage grandPrixMessage = 17;//大奖赛信息
			}
			message QuitRoom {
				required uint32 position = 1;
				required uint32 playerId = 2;
			}
			message MajorParameterChange {
				required uint32 userId = 1;
				optional uint64 coins = 2;
				optional uint32 gems = 3;
				optional uint32 level = 4;
				repeated ItemInfo item = 5;
				optional uint32 coupon = 6;//点券
			}
			message ItemInfo {
				required uint32 itemId = 1;
				required uint32 totalCount = 2;
				optional int32 expried = 3;// 过期时间
			}
			message RoomInfo {
				required uint32 roomId = 1;
				required uint32 userCount = 2;
			}
			message RoomServerInfo {
				required uint32 serverId = 1;
				required uint32 state = 2;//1流畅(0<100)，2繁忙(101<150)，3拥挤(151~180)，4满员(181~200)
			}
			message ManualChooseRoomSend {
				required int32 serverId = 1;
			}
			message ManualChooseRoomBack {
				repeated RoomServerInfo serverInfo = 1;
				repeated RoomInfo roomInfo = 2;
			}
			message LockRelation {
				required uint32 gunIndex = 1;
				required uint32 fishId = 2;
			}
			message Bankrupt {
				required uint32 state = 1;//0破产;1到点了领取;2时间不到;3.又有钱了,救济CD解除;4向server传了state!=0;5.今日领取已达上限;6.金币>0;7.领取救济金
				optional uint32 canReliefTime = 2;//救济金可领取时间
				optional uint32 coins = 3;//成功时,返回救济金
				optional uint32 userId = 4;//向其他玩家显示
			}
			message Mail {
				required uint32 mailId = 1;
				required uint32 mailType = 2;
				required uint32 userId = 3;//收件人id
				required string receiveUserName = 4;
				required uint32 sendUserId = 5;
				required string sendUserName = 6;
				repeated ItemInfo items = 7;
				required uint64 time = 8;//发送时间为1970年至今毫秒数
				required uint32 state = 9;//0未领取（查看），1领取，2查看（无物品附件）
				required string mailContent = 10;//邮件文字内容
				required string mailTitle = 11;//邮件标题
			}
			message MailListByType {
				required uint32 mailType = 1;
				repeated Mail mails = 2;
			}
			message Mailbox {
				repeated MailListByType mailListByType = 1;
			}
			message FindUserSend {
				required uint32 userId = 1;
			}
			message FindUserBack {
				required uint32 state = 1;//0:查无此人,userName放"";1:有这人，这时候userName是玩家name;
				required string receiveUserName = 2;
			}
			message GiveItemSend {
				required uint32 receiveUserId = 2;//接收方的userID
				required ItemInfo giveItem = 3;//赠送的物品
			}
			message GiveItemBack {
				required uint32 state = 1;//0;赠送方物品不足；1:赠送成功；2:接收方背包满了；3:赠送方赠送次数满了；4:接收方接收次数满了
			}
			message ReceiveMailSend {
				required uint32 mailId = 1;
			}
			message ReceiveMailBack {
				required uint32 state = 1;//0:背包已满，1：领取（查看）成功，2：已经领过了；3：无此id
			}
			message ExchangeSend {
				required uint32 goodsId = 1;//商品id，兑换表里的商品id
				optional string receiverName = 2;//收件人名
				optional string receiverPhone = 3;//收件人手机
				optional uint64 receiverQQ = 4;//收件人QQ
				optional string receiverAddress = 5;//收件人地址
				optional string receiverWX = 6;//收件人微信
				optional string receiverZFB = 7;//收件人支付宝
			}
			message ExchangeBack {
				required int32 state = 1;//0因为货币不足失败，1成功，2因为服务器数目上限失败
				optional ExchangeRecord record = 2;//兑换记录
			}
			message ExchangeRecord {
				required uint32 recordId = 1;//兑换记录id
				required uint32 goodsId = 2;//商品id，兑换表里的商品id
				required uint64 time = 3;//兑换时间
				required uint32 deliveryState = 4;//发货状态 0，未发货，1发货
				optional string receiverName = 5;//收件人名
				optional string receiverPhone = 6;//收件人手机
				optional uint64 receiverQQ = 7;//收件人QQ
				optional string receiverAddress = 8;//收件人地址
			}
			message Exchange {
				repeated ExchangeRecord records = 1;
			}
			message NewbieGuideSend {
				required uint32 guideId = 1;
			}
			message TaskParameterChange {
				repeated TaskInfo changedTasks = 1;
				optional uint32 arenaTaskTimes = 2;//竞技场任务当前次数0，1，2
				optional uint32 pirateTaskEndTime = 3;//海盗悬赏结束时间秒数
			}
			message FinishTaskSend {
				required uint32 taskId = 1;
			}
			message FinishTaskBack {
				required uint32 state = 1;
				required uint32 taskId = 2;	
				repeated ItemInfo taskAward = 3;
				optional uint32 newTaskId = 4;
			}
			message ShopBuy {
				required uint32 shopId =1;//购买的商城表ID
			}
			message ShopBuyBack {
				required uint32 state = 1;//0因为货币不足失败，1成功，2背包满
			}
			message ChargeSend {
				required uint32 chargeId = 1;//充值表id
			}
			message ChargeBack {
				required uint32 state = 1;//0失败 1成功
				required uint32 isFirst = 2;//该档位是否首充
				required uint32 chargeId = 3;//充值表id
				optional uint32 curCoupon = 4;//当前点券数
				optional uint32 monthEndTime = 5;//月卡过期时间
				required uint32 vipExp = 6;//vip经验的当前值
				required uint32 vipLevel = 7;//vip等级的当前值
			}
			message MonthSignActiveInfo {
				required uint32 cumulativeSignTimes = 1;//累计签到次数
				required uint32 remainMakeUpTimes = 2;//剩余补签次数
				required uint32 isTodaySign = 3;//是否今天签到
				required uint32 isTodayMakeUp = 4;//是否今天补签
				required uint32 curMonth = 5;//当前月份
			}
			message MonthSignSend {
				required uint32 operationType = 1;//0.签到,1.补签
				required uint32 curMonth = 2;//当前月份
			}
			message MonthSignBack {
				required int32 state = 1;//-2.今天已经补签,-1.今天已经签到,0.跨天更新,1.签到成功,2.补签成功
				optional MonthSignActiveInfo monthSignActiveInfo = 2;
			}
			message NextDayAwardSend {
			}
			message NextDayAwardBack {
				required int32 resultState = 1;//0时间没到不可领取，1成功，2已领取，3已过期
			}
			message NextDayAwardActiveInfo {
				required int32 nextDayAwardState = 1;//0时间没到不可领取，1时间到了可领取，2已领取，3第三天开始已过期
			}
			message GetWanbaGift {
				required int32 giftId = 1;//礼包ID
			}
			message GetWanbaGiftBack {
				required int32 result = 1;//1成功，0失败没有该礼包 2已经领取过
				repeated ItemInfo rewardList = 2;
			}
			message RankDataMessage {
				required int32 rankType = 1;//排行类型1等级 2金币
				required int32 rank = 2;//排名
				required int32 userId = 3;//玩家ID
				required int32 roleLevel = 4;//玩家等级
				required int32 vipLevel = 5;//玩家VIP等级	
				required int64 rankValue = 6;//排行对应的值
				required string name = 7;//玩家昵称
				required string iconUrl = 8;//头像
			}
			message GetRankData {
				required int32 rankType = 1;//排行类型1等级 2金币
			}
			message GetRankDataBack {
				repeated RankDataMessage ranklist = 1;//排行数据
			}
			message DailyLoginDraw {
			}
			message DailyLoginDrawBack {
				required int32 state = 1;//0已经抽过了1成功
				optional int32 index = 2;//抽中第几个
			}
			message GrandPrixMessage {
				optional uint32 todayGrandPrixTimes = 1;//今日成功完成大奖赛次数
				optional uint32 grandPrixSignUp = 2;//大奖赛是否报名
				required uint32 grandPrixIntegral = 3;//大奖赛积分
				optional uint32 grandPrixBulletNum = 4;//大奖赛子弹数
				required uint32 roomtType = 5;//房间类型
			}
			message GrandPrixRankSend {
				required uint32 roomtType = 1;//房间类型
			}
			message GrandPrixRankBack {
				required RankDataMessage myData = 1;
				optional RankDataMessage weekData = 2;
				repeated RankDataMessage dayData = 3;
				optional uint64 weekIntegral = 4;
				required uint32 roomtType = 5;//房间类型
			}
			message GrandPrixSettlementSend {
				required uint32 roomtType = 1;//房间类型
			}
			message GrandPrixSettlement {
				required uint32 beforeIntegral = 1;//结算前
				required uint32 gunPlus = 2;//炮倍加成
				required uint32 vipPlus = 3;//vip加成
				required uint32 timesPlus = 4;//参加次数加成
				required uint32 afterIntegral = 5;//结算后
				optional ItemInfo item = 6;
				required uint32 roomtType = 7;//房间类型
				optional uint32 curRank = 8;//0表示不在榜，当前排名
			}
			message ActiveInfoMessage {
				optional uint32 shareTimes = 1;//今天分享次数
				optional uint32 focusFlag = 2;//是否关注0未关注 1已关注	
			}
			message RoomOnlineInfo {
				optional uint32 roomType = 1;//房间类型
				optional uint32 num = 2;//在线人数	
			}
			message RoomOnlineMessage {
				repeated  RoomOnlineInfo onlineList = 1;//房间在线人数信息
			}
			message GetLimitedTimeActiveInfo {
			}
			message LimitedTimeActiveInfo {
				repeated LimitedTimeActiveItem sendAwardActiveInfo = 1;//打鱼送礼活动，充值送礼活动，vip送礼活动 其中id 表示活动id
				repeated LimitedTimeActiveItem secretShopActiveInfo = 2;//神秘商店活动信息  其中id 表示商品id
				optional uint32 activeCoin = 3;//当前活动币数量
			}
			message LimitedTimeActiveItem {
				required uint32 id = 1;//活动id
				required uint32 state = 2;//0:未达条件;1:可领取;2:已领取;3:已过期;4:需要接受才能开始的活动的接受状态
				optional uint32 value = 3;//活动当前值
			}
			message LimitedTimeActiveSend {
				required uint32 id = 1;//活动id
				optional uint32 goodsId = 2;//神秘商店商品id
				required uint32 state = 3;//0:接受;1:领取;
				optional uint32 priceIndex = 4;//神秘商店多种价格的序号
			}
			message LimitedTimeActiveBack {
				required uint32 result = 1;//结果
				optional LimitedTimeActiveInfo info = 2;
			}
			message WeChatShareInfo {
				required uint32 newbieAwardState = 1;//新人奖励状态
				required uint32 invitedUserNum = 2;//邀请人数
				required uint32 todayShareTimes = 3;//今日成功分享次数
			}
			message ReceiveWeChatShareAwardSend {
				required uint32 type = 1;//新人奖励1，邀请成功奖励2
				optional uint32 functionType = 2;//邀请成功类型，1兑换，2锻造，3获得
				optional string functionParam = 3;//1兑换的商品名称，2锻造的炮倍名称，3获得物品名称
			}
			message ReceiveWeChatShareAwardBack {
				required uint32 type = 1;//新人奖励1，邀请成功奖励2
				required uint32 state = 2;//1成功，0不是通过分享连接进入，2通过自己的分享连接进入，3领取过
			}
		`;

		public static fishing = `
			message FishingGunSend {
		    required uint32 angle = 1;
			required uint32 gunIndex = 2;//枪械索引
				optional uint32 bulletId = 3;//子弹id
			}
			message FishingGunBack {
			required uint32 uid = 1;
			required FishingGunSend gun = 2;
			}
			message FishingHitSend {
			required uint32 fishId = 1;
			required uint32 bulletId = 2;//子弹id
			}
			message FishingHitBack {
				optional uint32 userId = 1;
			required uint32 fishId = 2;
				repeated ItemProto items = 3;
			}
			message RandomFishHitBack {
			required uint32 userId = 1;
			required uint32 fishFunctionType = 2;//0一网打尽
				optional uint32 fishId = 3;//击杀的鱼id
				repeated FishingHitBack fishingHitback = 4;//被波及而死的鱼命中信息
			}
			message ItemProto {
			required uint32 itemId = 1;
			required uint32 count = 2;
				optional int32 expried = 3;// 过期时间
			}
			message PondFishes {
				repeated AddFish fishes = 1; 
			}
			message AddFish {
			required uint32 type = 1;
		    required uint32 fishId = 2;
			required uint32 pathId = 3;
				repeated uint32 uniId = 4;
			required Coordinate coordinate = 5;
				optional uint32 aliveTime = 6;//还能活多久
			}
			message Coordinate {
			required int32 xvalue = 1;
			required int32 yvalue = 2;
			}
			message PondState {
			required uint32 type = 1;
				optional uint32 fishId = 2;
				optional uint32 userId = 3;
			}
			message GunFishPosInfoMessage {
				repeated FishPosInfo fishPostList =1;
			}
			message UseItemBack {
			required uint32 userId = 1;
			required uint32 itemId = 2;	//道具id
				optional AddFish addFish = 3;//有鱼加鱼，没有鱼type,fishId,pathId,uniId都是-1，但随一个位置
				optional uint32 state = 4;	//使用状态:原因是既没物品又没钱为0,1是成功,鱼潮来临前使用错误代码为4,狂暴使用等级不够错误代码为2,用狂暴、分身的时候不能用锁定为3
				repeated uint32 frozenFishIds = 5;//冰冻的鱼id
			}
			message ChangeGunSend {
			required uint32 type = 1;//1表示减炮倍，2表示加炮倍，3换皮肤
				optional uint32 skinId = 2;
			}
			message ChangeGunBack {
			required uint32 userId = 1;
			required uint32 type = 2;
				optional uint32 gunId = 3;
				optional uint32 skinId = 4;
			required uint32 state = 5;//0失败，1成功
			}
			message UseWarheadSend {
			required uint32 itemId = 1;//弹头id
			required uint32 uniId = 2;//死哪条鱼
			}
			message UseWarheadBack {
			required uint32 userId = 1;//谁打的
			required uint32 uniId = 2;//打死了哪条鱼
			required uint32 addCoins = 3;//加了多少钱
			}
			message LotteryConditonAccumulate {
			required uint32 integral = 1;//当前积分
				optional uint32 killNum = 2;//当前击杀数目
				optional uint32 todayDrawTimes = 3;//今天抽奖次数
			}
			message DrawLotterySend {
			required uint32 gear = 1;//抽奖的档位0——5
			}
			message DrawLotteryBack {
			required uint32 userId = 1;
			required uint32 state = 2;//0杀死奖金鱼不够，1成功，2积分不足，3前后应领档位不同, 4鱼券限制不足
				optional uint32 itemIndex = 3;//获得的奖品(0~5)
			}
			message UseLockItem {
			required uint32 itemId = 1;//锁定卡,分身,狂暴的道具id
			required uint32 fishId = 2;//锁定的鱼id
				optional uint32 userId = 3;//使用人id
			required uint32 gunIndex = 4;//枪械索引
			}
			message LockItemEnd {
			required uint32 itemId = 1;//锁定卡,分身,狂暴的道具id
			required uint32 userId = 2;//使用人id 
			}
			message UpgradeOrForgeSend {
			required uint32 type = 1;//1解锁，2无精华锻造，3有精华锻造
			}
			message UpgradeOrForgeBack {
			required uint32 state = 1;//0类型不对，1成功(成功才有下面的optional)，2材料不够，3倍数已达上限，4锻造但失败了
				optional uint32 type = 2;
				optional uint32 userId = 3;
				optional uint32 afterGunId = 4;
				optional ItemProto itemProto = 5;
			}
			message LevelUp {
			required uint32 oldLevel = 1;
			required uint32 newLevel = 2;
				optional uint32 userId = 3;//升级玩家
			}
			message BulletDisappear {
			required uint32 bulletId = 1;
			}
			message VipLevelUp {
			required uint32 oldLevel = 1;
			required uint32 newLevel = 2;
			}
			message ArenaSignUpSend {
			required uint32 type = 1;
			}
			message ArenaSignUpBack {
			required uint32 type = 1;
			required int32 state = 2;
				optional uint32 grandPrixIntegral = 3;//大奖赛积分
				optional uint32 grandPrixBulletNum = 4;//大奖赛子弹数
			}
			message GrandPrixInfoChange {
			required uint32 grandPrixIntegral = 1;//大奖赛积分
			required uint32 userId = 2;
			}
			message ThePeopleChange {
			required uint32 grandPrixIntegral = 1;//大奖赛积分
			required uint32 userId = 2;
				optional uint32 fishId = 3;
			}
			message QuickGameInfoChange {
			required uint32 integral = 1;//积分
			required uint32 userId = 2;
				optional uint32 fishId = 3;
			}
			message QuickGameRankItem {
			required uint32 userId = 1;
			required string name = 2;
			required uint32 rank = 3;
			required uint32 integral = 4;
			required uint32 bulletNum = 5;
			}
			message QuickGameRankResult {
			required uint32 type = 1;//0比赛中，1比赛结束
				repeated QuickGameRankItem rank = 2;
			}
			message QuickGameIntoRoom {
			required uint32 curNum = 1;//当前人数
				optional uint32 endSec = 2;//结束秒数
			}
			message WorldBossInfoBack {
			required uint32 bossId = 1;//世界BossID
				optional uint32 fishId = 2;//鱼ID，不是UID
				optional uint32 state = 3;//当前状态0要来了 1在池塘中 2消失倒计时 3死亡 4 扩盾减少
				optional uint32 time = 4; //倒计时秒
				optional uint32 shieldMax = 5;//扩盾最大值
				optional uint32 curShieldValue = 6;//扩盾当前值从0开始
				optional uint32 userId = 7;//userId
				repeated ItemProto items = 8;//获取的金币
			}
			message PirateRankItem {
			required uint32 userId = 1;
			required uint32 rank = 2;
			}
			message PirateRankResult {
			required uint32 type = 1;//0比赛中，1比赛结束，给第一名奖励
				repeated PirateRankItem rank = 2;
				optional ItemProto award = 3;
			}
			message UseItemSend {
			required uint32 itemId = 1;
			}
			message SyncFishPosInfo {
				repeated uint32 groupIdList = 1;
			}
			message FishPosInfo {
				optional uint32 groupId = 1;
				repeated uint32 fishId = 2;
				optional uint32 pos = 3;
			}
			message SmallHornSend {
			required string words = 1;
			}
			message SmallHornBack {
			required uint32 result = 1;
			}
		`;

	}
}
