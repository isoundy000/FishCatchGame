/**
 * 公告界面中介者
 */
class NoticeMeditor extends burn.mediator.SimpleMediator {

	private _currId:number = 0;

	private _data:Array<any>;

	public constructor(view:burn.view.ViewBase) {
		super(view);
	}

	public onAdded():void {
		super.onAdded();
		
	}

	public init():void {
		game.util.UIUtil.startLoading();
		this.subscrib(NotifyEnum.CLICK_NOTICE_ITEM, this.clickNoticeItem);
		let self = this;
		(this.getView() as NoticeView).initView(function(){
			let respHandler = function(evt:egret.Event):void {
				switch (evt.type) {
					case egret.Event.COMPLETE:
						let request:egret.HttpRequest = evt.currentTarget;
						self.setNoticeData(request.response);
						break;
					case egret.IOErrorEvent.IO_ERROR:
						console.log("respHandler io error");
						break;
				}
				game.util.UIUtil.closeLoading();
			}
			//加载公告内容
			let request:egret.HttpRequest = new egret.HttpRequest();
			request.once(egret.Event.COMPLETE, respHandler, null);
			request.once(egret.IOErrorEvent.IO_ERROR, respHandler, null);
			request.open(CONFIG.LOGIN_ADDR + "gameNotices.action?platformId=" + CONFIG.PLATFORM_ID, egret.HttpMethod.GET); 
			request.send();
		});
	}

	private setNoticeData(str:string):void {
		this._data = JSON.parse(str);
		function compareFun(item1:any, item2:any) {
			if (item1.orders > item2.orders) {
				return 1; // 如果是降序排序，返回-1。
			} else if (item1.orders === item2.orders) {
				return 0;
			} else {
				return -1; // 如果是降序排序，返回1。
			}
		}

		this._data.sort(compareFun);

		(this.getView() as NoticeView).setNoticeData(this._data);
	}

	private clickNoticeItem(obj:any, target:any):void {
		let view = (target.getView() as NoticeView);
		let id = Number(obj);
		for (let i = 0; i < target._data.length; i++) {
			let notice = target._data[i];
			if (id == notice.orders) {
				view.clickItem(id, notice.title, notice.content);
				break;
			}
		}
	}

	public destroy():void {
		this._data = null;
		this.unsubscribByType(NotifyEnum.CLICK_NOTICE_ITEM);
		this.getView().destroy();
	}
}