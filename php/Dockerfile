FROM php:8.2-fpm

RUN apt-get update && apt-get install -y libpq-dev unzip \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pdo pdo_pgsql pgsql

RUN mkdir -p /home/php/app/vendor 

WORKDIR /home/php/app

COPY composer* ./

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

RUN composer install

COPY . .

CMD ["sh", "./start.sh"]