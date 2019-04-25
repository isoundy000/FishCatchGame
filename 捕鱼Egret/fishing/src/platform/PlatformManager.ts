module game.platform {
	/**
	 * 平台相关功能接口
	 */
	export class PlatformManager {
		/** 是否是平台登录 */
		public static isPlatform:boolean = false;
		/** 是否是自动登录到大厅 */
		public static isAutoLogin:boolean = false;
		/** 是否需要显示第三方登录 */
		public static isThirdPartyLogin:boolean = false;

		//平台处理handler
		public static platformParseHandler(platformId:number, param:string):void {
			CONFIG.PLATFORM_ID = platformId;
			switch (platformId) {
				case PlatformTypeEnum.SOUGOU:
					PlatformManager.sougouFillData(param);
					break;
				case PlatformTypeEnum.EGRET:
					PlatformManager.egretFillData();
					break;
				case PlatformTypeEnum.QQ_ZONE:
					PlatformManager.qqZoneFillData(param);
					break;
				case PlatformTypeEnum.QUN_HEI:
					PlatformManager.qunHeiFillData(param);
					break;
				case PlatformTypeEnum.ZI_YOU:
					PlatformManager.ziyouFillData(param);
					break;
				case PlatformTypeEnum.COMBUNET:
					PlatformManager.combunetFillData(param);
					break;
				case PlatformTypeEnum.YI_WAN_TANG:
					PlatformManager.yiwantangtFillData();
					break;
			}
			PlatformManager.isPlatform = true;
		}

		/** 搜狗数据填充 */
		private static sougouFillData(param:string):void {
			//@@_Sougou_start
			if (param) {
				let jsonObj = egret.Base64Util.decode(param);
				let str = String.fromCharCode.apply(null, new Uint8Array(jsonObj));
				game.platform.PlatformManager.sendLoginMsg(str);
			}
			PlatformManager.isAutoLogin = true;
			//@@_Sougou_end
		}

		/** 白鹭渠道数据 */
		private static egretFillData():void {
			//@@_Egret_start
            //初始化SDK
            // nest.easyuser.startup({"egretAppId": 91354, "version": 2}, (resultInfo:nest.core.ResultCallbackInfo)=>{
            //     if(resultInfo.result == 0) {
            //         console.log("初始化成功，进入游戏");
            //         let loginTypes:Array<nest.easyuser.ILoginType> = nest.easyuser.getLoginTypes();
            //         if (loginTypes.length) {
            //             console.log("需要显示对应的登录按钮");
            //         } else {
            //             console.log("直接调用 nest.easyuser.login，传入 {} 即可。");
            //             nest.easyuser.login({}, function (resultInfo:nest.user.LoginCallbackInfo) {
            //                 if (resultInfo.result == 0) {//登录成功
            //                     console.log("登录成功");
            //                     CONFIG.ACCOUNT = resultInfo.token;
            //                     nest.easyuser.isSupport({}, function (data:nest.easyuser.UserSupportCallbackInfo) {
            //                         //获取是否支持nest.user.getInfo接口，有该字段并且该字段值为1表示支持
            //                         let getInfo = data.getInfo;
            //                         console.log("登录成功===>>>" + getInfo);
            //                     });
            //                 } else if (resultInfo.result == -3) { //平台登陆账号被踢掉，需要重新登陆
            //                     console.log("平台登陆账号被踢掉，需要重新登陆");
            //                 } else { //登录失败
            //                     console.log("登录失败");
            //                 }
            //             });
            //         }
            //     } else {
            //         console.log("初始化失败，可能是url地址有问题，请联系官方解决");
            //     }
            // });
			// PlatformManager.isAutoLogin = false;
			//@@_Egret_end
		}

		/** QQ玩吧渠道数据 */
		public static qqZoneFillData(param:string):void {
			//@@_qq_zone_start
			CONFIG.ACCOUNT = window["OPEN_DATA"]["openkey"];
			CONFIG.OPEN_ID = window["OPEN_DATA"]["openid"];
			CONFIG.OPEN_KEY = window["OPEN_DATA"]["openkey"];
			CONFIG.CHANNEL_ID = window["OPEN_DATA"]["platform"];
			//SQ-手Q，QZ-手空
			CONFIG.CHANNEL_EXT_TYPE = window["OPEN_DATA"]["qua"]["app"];
			PlatformManager.isAutoLogin = false;
			//@@_qq_zone_end
		}

		/** 群黑游戏数据填充 */
		public static qunHeiFillData(param:string):void {
			//@@_qun_hei_start
			if (param) {
				let jsonObj = egret.Base64Util.decode(param);
				let str = String.fromCharCode.apply(null, new Uint8Array(jsonObj));
				game.platform.PlatformManager.sendLoginMsg(str);
			}
			PlatformManager.isAutoLogin = true;
			//初始化群黑游戏sdk
			initQunHeiSDK(CONFIG.ACCOUNT);
			//@@_qun_hei_end
		}

		/** 自由游戏数据填充 */
		public static ziyouFillData(param:string):void {
			//@@_ziyou_start
			if (param) {
				let jsonObj = egret.Base64Util.decode(param);
				let str = String.fromCharCode.apply(null, new Uint8Array(jsonObj));
				game.platform.PlatformManager.sendLoginMsg(str);
			}
			PlatformManager.isAutoLogin = true;
			//初始化群黑游戏sdk
			initZiyouSDK(game.util.Language.getText(156), game.util.Language.getText(157), CONFIG.OPEN_ID);
			//@@_ziyou_end
		}

		/** 燃烧游戏登录数据填充 */
		public static combunetFillData(param:string):void {
			//@@_combunet_start
			if(param != ""){
				let jsonObj = egret.Base64Util.decode(param);
				let str = String.fromCharCode.apply(null, new Uint8Array(jsonObj));
				game.platform.PlatformManager.sendLoginMsg(str);
				PlatformManager.isAutoLogin = true;
			}
			else{
				CONFIG.ACCOUNT = window["FISHING_CONFIG"]["oauthCode"];
				if (CONFIG.ACCOUNT == "") {
					PlatformManager.isThirdPartyLogin = true;
				} else {
					PlatformManager.isThirdPartyLogin = false;
				}
			}
			//@@_combunet_end
		}

		/** 亿玩堂登录数据填充 */
		public static yiwantangtFillData():void {
			//@@_yiwantang_start
			CONFIG.ACCOUNT = window["FISHING_CONFIG"]["oauthCode"];
			if (CONFIG.ACCOUNT == "") {
				PlatformManager.isThirdPartyLogin = true;
			} else {
				PlatformManager.isThirdPartyLogin = false;
			}
			PlatformManager.isAutoLogin = false;
			//@@_yiwantang_end
		}

		/** 平台登录功能 */
		public static gotoLoginByPlatform(id:number, succ:Function, fail:Function):void {
			switch (id) {
				case PlatformTypeEnum.EGRET:
					//@@_Egret_start
					burn.net.HttpManager.init(CONFIG.LOGIN_ADDR + "login.action", egret.HttpResponseType.TEXT, egret.HttpMethod.POST, succ, fail);
					burn.net.HttpManager.addParam("token", CONFIG.ACCOUNT);
					burn.net.HttpManager.addParam("platform", "" + CONFIG.PLATFORM_ID);
					burn.net.HttpManager.send();
					//@@_Egret_end
					break;
				case PlatformTypeEnum.QQ_ZONE:
					//@@_qq_zone_start
					burn.net.HttpManager.init(CONFIG.LOGIN_ADDR + "login.action", egret.HttpResponseType.TEXT, egret.HttpMethod.POST, succ, fail);
					burn.net.HttpManager.addParam("openid", CONFIG.OPEN_ID);
					burn.net.HttpManager.addParam("openkey", CONFIG.OPEN_KEY);
					burn.net.HttpManager.addParam("channel", "" + CONFIG.CHANNEL_ID);
					burn.net.HttpManager.addParam("platform", "" + CONFIG.PLATFORM_ID);
					burn.net.HttpManager.send();
					//@@_qq_zone_end
					break;
				case PlatformTypeEnum.COMBUNET:
					//@@_combunet_start
					burn.net.HttpManager.init(CONFIG.LOGIN_ADDR + "login.action", egret.HttpResponseType.TEXT, egret.HttpMethod.POST, succ, fail);
					burn.net.HttpManager.addParam("oauthCode", CONFIG.ACCOUNT);
					burn.net.HttpManager.addParam("platform", "" + CONFIG.PLATFORM_ID);
					burn.net.HttpManager.addParam("loginType", window["FISHING_CONFIG"]["loginType"]);
					burn.net.HttpManager.addParam("subplatform", window["FISHING_CONFIG"]["subplatform"]);
					burn.net.HttpManager.addParam("invitationCode", window["FISHING_CONFIG"]["invitationCode"]);
					burn.net.HttpManager.send();
					//@@_combunet_end
					break;
				case PlatformTypeEnum.YI_WAN_TANG:
					//@@_yiwantang_start			
					burn.net.HttpManager.init(CONFIG.LOGIN_ADDR + "login.action", egret.HttpResponseType.TEXT, egret.HttpMethod.POST, succ, fail);
					burn.net.HttpManager.addParam("oauthCode", CONFIG.ACCOUNT);
					burn.net.HttpManager.addParam("platform", "" + CONFIG.PLATFORM_ID);
					burn.net.HttpManager.addParam("loginType", window["FISHING_CONFIG"]["loginType"]);
					burn.net.HttpManager.addParam("subplatform", window["FISHING_CONFIG"]["subplatform"]);
					burn.net.HttpManager.addParam("invitationCode", window["FISHING_CONFIG"]["invitationCode"]);
					burn.net.HttpManager.send();
					//@@_yiwantang_end
					break;
			}
		}

		/** 第三方平台登录 */
		public static thirdPartyLogin(platformId:number, loginType:string):void {
			switch (platformId) {
				case PlatformTypeEnum.COMBUNET:
					window.location.href = CONFIG.LOGIN_ADDR + "combunet/combunetGame.jsp?loginType=" + loginType 
										+ "&invitationCode=" + window["FISHING_CONFIG"]["invitationCode"] 
										+ "&subplatform=" + window["FISHING_CONFIG"]["subplatform"];
					break;
				case PlatformTypeEnum.YI_WAN_TANG:
					window.location.href = CONFIG.LOGIN_ADDR + "combunetGame.jsp?loginType=" + loginType 
										+ "&invitationCode=" + window["FISHING_CONFIG"]["invitationCode"] 
										+ "&subplatform=" + window["FISHING_CONFIG"]["subplatform"];
					break;
			}
		}

		public static setResPrefix(prefix:string):void {
            CONFIG.RES_PATH_PREFIX = prefix;
        }

        public static sendLoginMsg(msg:string):void {
			let userData = JSON.parse(msg);
			let code = userData.retcode;
			if (code == ServerState.BAN) {
				CONFIG.SERVER_USER_STATE = code;
			} else if (code == ServerState.CLOSED) {
				CONFIG.SERVER_USER_STATE = code;
			} else {
				CONFIG.SERVER_IP = userData.host;
				CONFIG.SERVER_PORT = userData.port;
				CONFIG.USER_SECRET = userData.secret;
				CONFIG.USER_ID = userData.userId;
				CONFIG.ACCOUNT = userData.accId;
				CONFIG.PLATFORM_ID = userData.platform;
				CONFIG.USER_NAME = userData.userName;
				CONFIG.OPEN_ID = userData.openId;
				CONFIG.OPEN_KEY = userData.openKey;
				CONFIG.APP_ID = userData.appId;
				if(userData.subPlatform){
					CONFIG.SUB_PLATFORM_ID = userData.subPlatform;
				}
			}
        }

		public static payState(msg:string, code:string = ""):void {
			let str = "";
			if (msg == "__paySuccess") {
				str = "支付成功\n如果没有及时到账请尝试刷新游戏";
			} else if (msg == "__payError") {
				str = "支付失败";
			} else if (msg == "__getInfoError") {
				str = "获取账户余额失败";
			} else if (msg == "__payClose") {
				str = "支付已取消";
			}
			game.util.GameUtil.openConfirm(null, function(){
				burn._Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
			}, this, str + code);
		}
	}
}