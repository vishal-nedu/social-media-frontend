import React from 'react'
import { useEffect, useState } from 'react'

function Category({selectedCategory,setSelectedCategory}) {
  const handleclick = (id) => {
 

    if(selectedCategory === id)
    {
        setSelectedCategory(null);
        
    }
    else
    {
        setSelectedCategory(id);
      
    }

};
  const[category,setcategroy]=useState([]);
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_API_URL}/category`).
            then(data=>data.json())
            .then(res=>setcategroy(res))
            .catch(err=>console.log(err));
    },[])
  return (
    <div className='con'>
      {category.length>0 ?
        (<>
        <div><h1>content</h1></div>
        {category.map((category)=>(
        <div className='catl'><button className={
        selectedCategory === category.id
            ? "cat-btn active"
            : "cat-btn"
    } onClick={()=>handleclick(category.id)}>+{category.cat_name}</button></div>))}
        </>
      ):
        (
          <div>Loading</div>
        )}
    </div>
  )
}


export default Category