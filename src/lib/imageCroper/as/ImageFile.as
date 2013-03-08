package  
{
	import flash.display.Loader;
	import flash.events.ErrorEvent;
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.events.IOErrorEvent;
	import flash.events.DataEvent;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	import flash.system.JPEGLoaderContext;
	import flash.utils.ByteArray;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.net.URLRequestMethod;
	import lib.encode.Base64;
	import lib.image.JPEGEncoder;
	import lib.network.MultipartURLLoader;
	import lib.util.ExternalCall;
	/**
	 * ...
	 * @author jianbin
	 */
	public class ImageFile extends EventDispatcher
	{
		public static const NETWORK_ERROR:String = 'networkerror';
		public static const FETCHED:String = 'fetched';
		public var bmp:Bitmap;
		private var fetched:Boolean = false;
		private var url:String = '';
		
		public function ImageFile(url:String) {
			this.debug('init');
			this.url = url;
		}
		
		public function fetch():void {
			this.debug('fetchImag');
			var self:ImageFile = this;
			var url:String = encodeURI(this.url);
			var loader:Loader = new Loader();
			var request:URLRequest = new URLRequest(url);
			
			loader.contentLoaderInfo.addEventListener(Event.COMPLETE, function (e:Event):void {
				self.bmp = e.target.content;
				self.fetched = true;
				dispatchEvent(new Event(ImageFile.FETCHED));
			});
			loader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR, function (e:Event):void {
				dispatchEvent(new Event(ImageFile.NETWORK_ERROR));
			});
			try {
				loader.load(request);
			} catch (ex:Error) {
				this.debug('error');
				dispatchEvent(new Event(ImageFile.NETWORK_ERROR));
			}
		}
		
		public function cut(x:int = 0, y:int = 0, w:int = 0, h:int = 0):void {
			this.debug('cut');
			var rect:Rectangle = new Rectangle(x, y, w, h);
			var ret:BitmapData = new BitmapData(w, h);
			this.debug('copy');
			ret.copyPixels(this.bmp.bitmapData, rect, new Point(0, 0));
			this.debug('copied');
			this.bmp = new Bitmap(ret);
			this.debug('seted'+this.bmp.width);
		}
		
		public function upload(url:String):void {
			this.debug('upload');
			url = encodeURI(url);
			var data:ByteArray = this.bmp.bitmapData.getPixels(new Rectangle());
			var uploader:MultipartURLLoader = new MultipartURLLoader(data, 'whatever');
			var request:URLRequest = new URLRequest(url);
			this.debug(url);
			request.data = data;
			request.method = URLRequestMethod.POST;
			request.contentType = "application/octet-stream";
			uploader.addEventListener(DataEvent.UPLOAD_COMPLETE_DATA, function (e:DataEvent):void {
				this.debug('uploaded');
				this.debug(e.data);
			});
			
			uploader.upload(request, 'Filedata');
		}
		
		private function debug(message:String):void {
			try {
				ExternalCall.Call('console.log', message);
			} catch (ex:Error) {
				trace(message);
			}
        }
	}
}