## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Informacoes gerais

Este projeto em vue conta com
as seguintes funcionalidade
-Catalogo: Pesquisa dinamica em 
uma api com fotos de caes, todas 
as racas estao disponiveis
no seguinte link. A mesma mostra fotos de forma aleatoria da raca introduzida na pesquisa e se o utilizador gostar pode adicionar a mesma a pagina de favoritos, o url da foto favorita e mandada para a base de dados e para a localstorage de forma a que se existir um erro com a base de dados a mesma aparecera na pagina de favoritos.Esta pagina so esta disponivel se o user tiver logado se o mesmo nao estiver sera redirecionado para a pagina de login.
```sh
https://dog.ceo/dog-api/documentation/
```
-Favoritos: Nesta pagina temos uma
precistencia de dados que e guardada em localstorage. A mesma local storage e introduzida na pagina de login com a foto favorita do user. Esta pagina so esta disponivel se o user tiver logado se o mesmo nao estiver sera redirecionado para a pagina de login.
-login: Nesta pagina temos o login e o registar. Se o user nao tiver conta deve se registar na pagina de registar e assim ja pode fazer o login assim que o user der login ira aparecer o seu username e um botao de logout. A mesma pagina quando o user da login busca a sua informacao toda na base de dados e a manda para o localstorage, que sera usada para as informacoes do user para o resto da pagina

link repositorio 
```sh
https://github.com/Tiagoytsk/projeto_front_end_1
```