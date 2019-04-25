var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SignItemCom = (function (_super) {
    __extends(SignItemCom, _super);
    function SignItemCom() {
        var _this = _super.call(this) || this;
        _this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/sign/SignItem.exml";
        return _this;
    }
    SignItemCom.prototype.setData = function (times, data) {
        var _this = this;
        //{id:401,month:4,date:1,vipMin:0,score:1,award:"10001_1",},
        times += 1;
        var self = this;
        if (data.date == times) {
            //当前
            this.last.visible = false;
            this.normal.visible = false;
            RES.getResAsync("cardYellow_fnt", function () {
                RES.getResAsync("cardYellow_png", function () {
                    var dayFont = new egret.BitmapText();
                    dayFont.font = RES.getRes("cardYellow_fnt");
                    dayFont.text = String(data.date);
                    dayFont.anchorOffsetX = dayFont.width;
                    dayFont.anchorOffsetY = dayFont.height / 2;
                    _this.tianGroup1.addChild(dayFont);
                }, _this);
            }, this);
        }
        else {
            if (data.date < times) {
                //过去
                this.last.visible = true;
            }
            else {
                //未来
                this.last.visible = false;
            }
            RES.getResAsync("cardBlue_fnt", function () {
                RES.getResAsync("cardBlue_png", function () {
                    var dayFont = new egret.BitmapText();
                    dayFont.font = RES.getRes("cardBlue_fnt");
                    dayFont.text = String(data.date);
                    dayFont.anchorOffsetX = dayFont.width;
                    dayFont.anchorOffsetY = dayFont.height / 2;
                    _this.tianGroup.addChild(dayFont);
                }, _this);
            }, this);
        }
        var awardStr = data.award;
        var awardData = awardStr.split("_");
        var awardId = Number(awardData[0]);
        var awardCount = awardData[1];
        game.util.IconUtil.getIconByIdAsync(IconType.PROP, awardId, function (icon) {
            if (!icon) {
                return;
            }
            icon.anchorOffsetX = icon.width / 2;
            icon.anchorOffsetY = icon.height / 2;
            self.iconGroup.addChild(icon);
        });
        this.numLab.text = awardCount;
        if (data.vipMin > 0) {
            var arrName = new Array();
            arrName.push(data.vipMin + "");
            var txt = this.vipDesc.text;
            this.vipDesc.text = game.util.Language.getDynamicTextByStr(txt, arrName);
        }
        else {
            this.vipGroup.visible = false;
        }
    };
    return SignItemCom;
}(eui.Component));
__reflect(SignItemCom.prototype, "SignItemCom");
//# sourceMappingURL=SignItem.js.map