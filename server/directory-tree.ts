const FS = require('fs');
const PATH = require('path');
const constants = {
  DIRECTORY: 'directory',
  FILE: 'file'
}

let ID: number = 0;

function safeReadDirSync (path: string) {
  let dirData = {};
  try {
    dirData = FS.readdirSync(path);
  } catch(ex) {
    if (ex.code == "EACCES" || ex.code == "EPERM") {
      return null;
    }
    else throw ex;
  }
  return dirData;
}


function directoryTree (path: string) {
  const title = PATH.basename(path);
  const item: any = { path, title };
  let stats: any;

  try { stats = FS.statSync(path); }
  catch (e) { return null; }

  if (stats.isFile()) {

    const ext = PATH.extname(path).toLowerCase();


    item.size = stats.size;
    item.extension = ext;
    item.type = constants.FILE;
    item.id = ID++;

  }
  else if (stats.isDirectory()) {
    let dirData: any = safeReadDirSync(path);
    if (dirData === null) return null;

    item.children = dirData
      .map(child => directoryTree(PATH.join(path, child)))
      .filter(e => !!e);
    item.size = item.children.reduce((prev, cur) => prev + cur.size, 0);
    item.type = constants.DIRECTORY;
    item.id = ID++;
  } else {
    return null;
  }
  return item;
}

export {directoryTree}