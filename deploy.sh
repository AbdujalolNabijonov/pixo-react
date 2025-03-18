git reset --hard
git checkout master
git pull origin master

npm install yarn -g
yarn install
docker compose up -d