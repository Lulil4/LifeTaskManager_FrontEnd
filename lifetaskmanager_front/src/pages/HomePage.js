import { React, useState } from 'react'
import CrudFolders from '../components/CrudFolders';
import CrudTasks from '../components/CrudTasks';

const HomePage = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);
 
  return (
    <div className="App">
      {
        selectedFolder ?
          <><CrudTasks selectedFolder={selectedFolder} />
          <div className="centered"><button className="button is-primary" onClick={()=>{setSelectedFolder(null)}}>Back to folders</button></div></>
          : <CrudFolders setSelectedFolder={setSelectedFolder} />
          
      }
    </div>
  );
}

export default HomePage