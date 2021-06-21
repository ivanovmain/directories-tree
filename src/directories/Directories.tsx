import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Directory from "../directory";

type DirectoriesType = {
  id: number,
  title: string,
  children?: Array<DirectoriesType>
}


const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const Directories: React.FC = () => {

  const [directories, setDirectories] = useState<DirectoriesType>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nodeIds, setNodeids] = useState<Array<string>>([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/api/content")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then(
        (result: DirectoriesType) => {
          setIsLoading(false);
          setDirectories(result);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      )
      .catch((reason) => {
        console.log('reason', reason)
      })
  }, [])

  const handleToggle = (e: object, nodeIds: Array<string>) => {
    setNodeids((prevState => {
      const idx = prevState.findIndex((id) => id === nodeIds[0]);
      let newArr: Array<string> = [];
      if (idx >= 0) {
        newArr = prevState.filter((id) => id !== nodeIds[0]);
      } else if (idx === -1) {
        newArr = [...prevState, ...nodeIds];
      }
      return newArr;
    }));
  }

  const classes = useStyles();

  if (isLoading) {
    return <CircularProgress size={40} color="secondary"/>
  }
  if (error) {
    return <Typography variant="h5" color="secondary">Возникла ошибка загрузки данных...</Typography>
  }

  const directoriesChildren = directories && directories.children || [];
  if (directoriesChildren.length === 0) {
    return null;
  }

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeSelect={handleToggle}
      expanded={nodeIds}
      multiSelect
    >
      {
        directoriesChildren.map((child: DirectoriesType) => {
          return (
            <Directory
              key={child.id}
              nodeId={String(child.id)}
              label={child.title}
              nodeIds={nodeIds}
            />
          );
        })
      }
    </TreeView>
  );
}

export default Directories;