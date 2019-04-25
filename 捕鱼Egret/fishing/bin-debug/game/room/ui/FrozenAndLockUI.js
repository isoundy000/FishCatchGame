var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 冰冻和锁定功能
 */
var FrozenAndLockUI = (function (_super) {
    __extends(FrozenAndLockUI, _super);
    function FrozenAndLockUI(clazz) {
        var _this = _super.call(this) || this;
        _this.skinName = clazz;
        //冰冻
        //this.buttonFrozenN.addEventListener(egret.TouchEvent.TOUCH_TAP, this.frozenBtn, this);
        //锁定
        //this.buttonLockN.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lockBtn, this);
        //加载解锁炮倍UI
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/newProgressButton.exml", _this.loaded, _this);
        return _this;
    }
    FrozenAndLockUI.prototype.loaded = function (clazz, url) {
        this.buttonFrozenNN = new NewProgresButton(clazz, "frozen_skill");
        this.buttonFrozenNN.setButtonClickFun(function () {
            burn._Notification_.send(NotifyEnum.USE_PROP_ITEM, PropEnum.FROZEN);
        });
        this.buttonFrozenNN.setIcon("frozen_skill");
        var frozenVo = game.table.T_Item_Table.getVoByKey(PropEnum.FROZEN);
        var str = frozenVo.worth.split('_')[2];
        this.buttonFrozenNN.setGemCost(str);
        var f_time = 8;
        var c_vo = game.table.T_Config_Table.getVoByKey(88);
        if (c_vo) {
            f_time = Number(c_vo.value);
        }
        this.buttonFrozenNN.setTimeTotal(f_time);
        this.buttonFrozenNN.anchorOffsetX = this.buttonFrozenNN.width >> 1;
        this.buttonFrozenNN.anchorOffsetY = this.buttonFrozenNN.height >> 1;
        this.frozenGroup.addChild(this.buttonFrozenNN);
        this.buttonLockNN = new NewProgresButton(clazz, "lock_skill");
        this.buttonLockNN.setButtonClickFun(function () {
            burn._Notification_.send(NotifyEnum.USE_PROP_ITEM, PropEnum.LOCK);
        });
        this.buttonLockNN.setIcon("lock_skill");
        var LockVo = game.table.T_Item_Table.getVoByKey(PropEnum.LOCK);
        var Lockstr = LockVo.worth.split('_')[2];
        this.buttonLockNN.setGemCost(Lockstr);
        var l_time = 20;
        var l_vo = game.table.T_Config_Table.getVoByKey(87);
        if (l_vo) {
            l_time = Number(l_vo.value);
        }
        this.buttonLockNN.setTimeTotal(l_time);
        this.buttonLockNN.anchorOffsetX = this.buttonLockNN.width >> 1;
        this.buttonLockNN.anchorOffsetY = this.buttonLockNN.height >> 1;
        this.lockGroup.addChild(this.buttonLockNN);
        var userModel = burn.Director.getModelByKey(UserModel);
        var frozenItem = userModel.getItemById(PropEnum.FROZEN);
        var frozenNum = 0;
        if (frozenItem) {
            frozenNum = frozenItem.getCount();
        }
        this.setFrozenTxt("" + frozenNum);
        var lockItem = userModel.getItemById(PropEnum.LOCK);
        var lockNum = 0;
        if (lockItem) {
            lockNum = lockItem.getCount();
        }
        this.setLockTxt("" + lockNum);
    };
    /** 点击锁定道具 */
    FrozenAndLockUI.prototype.lockBtn = function (evt) {
        burn._Notification_.send(NotifyEnum.USE_PROP_ITEM, PropEnum.LOCK);
    };
    /** 点击使用冰冻道具 */
    FrozenAndLockUI.prototype.frozenBtn = function (evt) {
        burn._Notification_.send(NotifyEnum.USE_PROP_ITEM, PropEnum.FROZEN);
    };
    /** 设置冰冻道具数量 */
    FrozenAndLockUI.prototype.setFrozenTxt = function (txt) {
        if (this.buttonFrozenNN) {
            this.buttonFrozenNN.setNum(txt);
        }
    };
    /** 设置锁定道具数量 */
    FrozenAndLockUI.prototype.setLockTxt = function (txt) {
        if (this.buttonLockNN) {
            this.buttonLockNN.setNum(txt);
        }
    };
    return FrozenAndLockUI;
}(eui.Component));
__reflect(FrozenAndLockUI.prototype, "FrozenAndLockUI");
//# sourceMappingURL=FrozenAndLockUI.js.map