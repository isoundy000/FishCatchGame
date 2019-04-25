var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ActiveLeftItem = (function (_super) {
    __extends(ActiveLeftItem, _super);
    function ActiveLeftItem() {
        var _this = _super.call(this) || this;
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/ActiveLeftItem.exml";
        return _this;
    }
    ActiveLeftItem.prototype.setImg = function (url, index) {
        var self = this;
        var txtr = url + "_2_png";
        RES.getResAsync(txtr, function () {
            var txture = RES.getRes(txtr);
            var img = new egret.Bitmap(txture);
            img.anchorOffsetX = img.width / 2;
            img.anchorOffsetY = img.height / 2;
            self.unSelGroup.addChild(img);
        }, this);
        var txtr1 = url + "_1_png";
        RES.getResAsync(txtr1, function () {
            var txture = RES.getRes(txtr1);
            var img = new egret.Bitmap(txture);
            img.anchorOffsetX = img.width / 2;
            img.anchorOffsetY = img.height / 2;
            self.selGroup.addChild(img);
        }, this);
        this._nIndex = index;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeActive, this);
        //alert 获取活动状态
        var activeModel = burn.Director.getModelByKey(ActiveModel);
        var userModel = burn.Director.getModelByKey(UserModel);
        var list = activeModel.getActiveList();
        var type = list[this._nIndex]._type;
        var item = activeModel.getActiveObjByType(type);
        var data = activeModel.getActiveDataById(item._id);
        switch (type) {
            case Active_Type.LIMIT_TIME_ACTIVE_TYPE_FISH_SEND:
                var curGunId = userModel.getCurGunID();
                var gunVo = game.table.T_Gun_Table.getVoByKey(curGunId);
                var max = Number(item._parameter1) * gunVo.bulletNum; //第一个参数是进度条的max
                var cur = data._value;
                var percent = cur * 1.0 / Number(max);
                if (data._state == Active_State.LIMIT_TIME_ACTIVE_STATE_ACCEPTED) {
                    if (percent >= 1) {
                        this.alert.visible = true;
                        return;
                    }
                }
                break;
            case Active_Type.LIMIT_TIME_ACTIVE_TYPE_CHARGE_SEND:
                //value / _parameter1 * 10
                var curv = data._value;
                var maxv = Number(item._parameter1) * 10;
                if (data._state != Active_State.LIMIT_TIME_ACTIVE_STATE_RECEIVED) {
                    if (curv >= maxv) {
                        this.alert.visible = true;
                        return;
                    }
                }
                //充值杜少
                break;
            case Active_Type.LIMIT_TIME_ACTIVE_TYPE_VIP_SEND:
                //
                if (userModel.getVipLevel() > 0 && data._state != Active_State.LIMIT_TIME_ACTIVE_STATE_RECEIVED) {
                    this.alert.visible = true;
                    return;
                }
                break;
        }
        this.alert.visible = false;
    };
    ActiveLeftItem.prototype.onChangeActive = function (e) {
        burn._Notification_.send(NotifyEnum.CHANGE_ACTIVE, this._nIndex);
    };
    ActiveLeftItem.prototype.selectByBoolean = function (value) {
        this.selected.visible = value;
    };
    return ActiveLeftItem;
}(eui.Component));
__reflect(ActiveLeftItem.prototype, "ActiveLeftItem");
//# sourceMappingURL=ActiveLeftItem.js.map