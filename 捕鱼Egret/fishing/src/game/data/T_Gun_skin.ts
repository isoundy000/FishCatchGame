module game.table {

	export class T_Gun_skin {
		//皮肤id
		public id:number = 0;
		//普通子弹ID
		public bulletId:number = 0;
		//狂暴子弹ID
		public rageBulletId:number = 0;
		//贴图
		public resUrl:string = "";
		//分身贴图
		public resCloneUrl:string = "";
		//底座
		public zuoUrl:string = "";
		//转盘
		public caipanUrl:string = "";
		//锚点
		public anchor:string = "";
		//枪口位置
		public gunPos:string = "";
		//枪口特效
		public effGun:string = "";
		//狂暴特效
		public effRage:string = "";
		//星级
		public star:number = 0;
		//渔网
		public net:number = 0;
	}

	export class T_Gun_skin_Table {
		public static getVoByKey(key:number):T_Gun_skin {
			var len = _T_Gun_skin_.length;
			let data: T_Gun_skin = SerchUtil.binary_search(_T_Gun_skin_, "id", 0, len, key);
			return data;
		}
		
		public static getAllVo():Array<T_Gun_skin> {
			return _T_Gun_skin_;
		}
	}

	const _T_Gun_skin_ = [
		{id:20000,bulletId:1,rageBulletId:2,resUrl:"gun_png",resCloneUrl:"rageGun_png",zuoUrl:"gunBgsicon_20000_png",caipanUrl:"caipan_20000_png",anchor:"0_15",gunPos:"76_90",effGun:"1",effRage:"2",star:3,net:1,},
		{id:20001,bulletId:1021,rageBulletId:1022,resUrl:"gun_png",resCloneUrl:"rageGun_png",zuoUrl:"gunBgsicon_20001_png",caipanUrl:"caipan_20000_png",anchor:"0_15",gunPos:"76_90",effGun:"1",effRage:"2",star:1,net:4,},
		{id:20002,bulletId:1011,rageBulletId:1012,resUrl:"gun_png",resCloneUrl:"rageGun_png",zuoUrl:"gunBgsicon_20002_png",caipanUrl:"caipan_20000_png",anchor:"0_15",gunPos:"76_90",effGun:"1",effRage:"2",star:2,net:3,},
		{id:20003,bulletId:1001,rageBulletId:1002,resUrl:"gun_png",resCloneUrl:"rageGun_png",zuoUrl:"gunBgsicon_20003_png",caipanUrl:"caipan_20000_png",anchor:"0_15",gunPos:"76_90",effGun:"1",effRage:"2",star:1,net:1,},
		{id:20004,bulletId:1051,rageBulletId:1052,resUrl:"gun_png",resCloneUrl:"rageGun_png",zuoUrl:"gunBgsicon_20004_png",caipanUrl:"caipan_20004_png",anchor:"0_15",gunPos:"76_90",effGun:"1",effRage:"2",star:4,net:2,},
		{id:20005,bulletId:1041,rageBulletId:1042,resUrl:"gun_png",resCloneUrl:"rageGun_png",zuoUrl:"gunBgsicon_20005_png",caipanUrl:"caipan_20005_png",anchor:"0_15",gunPos:"76_90",effGun:"1",effRage:"2",star:5,net:6,},
		{id:20006,bulletId:1031,rageBulletId:1032,resUrl:"gun_png",resCloneUrl:"rageGun_png",zuoUrl:"gunBgsicon_20006_png",caipanUrl:"caipan_20006_png",anchor:"0_15",gunPos:"76_90",effGun:"1",effRage:"2",star:5,net:5,},
		{id:20051,bulletId:1,rageBulletId:2,resUrl:"gun_png",resCloneUrl:"rageGun_png",zuoUrl:"gunBgsicon_20000_png",caipanUrl:"caipan_20000_png",anchor:"0_15",gunPos:"76_90",effGun:"1",effRage:"2",star:1,net:3,},
		{id:20052,bulletId:1,rageBulletId:2,resUrl:"gun_png",resCloneUrl:"rageGun_png",zuoUrl:"gunBgsicon_20000_png",caipanUrl:"caipan_20000_png",anchor:"0_15",gunPos:"76_90",effGun:"1",effRage:"2",star:2,net:3,},
		{id:20053,bulletId:1,rageBulletId:2,resUrl:"gun_png",resCloneUrl:"rageGun_png",zuoUrl:"gunBgsicon_20000_png",caipanUrl:"caipan_20000_png",anchor:"0_15",gunPos:"76_90",effGun:"1",effRage:"2",star:2,net:3,},
		{id:20054,bulletId:1,rageBulletId:2,resUrl:"gun_png",resCloneUrl:"rageGun_png",zuoUrl:"gunBgsicon_20000_png",caipanUrl:"caipan_20000_png",anchor:"0_15",gunPos:"76_90",effGun:"1",effRage:"2",star:3,net:3,},
		{id:20055,bulletId:1,rageBulletId:2,resUrl:"gun_png",resCloneUrl:"rageGun_png",zuoUrl:"gunBgsicon_20000_png",caipanUrl:"caipan_20000_png",anchor:"0_15",gunPos:"76_90",effGun:"1",effRage:"2",star:3,net:3,},
		{id:20056,bulletId:1,rageBulletId:2,resUrl:"gun_png",resCloneUrl:"rageGun_png",zuoUrl:"gunBgsicon_20000_png",caipanUrl:"caipan_20000_png",anchor:"0_15",gunPos:"76_90",effGun:"1",effRage:"2",star:4,net:3,},
		{id:20057,bulletId:1,rageBulletId:2,resUrl:"gun_png",resCloneUrl:"rageGun_png",zuoUrl:"gunBgsicon_20000_png",caipanUrl:"caipan_20000_png",anchor:"0_15",gunPos:"76_90",effGun:"1",effRage:"2",star:4,net:3,},
		{id:20058,bulletId:1,rageBulletId:2,resUrl:"gun_png",resCloneUrl:"rageGun_png",zuoUrl:"gunBgsicon_20000_png",caipanUrl:"caipan_20000_png",anchor:"0_15",gunPos:"76_90",effGun:"1",effRage:"2",star:5,net:3,},
		
	];
}