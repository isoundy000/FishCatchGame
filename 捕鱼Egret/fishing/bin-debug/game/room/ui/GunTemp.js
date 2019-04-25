var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
/**
 * 枪的模板
 */
var GunTempleUI = (function (_super) {
    __extends(GunTempleUI, _super);
    function GunTempleUI(clazz) {
        var _this = _super.call(this) || this;
        //枪口位置配表
        _this.nGunX = 45;
        _this.nGunY = 90;
        _this.bRage = false;
        _this.bLocked = false;
        _this.skinName = clazz;
        //枪口叠加模式
        //this.gunEffectImag.blendMode = egret.BlendMode.ADD;
        //this.gunEffectImag.visible = false;
        _this.gunEffect.rotation = 0;
        _this.lockGroup.visible = false;
        _this.bLocked = false;
        _this.gunPoint.cacheAsBitmap = true;
        _this.nRoomerPos = -1;
        _this.chakan.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.chakanClick, _this);
        return _this;
    }
    /** 点击 */
    GunTempleUI.prototype.chakanClick = function (evt) {
        burn._Notification_.send(NotifyEnum.SHOW_CHAKAN_PANEL, this.nRoomerPos);
    };
    GunTempleUI.prototype.setRoomerPos = function (nPos) {
        this.nRoomerPos = nPos;
    };
    GunTempleUI.prototype.setGunNorData = function (nId) {
        var self = this;
        game.util.IconUtil.getIconByIdAsync(IconType.PAO, nId, function (icon) {
            if (icon) {
                //self.gunImageGroup.removeChildren();
                // icon.anchorOffsetX = icon.width/2;
                // icon.anchorOffsetY = icon.height - 15;
                // self.gunImageGroup.addChild(icon);
                self.gunImage.source = "gunsicon_" + nId + "_png";
            }
        });
    };
    GunTempleUI.prototype.setGunData = function (nId) {
        var gunSkinVo = game.table.T_Gun_skin_Table.getVoByKey(nId);
        var self = this;
        game.util.IconUtil.getIconByIdAsync(IconType.PAO_CLONE, gunSkinVo.id, function (icon) {
            if (icon) {
                self.gunImageGroup.removeChildren();
                icon.anchorOffsetX = icon.width / 2;
                icon.anchorOffsetY = icon.height - 15;
                self.gunImageGroup.addChild(icon);
            }
        });
    };
    //设置枪管锚点
    GunTempleUI.prototype.setGunImageAnchor = function (nId) {
        var gunSkinVo = game.table.T_Gun_skin_Table.getVoByKey(nId);
        var strAnch = gunSkinVo.anchor;
        var data = strAnch.split('_');
        var anchX = parseInt(data[0]);
        var anchY = parseInt(data[1]);
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height - anchY;
        var strPos = gunSkinVo.gunPos;
        var data1 = strPos.split('_');
        var anchX1 = parseInt(data1[0]);
        var anchY1 = parseInt(data1[1]);
        this.nGunX = anchX1;
        this.nGunY = anchY1;
    };
    GunTempleUI.prototype.setRage = function (bRage) {
        this.bRage = bRage;
    };
    //设置枪口角度
    GunTempleUI.prototype.gunFireTw = function (r) {
        this.rotation = r;
        var self = this;
        var eff = null;
        if (this.bRage) {
            eff = this.getEfGunRagePos();
        }
        else {
            eff = this.getEfGunPos();
        }
        this.gunEffect.addChild(eff);
        var tw = egret.Tween.get(self.gunPoint, { loop: false });
        tw.to({ bottom: -10, scaleY: 0.9, scaleX: 1.1 }, 100).to({ bottom: 0, scaleY: 1, scaleX: 1 }, 90).call(function () {
            egret.Tween.removeTweens(self.gunPoint);
        });
        var twEff = egret.Tween.get(self.gunEffect, { loop: false });
        twEff.wait(50).call(function () {
            egret.Tween.removeTweens(self.gunEffect);
            self.gunEffect.removeChild(eff);
        });
        this.bRage = false;
    };
    //修改倍率。炮口震动一下
    GunTempleUI.prototype.playGunChangeEff = function () {
        var self = this;
        var tw = egret.Tween.get(self.gunPoint, { loop: false });
        tw.to({ scaleY: 0.20 }, 100).to({ scaleY: 1 }, 90).call(function () {
            egret.Tween.removeTweens(self.gunPoint);
        });
    };
    //获取枪口位置
    GunTempleUI.prototype.gunFirePos = function () {
        return this.gunImageGroup.getChildAt(0).localToGlobal(this.nGunX, this.nGunY);
    };
    //根据枚举，获取枪口特效
    GunTempleUI.prototype.getEfGunPos = function () {
        return game.util.FrameUtil.getEfGunPos(); //getEfGunRagePos();
    };
    GunTempleUI.prototype.getEfGunRagePos = function () {
        return game.util.FrameUtil.getEfGunRagePos();
    };
    GunTempleUI.prototype.setLocked = function (flag) {
        this.lockGroup.visible = flag;
        this.bLocked = flag;
    };
    GunTempleUI.prototype.getGunLocked = function () {
        return this.bLocked;
    };
    /** 销毁函数 */
    GunTempleUI.prototype.destroy = function () {
        this.chakan.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.chakanClick, this);
    };
    return GunTempleUI;
}(eui.Component));
__reflect(GunTempleUI.prototype, "GunTempleUI");
//# sourceMappingURL=GunTemp.js.map