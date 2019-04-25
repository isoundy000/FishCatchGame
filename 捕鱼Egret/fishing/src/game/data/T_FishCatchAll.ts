module game.table {

	export class T_FishCatchAll {
		//一网打尽ID
		public id:number = 0;
		//一网打尽名称
		public name:number = 0;
		//一网打尽里鱼的id
		public fishIds:string = "";
		//路线ID
		public moves:string = "";
	}

	export class T_FishCatchAll_Table {
		public static getVoByKey(key:number):T_FishCatchAll {
			var len = _T_FishCatchAll_.length;
			let data: T_FishCatchAll = SerchUtil.binary_search(_T_FishCatchAll_, "id", 0, len, key);
			return data;
		}
		
		public static getAllVo():Array<T_FishCatchAll> {
			return _T_FishCatchAll_;
		}
	}

	const _T_FishCatchAll_ = [
		{id:1,name:2219,fishIds:"29,30,35,36,37,38,39",moves:"102901,102902,102903,102904,102910,102911,102912",},
		
	];
}