#!/usr/bin/env node
import program from 'commander';

import colors from 'colors';

import { commandList, registerAction } from "./commanderConfig.js";

program.name('zz-cli')
program.version("1.0.0", '-V, --version');
// 循环创建命令
commandList.reduce(registerAction, program);

program.on('--help', function(){
  console.log('')
  console.log('Examples:');
  console.log('  $ zz-cli create reactapp -r');
  console.log('  $ zz-cli create vue2app -v2');
  console.log('  $ zz-cli create vue3app -v3');
});
program.parse(process.argv);
