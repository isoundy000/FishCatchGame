class KssWaitView extends burn.view.PopView {
	private _uiDisplay:KssWaitCom;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
    //类型索引
    private _nType:number;
    private _arrImg:Array<eui.Image>;
	private _peopleNum:number;
	public constructor(type:number = 0) {
		super();
		this._btnWrapList = new Array();
        this._nType = type;
		this._peopleNum = -1;
	}
	private addBgResource(clazz:any,url:string):void {
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		let uiObj = new KssWaitCom();
		this._uiDisplay = uiObj;
		this._uiDisplay.skinName = clazz;
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);

        this._arrImg = new Array<eui.Image>();
        this._arrImg.push(this._uiDisplay.img_0);
        this._arrImg.push(this._uiDisplay.img_1);
        this._arrImg.push(this._uiDisplay.img_2);
        this._arrImg.push(this._uiDisplay.img_3);

		let closeBtn = this._uiDisplay.btnClose;
		closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);

		
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		RES.getResAsync("background_" + userModel.getMatchRoomLevel() + "_jpg", (data, key)=>{
			//添加背景
			let bg:egret.Bitmap = new egret.Bitmap(data);
			this._uiDisplay.bgGroup.addChild(bg);
			bg.anchorOffsetX = bg.width >> 1;
			bg.anchorOffsetY = bg.height >> 1;
        	this.setData();
		}, this);
    }
	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) {
		burn.Director.popView();
		this.send(NotifyEnum.CLICK_EXIT_ROOM);
	}
    public setPeople(value:number):void {
		this._peopleNum = value;
		if (!this._uiDisplay) {
			return;
		}
        this._uiDisplay.playerNum.text = value + "";
    }
    private setData():void {
		if (this._peopleNum != -1) {
        	this._uiDisplay.playerNum.text = this._peopleNum + "";
		}
        for (let i = 0; i < this._arrImg.length; i++) {
            if (i == this._nType) {
                this._arrImg[i].visible = true;
            } else {
                this._arrImg[i].visible = false;
            }
        }
        
		let id = this._nType + 7;
        this._uiDisplay.gain_0.removeChildren();
        this._uiDisplay.gain_1.removeChildren();
        this._uiDisplay.gain_2.removeChildren();
		let vo = game.table.T_QuickGame_Table.getVoByKey(id);
		let gainStr_0 = vo.theFirst;
		let gainStr_1 = vo.theSecond;
		let gainStr_2 = vo.theThird;
		let self = this;
		let gainData_0 = gainStr_0.split("_");
		let gainData_1 = gainStr_1.split("_");
		let gainData_2 = gainStr_2.split("_");
		game.util.IconUtil.getIconByIdAsync(IconType.PROP, Number(gainData_0[0]), function(icon:egret.Bitmap):void {
			if (!icon) {
				return;
			}
			icon.width = 50;
			icon.height = 50;
			icon.anchorOffsetX = icon.width/2;
			icon.anchorOffsetY = icon.height/2;
			self._uiDisplay.gain_0.addChild(icon);
		});
		game.util.IconUtil.getIconByIdAsync(IconType.PROP, Number(gainData_1[0]), function(icon:egret.Bitmap):void {
			if (!icon) {
				return;
			}
			icon.width = 50;
			icon.height = 50;
			icon.anchorOffsetX = icon.width/2;
			icon.anchorOffsetY = icon.height/2;
			self._uiDisplay.gain_1.addChild(icon);
		});
		game.util.IconUtil.getIconByIdAsync(IconType.PROP, Number(gainData_2[0]), function(icon:egret.Bitmap):void {
			if (!icon) {
				return;
			}
			icon.width = 50;
			icon.height = 50;
			icon.anchorOffsetX = icon.width/2;
			icon.anchorOffsetY = icon.height/2;
			self._uiDisplay.gain_2.addChild(icon);
		});
		let lab_0 = new eui.Label();
		lab_0.textAlign = egret.HorizontalAlign.LEFT;
		lab_0.text = gainData_0[1] + "";
		lab_0.anchorOffsetX = 0;
		lab_0.anchorOffsetY = lab_0.height/2;
		lab_0.x = 25;
		self._uiDisplay.gain_0.addChild(lab_0);
		
		let lab_1 = new eui.Label();
		lab_1.textAlign = egret.HorizontalAlign.LEFT;
		lab_1.text = gainData_1[1] + "";
		lab_1.anchorOffsetX = 0;
		lab_1.anchorOffsetY = lab_1.height/2;
		lab_1.x = 25;
		self._uiDisplay.gain_1.addChild(lab_1);
		
		let lab_2 = new eui.Label();
		lab_2.textAlign = egret.HorizontalAlign.LEFT;
		lab_2.text = gainData_2[1] + "";
		lab_2.anchorOffsetX = 0;
		lab_2.anchorOffsetY = lab_2.height/2;
		lab_2.x = 25;
		self._uiDisplay.gain_2.addChild(lab_2);
		//添加动画
		//imgAct_0
		let arr = new Array<eui.UIComponent>();
		arr.push(this._uiDisplay.imgAct_9);
		arr.push(this._uiDisplay.imgAct_8);
		arr.push(this._uiDisplay.imgAct_7);
		arr.push(this._uiDisplay.imgAct_6);
		arr.push(this._uiDisplay.imgAct_5);
		arr.push(this._uiDisplay.imgAct_4);
		arr.push(this._uiDisplay.imgAct_3);
		arr.push(this._uiDisplay.imgAct_2);
		arr.push(this._uiDisplay.imgAct_1);
		arr.push(this._uiDisplay.imgAct_0);
		game.util.GameUtil.playWaitAction(arr);
    }
	/**关闭游戏 */
	public onClose() {
		burn.Director.popView();
	}
	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Kss/KssWaitUI.exml", this.addBgResource, this);
	}

	public destroy():void {
		//移除按钮封装
		while (this._btnWrapList.length > 0) {
			let wrap = this._btnWrapList.pop();
			wrap.destroy();
		}
		this._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		this.parent && this.parent.removeChild(this);
	}
}

/***操作UI的对应类 */
class KssWaitCom extends eui.Component{
	public constructor(){super();}

    public img_0:eui.Image;
    public img_1:eui.Image;
    public img_2:eui.Image;
    public img_3:eui.Image;

    /**人数 */
    public playerNum:egret.BitmapText;
    public gain_0:eui.Group;
    public gain_1:eui.Group;
    public gain_2:eui.Group;

	public btnClose:eui.Button;

	public bgGroup:eui.Group;

	public imgAct_0:eui.Image;
	public imgAct_1:eui.Image;
	public imgAct_2:eui.Image;
	public imgAct_3:eui.Image;
	public imgAct_4:eui.Image;
	public imgAct_5:eui.Image;
	public imgAct_6:eui.Image;
	public imgAct_7:eui.Image;
	public imgAct_8:eui.Image;
	public imgAct_9:eui.Image;
}