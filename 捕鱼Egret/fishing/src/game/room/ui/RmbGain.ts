// TypeScript file
class RmbGainView  extends eui.Component {
    public titleBgGain:eui.Image;
    public okBtn:eui.Group;//
    //
    public scrolGroup:eui.Group;
    public actArr:Array<egret.DisplayObjectContainer>;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
    //父控件
    private _parentView:any;
    //root
    private root:eui.Group;
    //特效
    private effct:eui.Image;
    private _bPop:boolean;
    private list:Array<game.model.Item>;
    private _to:egret.Point;
    private _fun:Function;
	public constructor(parent:any) {
		super();
        this._bPop = false;
		this._btnWrapList = new Array();
        this.actArr = new Array<egret.DisplayObjectContainer>();
		this.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/guide/RmbGain.exml";
        
		let okOneBtn = this.okBtn;
		okOneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
		//封装按钮
		this._btnWrapList.push(new burn.tools.UIWrap(this.okBtn));
        this._parentView = parent;
        this.titleBgGain.visible = true;
        this.setData();
	}
    //设置
    private setData():void {
		burn.tools.TweenTools.rotation(this.effct, 4000);
		if (!this._bPop) {
			//打开UI动画
            let self = this;
			game.util.UIUtil.popView(this.root, function(){
                
            });
			this._bPop = true;
		}
    }
    /**确定按钮 */
    private onOKButtonClick(e:egret.TouchEvent) {
        let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
        let roomType = userModle.getMatchRoomLevel();
        if (roomType != RequesetRoomState.QmsRoom && !game.util.GameUtil.isKss(roomType)) {
            burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, {userId:userModle.getUserId(), isTween:true, count:userModle.getCoins()});
        }
        burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, {userId:userModle.getUserId(), isTween:true, count:userModle.getMoney()});
		if (this._parentView) {
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