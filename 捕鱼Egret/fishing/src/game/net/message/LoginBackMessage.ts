//Auto Generate File, Do NOT Modify!!!!!!!!!!!!!!!

class LoginBackMessage extends MessageBase {
	private _data:any = null;
	private _clazz:any = null;
	
	public constructor() {
		super();  
		var builder:any = dcodeIO.ProtoBuf.loadProto(game.net.ProtoFileEnum.user);   
		this._clazz = builder.build("LoginBack");     
	}			
	
	public setId(id:any):void {
		this._data.set("id", id);
	}

	public getId():any {
		return this._data.get("id");
	}
			
	public setTaskInfo(taskInfo:any):void {
		this._data.set("taskInfo", taskInfo);
	}

	public getTaskInfo():any {
		return this._data.get("taskInfo");
	}
			
	public setItemInfo(itemInfo:any):void {
		this._data.set("itemInfo", itemInfo);
	}

	public getItemInfo():any {
		return this._data.get("itemInfo");
	}
			
	public setCoins(coins:any):void {
		this._data.set("coins", coins);
	}

	public getCoins():any {
		return this._data.get("coins");
	}
			
	public setGems(gems:any):void {
		this._data.set("gems", gems);
	}

	public getGems():any {
		return this._data.get("gems");
	}
			
	public setVipLevel(vipLevel:any):void {
		this._data.set("vipLevel", vipLevel);
	}

	public getVipLevel():any {
		return this._data.get("vipLevel");
	}
			
	public setSystemTime(systemTime:any):void {
		this._data.set("systemTime", systemTime);
	}

	public getSystemTime():any {
		return this._data.get("systemTime");
	}
			
	public setMaxGunId(maxGunId:any):void {
		this._data.set("maxGunId", maxGunId);
	}

	public getMaxGunId():any {
		return this._data.get("maxGunId");
	}
			
	public setCanReliefTime(canReliefTime:any):void {
		this._data.set("canReliefTime", canReliefTime);
	}

	public getCanReliefTime():any {
		return this._data.get("canReliefTime");
	}
			
	public setMailListByType(mailListByType:any):void {
		this._data.set("mailListByType", mailListByType);
	}

	public getMailListByType():any {
		return this._data.get("mailListByType");
	}
			
	public setRoleLevel(roleLevel:any):void {
		this._data.set("roleLevel", roleLevel);
	}

	public getRoleLevel():any {
		return this._data.get("roleLevel");
	}
			
	public setRoleExp(roleExp:any):void {
		this._data.set("roleExp", roleExp);
	}

	public getRoleExp():any {
		return this._data.get("roleExp");
	}
			
	public setEverydayActive(everydayActive:any):void {
		this._data.set("everydayActive", everydayActive);
	}

	public getEverydayActive():any {
		return this._data.get("everydayActive");
	}
			
	public setEveryWeekActive(everyWeekActive:any):void {
		this._data.set("everyWeekActive", everyWeekActive);
	}

	public getEveryWeekActive():any {
		return this._data.get("everyWeekActive");
	}
			
	public setNewbieGuideId(newbieGuideId:any):void {
		this._data.set("newbieGuideId", newbieGuideId);
	}

	public getNewbieGuideId():any {
		return this._data.get("newbieGuideId");
	}
			
	public setBatterySkinId(batterySkinId:any):void {
		this._data.set("batterySkinId", batterySkinId);
	}

	public getBatterySkinId():any {
		return this._data.get("batterySkinId");
	}
			
	public setGunrestSkinId(gunrestSkinId:any):void {
		this._data.set("gunrestSkinId", gunrestSkinId);
	}

	public getGunrestSkinId():any {
		return this._data.get("gunrestSkinId");
	}
			
	public setCoupon(coupon:any):void {
		this._data.set("coupon", coupon);
	}

	public getCoupon():any {
		return this._data.get("coupon");
	}
			
	public setTotalChargeRMB(totalChargeRMB:any):void {
		this._data.set("totalChargeRMB", totalChargeRMB);
	}

	public getTotalChargeRMB():any {
		return this._data.get("totalChargeRMB");
	}
			
	public setMonthEndTime(monthEndTime:any):void {
		this._data.set("monthEndTime", monthEndTime);
	}

	public getMonthEndTime():any {
		return this._data.get("monthEndTime");
	}
			
	public setMonthSignActiveInfo(monthSignActiveInfo:any):void {
		this._data.set("monthSignActiveInfo", monthSignActiveInfo);
	}

	public getMonthSignActiveInfo():any {
		return this._data.get("monthSignActiveInfo");
	}
			
	public setIsTodayFirstLogin(isTodayFirstLogin:any):void {
		this._data.set("isTodayFirstLogin", isTodayFirstLogin);
	}

	public getIsTodayFirstLogin():any {
		return this._data.get("isTodayFirstLogin");
	}
			
	public setNextDayAwardActiveInfo(nextDayAwardActiveInfo:any):void {
		this._data.set("nextDayAwardActiveInfo", nextDayAwardActiveInfo);
	}

	public getNextDayAwardActiveInfo():any {
		return this._data.get("nextDayAwardActiveInfo");
	}
			
	public setIsTodayDraw(isTodayDraw:any):void {
		this._data.set("isTodayDraw", isTodayDraw);
	}

	public getIsTodayDraw():any {
		return this._data.get("isTodayDraw");
	}
			
	public setName(name:any):void {
		this._data.set("name", name);
	}

	public getName():any {
		return this._data.get("name");
	}
			
	public setIconUrl(iconUrl:any):void {
		this._data.set("iconUrl", iconUrl);
	}

	public getIconUrl():any {
		return this._data.get("iconUrl");
	}
			
	public setActiveInfo(activeInfo:any):void {
		this._data.set("activeInfo", activeInfo);
	}

	public getActiveInfo():any {
		return this._data.get("activeInfo");
	}
			
	public setChargedGears(chargedGears:any):void {
		this._data.set("chargedGears", chargedGears);
	}

	public getChargedGears():any {
		return this._data.get("chargedGears");
	}
			
	public setExchangedGears(exchangedGears:any):void {
		this._data.set("exchangedGears", exchangedGears);
	}

	public getExchangedGears():any {
		return this._data.get("exchangedGears");
	}
			
	public setSelfInviteCode(selfInviteCode:any):void {
		this._data.set("selfInviteCode", selfInviteCode);
	}

	public getSelfInviteCode():any {
		return this._data.get("selfInviteCode");
	}
			
	public getPID():number {
		return 2002;
	}

	public initData():void {                
		this._data = new this._clazz();  
	}

	public setData(buff:egret.ByteArray):void {
		this._data = this._clazz.decode(buff);  
	}

	public toByteArray():egret.ByteArray {
		var arraybuffer: ArrayBuffer = this._data.toArrayBuffer();
		return new egret.ByteArray(arraybuffer);
	}
}
			