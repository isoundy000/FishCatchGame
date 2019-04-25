class ShareItem extends eui.Component{
    public desc:eui.Label;
    public iconGroup:eui.Group;
	public constructor() {
		super();
		this.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/share/shareGainItem.exml";
	}
	public init(shareData:game.table.T_Share):void {
		let self = this;
        this.desc.text = game.util.Language.getText(Number(shareData.dec));
        let txtr = "shareType_" + shareData.type + "_png";
        RES.getResAsync(txtr, function():void {
            let txture:egret.Texture = RES.getRes(txtr);
            let img:egret.Bitmap = new egret.Bitmap(txture);
            img.anchorOffsetX = img.width/2;
            img.anchorOffsetY = img.height/2;
            this.iconGroup.addChild(img);
        }, this);
	}
}