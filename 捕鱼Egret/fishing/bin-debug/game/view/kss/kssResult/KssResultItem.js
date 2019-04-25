var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var KssResultItemUI = (function (_super) {
    __extends(KssResultItemUI, _super);
    function KssResultItemUI() {
        var _this = _super.call(this) || this;
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Kss/KssResultItem.exml";
        return _this;
    }
    KssResultItemUI.prototype.setData = function (msg, myId) {
        this.rankLab.text = msg.rank + "";
        this.nameLab.text = msg.name + "";
        this.scoreLab.text = msg.integral + "";
        if (myId == Number(msg.userId)) {
            this.sel.visible = true;
        }
        else {
            this.sel.visible = false;
        }
        this.gainLab.text = "";
        this.war.visible = false;
        this.coin.visible = false;
        var rank = Number(msg.rank);
        if (rank > 3) {
            return;
        }
        var userModel = burn.Director.getModelByKey(UserModel);
        var vo = game.table.T_QuickGame_Table.getVoByKey(userModel.getMatchRoomLevel());
        if (rank == 1) {
            var strData = vo.theFirst.split("_");
            if (Number(strData[0]) == PropEnum.GOLD) {
                this.war.visible = false;
                this.coin.visible = true;
            }
            else {
                this.war.visible = true;
                this.coin.visible = false;
            }
            this.gainLab.text = strData[1];
        }
        else if (rank == 2) {
            var strData = vo.theSecond.split("_");
            if (Number(strData[0]) == PropEnum.GOLD) {
                this.war.visible = false;
                this.coin.visible = true;
            }
            else {
                this.war.visible = true;
                this.coin.visible = false;
            }
            this.gainLab.text = strData[1];
        }
        else if (rank == 3) {
            var strData = vo.theThird.split("_");
            if (Number(strData[0]) == PropEnum.GOLD) {
                this.war.visible = false;
                this.coin.visible = true;
            }
            else {
                this.war.visible = true;
                this.coin.visible = false;
            }
            this.gainLab.text = strData[1];
        }
    };
    return KssResultItemUI;
}(eui.Component));
__reflect(KssResultItemUI.prototype, "KssResultItemUI");
//# sourceMappingURL=KssResultItem.js.map