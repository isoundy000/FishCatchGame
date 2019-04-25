module game.table {

	export class T_Gun {
		//id
		public id:number = 0;
		//炮台类型
		public type:number = 0;
		//炮台倍数
		public bulletNum:number = 0;
		//解锁/锻造消耗
		public upgradeOrForgeCost:string = "";
		//解锁/锻造奖励
		public upgradeOrForgeAward:string = "";
		//锻造还需消耗
		public forgeSuccessAlsoCost:string = "";
		//炮台能力1类型
		public abilityType1:number = 0;
		//炮台能力1
		public gunAbility1:number = 0;
	}

	export class T_Gun_Table {
		public static getVoByKey(key:number):T_Gun {
			var len = _T_Gun_.length;
			let data: T_Gun = SerchUtil.binary_search(_T_Gun_, "id", 0, len, key);
			return data;
		}
		
		public static getAllVo():Array<T_Gun> {
			return _T_Gun_;
		}
	}

	const _T_Gun_ = [
		{id:1,type:1,bulletNum:1,upgradeOrForgeCost:"10002_2",upgradeOrForgeAward:"10001_100",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:2,type:1,bulletNum:2,upgradeOrForgeCost:"10002_2",upgradeOrForgeAward:"10001_100",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:3,type:1,bulletNum:3,upgradeOrForgeCost:"10002_2",upgradeOrForgeAward:"10001_100",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:4,type:1,bulletNum:4,upgradeOrForgeCost:"10002_3",upgradeOrForgeAward:"10001_150",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:5,type:1,bulletNum:5,upgradeOrForgeCost:"10002_5",upgradeOrForgeAward:"10001_200",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:6,type:1,bulletNum:6,upgradeOrForgeCost:"10002_5",upgradeOrForgeAward:"10001_200",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:7,type:1,bulletNum:7,upgradeOrForgeCost:"10002_5",upgradeOrForgeAward:"10001_200",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:8,type:1,bulletNum:8,upgradeOrForgeCost:"10002_5",upgradeOrForgeAward:"10001_200",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:9,type:1,bulletNum:9,upgradeOrForgeCost:"10002_8",upgradeOrForgeAward:"10001_500",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:10,type:1,bulletNum:10,upgradeOrForgeCost:"10002_8",upgradeOrForgeAward:"10001_1000",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:11,type:1,bulletNum:15,upgradeOrForgeCost:"10002_8",upgradeOrForgeAward:"10001_1000",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:12,type:1,bulletNum:20,upgradeOrForgeCost:"10002_8",upgradeOrForgeAward:"10001_2000",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:13,type:1,bulletNum:25,upgradeOrForgeCost:"10002_8",upgradeOrForgeAward:"10001_2000",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:14,type:1,bulletNum:30,upgradeOrForgeCost:"10002_10",upgradeOrForgeAward:"10001_3000",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:15,type:1,bulletNum:35,upgradeOrForgeCost:"10002_10",upgradeOrForgeAward:"10001_3000",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:16,type:1,bulletNum:40,upgradeOrForgeCost:"10002_10",upgradeOrForgeAward:"10001_5000",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:17,type:1,bulletNum:45,upgradeOrForgeCost:"10002_10",upgradeOrForgeAward:"10001_5000",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:18,type:1,bulletNum:50,upgradeOrForgeCost:"10002_20",upgradeOrForgeAward:"10001_6000",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:19,type:1,bulletNum:60,upgradeOrForgeCost:"10002_20",upgradeOrForgeAward:"10001_6000",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:20,type:1,bulletNum:70,upgradeOrForgeCost:"10002_20",upgradeOrForgeAward:"10001_7000",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:21,type:1,bulletNum:80,upgradeOrForgeCost:"10002_20",upgradeOrForgeAward:"10001_7000",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:22,type:1,bulletNum:90,upgradeOrForgeCost:"10002_20",upgradeOrForgeAward:"10001_8000",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:23,type:1,bulletNum:100,upgradeOrForgeCost:"10002_30",upgradeOrForgeAward:"10001_8000",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:24,type:1,bulletNum:150,upgradeOrForgeCost:"10002_40",upgradeOrForgeAward:"10001_10000",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:25,type:1,bulletNum:200,upgradeOrForgeCost:"10002_50",upgradeOrForgeAward:"10001_10000",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:26,type:1,bulletNum:250,upgradeOrForgeCost:"10002_60",upgradeOrForgeAward:"10001_15000",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:27,type:1,bulletNum:300,upgradeOrForgeCost:"10002_70",upgradeOrForgeAward:"10001_15000",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:28,type:1,bulletNum:350,upgradeOrForgeCost:"10002_80",upgradeOrForgeAward:"10001_15000",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:29,type:1,bulletNum:400,upgradeOrForgeCost:"10002_90",upgradeOrForgeAward:"10001_20000",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:30,type:1,bulletNum:450,upgradeOrForgeCost:"10002_100",upgradeOrForgeAward:"10001_30000",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:31,type:1,bulletNum:500,upgradeOrForgeCost:"10002_150",upgradeOrForgeAward:"10001_40000",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:32,type:1,bulletNum:600,upgradeOrForgeCost:"10002_200",upgradeOrForgeAward:"10001_50000",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:33,type:1,bulletNum:700,upgradeOrForgeCost:"10002_250",upgradeOrForgeAward:"10001_60000",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:34,type:1,bulletNum:800,upgradeOrForgeCost:"10002_300",upgradeOrForgeAward:"10001_70000",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:35,type:1,bulletNum:900,upgradeOrForgeCost:"10002_500",upgradeOrForgeAward:"10001_100000",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		{id:36,type:1,bulletNum:1000,upgradeOrForgeCost:"70001_10,70002_10,70003_10,70004_10",upgradeOrForgeAward:"0",forgeSuccessAlsoCost:"70005_100",abilityType1:null,gunAbility1:null,},
		{id:37,type:2,bulletNum:1500,upgradeOrForgeCost:"70001_10,70002_10,70003_10,70004_10",upgradeOrForgeAward:"0",forgeSuccessAlsoCost:"70005_200",abilityType1:null,gunAbility1:null,},
		{id:38,type:2,bulletNum:2000,upgradeOrForgeCost:"70001_10,70002_10,70003_10,70004_10",upgradeOrForgeAward:"0",forgeSuccessAlsoCost:"70005_300",abilityType1:null,gunAbility1:null,},
		{id:39,type:2,bulletNum:2500,upgradeOrForgeCost:"70001_10,70002_10,70003_10,70004_10",upgradeOrForgeAward:"0",forgeSuccessAlsoCost:"70005_400",abilityType1:null,gunAbility1:null,},
		{id:40,type:2,bulletNum:3000,upgradeOrForgeCost:"70001_10,70002_10,70003_10,70004_10",upgradeOrForgeAward:"0",forgeSuccessAlsoCost:"70005_500",abilityType1:null,gunAbility1:null,},
		{id:41,type:2,bulletNum:3500,upgradeOrForgeCost:"70001_10,70002_10,70003_10,70004_10",upgradeOrForgeAward:"0",forgeSuccessAlsoCost:"70005_600",abilityType1:null,gunAbility1:null,},
		{id:42,type:2,bulletNum:4000,upgradeOrForgeCost:"70001_10,70002_10,70003_10,70004_10",upgradeOrForgeAward:"0",forgeSuccessAlsoCost:"70005_700",abilityType1:null,gunAbility1:null,},
		{id:43,type:2,bulletNum:4500,upgradeOrForgeCost:"70001_10,70002_10,70003_10,70004_10",upgradeOrForgeAward:"0",forgeSuccessAlsoCost:"70005_800",abilityType1:null,gunAbility1:null,},
		{id:44,type:2,bulletNum:5000,upgradeOrForgeCost:"70001_10,70002_10,70003_10,70004_10",upgradeOrForgeAward:"0",forgeSuccessAlsoCost:"70005_900",abilityType1:null,gunAbility1:null,},
		{id:45,type:2,bulletNum:5500,upgradeOrForgeCost:"70001_10,70002_10,70003_10,70004_10",upgradeOrForgeAward:"0",forgeSuccessAlsoCost:"70005_1000",abilityType1:null,gunAbility1:null,},
		{id:46,type:2,bulletNum:6000,upgradeOrForgeCost:"70001_10,70002_10,70003_10,70004_10",upgradeOrForgeAward:"0",forgeSuccessAlsoCost:"70005_1100",abilityType1:null,gunAbility1:null,},
		{id:47,type:2,bulletNum:6500,upgradeOrForgeCost:"70001_10,70002_10,70003_10,70004_10",upgradeOrForgeAward:"0",forgeSuccessAlsoCost:"70005_1200",abilityType1:null,gunAbility1:null,},
		{id:48,type:2,bulletNum:7000,upgradeOrForgeCost:"70001_10,70002_10,70003_10,70004_10",upgradeOrForgeAward:"0",forgeSuccessAlsoCost:"70005_1300",abilityType1:null,gunAbility1:null,},
		{id:49,type:2,bulletNum:7500,upgradeOrForgeCost:"70001_10,70002_10,70003_10,70004_10",upgradeOrForgeAward:"0",forgeSuccessAlsoCost:"70005_1400",abilityType1:null,gunAbility1:null,},
		{id:50,type:2,bulletNum:8000,upgradeOrForgeCost:"70001_10,70002_10,70003_10,70004_10",upgradeOrForgeAward:"0",forgeSuccessAlsoCost:"70005_1500",abilityType1:null,gunAbility1:null,},
		{id:51,type:2,bulletNum:8500,upgradeOrForgeCost:"70001_10,70002_10,70003_10,70004_10",upgradeOrForgeAward:"0",forgeSuccessAlsoCost:"70005_1600",abilityType1:null,gunAbility1:null,},
		{id:52,type:2,bulletNum:9000,upgradeOrForgeCost:"70001_10,70002_10,70003_10,70004_10",upgradeOrForgeAward:"0",forgeSuccessAlsoCost:"70005_1700",abilityType1:null,gunAbility1:null,},
		{id:53,type:2,bulletNum:9500,upgradeOrForgeCost:"70001_10,70002_10,70003_10,70004_10",upgradeOrForgeAward:"0",forgeSuccessAlsoCost:"70005_1800",abilityType1:null,gunAbility1:null,},
		{id:54,type:2,bulletNum:10000,upgradeOrForgeCost:"0",upgradeOrForgeAward:"0",forgeSuccessAlsoCost:"0",abilityType1:null,gunAbility1:null,},
		
	];
}