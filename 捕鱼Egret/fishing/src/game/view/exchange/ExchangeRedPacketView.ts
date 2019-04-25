class ExchangeRedPacketView extends burn.view.PopView {

    private _uiDisplay: ExchangesRedPacketUI;

    //按钮封装对象集合
    private _btnWrapList: Array<burn.tools.UIWrap>;

    private _nId:number;

    public constructor(nid) {
        super();
        this._nId = nid;
        this._btnWrapList = new Array();
    }

    private addBgResource(clazz: any, url: string): void {

        let uiLayer: eui.UILayer = new eui.UILayer();
        this.addChild(uiLayer);
        let uiObj = new ExchangesRedPacketUI();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = clazz;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);

        //按钮动画
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.okBtn));
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.closeBtn));

        //打开UI动画
        game.util.UIUtil.popView(this._uiDisplay.root);
        //关闭当前界面
        let closeBtn = this._uiDisplay.closeBtn;
        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._uiDisplay.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExchange, this);

        this._uiDisplay.edit_QQ.alpha = 0.4;
        this._uiDisplay.edit_WeChat.alpha = 0.4;
        this._uiDisplay.edit_ALi.alpha = 0.4;
        this._uiDisplay.edit_Phone.alpha = 0.4;
        
        this._uiDisplay.edit_QQ.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
        this._uiDisplay.edit_WeChat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
        this._uiDisplay.edit_ALi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
        this._uiDisplay.edit_Phone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);

    }

    private onExchange(e: egret.TouchEvent) {

        //qq 微信 支付宝 手机 全部必填 输入框
        let qqTxt: eui.EditableText = this._uiDisplay.edit_QQ;
        let wechetTxt: eui.EditableText = this._uiDisplay.edit_WeChat;
        let aliTxt: eui.EditableText = this._uiDisplay.edit_ALi;
        let phoneTxt: eui.EditableText = this._uiDisplay.edit_Phone;

        //校验
        let judgeWeChet = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/;
        let judgeQQ = /^\d{5,10}$/;
        let judgeALiPhone = /^1\d{10}$/;
        let judgeALiEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

        if (qqTxt.text == "" || wechetTxt.text == "" || aliTxt.text == "") {
            game.util.GameUtil.popTips(game.util.Language.getText(172));
            return;
        }
        if (!judgeWeChet.test(wechetTxt.text)) {
            game.util.GameUtil.popTips(game.util.Language.getText(2455));
            return;
        }
        if (!judgeQQ.test(qqTxt.text)) {
            game.util.GameUtil.popTips(game.util.Language.getText(2455));
            return;
        }
        if (!judgeALiPhone.test(aliTxt.text) && !judgeALiEmail.test(aliTxt.text)) {
            game.util.GameUtil.popTips(game.util.Language.getText(2455));
            return;
        }
        if (!judgeALiPhone.test(phoneTxt.text)) {
            game.util.GameUtil.popTips(game.util.Language.getText(2455));
            return;
        }

        //提交
        let exchangeModel:ExchangeModel = burn.Director.getModelByKey(ExchangeModel) as ExchangeModel;
		let item = exchangeModel.getListById(this._nId);

		if(item._type == 4){
			let self = this;
			let strTips =  "您确认兑换吗?";
			game.util.GameUtil.openConfirmByTwoButton(null,function(){
				let req:ExchangeSendMessage = new ExchangeSendMessage();
				req.initData();
				req.setGoodsId(self._nId);
                req.setReceiverZFB(aliTxt.text);
                req.setReceiverQQ(qqTxt.text);
                req.setReceiverWX(wechetTxt.text);
                req.setReceiverPhone(phoneTxt.text);
				NetManager.send(req);
				self.onClosttButtonClick(null);
			},this,strTips);
		}


    }

    public onChange(e: egret.Event) {
        e.target.text = "";
        e.target.alpha = 1;
    }

    private onClosttButtonClick(e: egret.TouchEvent) {
        burn.Director.popView();
    }

    public initView(): void {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/ExchangeRedPacket.exml", this.addBgResource, this);
    }

    public destroy(): void {
        let self = this;
        game.util.UIUtil.closeView(this._uiDisplay.root, function (): void {
            //移除按钮封装
            while (self._btnWrapList.length > 0) {
                let wrap = self._btnWrapList.pop();
                wrap.destroy();
            }
            self._uiDisplay.edit_QQ.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onChange, self);
            self._uiDisplay.edit_WeChat.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onChange, self);
            self._uiDisplay.edit_ALi.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onChange, self);
            self._uiDisplay.edit_Phone.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onChange, self);
            
            self._uiDisplay.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onExchange, self);
            self._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClosttButtonClick, self);
            self.parent && self.parent.removeChild(self);
        });
    }
}

/***操作UI的对应类 */
class ExchangesRedPacketUI extends eui.Component {
    public constructor() { super(); }
    public root: eui.Group;
    public closeBtn: eui.Button;
    public okBtn: eui.Group;
    public edit_QQ: eui.EditableText;
    public edit_WeChat: eui.EditableText;
    public edit_ALi: eui.EditableText;
    public edit_Phone: eui.EditableText;
    
}