import './past-order.css'
import React, { useState,useEffect } from 'react';
import eyeIcon from "../../assets/img/eyeicon.svg"
import warningIcon from "../../assets/img/warning.svg"
import Summary from "../Summary/summary";
import axios from "axios";
import search from "../../assets/img/searchicon.png";
import { getToken } from "../../utils/authOperations";
import { Modal} from 'react-bootstrap';



function PastOrder() {
    const [headings, setheadings] = useState(["Order Id", "Order Date & Time", "Store Location", "City" ,"Store Phone","Total Items","Price","Status","  ", "view"]);
    
    const [orders, setOrders] = useState([]);
    const [summary, setSummary] = useState(false);
    const [orderIndex, setOrderIndex] = useState(0);
    const [cancelOrder, setCancelOrder] = useState(false);
    const [cancelOrderIndex, setcancelOrderIndex] = useState();
    const [wentWrong, setWentWrong] = useState(false)

    const getData=()=>{
        let token=getToken()
        let header={Authorization:"bearer "+token}
        axios.get('http://localhost:3005/api/v1/order/orders',{headers:header})
        .then(function (response) {
            // this.setState({posts:response.data.posts.reverse()})
            setOrders(response.data.order)
            console.log(response.data)
        })
        .catch(function (error) {
            setWentWrong(true)
            // handle error
            console.log(error);
        })
    }
    const cancelOrderfunc=()=>{
        let token=getToken()
        let header={Authorization:"bearer "+token}
        let body={
            id:orders[cancelOrderIndex]._id
        }
        
        axios.post('http://localhost:3005/api/v1/order/cancel',body,{headers:header})
        .then(function (response) {
            console.log(response)
            if(response.status===200){           
                console.log(response.data)
                getData()
            
            }
        })
        .catch(function (error) {
            setWentWrong(true)
            // handle error
            console.log(error);
        })
    }

    useEffect(() => {
        getData()
      },[]);
    

    return (
        <div>
            <div className="container">
                    { wentWrong && <div class="alert alert-warning alert-dismissable">
                    <button onClick={()=>{setWentWrong(false)}}  class="close" data-dismiss="alert" aria-label="close">×</button>
                    <strong>Something went wrong please try again!</strong>
                    </div>}
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
                                    <tr key={index} >
                                        <th scope="row">{order.orderId}</th>
                                        <td>{order.dateTime}</td>
                                        <td>{order.storeAddress.address}</td>
                                        <td>{order.storeAddress.location}</td>
                                        <td>{order.storeAddress.phone}</td>
                                        <td>{order.totalQuantity}</td>
                                        <td>{order.total}</td>
                                        <td>{(order.status.length===0)?"Ready to pickup":order.status[order.status.length-1].statusCode}</td>
                                        <td className="col-md-1" onClick={()=>{
                                                                                setcancelOrderIndex(index)
                                                                                setCancelOrder(true)
                                                                                }} > {(order.active)?<button className="table-cancel-btn">Cancel Order</button>:<span style={{marginLeft:"5px"}}>Cancelled</span>} </td>
                                        <td onClick={()=>{setSummary(true)
                                                                setOrderIndex(index)
                                                                setcancelOrderIndex(index)
                                                                }}><img src={eyeIcon} alt="error" /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                     
                    
                </div>
            
            { summary && <Summary pastOrder={true} order={orders[orderIndex]} changeParentval={()=>{setSummary(false)}} cancel={()=>{setCancelOrder(true)}} />}
            <Modal
                dialogClassName="modal-center"
                size="md"
                show={cancelOrder}
                onHide={() => setCancelOrder(false)}
                aria-labelledby="example-modal-sizes-title-sm"
                centered
            >
                <Modal.Header  className="cancel-modal-header">
                
                            <div className="cancel-modal-header-items">
                                <span className="header-span">Alert</span>
                                <div className="cancel-modal-close-button">
                                    <button className="close-button-inline header-span" onClick={()=>{
                                                                                            setCancelOrder(false)
                                                                                            }}>X</button>
                                </div>
                            </div>
                
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="cancel-modal-message">
                            <img className="warning-icon" src={warningIcon} alt="error" />
                            <div className="col-div-cancel">
                                <span>Are you sure want to cancel the</span>
                                <span>order No: {(cancelOrderIndex)?orders[cancelOrderIndex].orderId:"0"}</span>
                            </div>
                        </div>
                        <div>
                            <button className="proceed-btn" onClick={()=>{
                                                                            cancelOrderfunc()
                                                                            setCancelOrder(false)
                                                                            }}>Proceed</button>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
                
        </div>
      
    );
}

export default PastOrder;