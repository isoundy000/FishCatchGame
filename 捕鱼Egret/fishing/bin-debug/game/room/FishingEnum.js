//房间炮台位置枚举
var RoomPosEnum;
(function (RoomPosEnum) {
    //炮台位置枚举
    RoomPosEnum[RoomPosEnum["GUN_POS_0"] = 0] = "GUN_POS_0";
    RoomPosEnum[RoomPosEnum["GUN_POS_1"] = 1] = "GUN_POS_1";
    RoomPosEnum[RoomPosEnum["GUN_POS_2"] = 2] = "GUN_POS_2";
    RoomPosEnum[RoomPosEnum["GUN_POS_3"] = 3] = "GUN_POS_3";
})(RoomPosEnum || (RoomPosEnum = {}));
//分身的炮台枚举
var RoomAvaPosEnum;
(function (RoomAvaPosEnum) {
    RoomAvaPosEnum[RoomAvaPosEnum["GUN_POS_0_1"] = 10] = "GUN_POS_0_1";
    RoomAvaPosEnum[RoomAvaPosEnum["GUN_POS_0_2"] = 11] = "GUN_POS_0_2";
    RoomAvaPosEnum[RoomAvaPosEnum["GUN_POS_0_3"] = 12] = "GUN_POS_0_3";
    RoomAvaPosEnum[RoomAvaPosEnum["GUN_POS_1_1"] = 20] = "GUN_POS_1_1";
    RoomAvaPosEnum[RoomAvaPosEnum["GUN_POS_1_2"] = 21] = "GUN_POS_1_2";
    RoomAvaPosEnum[RoomAvaPosEnum["GUN_POS_1_3"] = 22] = "GUN_POS_1_3";
    RoomAvaPosEnum[RoomAvaPosEnum["GUN_POS_2_1"] = 30] = "GUN_POS_2_1";
    RoomAvaPosEnum[RoomAvaPosEnum["GUN_POS_2_2"] = 31] = "GUN_POS_2_2";
    RoomAvaPosEnum[RoomAvaPosEnum["GUN_POS_2_3"] = 32] = "GUN_POS_2_3";
    RoomAvaPosEnum[RoomAvaPosEnum["GUN_POS_3_1"] = 40] = "GUN_POS_3_1";
    RoomAvaPosEnum[RoomAvaPosEnum["GUN_POS_3_2"] = 41] = "GUN_POS_3_2";
    RoomAvaPosEnum[RoomAvaPosEnum["GUN_POS_3_3"] = 42] = "GUN_POS_3_3";
})(RoomAvaPosEnum || (RoomAvaPosEnum = {}));
//添加鱼类型枚举
var AddFishType;
(function (AddFishType) {
    AddFishType[AddFishType["FISH"] = 1] = "FISH";
    AddFishType[AddFishType["FISH_GROUP"] = 2] = "FISH_GROUP";
    AddFishType[AddFishType["CATCH_WHOLE_FISH"] = 3] = "CATCH_WHOLE_FISH"; //一网打尽
})(AddFishType || (AddFishType = {}));
//鱼组类型
var FishGroupType;
(function (FishGroupType) {
    FishGroupType[FishGroupType["SIMPLE"] = 1] = "SIMPLE";
    FishGroupType[FishGroupType["QUEUE"] = 3] = "QUEUE"; //队列鱼组
})(FishGroupType || (FishGroupType = {}));
//开炮类型
var GunFireType;
(function (GunFireType) {
    GunFireType[GunFireType["SIMPLE"] = 1] = "SIMPLE"; //普通开炮
})(GunFireType || (GunFireType = {}));
//改变炮台状态
var ChangeGunState;
(function (ChangeGunState) {
    ChangeGunState[ChangeGunState["REDUCE_RATE"] = 1] = "REDUCE_RATE";
    ChangeGunState[ChangeGunState["ADD_RATE"] = 2] = "ADD_RATE";
    ChangeGunState[ChangeGunState["CHANGE_SKIN"] = 3] = "CHANGE_SKIN";
    ChangeGunState[ChangeGunState["AUTO_CHANGE"] = 4] = "AUTO_CHANGE";
    ChangeGunState[ChangeGunState["UNLOAD_ZUO"] = 5] = "UNLOAD_ZUO"; //歇下炮座
})(ChangeGunState || (ChangeGunState = {}));
//鱼塘状态
var pondState;
(function (pondState) {
    pondState[pondState["FROZEN_END"] = 1] = "FROZEN_END";
    pondState[pondState["WAVE_COMING"] = 2] = "WAVE_COMING";
    pondState[pondState["BOSS_COMING"] = 3] = "BOSS_COMING";
    pondState[pondState["USER_EXCHANGE"] = 4] = "USER_EXCHANGE";
    pondState[pondState["USER_EXCHANGED"] = 5] = "USER_EXCHANGED"; //结束兑奖
})(pondState || (pondState = {}));
//鱼类型
var FishType;
(function (FishType) {
    FishType[FishType["SIMPLE"] = 1] = "SIMPLE";
    FishType[FishType["BOUNS"] = 2] = "BOUNS"; //奖金鱼
})(FishType || (FishType = {}));
//底座枚举
var ChasisType;
(function (ChasisType) {
    ChasisType[ChasisType["CATCH_WHOLE_S"] = 1] = "CATCH_WHOLE_S";
    ChasisType[ChasisType["CATCH_WHOLE_M"] = 2] = "CATCH_WHOLE_M";
    ChasisType[ChasisType["CATCH_WHOLE_B"] = 3] = "CATCH_WHOLE_B";
    ChasisType[ChasisType["GROUP_S"] = 1] = "GROUP_S";
    ChasisType[ChasisType["GROUP_B"] = 2] = "GROUP_B"; //组合鱼-大
})(ChasisType || (ChasisType = {}));
//带底盘的鱼
var ChasisFish;
(function (ChasisFish) {
    ChasisFish[ChasisFish["GROUP_FISH"] = 1] = "GROUP_FISH";
    ChasisFish[ChasisFish["CATCH_WHOLE_FISH"] = 2] = "CATCH_WHOLE_FISH";
    ChasisFish[ChasisFish["BOSS_FISH"] = 3] = "BOSS_FISH";
})(ChasisFish || (ChasisFish = {}));
//OneKillMany枚举
var OneKillManyType;
(function (OneKillManyType) {
    OneKillManyType[OneKillManyType["CATCH_WHOLE"] = 0] = "CATCH_WHOLE";
    OneKillManyType[OneKillManyType["ELECTRIC"] = 3] = "ELECTRIC";
    OneKillManyType[OneKillManyType["BOMB"] = 4] = "BOMB"; //炸弹
})(OneKillManyType || (OneKillManyType = {}));
//# sourceMappingURL=FishingEnum.js.map