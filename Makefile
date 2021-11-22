start:
	cd db && docker-compose up -d && \
	cd ../ && npm run db:reset

stop:
	cd db && docker-compose down --remove-orphans