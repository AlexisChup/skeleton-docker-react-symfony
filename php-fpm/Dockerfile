FROM php:8.0-fpm

COPY wait-for-it.sh /usr/bin/wait-for-it

RUN chmod +x /usr/bin/wait-for-it

RUN apt-get update && \
    apt-get install -y --no-install-recommends libssl-dev zlib1g-dev curl git unzip netcat libxml2-dev libpq-dev libzip-dev wget && \
    pecl install apcu xdebug && \
    docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql && \
    docker-php-ext-install -j$(nproc) zip opcache intl pdo_pgsql pgsql && \
    docker-php-ext-enable apcu pdo_pgsql sodium xdebug && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY --from=composer /usr/bin/composer /usr/bin/composer

RUN wget https://get.symfony.com/cli/installer && \
    chmod +x installer && \
    ./installer && \
    mv /root/.symfony5/bin/symfony /usr/local/bin

RUN cd /var/www/ && \
    composer require symfony/maker-bundle --dev && \
    composer require symfony/orm-pack --dev && \
    composer require doctrine/data-fixtures --dev && \
    composer require fzaninotto/faker --dev

WORKDIR /var/www/

RUN echo 'alias phpunit="vendor/bin/phpunit"' >> ~/.bashrc

CMD composer i -o ; wait-for-it db:5432 -- bin/console doctrine:migrations:migrate ;  php-fpm 

EXPOSE 9000
