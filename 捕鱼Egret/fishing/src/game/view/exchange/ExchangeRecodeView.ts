class ExchangeRecodeView extends burn.view.PopView {
	private _uiDisplay:ExchangesRecodeUI;
	/**scroview */
	private _itemGroup:eui.Group;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;

	private _arr:Array<any>;
	public constructor() {
		super();
		this._btnWrapList = new Array();
	}
	private addBgResource(clazz:any,url:string):void
	{
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		let uiObj = new ExchangesRecodeUI();
		this._uiDisplay = uiObj;
		this._uiDisplay.skinName = clazz;
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);
		//打开UI动画
		game.util.UIUtil.popView(this._uiDisplay.root);
		//关闭当前界面
		let closeBtn = this._uiDisplay.closeBtn;
		closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		this._uiDisplay.psLab.text = game.util.Language.getText(66);
		//自由游戏做特殊处理，不显示添加QQ文案
		if (CONFIG.PLATFORM_ID == PlatformTypeEnum.ZI_YOU) {
			this._uiDisplay.psLab.visible = false;
		}
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/exchange/ExchangeRecodeItem.exml",this.setUILoaded,this);
	}
	public setUILoaded(clazz:any,url:string):void
	{
		this.send(NotifyEnum.EXCHANGE_RECODE_LOADED);
	}
	public setData(arr:Array<any>):void
	{
		this._arr = arr;
		let exchangeModel:ExchangeModel = burn.Director.getModelByKey(ExchangeModel) as ExchangeModel;
		this._uiDisplay.listGroup.removeChildren();
		for (let i = 0; i < arr.length; i++) {
			let item = new ExchangeRecodeUIItem();
			item.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/exchange/ExchangeRecodeItem.exml";
			let vo = exchangeModel.getListById(Number(arr[i].id));
			if(!vo)
			{
				continue;
			}
			if(vo._type != 0)
			{
				item.name = i + "";
				item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenInfo, this);
			}else
			{
				item.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
            		game.util.GameUtil.popTips(game.util.Language.getText(177));
				}, this);
			}
			item.nameLab.text = vo._name;
			item.timeLab.text = game.util.TimeUtil.longToDateStr(Number(arr[i].time));
			//发货状态 0，未发货，1发货
			if(arr[i].state == 0)
			{
				item.stateLab.text = "未发货";
			}else if(arr[i].state == 1)
			{
				item.stateLab.text = "已发货";
			}
			this._uiDisplay.listGroup.addChild(item);
		}

		let tLayout:eui.VerticalLayout = new eui.VerticalLayout();
		this._uiDisplay.listGroup.layout = tLayout;    //纵向布局
	}
	private onOpenInfo(e:egret.TouchEvent) 
	{
		let name = e.currentTarget.name;
		let parentView;
		let width = 0;
		let height = 0;
		parentView = egret.MainContext.instance.stage;
		width = CONFIG.contentWidth;
		height = CONFIG.contentHeight;
		let confirm = new RecodeInfoCom(parentView,this._arr[Number(name)].msg);
		confirm.anchorOffsetX = confirm.width >> 1;
		confirm.anchorOffsetY = confirm.height >> 1;
		if(parentView)
		{
			parentView.addChild(confirm);
		}
	}
	/**关闭游戏 */
	private onClosttButtonClick(e:egret.TouchEvent) 
	{
		burn.Director.popView();
	}
	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/exchange/ExchangeRecode.exml",this.addBgResource,this);
	}

	public destroy():void {
		let self = this;
		game.util.UIUtil.closeView(this._uiDisplay.root, function():void {
			//移除按钮封装
			while (self._btnWrapList.length > 0) {
				let wrap = self._btnWrapList.pop();
				wrap.destroy();
			}
			self._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
			self.parent && self.parent.removeChild(self);
		});
	}
}

/***操作UI的对应类 */
class ExchangesRecodeUI extends eui.Component{
	public constructor(){super();}
	public closeBtn:eui.Button;//关闭
	public root:eui.Group;
	public listGroup:eui.Group;
	public psLab:eui.Label;
}

class ExchangeRecodeUIItem extends eui.Component{
	public constructor(){super();}
	public nameLab:eui.Label;
	public timeLab:eui.Label;
	public stateLab:eui.Label;
}

//记录详情界面
class RecodeInfoCom extends eui.Component {
    //父控件
    private _parentView:any;
    //root
    private root:eui.Group;
	public oneLab:eui.Label;

	public goodsGroup:eui.Group;
	public nameLab:eui.Label;
	public phoneLab:eui.Label;
	public qqLab:eui.Label;
	public addLab:eui.Label;
	private _msg:ExchangeRecordMessage;
	public constructor(parent:any, msg:ExchangeRecordMessage) {
		super();
		this._msg = msg;
        this._parentView = parent;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/exchange/ExchangeRecodeInfo.exml",this.loaded,this);
	}
    public loaded(clazz:any,url:string):void
    {
		this.skinName = clazz;
		game.util.UIUtil.popView(this.root);
		this.root.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);

		let id = this._msg.getGoodsId();
		let exchangeModel:ExchangeModel = burn.Director.getModelByKey(ExchangeModel) as ExchangeModel;
		let vo:game.model.ExchangeItem = exchangeModel.getListById(id);
		if(vo._type == 4)//支付宝 165
		{	
			this.goodsGroup.visible = false;
			this.oneLab.visible = true;
			this.oneLab.text = game.table.T_Language_Table.getVoByKey(165).value + this._msg.getReceiverPhone();
		}else if(vo._type == 1)//电话号码 161
		{
			this.goodsGroup.visible = false;
			this.oneLab.visible = true;
			this.oneLab.text = game.table.T_Language_Table.getVoByKey(161).value + this._msg.getReceiverPhone();
		}else if(vo._type == 3)// 实物
		{
			this.oneLab.visible = false;
			this.goodsGroup.visible = true;
			this.nameLab.text = this._msg.getReceiverName();
			this.phoneLab.text = this._msg.getReceiverPhone();
			this.qqLab.text = this._msg.getReceiverQQ();
			this.addLab.text = this._msg.getReceiverAddress();
		}
    }
    /**确定按钮 */
    private onOKButtonClick(e:egret.TouchEvent) 
	{
		if(this._parentView)
        {
            this._parentView.removeChild(this);
            burn._Notification_.send(NotifyEnum.CHECK_POP);
        }
	}
	public destroy():void {
        let self = this;
		game.util.UIUtil.closeView(self.root, function():void {
            self.parent && self.parent.removeChild(self);
            self.root.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onOKButtonClick, self);
		});
	}
}