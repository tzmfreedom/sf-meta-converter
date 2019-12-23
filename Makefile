OBJECT := Account
TEMPLATE := js

.PHONY: run
run: build
	node dist/index.js -T $(OBJECT) -t $(TEMPLATE)

.PHONY: run
build:
	npx tsc
