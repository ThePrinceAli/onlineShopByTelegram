import React, { useEffect, useState } from 'react'
// import { axios } from './../node_modules/axios/dist/esm/axios';
import axios from 'axios';

const App = () => {
  const [products,setProducts]=useState([])
  useEffect(()=>{
    axios.get('http://localhost:4100').then(data=>setProducts(data)).catch(err=>console.log(err.message))
  },[])
   
  return (
    <div>
      {products.length?products.map((item,index)=>(
        <div>
          <h2>{item.title}</h2>
          <h2>{item.price}</h2>
          <h2>{item.definition}</h2>
        </div>
      )):'Loading'}
    </div>
  )
}

export default App