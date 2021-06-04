import React, {useEffect, useState} from "react";
import TreeItem from "@material-ui/lab/TreeItem";


interface IDirectory {
  nodeId: string,
  label: string,
  nodeIds: Array<string>
}

const Directory: React.FC<IDirectory> = ({nodeId, label, nodeIds}) => {

  const [directories, setDirectories] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isOpenDirectory = nodeIds.includes(nodeId);

  useEffect(() => {
    if (isOpenDirectory) {
      setIsLoading(true);
      fetch(`http://164.90.161.80:3000/api/content?dirId=${nodeId}`,{
        mode: 'no-cors'
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Something went wrong');
          }
        })
        .then(
          (result) => {
            setIsLoading(false);
            setDirectories(result);
          },
          (error) => {
            setIsLoading(false);
            console.log(error)
          }
        )
    }
  }, [isOpenDirectory, nodeId])

  if (isLoading) {
    return <TreeItem nodeId={nodeId} label={label} />
  }

  const directoriesChildren = (directories && directories.children) || [];

  if (directoriesChildren.length === 0) {
    return <TreeItem nodeId={nodeId} label={label} />
  }

  return (
    <TreeItem nodeId={nodeId} label={label} >
      {
        directoriesChildren.map((child: {id: number, title: string, children: Array<any>}) => {
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
    </TreeItem>
  );
}

export default Directory;