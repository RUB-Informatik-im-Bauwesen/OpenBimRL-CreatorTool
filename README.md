# OpenBimRL Creator-Tool

> **Current Version:** 0.1.10 <br>
> **Publication Date:** 01.06.2022 <br>
> **Updated Date:** 02.06.2023 <br>
> **Autors:** Marcel Stepien and Florian Becker <br>
> **E-Mail:** marcel.stepien@ruhr-uni-bochum.de
<br>


A web-based application to create and edit OpenBimRL files. 

## Getting started

To run this project, following applications must be installed:

- node.js
- npm
- Visual Studio Code (Recommended) + Volar plugin for Vue


The following dependencies have to be installed using npm:


```shell
cd webapp
npm install
```

For more details on dependencies view the package.json file.

# Compiling and Running

New client side implementations can be added by writing code in: /webapp/src/

In order to bundle Vue components into a single app.js file, the code has to be compiled using vite. The files will be stored in */webapp/dist/*. These files are used by the index.html file. To generate the compiled files, simply run following command:

```shell
cd webapp
npm run build
```

**NOTE:** The watch-mode supports hot-reload, in order to edit and view files live in a browser. 


# Run Demo without Coding

**This tool also runs without the sever application!** Simply run the index.html from the [build.zip](https://github.com/FlorianB-DE/OpenBimRL-CreatorTool/releases/latest/download/build.zip) in your web-browser to execute and use the latest updated version of this tool.

![OpenBimRL-Creator-Tool demo](images/app-demo.png "Demo")