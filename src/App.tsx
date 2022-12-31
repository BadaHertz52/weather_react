import React from 'react';
import { useDispatch ,useSelector } from 'react-redux';

function App () {
  const dispatch =useDispatch();
  const weather= useSelector((state) => state);


            
  return (
    <div className="App">
    </div>
  );
}
    
export default App;
