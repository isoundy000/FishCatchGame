var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DjsUIItem = (function (_super) {
    __extends(DjsUIItem, _super);
    function DjsUIItem() {
        var _this = _super.call(this) || this;
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Djs/DjsItem.exml";
        return _this;
    }
    DjsUIItem.prototype.setData = function (msg, strRank, data, i) {
        var score = null;
        var name = null;
        if (msg == null) {
            score = "未上榜";
            this.rankLab.text = strRank;
            var nameStr = strRank.split("-");
            name = "第" + data.rangeMax + "名";
            this.namelab.visible = false;
            this.scoreLab.visible = false;
            this.infoTip.text = game.util.Language.getText(2424);
            this.infoTip.visible = true;
        }
        else {
            this.namelab.visible = true;
            this.scoreLab.visible = true;
            this.infoTip.text = game.util.Language.getText(2424);
            this.infoTip.visible = false;
            score = msg.rankValue;
            name = msg.name;
        }
        if (strRank == "1") {
            this.rankLab.visible = false;
            this.ava_1.visible = true;
            this.ava_2.visible = false;
            this.ava_3.visible = false;
            this.namelab.text = name;
            this.img_2.visible = false;
            this.img_3.visible = false;
            this.img_4.visible = false;
        }
        else if (strRank == "2") {
            this.rankLab.visible = false;
            this.ava_1.visible = false;
            this.ava_2.visible = true;
            this.ava_3.visible = false;
            this.namelab.text = name;
            this.img_3.visible = false;
            this.img_4.visible = false;
        }
        else if (strRank == "3") {
            this.rankLab.visible = false;
            this.ava_1.visible = false;
            this.ava_2.visible = false;
            this.ava_3.visible = true;
            this.namelab.text = name;
            this.img_4.visible = false;
        }
        else {
            this.ava_1.visible = false;
            this.ava_2.visible = false;
            this.ava_3.visible = false;
            this.rankLab.text = strRank;
            var nameStr = strRank.split("-");
            this.namelab.text = "第" + data.rangeMax + "名";
        }
        this.scoreLab.text = "积分:" + score;
        //奖励
        var award = data.award;
        var awardData = award.split("_");
        this.gainNumLab.text = "x" + awardData[1];
        var itemId = Number(awardData[0]);
        var self = this;
        game.util.IconUtil.getIconByIdAsync(IconType.PROP, itemId, function (icon) {
            if (!icon) {
                return;
            }
            icon.anchorOffsetX = icon.width / 2;
            icon.anchorOffsetY = icon.height / 2;
            self.iconGroup.addChild(icon);
        });
    };
    return DjsUIItem;
}(eui.Component));
__reflect(DjsUIItem.prototype, "DjsUIItem");
//# sourceMappingURL=DjsItem.js.map