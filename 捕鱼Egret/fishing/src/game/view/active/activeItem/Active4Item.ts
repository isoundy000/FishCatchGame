/** 活动类型4 */
class Active4Item extends ComponetBase
{
    public listGroup:eui.Group;
    public actTimeLab:eui.Label;//时间
    public goldLab:egret.BitmapText;
    public activeIconLab:egret.BitmapText;//活动币
    public gainGroup:eui.Group;
    public ruleBtn:eui.Button;
    private arrItemList:Array<Active4ItemCom>;
	public constructor() {
		super();
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_4.exml";
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height/2;
        this.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
            let parentView;
            let width = 0;
            let height = 0;
            parentView = egret.MainContext.instance.stage;
            width = CONFIG.contentWidth;
            height = CONFIG.contentHeight;
            let confirm = new ActiveRulePanel(parentView);
            confirm.anchorOffsetX = confirm.width >> 1;
            confirm.anchorOffsetY = confirm.height >> 1;
            if(parentView)
            {
                parentView.addChild(confirm);
            }
        }, this);

        let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
        this.goldLab.text = userModel.getCoins() + "";

        
		let activeModel = burn.Director.getModelByKey(ActiveModel) as ActiveModel;
        this.activeIconLab.text = activeModel.getActiveCoin() + "";
        let type = Active_Type.LIMIT_TIME_ACTIVE_TYPE_FISH_SEND;
        let item = activeModel.getActiveObjByType(type);
        this.actTimeLab.text = game.util.TimeUtil.getActiveTime(item._startTime,item._endTime);


        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_4Item.exml",()=>{
            this.setList();
        },this);
	}
    public setList():void {
		let activeModel = burn.Director.getModelByKey(ActiveModel) as ActiveModel;
        let datas = activeModel.getActiveShopDataList();
        let lenDatas = datas.length;
        let vos = game.table.T_SecretShop_Table.getAllVo();
        let len = vos.length;
        //列表
        this.listGroup.removeChildren();
        this.arrItemList = new Array<Active4ItemCom>();
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < lenDatas; j++) {
                if (vos[i].id == datas[j]._id) {
                    let item = new Active4ItemCom(vos[i]);
                    this.listGroup.addChild(item);
                    this.arrItemList.push(item);
                }
            }
        }
        let tLayout:eui.VerticalLayout = new eui.VerticalLayout();
		this.listGroup.layout = tLayout;    /// 网格布局
    }
    public destory() {
        if(this.arrItemList && this.arrItemList.length > 0) {
            let len = this.arrItemList.length;
            for(let i = 0; i < len; i++) {
                this.arrItemList[i].destory();
            }
        }
    }
}

class Active4ItemCom extends eui.Component
{
    public iconGroup:eui.Group; //图标
    public desc:eui.Label;//描述
    public buyGroup:eui.Group;//购买按钮
    private _id:number;
    private _state:number;
    public constructor(vo:game.table.T_SecretShop) {
		super();
        this._id = vo.id;
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_4Item.exml";
		let activeModel = burn.Director.getModelByKey(ActiveModel) as ActiveModel;
        let obj = activeModel.getActiveShopDataById(vo.id);
        this._state = obj._state;
        this.buyGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.setData(vo);
        /**LIMIT_TIME_ACTIVE_SECRET_SHOP_GOODS_CAN_BUY = 0;// 可以买购买
         * LIMIT_TIME_ACTIVE_SECRET_SHOP_GOODS_HAVE_BOUGHT = 1;// 购买过
        */
        if (obj._state == 1) {
            //提示
            // let colorFlilter = new egret.ColorMatrixFilter(game.util.FilterEnmu.DARK);
            // this.buyGroup.filters = [colorFlilter];
            this.buyGroup.visible = false;
        }
        let gainBtn = new burn.tools.UIWrap(this.buyGroup);
    }
    public setData(vo:game.table.T_SecretShop):void
    {
        //id:1,goods:"40001_5",price:"10001_10,10013_2"
        let goodsStr = vo.goods;
        let datas = goodsStr.split("_");
        let self = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml", ()=>{
            let showItem = new BagViewItem(Number(datas[0]), Number(datas[1]));
            showItem.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml";
            showItem.scaleX = showItem.scaleY = 0.75;
            showItem.anchorOffsetX = showItem.width/2;
            showItem.anchorOffsetY = showItem.height/2;
            showItem.init();
            this.iconGroup.addChild(showItem);
        }, this);
        //描述
        let priceStr = vo.price.split(",");
        let price1 = priceStr[0].split("_");
        let price2 = priceStr[1].split("_");
        let vo1 = game.table.T_Item_Table.getVoByKey(Number(price1[0]));
        let vo2 = game.table.T_Item_Table.getVoByKey(Number(price2[0]));
        let str = price1[1] + game.util.Language.getText(vo1.name) + "或" + price2[1] + game.util.Language.getText(vo2.name);
        this.desc.text = str;
    }
    private onClick() {
        if (this._state == 1) {
            game.util.GameUtil.popTips(game.util.Language.getText(187));
            return;
        }
        let parentView;
        let width = 0;
        let height = 0;
        parentView = egret.MainContext.instance.stage;
        width = CONFIG.contentWidth;
        height = CONFIG.contentHeight;
        let confirm = new ActiveSurePanel(parentView,this._id);
        confirm.anchorOffsetX = confirm.width >> 1;
        confirm.anchorOffsetY = confirm.height >> 1;
        if (parentView) {
            parentView.addChild(confirm);
        }
    }
    public destory() {
        this.buyGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }
}