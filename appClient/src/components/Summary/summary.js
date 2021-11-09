import './summary.css'
import React from "react";
import { Modal,Button,ProgressBar } from 'react-bootstrap';
import tick from "../../assets/img/tick.svg"
import { getToken, getUser } from "../../utils/authOperations";
import axios from "axios";

class Summary extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:true,
            addressSelected:0,
            storeAddressIndex:-1,
            user:{},
            addressForm:false,
            streetAddress:"",
            district:"",
            state:"",
            pincode:0,
            addressType:"",
            warning:false,
            address:(!this.props.pastOrder)?this.props.user.address:[]
        }
    }
    
    addAddress=()=>{
        let adrsObject={
            addressType:this.state.addressType,
            streetAddress:this.state.streetAddress,
            state:this.state.state,
            district:this.state.district,
            pincode:this.state.pincode,
        }
        console.log(adrsObject)
        let token=getToken()
        let header={Authorization:"bearer "+token}
        axios.post('http://localhost:3005/api/v1/user/newaddress',adrsObject,{headers:header})
        .then(function (response) {
            console.log(response)
            if(response.status===200){           
                console.log(response.data)
                this.setState({address:response.data.address})
                if(response.data.status==="success"){
                    this.setState({warning:true})
                }
            }
        }.bind(this))
        .catch(function (error) {
            // handle error
            console.log(error);
        })


        this.setState({addressForm:false})
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
        
        let token=getToken()
        let header={Authorization:"bearer "+token}
        let body={
            ...this.props.order,
            deliveryAddress:this.state.address[this.state.addressSelected],
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
                        {
                            this.state.warning &&
                            <div className="alert alert-primary" role="alert">
                                Address Added successfully
                            </div>
                        }
                        <div className="store-details">
                            <div>
                                <select id="storeLocationInputId" disabled={this.props.pastOrder} onClick={(event)=>{this.setState({storeAddressIndex:event.target.value})}} className="form-control form-select-style" aria-label="Default select example">
                                    { (!this.props.pastOrder) && <option value="-1" selected>Choose Store Location</option>}
                                    { (this.props.pastOrder) && <option value="-1"selected >{this.props.order.storeAddress.location}</option>}
                                    {storeAddress.map((addrs,index)=>{
                                        return(
                                            <option key={index} value={index}>{addrs.location}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="store-details-element">
                                <span className="style-bold">Phone:</span>
                                { (!this.props.pastOrder) && <span>{(this.state.storeAddressIndex<=-1)?"":storeAddress[this.state.storeAddressIndex].phone}</span>}
                                { (this.props.pastOrder) && <span>{this.props.order.storeAddress.phone}</span>}
                            </div>
                            <div className="store-details-element">
                                <span className="style-bold">Store Address:</span>
                                {(!this.props.pastOrder) && <span>{(this.state.storeAddressIndex<=-1)?"":storeAddress[this.state.storeAddressIndex].address}</span>}
                                {(this.props.pastOrder) && <span>{this.props.order.storeAddress.address}</span>}
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
                                {this.state.address.map((addr,index)=>{
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
                                <button className="add-new-btn" onClick={()=>{this.setState({addressForm:true})}}>ADD NEW</button>
                                <Modal
                                    show={this.state.addressForm}
                                    onHide={()=>{this.setState({addressForm:false})}}
                                    backdrop="static"
                                    keyboard={false}
                                    dialogClassName="form-modal"
                                    centered
                                >
                                    <Modal.Header closeButton>
                                    <Modal.Title>Add New Address</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form>
                                            <div className="form-group set-flex-start">
                                                <input value={this.state.addressType} onChange={(e)=>this.setState({addressType:e.target.value})} type="text" className="form-control custom-form-input"  placeholder="Address Type"/>
                                            </div>
                                            <div className="form-group set-flex-start">
                                                <input value={this.state.streetAddress} onChange={(e)=>this.setState({streetAddress:e.target.value})} type="text" className="form-control custom-form-input"  placeholder="Address"/>
                                            </div>
                                            <div className="w-100 form-group set-flex-start custom-select">
                                                <select value={this.state.district} onChange={(e)=>this.setState({district:e.target.value})}  class="w-100 form-select form-select-lg mb-3 custom-form-input w-100" aria-label=".form-select-lg example">
                                                <option selected>District</option>
                                                <option value="Thrissur">Thrissur</option>
                                                <option value="Visakhapatnam">Visakhapatnam</option>
                                                <option value="Bengaluru">Bengaluru </option>
                                                <option value="Chennai">Chennai</option>
                                                <option value="Coimbatore">Coimbatore</option>
                                                </select>
                                            </div>
                                            <div value={this.state.state} onChange={(e)=>this.setState({state:e.target.value})} className=" col-md-6 form-group set-flex-start custom-select">
                                                <select class="form-select form-select-lg mb-3 custom-form-input w-100" aria-label=".form-select-lg example">
                                                <option selected>State</option>
                                                <option value="Kerala">Kerala</option>
                                                <option value="Tamilnadu">Tamilnadu</option>
                                                <option value="Karnataka">Karnataka</option>
                                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 form-group set-flex-start">
                                                <input value={this.state.pincode} onChange={(e)=>this.setState({pincode:e.target.value})} type="number" className="form-control custom-form-input"  placeholder="Pincode"/>
                                            </div>
                                        </form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                    <Button  variant="secondary" onClick={()=>{this.setState({addressForm:false})}}>
                                        Close
                                    </Button>
                                    <Button disabled={
                                         !(this.state.streetAddress &&
                                         this.state.district &&
                                         this.state.state &&
                                         this.state.pincode &&
                                         this.state.addressType) 
                                    } 
                                                onClick={()=>{this.addAddress()}} variant="primary">Submit</Button>
                                    </Modal.Footer>
                                </Modal>
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
                        {(this.props.pastOrder && (this.props.order.status.length===0 && this.props.order.active)) && <button className="btn custom-btn-cancel" onClick={()=>{
                                                                                                                            this.setState({show:false})
                                                                                                                            this.props.cancel()
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

