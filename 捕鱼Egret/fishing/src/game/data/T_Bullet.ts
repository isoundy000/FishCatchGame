module game.table {

	export class T_Bullet {
		//子弹id
		public id:number = 0;
		//鱼类型
		public type:number = 0;
		//图片
		public resUrl:string = "";
	}

	export class T_Bullet_Table {
		public static getVoByKey(key:number):T_Bullet {
			var len = _T_Bullet_.length;
			let data: T_Bullet = SerchUtil.binary_search(_T_Bullet_, "id", 0, len, key);
			return data;
		}
		
		public static getAllVo():Array<T_Bullet> {
			return _T_Bullet_;
		}
	}

	const _T_Bullet_ = [
		{id:1,type:1,resUrl:"bullet_png",},
		{id:2,type:2,resUrl:"bullet_rage_png",},
		{id:1001,type:1001,resUrl:"JiXie_ZiDan_png",},
		{id:1002,type:1002,resUrl:"JiXie_KuangBao_png",},
		{id:1011,type:1011,resUrl:"Lv_ZiDan_png",},
		{id:1012,type:1012,resUrl:"Lv_KuangBao_png",},
		{id:1021,type:1021,resUrl:"Nu_ZiDan_png",},
		{id:1022,type:1022,resUrl:"Nu_KuangBao_png",},
		{id:1031,type:1031,resUrl:"Xin_ZiDan_png",},
		{id:1032,type:1032,resUrl:"Xin_KuangBao_png",},
		{id:1041,type:1041,resUrl:"ZhangYu_ZiDan_png",},
		{id:1042,type:1042,resUrl:"ZhangYu_KuangBao_png",},
		{id:1051,type:1051,resUrl:"BoLi_ZiDan_png",},
		{id:1052,type:1052,resUrl:"BoLi_KuangBao_png",},
		
	];
}