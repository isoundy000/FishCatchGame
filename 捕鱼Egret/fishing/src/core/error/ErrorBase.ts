module burn.error {
	export class ErrorBase implements Error {
		public name:string = "burn.error.ErrorBase";
		constructor(public message:string) {
			console.error("[Burn Error]" + message);
		}
	}
}