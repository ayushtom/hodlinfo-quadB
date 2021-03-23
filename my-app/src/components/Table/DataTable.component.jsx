import React from 'react';
import { Table} from 'reactstrap';
import './DataTable.css'

export default function DataTable (props) {




  return (

    <Table dark className="table">
    <thead>
      <tr>
        <th>Sr. No.</th>
        <th>Platform</th>
        <th>Last Traded Price</th>
        <th>Buy/Sell Price</th>
        <th>Difference</th>
        <th>Savings</th>
      </tr>
      </thead>
      <tbody className="tableBody">
      {props.values.map((row,index)=>{
        return (
          <tr key={index}>
            <th>{index+1}</th>
            <td>{row.name}</td>
            <td className="number">₹ {row.last}</td>
            <td className="number">₹ {row.buy}/ ₹ {row.sell}</td>
            {row.difference>0 && <td  className="number"style={{color:'#5dc7c2'}}>{row.difference} %</td>}
            {row.difference<0 && <td  className="number"style={{color:'#da5757'}}>{row.difference} %</td>}
            {row.savings>0 && <td  className="number"style={{color:'#5dc7c2'}}>₹ {row.savings}</td>}
            {row.savings<0 && <td  className="number"style={{color:'#da5757'}}>₹ {row.savings}</td>}
          </tr>
        )
      })}
      </tbody>
    </Table>

  );
}
