module game.table {

	export class T_GrandPrixRankRange {
		//id
		public id:number = 0;
		//房间类型
		public roomType:number = 0;
		//大奖赛名词范围
		public rangeMin:number = 0;
		//大奖赛名词范围
		public rangeMax:number = 0;
		//奖励
		public award:string = "";
	}

	export class T_GrandPrixRankRange_Table {
		public static getVoByKey(key:number):T_GrandPrixRankRange {
			var len = _T_GrandPrixRankRange_.length;
			let data: T_GrandPrixRankRange = SerchUtil.binary_search(_T_GrandPrixRankRange_, "id", 0, len, key);
			return data;
		}
		
		public static getAllVo():Array<T_GrandPrixRankRange> {
			return _T_GrandPrixRankRange_;
		}
	}

	const _T_GrandPrixRankRange_ = [
		{id:1,roomType:5,rangeMin:1,rangeMax:1,award:"50001_2",},
		{id:2,roomType:5,rangeMin:2,rangeMax:2,award:"50002_5",},
		{id:3,roomType:5,rangeMin:3,rangeMax:3,award:"50002_2",},
		{id:4,roomType:5,rangeMin:4,rangeMax:10,award:"10001_150000",},
		{id:5,roomType:5,rangeMin:11,rangeMax:20,award:"10001_100000",},
		{id:6,roomType:5,rangeMin:21,rangeMax:50,award:"10002_100",},
		{id:7,roomType:5,rangeMin:51,rangeMax:100,award:"10002_50",},
		{id:8,roomType:5,rangeMin:101,rangeMax:200,award:"40001_20",},
		{id:9,roomType:6,rangeMin:1,rangeMax:1,award:"50001_80",},
		{id:9,roomType:99,rangeMin:1,rangeMax:1,award:"10001_30000000",},
		{id:10,roomType:6,rangeMin:2,rangeMax:2,award:"50001_40",},
		{id:10,roomType:99,rangeMin:2,rangeMax:2,award:"10001_20000000",},
		{id:11,roomType:6,rangeMin:3,rangeMax:3,award:"50001_20",},
		{id:11,roomType:99,rangeMin:3,rangeMax:3,award:"10001_1000000",},
		{id:12,roomType:6,rangeMin:4,rangeMax:10,award:"50001_10",},
		{id:12,roomType:99,rangeMin:4,rangeMax:10,award:"10001_5000000",},
		{id:13,roomType:6,rangeMin:11,rangeMax:20,award:"50001_5",},
		{id:13,roomType:99,rangeMin:11,rangeMax:20,award:"10001_2000000",},
		{id:14,roomType:6,rangeMin:21,rangeMax:50,award:"50001_3",},
		{id:14,roomType:99,rangeMin:21,rangeMax:50,award:"10001_1000000",},
		{id:15,roomType:6,rangeMin:51,rangeMax:100,award:"50002_5",},
		{id:15,roomType:99,rangeMin:51,rangeMax:100,award:"10001_500000",},
		{id:16,roomType:6,rangeMin:101,rangeMax:200,award:"50002_3",},
		{id:16,roomType:99,rangeMin:101,rangeMax:200,award:"10001_250000",},
		
	];
}