module burn.event {
	export class PageEvent extends egret.Event {

		public static SCROLL_END:string = "view_scroll_end";

		public scrollType:string;

		public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false) {
			super(type,bubbles,cancelable);
		}
	}
}