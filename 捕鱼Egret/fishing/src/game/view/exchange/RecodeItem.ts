class RecodeItemUI extends eui.Component{
    public nameLab:eui.Label;
    public timeLab:eui.Label;
    public phone:eui.Label;
    public root:eui.Group;

    public lab_1:eui.Label;
    public lab_2:eui.Label;
    public lab_3:eui.Label;
    public lab_4:eui.Label;
	public constructor() 
	{
		super();
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/exchange/Recode.exml";
	}
    public setData(data:any):void
    {
        let id = data.exchangeGoodsId;
        let time = data.time;
        let phone = data.phone;
		let exchangeModel:ExchangeModel = burn.Director.getModelByKey(ExchangeModel) as ExchangeModel;
        let obj:game.model.ExchangeItem = exchangeModel.getListById(Number(id));

        this.nameLab.text = obj._name;
        this.timeLab.text = game.util.TimeUtil.longToDateStr(Number(time));
        this.phone.text = phone;

        if (obj._color) {
            switch(obj._color) {
                case Exchange_Color.White:
                break;
                case Exchange_Color.Green:
                    this.nameLab.textColor = 0x00ff00;
                    this.timeLab.textColor = 0x00ff00;
                    this.phone.textColor = 0x00ff00;
                    this.lab_1.textColor = 0x00ff00;
                    this.lab_2.textColor = 0x00ff00;
                    this.lab_3.textColor = 0x00ff00;
                    this.lab_4.textColor = 0x00ff00;
                break;
                case Exchange_Color.Blue:
                    this.nameLab.textColor = 0x0080ff;
                    this.timeLab.textColor = 0x0080ff;
                    this.phone.textColor = 0x0080ff;
                    this.lab_1.textColor = 0x0080ff;
                    this.lab_2.textColor = 0x0080ff;
                    this.lab_3.textColor = 0x0080ff;
                    this.lab_4.textColor = 0x0080ff;
                break;
                case Exchange_Color.Purple:
                    this.nameLab.textColor = 0xd800ff;
                    this.timeLab.textColor = 0xd800ff;
                    this.phone.textColor = 0xd800ff;
                    this.lab_1.textColor = 0xd800ff;
                    this.lab_2.textColor = 0xd800ff;
                    this.lab_3.textColor = 0xd800ff;
                    this.lab_4.textColor = 0xd800ff;
                break;
                case Exchange_Color.Origen:
                    this.nameLab.textColor = 0xff8400;
                    this.timeLab.textColor = 0xff8400;
                    this.phone.textColor = 0xff8400;
                    this.lab_1.textColor = 0xff8400;
                    this.lab_2.textColor = 0xff8400;
                    this.lab_3.textColor = 0xff8400;
                    this.lab_4.textColor = 0xff8400;
                break;
                case Exchange_Color.Red:
                    this.nameLab.textColor = 0xff0000;
                    this.timeLab.textColor = 0xff0000;
                    this.phone.textColor = 0xff0000;
                    this.lab_1.textColor = 0xff0000;
                    this.lab_2.textColor = 0xff0000;
                    this.lab_3.textColor = 0xff0000;
                    this.lab_4.textColor = 0xff0000;
                break;
            }
        }
    }
}