module game.table {

	export class T_FishTaskType {
		//任务类型
		public type:number = 0;
		//是否有序
		public isIndex:number = 0;
		//显示几个
		public showNum:number = 0;
		//任务累计的房间类型
		public roomType:string = "";
	}

	export class T_FishTaskType_Table {
		public static getVoByKey(key:number):T_FishTaskType {
			var len = _T_FishTaskType_.length;
			let data: T_FishTaskType = SerchUtil.binary_search(_T_FishTaskType_, "type", 0, len, key);
			return data;
		}
		
		public static getAllVo():Array<T_FishTaskType> {
			return _T_FishTaskType_;
		}
	}

	const _T_FishTaskType_ = [
		{type:1,isIndex:1,showNum:0,roomType:"1,2,3,4",},
		{type:2,isIndex:0,showNum:0,roomType:"1,2,3,4,5,6,7",},
		{type:3,isIndex:0,showNum:0,roomType:"1,2,3,4,5,6,7",},
		{type:4,isIndex:0,showNum:0,roomType:"1,2,3,4,5,6,7",},
		{type:5,isIndex:1,showNum:3,roomType:"5",},
		{type:6,isIndex:1,showNum:3,roomType:"6",},
		{type:7,isIndex:1,showNum:3,roomType:"7",},
		{type:8,isIndex:0,showNum:0,roomType:"1,2,3,4,5,6,7",},
		{type:9,isIndex:0,showNum:0,roomType:"1,2,3,4,5,6,7",},
		{type:10,isIndex:1,showNum:3,roomType:"1,2,3",},
		
	];
}