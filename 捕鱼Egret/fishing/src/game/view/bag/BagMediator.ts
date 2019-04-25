/**
 * 背包中介者
 */
class BagMediator extends burn.mediator.SimpleMediator {
	private _curGiveID:number;
	private _curGiveNum:number;
	private _sendView:SendView;
	public constructor(view:burn.view.ViewBase) {
		super(view);
	}

	public onAdded():void {
		super.onAdded();
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		(this.getView() as BagView).initView(userModel.getItemList());
	}

	public init():void {
		//注册消息
		this.subscrib(NotifyEnum.CLICK_BAG_ITEM, this.clickItem);
		this.subscrib(NotifyEnum.SEND_ITEM_TO_USER, this.sendItem);
		this.subscrib(NotifyEnum.USE_ITEM_BY_BAG, this.useItem);
		this.subscrib(NotifyEnum.GIVE_ITEM_DATA,this.dataRefresh);
		//监听服务器
		let self = this;
        game.net.MessageDispatcher.register(game.net.ResponseType.GIVEITEMBACK, function(msg:GiveItemBackMessage):void {
            self.giveItemBack(msg);
        });
        game.net.MessageDispatcher.register(game.net.ResponseType.FINDUSERBACK, function(msg:FindUserBackMessage):void {
            self.findUserBack(msg);
        });
        //监听更换炮台消息
        game.net.MessageDispatcher.register(game.net.ResponseType.CHANGEGUNBACK, function(msg:ChangeGunBackMessage):void{
            self.changeGunBack(msg);
        });
		//监听服务器消息返回
		game.net.MessageDispatcher.register(game.net.ResponseType.SHOPBUYBACK, function(msg:ShopBuyBackMessage):void {
			self.shopBuyBack(msg);
		});
		
		this._curGiveID = -1;
		this._curGiveNum = -1;
	}
	//购买物品返回
	private shopBuyBack(msg:ShopBuyBackMessage):void {
		let state = msg.getState();
		switch (state) {
			case 0:
				game.util.GameUtil.popTips("货币不足");
				break;
			case 1:
				game.util.GameUtil.popTips("购买成功");
				burn._Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
				break;
			case 2:
				game.util.GameUtil.popTips("背包已满");
				break;
		}
		//添加到自己背包。重新设置shop
		let userModel:UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
		(this.getView() as BagView).setListData(userModel.getItemList());
	}

	//同步消息
	private dataRefresh(obj:any, target:any):void 
	{
		//{id:self._id,num:self.nCurNumber}
		target._curGiveID = Number(obj.id);
		target._curGiveNum = Number(obj.num);
	}

	/** 点击道具 */
	private clickItem(obj:any, target:any):void {
		let itemId = Number(obj);
		let itemVo = game.table.T_Item_Table.getVoByKey(itemId);
		(target.getView() as BagView).setLeftMsg(game.util.Language.getText(itemVo.name), target.getTypeNameByType(itemVo.type), 
			game.util.Language.getText(15) + ":" + itemVo.backpackMax, game.util.Language.getText(itemVo.desc),itemVo);
	}
	/** 使用道具 */
	private useItem(obj:any, target:any):void
	{
		let useId = Number(obj);
		let itemVo = game.table.T_Item_Table.getVoByKey(useId);
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		if (itemVo.type == BagItemType.FORGE_PROP) {
			//最高ID
			let gunRate = userModel.getCurGunID();
			let gunRateVo = game.table.T_Gun_Table.getVoByKey(gunRate);
			//判断有没有下一个炮倍
			if(gunRateVo)
			{
				let arr = gunRateVo.upgradeOrForgeCost;
				let arrData = arr.split(",");
				if (arrData.length > 1) {
					let forgeView:ForgeView = new ForgeView();
					let forgeMed:ForgeMediator = new ForgeMediator(forgeView);
					burn.Director.pushView(forgeMed);
					return;
				} else {
					let vos = game.table.T_Gun_Table.getAllVo();
					if( gunRate != vos[vos.length - 1].id) {
						//未开启锻造界面
						game.util.GameUtil.popTips(game.util.Language.getText(28));
					}else {
						// 2441
						game.util.GameUtil.popTips(game.util.Language.getText(2440));
					}
					return;
				}
			}
			return;
		}
	}
	/** 赠送道具 */
	private sendItem(obj:any, target:any):void {
		let sendId = Number(obj);
		let itemVo = game.table.T_Item_Table.getVoByKey(sendId);
		let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
		let itemData = userModel.getItemById(sendId);
		if (itemData.getCount() < itemVo.everyTimeLimit) {
			let arrName = new Array<string>();
			arrName.push(itemVo.everyTimeLimit + "");
			arrName.push(game.util.Language.getText(itemVo.name) + "");
			game.util.GameUtil.popTips(game.util.Language.getDynamicText(37,arrName));
			return;
		}
		//打开赠送UI
		let parentView = target.getView() as BagView;
		let width = CONFIG.contentWidth;
		let height = CONFIG.contentHeight;
		target._sendView = new SendView(sendId);
		target._sendView.setParent(parentView);
		target._sendView.anchorOffsetX = target._sendView.width/2;
		target._sendView.anchorOffsetY = target._sendView.height/2;
		target._sendView.x = width/2;
		target._sendView.y = height/2;
		if (parentView) {
			parentView.addChild(target._sendView);
		}
	}
	//调整炮台倍率服务器返回
    private changeGunBack(msg:ChangeGunBackMessage):void {
        let type = msg.getType();
		let state = msg.getState();
		if (state != 1) {//1 成功 2 类型不对 3 过期
			return;
		}
		let userModel:UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
        if(type != ChangeGunState.CHANGE_SKIN)
		{
			if(type == ChangeGunState.UNLOAD_ZUO)
			{
				userModel.setCurGunBgId(0);
				(this.getView() as BagView).setListData(userModel.getItemList());
			}
			return;
		}
		let skinId = msg.getSkinId();
		let vo = game.table.T_Item_Table.getVoByKey(skinId);
		if (vo.type == BagItemType.BATTERY) {	
			userModel.setCurSkinId(skinId);
		} else if(vo.type == BagItemType.BARBETTE) {
			userModel.setCurGunBgId(skinId);
		}
		(this.getView() as BagView).setListData(userModel.getItemList());
    }
	public findUserBack(msg:FindUserBackMessage):void
	{
		//查无此人,userName放"";1:有这人，这时候userName是玩家name;
		if (msg.getState() != 0) {
			if (this._sendView) {
				let userName = msg.getReceiveUserName();
				this._sendView.sendGiveMes(userName);
			}
		} else {
			game.util.GameUtil.popTips(game.util.Language.getText(49));
		}
	}
	public giveItemBack(msg:GiveItemBackMessage):void
	{
		//0;赠送方物品不足；1:赠送成功；2:接收方背包满了；3:赠送方赠送次数满了；4:接收方接收次数满了
		let state = msg.getState();
		if (state == SendItemState.SUC) {
			if (this._curGiveID != -1) {
				//扣东西 
				let item = new game.model.Item(this._curGiveID,this._curGiveNum);
				let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
				userModel.updateItem(item.getItemId(), userModel.getItemById(item.getItemId()).getCount() - item.getCount());
				(this.getView() as BagView).initView(userModel.getItemList());
				//tips
				game.util.GameUtil.popTips(game.util.Language.getText(50));
			} else {
				//tips
				game.util.GameUtil.popTips(game.util.Language.getText(51));
			}
		} else {
			if (state == SendItemState.ITEM_NO_ENOUGH) {
				//tips
				game.util.GameUtil.popTips(game.util.Language.getText(52));
			} else if(state == SendItemState.USER_BAG_MAX) {
				//tips
				game.util.GameUtil.popTips(game.util.Language.getText(53));
			} else if(state == SendItemState.SEND_TIMES_MAX) {
				//tips
				game.util.GameUtil.popTips(game.util.Language.getText(54));
			} else if(state == SendItemState.USER_TIMES_MAX) {
				//tips
				game.util.GameUtil.popTips(game.util.Language.getText(55));
			} else if(state == SendItemState.CHARGE_NO_ENOUGH) {//128
				game.util.GameUtil.popTips(game.util.Language.getText(128));
			}
		}
	}

	/**
	 * 跟进道具类型获取类型名称
	 */
	private getTypeNameByType(t:number):string {
		switch (t) {
			case BagItemType.BASE:
				return "";
			case BagItemType.BATTERY:
				return game.util.Language.getText(16);
			case BagItemType.HAMMER:
				return game.util.Language.getText(17);
			case BagItemType.PROP_CARD:
				return game.util.Language.getText(18);
			case BagItemType.FISH_TICKET:
				return game.util.Language.getText(19);
			case BagItemType.WARHEAN:
				return game.util.Language.getText(20);
			case BagItemType.TEAM_PROP:
				return game.util.Language.getText(21);
			case BagItemType.FORGE_PROP:
				return game.util.Language.getText(22);
			case BagItemType.BARBETTE:
				return game.util.Language.getText(23);
			default: return "";
		}
	}

	public destroy():void {
		this.getView().destroy();
		this.unsubscribByType(NotifyEnum.CLICK_BAG_ITEM);
		this.unsubscribByType(NotifyEnum.SEND_ITEM_TO_USER);
		this.unsubscribByType(NotifyEnum.USE_ITEM_BY_BAG);
		this.unsubscribByType(NotifyEnum.GIVE_ITEM_DATA);
		
		game.net.MessageDispatcher.unregister(game.net.ResponseType.GIVEITEMBACK);
		game.net.MessageDispatcher.unregister(game.net.ResponseType.FINDUSERBACK);
		game.net.MessageDispatcher.unregister(game.net.ResponseType.CHANGEGUNBACK);
	}
}