//房间炮台位置枚举
enum RoomPosEnum {
	//炮台位置枚举
	GUN_POS_0= 0,
	GUN_POS_1= 1,
	GUN_POS_2= 2,
	GUN_POS_3= 3
}

//分身的炮台枚举
enum RoomAvaPosEnum {
	GUN_POS_0_1 = 10,
	GUN_POS_0_2 = 11,
	GUN_POS_0_3 = 12,
	GUN_POS_1_1 = 20,
	GUN_POS_1_2 = 21,
	GUN_POS_1_3 = 22,
	GUN_POS_2_1 = 30,
	GUN_POS_2_2 = 31,
	GUN_POS_2_3 = 32,
	GUN_POS_3_1 = 40,
	GUN_POS_3_2 = 41,
	GUN_POS_3_3 = 42
}

//添加鱼类型枚举
enum AddFishType {
	FISH = 1,		//单条鱼
	FISH_GROUP = 2,	//鱼群
	CATCH_WHOLE_FISH = 3	//一网打尽
}

//鱼组类型
enum FishGroupType {
	SIMPLE = 1,		//普通鱼组
	QUEUE = 3		//队列鱼组
}

//开炮类型
enum GunFireType {
	SIMPLE = 1		//普通开炮
}

//改变炮台状态
enum ChangeGunState {
	REDUCE_RATE = 1,	//减炮倍
	ADD_RATE = 2,		//加炮倍
	CHANGE_SKIN = 3,		//换皮肤
	AUTO_CHANGE = 4,     //自动升降
	UNLOAD_ZUO = 5       //歇下炮座
}

//鱼塘状态
enum pondState {
	FROZEN_END = 1,	//冰冻结束
	WAVE_COMING = 2,	//鱼潮来临
	BOSS_COMING = 3,		//BOSS来临 
	USER_EXCHANGE = 4,  //开始兑奖
	USER_EXCHANGED = 5   //结束兑奖
}

//鱼类型
enum FishType {
	SIMPLE = 1, 	//普通倍率鱼
	BOUNS = 2 		//奖金鱼
}

//底座枚举
enum ChasisType {
	CATCH_WHOLE_S = 1,	//一网打尽-小
	CATCH_WHOLE_M = 2,	//一网打尽-中
	CATCH_WHOLE_B = 3,	//一网打尽-大
	GROUP_S = 1,		//组合鱼-小
	GROUP_B = 2			//组合鱼-大
}

//带底盘的鱼
enum ChasisFish {
	GROUP_FISH = 1,
	CATCH_WHOLE_FISH = 2,
	BOSS_FISH = 3
}

//OneKillMany枚举
enum OneKillManyType {
	CATCH_WHOLE = 0,	//一网打尽
	ELECTRIC = 3,		//电鳗
	BOMB = 4			//炸弹
}