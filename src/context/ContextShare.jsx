import React, { createContext, useState } from 'react'


export const adduserdata = createContext()
export const addlapdta = createContext()
export const log = createContext()
function ContextShare({children}) {
       // ContextShare.js
const [userprefernce, setUserprefernce] = useState({});
const [userlapprefernce, setuserlapprefernce] = useState({});
const [logout,setLogout]= useState(false);


  return (
     <adduserdata.Provider value={{ userprefernce, setUserprefernce }}>
     <addlapdta.Provider value={{ userlapprefernce, setuserlapprefernce }}>
      <log.Provider value={[logout,setLogout]}>{children}</log.Provider>
       
     </addlapdta.Provider>
   </adduserdata.Provider>
  )
}

export default ContextShare