import './summary.css'
import React from "react";
import { Modal,Button,ProgressBar } from 'react-bootstrap';
import tick from "../../assets/img/tick.svg"
import { getToken } from "../../utils/authOperations";
import axios from "axios";

class Summary extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:true,
            addressSelected:0,
            storeAddressIndex:-1
        }
    }
    
    componentDidMount(){
        this.setState({show:true})
    }
    createOrder=()=>{
        const storeAddress=[
            {
                "location": "Banglore",
                "address" : "NG nagar",
                "phone" : 9567860449,
                "district" : "Banglore",
                "state" : "karnataka",
            },
            {
                "location": "Chennai",
                "address" : "2nd Street",
                "phone" : 9567860449,
                "district" : "Chennai",
                "state" : "Tamilnadu",
            }
        ]
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
        let token=getToken()
        console.log("here it is")
        let header={Authorization:"bearer "+token}
        let body={
            ...this.props.order,
            deliveryAddress:address[this.state.addressSelected],
            storeAddress:storeAddress[this.state.storeAddressIndex]
        }
        
        axios.post('http://localhost:3005/api/v1/order/create',body,{headers:header})
        .then(function (response) {
            console.log(response)
            if(response.status===200){           
                console.log(response.data)
            
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        this.setState({show:false})
        this.props.successModal()
        this.props.changeParentval()

    }

    render(){
        const storeAddress=[
            {
                "location": "Banglore",
                "address" : "NG nagar",
                "phone" : 9567860449,
                "district" : "Banglore",
                "state" : "karnataka",
            },
            {
                "location": "Chennai",
                "address" : "2nd Street",
                "phone" : 9567860449,
                "district" : "Chennai",
                "state" : "Tamilnadu",
            }
        ]
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
        
            
        return(
            
                <Modal size="lg" dialogClassName="right_modal modal-dialog modal-content" show={this.state.show} onHide={()=>{
                                                                                                                                this.setState({show:false})
                                                                                                                                this.props.changeParentval()
                                                                                                                                }}>
                    <Modal.Header className="model-header" >
                        <Modal.Title>
                            <h2>Summary</h2>
                            <div className="close-button">
                                <button className="close-button-inline" onClick={()=>{
                                                                                        this.setState({show:false})
                                                                                        this.props.changeParentval()
                                                                                        }}>X</button>
                            </div>

                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-body" style={{
                                                                maxHeight: 'calc(100vh - 210px)',
                                                                overflowY: 'auto'
                                                                }}>
                        <div className="store-details">
                            <div>
                                <select onClick={(event)=>{this.setState({storeAddressIndex:event.target.value})}} className="form-control form-select-style" aria-label="Default select example">
                                    <option value="-1" selected>Choose Store Location</option>
                                    {storeAddress.map((addrs,index)=>{
                                        return(
                                            <option key={index} value={index}>{addrs.location}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="store-details-element">
                                <span className="style-bold">Phone:</span>
                                <span>{(this.state.storeAddressIndex<=-1)?"":storeAddress[this.state.storeAddressIndex].phone}</span>
                                
                            </div>
                            <div className="store-details-element">
                                <span className="style-bold">Store Address:</span>
                                <span>{(this.state.storeAddressIndex<=-1)?"":storeAddress[this.state.storeAddressIndex].address}</span>
                            </div>
                        </div>
                        { this.props.pastOrder && 
                        <div className="order-status">
                            <div className="custom-row-container-first">
                                <div className="col">
                                    <div className="row">
                                    {(this.props.order.status.length>=1) ? <img src={tick} alt="error" /> : <span className="dot"></span> } 
                                        <span style={{fontSize: "small",marginLeft : "10px"}}>Picked Up</span>
                                    </div>
                                    { (this.props.order.status.length>=1) && <span style={{fontSize: "10px"}}>12-Oct-2021</span> }
                                </div>
                            </div>
                            <ProgressBar className="pro-bar" animated now={(this.props.order.status.length)*50} />
                            <div className="custom-row-container">
                                <div className="col m-1">
                                    <div className="row">
                                        {(this.props.order.status.length>=2) ? <img src={tick} alt="error" /> : <span className="dot"></span> } 
                                        <span style={{fontSize: "small",marginLeft : "10px"}}>Washed</span>
                                    </div>
                                    { (this.props.order.status.length>=2) && <span style={{fontSize: "10px"}}>12-Oct-2021</span> }
                                </div>
                            </div>
                            <ProgressBar className="pro-bar" animated now={(this.props.order.status.length<=2)? (this.props.order.status.length-1)*50 : 100 } />
                            <div className="custom-row-container">
                                <div className="col">
                                    <div className="row">
                                    {(this.props.order.status.length>=3) ? <img src={tick} alt="error" /> : <span className="dot"></span> } 
                                        <span style={{fontSize: "small",marginLeft : "10px"}}>Ironed</span>
                                    </div>
                                    { (this.props.order.status.length>=3) && <span style={{fontSize: "10px"}}>12-Oct-2021</span> }
                                </div>
                            </div>
                            <ProgressBar className="pro-bar" animated now={(this.props.order.status.length<=3)? (this.props.order.status.length-2)*50 : 100 } />
                            <div className="custom-row-container">
                                <div className="col">
                                    <div className="row">
                                    {(this.props.order.status.length>=4) ? <img src={tick} alt="error" /> : <span className="dot"></span> } 
                                        <span style={{fontSize: "small",marginLeft : "10px"}}>Delivered</span>
                                    </div>
                                    { (this.props.order.status.length>=4) && <span style={{fontSize: "10px"}}>12-Oct-2021</span> }
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
                                    {this.props.order.products.map((product,index)=>{
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
                                        <td className="style-bold"> {this.props.order.subtotal} </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td className="move-right">Pickup Charges:</td>
                                        <td className="style-bold"> {this.props.order.pickupCharge} </td>
                                    </tr>
                                    <tr className="total-cost-row">
                                        <td></td>
                                        <td></td>
                                        <td className="move-right">Total:</td>
                                        <td> RS {this.props.order.total} </td>
                                    </tr>
                                    
                                </tbody>
                            </table>

                        </div>
                        <div className="address-choice-div">
                            <div className="align-left">
                                <span>Address</span>
                            </div>
                            
                            { !this.props.pastOrder && 
                            <div className="address-choice">
                                {address.map((addr,index)=>{
                                    return(
                                        <div key={index} className="p-2 card  custom-card col-md-4" onClick={()=>{this.setState({addressSelected:index})}}>
                                            <div className="p-0 m-0 card-body">
                                                {/* <h5 className="card-title">{addr.addressType}</h5> */}
                                                <div className="card-title">
                                                    <h5>{addr.addressType}</h5>
                                                    { index===this.state.addressSelected && <div className="tick-icon"> <img src={tick} alt="error" /> </div>}
                                                    
                                                </div>
                                                
                                                <p className="card-text align-left">{addr.streetAddress},{addr.district},{addr.state},{addr.pincode}</p>
                                            </div>
                                        </div>

                                    )
                                })}
                            </div>
                            }
                            { this.props.pastOrder &&
                                <div className="address-choice">
                                    <div className="p-2 card  custom-card col-md-4">
                                        <div className="p-0 m-0 card-body">
                                            <div className="card-title">
                                                <h5>{this.props.order.deliveryAddress.addressType}</h5>
                                            </div>
                                            <p className="card-text align-left">{this.props.order.deliveryAddress.streetAddress},{this.props.order.deliveryAddress.district},{this.props.order.deliveryAddress.state},{this.props.order.deliveryAddress.pincode}</p>
                                        </div>
                                    </div>
                                </div>
                            }
                            
                            
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {(this.props.pastOrder && this.props.order.status.length===0) && <button className="btn custom-btn-cancel" onClick={()=>{
                                                                                                                            this.setState({show:false})
                                                                                                                            this.props.changeParentval()
                                                                                                                            }}>Cancel</button>}
                        {(!this.props.pastOrder) && <button disabled={(this.state.storeAddressIndex<=-1)} className="btn custom-btn-confirm" onClick={()=>{
                                                                                                    this.createOrder()
                                                                                                }}>Confirm</button>}
                    </Modal.Footer>
                </Modal>
                
            
                                                                                                
        );
    }
}
export default Summary

