// const createComponent = require("./commanderAction/createComponent"); // async
// const { test } = require('./commanderAction/test')
const action = require('./commanderAction/index.js');

const commandList = [
  {
    command: 'create <projectName>',
    description: 'create a new project',
    alias: 'c',
    options: [
      ['-r, --react', 'react template'],
      ['-v2, --vue2', 'vue2 template'],
      ['-v3, --vue3', 'vue3 template'],
    ],
    // action: action.create,
    action: require('./commanderAction/create'),
    examples: [
      '-r',
      '--react',
      '-v2',
      '--vue2',
      '-v3',
      '--vue3',
    ].map((v) => `create projectName ${v}`),
  },
  // {
  //   command: "create <filename>",
  //   description: "create component: vue react",
  //   alias: "cc",
  //   options: [],
  //   action: (filename) => createComponent(filename),
  // },
  // {
  //   command: "quicktype [file]",
  //   description: "quicktype transform ts interface",
  //   alias: "q",
  //   options: [],
  //   action: require("./commanderAction/quicktype").quicktype,
  // },
  {
    command: 'dict [word]',
    description: 'translate word',
    alias: 'd',
    options: [],
    action: require('./commanderAction/translate'),
  },
  {
    command: 'emoji',
    description: 'color emoji chars',
    alias: 'chr',
    options: [],
    // action: action.chars,
    action: require('./commanderAction/chars'),
  },
];

/**
 * 注册option
 * @param {Object} commander commander实例
 * @param {Object} option 每个命令配置对象
 * @returns commander
 */
const registerOption = (commander, option) => {
  return option && option.length ? commander.option(...option) : commander;
};

/**
 * 注册action
 * @param {Object} program program实例
 * @param {Object} commandItem 每个命令配置对象
 * @returns program
 */
const registerAction = (program, commandItem) => {
  const { command, description, alias, options, action } = commandItem;
  // console.log(command)
  const program_ = program
    .command(command) // 命令的名称
    .description(description) // 命令的描述
    .alias(alias); // undefined 没有
  // 循环options
  options && options.length && options.reduce(registerOption, program_);
  program_.action(action);
  return program;
};

module.exports = {
  commandList,
  registerAction,
};
