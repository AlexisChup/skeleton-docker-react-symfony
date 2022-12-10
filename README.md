# SKELETON FOR CREATING A DOCKER REACT SYMFONY PROJECT

## Folder Structure

├── back-symfony
├── front-react
├── nginx
├── php-fpm
├── .env
├── .gitignore
├── Makefile
├── README.md
├── docker-compose.yam

## Installation

1. `git clone https://github.com/AlexisChup/skeleton-docker-react-symfony.git`
2. `cd skeleton-docker-react-symfony`
3. `rm .git` folder
4. `git init` to create a new git repository
5. Search `TODO` comments in the code
6. Do written instructions
7. Return to root (`cd skeleton-docker-react-symfony`)
8. Build Docker Images `make build`
9. Wait few minutes, the 1st build might take some times

## Usage

- `cd skeleton-docker-react-symfony`
- Run containers: `make run`
- Wait about few seconds until containers are started
- Open browser at [http://localhost:9090](http://localhost:9090)
- React app should display a form for testing backend integration
- Try to fill in and submit the form
- New product should appear on the left
- If ok, you are now ready to create awesome projects ! ✅
