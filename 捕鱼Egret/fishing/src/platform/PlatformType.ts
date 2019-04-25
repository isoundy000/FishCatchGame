/**
 * 平台渠道枚举
 */
enum PlatformTypeEnum {
	COMBUNET = 2,   //燃烧
	ZI_YOU = 9,		//自由游戏
	SOUGOU = 10,	//搜狗狗仔直播
	EGRET = 11,		//白鹭
	QQ_ZONE = 12,	//qq空间玩吧
	QUN_HEI = 15,	//群黑游戏
	YI_WAN_TANG = 5,//亿玩堂
}


class ThirdPartyType {
	public static WECHAT:string = "wx";
	public static QQ:string = "qq";
}


class PayType {
	public static PC:string = "pc";		//微信扫码支付
	public static APP:string = "app";	//微信APP支付
	public static MWEB:string = "mweb";	//微信外的h5支付
}