all: swf

swf: build.xml ImageCroper.as ImageFile.as
	/usr/local/flex_sdk_4.6/bin/mxmlc -load-config+=build.xml -o ../swf/ImageCroper.swf
	/usr/local/flex_sdk_4.6/bin/mxmlc -load-config+=build.xml -o /Users/jianbin/developer/ganji/ganji_sta/src/swf/ImageCroper.swf

.PHONY: clean

clean:
	rm ../swf/ImageCroper.swf