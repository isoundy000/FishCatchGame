module game.table {

	export class T_Shop {
		//id
		public id:number = 0;
		//商城类别
		public shopType:number = 0;
		//道具ID
		public itemId:number = 0;
		//道具数量
		public num:number = 0;
		//价格
		public price:string = "";
		//有效期
		public validPeriod:number = 0;
	}

	export class T_Shop_Table {
		public static getVoByKey(key:number):T_Shop {
			var len = _T_Shop_.length;
			let data: T_Shop = SerchUtil.binary_search(_T_Shop_, "id", 0, len, key);
			return data;
		}
		
		public static getAllVo():Array<T_Shop> {
			return _T_Shop_;
		}
	}

	const _T_Shop_ = [
		{id:1,shopType:1,itemId:20001,num:1,price:"10012_600",validPeriod:720,},
		{id:2,shopType:1,itemId:20006,num:1,price:"10012_600",validPeriod:720,},
		{id:3,shopType:1,itemId:20005,num:1,price:"10012_600",validPeriod:720,},
		{id:4,shopType:1,itemId:20004,num:1,price:"10012_600",validPeriod:720,},
		{id:5,shopType:3,itemId:40001,num:100,price:"10002_50",validPeriod:0,},
		{id:6,shopType:3,itemId:40002,num:40,price:"10002_50",validPeriod:0,},
		{id:7,shopType:3,itemId:40003,num:100,price:"10002_50",validPeriod:0,},
		{id:8,shopType:2,itemId:80001,num:1,price:"10012_300",validPeriod:720,},
		{id:9,shopType:2,itemId:80002,num:1,price:"10012_300",validPeriod:720,},
		{id:10,shopType:2,itemId:80003,num:1,price:"10012_300",validPeriod:720,},
		{id:11,shopType:3,itemId:40004,num:10,price:"10002_50",validPeriod:0,},
		{id:12,shopType:3,itemId:40005,num:10,price:"10002_50",validPeriod:0,},
		{id:13,shopType:3,itemId:70001,num:10,price:"10012_25",validPeriod:0,},
		{id:14,shopType:3,itemId:70002,num:10,price:"10012_25",validPeriod:0,},
		{id:15,shopType:3,itemId:70003,num:10,price:"10012_25",validPeriod:0,},
		{id:16,shopType:3,itemId:70004,num:10,price:"10012_25",validPeriod:0,},
		
	];
}