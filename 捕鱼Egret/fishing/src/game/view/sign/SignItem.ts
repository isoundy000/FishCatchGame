class SignItemCom extends eui.Component{
    /** 当前 */
    public cur:eui.Group;
    public tianGroup1:eui.Group;
    /** 普通 */
    public normal:eui.Group;
    public tianGroup:eui.Group;
    /** 过去 */
    public last:eui.Group;
    /** icon */
    public iconGroup:eui.Group;
    /** num */
    public numLab:eui.Label;
    public vipDesc:eui.Label;
    public vipGroup:eui.Group;
	public constructor() {
		super();
		this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/sign/SignItem.exml";
	}
    public setData(times:number,data:game.table.T_MonthSign):void {
        //{id:401,month:4,date:1,vipMin:0,score:1,award:"10001_1",},
        times += 1;
        let self = this;
        if (data.date == times) {
            //当前
            this.last.visible = false;
            this.normal.visible = false;
            RES.getResAsync("cardYellow_fnt", ()=>{
                RES.getResAsync("cardYellow_png", ()=>{
                    let dayFont = new egret.BitmapText();
                    dayFont.font = RES.getRes("cardYellow_fnt");
                    dayFont.text = String(data.date);
                    dayFont.anchorOffsetX = dayFont.width;
                    dayFont.anchorOffsetY = dayFont.height/2;
                    this.tianGroup1.addChild(dayFont);
                }, this);
            }, this);
        } else {
            if (data.date < times) {
                //过去
                this.last.visible = true;
            } else {
                //未来
                this.last.visible = false;
            }
            RES.getResAsync("cardBlue_fnt", ()=>{
                RES.getResAsync("cardBlue_png", ()=>{
                    let dayFont = new egret.BitmapText();
                    dayFont.font = RES.getRes("cardBlue_fnt");
                    dayFont.text = String(data.date);
                    dayFont.anchorOffsetX = dayFont.width;
                    dayFont.anchorOffsetY = dayFont.height/2;
                    this.tianGroup.addChild(dayFont);
                }, this);
            }, this);
        }
        let awardStr = data.award;
        let awardData = awardStr.split("_");
        let awardId = Number(awardData[0]);
        let awardCount = awardData[1];
        game.util.IconUtil.getIconByIdAsync(IconType.PROP, awardId, function(icon:egret.Bitmap):void {
            if (!icon) {
                return;
            }
            icon.anchorOffsetX = icon.width/2;
            icon.anchorOffsetY = icon.height/2;
            self.iconGroup.addChild(icon);
        });
        this.numLab.text = awardCount;

        if (data.vipMin > 0) {
            let arrName = new Array<string>();
            arrName.push(data.vipMin + "");
            let txt = this.vipDesc.text;
            this.vipDesc.text = game.util.Language.getDynamicTextByStr(txt,arrName);
        } else {
            this.vipGroup.visible = false;
        }
    }
}