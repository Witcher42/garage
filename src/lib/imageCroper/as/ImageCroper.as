package {
    import flash.display.Sprite;
    import flash.display.Stage;
    import flash.events.*;
    import flash.system.Security;
	import flash.external.ExternalInterface;
	import lib.util.ExternalCall;
	import ImageFile;
	
    public class ImageCroper extends Sprite {
        public static function main():void {
            var ImageCroper:ImageCroper = new ImageCroper();
        }

        public function ImageCroper() {
			var self:ImageCroper = this;
            Security.allowDomain("*");
            Security.allowInsecureDomain("*");
			this.debug('ready');

			var img:ImageFile = new ImageFile('./codercat.jpg');
			img.addEventListener(ImageFile.FETCHED, function ():void {
				//self.debug(img.bmp.width+'');
				//img.cut(100, 100, 100, 100);
				//self.addChild(img.bmp);
				//img.upload('http://image.ganji.com/upload.php');
			});
			//img.fetch();
			//this.debug('ok');
        }
		
		public function setImg(data:String):void {
			ExternalCall.Call('setImg', data);
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