//在线人数
class AlivePersonItem extends eui.Component 
{
    public personLab:egret.BitmapText;
	public constructor() {
		super();
		this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/alivePerson/AlivePerson.exml";
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height/2;
        this.personLab.textAlign = egret.HorizontalAlign.CENTER;
	}
    public setPersonNumById(nId:number):void {
        let num = 600;
        this.x = 210;
        this.y = 520;
        let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
        switch(nId) {
            case 1:
                if(CONFIG.IS_WEB){
                    this.x = 0;
                    this.y = -45;
                }else{
                    this.x = 190;
                    this.y = 520;
                }
                num = userModel.getRoomOnLineByID(nId - 1);
            break;
            case 2:
                if(CONFIG.IS_WEB){
                    this.x = 0;
                    this.y = -30;
                }else{
                    this.x = 205;
                    this.y = 530;
                }
                num = userModel.getRoomOnLineByID(nId - 1);
            break;
            case 3:
                if(CONFIG.IS_WEB){
                    this.x = 0;
                    this.y = -90;
                }else{
                    this.x = 220;
                    this.y = 490;
                }
                num = userModel.getRoomOnLineByID(nId - 1);
            break;
        }
        this.personLab.text = num + "";
    }

	/** 销毁函数 */
	public destroy():void {
	}
}