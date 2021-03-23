const express = require("express");
const router = express.Router(); 
const fetch = require('node-fetch');

const { sequelize ,mainTable} = require('../models');

const Wazir = async (a,b) => {
    const name="WazirX"

    try{
        var response={}
        a=a.toLowerCase()
        b=b.toLowerCase()
        var url="https://api.wazirx.com/api/v2/tickers/";
        var btc={buy:parseInt(1),sell:parseInt(1),last:parseInt(1)}
        if(a=="iost")
        {
            var interResult=await fetch(url+"btcinr")
            var interRes=await interResult.json();
            let interArr = Object.keys(interRes);
            var interElement;
            for(var i=0;i<interArr.length;i++)
            {
                if(interArr[i]=='ticker')
                {
                    interElement= interRes[interArr[i]];
                }
            }

            btc={
                buy:parseFloat(interElement.buy),
                sell:parseFloat(interElement.sell),
                last:parseFloat(interElement.last)
            }
            console.log(btc);
            b="btc";

        }
        url="https://api.wazirx.com/api/v2/tickers/"+a+b;
        var results=await fetch(url)
        var res=await results.json();
        let arr = Object.keys(res);
        var element;
        for(var i=0;i<arr.length;i++)
        {
            if(arr[i]=='ticker')
            {
                element= res[arr[i]];
            }
        }

        var finalElement={
            buy:btc.buy*element.buy,
            sell:btc.sell*element.sell,
            last:btc.last*element.last
        }
        
        
        response={name:name,buy:parseFloat(finalElement.buy),sell:parseFloat(finalElement.sell),last:parseFloat(finalElement.last)}
        return response
    }

    catch(err){
        console.error("cant get response now from "+name);
        return null; 
    }

}

const giottus = async (a,b) => {
    const name="Giotus"

    try{
        var response={}
        a=a.toLowerCase()
        b=b.toLowerCase()

        const url="https://www.giottus.com/api/v2/ticker"
        var result=await fetch(url)
        var res=await result.json();
        let element;
        let arr = Object.keys(res);
        for(var i=0;i<arr.length;i++)
        {
            if(arr[i]=(a+b))
            {
                element=res[arr[i]];
            }
        }
       
        response={name:name,buy:parseInt(element.buy),sell:parseInt(element.sell),last:parseInt(element.last)}
        
        
        return response
    }

    catch(err){
        console.error("cant get response now from "+name);
        return null; 
    }

}
const coindcx = async (a,b) => {
    const name="CoinDCX"

    try{
        var response={}
        const url="https://api.coindcx.com/exchange/ticker"
        var btc={buy:parseInt(1),sell:parseInt(1),last:parseInt(1)}

        if(a=="IOST")
        {
            var interResult=await fetch(url)
            var interRes=await interResult.json();
            let interElement;
            
            for(var i=0;i<interRes.length;i++)
            {
                if(interRes[i].market==("BTCINR"))
                {
                    interElement=interRes[i];
                }
            }

            btc={
                buy:parseFloat(interElement.bid),
                sell:parseFloat(interElement.ask),
                last:parseFloat(interElement.last_price)
            }
            b="BTC"
        }
        var result=await fetch(url)
        var res=await result.json();
        let element;
        for(var i=0;i<res.length;i++)
        {
            if(res[i].market==(a+b))
            {
                element=res[i];
            }
        }

        var finalElement={
            buy:btc.buy*element.bid,
            sell:btc.sell*element.ask,
            last:btc.last*element.last_price
        }
        console.log(element);
        
        response={name:name,buy:parseFloat(finalElement.buy),sell:parseFloat(finalElement.sell),last:parseFloat(finalElement.last)}
       
        return response
    }
    catch(err){
        console.error("cant get response now from "+name);
        return null; 
    }

}

const colodax = async (a,b) => {
    const name="Colodax"

    try{
        var response={}
        const url="https://colodax.com/api/ticker"
        var results=await fetch(url) 
        var res=await results.json();
        let arr = Object.keys(res);
        let element
        for (let i = 0; i < arr.length; i++) {
            if(arr[i]==(a+"_"+b))
            {
                element=res[arr[i]];
            }
        }
        
        response={name:name,buy:parseInt(element.lowestAsk),sell:parseInt(element.highestBid),last:parseInt(element.last_price)};
      
        return response
    }

    catch(err){
        console.error("cant get response now from "+name);
        return null; 
    }

}

const bitbns = async (a,b) => {
    const name="Bitbns"

    try{
        var response={}
        const url="https://bitbns.com/order/getTickerWithVolume/"
        var results=await fetch(url) 
        var res=await results.json();
        let arr = Object.keys(res);
        let element
        for (let i = 0; i < arr.length; i++) {
            if(arr[i]==(a))
            {
                element=res[arr[i]];
            }
        }
        
        response={name:name,buy:parseInt(element.highest_buy_bid),sell:parseInt(element.lowest_sell_bid),last:parseInt(element.last_traded_price)};
      
        return response
    }

    catch(err){
        console.error("cant get response now from "+name);
        return null; 
    }

}

const getResult = async (a,b) => {
    var final_functions=[Wazir,giottus,coindcx,colodax,bitbns]
    var final_results=[]
    var lastTradePrice=[]
    var buy=[]
    var sell=[]
    var name=[]
    var difference=[]
    var savings=[]
    var avg_trading_price=0;
    var flag=0;
    for (let i = 0; i < final_functions.length; i++) {
        const element = await final_functions[i](a,b);

        if(element!=null)
        {
            buy[flag]=(element.buy).toFixed(2)
            sell[flag]=(element.sell).toFixed(2)
            name[flag]=(element.name)
            lastTradePrice[flag]=(element.last).toFixed(2)
            avg_trading_price=element.last+avg_trading_price
            flag+=1;
        }
    }
    // console.log(results[0]);
    avg_trading_price=avg_trading_price/(flag+1);
    for(var i=0;i<flag;i++)
    {
        difference[i]=(((lastTradePrice[i]-avg_trading_price)/avg_trading_price)*100).toFixed(2)
        savings[i]=(lastTradePrice[i]-avg_trading_price).toFixed(2)
        var object={
            name:name[i],
            buy:buy[i],
            sell:sell[i],
            last:lastTradePrice[i],
            difference:difference[i],
            savings:savings[i]
        }
        final_results.push(object)
    }
    return final_results
}

    router.get("/",async (req,res)=> {
        
        let query=req.query.search_type
        if(query==null){
            query="BTC-INR"
        }
        var s1=query.split("-")
        let result=await getResult(s1[0],s1[1]);
        const data=await mainTable.create({mainData:result,pair:query})
        console.log(result);
        res.json(result)
    })

module.exports = router;



