git reset --hard
git checkout master
git pull origin master

npm install yarn -g
yarn install
yarn run build

docker compose up -d