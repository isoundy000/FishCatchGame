module game.table {

	export class T_Desc {
		//子弹id
		public id:number = 0;
		//描述宽高
		public descW_H:string = "";
		//特权描述
		public descVip:number = 0;
	}

	export class T_Desc_Table {
		public static getVoByKey(key:number):T_Desc {
			var len = _T_Desc_.length;
			let data: T_Desc = SerchUtil.binary_search(_T_Desc_, "id", 0, len, key);
			return data;
		}
		
		public static getAllVo():Array<T_Desc> {
			return _T_Desc_;
		}
	}

	const _T_Desc_ = [
		{id:1,descW_H:"400_150",descVip:2323,},
		{id:2,descW_H:"420_120",descVip:2324,},
		{id:3,descW_H:"420_220",descVip:2325,},
		{id:4,descW_H:"420_220",descVip:2326,},
		{id:5,descW_H:"420_270",descVip:2327,},
		{id:6,descW_H:"420_270",descVip:2328,},
		{id:7,descW_H:"420_280",descVip:2329,},
		{id:8,descW_H:"420_280",descVip:2330,},
		{id:9,descW_H:"420_280",descVip:2331,},
		
	];
}