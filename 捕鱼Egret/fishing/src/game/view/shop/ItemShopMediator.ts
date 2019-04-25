/**
 * 道具商城中介者
 */
class ItemShopMediator extends burn.mediator.SimpleMediator {
	public constructor(view:burn.view.ViewBase) {
		super(view, "ItemShopMediator");
	}

	public onAdded() {
		super.onAdded();
		(this.getView() as ItemShopView).initView();
	}

	public init():void {
		this.subscrib(NotifyEnum.SHOP_BUY_ITEM, this.buyItem);
		//监听服务器消息返回
		game.net.MessageDispatcher.register(game.net.ResponseType.SHOPBUYBACK, (msg:ShopBuyBackMessage)=>{
			this.shopBuyBack(msg);
		});
	}

	//购买物品
	private buyItem(obj:any, target:any):void {
		let msg:ShopBuyMessage = new ShopBuyMessage();
		msg.initData();
		msg.setShopId(Number(obj.itemId));
		NetManager.send(msg);
	}

	//购买物品返回
	private shopBuyBack(msg:ShopBuyBackMessage):void {
		let state = msg.getState();
		switch (state) {
			case 0:
				game.util.GameUtil.openConfirmByTwoButton(null, ()=>{
					let chargeView:ChargeView = new ChargeView(ChargeType.Ticket);
					let chargeMed:ChargeMediator = new ChargeMediator(chargeView);
					burn.Director.pushView(chargeMed);
				}, this, game.util.Language.getText(204));
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
		burn._Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
	}

	public destroy():void {

		this.unsubscribByType(NotifyEnum.SHOP_BUY_ITEM);

		game.net.MessageDispatcher.unregister(game.net.ResponseType.SHOPBUYBACK);

		this.getView().destroy();
	}
}