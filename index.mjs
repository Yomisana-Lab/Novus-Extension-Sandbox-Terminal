import { spawn, exec, execSync } from "child_process";
import os from "os";
// base env for windows none any else env config
const WBase_env = {
  ALLUSERSPROFILE: "C:\\ProgramData",
  APPDATA: process.env.APPDATA,
  CommonProgramFiles: "C:\\Program Files\\Common Files",
  "CommonProgramFiles(x86)": "C:\\Program Files (x86)\\Common Files",
  CommonProgramW6432: "C:\\Program Files\\Common Files",
  COMPUTERNAME: process.env.COMPUTERNAME,
  ComSpec: "C:\\Windows\\system32\\cmd.exe",
  DriverData: "C:\\Windows\\System32\\Drivers\\DriverData",
  HOME: process.env.HOME,
  HOMEDRIVE: "C:",
  HOMEPATH: process.env.HOMEPATH,
  LOCALAPPDATA: process.env.LOCALAPPDATA,
  LOGONSERVER: process.env.LOGONSERVER,
  NUMBER_OF_PROCESSORS: process.env.NUMBER_OF_PROCESSORS,
  OS: process.env.OS,
  Path: "C:\\Windows\\system32;C:\\Windows;C:\\Windows\\System32\\Wbem",
  PATHEXT: ".COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC",
  PROCESSOR_IDENTIFIER: process.env.PROCESSOR_IDENTIFIER,
  PROCESSOR_LEVEL: process.env.PROCESSOR_LEVEL,
  PROCESSOR_REVISION: process.env.PROCESSOR_REVISION,
  ProgramData: "C:\\ProgramData",
  ProgramFiles: "C:\\Program Files",
  "ProgramFiles(x86)": "C:\\Program Files (x86)",
  ProgramW6432: "C:\\Program Files",
  PROMPT: "$P$G",
  PSModulePath: "C:\\Windows\\system32\\WindowsPowerShell\\v1.0\\Modules",
  PUBLIC: "C:\\Users\\Public",
  SystemDrive: "C:",
  SystemRoot: "C:\\Windows",
  TEMP: process.env.TEMP,
  TMP: process.env.TMP,
  USERDOMAIN: process.env.USERDOMAIN,
  USERDOMAIN_ROAMINGPROFILE: process.env.USERDOMAIN_ROAMINGPROFILE,
  USERNAME: process.env.USERNAME,
  USERPROFILE: process.env.USERPROFILE,
  windir: "C:\\Windows",
  Novus: "Hello DOS - Windows - 1.0",
};
// base env for linux none any else env config
const LBase_env = {
  // TODO: linux base env
  // No idea how to do it :P
  Novus: "Hello Unix - Linux - 1.0",
};

export default function Terminal(
  command,
  options = { cwd: process.cwd(), env: { Path: "" }, show_command: true }
) {
  if (!command) {
    command = "echo Nothing command to run...";
    // return `sussess run command: ${command} in ${options.cwd}`;
  }
  if (options.show_command) {
    console.log(`${options.cwd}>${command}`); // windows style
    // console.log(`${process.env.username}@${process.env.USERDOMAIN}:${options.cwd}# ${command}`) // linux style
  }

  let merge_env =
    os.platform() === "win32"
      ? mergeEnvOptions(WBase_env, options.env)
      : mergeEnvOptions(LBase_env, options.env); // merge env base + options.env
  const terminal = execSync(
    `${command}${os.platform() === "win32" ? " && echo." : ""}`,
    {
      env: merge_env,
      shell: true,
      cwd: options.cwd !== undefined ? options.cwd : process.cwd(),
    },
    (error, stdout, stderr) => {
      if (error) {
        console.error(`[Terminal] exec error: ${error}`);
      }
      console.log(`[Terminal] stdout: ${stdout}`);
      console.error(`[Terminal] stderr: ${stderr}`);
    }
  );
}

// magic function to merge env options D:
/*
  idk why, but the env work perfectly :P by yomisana
*/
function mergeEnvOptions(target, source) {
  // 遍歷源對象的所有屬性
  for (const key in source) {
    // 如果目標對象中已經存在相同的屬性
    if (target.hasOwnProperty(key)) {
      // 如果屬性值不相同，則合併
      if (target[key] !== source[key]) {
        // 如果目標屬性值已經包含了源屬性值，則不做任何操作
        if (!target[key].includes(source[key])) {
          // 如果屬性值是字符串類型，則合併成以分號分隔的字符串
          if (typeof target[key] === "string") {
            target[key] += `;${source[key]}`;
          } else {
            // 如果屬性值不是字符串類型，則直接覆蓋
            target[key] = source[key];
          }
        }
      }
    } else {
      // 如果目標對象中不存在相同的屬性，則直接添加到目標對象中
      target[key] = source[key];
    }
  }
  return target;
}
