module game.model {
    export class DjsObj {
        public todayGrandPrixTimes:number = 0;
        public grandPrixSignUp:number = 0;
        public grandPrixIntegral:number = 0;
        public grandPrixBulletNum:number = 0;
        public constructor(msg:any)
        {
            if(msg.todayGrandPrixTimes)
            {
                this.todayGrandPrixTimes = Number(msg.todayGrandPrixTimes);
            }
            if(msg.grandPrixSignUp)
            {
                this.grandPrixSignUp = Number(msg.grandPrixSignUp);
            }
            if(msg.grandPrixIntegral)
            {
                this.grandPrixIntegral = Number(msg.grandPrixIntegral);
            }
            if(msg.grandPrixBulletNum)
            {
                this.grandPrixBulletNum = Number(msg.grandPrixBulletNum);
            }
        }
    }
}