.PHONY: default, build, db, run, test

build:
	yarn install && \
		yarn prisma generate

db:
	yarn prisma migrate reset

run:
	yarn start

test:
	yarn test:e2e

