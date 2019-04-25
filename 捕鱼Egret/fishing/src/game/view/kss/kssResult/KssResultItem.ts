class KssResultItemUI extends eui.Component {
    public rankLab:eui.Label;
    public nameLab:eui.Label;
    public scoreLab:eui.Label;
    public gainLab:eui.Label;
    public sel:eui.Image;
    public coin:eui.Image;
    public war:eui.Image;
	public constructor() {
		super();
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Kss/KssResultItem.exml";
	}
    public setData(msg:any, myId:number):void {
        this.rankLab.text = msg.rank + "";
        this.nameLab.text = msg.name + "";
        this.scoreLab.text = msg.integral + "";
        if (myId == Number(msg.userId)) {
            this.sel.visible = true;
        } else {
            this.sel.visible = false;
        }
        this.gainLab.text = "";
        this.war.visible = false;
        this.coin.visible = false;
        let rank = Number(msg.rank);
        if ( rank > 3) {
            return;
        }
        let userModel = burn.Director.getModelByKey(UserModel) as UserModel;
        let vo = game.table.T_QuickGame_Table.getVoByKey(userModel.getMatchRoomLevel());
        if (rank == 1) {
            let strData = vo.theFirst.split("_");
            if (Number(strData[0]) == PropEnum.GOLD) {
                this.war.visible = false;
                this.coin.visible = true;
            } else {
                this.war.visible = true;
                this.coin.visible = false;
            }
            this.gainLab.text = strData[1];
        } else if (rank == 2) {
            let strData = vo.theSecond.split("_");
            if (Number(strData[0]) == PropEnum.GOLD) {
                this.war.visible = false;
                this.coin.visible = true;
            } else {
                this.war.visible = true;
                this.coin.visible = false;
            }
            this.gainLab.text = strData[1];
        } else if (rank == 3) {
            let strData = vo.theThird.split("_");
            if (Number(strData[0]) == PropEnum.GOLD) {
                this.war.visible = false;
                this.coin.visible = true;
            } else {
                this.war.visible = true;
                this.coin.visible = false;
            }
            this.gainLab.text = strData[1];
        }
    }
    
}