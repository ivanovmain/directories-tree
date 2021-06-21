import express, {Request, Response} from 'express';
import { directoryTree } from "../directory-tree";
import _ from "lodash";

const tree = directoryTree("./root/");

const router = express.Router();

function findByProp(obj, propName, value) {
  let result;

  for (const p in obj) {
    if (obj[propName] == value) {
      if (Array.isArray(obj.children)) {
        console.log(obj.children)
        obj.children.forEach((c) => {
          if (c && c.children && Array.isArray(c.children)) {
            c.children.length = 0
          }
        })
      }
      return obj;
    } else {
      if (typeof obj[p] === 'object') {
        result = findByProp(obj[p], propName, value);
        if (result) {
          return result;
        }
      }
    }
  }
  return result;
}




router.get('/api/content/', (req: Request, res: Response) => {
  const id = req.query.dirId;
  console.log('dirID', id)
  const copyTree = _.cloneDeep(tree);
  let content;
  if (id) {
    content = findByProp(copyTree, "id", id);
  } else {
    content = findByProp(copyTree, "title", "root");
  }
  res.json(content )
})


export {router};