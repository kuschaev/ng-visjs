# ng-visjs

This project is a test [AngularJS][angularjs] application featuring the [vis.js][visjs] visualizaion library.
It was built from scratch using:
* [`angular-seed`][angularseed] application skeleton;
* [`AngularJS Material`][material] library;
* AngularJS [directive module][angvis] for VisJS components;
* some other minor libraries (`ngRoute`, `ngSanitize`, `ngMessages`);
* and `vis.js`, of course.
Instruments used in development: [`Node.js`][node] run-time environment, Node package manager ([`npm`][nodepm]), [`Bower`][bowerpm] package manager, [`git`][gitvcs] VCS, [WebStorm][ws] IDE.

## Project structure

This project is a SPA with 3 separate views and the one to bring them all together (index).

### index

Contains all the necessary references, navigation bar for them other views, the main app directive.

### View 1

Contains the vis.js network visualization with a legend. Interaction with this app includes making selected nodes invisible/visible, showing ID of the selected node in an input on a doubleclick.

### View 2

Contains the vis.js plot (2D graph) visualization. Interaction with it is limited due to small amount of supported by angular-visjs events ('rangechange', 'timechange', 'finishedRedraw').

### View 3

Contains the vis.js network visualization of large amount of data with a native controls. Apart from the latter, possible interactions include popups firing when clicked on nodes. Initially this view was the first one.

## How to get started

The algorithm to get this app up and running:

* install git;
* install node.js and npm;
* clone this repo using git;
* run `npm install` to get the dependencies mentioned in `package.json`. This command is chained with `bower install` so you can add necessary dependencies to `bower.json` beforehand;
* run `npm start`. This starts a web server, go to [localhost:8000/index.html][lh] to see the app.





[angularjs]: https://angularjs.org/
[visjs]: http://visjs.org/
[angularseed]: https://github.com/angular/angular-seed
[material]: https://material.angularjs.org/
[angvis]: https://github.com/visjs/angular-visjs
[node]: https://nodejs.org
[nodepm]: https://www.npmjs.com/
[bowerpm]: http://bower.io/
[gitvcs]: https://git-scm.com/
[ws]: https://www.jetbrains.com/webstorm/
[lh]: localhost:8000/index.html



ng-visjs, Kuschaev Nikolai, 2017