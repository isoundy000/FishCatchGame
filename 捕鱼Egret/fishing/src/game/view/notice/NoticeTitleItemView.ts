 class NoticeTitleItemView extends eui.Component {
	
	public titleItem:eui.Group;
	public unSelected:eui.Group;
	public selected:eui.Group;
	public alert:eui.Image;
	public titleTxt:eui.Label;

	private _id:number;
	private _str:string;
	private _select:boolean;

	public constructor(id:number, str:string, selected:boolean = false) {
		super();
		this._id = id;
		this._str = str;
		this._select = selected;
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/notice/NoticeItemBtnUI.exml", this.initData, this);
	}

	//初始化数据
	public initData(clazz:any, url:string):void {
		this.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/notice/NoticeItemBtnUI.exml";
		this.titleTxt.text = this._str;
		this.selected.visible = this._select;
		this.unSelected.visible = !this._select;
		this.alert.visible = !this._select;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
	}

	public setSelected(s:boolean):void {
		this.selected.visible = s;
		this.unSelected.visible = !s;
		if (this.alert.visible && s) {
			this.alert.visible = false;
		}
	}

	private onButtonClick(e:egret.TouchEvent):void {
		burn._Notification_.send(NotifyEnum.CLICK_NOTICE_ITEM, this._id);
	}

	public getId():number {
		return this._id;
	}

}
