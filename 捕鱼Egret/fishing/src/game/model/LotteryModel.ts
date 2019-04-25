class LotteryModel extends burn.model.ModelBase {
	//奖池积分
	private _score:number;        
	//击杀奖金鱼数量     
	private _killNum:number;       
	//今天领取奖励的次数     
	private _todayCount:number;
	//领取次数对应数据 数组下标是领取次数，内容是数据
	private _getArr:Array<number>;
	
	public constructor() {
		super();
	}

	public init():void {
		//初始化静态数据
		this._getArr = new Array<number>();
		var item:string = game.table.T_Config_Table.getVoByKey(15).value;
		var tempArr = item.split("_");
		for (var i = 0; i < tempArr.length; i++) {
			this._getArr.push(Number(tempArr[i]));
		}
    }

	public getMaxKill(count:number):number {
		return this._getArr[count];
	}

	public setScore(s:number):void {
		this._score = s;
	}

	public getScore():number {
		return this._score;
	}

	public setKillNum(num:number):void {
		this._killNum = num;
	}

	public getKillNum():number {
		return this._killNum;
	}

	public setTodayCount(count:number):void {
		this._todayCount = count;
	}

	public getTodayCount():number {
		return this._todayCount;
	}

    public clear():void {
				
	}

	public destroy():void {
		
	}

}