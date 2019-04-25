class KssResultView extends burn.view.PopView {
	private _uiDisplay:KssResultCom;
	/**scroview */
	private _roomListGroup:eui.Group;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	//消息体
	private _msg:QuickGameRankResultMessage;
	public constructor(msg:QuickGameRankResultMessage) {
		super();
		this._btnWrapList = new Array();
		this._msg = msg;
	}
	private addBgResource(clazz:any,url:string):void {
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		let uiObj = new KssResultCom();
		this._uiDisplay = uiObj;
		this._uiDisplay.skinName = clazz;
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);
		//关闭当前界面
		this._uiDisplay.okGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		//封装按钮
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.okGroup));
        let self = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Kss/KssResultItem.exml", function(){
            self.InitData();
        }, this);
    }
    public InitData():void {
		let arrData = this._msg.getRank();
		let len = arrData.length;
        let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		let myId = userModel.getUserId();
        this._uiDisplay.listGroup.removeChildren();
		let myIndex = -1;
        for (let i = 0; i < len; i++) {
            let item = new KssResultItemUI();
			item.setData(arrData[i], myId);
			if (arrData[i].userId == myId) {
				myIndex = i;
			}
            this._uiDisplay.listGroup.addChild(item);
        }
        
		let tLayout:eui.VerticalLayout = new eui.VerticalLayout();
		this._uiDisplay.listGroup.layout = tLayout;    /// 网格布局

		myIndex ++;
		if (myIndex <= 3) {
			//赢了
			this._uiDisplay.titleLost.visible = false;
			this._uiDisplay.imgLost.visible = false;
		} else {
			//输了
			this._uiDisplay.titleWin.visible = false;
			this._uiDisplay.imgWin.visible = false;
		}
		this._uiDisplay.rankLab.text = myIndex + "";
    }
	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) {
		burn.Director.popView();
		this.send(NotifyEnum.CLICK_EXIT_ROOM);
	}
	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/Kss/KssResultUI.exml",this.addBgResource,this);
	}

	public destroy():void {
		//移除按钮封装
		while (this._btnWrapList.length > 0) {
			let wrap = this._btnWrapList.pop();
			wrap.destroy();
		}
		this.parent && this.parent.removeChild(this);
	}
}

/***操作UI的对应类 */
class KssResultCom extends eui.Component{
	public constructor(){super();}
	public listGroup:eui.Group;

    public titleWin:eui.Image;
    public titleLost:eui.Image;
    public imgWin:eui.Image;
    public imgLost:eui.Image;

    public okGroup:eui.Group;
    public rankLab:egret.BitmapText;//第几名
}