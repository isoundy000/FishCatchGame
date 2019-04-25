var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 平台渠道枚举
 */
var PlatformTypeEnum;
(function (PlatformTypeEnum) {
    PlatformTypeEnum[PlatformTypeEnum["COMBUNET"] = 2] = "COMBUNET";
    PlatformTypeEnum[PlatformTypeEnum["ZI_YOU"] = 9] = "ZI_YOU";
    PlatformTypeEnum[PlatformTypeEnum["SOUGOU"] = 10] = "SOUGOU";
    PlatformTypeEnum[PlatformTypeEnum["EGRET"] = 11] = "EGRET";
    PlatformTypeEnum[PlatformTypeEnum["QQ_ZONE"] = 12] = "QQ_ZONE";
    PlatformTypeEnum[PlatformTypeEnum["QUN_HEI"] = 15] = "QUN_HEI";
    PlatformTypeEnum[PlatformTypeEnum["YI_WAN_TANG"] = 5] = "YI_WAN_TANG";
})(PlatformTypeEnum || (PlatformTypeEnum = {}));
var ThirdPartyType = (function () {
    function ThirdPartyType() {
    }
    return ThirdPartyType;
}());
ThirdPartyType.WECHAT = "wx";
ThirdPartyType.QQ = "qq";
__reflect(ThirdPartyType.prototype, "ThirdPartyType");
var PayType = (function () {
    function PayType() {
    }
    return PayType;
}());
PayType.PC = "pc"; //微信扫码支付
PayType.APP = "app"; //微信APP支付
PayType.MWEB = "mweb"; //微信外的h5支付
__reflect(PayType.prototype, "PayType");
//# sourceMappingURL=PlatformType.js.map