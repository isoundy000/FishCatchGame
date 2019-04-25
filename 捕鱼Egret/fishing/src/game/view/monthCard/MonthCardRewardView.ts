class MonthCardRewardView extends burn.view.PopView {

	private _rewardUI: MonthCardReward;
	//按钮封装对象集合
	private _btnWrapList: Array<burn.tools.UIWrap>;

	private _bPop: boolean = false;
	private _bShow:boolean;
	private _nCurID: number;

	public constructor(bShow:boolean = false) {
		super();
		this._bShow = bShow;
		game.util.UIUtil.startLoading();
	}

	public initView(): void {
		let self = this;
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/monthCard/MonthRewardUI.exml", function (clazz: any, url: string) {
			self.loadComplete(clazz, url);
		}, this);
		this._btnWrapList = new Array();
	}

	private loadComplete(clazz: any, url: string): void {
		game.util.UIUtil.closeLoading();
		this.removeChildren();
		let uiLayer: eui.UILayer = new eui.UILayer();
		this.addChild(uiLayer);
		//添加操作UI
		let uiObj = new MonthCardReward();
		this._rewardUI = uiObj;
		this._rewardUI.skinName = clazz;
		this._rewardUI.horizontalCenter = 0;
		this._rewardUI.verticalCenter = 0;
		this._rewardUI.scroll.viewport = this._rewardUI.scrolGroup;
		uiLayer.addChild(this._rewardUI);
		if (!this._bPop) {
			game.util.UIUtil.popView(this._rewardUI.root);
			this._bPop = true;
		}

		var list: Array<game.model.Item> = [];
		let vo = game.table.T_Charge_Table.getVoByKey(30);
		var rewardStr: Array<any> = vo.award.split(",");
		var len: number = rewardStr.length;
		for (let i = 0; i < len; i++) {
			var item: game.model.Item = new game.model.Item(rewardStr[i].split("_")[0], rewardStr[i].split("_")[1]);
			list.push(item);
		}

		//添加关闭按钮事件
		this._rewardUI.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseEvent, this);
		//封装按钮状态功能
		this._btnWrapList.push(new burn.tools.UIWrap(this._rewardUI.okBtn));
		this.setListData(list);
	}
	public setListData(newList: Array<game.model.Item>): void {
		let list = new Array<game.model.Item>();
		let len = newList.length;
		for (let i = 0; i < len; i++) {
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

		//初始化列表
		let item = null;
		for (let i = 0; i < list.length; i++) {
			item = new MonthCardRewardItem(list[i].getItemId(), list[i].getCount());
			item.name = list[i].getItemId() + "";
			item.scaleX = item.scaleY = 0.95;
			item.init();
			this._rewardUI.scrolGroup.addChild(item);
		}
	}

	private onCloseEvent() {
		burn.Director.popView();
		if (this._bShow) {
			this.send(NotifyEnum.CHECK_POP);
		}
	}

	/** 消毁UI */
	public destroy(): void {
		let self = this;
		this._bPop = false;
		//关闭UI动画
		game.util.UIUtil.closeView(this._rewardUI.root, function (): void {
			//移除按钮封装
			while (self._btnWrapList.length > 0) {
				let wrap = self._btnWrapList.pop();
				wrap.destroy();
			}
			self._rewardUI.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onCloseEvent, self);
			self.parent.removeChild(self);
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/monthCard/MonthRewardUI.exml");
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml");
		});
	}

}

/***操作UI的对应类 */
class MonthCardReward extends eui.Component {
	public constructor() { super(); }
	public scroll: eui.Scroller;
	public scrolGroup: eui.Group;
	public okBtn: eui.Group;
	public root: eui.Group;
}