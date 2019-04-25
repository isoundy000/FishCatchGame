class RankMediator extends burn.mediator.SimpleMediator {
	public constructor(view:burn.view.ViewBase) {
		super(view, "RankMediator");
	}

	public onAdded() {
		super.onAdded();
		this.subscrib(NotifyEnum.SET_RANK_LIST, this.showList);
        game.net.MessageDispatcher.register(game.net.ResponseType.GETRANKDATABACK, (msg:GetRankDataBackMessage)=>{
            this.getRankData(msg);
        });
		(this.getView() as RankView).initView();
	}

	private getRankData(msg:GetRankDataBackMessage):void {
		let userModel = this.getModel(UserModel) as UserModel;
		let list = msg.getRanklist();
		let len = list.length;
		let type = -1;
		for (let i = 0; i < len; i++) {
			let data = list[i];
			let item = new game.model.RankDataItem(data.rankType,data.rank,data.userId,data.roleLevel,data.vipLevel,data.rankValue,data.name,data.iconUrl);
			userModel.setRankList(item);
			type = item._nRankType;
		}
		let view = this.getView() as RankView;
		let listData = userModel.getRankListByType(type);
		view.changeList(listData);
	}

	private showList(obj:any, target:any):void {
		let type = Number(obj.type);
		let userModel = target.getModel(UserModel) as UserModel;
		let list = userModel.getRankListByType(type);
		if (list.length == 0) {
			let send:GetRankDataMessage = new GetRankDataMessage();
			send.initData();
			send.setRankType(type);
			NetManager.send(send);
			return;
		}
		let view = target.getView() as RankView;
		view.changeList(list);
	}
	public init():void {
		
	}

	public destroy():void {
		this.getView().destroy();
		this.unsubscribByType(NotifyEnum.SET_RANK_LIST);
		game.net.MessageDispatcher.unregister(game.net.ResponseType.GETRANKDATABACK);
	}
}