// TypeScript file
class UserLvUpView  extends eui.Component {
    public showTips:eui.Label;//提示字符创
    public okBtn:eui.Group;//
    //
    public scrolGroup:eui.Group;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
    //回调函数
    private _callFun:Function;
    //父控件
    private _parentView:any;
    //userLv
    private _lv:number;
    //root
    private root:eui.Group;
    //特效
    private effct:eui.Image;
    private _bPop:boolean;
	public constructor(lv:number,parent:any) {
		super();
        this._bPop = false;
		this._btnWrapList = new Array();
		this.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/userInfo/UserLvUp.exml";
        
		this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
		//封装按钮
		this._btnWrapList.push(new burn.tools.UIWrap(this.okBtn));
        this._lv = lv;
        this._parentView = parent;

        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/userInfo/UserLvUp.exml",()=>{
            EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/BagItem.exml",this.setData,this);
        },this);
	}
    //设置
    private setData():void
    {
        let vo = game.table.T_RoleLevel_Table.getVoByKey(this._lv);
        if(!vo)
        {
            this.onOKButtonClick(null);
        }
        let voN = game.table.T_RoleLevel_Table.getVoByKey(this._lv - 1);
        if(!voN)
        {
            return;
        }
        let str = voN.levelUpAward;
        let datas = str.split(",");
        let list = new Array<game.model.Item>();
        for(let i = 0; i < datas.length; i++)
        {
            let data = datas[i];
            let obj = data.split("_");
            let item = new game.model.Item(Number(obj[0]),Number(obj[1]));
            list.push(item);
        }
        this.setList(list);
        this.showTips.text = "lv."+this._lv;
		burn.tools.TweenTools.rotation(this.effct, 3000);

		if(!this._bPop)
		{
			//打开UI动画
			game.util.UIUtil.popView(this.root);
			this._bPop = true;
		}
        this.effct.blendMode = egret.BlendMode.ADD;
    }
    public setList(list:Array<game.model.Item>):void
    {
        if(list && list.length > 0)
        {
            for (let i = 0; i < list.length; i++) {
                let item = new BagViewItem(list[i].getItemId(), list[i].getCount());
                item.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/BagItem.exml";
                item.name = list[i].getItemId() + "";
                item.scaleX = item.scaleY = 0.95;
                item.init();
                this.scrolGroup.addChild(item);
            }

            let tLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
            tLayout.gap = 10;
            tLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
            this.scrolGroup.layout = tLayout;    /// 网格布局
            this.scrolGroup.anchorOffsetX = this.scrolGroup.width/2;
            this.scrolGroup.anchorOffsetY = this.scrolGroup.height/2;
        }
    }
    /**确定按钮 */
    private onOKButtonClick(e:egret.TouchEvent) 
	{
        let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
        burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, {userId:userModle.getUserId(), isTween:true, count:userModle.getCoins()});
        burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, {userId:userModle.getUserId(), isTween:true, count:userModle.getMoney()});
		if(this._parentView)
        {
            this._parentView.removeChild(this);
        }
	}
	public destroy():void {
        let self = this;
		game.util.UIUtil.closeView(self.root, function():void {
            //移除按钮封装
            while (self._btnWrapList.length > 0) {
                let wrap = self._btnWrapList.pop();
                wrap.destroy();
            }
            self.parent && self.parent.removeChild(self);
            self.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onOKButtonClick, self);

		});
	}
}