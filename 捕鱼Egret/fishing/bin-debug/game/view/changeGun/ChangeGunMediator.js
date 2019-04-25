var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChangeGunMediator = (function (_super) {
    __extends(ChangeGunMediator, _super);
    function ChangeGunMediator(view) {
        return _super.call(this, view) || this;
    }
    ChangeGunMediator.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        //注册观察者
        this.subscrib(NotifyEnum.CHANGE_GUN_UI_LOADED, this.loaded);
        this.getView().initView();
    };
    ChangeGunMediator.prototype.loaded = function (obj, target) {
        var view = target.getView();
        var vos = target.getGunVos();
        var model = burn.Director.getModelByKey(UserModel);
        var items = model.getItemList();
        var len = vos.length;
        var arr = new Array();
        for (var i = 0; i < len; i++) {
            var vo = vos[i];
            var state = -1;
            var itemBag = new game.model.Item(vo.id, 1);
            if (!model.isExist(itemBag)) {
                state = GunState.UnGain;
            }
            else {
                if (model.getCurSkinId() == vo.id) {
                    state = GunState.Equip;
                }
                else {
                    //TODO 是否失效
                    state = GunState.Act;
                }
            }
            var item = new game.model.GunItem(vos[i], state);
            arr.push(item);
        }
        view.showList(arr);
    };
    ChangeGunMediator.prototype.init = function () {
    };
    ChangeGunMediator.prototype.getGunVos = function () {
        var voArr = new Array();
        var vos = game.table.T_Item_Table.getAllVo();
        var len = vos.length;
        for (var i = 0; i < len; i++) {
            if (vos[i].type == BagItemType.BATTERY) {
                voArr.push(vos[i]);
            }
        }
        return voArr;
    };
    ChangeGunMediator.prototype.update = function () {
        this.loaded(null, this);
    };
    ChangeGunMediator.prototype.destroy = function () {
        this.unsubscribByType(NotifyEnum.CHANGE_GUN_UI_LOADED);
        this.getView().destroy();
    };
    return ChangeGunMediator;
}(burn.mediator.SimpleMediator));
__reflect(ChangeGunMediator.prototype, "ChangeGunMediator");
//# sourceMappingURL=ChangeGunMediator.js.map