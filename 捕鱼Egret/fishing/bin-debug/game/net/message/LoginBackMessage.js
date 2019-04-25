//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoginBackMessage = (function (_super) {
    __extends(LoginBackMessage, _super);
    function LoginBackMessage() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._clazz = null;
        var builder = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);
        _this._clazz = builder.build("LoginBack");
        return _this;
    }
    LoginBackMessage.prototype.setId = function (id) {
        this._data.set("id", id);
    };
    LoginBackMessage.prototype.getId = function () {
        return this._data.get("id");
    };
    LoginBackMessage.prototype.setTaskInfo = function (taskInfo) {
        this._data.set("taskInfo", taskInfo);
    };
    LoginBackMessage.prototype.getTaskInfo = function () {
        return this._data.get("taskInfo");
    };
    LoginBackMessage.prototype.setItemInfo = function (itemInfo) {
        this._data.set("itemInfo", itemInfo);
    };
    LoginBackMessage.prototype.getItemInfo = function () {
        return this._data.get("itemInfo");
    };
    LoginBackMessage.prototype.setCoins = function (coins) {
        this._data.set("coins", coins);
    };
    LoginBackMessage.prototype.getCoins = function () {
        return this._data.get("coins");
    };
    LoginBackMessage.prototype.setGems = function (gems) {
        this._data.set("gems", gems);
    };
    LoginBackMessage.prototype.getGems = function () {
        return this._data.get("gems");
    };
    LoginBackMessage.prototype.setVipLevel = function (vipLevel) {
        this._data.set("vipLevel", vipLevel);
    };
    LoginBackMessage.prototype.getVipLevel = function () {
        return this._data.get("vipLevel");
    };
    LoginBackMessage.prototype.setSystemTime = function (systemTime) {
        this._data.set("systemTime", systemTime);
    };
    LoginBackMessage.prototype.getSystemTime = function () {
        return this._data.get("systemTime");
    };
    LoginBackMessage.prototype.setMaxGunId = function (maxGunId) {
        this._data.set("maxGunId", maxGunId);
    };
    LoginBackMessage.prototype.getMaxGunId = function () {
        return this._data.get("maxGunId");
    };
    LoginBackMessage.prototype.setCanReliefTime = function (canReliefTime) {
        this._data.set("canReliefTime", canReliefTime);
    };
    LoginBackMessage.prototype.getCanReliefTime = function () {
        return this._data.get("canReliefTime");
    };
    LoginBackMessage.prototype.setMailListByType = function (mailListByType) {
        this._data.set("mailListByType", mailListByType);
    };
    LoginBackMessage.prototype.getMailListByType = function () {
        return this._data.get("mailListByType");
    };
    LoginBackMessage.prototype.setRoleLevel = function (roleLevel) {
        this._data.set("roleLevel", roleLevel);
    };
    LoginBackMessage.prototype.getRoleLevel = function () {
        return this._data.get("roleLevel");
    };
    LoginBackMessage.prototype.setRoleExp = function (roleExp) {
        this._data.set("roleExp", roleExp);
    };
    LoginBackMessage.prototype.getRoleExp = function () {
        return this._data.get("roleExp");
    };
    LoginBackMessage.prototype.setEverydayActive = function (everydayActive) {
        this._data.set("everydayActive", everydayActive);
    };
    LoginBackMessage.prototype.getEverydayActive = function () {
        return this._data.get("everydayActive");
    };
    LoginBackMessage.prototype.setEveryWeekActive = function (everyWeekActive) {
        this._data.set("everyWeekActive", everyWeekActive);
    };
    LoginBackMessage.prototype.getEveryWeekActive = function () {
        return this._data.get("everyWeekActive");
    };
    LoginBackMessage.prototype.setNewbieGuideId = function (newbieGuideId) {
        this._data.set("newbieGuideId", newbieGuideId);
    };
    LoginBackMessage.prototype.getNewbieGuideId = function () {
        return this._data.get("newbieGuideId");
    };
    LoginBackMessage.prototype.setBatterySkinId = function (batterySkinId) {
        this._data.set("batterySkinId", batterySkinId);
    };
    LoginBackMessage.prototype.getBatterySkinId = function () {
        return this._data.get("batterySkinId");
    };
    LoginBackMessage.prototype.setGunrestSkinId = function (gunrestSkinId) {
        this._data.set("gunrestSkinId", gunrestSkinId);
    };
    LoginBackMessage.prototype.getGunrestSkinId = function () {
        return this._data.get("gunrestSkinId");
    };
    LoginBackMessage.prototype.setCoupon = function (coupon) {
        this._data.set("coupon", coupon);
    };
    LoginBackMessage.prototype.getCoupon = function () {
        return this._data.get("coupon");
    };
    LoginBackMessage.prototype.setTotalChargeRMB = function (totalChargeRMB) {
        this._data.set("totalChargeRMB", totalChargeRMB);
    };
    LoginBackMessage.prototype.getTotalChargeRMB = function () {
        return this._data.get("totalChargeRMB");
    };
    LoginBackMessage.prototype.setMonthEndTime = function (monthEndTime) {
        this._data.set("monthEndTime", monthEndTime);
    };
    LoginBackMessage.prototype.getMonthEndTime = function () {
        return this._data.get("monthEndTime");
    };
    LoginBackMessage.prototype.setMonthSignActiveInfo = function (monthSignActiveInfo) {
        this._data.set("monthSignActiveInfo", monthSignActiveInfo);
    };
    LoginBackMessage.prototype.getMonthSignActiveInfo = function () {
        return this._data.get("monthSignActiveInfo");
    };
    LoginBackMessage.prototype.setIsTodayFirstLogin = function (isTodayFirstLogin) {
        this._data.set("isTodayFirstLogin", isTodayFirstLogin);
    };
    LoginBackMessage.prototype.getIsTodayFirstLogin = function () {
        return this._data.get("isTodayFirstLogin");
    };
    LoginBackMessage.prototype.setNextDayAwardActiveInfo = function (nextDayAwardActiveInfo) {
        this._data.set("nextDayAwardActiveInfo", nextDayAwardActiveInfo);
    };
    LoginBackMessage.prototype.getNextDayAwardActiveInfo = function () {
        return this._data.get("nextDayAwardActiveInfo");
    };
    LoginBackMessage.prototype.setIsTodayDraw = function (isTodayDraw) {
        this._data.set("isTodayDraw", isTodayDraw);
    };
    LoginBackMessage.prototype.getIsTodayDraw = function () {
        return this._data.get("isTodayDraw");
    };
    LoginBackMessage.prototype.setName = function (name) {
        this._data.set("name", name);
    };
    LoginBackMessage.prototype.getName = function () {
        return this._data.get("name");
    };
    LoginBackMessage.prototype.setIconUrl = function (iconUrl) {
        this._data.set("iconUrl", iconUrl);
    };
    LoginBackMessage.prototype.getIconUrl = function () {
        return this._data.get("iconUrl");
    };
    LoginBackMessage.prototype.setActiveInfo = function (activeInfo) {
        this._data.set("activeInfo", activeInfo);
    };
    LoginBackMessage.prototype.getActiveInfo = function () {
        return this._data.get("activeInfo");
    };
    LoginBackMessage.prototype.setChargedGears = function (chargedGears) {
        this._data.set("chargedGears", chargedGears);
    };
    LoginBackMessage.prototype.getChargedGears = function () {
        return this._data.get("chargedGears");
    };
    LoginBackMessage.prototype.setExchangedGears = function (exchangedGears) {
        this._data.set("exchangedGears", exchangedGears);
    };
    LoginBackMessage.prototype.getExchangedGears = function () {
        return this._data.get("exchangedGears");
    };
    LoginBackMessage.prototype.setSelfInviteCode = function (selfInviteCode) {
        this._data.set("selfInviteCode", selfInviteCode);
    };
    LoginBackMessage.prototype.getSelfInviteCode = function () {
        return this._data.get("selfInviteCode");
    };
    LoginBackMessage.prototype.getPID = function () {
        return 2002;
    };
    LoginBackMessage.prototype.initData = function () {
        this._data = new this._clazz();
    };
    LoginBackMessage.prototype.setData = function (buff) {
        this._data = this._clazz.decode(buff);
    };
    LoginBackMessage.prototype.toByteArray = function () {
        var arraybuffer = this._data.toArrayBuffer();
        return new egret.ByteArray(arraybuffer);
    };
    return LoginBackMessage;
}(MessageBase));
__reflect(LoginBackMessage.prototype, "LoginBackMessage");
//# sourceMappingURL=LoginBackMessage.js.map