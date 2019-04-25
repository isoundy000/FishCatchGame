/** 活动类型3 */
class Active3Item extends ComponetBase
{
    public listGroup:eui.Group;//listGroup
    public gainGroup:eui.Group;//领取
    public desc:eui.Label;//描述
    public yilingqu:eui.Image;
    public toGain:eui.Image;

    private _state:number;
    private _id:number;
	public constructor() {
		super();
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/active/Active_3.exml";
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height/2;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/active/Active_3Item.exml",()=>{
            this.setList();
        },this);
	}

    public setList():void {
        let activeModel = burn.Director.getModelByKey(ActiveModel) as ActiveModel;
        let type = Active_Type.LIMIT_TIME_ACTIVE_TYPE_VIP_SEND;
        let itemActive = activeModel.getActiveObjByType(type);
        let dataActive = activeModel.getActiveDataById(itemActive._id);
        
        //活动时间 
        this.desc.text = game.util.Language.getText(186) + game.util.TimeUtil.getActiveTime(itemActive._startTime,itemActive._endTime);

        this.listGroup.removeChildren();
        //limitAcitveAward 10001_10,10002_10
        let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
        let curVip = userModel.getVipLevel();
        let vos = game.table.T_VipLevel_Table.getAllVo();
        let len = vos.length;
        for (let i = 1; i < len; i++) {
            let item = new Active3ItemCom();
            let str = vos[i].limitAcitveAward.split(",");
            let data = str[0].split("_");
            let isCur = false;
            if (curVip == vos[i].vipLevel) {
                isCur = true;
            }
            item.setData(Number(data[0]), Number(data[1]), vos[i].vipLevel, isCur);
            this.listGroup.addChild(item);
        }
        let tLayout:eui.TileLayout = new eui.TileLayout();
        tLayout.paddingTop = 10;
		tLayout.paddingLeft = 20;
		tLayout.paddingRight = 20;
        tLayout.horizontalGap = 23;
		this.listGroup.layout = tLayout;    /// 网格布局
        
        let state = dataActive._state;
        let gainBtn = new burn.tools.UIWrap(this.gainGroup);
        if (state == Active_State.LIMIT_TIME_ACTIVE_STATE_RECEIVED) {
            let colorFlilter = new egret.ColorMatrixFilter(game.util.FilterEnmu.DARK);
            this.gainGroup.filters = [colorFlilter];
            this.yilingqu.visible = true;
            this.toGain.visible = false;
        }
        this._state = state;
        this._id = itemActive._id;
        //vip不够。不发消息
        this.gainGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
            
        }, this);
    }
    private onClick() {
        if (this._state == Active_State.LIMIT_TIME_ACTIVE_STATE_INIT) {//可以领取
            let send:LimitedTimeActiveSendMessage = new LimitedTimeActiveSendMessage();
            send.initData();
            send.setId(this._id);
            send.setState(1);
            NetManager.send(send);
        } else if (this._state == Active_State.LIMIT_TIME_ACTIVE_STATE_RECEIVED) {
            //提示 已经领取过
            game.util.GameUtil.popTips(game.util.Language.getText(182));
        }
    }
    public destory() {
        this.gainGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }
}

class Active3ItemCom extends eui.Component
{
    public itemBg:eui.Group;//添加图标
    public countTxt:eui.Label;//数量
    public unSel:eui.Rect;//遮罩

    public vipBg:eui.Image;//vip背景
    public vipLv:eui.Label;//vip标签
    public constructor() {
		super();
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/active/Active_3Item.exml";
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height/2;
    }
    public setData(id:number, num:number, viplv:number, isCur:boolean)
    {
        let self = this;
        game.util.IconUtil.getIconByIdAsync(IconType.PROP, id, function(icon:egret.Bitmap):void {
            if (!icon) {
                return;
            }
            icon.width = 70;
            icon.height = 70;
            icon.anchorOffsetX = icon.width/2;
            icon.anchorOffsetY = icon.height/2;
            icon.x = self.itemBg.width/2;
            icon.y = self.itemBg.height/2;
            self.itemBg.addChild(icon);
        });
        this.countTxt.text = "x" + num;
        //vip信息
        this.vipLv.text = "VIP" + viplv;
        if(isCur)
        {
            this.unSel.visible = false;
        }
    }
}