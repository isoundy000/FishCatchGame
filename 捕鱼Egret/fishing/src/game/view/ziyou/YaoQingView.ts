class YaoQingView extends egret.DisplayObjectContainer{

	private static _ui:YaoQingViewUI;
	private _type: number;
	private _param: any;
	public constructor(type = null, param = null) {
		super();
		this._type = type;
		this._param = param;
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/platform/YaoQingUI.exml", this.initView, this);
		this.visible = false;
	}

	private initView(cls:any, url:string):void {
		let uiLayer:eui.UILayer = new eui.UILayer();
		YaoQingView._ui = new YaoQingViewUI();
		YaoQingView._ui.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/platform/YaoQingUI.exml";
		uiLayer.addChild(YaoQingView._ui);
		this.addChild(uiLayer); 

		YaoQingView._ui.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeUI, this);

		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		YaoQingView._ui.desTxt.text = game.util.Language.getDynamicText(1, [userModel.getShareTimes() + ""]);

		RES.getResAsync("ziyou_fenxiang_png", (data, key)=>{
			let curW = document.body.clientWidth;
			let curH = document.body.clientHeight;
			let fenxiang = new egret.Bitmap(data);
			if (curW >= curH) {		//横屏
				fenxiang.x = CONFIG.contentWidth - fenxiang.width;
			}
			this.addChild(fenxiang);
			if(this._type != null) {
				let title = "";
				let desc = "";
				let iconUrl = "";
				switch(this._type) {
					case ShareType.Share_Money: 
					iconUrl = game.util.Language.getText(2441);
					desc = title = game.util.Language.getText(2446);
					break;
					case ShareType.Share_Djs:
					iconUrl = game.util.Language.getText(2442);
					desc = title = game.util.Language.getDynamicText(2447,[this._param]);
					break;	
					case ShareType.Forge_Succ:
					iconUrl = game.util.Language.getText(2443);
					desc = title = game.util.Language.getDynamicText(2448,[this._param]);
					break;
					case ShareType.Circle_GoldWar:
					iconUrl = game.util.Language.getText(2444);
					desc = title = game.util.Language.getText(2449);
					break;
					case ShareType.Share_GuangYU:
					iconUrl = game.util.Language.getText(2445);
					desc = title = game.util.Language.getText(2450);
					break;
				}
				let self = this;
				//注册一个分享事件
				burn.net.HttpManager.init("http://gamecenter.combunet.com/LoginServer/weixinShare.action", egret.HttpResponseType.TEXT, egret.HttpMethod.GET,
					function (httpResp) {
						let model: UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
						var resp = JSON.parse(httpResp);
						WXConfig(Number(resp.timestamp), resp.noncestr, resp.signature, model.getInviteCode(), title, desc, iconUrl, 0, "");
						self.visible = true;
					}, function () {
						self.visible = true;
					});
				let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
				var url = window.location.href;
				let urls = url.split("?");
				burn.net.HttpManager.addParam("url", urls[0]);
				burn.net.HttpManager.send();
			}else 
			{
				this.visible = true;
			}
		}, this);
	}

	private closeUI(evt:egret.TouchEvent):void {
		YaoQingView._ui.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeUI, this);
		this.parent && this.parent.removeChild(this);
		RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/platform/YaoQingUI.exml");
	}

	//分享回调
	public static updateYaoQingView(result:boolean):void {
		if (result) {	//分享成功
			let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
			let times = userModel.getShareTimes();
			if (times > 0) {
				times--;
				userModel.setShareTimes(times);
				let msg:CommonRequestMessage = new CommonRequestMessage();
				msg.initData();
				msg.setType(CommonRequest);
				NetManager.send(msg);
				//恭喜获得
				let vo = game.table.T_Config_Table.getVoByKey(80);
				let param = vo.value.split("_");
				game.util.GameUtil.openCommongain(null, [new game.model.Item(Number(param[0]), Number(param[1]))]);
			}
			this._ui.desTxt.text = game.util.Language.getDynamicText(1, [userModel.getShareTimes() + ""]);
		} else {	//分享失败
			console.log("分享失败");
		}
	}
}

class YaoQingViewUI extends eui.Component {
	public closeBtn:eui.Button;
	public desTxt:eui.Label;
	public constructor(){
        super();
    }
}