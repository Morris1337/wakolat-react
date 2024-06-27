import {useState, useEffect} from "react";

const api = 'google.com'

function fetchApi(par){

    const [fetchData, setFetchData] = useState()
    useEffect(() =>{
        fetch(api + par)
            .then((data)=>{
                return data.json()
            })
            .then((data)=>{
                setFetchData(data)
            })
    },par)

}