import React, { useState,useEffect } from 'react';

import DropDown from './components/Dropdown/Dropdown.Component';
import Logo from './components/Logo/Logo.Component'
import DataTable from './components/Table/DataTable.component'

import './App.css';

const axios = require('axios');

export default function App() {

  const [dropdownData,setDropdownData]=useState("BTC-INR")
  const [info, setInfo] = useState([])

  function changeDropState(value)
  {
    setDropdownData(value)

    console.log(dropdownData);

  }

  useEffect(() =>
  {
    axios.get('http://localhost:5000',{
      params: {
        search_type: dropdownData
      }
    })
    .then(function (response) {
      // handle success
      var res=response.data
      setInfo(res)
    })
    .catch(function (error) {
      // handle error
      console.log(error+"yay");
    })}, [dropdownData])

    useEffect(()=>
  {
    setTimeout(()=>{
      axios.get('http://localhost:5000',{
      params: {
        search_type: dropdownData
      }
    })
    .then(function (response) {
      // handle success
      var res=response.data
      setInfo(res)
    })
    .catch(function (error) {
      // handle error
      console.log(error+"yay");
    })

    console.log("yay")
    },60000);


  },[info])


  
  return (
    <div className="App container">
      <div className="row headerpart">
      <Logo className="col-4"/>
      <DropDown  values={dropdownData} change={changeDropState} className="col-4"/>
      <button type="button" className="btn telegram align-self-right col-4">Connect Telegram</button>
      </div>
      <DataTable values={info}/>
    </div>
  );
}

