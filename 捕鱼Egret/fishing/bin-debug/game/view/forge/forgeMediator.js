var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var ForgeMediator = (function (_super) {
    __extends(ForgeMediator, _super);
    function ForgeMediator(view) {
        return _super.call(this, view) || this;
    }
    ForgeMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        this.getView().initView();
    };
    ForgeMediator.prototype.init = function () {
        var _this = this;
        //注册观察者
        this.subscrib(NotifyEnum.CHECK_FORGEUI_LOADED, this.loaded);
        //注册开炮观察者
        this.subscrib(NotifyEnum.SET_USEENSENCE_FLAG, this.setUseEnsenceFlag);
        this.isUseEns = false;
        //解锁泡杯返回监听消息
        game.net.MessageDispatcher.register(game.net.ResponseType.UPGRADEORFORGEBACK, function (msg) {
            _this.ForgeBack(msg);
        });
    };
    ForgeMediator.prototype.loaded = function (obj, target) {
        target.checkForgeData();
    };
    //设置检测
    ForgeMediator.prototype.setUseEnsenceFlag = function (obj, target) {
        if (target.isUseEns == true) {
            target.isUseEns = false;
            target.checkForgeData();
            return;
        }
        var userModle = burn.Director.getModelByKey(UserModel);
        //最高ID
        var gunRate = userModle.getCurGunID();
        var gunRateVo = game.table.T_Gun_Table.getVoByKey(gunRate);
        //判断有没有下一个炮倍
        if (gunRateVo) {
            var arrEnsence = gunRateVo.forgeSuccessAlsoCost;
            var arrEnsData = arrEnsence.split("_");
            var ensId = parseInt(arrEnsData[0]);
            var ensNum = parseInt(arrEnsData[1]);
            var item = new game.model.Item(ensId, 0);
            if (!userModle.isExist(item)) {
                target.isUseEns = false;
                target.checkForgeData();
                game.util.GameUtil.popTips(game.util.Language.getText(86));
                return;
            }
            var bagNum = userModle.getItemById(ensId).getCount();
            if (bagNum < ensNum) {
                target.isUseEns = false;
                target.checkForgeData();
                game.util.GameUtil.popTips(game.util.Language.getText(86));
                return;
            }
            //存在且数量满足
            target.isUseEns = true;
            target.checkForgeData();
        }
    };
    //无需水晶精华锻造
    ForgeMediator.prototype.checkForgeData = function () {
        var userModle = burn.Director.getModelByKey(UserModel);
        //最高ID
        var gunRate = userModle.getCurGunID();
        var gunRateVo = game.table.T_Gun_Table.getVoByKey(gunRate);
        //判断有没有下一个炮倍
        if (gunRateVo) {
            var arr = gunRateVo.upgradeOrForgeCost;
            var arrData = arr.split(",");
            var bEnough = true;
            var nEnoughNum = 0;
            var nCurNum = 0;
            for (var i = 0; i < arrData.length; i++) {
                var item = arrData[i];
                var arrStr = item.split("_");
                var id = parseInt(arrStr[0]);
                var num = parseInt(arrStr[1]);
                var itemLast = userModle.getItemById(id);
                var itemObj = new game.model.Item(id, num);
                if (!userModle.isExist(itemObj)) {
                    bEnough = false;
                    break;
                }
                if (userModle.getItemById(id).getCount() < num) {
                    bEnough = false;
                    break;
                }
            }
            if (bEnough) {
                //如果是精华锻造,扣除精华
                if (this.isUseEns) {
                    var arrEnsence = gunRateVo.forgeSuccessAlsoCost;
                    var arrEnsData = arrEnsence.split("_");
                    var ensId = parseInt(arrEnsData[0]);
                    var ensNum = parseInt(arrEnsData[1]);
                    var itemEnsLast = userModle.getItemById(ensId);
                    if (!userModle.isExist(itemEnsLast)) {
                        bEnough = false;
                    }
                    if (userModle.getItemById(ensId).getCount() < ensNum) {
                        bEnough = false;
                    }
                }
            }
            var view = this.getView();
            view.setUIData(gunRate, this.isUseEns, bEnough);
        }
    };
    //解锁炮倍返回的逻辑
    ForgeMediator.prototype.ForgeBack = function (msg) {
        var view = this.getView();
        var state = msg.getState();
        if (state == UpdateOrForgeType.TYPE_SUC) {
            var type = msg.getType();
            if (type == GunUpdateType.UNLOCK) {
                return;
            }
            var userModle = burn.Director.getModelByKey(UserModel);
            var gunId = msg.getAfterGunId();
            userModle.setCurGunID(gunId);
            //需要自己扣一下材料
            var gunLastVo = game.table.T_Gun_Table.getVoByKey(gunId - 1);
            if (gunLastVo) {
                var arr = gunLastVo.upgradeOrForgeCost;
                var arrData = arr.split(",");
                var bEnough = true;
                var nEnoughNum = 0;
                var nCurNum = 0;
                for (var i = 0; i < arrData.length; i++) {
                    var item = arrData[i];
                    var arrStr = item.split("_");
                    var id = parseInt(arrStr[0]);
                    var num = parseInt(arrStr[1]);
                    var itemLast = userModle.getItemById(id);
                    userModle.updateItem(id, itemLast.getCount() - num);
                }
                //如果是精华锻造,扣除精华
                if (type == GunUpdateType.USE_ESSENCE_FORGE_TYPE) {
                    var arrEnsence = gunLastVo.forgeSuccessAlsoCost;
                    var arrEnsData = arrEnsence.split("_");
                    var ensId = parseInt(arrEnsData[0]);
                    var ensNum = parseInt(arrEnsData[1]);
                    var itemEnsLast = userModle.getItemById(ensId);
                    userModle.updateItem(ensId, itemEnsLast.getCount() - ensNum);
                }
            }
            this.checkForgeData();
        }
        else {
            var userModle = burn.Director.getModelByKey(UserModel);
            var gunOldId = userModle.getCurGunID();
            //userModle.setCurGunID(gunId);
            //需要自己扣一下材料
            var gunLastVo = game.table.T_Gun_Table.getVoByKey(gunOldId);
            if (gunLastVo) {
                var arr = gunLastVo.upgradeOrForgeCost;
                var arrData = arr.split(",");
                var bEnough = true;
                var nEnoughNum = 0;
                var nCurNum = 0;
                for (var i = 0; i < arrData.length; i++) {
                    var item = arrData[i];
                    var arrStr = item.split("_");
                    var id = parseInt(arrStr[0]);
                    var num = parseInt(arrStr[1]);
                    var itemLast = userModle.getItemById(id);
                    userModle.updateItem(id, itemLast.getCount() - num);
                }
            }
            var items = msg.getItemProto();
            //随机返还的水晶精华
            for (var i = 0; i < items.length; i++) {
                var itemId = items[i].itemId;
                var count = items[i].count;
                var itemShuijing = new game.model.Item(itemId, count);
                userModle.addItem(itemShuijing);
            }
            this.checkForgeData();
        }
        //成功
        setTimeout(function () {
            view.setEffect(state);
        }, 800);
    };
    ForgeMediator.prototype.destroy = function () {
        this.getView().destroy();
        //移除观察者
        this.unsubscribByType(NotifyEnum.SET_USEENSENCE_FLAG);
        this.unsubscribByType(NotifyEnum.CHECK_FORGEUI_LOADED);
        //移除消息监听
        game.net.MessageDispatcher.unregister(game.net.ResponseType.UPGRADEORFORGEBACK);
    };
    return ForgeMediator;
}(burn.mediator.SimpleMediator));
__reflect(ForgeMediator.prototype, "ForgeMediator");
//# sourceMappingURL=forgeMediator.js.map