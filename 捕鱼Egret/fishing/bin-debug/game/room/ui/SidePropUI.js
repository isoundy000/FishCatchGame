var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 侧边栏道具
 * 葫芦-分身-狂暴
 */
var SidePropUI = (function (_super) {
    __extends(SidePropUI, _super);
    function SidePropUI(clazz) {
        var _this = _super.call(this) || this;
        _this.skinName = clazz;
        //葫芦
        //this.calabashBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.calabash, this);
        //狂暴
        //this.buttonRage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rageBtn, this);
        //分身
        //this.buttonClone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cloneBtn, this);
        //加载解锁炮倍UI
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/newProgressButton.exml", _this.loaded, _this);
        return _this;
    }
    SidePropUI.prototype.loaded = function (clazz, url) {
        var userModel = burn.Director.getModelByKey(UserModel);
        this.buttonCalabashNN = new NewProgresButton(clazz, "calabashBtn");
        this.buttonCalabashNN.setButtonClickFun(function () {
            burn._Notification_.send(NotifyEnum.USE_PROP_ITEM, PropEnum.CALABASH);
        });
        this.buttonCalabashNN.setIcon("calabashBtn_png");
        var CalabashVo = game.table.T_Item_Table.getVoByKey(PropEnum.CALABASH);
        var Calabashstr = CalabashVo.worth.split('_')[2];
        this.buttonCalabashNN.setGemCost(Calabashstr);
        var c_vo = game.table.T_Config_Table.getVoByKey(89);
        var c_time = 2;
        if (c_vo) {
            c_time = Number(c_vo.value);
        }
        this.buttonCalabashNN.setTimeTotal(c_time);
        this.buttonCalabashNN.anchorOffsetX = this.buttonCalabashNN.width / 2;
        this.buttonCalabashNN.anchorOffsetY = this.buttonCalabashNN.height / 2;
        this.calabashGroup.addChild(this.buttonCalabashNN);
        this.buttonRageNN = new NewProgresButton(clazz, "rageBtn");
        this.buttonRageNN.setButtonClickFun(function () {
            burn._Notification_.send(NotifyEnum.USE_PROP_ITEM, PropEnum.RAGE);
        });
        this.buttonRageNN.setIcon("rageBtn_png");
        var RageVo = game.table.T_Item_Table.getVoByKey(PropEnum.RAGE);
        var Ragestr = RageVo.worth.split('_')[2];
        if (userModel.getMatchRoomLevel() == RequesetRoomState.QmsRoom) {
            this.buttonRageNN.setGemCost(undefined);
        }
        else {
            this.buttonRageNN.setGemCost(Ragestr);
        }
        var r_vo = game.table.T_Config_Table.getVoByKey(90);
        var r_time = 30;
        if (r_vo) {
            r_time = Number(r_vo.value);
        }
        this.buttonRageNN.setTimeTotal(r_time);
        this.buttonRageNN.anchorOffsetX = this.buttonRageNN.width / 2;
        this.buttonRageNN.anchorOffsetY = this.buttonRageNN.height / 2;
        this.rageGroup.addChild(this.buttonRageNN);
        if (userModel.getMatchRoomLevel() == RequesetRoomState.QmsRoom) {
            this.buttonRageNN.freeImg.visible = true;
        }
        else {
            var lockedRageLv = game.table.T_Config_Table.getVoByKey(34).value.split("_")[0];
            if (userModel.getVipLevel() < Number(lockedRageLv)) {
                this.buttonRageNN.lockedImg.visible = true;
            }
        }
        this.buttonCloneNN = new NewProgresButton(clazz, "cloneBtn");
        this.buttonCloneNN.setButtonClickFun(function () {
            burn._Notification_.send(NotifyEnum.USE_PROP_ITEM, PropEnum.CLONE);
        });
        this.buttonCloneNN.setIcon("cloneBtn_png");
        var CloneVo = game.table.T_Item_Table.getVoByKey(PropEnum.CLONE);
        var Clonestr = CloneVo.worth.split('_')[2];
        if (userModel.getMatchRoomLevel() == RequesetRoomState.QmsRoom) {
            this.buttonCloneNN.setGemCost(undefined);
        }
        else {
            this.buttonCloneNN.setGemCost(Clonestr);
        }
        var cl_vo = game.table.T_Config_Table.getVoByKey(90);
        var cl_time = 30;
        if (cl_vo) {
            cl_time = Number(cl_vo.value);
        }
        this.buttonCloneNN.setTimeTotal(cl_time);
        this.buttonCloneNN.anchorOffsetX = this.buttonCloneNN.width / 2;
        this.buttonCloneNN.anchorOffsetY = this.buttonCloneNN.height / 2;
        this.cloneGroup.addChild(this.buttonCloneNN);
        if (userModel.getMatchRoomLevel() == RequesetRoomState.QmsRoom) {
            this.buttonCloneNN.freeImg.visible = true;
        }
        else {
            var lockedCloneLv = game.table.T_Config_Table.getVoByKey(35).value.split("_")[0];
            if (userModel.getVipLevel() < Number(lockedCloneLv)) {
                this.buttonCloneNN.lockedImg.visible = true;
            }
        }
        this.buttonCalabashNN.setTypeSide();
        this.buttonRageNN.setTypeSide();
        this.buttonCloneNN.setTypeSide();
        var cloneItem = userModel.getItemById(PropEnum.CLONE);
        var rageItem = userModel.getItemById(PropEnum.RAGE);
        var calabashItem = userModel.getItemById(PropEnum.CALABASH);
        if (userModel.getMatchRoomLevel() == RequesetRoomState.QmsRoom) {
            rageItem = userModel.getItemById(PropEnum.FREE_RAGE);
            cloneItem = userModel.getItemById(PropEnum.FREE_CLONE);
        }
        var cloneNum = 0;
        var rageNum = 0;
        var calabashNum = 0;
        if (cloneItem) {
            cloneNum = cloneItem.getCount();
        }
        this.setCloneTxt("" + cloneNum);
        if (rageItem) {
            rageNum = rageItem.getCount();
        }
        this.setRageTxt("" + rageNum);
        if (calabashItem) {
            calabashNum = calabashItem.getCount();
        }
        this.setCalabashTxt("" + calabashNum);
    };
    /** 使用葫芦道具 */
    SidePropUI.prototype.calabash = function (evt) {
        burn._Notification_.send(NotifyEnum.USE_PROP_ITEM, PropEnum.CALABASH);
    };
    /** 点击狂暴道具 */
    SidePropUI.prototype.rageBtn = function (evt) {
        burn._Notification_.send(NotifyEnum.USE_PROP_ITEM, PropEnum.RAGE);
    };
    /** 点击分身道具 */
    SidePropUI.prototype.cloneBtn = function (evt) {
        burn._Notification_.send(NotifyEnum.USE_PROP_ITEM, PropEnum.CLONE);
    };
    SidePropUI.prototype.setCalabashTxt = function (txt) {
        //this.calabashTxt.text = txt;
        if (this.buttonCalabashNN) {
            this.buttonCalabashNN.setNum(txt);
        }
    };
    SidePropUI.prototype.setRageTxt = function (txt) {
        //this.rageTxt.text = txt;
        if (this.buttonRageNN) {
            this.buttonRageNN.setNum(txt);
        }
    };
    SidePropUI.prototype.setCloneTxt = function (txt) {
        //this.cloneTxt.text = txt;
        if (this.buttonCloneNN) {
            this.buttonCloneNN.setNum(txt);
        }
    };
    return SidePropUI;
}(eui.Component));
__reflect(SidePropUI.prototype, "SidePropUI");
//# sourceMappingURL=SidePropUI.js.map