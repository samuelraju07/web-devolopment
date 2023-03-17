import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import '../../Styles/Filter.css'
import SearchResult from './SearchResults'


export default function Filter() {
    const {pgNo}=useParams();
    const [restaurants,setRestaurants]=useState([]);

    const [filter,setFilter]=useState({
        cuisine:[],
        min_cost:'',
        max_cost:'',
        sort:1,
        city_id:""
    });
    useEffect(()=>{
        fetch(`http://localhost:7001/zomato/filters/${pgNo}`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(filter)
        })
        .then((response)=>response.json())
        .then((data)=>{
            setRestaurants(data.data);
        })
        console.log(`Filter 2 is ${filter.cuisine}`);
    },[filter]);
    
    const cuisineChange=(e)=>{
        if(e.target.checked){
            filter.cuisine.push(e.target.value);
        }
        else{
            var index=filter.cuisine.indexOf(e.target.value);
            if(index>-1){
                filter.cuisine.splice(index,1);
            }
        }
        setFilter({...filter});
        
    }
    const locationChange=(e)=>{
        filter.city_id=e.target.value;
        setFilter({...filter});
    }
    const costChange=(min_cost,max_cost)=>{
        filter.min_cost=min_cost;
        filter.max_cost=max_cost;
        setFilter({...filter});
    }
    const sortChange=(order)=>{
        filter.sort=order;
        setFilter({...filter});
    }

    console.log(`Filter is ${filter.max_cost}`);

    const searchResult=restaurants.length && restaurants.map((item)=><SearchResult key={item.name} item={item}></SearchResult>);
    

  return (
    <div>
        <div className="heading">Breakfast Places </div>
        <div className="small">
                  <div className="filter-options">
                      <div className="filter-heading">Filters</div>
                      <div className="Select-Location">Select Location</div>
                      <select className="Rectangle-2236"  onChange={(e)=>locationChange(e)}>
                          <option selected disabled>Select</option>
                          <option value='1'>Delhi</option>
                          <option value='2'>Mumbai</option>
                          <option value='3'>Pune</option>
                          <option value='4'>Banglore</option>
                          <option value='5'>Chandigarh</option>
                      </select>
                      <div className="Cuisine">Cuisine</div>
                      <div>
                          <input type="checkbox" value="North Indian" onChange={(e)=>cuisineChange(e)}/>
                          <span className="checkbox-items">North Indian</span>
                      </div>
                      <div>
                          <input type="checkbox" value="South Indian" onChange={(e)=>cuisineChange(e)}/>
                          <span className="checkbox-items">South Indian</span>
                      </div>
                      <div>
                          <input type="checkbox" value="Chinese" onChange={(e)=>cuisineChange(e)}/>
                          <span className="checkbox-items">Chinese</span>
                      </div>
                      <div>
                          <input type="checkbox" value="Fast Food" onChange={(e)=>cuisineChange(e)}/>
                          <span className="checkbox-items">Fast Food</span>
                      </div>
                      <div>
                          <input type="checkbox" value="Street Food" onChange={(e)=>cuisineChange(e)}/>
                          <span className="checkbox-items">Street Food</span>
                      </div>
                      <div className="Cuisine">Cost For Two</div>
                      <div>
                          <input type="radio" name='cost' onChange={()=>costChange(0,500)}/>
                          <span className="checkbox-items">Less than &#8377; 500</span>
                      </div>
                      <div>
                          <input type="radio" name='cost' onChange={()=>costChange(500,1000)}/>
                          <span className="checkbox-items">&#8377; 500 to &#8377; 1000</span>
                      </div>
                      <div>
                          <input type="radio" name='cost' onChange={()=>costChange(1000,1500)}/>
                          <span className="checkbox-items">&#8377; 1000 to &#8377; 1500</span>
                      </div>
                      <div>
                          <input type="radio" name='cost' onChange={()=>costChange(1500,2000)}/>
                          <span className="checkbox-items">&#8377; 1500 to &#8377; 2000</span>
                      </div>
                      <div>
                          <input type="radio" name='cost' onChange={()=>costChange(2000,75500)}/>
                          <span className="checkbox-items">&#8377; 2000 +</span>
                      </div>
                      <div className="Cuisine">Sort</div>
                      <div>
                          <input type="radio" name='sort' checked={filter.sort==1} onChange={()=>sortChange(1)}/>
                          <span className="checkbox-items">Price low to high</span>
                      </div>
                      <div>
                          <input type="radio" name='sort'checked={filter.sort==-1} onChange={()=>sortChange(-1)}/>
                          <span className="checkbox-items">Price high to low</span>
                      </div>
                  </div>
        </div>  
              <div className="big vertical">
                {searchResult}
             </div>     
             <div className="pagination">
                    <a className='page' href="#" onClick={(e)=>e.target.style.color='red'}>&laquo;</a>
                    <a className='page' onClick={(e)=>e.target.style.color='red'} href="http://localhost:3000/filters/1">1</a>
                    <a className='page' onClick={(e)=>e.target.style.color='red'} href="http://localhost:3000/filters/2">2</a>
                    <a className='page' onClick={(e)=>e.target.style.color='red'} href="http://localhost:3000/filters/3">3</a>
                    <a className='page' onClick={(e)=>e.target.style.color='red'} href="http://localhost:3000/filters/4">4</a>
                    <a className='page' onClick={(e)=>e.target.style.color='red'} href="http://localhost:3000/filters/5">5</a>
                    <a className='page' onClick={(e)=>e.target.style.color='red'} href="http://localhost:3000/filters/6">6</a>
                    <a className='page' onClick={(e)=>e.target.style.color='red'} href="#">&raquo;</a>
                </div>  
                <br/><br/>         
      </div>
  )
}
