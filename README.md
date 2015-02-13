## Instalation

```
npm install
npm install grunt-cli --global
```

## Build for Development

```
grunt dev
open app.html
```

Alternative, you can use a watch process to avoid having to execute `grunt dev` after
every change in your project, as a result, grunt will keep running, and will build
your application every time you save a file to disk. Here is how:

```
grunt watch
```

## Build for Production

```
grunt prod
open app.html
```
