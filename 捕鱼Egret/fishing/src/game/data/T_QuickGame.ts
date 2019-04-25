module game.table {

	export class T_QuickGame {
		//场次id
		public id:number = 0;
		//入场费
		public admissionFee:string = "";
		//炮倍限制
		public minGunId:number = 0;
		//第1名
		public theFirst:string = "";
		//第2名
		public theSecond:string = "";
		//第3名
		public theThird:string = "";
	}

	export class T_QuickGame_Table {
		public static getVoByKey(key:number):T_QuickGame {
			var len = _T_QuickGame_.length;
			let data: T_QuickGame = SerchUtil.binary_search(_T_QuickGame_, "id", 0, len, key);
			return data;
		}
		
		public static getAllVo():Array<T_QuickGame> {
			return _T_QuickGame_;
		}
	}

	const _T_QuickGame_ = [
		{id:7,admissionFee:"10001_2000",minGunId:1,theFirst:"10001_8000",theSecond:"10001_4000",theThird:"10001_2400",},
		{id:8,admissionFee:"10001_12500",minGunId:1,theFirst:"10001_50000",theSecond:"10001_25000",theThird:"10001_15000",},
		{id:9,admissionFee:"10001_125000",minGunId:1,theFirst:"50001_1",theSecond:"10001_250000",theThird:"10001_150000",},
		{id:10,admissionFee:"10001_500000",minGunId:1,theFirst:"50001_4",theSecond:"10001_1000000",theThird:"10001_600000",},
		
	];
}