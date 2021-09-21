import fs from 'fs';
import path from 'path';
import download from 'download-git-repo';
import handlebars from 'handlebars';
import inquirer from 'inquirer';
// 下载美化使用
import ora from 'ora';
// import('ora').then((res) => { // commonjs import es6
//     console.log(111,res)
// })
import chalk from 'chalk';
import symbols from 'log-symbols';

const downloadGitRepoOptions = {
  clone: true,
};
// If true use git clone instead of an http download.
// While this can be a bit slower, it does allow private repositories to be used if the appropriate SSH keys are setup.
// https://www.npmjs.com/package/download-git-repo
// GitHub - github:owner/name or simply owner/name
// GitLab - gitlab:owner/name
// Bitbucket - bitbucket:owner/name
// [github/gitlab/Bitbucket]:[账户名]/[仓库名] username/repo github:username/repo
// download('https://github.com:[用户名]/[仓库名]#master', name, {clone: true}, err => {})
// download('https://github.com:[用户名]/[仓库名]', name, {clone: true}, err => {})
// direct:https://github.com.cn/[用户名]/[仓库名]
// direct:http://192.168.10.10/username/repo.git

const urlConfig = {
  react: 'GetKnowledgeByGitHub/vite?react',
  vue2: 'GetKnowledgeByGitHub/vite?vue2',
  vue3: 'direct:https://github.com/GetKnowledgeByGitHub/vite',
};
let tplUrl = urlConfig['vue3'];

// //zz create test -r
// //zz create test -v3 -r ?
function create(...args) {
  let [projectName, options] = args;
  // console.log('create', projectName, options);
  if (!fs.existsSync(projectName)) {
    if (options.react) {
      tplUrl = urlConfig['react'];
    }
    if (options.vue2) {
      tplUrl = urlConfig['vue2'];
    }
    inquirer
      .prompt([
        // {
        //   type: "list",
        //   name: "frameTemplate",
        //   message: "请选择框架类型",
        //   choices: ["Vue3", "Vue2", "React"],
        // },
        {
          name: 'description',
          message: '请输入项目描述',
          default: 'project description',
        },
        {
          name: 'author',
          message: '请输入作者名称',
          default: 'xxx',
        },
      ])
      .then((answers) => {
        // console.log(answers);
        const spinner = ora('正在下载模板...');
        spinner.start();
        // 下载模板
        download(tplUrl, projectName, downloadGitRepoOptions, (err) => {
          if (err) {
            spinner.fail('模板下载失败');
            // errLog(err);
            console.log(symbols.error, chalk.red(err));
          } else {
            spinner.succeed('模板下载成功');
            // successLog("项目初始化完成");
            const fileName = `${projectName}/package.json`;
            const meta = {
              projectName,
              description: answers.description,
              author: answers.author,
            };
            // 编译传进来的用户输入的交互参数
            if (fs.existsSync(fileName)) {
              const content = fs.readFileSync(fileName).toString();
              const result = handlebars.compile(content)(meta);
              fs.writeFileSync(fileName, result);
            }
            console.log(symbols.success, chalk.green('项目初始化完成'));
          }
        });
      });
  } else {
    // 错误提示项目已存在，避免覆盖原有项目
    console.log(symbols.error, chalk.red('项目已存在'));
  }
}

export default create;
