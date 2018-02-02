# FrontEnd Audaxys(Protótipo) com Angular 5 e Material UI

O frontend protótipo da audaxys para acesso ao Lease feito com Angular 5 e Material UI

Este projecto foi baseado no Free Admin Bootstrap Theme [SB Admin v4.0](http://startbootstrap.com/template-overviews/sb-admin-2/).

Powered by [StartAngular](http://startangular.com/) & [StrapUI](http://strapui.com/)

### Introdução
Foi feito para demonstrar o frontend audaxys e as tecnologias angular 4.

Usa as seguintes frameworks:
- boostrap-v4.0.0-alpha.6
- angular-v4.2.4
- angular/cli-v1.1.3

### Método de uso
**Nota** este projecto requer  **node >=v6.9.0 and npm >=3**.

Para iniciar o projecto usamos:
```bash
$ git clone https://github.com/Luis-Trindade/FrontEndAngularM.git
$ cd FrontEndAngular2
# instalar as dependências
$ npm install
# Para correr em modo livereload executar `npm start` para iniciar em desenvolvimento. Navegar até `http://localhost:4200/`. A aplicação faz refresh quando mudar alguma coisa no código.
$ npm start
# produzir uma versão em modo distribuição. O resultado fica no diréctorio `dist`
# O código pode ser depois enviado para um servidor http.
$ npm run build
**Nota** O servidor http tem de fazer fallback para index.html para o routing funcionar correctamente. usar por exemplo o angular-http-server.
**Nota2** O front precisa do FrontEndBridge e dos serviços RestLease a funcionar.
```

### 
### Ajuda adicional

Para obter ajudar sobre o Angular CLI use `ng help` ou leia [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


### Para fazer a skin para o AngularJS2:
# favicon
- colocar o ficheiro ico no directorio assets/icons
- editar a tag link no ficheiro index.html para apontar para o novo ficheiro
# logo
- colocar o ficheiro com o logo no directorio assets/images
- editar a tag img no ficheiro header.component.html para apontar para o novo logo
- editar a tag img no ficheiro login.component.html para apontar para o novo logo
# cor
- editar o ficheiro styles/_globals.scss
- Alterar as cores necessarias. A principal é $default-frontend-color
