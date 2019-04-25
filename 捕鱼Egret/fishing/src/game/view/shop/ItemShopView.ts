/**
 * 道具商城UI
 */
class ItemShopView extends burn.view.PopView {

	private _uiDisplay:ItemShopViewUI;
	private _nIdx:number;
	private _bPop:boolean = false;
	private _btnWrapList:Array<burn.tools.UIWrap>;



	public constructor() {
		super();
		this._nIdx = -1;
		this._bPop = false;
	}

	public initView():void {
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/shop/ItemShopUI.exml", this.addUIResource, this);
		this._btnWrapList = new Array();
	}

	private addUIResource(clazz:any, url:string):void {
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 

		//添加操作UI
		this._uiDisplay = new ItemShopViewUI();
		this._uiDisplay.skinName = clazz;
		this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
		uiLayer.addChild(this._uiDisplay);
		//添加关闭按钮事件
		this._uiDisplay.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
		this._uiDisplay.gunBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSideBtnClick, this);
		this._uiDisplay.itemBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSideBtnClick, this);
		this._uiDisplay.barbetteBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSideBtnClick, this);

		//封装按钮状态功能
		this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.closeBtn));
		
		//默认打开第一个tab页面
		if (!this._bPop) {
			game.util.UIUtil.popView(this._uiDisplay.root);
			this._bPop = true;
			this._uiDisplay.gunBtn.enabled = false;
			EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/shop/GunShopItem.exml", ()=>{
				this.updateViewByIndex(1);
			}, this);
		}
		this._uiDisplay.gun_des.lineSpacing = 5;
		this._uiDisplay.gun_des_1.lineSpacing = 5;
	}

	private onSideBtnClick(e:egret.TouchEvent):void {
		let tar = e.target;
		if (tar == this._uiDisplay.barbetteBtn) {
			this._uiDisplay.barbetteBtn.enabled = false;
			this._uiDisplay.gunBtn.enabled = true;
			this._uiDisplay.itemBtn.enabled = true;
			this.updateViewByIndex(2);
		} else if (tar == this._uiDisplay.gunBtn) {
			this._uiDisplay.gunBtn.enabled = false;
			this._uiDisplay.barbetteBtn.enabled = true;
			this._uiDisplay.itemBtn.enabled = true;
			this.updateViewByIndex(1);
		} else if (tar == this._uiDisplay.itemBtn) {
			this._uiDisplay.itemBtn.enabled = false;
			this._uiDisplay.barbetteBtn.enabled = true;
			this._uiDisplay.gunBtn.enabled = true;
			this.updateViewByIndex(3);
		}
	}

	private updateViewByIndex(idx:number):void {
		if (this._nIdx == idx) {
			return;
		}
		this._nIdx = idx;
		if (idx == 3) {
			this._uiDisplay.tab_3.visible = true;
			this._uiDisplay.tab_1.visible = false;
			this._uiDisplay.tab_2.visible = false;

			this._uiDisplay.item_group.removeChildren();

			let vos = game.table.T_Shop_Table.getAllVo();
			let bFirst = false;
			for (let i = 0; i < vos.length; i++) {
				let vo = vos[i];
				if (vo.shopType == idx) {
					let tempArr = vo.price.split("_");
					let item:GunShopItemView = new GunShopItemView(idx, vo.id, vo.itemId, Number(tempArr[0]), Number(tempArr[1]), vo.num);
					item.scaleX = item.scaleY = 0.96;
					this._uiDisplay.item_group.addChild(item);
					item.name = vo.itemId + "";
					item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showLeft, this);
					if (!bFirst) {
						item.select.visible = true;
						burn.tools.TweenTools.showOutAndIn(item.select, 1500);
					}
					bFirst = true;
				}
			}
			this._uiDisplay.itemList_scroll.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.rollOverCall, this);
			this._uiDisplay.itemList_scroll.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.rollOverCall, this);
			let tLayout:eui.TileLayout = new eui.TileLayout();
			tLayout.paddingTop = 20;
			tLayout.paddingLeft = 0;
			tLayout.paddingRight = 0;
			tLayout.paddingBottom = 0;
			this._uiDisplay.item_group.layout = tLayout;    // 网格布局
		} else if (idx == 1) {
			this._uiDisplay.tab_3.visible = false;
			this._uiDisplay.tab_2.visible = false;
			this._uiDisplay.tab_1.visible = true;

			this._uiDisplay.gun_group.removeChildren();

			let vos = game.table.T_Shop_Table.getAllVo();
			for (let i = 0; i < vos.length; i++) {
				let vo = vos[i];
				if (vo.shopType == idx) {
					let tempArr = vo.price.split("_");
					let item:GunShopItemView = new GunShopItemView(idx, vo.id, vo.itemId, Number(tempArr[0]), Number(tempArr[1]), vo.num);
					item.name = vo.itemId + "";
					this._uiDisplay.gun_group.addChild(item);
					item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showLeft, this);
					if (i == 0) {
						item.select.visible = true;
						burn.tools.TweenTools.showOutAndIn(item.select, 1500);
						let self = this;
						game.util.IconUtil.getIconByIdAsync(IconType.PAOSHOW, Number(item.name), function(icon:egret.Bitmap):void {
							if (icon) {
								self._uiDisplay.gun_contaner.addChild(icon);
							}
						});
						let voItem = game.table.T_Item_Table.getVoByKey(Number(item.name));
						if (voItem) {
							this._uiDisplay.gun_des.text = game.util.Language.getText(voItem.desc);
						}
					}
				}
			}
			this._uiDisplay.gunList_scroll.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.rollOverCall, this);
			this._uiDisplay.gunList_scroll.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.rollOverCall, this);
			let tLayout:eui.TileLayout = new eui.TileLayout();
			tLayout.paddingTop = 10;
			tLayout.paddingLeft = 15;
			tLayout.paddingRight = 15;
			tLayout.paddingBottom = 20;
			this._uiDisplay.gun_group.layout = tLayout;    // 网格布局
		} else if (idx == 2) {  //炮座
			this._uiDisplay.tab_3.visible = false;
			this._uiDisplay.tab_1.visible = false;
			this._uiDisplay.tab_2.visible = true;

			this._uiDisplay.gun_group_1.removeChildren();

			let vos = game.table.T_Shop_Table.getAllVo();
			for (let i = 0; i < vos.length; i++) {
				let vo = vos[i];
				if (vo.shopType == idx) {
					let tempArr = vo.price.split("_");
					let item:GunShopItemView = new GunShopItemView(idx, vo.id, vo.itemId, Number(tempArr[0]), Number(tempArr[1]), vo.num);
					item.name = vo.itemId + "";
					this._uiDisplay.gun_group_1.addChild(item);
					item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showLeft, this);
					if (vo.itemId == 80001) {
						item.select.visible = true;
						burn.tools.TweenTools.showOutAndIn(item.select, 1500);
						let self = this;
						game.util.IconUtil.getIconByIdAsync(IconType.PAOSHOW, Number(item.name), function(icon:egret.Bitmap):void {
							if (icon) {
								self._uiDisplay.gun_contaner_1.addChild(icon);
							}
						});
						let voItem = game.table.T_Item_Table.getVoByKey(Number(item.name));
						if (voItem) {
							this._uiDisplay.gun_des_1.text = game.util.Language.getText(voItem.desc);
						}
					}
				}
			}
			this._uiDisplay.gunList_scroll_1.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.rollOverCall, this);
			this._uiDisplay.gunList_scroll_1.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.rollOverCall, this);
			let tLayout:eui.TileLayout = new eui.TileLayout();
			tLayout.paddingTop = 10;
			tLayout.paddingLeft = 15;
			tLayout.paddingRight = 15;
			tLayout.paddingBottom = 20;
			this._uiDisplay.gun_group_1.layout = tLayout;    // 网格布局
		}
	}
	
	private showLeft(e:egret.TouchEvent) {
		let name = e.target.name;
		if (name == "") {
			return;
		}
		let self = this;
		if (this._nIdx == 1) {
			self._uiDisplay.gun_contaner.removeChildren();
			game.util.IconUtil.getIconByIdAsync(IconType.PAOSHOW, Number(name), function(icon:egret.Bitmap):void {
				if (icon) {
					self._uiDisplay.gun_contaner.addChild(icon);
				}
			});
			//
			let vo = game.table.T_Item_Table.getVoByKey(Number(name));
			if (vo) {
				this._uiDisplay.gun_des.text = game.util.Language.getText(vo.desc);
			}
			let numChild = this._uiDisplay.gun_group.numChildren;
			for (let i = 0; i < numChild; i++) {
				let child:GunShopItemView = this._uiDisplay.gun_group.getChildAt(i) as GunShopItemView;
				if (child.name == name) {
					child.select.visible = true;
					burn.tools.TweenTools.showOutAndIn(child.select, 1500);
				} else {
					child.select.visible = false;
					egret.Tween.removeTweens(child.select);
				}
			}
		} else if (this._nIdx == 2) {
			self._uiDisplay.gun_contaner_1.removeChildren();
			game.util.IconUtil.getIconByIdAsync(IconType.PAOSHOW, Number(name), function(icon:egret.Bitmap):void {
				if (icon) {
					self._uiDisplay.gun_contaner_1.addChild(icon);
				}
			});
			//
			let vo = game.table.T_Item_Table.getVoByKey(Number(name));
			if (vo) {
				this._uiDisplay.gun_des_1.text = game.util.Language.getText(vo.desc);
			}
			let numChild = this._uiDisplay.gun_group_1.numChildren;
			for (let i = 0; i < numChild; i++) {
				let child:GunShopItemView = this._uiDisplay.gun_group_1.getChildAt(i) as GunShopItemView;
				if (child.name == name) {
					child.select.visible = true;
					burn.tools.TweenTools.showOutAndIn(child.select, 1500);
				} else {
					child.select.visible = false;
					egret.Tween.removeTweens(child.select);
				}
			}
		} else if (this._nIdx == 3) {
			let numChild = this._uiDisplay.item_group.numChildren;
			for (let i = 0; i < numChild; i++) {
				let child:GunShopItemView = this._uiDisplay.item_group.getChildAt(i) as GunShopItemView;
				if (child.name == name) {
					child.select.visible = true;
					burn.tools.TweenTools.showOutAndIn(child.select, 1500);
				} else {
					child.select.visible = false;
					egret.Tween.removeTweens(child.select);
				}
			}
		}
	}
	/**滚动结束的事件回调 */
	private rollOverCall(e:egret.TouchEvent) {
	
	}

	private onCloseBtn(e:egret.TouchEvent):void {
		burn.Director.popView();
	}

	public destroy():void {
		let self = this;
		this._bPop = false;
		while (self._btnWrapList.length > 0) {
			let wrap = self._btnWrapList.pop();
			wrap.destroy();
		}
		//关闭UI动画
		game.util.UIUtil.closeView(this._uiDisplay.root, function():void {
			self._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onCloseBtn, self);
			self._uiDisplay.gunBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onSideBtnClick, self);
			self._uiDisplay.itemBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onSideBtnClick, self);
			self._uiDisplay.barbetteBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onSideBtnClick, self);
			self._uiDisplay.gunList_scroll.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, self.rollOverCall, self);
			self.parent && self.parent.removeChild(self);

			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/shop/GunShopItem.exml");
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/shop/ItemShopUI.exml");
		});
	}
}

/**
 * 道具商店UI
 */
class ItemShopViewUI extends eui.Component {

	public closeBtn:eui.Button;
	public gunBtn:eui.Button;
	public barbetteBtn:eui.Button;
	public itemBtn:eui.Button;

	public tab_1:eui.Group;
	public tab_2:eui.Group;
	public gun_des:eui.Label;
	public gun_contaner:eui.Group;
	public gun_des_1:eui.Label;
	public gun_contaner_1:eui.Group;

	public tab_3:eui.Group;

	public gunList_scroll:eui.Scroller;
	public gun_group:eui.Group;
	public gunList_scroll_1:eui.Scroller;
	public gun_group_1:eui.Group;

	public itemList_scroll:eui.Scroller;
	public item_group:eui.Group;
	public root:eui.Group;
	public constructor() {
		super();
	}
}