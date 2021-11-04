import './summary.css'
import React from "react";
import { Modal,Button,ProgressBar } from 'react-bootstrap';
import tick from "../../assets/img/tick.svg"


class Summary extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:true,
            addressSelected:0
        }
    }
    
    render(){
        const pastOrder=true
        const address=[
            {
                "addressType":"Home",
                "streetAddress":"2nd lane st nagar",
                "state":"karnataka",
                "district":"banglore",
                "pincode":520014
            },
            {
                "addressType":"Other",
                "streetAddress":"2nd lane st nagar",
                "state":"karnataka",
                "district":"banglore",
                "pincode":520014
            }

        ]
        const values={
            "orderId":"0123abc",
            "status":[
                    {
                        "statusCode":"none",
                        "_id":{"$oid":"617ffb5abf998adcb2f1dcc3"}
                    },
                    {
                        "statusCode":"none",
                        "_id":{"$oid":"617ffb5abf998adcb2f1dcc3"}
                    },
                    {
                        "statusCode":"none",
                        "_id":{"$oid":"617ffb5abf998adcb2f1dcc3"}
                    }
                ],
            "products":[
                {
                    "name":"Shirt",
                    "quantity":3,
                    "serviseTypes":["Washing","Ironing"],
                    "price":20
                },
                {
                    "name":"Jeans",
                    "quantity":5,
                    "serviseTypes":["Washing"],
                    "price":30
                },
                {
                    "name":"Jogger",
                    "quantity":2,
                    "serviseTypes":["Chemical washing","Ironing"],
                    "price":25
                },
                {
                    "name":"Jogger",
                    "quantity":2,
                    "serviseTypes":["Chemical washing","Ironing"],
                    "price":25
                },
                {
                    "name":"Jogger",
                    "quantity":2,
                    "serviseTypes":["Chemical washing","Ironing"],
                    "price":25
                },
                {
                    "name":"Jogger",
                    "quantity":2,
                    "serviseTypes":["Chemical washing","Ironing"],
                    "price":25
                },
                {
                    "name":"Jogger",
                    "quantity":2,
                    "serviseTypes":["Chemical washing","Ironing"],
                    "price":25
                }
        
            ],
            "subtotal":350,
            "pickupCharge":90,
            "total":260,
            "dateTime":"2021-11-02T14:00:00.756Z",
            "deliveryAddress":{
                    "addressType":"Home",
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
            
        return(
            <div>
               <Button variant="primary" onClick={()=>{this.setState({show:true})}}>
                    Launch
                </Button>

                <Modal size="lg" dialogClassName="right_modal modal-dialog modal-content" show={this.state.show} onHide={()=>{this.setState({show:false})}}>
                    <Modal.Header className="model-header" >
                        <Modal.Title>
                            <h2>Summary</h2>
                            <div className="close-button">
                                <button className="close-button-inline" onClick={()=>{this.setState({show:false})}}>X</button>
                            </div>

                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-body" style={{
                                                                maxHeight: 'calc(100vh - 210px)',
                                                                overflowY: 'auto'
                                                                }}>
                        <div className="store-details">
                            <div>
                                <select className="form-select-style" aria-label="Default select example">
                                    <option >Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="store-details-element">
                                <span className="style-bold">Phone:</span>
                                <span>9567860449</span>
                            </div>
                            <div className="store-details-element">
                                <span className="style-bold">Store Address:</span>
                                <span>Near phone booth 10th road</span>
                            </div>
                        </div>
                        { pastOrder && 
                        <div className="order-status">
                            <div className="custom-row-container-first">
                                <div className="col">
                                    <div className="row">
                                    {(values.status.length>=1) ? <img src={tick} alt="error" /> : <span className="dot"></span> } 
                                        <span style={{fontSize: "small",marginLeft : "10px"}}>Picked Up</span>
                                    </div>
                                    { (values.status.length>=1) && <span style={{fontSize: "10px"}}>12-Oct-2021</span> }
                                </div>
                            </div>
                            <ProgressBar className="pro-bar" animated now={(values.status.length)*50} />
                            <div className="custom-row-container">
                                <div className="col m-1">
                                    <div className="row">
                                        {(values.status.length>=2) ? <img src={tick} alt="error" /> : <span className="dot"></span> } 
                                        <span style={{fontSize: "small",marginLeft : "10px"}}>Washed</span>
                                    </div>
                                    { (values.status.length>=2) && <span style={{fontSize: "10px"}}>12-Oct-2021</span> }
                                </div>
                            </div>
                            <ProgressBar className="pro-bar" animated now={(values.status.length<=2)? (values.status.length-1)*50 : 100 } />
                            <div className="custom-row-container">
                                <div className="col">
                                    <div className="row">
                                    {(values.status.length>=3) ? <img src={tick} alt="error" /> : <span className="dot"></span> } 
                                        <span style={{fontSize: "small",marginLeft : "10px"}}>Ironed</span>
                                    </div>
                                    { (values.status.length>=3) && <span style={{fontSize: "10px"}}>12-Oct-2021</span> }
                                </div>
                            </div>
                            <ProgressBar className="pro-bar" animated now={(values.status.length<=3)? (values.status.length-2)*50 : 100 } />
                            <div className="custom-row-container">
                                <div className="col">
                                    <div className="row">
                                    {(values.status.length>=4) ? <img src={tick} alt="error" /> : <span className="dot"></span> } 
                                        <span style={{fontSize: "small",marginLeft : "10px"}}>Delivered</span>
                                    </div>
                                    { (values.status.length>=4) && <span style={{fontSize: "10px"}}>12-Oct-2021</span> }
                                </div>
                            </div>
                        </div>
                        }
                        <div className="order-details">
                            <div className="order-details-heading">
                                <span>Order Details</span>
                            </div>
                            <table className="table">
                                <tbody>
                                    {values.products.map((product,index)=>{
                                        let washTypes=product.serviseTypes.join()
                                        return(
                                            <tr key={index}>
                                                <td>{product.name}</td>
                                                <td>{washTypes}</td>
                                                <td className="move-right style-bold"> {product.quantity}X{product.price} =</td>
                                                <td className="text-color style-bold"> {product.quantity*product.price} </td>
                                            </tr>
                                        )
                                    })}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td className="move-right">Sub total:</td>
                                        <td className="style-bold"> {values.subtotal} </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td className="move-right">Pickup Charges:</td>
                                        <td className="style-bold"> {values.pickupCharge} </td>
                                    </tr>
                                    <tr className="total-cost-row">
                                        <td></td>
                                        <td></td>
                                        <td className="move-right">Total:</td>
                                        <td> RS {values.total} </td>
                                    </tr>
                                    
                                </tbody>
                            </table>

                        </div>
                        <div className="address-choice-div">
                            <span>Address</span>
                            { !pastOrder && 
                            <div className="address-choice">
                                {address.map((addr,index)=>{
                                    return(
                                        <div className="p-2 card  custom-card col-md-4" onClick={()=>{this.setState({addressSelected:index})}}>
                                            <div className="p-0 m-0 card-body">
                                                {/* <h5 className="card-title">{addr.addressType}</h5> */}
                                                <div className="card-title">
                                                    <h5>{addr.addressType}</h5>
                                                    { index===this.state.addressSelected && <div className="tick-icon"> <img src={tick} alt="error" /> </div>}
                                                    
                                                </div>
                                                
                                                <p className="card-text">{addr.streetAddress},{addr.district},{addr.state},{addr.pincode}</p>
                                            </div>
                                        </div>

                                    )
                                })}
                            </div>
                            }
                            { pastOrder &&
                                <div className="address-choice">
                                    <div className="p-2 card  custom-card col-md-4">
                                        <div className="p-0 m-0 card-body">
                                            <div className="card-title">
                                                <h5>{values.deliveryAddress.addressType}</h5>
                                            </div>
                                            <p className="card-text">{values.deliveryAddress.streetAddress},{values.deliveryAddress.district},{values.deliveryAddress.state},{values.deliveryAddress.pincode}</p>
                                        </div>
                                    </div>
                                </div>
                            }
                            
                            
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {(pastOrder && values.status.length===0) && <button className="btn custom-btn-cancel" onClick={()=>{this.setState({show:false})}}>Cancel</button>}
                        {(!pastOrder) && <button className="btn custom-btn-confirm" onClick={()=>{this.setState({show:false})}}>Confirm</button>}
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default Summary

