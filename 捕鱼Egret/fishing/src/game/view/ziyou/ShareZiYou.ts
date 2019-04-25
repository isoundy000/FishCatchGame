class ShareZiYou extends egret.DisplayObjectContainer{

	private static _ui:ShareZiYouUI;
	private _type: number;
	private _param: any;
	public constructor(type = null, param = null) {
		super();
		this._type = type;
		this._param = param;
		let self = this;
        game.net.MessageDispatcher.register(game.net.ResponseType.RECEIVEWECHATSHAREAWARDBACK, function(msg:ReceiveWeChatShareAwardBackMessage):void {
            self.shareBack(msg);
        });
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/platform/ShareZiYouUI.exml", this.initView, this);
		this.visible = false;
	}
	private shareBack(msg:ReceiveWeChatShareAwardBackMessage):void
	{
		//required uint32 type = 1;//新人奖励1，邀请成功奖励2
		//required uint32 state = 2;//1成功，0不是通过分享连接进入，2通过自己的分享连接进入，3领取过
		let type = msg.getType();
		let state = msg.getState();
		if(state == 1)
		{
			game.util.GameUtil.popTips(game.util.Language.getText(2434));
			let req = new CommonRequestMessage();
			req.initData();
			req.setType(CommonRequest.COMMON_REQUEST_WECHAT_SHARE_INFO);//1 email
			NetManager.send(req);

			if(type == 1)
			{
				let configData = game.table.T_Config_Table.getVoByKey(91).value.split(",");
				let configArr1 = configData[0].split("_");
				let configArr2 = configData[1].split("_");
				let gainId_1 = Number(configArr1[0]);
				let gainNum_1 = Number(configArr1[1]);
				let gainId_2 = Number(configArr2[0]);
				let gainNum_2 = Number(configArr2[1]);
				let gainArr = new Array<game.model.Item>();
				gainArr.push(new game.model.Item(gainId_1,gainNum_1));
				gainArr.push(new game.model.Item(gainId_2,gainNum_2));
				game.util.GameUtil.openCommongain(null,gainArr);
			}else if(type == 2)
			{
				let configData = game.table.T_Config_Table.getVoByKey(92).value;
				let config = configData.split("_");
				let gainId_1 = Number(config[0]);
				let gainNum_1 = Number(config[1]);
				let gainArr = new Array<game.model.Item>();
				gainArr.push(new game.model.Item(gainId_1,gainNum_1));
				game.util.GameUtil.openCommongain(null,gainArr);
			}
		}else if(state == 2)
		{
			game.util.GameUtil.popTips(game.util.Language.getText(2436));
		}else if(state == 3)
		{
			game.util.GameUtil.popTips(game.util.Language.getText(2437));
		}else if(state == 0)
		{
			game.util.GameUtil.popTips(game.util.Language.getText(2435));
		}else if(state == 5)
		{
			game.util.GameUtil.popTips("今日分享次数超过上限");
		}
	}

	private initView(cls:any, url:string):void {
		let shareType:number = 0;
		let shareStr:string = "";
		let uiLayer:eui.UILayer = new eui.UILayer();
		ShareZiYou._ui = new ShareZiYouUI();
		ShareZiYou._ui.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/platform/ShareZiYouUI.exml";
		uiLayer.addChild(ShareZiYou._ui);
		this.addChild(uiLayer); 

		ShareZiYou._ui.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeUI, this);
		burn.tools.TweenTools.rotation(ShareZiYou._ui.effct, 3000);
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;

		RES.getResAsync("ziyou_fenxiang_png", (data, key)=>{
			let curW = document.body.clientWidth;
			let curH = document.body.clientHeight;
			let fenxiang = new egret.Bitmap(data);
			this.addChild(fenxiang);
			RES.getResAsync("share_finger_png", ()=>{
				RES.getResAsync("share_finger_body_png", ()=>{
					console.log("#------------------------->1");
					let fingerImg = new egret.Bitmap(RES.getRes("share_finger_png"));
					let bodyImg = new egret.Bitmap(RES.getRes("share_finger_body_png"));
					this.addChild(fingerImg);
					this.addChild(bodyImg);
					if (curW >= curH) {		//横屏
						fenxiang.x = CONFIG.contentWidth - fenxiang.width;
						fingerImg.x = CONFIG.contentWidth - bodyImg.width;
						bodyImg.x = CONFIG.contentWidth - bodyImg.width;
						//横屏的屏幕
						
						bodyImg.x -= bodyImg.width;
						bodyImg.y += bodyImg.height/2;
						fingerImg.x -= fingerImg.width/2;
						fingerImg.y += fingerImg.height;
						fenxiang.y += bodyImg.height;
						fenxiang.y += fenxiang.height;
						let posY = fingerImg.y;
						let fingerTw = egret.Tween.get(fingerImg, {loop: true});
						fingerTw.set({y: posY + 10})
								.wait(70)
								.set({y: posY - 10})
								.wait(70);
					}else {
						bodyImg.x += bodyImg.width*1.5;
						bodyImg.y += bodyImg.height*0.7;
						fingerImg.x += fingerImg.width*2;
						fingerImg.y += fingerImg.width*0.8;

						fingerImg.anchorOffsetX = fingerImg.width/2;
						fingerImg.anchorOffsetY = fingerImg.height/2;
						bodyImg.anchorOffsetX = bodyImg.width/2;
						bodyImg.anchorOffsetY = bodyImg.height/2;
						fingerImg.rotation = -90;
						bodyImg.rotation = -90;
						fenxiang.y += bodyImg.height;
						fenxiang.y += fenxiang.height;
						let posX = fingerImg.x;
						let fingerTw = egret.Tween.get(fingerImg, {loop: true});
						fingerTw.set({x: posX + 10})
								.wait(70)
								.set({x: posX - 10})
								.wait(70);
					}
				},this);
			},this);
			if(this._type != null) {
				let title = "";
				let desc = "";
				let iconUrl = "";
				let icon = "";
				
				switch(this._type) {
					case ShareType.Share_Money: 
						let vo = this._param as game.model.ExchangeItem;
						iconUrl = game.util.Language.getText(2441);
						desc = title = game.util.Language.getText(2446);
						icon = "exchange_" + this._param._url + "_png";
						shareType = ShareSuccType.EXCHANGE_SUCC;
						shareStr = vo._name;
						break;
					case ShareType.Share_Djs:
						iconUrl = game.util.Language.getText(2442);
						desc = title = game.util.Language.getDynamicText(2447,[this._param]);
						ShareZiYou._ui.root.visible = false;
						ShareZiYou._ui.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeUI, this);
						shareType = ShareSuccType.DAJIANGSAI_SUCC;
						shareStr = this._param + "积分";
						//统统干掉
						break;
					case ShareType.NORMAL:
						iconUrl = game.util.Language.getText(2442);
						desc = title = game.util.Language.getText(2431);
						ShareZiYou._ui.root.visible = false;
						ShareZiYou._ui.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeUI, this);
						shareType = 0;
						shareStr = "";
						break;
					case ShareType.Forge_Succ:
						ShareZiYou._ui.titleBgForge.visible = true;
						ShareZiYou._ui.titleBgGain.visible = false;
						iconUrl = game.util.Language.getText(2443);
						desc = title = game.util.Language.getDynamicText(2448,[this._param]);
						let model1: UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
						let skinId = model1.getCurSkinId();
						icon = "gunsicon_" + skinId +  "_png";
						{//波放特效
							RES.getResAsync("ef_forge_win_json", function():void {
								RES.getResAsync("ef_forge_win_png", function():void {
									let data = RES.getRes("ef_forge_win_json");
									let txtr = RES.getRes("ef_forge_win_png");
									let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
									let effect1 = new MovieFish(mcFactory.generateMovieClipData("ef_forge_win"),egret.Event.COMPLETE, ()=>{
										game.util.GameUtil.popTips("锻造成功");
									});
									effect1.initEvent();	
									let dataMc:egret.MovieClipData = effect1.movieClipData;

									let frameCur = 0;
									let modifyRect = new egret.Rectangle(dataMc.frames[frameCur].x, dataMc.frames[frameCur].y, 0, 0);
									effect1.gotoAndPlay("play",1);
									ShareZiYou._ui.iconGroup.addChild(effect1);
									effect1.frameRate = 9;
									effect1.anchorOffsetX = effect1.width/2 + modifyRect.x;
									effect1.anchorOffsetY = effect1.height/2 + modifyRect.y;
								}, this);
							}, this);
						}
						shareType = ShareSuccType.FORGING_SUCC;
						shareStr = this._param+"炮倍";
						break;
					case ShareType.Circle_GoldWar:
						iconUrl = game.util.Language.getText(2444);
						desc = title = game.util.Language.getText(2449);
						icon = "goodsicon_50001_png";
						shareType = ShareSuccType.DANTOU_SUCC;
						shareStr = game.util.Language.getText(2093);
						break;
					case ShareType.Share_GuangYU:
						iconUrl = game.util.Language.getText(2445);
						desc = title = game.util.Language.getText(2450);
						icon = "goodsicon_50001_png";
						shareType = ShareSuccType.DANTOU_SUCC;
						shareStr = game.util.Language.getText(2093);
						break;
				}
				//异步加载
				RES.getResAsync(icon, function():void {
					let txture:egret.Texture = RES.getRes(icon);
					let img:egret.Bitmap = new egret.Bitmap(txture);
					img.anchorOffsetX = img.width/2;
					img.anchorOffsetY = img.height/2;
					ShareZiYou._ui.iconGroup.addChild(img);
				}, this);
				let self = this;
				if(CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET){
					//注册一个分享事件
					burn.net.HttpManager.init("http://gamecenter.combunet.com/LoginServer/weixinShare.action", egret.HttpResponseType.TEXT, egret.HttpMethod.GET,
						function (httpResp) {
							let model: UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
							var resp = JSON.parse(httpResp);
							WXConfig(Number(resp.timestamp), resp.noncestr, resp.signature, model.getInviteCode(),title,desc,iconUrl, shareType, shareStr);
							self.visible = true;
						}, function () {
							self.visible = true;
						});
					let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
					var url = window.location.href;
					// let urls = url.split("?")[0];
					// var urls = encodeURIComponent(url);
					burn.net.HttpManager.addParam("url", url);
					burn.net.HttpManager.send();
				}else if(CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG){
					//注册一个分享事件
					burn.net.HttpManager.init("http://gamecenter.combunet.com/LoginServer4yiwantang/weixinShare.action", egret.HttpResponseType.TEXT, egret.HttpMethod.GET,
						function (httpResp) {
							let model: UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
							var resp = JSON.parse(httpResp);
							WXConfig(Number(resp.timestamp), resp.noncestr, resp.signature, model.getInviteCode(),title,desc,iconUrl, shareType, shareStr);
							self.visible = true;
						}, function () {
							self.visible = true;
						});
					let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
					// var url = window.location.href;
					var url:string = window["FISHING_CONFIG"]["curURL"];
					// let urls = url.split("?");
					burn.net.HttpManager.addParam("url", url);
					burn.net.HttpManager.send();
				}
			}else 
			{
				this.visible = true;
			}
		}, this);
	}

	private closeUI(evt:egret.TouchEvent):void {
		game.net.MessageDispatcher.unregisterByType(game.net.ResponseType.RECEIVEWECHATSHAREAWARDBACK);
		ShareZiYou._ui.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeUI, this);
		this.parent && this.parent.removeChild(this);
		RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/platform/ShareZiYouUI.exml");
	}
}

class ShareZiYouUI extends eui.Component {
	public closeBtn:eui.Button;
	public iconGroup:eui.Group;
	public root:eui.Group;
	public titleBgForge:eui.Image;//锻造成功
	public titleBgGain:eui.Image;
	public effct:eui.Image;
	public constructor(){
        super();
    }
}