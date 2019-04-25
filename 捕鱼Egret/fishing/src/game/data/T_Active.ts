module game.table {

	export class T_Active {
		//活动ID
		public id:number = 0;
		//活动类别
		public type:number = 0;
		//特权描述
		public descVip:string = "";
		//名称Url
		public nameUrl:string = "";
	}

	export class T_Active_Table {
		public static getVoByKey(key:number):T_Active {
			var len = _T_Active_.length;
			let data: T_Active = SerchUtil.binary_search(_T_Active_, "id", 0, len, key);
			return data;
		}
		
		public static getAllVo():Array<T_Active> {
			return _T_Active_;
		}
	}

	const _T_Active_ = [
		{id:1,type:1,descVip:"xx1",nameUrl:"active_dian",},
		{id:2,type:2,descVip:"xx2",nameUrl:"active_song",},
		{id:3,type:3,descVip:"xx3",nameUrl:"active_song_li",},
		{id:4,type:4,descVip:"xx4",nameUrl:"active_song_ling",},
		
	];
}