AS_FILES = $(shell find . -type f -iname '*.as')

../server/public/swf/player.swf: Player.swf
	cp $< $@

Player.swf: PlayerMain.as flex-config.xml $(AS_FILES)
	${FLEX_HOME}/bin/mxmlc -load-config+=flex-config.xml $<
	mv PlayerMain.swf Player.swf
