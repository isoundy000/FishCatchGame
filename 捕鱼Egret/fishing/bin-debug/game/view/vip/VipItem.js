var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var VipItemUI = (function (_super) {
    __extends(VipItemUI, _super);
    function VipItemUI(vo, Lv) {
        var _this = _super.call(this) || this;
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/vip/VipItem.exml";
        var lvlUpExpVo = game.table.T_VipLevel_Table.getVoByKey(vo.vipLevel - 1);
        var curLv = new egret.BitmapText();
        curLv.font = RES.getRes("vipShow_fnt");
        curLv.text = String(vo.vipLevel);
        _this.vipLvGroup.addChild(curLv);
        curLv.textAlign = egret.HorizontalAlign.CENTER;
        curLv.anchorOffsetX = curLv.width / 2;
        curLv.anchorOffsetY = curLv.height / 2;
        if (Lv >= vo.vipLevel) {
            _this.lock.visible = false;
        }
        _this.desc0.text = vo.desc;
        _this.nameLab.text = vo.name;
        var arrName = new Array();
        arrName.push(lvlUpExpVo.levelUpExp / 100 + "");
        _this.desc.text = game.util.Language.getDynamicText(94, arrName);
        var self = _this;
        game.util.IconUtil.getIconByIdAsync(IconType.VIP_SHOW, vo.vipLevel, function (icon) {
            if (!icon) {
                return;
            }
            icon.anchorOffsetX = icon.width / 2;
            icon.anchorOffsetY = icon.height / 2;
            self.iconGroup.addChild(icon);
        });
        _this.strVipDescID = Number(vo.descVip);
        _this.root.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
        return _this;
    }
    VipItemUI.prototype.onTap = function (e) {
        game.util.GameUtil.openCommonHelp(null, this.strVipDescID);
    };
    return VipItemUI;
}(eui.Component));
__reflect(VipItemUI.prototype, "VipItemUI");
//# sourceMappingURL=VipItem.js.map