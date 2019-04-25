class ActiveSurePanel extends eui.Component{
    public iconGroup:eui.Group; //图标
    public iconLab:eui.Label; //锁定 * 100

    public goldGroup:eui.Group;//金币
    public goldLab:egret.BitmapText;

    public activeGroup:eui.Group;//活动币
    public activeLab:egret.BitmapText;//

    public btnClose:eui.Button;//关闭按钮
    public root:eui.Group;
    private _parentView:egret.DisplayObjectContainer;
    private _id:number;
	public constructor(parent:egret.DisplayObjectContainer, id:number) {
		super();
        this._parentView = parent;
        this._id = id;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/active/ActiveSure.exml",this.loaded,this);
	}
    public loaded():void
    {
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/active/ActiveSure.exml";
		game.util.UIUtil.popView(this.root);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
        
        this.goldGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGold, this);
        this.activeGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onActive, this);

        let vo:game.table.T_SecretShop = game.table.T_SecretShop_Table.getVoByKey(this._id);
        let goodsStr = vo.goods;
        let datas = goodsStr.split("_");
        let self = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml", ()=>{
            let showItem = new BagViewItem(Number(datas[0]), Number(datas[1]));
            showItem.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml";
            showItem.anchorOffsetX = showItem.width/2;
            showItem.anchorOffsetY = showItem.height/2;
            showItem.init();
            this.iconGroup.addChild(showItem);
        }, this);
        let voGoods = game.table.T_Item_Table.getVoByKey(Number(datas[0]));

        this.iconLab.text = game.util.Language.getText(voGoods.name) + "x" + datas[1];

        let priceStr = vo.price.split(",");
        let price1 = priceStr[0].split("_");
        let price2 = priceStr[1].split("_");

        this.goldLab.text = price1[1];
        this.goldLab.textAlign = egret.HorizontalAlign.CENTER;
        this.activeLab.text = price2[1];
        this.activeLab.textAlign = egret.HorizontalAlign.CENTER;
    }
    private onGold(e:egret.TouchEvent) 
    {
        let activeModel = burn.Director.getModelByKey(ActiveModel) as ActiveModel;
        let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
        let type = Active_Type.LIMIT_TIME_ACTIVE_TYPE_SECRET_SHOP;
        let item = activeModel.getActiveObjByType(type);
        let send:LimitedTimeActiveSendMessage = new LimitedTimeActiveSendMessage();
        send.initData();
        send.setState(1);
        send.setId(item._id);
        send.setGoodsId(this._id);
        send.setPriceIndex(0);
        NetManager.send(send);
        // 发消息
        this.onOKButtonClick(null);
    }
    private onActive(e:egret.TouchEvent)
    {
        let activeModel = burn.Director.getModelByKey(ActiveModel) as ActiveModel;
        let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
        let type = Active_Type.LIMIT_TIME_ACTIVE_TYPE_SECRET_SHOP;
        let item = activeModel.getActiveObjByType(type);
        let send:LimitedTimeActiveSendMessage = new LimitedTimeActiveSendMessage();
        send.initData();
        send.setState(1);
        send.setId(item._id);
        send.setGoodsId(this._id);
        send.setPriceIndex(1);
        NetManager.send(send);
        //发消息
        this.onOKButtonClick(null);
    }
    /**确定按钮 */
    private onOKButtonClick(e:egret.TouchEvent) 
	{
		if(this._parentView)
        {
            game.util.UIUtil.closeView(this.root,()=>{
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
                this.goldGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGold, this);
                this.activeGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onActive, this);
                this._parentView.removeChild(this);
            })
        }
	}
}