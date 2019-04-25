class ChangeGunMediator extends burn.mediator.SimpleMediator {
	public constructor(view:burn.view.ViewBase) {
		super(view);
	}

	public onAdded() {
		super.onAdded();
		//注册观察者
		this.subscrib(NotifyEnum.CHANGE_GUN_UI_LOADED, this.loaded);
		(this.getView() as ChangeGunView).initView();
	}

	public loaded(obj:any, target:any):void {
		let view = target.getView() as ChangeGunView;
		let vos = target.getGunVos();
		let model:UserModel = burn.Director.getModelByKey(UserModel) as UserModel;
		let items = model.getItemList();
		let len = vos.length;
		let arr = new Array<game.model.GunItem>();
		for (let i = 0; i < len; i++) {
			let vo = vos[i];
			let state = -1;
			let itemBag = new game.model.Item(vo.id,1);
			if (!model.isExist(itemBag)) {
				state = GunState.UnGain;
			} else {
				if (model.getCurSkinId() == vo.id) {
					state = GunState.Equip;
				} else {
					//TODO 是否失效
					state  = GunState.Act;
				}
			}
			let item = new game.model.GunItem(vos[i],state);
			arr.push(item);
		}
		view.showList(arr);
	}

	public init():void {
		
	}

	public getGunVos():Array<game.table.T_Item> {
		let voArr = new Array<game.table.T_Item>();
		let vos = game.table.T_Item_Table.getAllVo();
		let len = vos.length;
		for (let i = 0; i < len; i++) {
			if (vos[i].type == BagItemType.BATTERY) {
				voArr.push(vos[i]);
			}
		}
		return voArr;
	}
	public update():void {
		this.loaded(null,this);
	}
	public destroy():void {
		this.unsubscribByType(NotifyEnum.CHANGE_GUN_UI_LOADED);
		this.getView().destroy();
	}
}