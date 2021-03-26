import React,{useState} from 'react';
import './Dropdown.css'

export default function DropDown({dropdownData,setDropdownData}) {

  const [dropData, setdropData] = useState({
    dropData1:dropdownData.dropData1,
    dropData2:dropdownData.dropData2
  })
  

  function handleChange(event) {

    const { name, value } = event.target;

    setdropData(prevInfo => {
      return {
        ...prevInfo,
        [name]: value,
      };
    });

    setDropdownData(prevInfo => {
      return {
        ...prevInfo,
        [name]: value,
      };
    });
    
    
  }

  return (

    <div className="options">
    <select className="dropdown" name="dropData2" value={dropData.dropData2} onChange={handleChange}>
        <option value="INR">INR</option>
      </select>

      <select className="dropdown" name="dropData1" value={dropData.dropData1} onChange={handleChange}>
        <option value="BTC">BTC</option>
        <option value="ETH">ETH</option>
        <option value="USDT">USDT</option>
        <option value="XRP">XRP</option>
        <option value="TRX">TRX</option>
        <option value="DASH">DASH</option>
        <option value="ZEC">ZEC</option>
        <option value="XEM">XEM</option>
        <option value="IOST">IOST</option>

      </select>

    </div>
    
  );
}