var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 玩家数据
 */
var UserModel = (function (_super) {
    __extends(UserModel, _super);
    function UserModel() {
        return _super.call(this) || this;
    }
    UserModel.prototype.init = function () {
        this._bagList = new Array();
        this._bankruptTime = -1;
        this._nGuideID = 0;
        this._nCurGunSkinId = 20007;
        this._nCurGunBgId = null;
        this._objSign = new game.model.SignObj();
        this._nCiriState = Ciri_State.Expired;
        this._arrRankList = new Array();
        this._bIsTodayDraw = false;
        this._arrRoomOnline = new Array();
        this._arrRoomOnline.push(0);
        this._arrRoomOnline.push(0);
        this._arrRoomOnline.push(0);
        this._arrChargedGears = new Array();
        this._arrExchangeGears = new Array();
        this.bOpenedActiveUI = false;
        this.bOpenedExchangeUI = false;
        this.bOpenedMonthUI = false;
    };
    /** 向背包中添加物品 */
    UserModel.prototype.addItem = function (item) {
        if (item.getItemId() == PropEnum.GOLD
            || item.getItemId() == PropEnum.GEM) {
            console.log("#----------bag can't insert GemOrGold");
            return;
        }
        var flag = this.isExist(item);
        if (!flag) {
            this._bagList.push(item);
            return;
        }
        var len = this._bagList.length;
        for (var i = 0; i < len; i++) {
            var currItem = this._bagList[i];
            if (item.getItemId() == currItem.getItemId()) {
                currItem.setCount(currItem.getCount() + item.getCount());
            }
            else {
                this._bagList.push(item);
            }
        }
    };
    /** 更新背包中的物品数量 */
    UserModel.prototype.updateItem = function (itemId, count, time) {
        if (time === void 0) { time = 0; }
        var len = this._bagList.length;
        var isExist = false;
        for (var i = 0; i < len; i++) {
            var currItem = this._bagList[i];
            if (itemId == currItem.getItemId()) {
                currItem.setCount(count);
                currItem.setTime(time);
                isExist = true;
                break;
            }
        }
        if (!isExist) {
            var item = new game.model.Item(itemId, count, time);
            this.addItem(item);
        }
    };
    /** 从背包中删除物品 */
    UserModel.prototype.removeItem = function (itemId, count) {
        var len = this._bagList.length;
        for (var i = 0; i < len; i++) {
            var currItem = this._bagList[i];
            if (itemId == currItem.getItemId()) {
                var temp = currItem.getCount() - count;
                if (temp < 0) {
                    console.warn("物品【" + itemId + "】数量不足!");
                    return false;
                }
                else if (temp == 0) {
                    this._bagList.splice(i, 1);
                    return true;
                }
                else {
                    currItem.setCount(temp);
                    return true;
                }
            }
        }
        return false;
    };
    //判断物品是否存在
    UserModel.prototype.isExist = function (item) {
        var len = this._bagList.length;
        for (var i = 0; i < len; i++) {
            var currItem = this._bagList[i];
            if (item.getItemId() == currItem.getItemId()) {
                return true;
            }
        }
        return false;
    };
    /** 获取物品列表 */
    UserModel.prototype.getItemList = function () {
        return this._bagList;
    };
    /** 根据物品id获取物品 */
    UserModel.prototype.getItemById = function (itemId) {
        var len = this._bagList.length;
        for (var i = 0; i < len; i++) {
            var currItem = this._bagList[i];
            if (itemId == currItem.getItemId()) {
                return currItem;
            }
        }
        return null;
    };
    //获取当前炮倍
    UserModel.prototype.getCurGunID = function () {
        return this._nCurGunId;
    };
    //设置当前炮倍
    UserModel.prototype.setCurGunID = function (nId) {
        this._nCurGunId = nId;
    };
    //获取当前匹配的房间等级
    UserModel.prototype.getMatchRoomLevel = function () {
        return this._currRoomType;
    };
    //设置当前房间等级
    UserModel.prototype.setMatchRoomLevel = function (type) {
        this._currRoomType = type;
    };
    UserModel.prototype.setUserId = function (uid) {
        this._userId = uid;
    };
    UserModel.prototype.getUserId = function () {
        return this._userId;
    };
    UserModel.prototype.setUserName = function (name) {
        this._userName = name;
    };
    UserModel.prototype.getUserName = function () {
        return this._userName;
    };
    UserModel.prototype.setHeadUrl = function (url) {
        this._headUrl = url;
    };
    UserModel.prototype.getHeadUrl = function () {
        return CONFIG.LOGIN_ADDR + this._headUrl;
    };
    UserModel.prototype.setLevel = function (level) {
        this._level = level;
    };
    UserModel.prototype.getLevel = function () {
        return this._level;
    };
    UserModel.prototype.getExp = function () {
        return this._exp;
    };
    UserModel.prototype.setExp = function (exp) {
        this._exp = exp;
    };
    UserModel.prototype.getVipLevel = function () {
        return this._vipLevel;
    };
    UserModel.prototype.setVipLevel = function (value) {
        this._vipLevel = value;
    };
    UserModel.prototype.setMoney = function (money) {
        this._nMoney = money;
    };
    UserModel.prototype.getMoney = function () {
        return this._nMoney;
    };
    UserModel.prototype.setCoins = function (coins) {
        this._nCoins = coins;
    };
    UserModel.prototype.getCoins = function () {
        return this._nCoins;
    };
    UserModel.prototype.setTicket = function (ticket) {
        this._nTicket = ticket;
    };
    UserModel.prototype.getTicket = function () {
        return this._nTicket;
    };
    UserModel.prototype.setBankruptTime = function (time) {
        this._bankruptTime = time;
    };
    UserModel.prototype.getBankruptTime = function () {
        return this._bankruptTime;
    };
    UserModel.prototype.getGuideID = function () {
        return this._nGuideID;
    };
    UserModel.prototype.setGuideID = function (id, clean) {
        if (clean === void 0) { clean = true; }
        this._nGuideID = id;
        if (this._nGuideID != 0 && clean && this._nGuideID != 9998 && this._nGuideID != 9999) {
            var guideOver = game.table.T_Config_Table.getVoByKey(49).value;
            var strOver = guideOver.split(",");
            this._nGuideID = (Number(strOver[0]) + 1);
        }
    };
    UserModel.prototype.setEverydayActive = function (value) {
        this._everydayActive = value;
    };
    UserModel.prototype.getEverydayActive = function () {
        return this._everydayActive;
    };
    UserModel.prototype.setEveryWeekActive = function (value) {
        this._everyWeekActive = value;
    };
    UserModel.prototype.getEveryWeekActive = function () {
        return this._everyWeekActive;
    };
    UserModel.prototype.getCurSkinId = function () {
        return this._nCurGunSkinId;
    };
    UserModel.prototype.setCurSkinId = function (skinId) {
        if (skinId == 0) {
            var value = game.table.T_Config_Table.getVoByKey(51).value;
            skinId = Number(value);
        }
        this._nCurGunSkinId = skinId;
    };
    UserModel.prototype.setCurGunBgId = function (gunBgId) {
        this._nCurGunBgId = gunBgId;
    };
    UserModel.prototype.getCurGunBgId = function () {
        return this._nCurGunBgId;
    };
    UserModel.prototype.getTatolChargeRMB = function () {
        return this._nTotalChargeRMB;
    };
    UserModel.prototype.setTatolChargeRMB = function (value) {
        this._nTotalChargeRMB = value;
    };
    UserModel.prototype.getMonthEndTime = function () {
        return this._nMonthEndTime;
    };
    UserModel.prototype.setMonthEndTime = function (value) {
        this._nMonthEndTime = value;
    };
    UserModel.prototype.isTodayFirstLogin = function () {
        return this._bIsTodayFirstLogin;
    };
    UserModel.prototype.setTodayFirstLogin = function (value) {
        if (value == 0) {
            this._bIsTodayFirstLogin = false;
        }
        else if (value == 1) {
            this._bIsTodayFirstLogin = true;
        }
    };
    UserModel.prototype.setSignObj = function (msg) {
        this._objSign.setData(msg);
    };
    UserModel.prototype.getSignObj = function () {
        return this._objSign;
    };
    UserModel.prototype.setCiriState = function (state) {
        this._nCiriState = state;
    };
    UserModel.prototype.getCiriState = function () {
        return this._nCiriState;
    };
    UserModel.prototype.setShareTimes = function (times) {
        this._shareTimes = times;
    };
    UserModel.prototype.getShareTimes = function () {
        return this._shareTimes;
    };
    UserModel.prototype.setIsFocusFlag = function (flag) {
        this._isFocusFlag = flag;
    };
    UserModel.prototype.getIsFocusFlag = function () {
        return this._isFocusFlag;
    };
    UserModel.prototype.getRankListByType = function (type) {
        var arr = new Array();
        var len = this._arrRankList.length;
        for (var i = 0; i < len; i++) {
            var item = this._arrRankList[i];
            if (item._nRankType == type) {
                arr.push(item);
            }
        }
        return arr;
    };
    UserModel.prototype.setRankList = function (item) {
        this._arrRankList.push(item);
    };
    UserModel.prototype.setIsTodayDraw = function (value) {
        if (value == 0) {
            this._bIsTodayDraw = false;
        }
        else if (value == 1) {
            this._bIsTodayDraw = true;
        }
    };
    UserModel.prototype.isTodayDraw = function () {
        return this._bIsTodayDraw;
    };
    UserModel.prototype.setRoomOnLine = function (arr) {
        this._arrRoomOnline = arr;
    };
    UserModel.prototype.getRoomOnLineByID = function (nId) {
        return this._arrRoomOnline[nId];
    };
    UserModel.prototype.addChargedGears = function (value) {
        this._arrChargedGears.push(value);
    };
    UserModel.prototype.isCharged = function (value) {
        var len = this._arrChargedGears.length;
        for (var i = 0; i < len; i++) {
            if (this._arrChargedGears[i] == value) {
                return true;
            }
        }
        return false;
    };
    UserModel.prototype.addExchangeGears = function (value) {
        this._arrExchangeGears.push(value);
    };
    UserModel.prototype.isInExchanged = function (value) {
        for (var _i = 0, _a = this._arrExchangeGears; _i < _a.length; _i++) {
            var gear = _a[_i];
            if (gear == value) {
                return true;
            }
        }
        return false;
    };
    UserModel.prototype.setInviteCode = function (str) {
        this._strInviteCode = str;
    };
    UserModel.prototype.getInviteCode = function () {
        return this._strInviteCode;
    };
    UserModel.prototype.clear = function () {
    };
    UserModel.prototype.destroy = function () {
    };
    return UserModel;
}(burn.model.ModelBase));
__reflect(UserModel.prototype, "UserModel");
//# sourceMappingURL=UserModel.js.map