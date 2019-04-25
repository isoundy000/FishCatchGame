class ShareView extends burn.view.PopView {
	private _uiDisplay:ShareViewCom;
	/**scroview */
	private _roomListGroup:eui.Group;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	public constructor() {
		super();
		this._btnWrapList = new Array();
	}
	private addBgResource(clazz:any,url:string):void
	{
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		let uiObj = new ShareViewCom();
		this._uiDisplay = uiObj;
		this._uiDisplay.skinName = clazz;
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);
		//关闭当前界面
		this._uiDisplay.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._uiDisplay.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelp, this);
		//封装按钮
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnClose));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.gainBtn));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.gainedBtn));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.inviteBtn));
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.listBtn));

        
		let req = new CommonRequestMessage();
		req.initData();
		req.setType(CommonRequest.COMMON_REQUEST_WECHAT_SHARE_INFO);//1 email
		NetManager.send(req);
    }
    public initShareData(newbieAwardState:number, invitedUserNum:number, todayShareTimes:number):void
    {
        this.initLeft(newbieAwardState);
        this.initCenter(invitedUserNum);
        this.initRight();
    }
    private initLeft(newbieAwardState:number):void
    {
        /** public itemDesc_0:eui.Label;
            public iconGroup_1:eui.Group;
            public iconGroup_2:eui.Group;
            public gainBtn:eui.Group;
            public gainedBtn:eui.Group; */
        this._uiDisplay.itemDesc_0.text = game.util.Language.getText(2431);
        let configData = game.table.T_Config_Table.getVoByKey(91).value.split(",");
        let configArr1 = configData[0].split("_");
        let configArr2 = configData[1].split("_");
        let gainId_1 = Number(configArr1[0]);
        let gainNum_1 = Number(configArr1[1]);
        let gainId_2 = Number(configArr2[0]);
        let gainNum_2 = Number(configArr2[1]);
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/BagItem.exml",()=>{
            let item = new BagViewItem(gainId_1, gainNum_1);
            item.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/BagItem.exml";
            item.init();
            item.anchorOffsetX = item.width/2;
            item.anchorOffsetY = item.height/2;
            this._uiDisplay.iconGroup_1.addChild(item);
            this._uiDisplay.iconGroup_1.scaleX = this._uiDisplay.iconGroup_1.scaleY = 0.5;

            let item1 = new BagViewItem(gainId_2, gainNum_2);
            item1.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/BagItem.exml";
            item1.init();
            item1.anchorOffsetX = item1.width/2;
            item1.anchorOffsetY = item1.height/2;
            this._uiDisplay.iconGroup_2.addChild(item1);
            this._uiDisplay.iconGroup_2.scaleX = this._uiDisplay.iconGroup_2.scaleY = 0.5;
        },this);

        if(newbieAwardState == 1)
        {
            this._uiDisplay.gainBtn.visible = false;
            this._uiDisplay.gainedBtn.visible = true;
        }else
        {
            this._uiDisplay.gainedBtn.visible = false;
            this._uiDisplay.gainBtn.visible = true;
            this._uiDisplay.gainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                let req = new ReceiveWeChatShareAwardSendMessage();
                req.initData();
                req.setType(1);////新人奖励1，邀请成功奖励2
                NetManager.send(req);
            }, this);
        }
    }
    private initCenter(invitedUserNum:number):void
    {
        /** public itemDesc_1:eui.Label;
            public iconGroup:eui.Group;
            public item_desc2:eui.Label;
            public inviteBtn:eui.Group; */
        
        this._uiDisplay.itemDesc_1.text = game.util.Language.getText(2432);
        let arrName = new Array<string>();
		arrName.push(invitedUserNum+"");
        this._uiDisplay.item_desc2.text = game.util.Language.getDynamicText(2433, arrName);
        let configData = game.table.T_Config_Table.getVoByKey(92).value;
        let config = configData.split("_");
        let gainId_1 = Number(config[0]);
        let gainNum_1 = Number(config[1]);

        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/BagItem.exml",()=>{
            let item = new BagViewItem(gainId_1, gainNum_1);
            item.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/BagItem.exml";
            item.init();
            item.anchorOffsetX = item.width/2;
            item.anchorOffsetY = item.height/2;
            this._uiDisplay.iconGroup.addChild(item);
            this._uiDisplay.iconGroup.scaleX = this._uiDisplay.iconGroup.scaleY = 0.5;
        },this);
        
        this._uiDisplay.inviteBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			let yaoQingView = new YaoQingView();
			this.addChild(yaoQingView);
        }, this);
    }
    private initRight():void
    {
        /**public listGroup:eui.Group;
           public listBtn:eui.Button; */
        this._uiDisplay.listBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			let shareView:ShareGainView = new ShareGainView();
			let shareMed:ShareGainMediator = new ShareGainMediator(shareView);
			burn.Director.pushView(shareMed);
        }, this);
        let list = game.table.T_Share_Table.getAllVo();
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/share/shareGainItem.exml", ()=>{
            this._uiDisplay.listGroup.removeChildren();
            for(let i = 0; i < list.length; i++)
            {
                let item = new ShareItem();
                item.init(list[i]); 
                this._uiDisplay.listGroup.addChild(item);
            }

            let tLayout:eui.TileLayout = new eui.TileLayout();
            tLayout.paddingTop = 10;
            tLayout.paddingLeft = 0;
            tLayout.paddingRight = 0;
            tLayout.paddingBottom = 20;
            this._uiDisplay.listGroup.layout = tLayout;    /// 网格布局
        }, this);   

    }
	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) {
		burn.Director.popView();
	}
    private onHelp(e:egret.TouchEvent) {
    }
	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/share/ShareUI.exml",this.addBgResource,this);
	}

	public destroy():void {
		//移除按钮封装
		while (this._btnWrapList.length > 0) {
			let wrap = this._btnWrapList.pop();
			wrap.destroy();
		}
		this.parent && this.parent.removeChild(this);
		this._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._uiDisplay.helpBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelp, this);
		
		RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/share/ShareUI.exml");
	}
}

/***操作UI的对应类 */
class ShareViewCom extends eui.Component{
	public constructor(){super();}
	public btnClose:eui.Button;//关闭
    public helpBtn:eui.Button;

    //新人奖励
    public itemDesc_0:eui.Label;
    public iconGroup_1:eui.Group;
    public iconGroup_2:eui.Group;
    public gainBtn:eui.Group;
    public gainedBtn:eui.Group;

    //邀请有奖
    public itemDesc_1:eui.Label;
    public iconGroup:eui.Group;
    public item_desc2:eui.Label;
    public inviteBtn:eui.Group;

    //好友进阶
    public listGroup:eui.Group;
    public listBtn:eui.Button;
}