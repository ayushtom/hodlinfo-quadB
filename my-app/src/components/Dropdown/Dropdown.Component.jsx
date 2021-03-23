import React,{useState} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Form } from 'reactstrap';
import './Dropdown.css'

export default function DropDown(props) {

  var query=props.values;
  var divided=query.split("-");
  const [dropData, setdropData] = useState({
    dropData1:divided[0],
    dropData2:divided[1]
  })
  

  function handleChange(event) {

    const { name, value } = event.target;

    setdropData(prevInfo => {
      return {
        ...prevInfo,
        [name]: value,
      };
    });
    
    console.log(dropData);
    props.change(dropData.dropData1+"-"+dropData.dropData2)
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
      </select>

    </div>
    
  );
}