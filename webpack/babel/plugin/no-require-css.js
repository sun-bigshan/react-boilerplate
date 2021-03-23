/**
 * 删除代码中导入的 css
 */
module.exports = function () {
  console.log('no-require-css 执行');
  return {
    name: 'no-require-css',
    visitor: {
      ImportDeclaration(path) {
        let importFile = path.node.source.value;
        if (importFile.indexOf('.less') > -1) {
          //如果引入了 css 需要干掉
          path.remove();
        }
      }
    }
  };
};
