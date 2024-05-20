#!/usr/bin/env node

import degit from "degit";
import {
  readJSONSync,
  writeJSONSync,
  // removeSync,
  pathExistsSync,
} from "fs-extra/esm";
import { join, resolve } from "node:path";
import pc from "picocolors";

const __dirname = resolve();

const run = name => {
  const emitter = degit(
    "https://github.com/kaijia323/tampermonkey-template.git"
  );

  emitter.clone(name).then(() => {
    if (name !== "tampermonkey-template") {
      // 修改 package.json 的 name 字段
      rename(name);
    }
    console.log(pc.green(`${name} 模板创建成功`));
  });
};

const rename = name => {
  const p = join(name, "package.json");
  const res = readJSONSync(p);
  res["name"] = name;
  writeJSONSync(p, res, { spaces: 2 });
};

const args = process.argv.slice(2);
const name = args[0] || "tampermonkey-template";
if (pathExistsSync(resolve(__dirname, name))) {
  // removeSync(resolve(__dirname, name));
  console.log(pc.red(`${resolve(__dirname, name)} 文件夹已经存在`));
} else {
  run(name);
}
