var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RecodeItemUI = (function (_super) {
    __extends(RecodeItemUI, _super);
    function RecodeItemUI() {
        var _this = _super.call(this) || this;
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/Recode.exml";
        return _this;
    }
    RecodeItemUI.prototype.setData = function (data) {
        var id = data.exchangeGoodsId;
        var time = data.time;
        var phone = data.phone;
        var exchangeModel = burn.Director.getModelByKey(ExchangeModel);
        var obj = exchangeModel.getListById(Number(id));
        this.nameLab.text = obj._name;
        this.timeLab.text = game.util.TimeUtil.longToDateStr(Number(time));
        this.phone.text = phone;
        if (obj._color) {
            switch (obj._color) {
                case Exchange_Color.White:
                    break;
                case Exchange_Color.Green:
                    this.nameLab.textColor = 0x00ff00;
                    this.timeLab.textColor = 0x00ff00;
                    this.phone.textColor = 0x00ff00;
                    this.lab_1.textColor = 0x00ff00;
                    this.lab_2.textColor = 0x00ff00;
                    this.lab_3.textColor = 0x00ff00;
                    this.lab_4.textColor = 0x00ff00;
                    break;
                case Exchange_Color.Blue:
                    this.nameLab.textColor = 0x0080ff;
                    this.timeLab.textColor = 0x0080ff;
                    this.phone.textColor = 0x0080ff;
                    this.lab_1.textColor = 0x0080ff;
                    this.lab_2.textColor = 0x0080ff;
                    this.lab_3.textColor = 0x0080ff;
                    this.lab_4.textColor = 0x0080ff;
                    break;
                case Exchange_Color.Purple:
                    this.nameLab.textColor = 0xd800ff;
                    this.timeLab.textColor = 0xd800ff;
                    this.phone.textColor = 0xd800ff;
                    this.lab_1.textColor = 0xd800ff;
                    this.lab_2.textColor = 0xd800ff;
                    this.lab_3.textColor = 0xd800ff;
                    this.lab_4.textColor = 0xd800ff;
                    break;
                case Exchange_Color.Origen:
                    this.nameLab.textColor = 0xff8400;
                    this.timeLab.textColor = 0xff8400;
                    this.phone.textColor = 0xff8400;
                    this.lab_1.textColor = 0xff8400;
                    this.lab_2.textColor = 0xff8400;
                    this.lab_3.textColor = 0xff8400;
                    this.lab_4.textColor = 0xff8400;
                    break;
                case Exchange_Color.Red:
                    this.nameLab.textColor = 0xff0000;
                    this.timeLab.textColor = 0xff0000;
                    this.phone.textColor = 0xff0000;
                    this.lab_1.textColor = 0xff0000;
                    this.lab_2.textColor = 0xff0000;
                    this.lab_3.textColor = 0xff0000;
                    this.lab_4.textColor = 0xff0000;
                    break;
            }
        }
    };
    return RecodeItemUI;
}(eui.Component));
__reflect(RecodeItemUI.prototype, "RecodeItemUI");
//# sourceMappingURL=RecodeItem.js.map