// TypeScript file
class QihangView  extends eui.Component {
    public titleBgInner:eui.Image;
    public okBtn:eui.Group;//
    //
    public scrolGroup:eui.Group;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
    //父控件
    private _parentView:any;
    //root
    private root:eui.Group;
    private _bPop:boolean;
    private list:Array<game.model.Item>;
    private _to:egret.Point;
    private _fun:Function;

    //次日礼包
    public tile:eui.Image;
    public tileCiri:eui.Image;

    public btnIcon:eui.Image;
    public btnIconCiri:eui.Image;

    public qihangDesc:eui.Label;
    public expireTime:eui.Label;
    private _bIsQihang:boolean;
    public QihangGroup:eui.Group;
	public constructor(arr:Array<game.model.Item>,parent:any, isQihang:boolean = false) {
		super();
        this._bIsQihang = isQihang;
        this._bPop = false;
		this._btnWrapList = new Array();
		this.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/Qihang/Qihang.exml";
        
		let okOneBtn = this.okBtn;
		okOneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
		//封装按钮
		this._btnWrapList.push(new burn.tools.UIWrap(this.okBtn));
        this._parentView = parent;
        this.list = new Array<game.model.Item>();
        for (let i = 0; i < arr.length; i++) {
            let data = arr[i];
            this.list.push(data);
        }
        this.titleBgInner.visible = true;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/BagItem.exml", ()=>{
            this.setData();
        }, this);
	}
    //设置
    private setData():void {
        if (!this.list) {
            return;
        }
        if (this.list.length == 0) {
            return;
        }
        this.setList(this.list);

        // if (this._bIsQihang) {
        //     this.onOKButtonClick(null);
        //     return;
        // }

		if (!this._bPop) {
			//打开UI动画
			game.util.UIUtil.popView(this.root);
			this._bPop = true;
		}
        //this.effct.blendMode = egret.BlendMode.ADD;
    }
    public setList(list:Array<game.model.Item>):void {
        if (list && list.length > 0) {
            for (let i = 0; i < list.length; i++) {
                let item = new BagViewItem(list[i].getItemId(), list[i].getCount(), false);
                item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml";
                item.name = list[i].getItemId() + "";
                item.scaleX = item.scaleY = 0.95;
                item.init();
                this.scrolGroup.addChild(item);
            }

            let tLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
            tLayout.paddingTop = 20;
            tLayout.paddingLeft = 10;
            tLayout.paddingRight = 0;
            tLayout.paddingBottom = 0;
            this.scrolGroup.layout = tLayout;    /// 网格布局
        }
        egret.setTimeout(function(){
            game.util.LoaderUtil.startMainSilentLoad();
            if (CONFIG.isOpenMusic) {
                RES.loadGroup("ui_sound");
            }
        }, this, 300);
    }
    /**确定按钮 */
    private onOKButtonClick(e:egret.TouchEvent) {
        if (!this._to) {
            let self = this;
            game.util.UIUtil.closeView(self.root, function():void {
                //移除按钮封装
                while (self._btnWrapList.length > 0) {
                    let wrap = self._btnWrapList.pop();
                    wrap.destroy();
                }
                self.startAction();
                let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
                burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, {userId:userModle.getUserId(), isTween:true, count:userModle.getCoins()});
                burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, {userId:userModle.getUserId(), isTween:true, count:userModle.getMoney()});
                if (self._parentView) {
                    self._parentView.removeChild(self);
                }
                self.parent && self.parent.removeChild(self);
                self.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onOKButtonClick, self);
            });
            return;
        }
        this.startAction();
        let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
        burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, {userId:userModle.getUserId(), isTween:true, count:userModle.getCoins()});
        burn._Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, {userId:userModle.getUserId(), isTween:true, count:userModle.getMoney()});
		if (this._parentView) {
            this._parentView.removeChild(this);
        }
	}
    //次日礼包
    public setCiri(str:string):void {
        this.tile.visible = false;
        this.tileCiri.visible = true;
        this.btnIcon.visible = false;
        this.btnIconCiri.visible = true;
        this.qihangDesc.visible = false;
        this.expireTime.text = str;
    }
    public setPosFun(to:egret.Point, fun:Function):void {
        if (to) {
            this._to = to;
        }
        this._fun = fun;
    }
    public startAction():void {
        if (!this._parentView) {
            return;
        }
        if (!this.list) {
            return;
        }
        if (!this._to) {
            this._fun && this._fun();
            return;
        }
        let len = this.scrolGroup.numChildren;

        let rect = new eui.Rect();
        rect.width = 1280;
        rect.height = 720;
        rect.alpha = 0.7;
        rect.name = "rect";
        this._parentView.addChild(rect);
        for (let i = 0; i < len; i++) {
            let item = new BagViewItem(this.list[i].getItemId(), this.list[i].getCount(), false);
            item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml";
            item.name = this.list[i].getItemId() + "";
            item.scaleX = item.scaleY = 0.95;
            let posLocal = this.scrolGroup.getChildAt(i).localToGlobal();
            item.x = posLocal.x;
            item.y = posLocal.y;
            item.init();
            // item.changeState();
            this._parentView.addChild(item);

            let parentView = this._parentView;
            let self = this;
            let time = egret.Point.distance(posLocal,self._to)/0.5;
            (function (goldIcon, i) {
                egret.Tween.get( goldIcon )
                    .wait(800 + i*100)
                    .to({y: goldIcon.y - 60},240)
                    .to( {x:self._to.x - goldIcon.width/2 , y:self._to.y - goldIcon.height/2}, 600, egret.Ease.backIn).call(function(){
                        if (goldIcon == null) {
                            return;
                        }
                        if (i == (len - 1)) {
                            self._fun && self._fun();
                            //干掉遮罩
                            let child = parentView.getChildByName("rect");
                            child && parentView.removeChild(child);
                        }
                        parentView.removeChild(goldIcon);
                        goldIcon = null;
                        //添加一个特效
                        let txtr = RES.getRes("ef_addcoin_png");
                        let effct = new egret.Bitmap(txtr);
                        effct.anchorOffsetX = effct.width/2;
                        effct.anchorOffsetY = effct.height/2;
                        parentView.addChild(effct,81);
                        effct.x = self._to.x ;
                        effct.y = self._to.y ;
                        effct.scaleX = 0.2;
                        effct.scaleY = 0.2;
                        let tw = egret.Tween.get(effct, {loop:false});
                        tw.to({scaleX:0.7, scaleY:0.7},120)
                            .to({scaleX:1.2, scaleY:1.2, alpha:0},50)
                            .call(function(){
                                egret.Tween.removeTweens(effct);
                                parentView.removeChild(effct);
                            })
                    });
            })(item, i);
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

		    RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/Qihang/Qihang.exml");
		});
	}
}




class QihangItem extends eui.Component{
	/** 道具id */
	private _itemId:number;
	/** 道具数量 */
	private _count:number;
	/** 图标背景 */
	public itemBg:eui.Group;
	/** 道具数量文本框 */
	public countTxt:eui.Label;
	public root:eui.Group;
    public bg:eui.Image;
	public constructor(itemId:number, count:number) {
		super();
		this._itemId = itemId;
		this._count = count;
	}

	public init():void {
		let self = this;
		game.util.IconUtil.getIconByIdAsync(IconType.PROP, this._itemId, function(icon:egret.Bitmap):void {
			if (!icon) {
				return;
			}
			icon.width = 78;
			icon.height = 78;
			icon.anchorOffsetX = icon.width/2;
			icon.anchorOffsetY = icon.height/2;
			icon.x = self.itemBg.width/2;
			icon.y = self.itemBg.height/2;
			self.itemBg.addChild(icon);
			//道具数量
			self.countTxt.text = "" + self._count;
		});
	}
    public changeState():void
    {
        this.bg.visible = false;
    }
}