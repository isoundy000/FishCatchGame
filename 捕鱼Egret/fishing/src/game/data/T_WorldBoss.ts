module game.table {

	export class T_WorldBoss {
		//BOSSID
		public id:number = 0;
		//鱼ID
		public fishId:number = 0;
	}

	export class T_WorldBoss_Table {
		public static getVoByKey(key:number):T_WorldBoss {
			var len = _T_WorldBoss_.length;
			let data: T_WorldBoss = SerchUtil.binary_search(_T_WorldBoss_, "id", 0, len, key);
			return data;
		}
		
		public static getAllVo():Array<T_WorldBoss> {
			return _T_WorldBoss_;
		}
	}

	const _T_WorldBoss_ = [
		{id:1,fishId:201,},
		
	];
}