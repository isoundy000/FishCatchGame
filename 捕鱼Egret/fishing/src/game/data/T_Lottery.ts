module game.table {

	export class T_Lottery {
		//抽奖id
		public id:number = 0;
		//名称
		public name:number = 0;
		//奖池积分
		public integral:number = 0;
		//奖励1
		public award1:string = "";
		//奖励2
		public award2:string = "";
		//奖励3
		public award3:string = "";
		//奖励4
		public award4:string = "";
		//奖励5
		public award5:string = "";
		//奖励6
		public award6:string = "";
	}

	export class T_Lottery_Table {
		public static getVoByKey(key:number):T_Lottery {
			var len = _T_Lottery_.length;
			let data: T_Lottery = SerchUtil.binary_search(_T_Lottery_, "id", 0, len, key);
			return data;
		}
		
		public static getAllVo():Array<T_Lottery> {
			return _T_Lottery_;
		}
	}

	const _T_Lottery_ = [
		{id:1,name:2416,integral:100,award1:"30002_2_1250",award2:"10002_10_5000",award3:"10002_5_2500",award4:"10001_600_600",award5:"10001_300_300",award6:"10001_100_100",},
		{id:2,name:2417,integral:20000,award1:"30002_15_9375",award2:"10002_100_50000",award3:"10002_50_25000",award4:"10001_50000_50000",award5:"10001_24000_24000",award6:"10001_8000_8000",},
		{id:3,name:2418,integral:100000,award1:"30002_30_18750",award2:"50002_2_450000",award3:"10002_150_75000",award4:"10001_250000_250000",award5:"10001_120000_120000",award6:"10001_40000_40000",},
		{id:4,name:2419,integral:200000,award1:"30002_70_43750",award2:"50001_1_750000",award3:"10002_300_150000",award4:"10001_500000_500000",award5:"10001_240000_240000",award6:"10001_80000_80000",},
		{id:5,name:2420,integral:400000,award1:"30002_150_93750",award2:"50001_2_1500000",award3:"10002_500_250000",award4:"10001_1000000_1000000",award5:"10001_480000_480000",award6:"10001_160000_160000",},
		{id:6,name:2421,integral:1200000,award1:"30002_450_281250",award2:"50001_6_4500000",award3:"10002_800_400000",award4:"10001_3000000_3000000",award5:"10001_1440000_1440000",award6:"10001_480000_480000",},
		
	];
}