# Joogivanema infosüsteemi *front-end*'i prototüüp

Selle rakenduse kasutamiseks paigalda enda arvutisse ka [*back-end*'i mock](https://github.com/madislutter/jis-klient) ning pane see käima. See on vajalik selleks, et *front-end*'il oleks võimalik kuskilt andmeid pärida.

## Mis peab olema installeeritud rakenduse kasutamiseks?

Oma arvutis rakenduse jooksutamiseks peab olema installeeritud tarkvara **node** (testitud versiooniga v5.9.0) ning sellega kaasa tulev **npm** (node package manager). Node'i uusima versiooni installeerimiseks on mugav kasutada tarkvara [nvm](https://github.com/creationix/nvm) (node version manager):

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash
nvm install node
nvm use node
```

## Paigaldamine

*Front-end*'i oma arvutisse paigaldamiseks ja käima panemiseks jooksuta järgmised käsud kataloogist, kuhu soovid rakendust paigaldada:

```bash
git clone git@github.com:madislutter/jis-klient.git
cd jis-klient
npm install
npm install -g bower
bower install
npm install -g gulp
gulp serve
```

Viimane käsk käivitab *front-end*'i serveri ning avab brauseri navigeerides aadressile <http://localhost:3000>, kus rakendus asub.