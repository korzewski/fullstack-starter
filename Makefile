start:
	docker-compose up -d && \
	npm run db:migrate && \
	npm run db:reset && \
	npm run dev

stop:
	docker-compose down