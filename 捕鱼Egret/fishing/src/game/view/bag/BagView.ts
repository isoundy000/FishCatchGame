/**
 * 背包界面view
 */
class BagView extends burn.view.FullView {

	//背包UI
	private _bagUI:BagViewUI;
	//按钮封装对象集合
	private _btnWrapList:Array<burn.tools.UIWrap>;
	//道具对象集合
	private _itemList:Array<BagViewItem>;
	private _bPop:boolean = false;
	private _nCurID:number;
	public constructor() {
		super();
		game.util.UIUtil.startLoading();
		this._nCurID = -1;
	}

	public initView(list:Array<game.model.Item>):void {
		//this.loadComplete
		let self = this;
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/BagUI.exml", function(clazz:any,url:string){
			self.loadComplete(clazz, url, list);
		}, this);
		this._btnWrapList = new Array();
		this._itemList = new Array();
	}

	private loadComplete(clazz:any,url:string, list:Array<game.model.Item>):void
	{
		game.util.UIUtil.closeLoading();
		this.removeChildren();
		let uiLayer:eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer); 
		//添加操作UI
		let uiObj = new BagViewUI();
		this._bagUI = uiObj;
		this._bagUI.skinName = clazz;
		this._bagUI.horizontalCenter = 0;
        this._bagUI.verticalCenter = 0;
		uiLayer.addChild(this._bagUI);
		
		if (!this._bPop) {
			game.util.UIUtil.popView(this._bagUI.root);
			this._bPop = true;
		}

		//添加关闭按钮事件
		this._bagUI.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseEvent, this);
		this._bagUI.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchSendBtnEvent, this);
		this._bagUI.useBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchUseBtnEvent, this);
		this._bagUI.equipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.equipBtnEvent, this);
		this._bagUI.renewBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.renewBtnEvent, this);
		this._bagUI.unloadBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.unloadBtnEvent, this);

		//封装按钮状态功能
		this._btnWrapList.push(new burn.tools.UIWrap(this._bagUI.closeBtn));
		this._btnWrapList.push(new burn.tools.UIWrap(this._bagUI.useBtn));
		this._btnWrapList.push(new burn.tools.UIWrap(this._bagUI.splitBtn));
		this._btnWrapList.push(new burn.tools.UIWrap(this._bagUI.sendBtn));
		this._btnWrapList.push(new burn.tools.UIWrap(this._bagUI.equipBtn));
		this._btnWrapList.push(new burn.tools.UIWrap(this._bagUI.renewBtn));
		
		//图片旋转特效
		burn.tools.TweenTools.rotation(this._bagUI.bgsun,4000);
		
		this._bagUI.itemDesTxt.text = "";
		this._bagUI.itemNameTxt.text = "";
		this._bagUI.itemTypeTxt.text = "";
		this._bagUI.itemCountTxt.text = "";
		this._bagUI.sendBtn.visible = false;
		this._bagUI.useBtn.visible = false;
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/BagItem.exml", ()=>{
			this.setListData(list);
		},this);
	}
	public setListData(newList:Array<game.model.Item>):void
	{

		let list = new Array<game.model.Item>();
		let len = newList.length;
		for (let i = 0; i < len; i ++) {
			if (newList[i].getCount() == 0) {
				continue;
			}
			if (newList[i].getItemId() == PropEnum.FREE_RAGE) {
				continue;
			}
			if (newList[i].getItemId() == PropEnum.FREE_CLONE) {
				continue;
			}
			list.push(newList[i]);
		}
		let selectId:number = -1;
		if (this._nCurID != -1) {
			selectId = this._nCurID;
		}
		let newTempList = new Array<game.model.Item>();
		len = list.length;
		for (let i = 0; i < len; i ++) {
			if (list[i].getCount() == 0) {
				continue;
			}
			newTempList.push(list[i]);
		}
		let self = this;
		self._bagUI.scrollerGroup.removeChildren();
		
		let num  = 0;
		if (newTempList.length > 16) {
			num  = Math.floor(newTempList.length / 4) + 1;
		} else {
			num =  Math.floor(newTempList.length / 4);
		}
		num *= 4;
		if (num < 16) {
			num = 16;
		}
		//初始化背包列表
		for (let i = 0; i < num; i++) {
			let item = null;
			if (i >= newTempList.length) {
				item = new BagViewItem(0, 0, false);
				item.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/BagItem.exml";
				item.scaleX = item.scaleY = 0.95;
				item.setNull();
			} else {
				if (i == 0 && selectId == -1) {
					item = new BagViewItem(newTempList[i].getItemId(), newTempList[i].getCount(), true);
					item.name = newTempList[i].getItemId() + "";
					item.scaleX = item.scaleY = 0.95;
					item.init();
					self.send(NotifyEnum.CLICK_BAG_ITEM, item.getItemId());
				} else if(selectId != -1 && newTempList[i].getItemId() == selectId) {
					item = new BagViewItem(newTempList[i].getItemId(), newTempList[i].getCount(), false);
					item.name = newTempList[i].getItemId() + "";
					item.scaleX = item.scaleY = 0.95;
					item.init();
					self.send(NotifyEnum.CLICK_BAG_ITEM, item.getItemId());
				} else {
					item = new BagViewItem(newTempList[i].getItemId(), newTempList[i].getCount(), false);
					item.name = newTempList[i].getItemId() + "";
					item.scaleX = item.scaleY = 0.95;
					item.init();
				}
				//为item添加事件
				item.addEventListener(egret.TouchEvent.TOUCH_END, this.touchItemEvent, this);
			}
			this._bagUI.scrollerGroup.addChild(item);
			this._itemList.push(item);
		}

		let tLayout:eui.TileLayout = new eui.TileLayout();
		tLayout.paddingTop = 10;
		tLayout.paddingLeft = 0;
		tLayout.paddingRight = 0;
		tLayout.paddingBottom = 20;
		self._bagUI.scrollerGroup.layout = tLayout;    /// 网格布局
	}
	private touchItemEvent(e:egret.TouchEvent) {
		let name = e.currentTarget.name;
		for (let i = 0; i < this._itemList.length; i++) {
			if (name == this._itemList[i].name) {
				this._nCurID = this._itemList[i].getItemId();
				this._itemList[i].selected(true);
				this.send(NotifyEnum.CLICK_BAG_ITEM, this._itemList[i].getItemId());
			} else {
				this._itemList[i].selected(false);
			}
		}
	}

	//设置左侧面板信息
	public setLeftMsg(itemName:string, itemType:string, itemCount:string, itemDes:string,itemVo:game.table.T_Item):void {
		this._bagUI.itemDesTxt.text = itemDes;
		this._bagUI.itemNameTxt.text = itemName;
		this._bagUI.itemTypeTxt.text = itemType;
		this._bagUI.itemCountTxt.text = itemCount;

		//itemVo
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		let obj = userModel.getItemById(itemVo.id);
		let btnArr = new Array<eui.Group>();
		if (itemVo.everyTimeLimit && itemVo.everyTimeLimit > 0) {
			this._bagUI.sendBtn.visible = true;
			btnArr.push(this._bagUI.sendBtn);
			this._bagUI.sendBtn.name = itemVo.id + "";
		} else {
			this._bagUI.sendBtn.visible = false;
		}
		//如果是锻造
		if (itemVo.type == BagItemType.FORGE_PROP) {
			this._bagUI.useBtn.visible = true;
			btnArr.push(this._bagUI.useBtn);
			this._bagUI.useBtn.name = itemVo.id + "";
		} else {
			this._bagUI.useBtn.visible = false;
		}
		//炮台炮座
		if (itemVo.type == BagItemType.BATTERY
		  ||itemVo.type == BagItemType.BARBETTE) {
			let item = userModel.getItemById(itemVo.id);
			if ((item.isAct() && userModel.getCurSkinId() == itemVo.id)
			||(item.isAct() && userModel.getCurGunBgId() == itemVo.id)) {
				if (item.isAct() && userModel.getCurGunBgId() == itemVo.id) {
					this._bagUI.unloadBtn.visible = true;
					btnArr.push(this._bagUI.unloadBtn);
					this._bagUI.unloadBtn.name = itemVo.id + "";
					this._bagUI.equipBtn.visible = false;
					this._bagUI.renewBtn.visible = false;
				} else {
					if (item.getTime() > 0) {
						this._bagUI.renewBtn.visible = true;
						btnArr.push(this._bagUI.renewBtn);
						this._bagUI.renewBtn.name = itemVo.id + "";
						this._bagUI.equipBtn.visible = false;
						this._bagUI.unloadBtn.visible = false;
					}
				}
			} else if (item.isAct()) {
				this._bagUI.equipBtn.visible = true;
				btnArr.push(this._bagUI.equipBtn);
				this._bagUI.equipBtn.name = itemVo.id + "";
				this._bagUI.renewBtn.visible = false;
				this._bagUI.unloadBtn.visible = false;
			} else {
				this._bagUI.renewBtn.visible = true;
				btnArr.push(this._bagUI.renewBtn);
				this._bagUI.renewBtn.name = itemVo.id + "";
				this._bagUI.equipBtn.visible = false;	
				this._bagUI.unloadBtn.visible = false;
			}
			//添加时间
			let endTime = item.getTime();
			if (endTime) {
				let residue = endTime - game.util.TimeUtil.getCurrTime();
				let expire = Math.floor(residue/(60 * 60 * 24));
				if (expire < 0) {
					expire = 0;
				}
				this._bagUI.itemCountTxt.text = game.util.Language.getText(194) + expire;
			}
		} else {
			this._bagUI.renewBtn.visible = false;
			this._bagUI.equipBtn.visible = false;
		}
		//iconGroup
		this._bagUI.iconGroup.removeChildren();
		let self = this;
		game.util.IconUtil.getIconByIdAsync(IconType.PROP, itemVo.id, function(icon:egret.Bitmap):void {
			if (!icon) {
				return;
			}
			icon.anchorOffsetX = icon.width/2;
			icon.anchorOffsetY = icon.height/2;
			icon.scaleX = 1.5;
			icon.scaleY = 1.5;
			icon.x = self._bagUI.iconGroup.width/2;
			icon.y = self._bagUI.iconGroup.height/2;
			self._bagUI.iconGroup.addChild(icon);
		});
		this._bagUI.splitBtn.visible = false;

		if (btnArr.length == 1) {
			btnArr[0].x = 194;
		} else if (btnArr.length == 2) {
			btnArr[0].x = 130;
			btnArr[1].x = 254;
		} else if (btnArr.length == 3) {
			btnArr[0].x = 69;
			btnArr[1].x = 194;
			btnArr[1].x = 318;
		}
	}
	//歇下
	private unloadBtnEvent(e:egret.TouchEvent) {
		let name = e.currentTarget.name;
        let send:ChangeGunSendMessage = new ChangeGunSendMessage();
        send.initData();
        send.setType(ChangeGunState.UNLOAD_ZUO);
		send.setSkinId(Number(name));
        NetManager.send(send);
	}
	//续费
	private renewBtnEvent(e:egret.TouchEvent) {
		let name = e.currentTarget.name;
		let vos = game.table.T_Shop_Table.getAllVo();
		let len = vos.length;
		let itemId = Number(name);
		let idShop = -1;
		for (let i = 0; i < len; i ++) {
			if (vos[i].itemId == itemId) {
				idShop = vos[i].id;
				break;
			}
		}
		let msg:ShopBuyMessage = new ShopBuyMessage();
		msg.initData();
		msg.setShopId(idShop);
		NetManager.send(msg);
	}
	//装备按钮的监听
	private equipBtnEvent(e:egret.TouchEvent) {
		let name = e.currentTarget.name;
        let send:ChangeGunSendMessage = new ChangeGunSendMessage();
        send.initData();
        send.setType(ChangeGunState.CHANGE_SKIN);
		send.setSkinId(Number(name));
        NetManager.send(send);
	}
	//使用按钮的监听
	private touchUseBtnEvent(e:egret.TouchEvent)
	{
		let name = e.currentTarget.name;
		this.send(NotifyEnum.USE_ITEM_BY_BAG,name);
	}
	//赠送按钮的监听
	private touchSendBtnEvent(e:egret.TouchEvent)
	{
		let name = e.currentTarget.name;
		this.send(NotifyEnum.SEND_ITEM_TO_USER,name);
	}
	/** 关闭界面按钮事件 */
	private onCloseEvent(e:egret.TouchEvent) {
		burn.Director.popView();
	}

	/** 消耗UI */
	public destroy():void {
		let self = this;
		this._bPop = false;
		//关闭UI动画
		game.util.UIUtil.closeView(this._bagUI.root, function():void {
			//移除按钮封装
			while (self._btnWrapList.length > 0) {
				let wrap = self._btnWrapList.pop();
				wrap.destroy();
			}
			self._bagUI.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onCloseEvent, self);
			self._bagUI.sendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.touchSendBtnEvent, self);
			self._bagUI.useBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.touchUseBtnEvent, self);
			self._bagUI.equipBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.equipBtnEvent, self);
			self._bagUI.renewBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.renewBtnEvent, self);
			self._bagUI.unloadBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.unloadBtnEvent, self);
			self.parent.removeChild(self);
			
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/BagUI.exml");
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/BagItem.exml");
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/SendUI.exml");
		});
	}
}

class BagViewUI extends eui.Component{
	
	public closeBtn:eui.Button;

	public leftPanel:eui.Group;
	public itemNameTxt:eui.Label;
	public useBtn:eui.Group;
	public splitBtn:eui.Group;
	public sendBtn:eui.Group;
	public equipBtn:eui.Group;
	public unloadBtn:eui.Group;
	public renewBtn:eui.Group;
	public itemTypeTxt:eui.Label;
	public itemCountTxt:eui.Label;
	public itemDesTxt:eui.Label;

	public rightPanel:eui.Group;
	public scroller:eui.Scroller;
	public scrollerGroup:eui.Group;
	public root:eui.Group;
	public iconGroup:eui.Group;

	public bgsun:eui.Image;

	
	

	public constructor(){
		super();
	}
}