var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var model;
    (function (model) {
        var Roomer = (function () {
            function Roomer(pid, pos, name, gunRate, coins, money, arrItemId, arrLockedId, vipLv, curSkinId, curSkinBgId, lv) {
                this._userrId = pid;
                this._roomPos = pos;
                this._roomName = name;
                this._gunRate = gunRate;
                this._coins = coins;
                this._money = money;
                this._isInLock = false;
                this._isInClone = false;
                this._isInRage = false;
                this._arrItemId = arrItemId;
                this._arrLockedId = arrLockedId;
                for (var i = 0; i < arrItemId.length; i++) {
                    if (arrItemId[i] == PropEnum.LOCK) {
                        this._isInLock = true;
                    }
                    else if (arrItemId[i] == PropEnum.RAGE) {
                        this._isInRage = true;
                    }
                    else if (arrItemId[i] == PropEnum.CLONE) {
                        this._isInClone = true;
                    }
                }
                this._isBankrupt = false;
                this._viplevel = vipLv;
                this._nGunNum = 2;
                this.setGunNum();
                if (curSkinId == 0) {
                    var value = game.table.T_Config_Table.getVoByKey(51).value;
                    curSkinId = Number(value);
                }
                this._curSkinId = curSkinId;
                this._curSkinBgId = curSkinBgId;
                this._nLv = lv;
            }
            Roomer.prototype.getUserId = function () {
                return this._userrId;
            };
            Roomer.prototype.getRoomPos = function () {
                return this._roomPos;
            };
            Roomer.prototype.getName = function () {
                return this._roomName;
            };
            Roomer.prototype.setGunRate = function (rate) {
                this._gunRate = rate;
            };
            Roomer.prototype.getGunRate = function () {
                return this._gunRate;
            };
            Roomer.prototype.getCoins = function () {
                return this._coins;
            };
            Roomer.prototype.setCoins = function (coins) {
                this._coins = coins;
            };
            Roomer.prototype.getMoney = function () {
                // return this._money;
                return 100000;
            };
            Roomer.prototype.setMoney = function (money) {
                this._money = money;
            };
            Roomer.prototype.setIsClone = function (bClone) {
                this._isInClone = bClone;
            };
            Roomer.prototype.getIsClone = function () {
                return this._isInClone;
            };
            Roomer.prototype.setIsRage = function (bRage) {
                this._isInRage = bRage;
            };
            Roomer.prototype.getIsRage = function () {
                return this._isInRage;
            };
            Roomer.prototype.setIsLock = function (bLock) {
                this._isInLock = bLock;
            };
            Roomer.prototype.getIsLock = function () {
                return this._isInLock;
            };
            Roomer.prototype.getBankrupt = function () {
                return this._isBankrupt;
            };
            Roomer.prototype.setBankrupt = function (bFlag) {
                this._isBankrupt = bFlag;
            };
            Roomer.prototype.getVipLevel = function () {
                return this._viplevel;
            };
            Roomer.prototype.setGunNum = function () {
                var vipLevel = this._viplevel;
                var data = game.table.T_Config_Table.getVoByKey(35).value;
                var datas = data.split("_");
                var min = Number(datas[0]);
                var max = Number(datas[1]);
                var state = 2;
                if (vipLevel >= min && vipLevel < max) {
                    state = 2;
                }
                else if (vipLevel >= max) {
                    state = 3;
                }
                this._nGunNum = state;
                var userModel = burn.Director.getModelByKey(UserModel);
                if (userModel.getMatchRoomLevel() == RequesetRoomState.QmsRoom) {
                    this._nGunNum = 3;
                }
            };
            Roomer.prototype.getGunNum = function () {
                return this._nGunNum;
            };
            Roomer.prototype.getLockedIdByGun = function (gunIndex) {
                if (this._arrLockedId.length < gunIndex) {
                    return -1;
                }
                return this._arrLockedId[gunIndex];
            };
            Roomer.prototype.setCurSkinId = function (skinId) {
                this._curSkinId = skinId;
            };
            Roomer.prototype.getCurSkinId = function () {
                return this._curSkinId;
            };
            Roomer.prototype.setCurSkinBgId = function (skinBgId) {
                this._curSkinBgId = skinBgId;
            };
            Roomer.prototype.getCurSkinBgId = function () {
                return this._curSkinBgId;
            };
            Roomer.prototype.getLv = function () {
                return this._nLv;
            };
            Roomer.prototype.setLv = function (value) {
                this._nLv = value;
            };
            Roomer.prototype.getDjsObj = function () {
                return this._djsObj;
            };
            Roomer.prototype.setDjsObj = function (obj) {
                this._djsObj = obj;
            };
            return Roomer;
        }());
        model.Roomer = Roomer;
        __reflect(Roomer.prototype, "game.model.Roomer");
    })(model = game.model || (game.model = {}));
})(game || (game = {}));
//# sourceMappingURL=Roomer.js.map