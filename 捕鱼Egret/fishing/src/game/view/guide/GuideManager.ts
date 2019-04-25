module game.util {
    export class Guide {
        static _bOpen:boolean = false;
        public static gunSendTimes:number = 0;
        public static isOpentask:boolean = false;
        public static checkGuide(nType:number):void {
            let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
            let curId = userModle.getGuideID();
            let id = Number(curId) + 1;
            let vo = game.table.T_Guide_Table.getVoByKey(id);
            if (!vo) {
                return;
            }
            if (vo.trrigertype == nType) {
                Guide.openGuide(id);
            }
        }
        public static completeGuide():void {
            let userModle = burn.Director.getModelByKey(UserModel) as UserModel;
            let curId = userModle.getGuideID();
            let id = Number(curId) + 1;
            let vo = game.table.T_Guide_Table.getVoByKey(id);
            if (!vo) {
                return;
            }
            
            userModle.setGuideID(id,false);
            this._bOpen = false;
            switch (vo.closetype) {
                case GuideClose.GUIDE_CLOSE_INTOROOM:
                    let gainArr = new Array<game.model.Item>();
                    let voItem = game.table.T_Guide_Table.getVoByKey(9999);
                    if (!voItem.gain || voItem.gain == "null") {       
                        //burn._Notification_.send(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, {type:RequesetRoomState.NewbieRoom, id:0});
                        return;
                    }
                    let str = voItem.gain.split(",");
                    let len = str.length;
                    for (let i = 0; i < len; i++) {
                        let dataS = str[i].split("_");
                        gainArr.push(new game.model.Item(Number(dataS[0]),Number(dataS[1]),0));
                    }
                    game.util.GameUtil.openQihangByPos(null,gainArr,new egret.Point(262,659),function(){
                        //burn._Notification_.send(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, {type:RequesetRoomState.NewbieRoom, id:0});
                        burn._Notification_.send(NotifyEnum.CHECK_POP);
                    });
                break;
                case GuideClose.GUIDE_CLOSE_UNLOCK:
                    burn._Notification_.send(NotifyEnum.GUIDE_CLOSE,vo.closetype);
                break;
                case GuideClose.GUIDE_CLOSE_TRRIGER_NEXT:
                    burn._Notification_.send(NotifyEnum.GUIDE_CLOSE,vo.closetype);
                break;
                case GuideClose.GUIDE_CLOSE_LOCK:
                    burn._Notification_.send(NotifyEnum.GUIDE_CLOSE,vo.closetype);
                break;
                case GuideClose.GUIDE_CLOSE_OPENLOTTERY:
                    burn._Notification_.send(NotifyEnum.GUIDE_CLOSE,vo.closetype);
                break;
                case GuideClose.GUIDE_CLOSE_LOTTERY:
                    burn._Notification_.send(NotifyEnum.GUIDE_CLOSE,vo.closetype);
                break;
                case GuideClose.GUIDE_CLOSE_CLOSE_RMB_GAIN:
                    burn._Notification_.send(NotifyEnum.GUIDE_CLOSE,vo.closetype);
                break;
                case GuideClose.GUIDE_CLOSE_CLICK_EXCHAGE:
                    burn._Notification_.send(NotifyEnum.GUIDE_CLOSE,vo.closetype);
                break;
                case GuideClose.GUIDE_CLOSE_EXCHNANGE_END:
                    burn._Notification_.send(NotifyEnum.GUIDE_CLOSE,vo.closetype);
                break;
            }
            let send:NewbieGuideSendMessage = new NewbieGuideSendMessage();
            send.initData();
            send.setGuideId(id);
            NetManager.send(send);
            game.util.ReyunUtil.sendEvent(curId + game.util.LogEnum.GUIDE_END);

            if (!this.isOpentask) {
                let guideTaskHide = game.table.T_Config_Table.getVoByKey(48).value;
                let strGuideTaskHide = guideTaskHide.split(",");
                for (let i = 0; i < strGuideTaskHide.length; i++) {
                    let param2 = strGuideTaskHide[i].split("_");
                    if (id >= Number(param2[0]) && id <= Number(param2[1])) {
                        burn._Notification_.send(NotifyEnum.TASK_GUIDE_LOAD);
                    }
                }
            }
            
            let guidePopCiri = game.table.T_Config_Table.getVoByKey(77).value;
            if (curId == Number(guidePopCiri)) {
               burn._Notification_.send(NotifyEnum.POP_CIRI);
            }
        }
        public static openGuide(nId:number):void {
            if (this._bOpen) {
                return;
            }
            this._bOpen = true;
            let vo = game.table.T_Guide_Table.getVoByKey(nId);
            switch (vo.opentype) {
                case GuideOpen.GUIDE_OPEN_UNLOCK://              //弹出解锁炮倍
                    burn._Notification_.send(NotifyEnum.GUIDE_OPEN,vo.opentype);
                break;
                case GuideOpen.GUIDE_OPEN_ADDFISH://              //添加一条鱼
                    burn._Notification_.send(NotifyEnum.GUIDE_OPEN,vo.opentype);
                break;
                case GuideOpen.GUIDE_OPEN_FISHDEAD://             //鱼死亡
                    this._bOpen = false;
                    burn._Notification_.send(NotifyEnum.GUIDE_OPEN,vo.opentype);
                break;
                case GuideOpen.GUIDE_OPEN_OPENLOTTERY://           //弹出抽奖板子
                    burn._Notification_.send(NotifyEnum.GUIDE_OPEN,vo.opentype);
                break;
                case GuideOpen.GUIDE_OPEN_TRRIGERTASK://             //触发新手任务
                    burn._Notification_.send(NotifyEnum.GUIDE_OPEN,vo.opentype);
                break;
                case GuideOpen.GUIDE_OPEN_EXCHANGE: //打开兑换界面
                    burn._Notification_.send(NotifyEnum.GUIDE_OPEN,vo.opentype);
                break;
                case GuideOpen.GUIDE_OPEN_POP_RMB_GAIN:
                    burn._Notification_.send(NotifyEnum.GUIDE_OPEN,vo.opentype);
                break;
            }
            if(vo.opentype == GuideOpen.GUIDE_OPEN_POP_RMB_GAIN) {
                EXML.load(CONFIG.RES_PATH_PREFIX + "resource/"+ GlobalManager.SkinPath +"/guide/RmbGain.exml", ()=>{
                    let gView:GuideView = new GuideView();
                    let gMed:GuideMediator = new GuideMediator(gView, nId);
                    burn.Director.pushView(gMed);
                }, this);
            } else {
                let gView:GuideView = new GuideView();
                let gMed:GuideMediator = new GuideMediator(gView, nId);
                burn.Director.pushView(gMed);
            }
            game.util.ReyunUtil.sendEvent(nId + game.util.LogEnum.GUIDE_START);
        }
    }
}