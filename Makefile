start:
	docker-compose up -d
	npm run dev

stop:
	docker-compose down

start-new:
	docker-compose up -d
	npm run db:migrate
	npm run db:reset
	npm run dev
