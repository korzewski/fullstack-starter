start:
	cd db && docker-compose up -d && \
	cd ../ && npm run db:migrate && \
	npm run db:reset && \
	npm run dev

stop:
	cd db && docker-compose down --remove-orphans