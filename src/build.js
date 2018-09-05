const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const babel = require('babel-core');
const colors = require('colors');
const util = require('./utils');

colors.enable = true;

colors.setTheme({
  编译: 'blue',
  写入: 'green',
  创建: 'green'
})

const root = process.cwd();

function compiler(src, output = 'dist') {
  src = path.join(src);
  const srcPath = path.join(root, src)
  const distPath = path.join(root, output);

  const srcStat = fs.statSync(srcPath);

  if (srcStat.isDirectory()) {
    // 目录
    fs.readdir(srcPath, (err, files) => {
      if (err) {
        util.log(err, 'error')
      }
      files.forEach((file) => {
        compiler(path.join(src, file), output)
      })
    })
  } else if (srcStat.isFile()) {
    // 文件
    buildFile(src, distPath)
  } else {
    throw `Error: ${srcPath} is not a directory or a file.`;
  }
}

function buildFile(filePath, distPath) {
  const absFile = path.join(root, filePath)
  util.log(`${absFile}`, '编译')
  babel.transformFile(absFile, {
    presets: ['env']
  }, (err, {code}) => {
    if (err) {
      util.log(err, 'error');
      return;
    }
    const toFile = path.join(distPath, filePath)
    const toDir = path.parse(toFile).dir;

    // 检查要编译到的目录是否存在，不存在就创建一个目录
    toDir.split(path.sep)
      .reduce((pre, next) => {
      const dir = path.join(pre, next)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
        util.log(`${dir}`, '创建')
      }
      return dir;
    })

    // 写入内容
    fs.writeFile(toFile, code, {
      encoding: 'utf8',
      flag: 'w'
    }, (err) => {
      if (err) {
        util.log(err, 'error');
        return;
      }
      util.log(toFile, '写入')
    })
  })
}

module.exports = compiler;
