# Lo que le importa está en `/www/js/app.js`

Si quiere correrlo necesitará tener Node.js, una vez tenga node puede instalar Cordova e Ionic así:

`npm install -g cordova ionic@1.3`

Después de eso clona el repo y va dentro del proyecto \pruebaConexion y ejecuta el proyecto usando

`ionic serve`

**Luego se le abre el proyecto en el navegador pero igual no le va a servir porque no tiene acceso a la red.)

Y si llegara a estar en mi red, al no ser un build para celular necesita correr Chrome así:
1. Por consola, va al directorio donde esta chrome.exe
2. Lo ejecuta: `chrome.exe --disable-web-security --user-data-dir`

