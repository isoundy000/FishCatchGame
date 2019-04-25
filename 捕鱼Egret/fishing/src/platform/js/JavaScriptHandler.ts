//调用QQ空间支付
declare function callQZonePay(msg:string, pid:string);
//初始化群黑游戏sdk
declare function initQunHeiSDK(name:string);
//群黑游戏支付接口
declare function qunHeiPay(userid:string, username:string, goodId:string, goodName:string, money:string);
//自由游戏sdk初始化接口
declare function initZiyouSDK(title:string, desc:string, openId:string);
//自由游戏支付接口
declare function showZiyouPay(_id:number, _amount:number, _userId:number, _itemName:string, _openId:string, _openKey:string, _userName:string);
//自由游戏获取关注状态接口
declare function getFocusState(_openId:string, _openKey:string, _fun:Function);
//自由游戏获取是否支持分享
declare function getOpenShareState(_fun:Function);
//自由游戏打开关注界面
declare function openQrCode();
//热云心跳日志
declare function sendReyunHeartbeat(dId:string, level:string, pId:string, uId:string);
//热云自定义事件
declare	function sendCostomEvent(eve:string, value:string, dId:string, level:string, pId:string, uId:string);
//爱贝支付
declare function createOrder4RS(cId:number, uId:number);
//清除Cookie的接口
declare function deleteCookie4ChangeAccount();
//亿玩堂清除cookie
declare function deleteCookie4YWT();
//主界面打开Combunet的二维码
declare function openCombunetQrCode(pid:number);

//微信config
declare function WXConfig(timestamp:number, nonceStr:string, signature:string, invitecode:string, title:string, desc:string, iconUrl:string, funtionType:number, str:string);
//是否在微信
declare function isWeixin();
//是否在PC
declare function IsInPC();
//关闭扫码支付页面
declare function closeQrPayPanel();
//微信公众号支付
declare function createOrder4Wechat(oauthCode:string, cId:number, uId:number);
//微信扫码支付
declare function createOrder4QRcode(cId:number, uId:number, deviceType:string, chargeStr:string);
//微信h5支付
declare function createOrder4h5Pay(cId:number, uId:number, deviceType:string);

//核客支付
declare function createOrder4hekePay(cId:number, uId:number);