import './past-order.css'
import React, { useState,useEffect } from 'react';
import eyeIcon from "../../assets/img/eyeicon.svg"
import Summary from "../Summary/summary";
import axios from "axios";
import search from "../../assets/img/searchicon.png";


function PastOrder() {
    const [headings, setheadings] = useState(["Order Id", "Order Date & Time", "Store Location", "City" ,"Store Phone","Total Items","Price","Status"," -- ", "view"]);
    let val=[{
        "orderId":"0123abc",
        "status":[
                {
                    "statusCode":"none",
                    "_id":{"$oid":"617ffb5abf998adcb2f1dcc3"}
                }
            ],
        "products":[
                {
                    "name":"jeans",
                    "quantity":5,
                    "serviseTypes":[],
                    "price":450,
                    "_id":{"$oid":"617ffb5abf998adcb2f1dcc4"}
                }
            ],
        "subtotal":480,
        "pickupCharge":90,
        "total":570,
        "dateTime":"2021-11-02T14:00:00.756Z",
        "deliveryAddress":{
                "streetAddress":"2nd lane st nagar",
                "state":"karnataka",
                "district":"banglore",
                "pincode":520014
            },
        "storeAddress":{
            "location":"banglore",
            "address":"4th street bl nagar",
            "phone":5246669,
            "district":"banglore",
            "state":"karnataka"
            },
        "__v":0
    },
    {
        "orderId":"0123abc",
        "status":[
                {
                    "statusCode":"none",
                    "_id":{"$oid":"617ffb5abf998adcb2f1dcc3"}
                }
            ],
        "products":[
                {
                    "name":"jeans",
                    "quantity":5,
                    "serviseTypes":[],
                    "price":450,
                    "_id":{"$oid":"617ffb5abf998adcb2f1dcc4"}
                }
            ],
        "subtotal":480,
        "pickupCharge":90,
        "total":570,
        "dateTime":"2021-11-02T14:00:00.756Z",
        "deliveryAddress":{
                "streetAddress":"2nd lane st nagar",
                "state":"karnataka",
                "district":"banglore",
                "pincode":520014
            },
        "storeAddress":{
            "location":"banglore",
            "address":"4th street bl nagar",
            "phone":5246669,
            "district":"banglore",
            "state":"karnataka"
            },
        "__v":0
    },
    {
        "orderId":"0123abc",
        "status":[
                {
                    "statusCode":"none",
                    "_id":{"$oid":"617ffb5abf998adcb2f1dcc3"}
                }
            ],
        "products":[
                {
                    "name":"jeans",
                    "quantity":5,
                    "serviseTypes":[],
                    "price":450,
                    "_id":{"$oid":"617ffb5abf998adcb2f1dcc4"}
                }
            ],
        "subtotal":480,
        "pickupCharge":90,
        "total":570,
        "dateTime":"2021-11-02T14:00:00.756Z",
        "deliveryAddress":{
                "streetAddress":"2nd lane st nagar",
                "state":"karnataka",
                "district":"banglore",
                "pincode":520014
            },
        "storeAddress":{
            "location":"banglore",
            "address":"4th street bl nagar",
            "phone":5246669,
            "district":"banglore",
            "state":"karnataka"
            },
        "__v":0
    }
    
    ]
    const [orders, setOrders] = useState(val);
    const [summary, setSummary] = useState(false);

    const getData=()=>{
        axios.get('http://localhost:3005/api/v1/order/orders')
        .then(function (response) {
            // this.setState({posts:response.data.posts.reverse()})
            console.log(response.data)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    useEffect(() => {
        getData()
      });
    

    return (
        <div>
            <div className="container">
                    <div className="headings">
                        <h3 style={{"float":"left" , "marginBottom":"3%"}}>Orders | {orders.length}</h3>
                    <div className="search">    
                        <button className="searchicon"  ><img src={search} alt="not found" width="14.5" height="14"/></button>
                        <input className="inputsearch"  type='search' />
                    </div>
                    </div>
                    <table className="table">
                        <thead className="table-dark">
                            <tr>
                                {headings.map((heading,index)=>{
                                    return(
                                        <th scope="col" key={index}>{heading}</th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>

                            {orders.map((order,index)=>{
                                return(
                                    <tr key={index} onClick={()=>{setSummary(true)}}>
                                        <th scope="row">{order.orderId}</th>
                                        <td>{order.dateTime}</td>
                                        <td>{order.storeAddress.address}</td>
                                        <td>{order.storeAddress.location}</td>
                                        <td>{order.storeAddress.phone}</td>
                                        <td>10</td>
                                        <td>{order.total}</td>
                                        <td>{order.status[0].statusCode}</td>
                                        <td> cancel </td>
                                        <td><img src={eyeIcon} alt="error" /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                     
                    
                </div>
            
            { summary && <Summary changeParentval={()=>{setSummary(false)}} />}
                
        </div>
      
    );
}

export default PastOrder;