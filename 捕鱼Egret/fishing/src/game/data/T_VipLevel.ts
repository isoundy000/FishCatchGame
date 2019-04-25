module game.table {

	export class T_VipLevel {
		//VIP等级
		public vipLevel:number = 0;
		//充值金额
		public levelUpExp:number = 0;
		//升级奖励
		public levelUpAward:string = "";
		//描述
		public desc:string = "";
		//名字
		public name:string = "";
		//描述
		public descVip:number = 0;
		//每日弹出描述
		public popDesc:number = 0;
		//每日首次登陆补足金币数到
		public makeUpConisTo:number = 0;
		//每日首次登陆奖励
		public everydayAward:string = "";
		//大奖赛加成
		public grandPrix:number = 0;
		//vip限时活动奖励
		public limitAcitveAward:string = "";
		//vip限时活动币活动奖励
		public limitAcitveCoinAward:string = "";
		//点券购买加成比例
		public couponBuyAdditionRatioByType:string = "";
	}

	export class T_VipLevel_Table {
		public static getVoByKey(key:number):T_VipLevel {
			var len = _T_VipLevel_.length;
			let data: T_VipLevel = SerchUtil.binary_search(_T_VipLevel_, "vipLevel", 0, len, key);
			return data;
		}
		
		public static getAllVo():Array<T_VipLevel> {
			return _T_VipLevel_;
		}
	}

	const _T_VipLevel_ = [
		{vipLevel:0,levelUpExp:1000,levelUpAward:"20051_1",desc:"无增益",name:"初始炮台",descVip:1,popDesc:1,makeUpConisTo:0,everydayAward:"0",grandPrix:0,limitAcitveAward:"0",limitAcitveCoinAward:"0",couponBuyAdditionRatioByType:"0",},
		{vipLevel:1,levelUpExp:5000,levelUpAward:"20052_1",desc:"每日登陆抽奖翻倍",name:"强袭飓风",descVip:2,popDesc:1,makeUpConisTo:0,everydayAward:"0",grandPrix:0,limitAcitveAward:"10002_20",limitAcitveCoinAward:"10013_10",couponBuyAdditionRatioByType:"0",},
		{vipLevel:2,levelUpExp:50000,levelUpAward:"20053_1",desc:"解锁好友赠送功能",name:"风暴之眼",descVip:3,popDesc:1,makeUpConisTo:0,everydayAward:"0",grandPrix:0,limitAcitveAward:"10002_30",limitAcitveCoinAward:"10013_20",couponBuyAdditionRatioByType:"0",},
		{vipLevel:3,levelUpExp:100000,levelUpAward:"20054_1",desc:"每日5次VIP幸运抽奖",name:"巨齿狂鲨",descVip:4,popDesc:1,makeUpConisTo:0,everydayAward:"0",grandPrix:0,limitAcitveAward:"10002_50",limitAcitveCoinAward:"10013_30",couponBuyAdditionRatioByType:"0",},
		{vipLevel:4,levelUpExp:500000,levelUpAward:"20055_1",desc:"解锁1级分身技能",name:"真灵玄武",descVip:5,popDesc:1,makeUpConisTo:0,everydayAward:"0",grandPrix:0,limitAcitveAward:"10002_80",limitAcitveCoinAward:"10013_40",couponBuyAdditionRatioByType:"1_10",},
		{vipLevel:5,levelUpExp:1200000,levelUpAward:"20056_1",desc:"解锁2级狂暴技能",name:"碧玉麒麟",descVip:6,popDesc:1,makeUpConisTo:0,everydayAward:"0",grandPrix:0,limitAcitveAward:"10002_100",limitAcitveCoinAward:"10013_50",couponBuyAdditionRatioByType:"1_20",},
		{vipLevel:6,levelUpExp:2000000,levelUpAward:"20057_1",desc:"解锁2级分身技能",name:"天使之翼",descVip:7,popDesc:1,makeUpConisTo:500000,everydayAward:"70001_5,70002_5,70003_5,70004_5",grandPrix:5,limitAcitveAward:"10002_150",limitAcitveCoinAward:"10013_60",couponBuyAdditionRatioByType:"1_20",},
		{vipLevel:7,levelUpExp:5000000,levelUpAward:"20058_1",desc:"提高击杀概率",name:"武装斗神",descVip:8,popDesc:1,makeUpConisTo:1000000,everydayAward:"70001_10,70002_10,70003_10,70004_10",grandPrix:7,limitAcitveAward:"10002_200",limitAcitveCoinAward:"10013_70",couponBuyAdditionRatioByType:"1_20",},
		{vipLevel:8,levelUpExp:0,levelUpAward:"0",desc:"高级VIP每日福利",name:"时空之轮",descVip:9,popDesc:-1,makeUpConisTo:2000000,everydayAward:"70001_15,70002_15,70003_15,70004_15",grandPrix:10,limitAcitveAward:"10002_300",limitAcitveCoinAward:"10013_80",couponBuyAdditionRatioByType:"1_20",},
		
	];
}