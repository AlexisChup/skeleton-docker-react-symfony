# SKELETON FOR CREATING A DOCKER REACT SYMFONY PROJECT

## Folder Structure

```
📂skeleton-docker-react-symfony
┣📦apps
┃┣ 📂back-symfony
┃┣ 📂front-react
┃┣ 📂logs
┃┣ 📂nginx
┃┗ 📂php-fpm
┣ 📜.env
┣ 📜.gitignore
┣ 📜Makefile
┗ 📜README.md
```

## Requirement

- Windows: WSL2 & Docker Desktop
- Linux / Max: Docker

## Installation

- `git clone https://github.com/AlexisChup/skeleton-docker-react-symfony.git`
- `cd skeleton-docker-react-symfony`
- `rm .git` folder
- Rename folder `skeleton-docker-react-symfony` with your project's name
- `git init` to create a new git repository
- Generate APP_SECRET in both .env

```
📂skeleton-docker-react-symfony
┣📦apps
┃┣ 📂back-symfony
┃┃┗ 📜.env
┃┣📜.env
```

- Update `DATABASE_URL` in

```
📂skeleton-docker-react-symfony
┣📦apps
┃┣📜.env
```

- Edit database name (`POSTGRES_DB`), for db service, under `environment` line 10 in:

```
📂skeleton-docker-react-symfony
┃┣📜docker-compose.yaml
```

- Return to root of the project
- Build Docker Images `make runbuild`
- Wait few minutes, the 1st build might take some times
- Generate the SSL keys
- - Run `docker exec -it php-fpm sh`
- - Run `php bin/console lexik:jwt:generate-keypair`
- Load Fixtures
- - Run `php bin/console doctrine:fixtures:load`
- Open browser at [http://localhost:9090](http://localhost:9090)
- React app should display a form for testing backend integration
- Try to fill in and submit the form
- New product should appear on the right
- If ok, you are now ready to create awesome projects ! ✅
- You can delete § Installation in the README.md file

## Usage

### Start containers the 1st time or when you have added libs

- `make runbuild`
- Wait few minutes, the 1st build might take some times
- Generate the SSL keys
- - Run `docker exec -it php-fpm sh`
- - Run `php bin/console lexik:jwt:generate-keypair`
- Load Fixtures
- - Run `php bin/console doctrine:fixtures:load`
- Open browser at [http://localhost:9090](http://localhost:9090)

### Start containers other times

- Run containers: `make run`
- Wait about few seconds until containers are started
- Open browser at [http://localhost:9090](http://localhost:9090)

### Stop containers

- Run `make stop`

## Architecture

### Back Symfony

#### Load fixtures

1. Run `docker exec -it php-fpm sh`
2. Run `php bin/console doctrine:fixtures:load`

#### Make entity and save in in database

1. Run `docker exec -it php-fpm sh`
2. Run `php bin/console make:entity`
3. Run `php bin/console make:migration`
4. Run `php bin/console doctrine:migrations:migrate`

#### Persisting Objects to the Database

1. Run `docker exec -it php-fpm sh`
2. Run `php bin/console make:entity`
3. Run `php bin/console make:controller XXXXController`

#### Miscellaneous

See [SymfonyDoc](https://symfony.com/doc/current/doctrine.html) for more

### Front React

#### Libs

- react-bootstrap
- react-icons
- react-redux
- react-router-dom
- react-toastify

#### Install new libs

1. Run `docker exec -it front-react sh`
2. Run `npm install my-lib`
