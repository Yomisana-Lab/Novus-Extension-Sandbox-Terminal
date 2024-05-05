I only make windows bcs I not have macbook so...I just make windows version.

if any one want to make macos or linux version you can contribute to this project. :D I will really appreciate it. by yomisana


## How to use

this is simple terminal extension for windows.

other js file just import this file and use Terminal() and input you want run command and options it will works perfectly.

example:
```js
import os from 'os';
import Terminal from "./index.js";

// options - if none just not added. it will use default base env, or not give this options key.
// this is example for windows step is me to create value not in this file.
// u can check Novus Extension Scripts for more detail.
const options = {
    cwd: step.platform[os.platform()].path && path.join(__dirname, '..', step.platform[os.platform()].path),
    show_command: step.platform[os.platform()].show_command && step.platform[os.platform()].show_command,
    env: step.platform[os.platform()].env && {...after_commandExtension(step, step.platform[os.platform()].env)}
};
// console.log(`command: ${command}\noptions: ${JSONstringify(options)}`);
Terminal(command, options);
```