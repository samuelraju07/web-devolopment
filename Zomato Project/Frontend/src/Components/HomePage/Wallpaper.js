import React, { Component } from 'react'
import MealType from './MealType'
import { Link } from 'react-router-dom';
export default class Wallpaper extends Component {

    constructor(){
        super();
        this.state={
            locations:[],
            restaurants:[]
        }
    }

    componentDidMount(){
        fetch('http://localhost:7001/zomato/locations',{method:'GET'})
        .then((response)=>response.json())
        .then((data)=>/*console.log(data)*/ this.setState({locations:data.data}) )
        
    }

    fetchRestaurants=(event)=>{
        fetch(`http://localhost:7001/zomato/restaurants/${event.target.value}`,{method:'GET'})
        .then((response)=>response.json())
        .then((data)=>{console.log(data);this.setState({restaurants:data.data}) })
    }

  render() {
    let DropDownList=this.state.locations.length && this.state.locations.map((item)=><option key={item.name} value={item.city_id} >{item.name}</option>)
    let restaurantsList= this.state.restaurants.length && <ul>
        {this.state.restaurants.map((item)=><li key={item.name} value={item.city}><Link to={`/details/${item.name}`}>{item.name}</Link></li>)}
    </ul>
    return (
        <div>
        <img src={'./assets/homepageimg.png'} width='100%' height='450' />

        <div className="logo">
            <p className="e">e!</p>
        </div>
        <div className="headings">
            Find the best restaurants, cafes, bars 
                </div>
        <div className="locationSelector">
            <select className="locationDropdown" onChange={this.fetchRestaurants}>
               <option value="0" disabled selected>Select</option>
               {DropDownList}
            </select>
            <div id="notebooks" >
                <input className="restaurantsinput" type="text" placeholder="Search Restaurant" />
                {restaurantsList}
            </div>
           
        </div>
    </div >
    )
  }
}
