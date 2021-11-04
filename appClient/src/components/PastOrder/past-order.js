import './past-order.css'
import React, { useState } from 'react';
import eyeIcon from "../../assets/img/eyeicon.svg"

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
    return (
        <div>
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
                            <tr key={index}>
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
      
    );
}

export default PastOrder;