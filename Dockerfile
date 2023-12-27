FROM php:8.1.2

ENV COMPOSER_ALLOW_SUPERUSER=1

COPY ./deploy/ /var/www/html
WORKDIR /var/www/html

# Install required system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    libbz2-dev \
    libfreetype6-dev \
    libicu-dev \
    libjpeg-dev \
    libmcrypt-dev \
    libpng-dev \
    libreadline-dev \
    libzip-dev \
    libpq-dev \
    unzip \
    zip \
    apache2 # Install Apache web server

# Enable Apache modules
RUN a2enmod rewrite headers

# Configure PHP extensions
RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
 && docker-php-ext-install pdo pdo_pgsql

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Create directories and install dependencies
RUN mkdir ./src \
 && composer install --prefer-dist \
 && composer dump-autoload --optimize \
 && composer update \
 && php vendor/bin/doctrine orm:convert-mapping --namespace="" --force --from-database yml ./config/yaml \
 && php vendor/bin/doctrine orm:generate-entities --generate-annotations=false --update-entities=true --generate-methods=false ./src \
 && composer update

# Expose port 80 for incoming connections
EXPOSE 80

# Define the application entry point
CMD ["apache2ctl", "-D", "FOREGROUND"]