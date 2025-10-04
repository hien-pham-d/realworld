.PHONY: default, init, install-deps db, start, test, loop

default: init install-deps db start

init:
	cp .env.example .env

install-deps:
	yarn install && yarn prisma generate

db:
	yarn prisma migrate reset --force

start:
	yarn start

test:
	yarn test:e2e

loop:
	fd --color never --regex '.ts$$|Makefile' . | entr -c bash -c 'make test > debug.log 2>&1'
