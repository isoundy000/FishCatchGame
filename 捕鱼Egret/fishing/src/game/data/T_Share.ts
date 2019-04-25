module game.table {

	export class T_Share {
		//id
		public id:number = 0;
		//类型
		public type:number = 0;
		//参数
		public parameter:number = 0;
		//说明
		public dec:string = "";
		//奖励
		public award:string = "";
	}

	export class T_Share_Table {
		public static getVoByKey(key:number):T_Share {
			var len = _T_Share_.length;
			let data: T_Share = SerchUtil.binary_search(_T_Share_, "id", 0, len, key);
			return data;
		}
		
		public static getAllVo():Array<T_Share> {
			return _T_Share_;
		}
	}

	const _T_Share_ = [
		{id:101,type:1,parameter:30,dec:"2426",award:"10001_5000",},
		{id:102,type:1,parameter:300,dec:"2427",award:"10002_100",},
		{id:201,type:2,parameter:0,dec:"2428",award:"30002_10",},
		{id:301,type:3,parameter:50,dec:"2429",award:"30002_50",},
		{id:302,type:3,parameter:100,dec:"2430",award:"30002_100",},
		
	];
}