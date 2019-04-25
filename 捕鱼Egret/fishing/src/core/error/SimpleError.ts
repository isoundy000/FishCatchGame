module burn.error {
	export class SimpleError extends burn.error.ErrorBase {
		public name:string = "burn.error.SimpleError";
		public constructor(msg:string) {
			super(msg);
		}
	}
}