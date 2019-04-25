// TypeScript file
class ForgeMediator extends burn.mediator.SimpleMediator {
	private isUseEns:boolean;
	public constructor(view:burn.view.ViewBase) {
		super(view);
	}

	public onAdded():void {
		super.onAdded();
		(this.getView() as ForgeView).initView();
	}

	public init():void {
		//注册观察者
		this.subscrib(NotifyEnum.CHECK_FORGEUI_LOADED, this.loaded);
        //注册开炮观察者
        this.subscrib(NotifyEnum.SET_USEENSENCE_FLAG, this.setUseEnsenceFlag);
		this.isUseEns = false;
        //解锁泡杯返回监听消息
        game.net.MessageDispatcher.register(game.net.ResponseType.UPGRADEORFORGEBACK, (msg:UpgradeOrForgeBackMessage)=>{
            this.ForgeBack(msg);
        });
	}

	public loaded(obj:any, target:any):void {
		target.checkForgeData();
	}
	//设置检测
    private setUseEnsenceFlag(obj:any, target:any):void {
		if (target.isUseEns == true) {
			target.isUseEns = false;
			target.checkForgeData();
			return;
		}
		let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
        //最高ID
        let gunRate = userModle.getCurGunID();
        let gunRateVo = game.table.T_Gun_Table.getVoByKey(gunRate);
        //判断有没有下一个炮倍
        if (gunRateVo) {
			let arrEnsence = gunRateVo.forgeSuccessAlsoCost;
			let arrEnsData = arrEnsence.split("_");
			let ensId = parseInt(arrEnsData[0]);
			let ensNum = parseInt(arrEnsData[1]);
			let item:game.model.Item = new game.model.Item(ensId,0);
			if (!userModle.isExist(item)) {
				target.isUseEns = false;
				target.checkForgeData();
				game.util.GameUtil.popTips(game.util.Language.getText(86));
				return;
			}
			let bagNum = userModle.getItemById(ensId).getCount();
			if (bagNum < ensNum) {
				target.isUseEns = false;
				target.checkForgeData();
				game.util.GameUtil.popTips(game.util.Language.getText(86));
				return;
			}
			//存在且数量满足
			target.isUseEns = true;
			target.checkForgeData();
        }
	}
	//无需水晶精华锻造
	private checkForgeData():void {
		let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
        //最高ID
        let gunRate = userModle.getCurGunID();
        let gunRateVo = game.table.T_Gun_Table.getVoByKey(gunRate);
        //判断有没有下一个炮倍
        if (gunRateVo) {
			let arr = gunRateVo.upgradeOrForgeCost;
			let arrData = arr.split(",");
			let bEnough = true;
			let nEnoughNum = 0;
			let nCurNum = 0;
			for (let i = 0; i < arrData.length; i++) {
				let item = arrData[i];
				let arrStr = item.split("_");
				let id = parseInt(arrStr[0]);
				let num = parseInt(arrStr[1]);
				let itemLast = userModle.getItemById(id);
				
				let itemObj = new game.model.Item(id, num);
				if (!userModle.isExist(itemObj)) {
					bEnough = false;
					break;
				}
				if (userModle.getItemById(id).getCount() < num) {
					bEnough = false;
					break;
				}
			}
			if (bEnough) {
				//如果是精华锻造,扣除精华
				if (this.isUseEns) {
					let arrEnsence = gunRateVo.forgeSuccessAlsoCost;
					let arrEnsData = arrEnsence.split("_");
					let ensId = parseInt(arrEnsData[0]);
					let ensNum = parseInt(arrEnsData[1]);
					let itemEnsLast = userModle.getItemById(ensId);
					if (!userModle.isExist(itemEnsLast)) {
						bEnough = false;
					}
					if (userModle.getItemById(ensId).getCount() < ensNum) {
						bEnough = false;
					}
				}
			}
            let view = this.getView() as ForgeView;
			view.setUIData(gunRate,this.isUseEns,bEnough);
        }
	}
	
    //解锁炮倍返回的逻辑
    private ForgeBack(msg:UpgradeOrForgeBackMessage):void {
		let view = this.getView() as ForgeView;
        let state = msg.getState();
        if (state == UpdateOrForgeType.TYPE_SUC) {
            let type = msg.getType();
            if (type == GunUpdateType.UNLOCK) {
                return;
            }
            let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
            let gunId = msg.getAfterGunId();
			userModle.setCurGunID(gunId);
            //需要自己扣一下材料
            let gunLastVo = game.table.T_Gun_Table.getVoByKey(gunId - 1);
			if (gunLastVo) {
				let arr = gunLastVo.upgradeOrForgeCost;
				let arrData = arr.split(",");
				let bEnough = true;
				let nEnoughNum = 0;
				let nCurNum = 0;
				for (let i = 0; i < arrData.length; i++) {
					let item = arrData[i];
					let arrStr = item.split("_");
					let id = parseInt(arrStr[0]);
					let num = parseInt(arrStr[1]);
					let itemLast = userModle.getItemById(id);
					userModle.updateItem(id, itemLast.getCount() - num);
				}
				//如果是精华锻造,扣除精华
				if (type == GunUpdateType.USE_ESSENCE_FORGE_TYPE) {
					let arrEnsence = gunLastVo.forgeSuccessAlsoCost;
					let arrEnsData = arrEnsence.split("_");
					let ensId = parseInt(arrEnsData[0]);
					let ensNum = parseInt(arrEnsData[1]);
					let itemEnsLast = userModle.getItemById(ensId);
					userModle.updateItem(ensId, itemEnsLast.getCount() - ensNum);
				}
			}
			this.checkForgeData();
        } else {
			let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
            let gunOldId = userModle.getCurGunID();
			//userModle.setCurGunID(gunId);
            //需要自己扣一下材料
            let gunLastVo = game.table.T_Gun_Table.getVoByKey(gunOldId);
			if (gunLastVo) {
				let arr = gunLastVo.upgradeOrForgeCost;
				let arrData = arr.split(",");
				let bEnough = true;
				let nEnoughNum = 0;
				let nCurNum = 0;
				for (let i = 0; i < arrData.length; i++) {
					let item = arrData[i];
					let arrStr = item.split("_");
					let id = parseInt(arrStr[0]);
					let num = parseInt(arrStr[1]);
					let itemLast = userModle.getItemById(id);
					userModle.updateItem(id, itemLast.getCount() - num);
				}
			}
			let items = msg.getItemProto();
            //随机返还的水晶精华
            for (let i = 0; i < items.length; i++) {
                let itemId = items[i].itemId;
                let count = items[i].count;
				let itemShuijing = new game.model.Item(itemId, count);
				userModle.addItem(itemShuijing);
            }
			this.checkForgeData();
        }
		//成功
		setTimeout(function(){
			view.setEffect(state);
		}, 800);
    }
	public destroy():void {
		this.getView().destroy();
        //移除观察者
        this.unsubscribByType(NotifyEnum.SET_USEENSENCE_FLAG);
		this.unsubscribByType(NotifyEnum.CHECK_FORGEUI_LOADED);
        //移除消息监听
        game.net.MessageDispatcher.unregister(game.net.ResponseType.UPGRADEORFORGEBACK);
	}
}