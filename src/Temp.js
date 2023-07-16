import React, { useEffect, useState } from "react";
import Weathercard from "./Weathercard";
import "./Style.css";
const Temp=()=>
{
    const [searchValue,setSearchValue]=useState("");
    const[tempInfo,setTempInfo]=useState({});

    const getWheatherInfo=async()=>{
        try{
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}
            &units=metric&appid=714a9c50c2507dfaf09ce49347e7a2e0`;
        
        let res= await fetch(url);
        let data=await res.json();
        const {temp,humidity,pressure}=data.main;
        const{main:weathermood}=data.weather[0];
        const{name}=data;
        const{speed}=data.wind;
        const{country,sunset}=data.sys;

        const myNewWeatherInfo={
            temp,
            humidity,
            pressure,
            weathermood,
            name,country,
            speed,
            sunset,
        };
            setTempInfo(myNewWeatherInfo);
        
        
        }catch(error){
            console.log(error);
        }
    };
    useEffect(()=>
    {
        getWheatherInfo();
    },[]);
    return(
        <>
        <div className="wrap">
            <div className="Search">
                <input type="search" placeholder="search" autoFocus id="search" className="searchTerm" value={searchValue}
                onChange={(e)=>setSearchValue(e.target.value)}/>

                <button className="searchButton" type="button" onClick={getWheatherInfo}>Search</button>
            </div>
        </div>

        <Weathercard tempInfo={tempInfo}/>
        </>
    )
}
export default Temp;