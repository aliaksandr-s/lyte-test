install:
	npm install

develop:
	npm run start

test:
	npm run test

build:
	npm run build

deploy:
	npm run build
	cd ./build
	cp ./index.html ./200.html
	surge

lint:
	npm run lint

lint-fix:
	npm run lint-fix