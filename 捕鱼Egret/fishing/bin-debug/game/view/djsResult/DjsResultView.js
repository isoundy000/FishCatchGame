var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DjsResultView = (function (_super) {
    __extends(DjsResultView, _super);
    function DjsResultView(msg, roomType) {
        var _this = _super.call(this) || this;
        _this._btnWrapList = new Array();
        _this._msg = msg;
        _this._roomType = roomType;
        return _this;
    }
    DjsResultView.prototype.addBgResource = function (clazz, url) {
        var uiLayer = new eui.UILayer();
        this.addChild(uiLayer);
        var uiObj = new DjsResultCom();
        this._uiDisplay = uiObj;
        this._uiDisplay.skinName = clazz;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        uiLayer.addChild(this._uiDisplay);
        //关闭当前界面
        var closeBtn = this._uiDisplay.btnClose;
        closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._uiDisplay.okGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSignUp, this);
        if (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET || CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
            // this._uiDisplay.shareGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
            this.onShare();
        }
        else {
        }
        //封装按钮
        this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.btnClose));
        // this._btnWrapList.push(new burn.tools.UIWrap(this._uiDisplay.shareGroup));
        var userModel = burn.Director.getModelByKey(UserModel);
        var roomModel = burn.Director.getModelByKey(RoomModel);
        var roomer = roomModel.getRoomerById(userModel.getUserId());
        roomer.getDjsObj().grandPrixSignUp = 0;
        roomer.getDjsObj().todayGrandPrixTimes++;
        this.setUI(this._msg);
        //结算前分数
        var score = this._msg.getBeforeIntegral();
        this._uiDisplay.djsResTip.visible = false;
        this._uiDisplay.djsDesTip.visible = false;
        this._uiDisplay.qmsResTip.visible = false;
        this._uiDisplay.qmsDesTip.visible = false;
        if (this._roomType == RequesetRoomState.DjsRoom) {
            this._uiDisplay.djsTitle.visible = true;
            this._uiDisplay.kssTitle.visible = false;
            this._uiDisplay.costLab.text = "100";
            if (score > 2400) {
                this._uiDisplay.djsResTip.visible = true;
                userModel.setMoney(Number(Number(userModel.getMoney()) + 100));
                this._uiDisplay.djsDesTip.visible = false;
                this._uiDisplay.qmsResTip.visible = false;
                this._uiDisplay.qmsDesTip.visible = false;
            }
            else {
                this._uiDisplay.djsResTip.visible = false;
                this._uiDisplay.djsDesTip.visible = true;
                this._uiDisplay.qmsResTip.visible = false;
                this._uiDisplay.qmsDesTip.visible = false;
            }
        }
        else if (this._roomType == RequesetRoomState.QmsRoom) {
            this._uiDisplay.djsTitle.visible = false;
            this._uiDisplay.kssTitle.visible = true;
            this._uiDisplay.gunTitleImg.visible = false;
            this._uiDisplay.VIPTitleImg.visible = false;
            this._uiDisplay.gunImg.visible = false;
            this._uiDisplay.vipImg.visible = false;
            this._uiDisplay.gunLab.visible = false;
            this._uiDisplay.vipLab.visible = false;
            this._uiDisplay.costLab.text = "20";
            if (score > 1600) {
                this._uiDisplay.djsResTip.visible = false;
                this._uiDisplay.djsDesTip.visible = false;
                this._uiDisplay.qmsResTip.visible = true;
                this._uiDisplay.qmsDesTip.visible = false;
            }
            else {
                this._uiDisplay.djsResTip.visible = false;
                this._uiDisplay.djsDesTip.visible = false;
                this._uiDisplay.qmsResTip.visible = false;
                this._uiDisplay.qmsDesTip.visible = true;
            }
        }
        //roomer.getDjsObj()
        var arrName = new Array();
        arrName.push((roomer.getDjsObj().todayGrandPrixTimes) + "");
        var str = game.util.Language.getDynamicTextByStr(this._uiDisplay.okLab.text, arrName);
        this._uiDisplay.okLab.text = str;
    };
    DjsResultView.prototype.setUI = function (msg) {
        /**
         *  required uint32 beforeIntegral = 1;//结算前
            required uint32 gunPlus = 2;	//炮倍加成
            required uint32 vipPlus = 3;	//vip加成
            required uint32 timesPlus = 4;	//参加次数加成
            required uint32 afterIntegral = 5;//结算后
            optional ItemInfo item = 6;
         */
        this._uiDisplay.fishScoreLab.text = msg.getBeforeIntegral();
        this._uiDisplay.myScoreBitLab.text = msg.getAfterIntegral();
        this._score = msg.getAfterIntegral() + "";
        this._uiDisplay.gunLab.text = msg.getGunPlus() + "%";
        this._uiDisplay.vipLab.text = msg.getVipPlus() + "%";
        this._uiDisplay.challengLab.text = msg.getTimesPlus() + "%";
        //排名
        if (msg.getCurRank()) {
            var rank = Number(msg.getCurRank());
            if (rank == 0) {
                this._uiDisplay.rankBitLab.text = "未上榜";
            }
            else {
                this._uiDisplay.rankBitLab.text = rank + "";
            }
        }
        var rankNum = Number(msg.getCurRank());
        if (rankNum <= 0) {
            return;
        }
        var gainTable = game.table.T_GrandPrixRankRange_Table.getAllVo();
        var award = "";
        for (var i = 0; i < gainTable.length; i++) {
            if (gainTable[i].rangeMin == rankNum) {
                award = gainTable[i].award;
                break;
            }
        }
        if (award == "") {
            this._uiDisplay.gainLab.text = "";
            return;
        }
        var str = award.split("_");
        var id = Number(str[0]);
        var num = Number(str[1]);
        var vo = game.table.T_Item_Table.getVoByKey(Number(id));
        this._uiDisplay.gainLab.text = game.util.Language.getText(vo.name) + num + "个";
        var self = this;
        game.util.IconUtil.getIconByIdAsync(IconType.PROP, Number(id), function (icon) {
            if (!icon) {
                return;
            }
            icon.anchorOffsetX = icon.width / 2;
            icon.anchorOffsetY = icon.height / 2;
            self._uiDisplay.iconGroup.addChild(icon);
        });
        //奖励
        if (!msg.getItem()) {
            this._uiDisplay.gainGroup.visible = false;
            return;
        }
    };
    DjsResultView.prototype.onSignUp = function (e) {
        burn.Director.popView();
        this.send(NotifyEnum.SIGN_UP_DJS);
        this.send(NotifyEnum.CLOSE_SIGN_VIEW);
    };
    DjsResultView.prototype.onShare = function () {
        //分享大奖赛奖励
        var yaoQingView = new ShareZiYou(ShareType.Share_Djs, this._score);
        this.addChild(yaoQingView);
    };
    /**关闭游戏 */
    DjsResultView.prototype.onClosttButtonClick = function (e) {
        this.send(NotifyEnum.CLOSE_SIGN_VIEW);
        burn.Director.popView();
    };
    DjsResultView.prototype.initView = function () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/DjsResult/DjsResultUI.exml", this.addBgResource, this);
    };
    DjsResultView.prototype.destroy = function () {
        //移除按钮封装
        while (this._btnWrapList.length > 0) {
            var wrap = this._btnWrapList.pop();
            wrap.destroy();
        }
        this._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._uiDisplay.okGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSignUp, this);
        // this._uiDisplay.shareGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
        this.parent && this.parent.removeChild(this);
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/DjsResult/DjsResultUI.exml");
    };
    return DjsResultView;
}(burn.view.PopView));
__reflect(DjsResultView.prototype, "DjsResultView");
/***操作UI的对应类 */
var DjsResultCom = (function (_super) {
    __extends(DjsResultCom, _super);
    function DjsResultCom() {
        return _super.call(this) || this;
    }
    return DjsResultCom;
}(eui.Component));
__reflect(DjsResultCom.prototype, "DjsResultCom");
//# sourceMappingURL=DjsResultView.js.map