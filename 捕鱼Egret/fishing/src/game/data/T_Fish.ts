module game.table {

	export class T_Fish {
		//鱼id
		public id:number = 0;
		//鱼名称
		public name:number = 0;
		//鱼类型
		public type:number = 0;
		//音效资源
		public sound:string = "";
		//游泳资源
		public resRunUrl:string = "";
		//功能类型
		public functionType:number = 0;
		//倍率
		public score:number = 0;
		//葫芦专用移动路线
		public calabashMove:string = "";
		//底盘类型
		public chassis:number = 0;
		//底盘坐标
		public chassis_pos:string = "";
		//组合id
		public groupId:number = 0;
		//鱼动作帧频
		public frameRate:number = 0;
		//鱼种图标
		public fishkindIcon:number = 0;
		//属于哪个房间
		public containRoomId:string = "";
		//鱼种显示品质
		public quality:number = 0;
		//锁定点
		public posLocked:string = "";
		//鱼死亡表现
		public deadType:number = 0;
		//鱼显示宽高
		public showWH:string = "";
		//鱼受击表现
		public Matrix:number = 0;
		//鱼所在层级
		public layer:number = 0;
		//缓存池数量
		public cacheNum:number = 0;
	}

	export class T_Fish_Table {
		public static getVoByKey(key:number):T_Fish {
			var len = _T_Fish_.length;
			let data: T_Fish = SerchUtil.binary_search(_T_Fish_, "id", 0, len, key);
			return data;
		}
		
		public static getAllVo():Array<T_Fish> {
			return _T_Fish_;
		}
	}

	const _T_Fish_ = [
		{id:1,name:2112,type:2,sound:"YouCanGentle",resRunUrl:"meirenyu",functionType:6,score:3000,calabashMove:"0",chassis:0,chassis_pos:"null",groupId:0,frameRate:5,fishkindIcon:1001,containRoomId:"1,5",quality:2,posLocked:"134,11",deadType:6,showWH:"258_102",Matrix:1,layer:3,cacheNum:0,},
		{id:2,name:2113,type:2,sound:"GodYouGetRich",resRunUrl:"jinlong",functionType:6,score:1500,calabashMove:"30201",chassis:0,chassis_pos:"null",groupId:0,frameRate:5,fishkindIcon:1002,containRoomId:"3,1,5",quality:2,posLocked:"165,-40",deadType:3,showWH:"368_94",Matrix:1,layer:3,cacheNum:0,},
		{id:3,name:2114,type:2,sound:"YouCanGentle",resRunUrl:"huangjinzhangyuwang",functionType:6,score:500,calabashMove:"100301,100302",chassis:0,chassis_pos:"25,55",groupId:0,frameRate:5,fishkindIcon:1003,containRoomId:"3,1,5",quality:2,posLocked:"-8,-43",deadType:3,showWH:"173_179",Matrix:1,layer:3,cacheNum:0,},
		{id:4,name:2115,type:1,sound:"ThisIsBeginning",resRunUrl:"sunwukong",functionType:2,score:600,calabashMove:"100401,100402,100403,100404",chassis:0,chassis_pos:"null",groupId:0,frameRate:8,fishkindIcon:1004,containRoomId:"3,1,5",quality:2,posLocked:"30,-10",deadType:3,showWH:"123_156",Matrix:1,layer:3,cacheNum:0,},
		{id:6,name:2116,type:1,sound:"Notlike",resRunUrl:"haimawang",functionType:2,score:500,calabashMove:"30601",chassis:0,chassis_pos:"null",groupId:0,frameRate:8,fishkindIcon:1006,containRoomId:"null",quality:2,posLocked:"27,-4",deadType:3,showWH:"133_131",Matrix:1,layer:3,cacheNum:0,},
		{id:7,name:2117,type:1,sound:"HowCanthisBe",resRunUrl:"hetunwang",functionType:2,score:400,calabashMove:"30701",chassis:0,chassis_pos:"null",groupId:0,frameRate:5,fishkindIcon:1007,containRoomId:"3,1,5",quality:2,posLocked:"34,-32",deadType:3,showWH:"108_94",Matrix:1,layer:3,cacheNum:0,},
		{id:8,name:2118,type:1,sound:"YouCanGentle",resRunUrl:"jinchanchu",functionType:2,score:400,calabashMove:"30801",chassis:0,chassis_pos:"null",groupId:0,frameRate:4,fishkindIcon:1008,containRoomId:"2,3,1,4,5,6,7",quality:2,posLocked:"20,-45",deadType:5,showWH:"161_121",Matrix:1,layer:3,cacheNum:0,},
		{id:10,name:2119,type:1,sound:"ThisIsBeginning",resRunUrl:"yinlong",functionType:2,score:300,calabashMove:"31001",chassis:0,chassis_pos:"100,100",groupId:0,frameRate:5,fishkindIcon:1010,containRoomId:"2,4,6,7",quality:2,posLocked:"143,-41",deadType:3,showWH:"364_93",Matrix:1,layer:3,cacheNum:0,},
		{id:11,name:2120,type:1,sound:"Notlike",resRunUrl:"zhangyuwang",functionType:2,score:300,calabashMove:"31101",chassis:0,chassis_pos:"null",groupId:0,frameRate:5,fishkindIcon:1011,containRoomId:"2,4,6,7",quality:2,posLocked:"24,-54",deadType:3,showWH:"124_129",Matrix:1,layer:3,cacheNum:0,},
		{id:12,name:2121,type:1,sound:"AHey",resRunUrl:"null",functionType:2,score:260,calabashMove:"101203",chassis:0,chassis_pos:"null",groupId:1001,frameRate:5,fishkindIcon:1012,containRoomId:"2,3,1,4,5,6,7",quality:2,posLocked:"10,12",deadType:3,showWH:"172_76",Matrix:1,layer:3,cacheNum:3,},
		{id:13,name:2122,type:1,sound:"GodYouGetRich",resRunUrl:"jinlongyu",functionType:2,score:250,calabashMove:"31301",chassis:0,chassis_pos:"null",groupId:0,frameRate:4,fishkindIcon:1013,containRoomId:"2,3,1,4,5,6,7",quality:2,posLocked:"75,-45",deadType:3,showWH:"200_85",Matrix:1,layer:3,cacheNum:3,},
		{id:14,name:2123,type:1,sound:"WhoWhoNot",resRunUrl:"null",functionType:2,score:220,calabashMove:"31401",chassis:0,chassis_pos:"null",groupId:1002,frameRate:5,fishkindIcon:1014,containRoomId:"2,3,1,4,5,6,7",quality:2,posLocked:"10,-1",deadType:3,showWH:"172_76",Matrix:1,layer:3,cacheNum:3,},
		{id:15,name:2124,type:1,sound:"YouCanGentle",resRunUrl:"null",functionType:2,score:220,calabashMove:"101501",chassis:0,chassis_pos:"null",groupId:1003,frameRate:5,fishkindIcon:1015,containRoomId:"2,3,1,4,5,6,7",quality:2,posLocked:"10,-5",deadType:3,showWH:"172_76",Matrix:1,layer:3,cacheNum:3,},
		{id:16,name:2125,type:1,sound:"ThisIsBeginning",resRunUrl:"null",functionType:2,score:200,calabashMove:"31601",chassis:0,chassis_pos:"null",groupId:1004,frameRate:5,fishkindIcon:1016,containRoomId:"2,3,1,4,5,6,7",quality:2,posLocked:"20,0",deadType:3,showWH:"172_76",Matrix:1,layer:3,cacheNum:3,},
		{id:17,name:2126,type:1,sound:"Notlike",resRunUrl:"huangjinshuimu",functionType:2,score:200,calabashMove:"101701,101702,101704",chassis:0,chassis_pos:"null",groupId:0,frameRate:6,fishkindIcon:1017,containRoomId:"2,3,1,4,5,6,7",quality:2,posLocked:"10,-35",deadType:3,showWH:"96_100",Matrix:1,layer:3,cacheNum:3,},
		{id:18,name:2127,type:1,sound:"HowCanthisBe",resRunUrl:"jinwugui",functionType:2,score:150,calabashMove:"101801,101802,101803,101804,101806",chassis:0,chassis_pos:"null",groupId:0,frameRate:5,fishkindIcon:1018,containRoomId:"2,3,1,4,5,6,7",quality:2,posLocked:"10,-12",deadType:5,showWH:"132_139",Matrix:1,layer:3,cacheNum:3,},
		{id:19,name:2128,type:1,sound:"YouCanGentle",resRunUrl:"null",functionType:2,score:150,calabashMove:"31901",chassis:0,chassis_pos:"null",groupId:1005,frameRate:5,fishkindIcon:1019,containRoomId:"3,1,5",quality:2,posLocked:"5,2",deadType:3,showWH:"163_72",Matrix:2,layer:2,cacheNum:3,},
		{id:20,name:2129,type:1,sound:"HeyYi",resRunUrl:"null",functionType:2,score:125,calabashMove:"32001",chassis:0,chassis_pos:"null",groupId:1006,frameRate:5,fishkindIcon:1020,containRoomId:"2,3,1,4,5,6,7",quality:2,posLocked:"-10,-5",deadType:3,showWH:"97_49",Matrix:2,layer:2,cacheNum:3,},
		{id:21,name:2130,type:1,sound:"Giggle",resRunUrl:"huangjingangkuiyu",functionType:2,score:120,calabashMove:"102101,102102,102103,102104,102105,102106",chassis:0,chassis_pos:"null",groupId:0,frameRate:5,fishkindIcon:1021,containRoomId:"2,3,1,4,5,6,7",quality:2,posLocked:"88,-11",deadType:5,showWH:"117_61",Matrix:1,layer:2,cacheNum:3,},
		{id:22,name:2131,type:1,sound:"GodYouGetRich",resRunUrl:"jinsha",functionType:2,score:100,calabashMove:"102201,102202,102203,102204,102205,102206",chassis:0,chassis_pos:"null",groupId:0,frameRate:5,fishkindIcon:1022,containRoomId:"2,3,1,4,5,6,7",quality:2,posLocked:"62,-20",deadType:6,showWH:"172_76",Matrix:1,layer:2,cacheNum:3,},
		{id:23,name:2132,type:1,sound:"AEn",resRunUrl:"null",functionType:2,score:60,calabashMove:"32301",chassis:0,chassis_pos:"null",groupId:1007,frameRate:7,fishkindIcon:1023,containRoomId:"2,3,1,4,5,6,7",quality:2,posLocked:"0,-50",deadType:3,showWH:"59_58",Matrix:1,layer:2,cacheNum:2,},
		{id:24,name:2133,type:1,sound:"HeyYi",resRunUrl:"yinsha",functionType:2,score:60,calabashMove:"102402,102403,102404,102405,102406",chassis:0,chassis_pos:"null",groupId:0,frameRate:5,fishkindIcon:1024,containRoomId:"2,3,1,4,5,6,7",quality:2,posLocked:"58,-20",deadType:6,showWH:"163_72",Matrix:1,layer:2,cacheNum:4,},
		{id:25,name:2134,type:1,sound:"WhoWhoNot",resRunUrl:"null",functionType:2,score:60,calabashMove:"102501",chassis:0,chassis_pos:"null",groupId:1011,frameRate:7,fishkindIcon:1025,containRoomId:"2,3,1,4,5,6,7",quality:2,posLocked:"118,160",deadType:3,showWH:"172_76",Matrix:2,layer:2,cacheNum:4,},
		{id:26,name:2135,type:1,sound:"YouCanGentle",resRunUrl:"null",functionType:2,score:48,calabashMove:"102602,102605",chassis:0,chassis_pos:"null",groupId:1008,frameRate:5,fishkindIcon:1026,containRoomId:"2,3,1,4,5,6,7",quality:2,posLocked:"0,-10",deadType:3,showWH:"172_76",Matrix:1,layer:2,cacheNum:4,},
		{id:27,name:2136,type:1,sound:"ThisIsBeginning",resRunUrl:"shayu",functionType:1,score:45,calabashMove:"102701,102702,102704,102706",chassis:0,chassis_pos:"null",groupId:0,frameRate:5,fishkindIcon:1027,containRoomId:"2,3,1,4,5,6,7",quality:1,posLocked:"65,-17",deadType:6,showWH:"148_65",Matrix:2,layer:2,cacheNum:4,},
		{id:28,name:2137,type:1,sound:"Notlike",resRunUrl:"juchisha",functionType:1,score:40,calabashMove:"102801,102802,102803,102805",chassis:0,chassis_pos:"null",groupId:0,frameRate:5,fishkindIcon:1028,containRoomId:"2,3,1,4,5,6,7",quality:1,posLocked:"-5,-13",deadType:6,showWH:"139_67",Matrix:2,layer:2,cacheNum:4,},
		{id:29,name:2138,type:1,sound:"HowCanthisBe",resRunUrl:"bianfuyu",functionType:1,score:30,calabashMove:"102901,102902,102903,102904,102905,102906",chassis:0,chassis_pos:"40,-10",groupId:0,frameRate:5,fishkindIcon:1029,containRoomId:"2,3,1,4,5,6,7",quality:1,posLocked:"55,-10",deadType:5,showWH:"97_61",Matrix:1,layer:1,cacheNum:4,},
		{id:30,name:2139,type:1,sound:"Wow",resRunUrl:"gangkuiyu",functionType:1,score:25,calabashMove:"0",chassis:0,chassis_pos:"40,0",groupId:0,frameRate:5,fishkindIcon:1030,containRoomId:"2,3,1,4,5,6,7",quality:1,posLocked:"55,-7",deadType:5,showWH:"97_49",Matrix:2,layer:1,cacheNum:4,},
		{id:31,name:2140,type:1,sound:"HowCanthisBe",resRunUrl:"null",functionType:1,score:21,calabashMove:"0",chassis:0,chassis_pos:"null",groupId:1009,frameRate:5,fishkindIcon:1031,containRoomId:"2,3,1,4,5,6,7",quality:1,posLocked:"111,120",deadType:3,showWH:"172_76",Matrix:2,layer:1,cacheNum:4,},
		{id:32,name:2141,type:1,sound:"Giggle",resRunUrl:"haima",functionType:1,score:20,calabashMove:"0",chassis:0,chassis_pos:"null",groupId:0,frameRate:7,fishkindIcon:1032,containRoomId:"2,3,1,4,5,6,7",quality:1,posLocked:"6,-5",deadType:2,showWH:"59_58",Matrix:1,layer:1,cacheNum:5,},
		{id:33,name:2142,type:1,sound:"AHey",resRunUrl:"shuimu",functionType:1,score:18,calabashMove:"0",chassis:0,chassis_pos:"null",groupId:0,frameRate:6,fishkindIcon:1033,containRoomId:"2,3,1,4,5,6,7",quality:1,posLocked:"0,-20",deadType:2,showWH:"76_79",Matrix:1,layer:1,cacheNum:5,},
		{id:34,name:2143,type:1,sound:"AEn",resRunUrl:"null",functionType:1,score:18,calabashMove:"0",chassis:0,chassis_pos:"null",groupId:1010,frameRate:5,fishkindIcon:1034,containRoomId:"2,3,1,4,5,6,7",quality:1,posLocked:"52,145",deadType:3,showWH:"172_76",Matrix:1,layer:1,cacheNum:5,},
		{id:35,name:2144,type:1,sound:"HeyYi",resRunUrl:"qunbaiyu",functionType:1,score:15,calabashMove:"0",chassis:0,chassis_pos:"8,-10",groupId:0,frameRate:7,fishkindIcon:1035,containRoomId:"2,3,1,4,5,6,7",quality:1,posLocked:"40,-13",deadType:2,showWH:"65_26",Matrix:1,layer:1,cacheNum:5,},
		{id:36,name:2145,type:1,sound:"Wow",resRunUrl:"hudieyu",functionType:1,score:12,calabashMove:"0",chassis:0,chassis_pos:"10,0",groupId:0,frameRate:5,fishkindIcon:1036,containRoomId:"2,3,1,4,5,6,7",quality:1,posLocked:"19,-10",deadType:2,showWH:"47_48",Matrix:1,layer:1,cacheNum:5,},
		{id:37,name:2146,type:1,sound:"HeyYi",resRunUrl:"hetun",functionType:1,score:10,calabashMove:"0",chassis:0,chassis_pos:"-5,-5",groupId:0,frameRate:5,fishkindIcon:1037,containRoomId:"2,3,1,4,5,6,7",quality:1,posLocked:"18,-12",deadType:2,showWH:"49_29",Matrix:1,layer:1,cacheNum:5,},
		{id:38,name:2147,type:1,sound:"Giggle",resRunUrl:"wugui",functionType:1,score:8,calabashMove:"0",chassis:0,chassis_pos:"0,-2",groupId:0,frameRate:7,fishkindIcon:1038,containRoomId:"2,3,1,4,5,6,7",quality:1,posLocked:"-4,-8",deadType:2,showWH:"60_65",Matrix:1,layer:1,cacheNum:5,},
		{id:39,name:2148,type:1,sound:"AHey",resRunUrl:"bandianyu",functionType:1,score:7,calabashMove:"0",chassis:0,chassis_pos:"5,3",groupId:0,frameRate:5,fishkindIcon:1039,containRoomId:"2,3,1,4,5,6,7",quality:1,posLocked:"13,-11",deadType:2,showWH:"76_34",Matrix:2,layer:1,cacheNum:5,},
		{id:40,name:2149,type:1,sound:"AEn",resRunUrl:"jianyu",functionType:1,score:6,calabashMove:"0",chassis:0,chassis_pos:"null",groupId:0,frameRate:5,fishkindIcon:1040,containRoomId:"2,3,1,4,5,6,7",quality:1,posLocked:"25,-3",deadType:2,showWH:"53_24",Matrix:1,layer:1,cacheNum:7,},
		{id:41,name:2150,type:1,sound:"null",resRunUrl:"wuzei",functionType:1,score:5,calabashMove:"0",chassis:0,chassis_pos:"null",groupId:0,frameRate:5,fishkindIcon:1041,containRoomId:"2,3,1,4,5,6,7",quality:1,posLocked:"11,-13",deadType:2,showWH:"60_51",Matrix:1,layer:1,cacheNum:7,},
		{id:42,name:2151,type:1,sound:"null",resRunUrl:"redaiyu",functionType:1,score:4,calabashMove:"0",chassis:0,chassis_pos:"null",groupId:0,frameRate:7,fishkindIcon:1042,containRoomId:"2,3,1,4,5,6,7",quality:1,posLocked:"8,-12",deadType:2,showWH:"44_26",Matrix:1,layer:1,cacheNum:7,},
		{id:43,name:2152,type:1,sound:"null",resRunUrl:"xiaochouyu",functionType:1,score:3,calabashMove:"0",chassis:0,chassis_pos:"null",groupId:0,frameRate:7,fishkindIcon:1043,containRoomId:"2,3,1,4,5,6,7",quality:1,posLocked:"23,-10",deadType:2,showWH:"41_27",Matrix:1,layer:1,cacheNum:7,},
		{id:44,name:2153,type:1,sound:"null",resRunUrl:"caihongyu",functionType:1,score:2,calabashMove:"0",chassis:0,chassis_pos:"null",groupId:0,frameRate:6,fishkindIcon:1044,containRoomId:"2,3,1,4,5,6,7",quality:1,posLocked:"18,-8",deadType:2,showWH:"39_15",Matrix:1,layer:1,cacheNum:7,},
		{id:100,name:2154,type:2,sound:"GodYouGetRich",resRunUrl:"guanyu",functionType:6,score:1000,calabashMove:"0",chassis:0,chassis_pos:"null",groupId:0,frameRate:6,fishkindIcon:1100,containRoomId:"3,1,5,2",quality:3,posLocked:"49,31",deadType:3,showWH:"300_229",Matrix:1,layer:3,cacheNum:0,},
		{id:101,name:2155,type:3,sound:"WhoWhoNot",resRunUrl:"dianman",functionType:3,score:150,calabashMove:"0",chassis:0,chassis_pos:"null",groupId:0,frameRate:6,fishkindIcon:1101,containRoomId:"2,3,1,4,5,6,7",quality:3,posLocked:"45,10",deadType:3,showWH:"269_184",Matrix:1,layer:2,cacheNum:0,},
		{id:102,name:2156,type:4,sound:"YouCanGentle",resRunUrl:"baoxiang",functionType:5,score:100,calabashMove:"0",chassis:0,chassis_pos:"null",groupId:0,frameRate:6,fishkindIcon:1102,containRoomId:"2,3,1,4,5,6,7",quality:3,posLocked:"3,0",deadType:3,showWH:"69_101",Matrix:1,layer:3,cacheNum:0,},
		{id:103,name:2157,type:3,sound:"ThisIsBeginning",resRunUrl:"zhadan",functionType:4,score:500,calabashMove:"0",chassis:0,chassis_pos:"null",groupId:0,frameRate:5,fishkindIcon:1103,containRoomId:"2,3,1,4,5,6,7",quality:3,posLocked:"120,63",deadType:4,showWH:"257_206",Matrix:1,layer:3,cacheNum:0,},
		{id:104,name:2158,type:2,sound:"null",resRunUrl:"wugui",functionType:8,score:1000,calabashMove:"0",chassis:0,chassis_pos:"null",groupId:0,frameRate:6,fishkindIcon:1104,containRoomId:"-1",quality:3,posLocked:"0,-9",deadType:3,showWH:"_",Matrix:1,layer:3,cacheNum:0,},
		{id:201,name:2159,type:5,sound:"null",resRunUrl:"fenghuang",functionType:9,score:15000,calabashMove:"0",chassis:0,chassis_pos:"null",groupId:0,frameRate:null,fishkindIcon:0,containRoomId:"1",quality:0,posLocked:"185,86",deadType:4,showWH:"0",Matrix:0,layer:3,cacheNum:0,},
		
	];
}