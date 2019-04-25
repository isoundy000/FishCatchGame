//WarUI
class WarView extends eui.Component 
{
    public goldBulletGroup:eui.Group;
    public silverBulletGroup:eui.Group;
    public bronzeBulletGroup:eui.Group;
    public nuclearBulletGroup:eui.Group;

	public closeWarGroupBtn:eui.Button;
	public constructor() {
		super();
		this.skinName = CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/component/WarGroup.exml";
	}

	/** 销毁函数 */
	public destroy():void {
		
	}
}