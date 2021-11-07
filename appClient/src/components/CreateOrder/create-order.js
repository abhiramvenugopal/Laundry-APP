import React,{ useState,useEffect} from 'react'
import axios from 'axios'
import './create-order.css';
import wash from "../../assets/img/washing-machine.svg";
import iron from "../../assets/img/ironing.svg";
import towel from "../../assets/img/towel.svg";
import packing from "../../assets/img/bleach.svg";
import shirt from "../../assets/img/shirt.jpg";
import tshirt from "../../assets/img/tshirt.jpg";
import trousers from "../../assets/img/trousers.jpg";
import jeans from "../../assets/img/jeans.jpg";
import boxers from "../../assets/img/boxers.jpg";
import joggers from "../../assets/img/joggers.jpg";
import others from "../../assets/img/others.jpg";
import search from "../../assets/img/searchicon.png";
import home from "../../assets/img/home.svg";
import list from "../../assets/img/list.svg";
import more from "../../assets/img/more.svg";
import bluewash from "../../assets/img/blue-wash.svg"
import blueiron from "../../assets/img/blue-iron.svg"
import bluepack from "../../assets/img/blue-bleach.svg"
import bluetowel from '../../assets/img/bluetowel.svg'
import trademark from '../../assets/img/trademark.svg'
import Summary from '../Summary/summary'
import PastOrder from "../PastOrder/past-order";
import { Modal} from 'react-bootstrap';
import tick from "../../assets/img/tick.svg"


function CreateOrder(){   
    const icons=[shirt,tshirt,trousers,jeans,boxers,joggers,others] 
    const types=['Shirt','Tshirt','Trousers','Jeans','Boxers','Joggers','Others']
    const [costs,setCosts]=useState([[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]])
    const [color,setColor]=useState(['black','black','black','black','black','black','black'])
    const [image,setImage]=useState([[wash,iron,towel,packing],[wash,iron,towel,packing],[wash,iron,towel,packing],[wash,iron,towel,packing],[wash,iron,towel,packing],[wash,iron,towel,packing],[wash,iron,towel,packing]])
    const [summary, setSummary] = useState(false);
    const [products,setProducts]=useState([])
    const [orders, setOrders] = useState({});
    const [active, setActive] = useState("create");
    const [create, setCreate] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        axios({
            url:'http://localhost:3005/api/v1/product/products',
            method:"GET"
        })
        .then(res=>{
            setTimeout(() => {
                setProducts(Object.values(res.data.products))
                console.log('timeout',Object.values(res.data.products))
            }, 100);
        })
        .catch(err=>{console.log('err')})
    },[])

const handleSubmit=()=>{
    var products=[]
    var finalcost=0
    for(let i=0; i<costs.length;i++){
        var total=0
        var service=[]
        var totalQuantity=0
        if(costs[i][0]>0 && costs[i][1]>0){
            totalQuantity+=costs[i][0]
            total+=costs[i][0]*costs[i][1]
            finalcost+=total
            if(costs[i][2]!==0){
                service.push('washing')
            }
            if(costs[i][3]!==0){
                service.push('ironing')
            }
            if(costs[i][4]!==0){
                service.push('folding')
            }
            if(costs[i][5]!==0){
                service.push('packing')
            }
            products.push({
                "name":types[i],
                "quantity":costs[i][0],
                "serviseTypes":service,
                "price":costs[i][1]

            })
        }
    }
    setOrders({
        "status":[],
        "products":products,
        "subtotal":finalcost,
        "pickupCharge":90,
        "total":finalcost+90,
        "totalQuantity":totalQuantity
    })   
    console.log(orders)
    setSummary(true)

}

const handlereset=(e)=>{
    const amount=[...costs]
    const changeColor=[...color]
    const images=[...image]
    amount[e.target.name]=[0,0,0,0,0,0]
    changeColor[e.target.name]='black'
    images[e.target.name]=[wash,iron,towel,packing]
    setCosts(amount)
    setColor(changeColor)
    setImage(images)

}
const handleCancle=()=>{
    const amount=[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]
    setCosts(amount)
    setColor(['black','black','black','black','black','black','black'])
    setImage([[wash,iron,towel,packing],[wash,iron,towel,packing],[wash,iron,towel,packing],[wash,iron,towel,packing],[wash,iron,towel,packing],[wash,iron,towel,packing],[wash,iron,towel,packing]])
    
}

const handleWash=(e)=>{
    const arr=[...costs]
    const changeColor=[...color]
    const images=[...image]
    if (!arr[e.target.name][2]){
        arr[e.target.name][1]+=products[0].wash
        arr[e.target.name][2]=1
        setCosts(arr)
    } 
    else{ 
        arr[e.target.name][1]-=products[0].wash
        arr[e.target.name][2]=0
        setCosts(arr)
    }
    if(arr[e.target.name][2]){
        changeColor[e.target.name]='#5861AE'
        setColor(changeColor)
        images[e.target.name][0]=bluewash
        setImage(images)
    }
    else{
        changeColor[e.target.name]='black'
        images[e.target.name][0]=wash
        setImage(images)
        setColor(changeColor) 
    }
}
const handleFold=(e)=>{
    const changeColor=[...color]
    const arr=[...costs]
    const images=[...image]
    if (!arr[e.target.name][3]){
        arr[e.target.name][1]+=products[0].fold
        arr[e.target.name][3]=1
        setCosts(arr)
    } 
    else{ 
        arr[e.target.name][3]=0
        arr[e.target.name][1]-=products[0].fold
        setCosts(arr)
    }
    if(arr[e.target.name][3]){
        changeColor[e.target.name]='#5861AE'
        images[e.target.name][1]=blueiron
        setImage(images)
        setColor(changeColor)
    }
    else{
        changeColor[e.target.name]='black'
        setColor(changeColor) 
        images[e.target.name][1]=iron
        setImage(images)
    }
}
const handlePress=(e)=>{
    const changeColor=[...color]
    const arr=[...costs]
    const images=[...image]
    console.log(e.target.name,arr)
    if (!arr[e.target.name][4]){
        arr[e.target.name][1]+=products[0].press
        arr[e.target.name][4]=1
        setCosts(arr)
    } 
    else{ 
        arr[e.target.name][4]=0
        arr[e.target.name][1]-=products[0].press
        setCosts(arr)
    }
    if(arr[e.target.name][4]){
        changeColor[e.target.name]='#5861AE'
        images[e.target.name][2]=bluetowel
        setImage(images)
        setColor(changeColor)
    }
    else{
        changeColor[e.target.name]='black'
        setColor(changeColor) 
        images[e.target.name][2]=towel
        setImage(images)
    }
}
const handdlePack=(e)=>{
    const changeColor=[...color]
    const arr=[...costs]
    const images=[...image]
    console.log(e.target.name,arr)
    if (!arr[e.target.name][5]){
        arr[e.target.name][1]+=products[0].pack
        arr[e.target.name][5]=1
        setCosts(arr)
    } 
    else{ 
        arr[e.target.name][5]=0
        arr[e.target.name][1]-=products[0].pack
        setCosts(arr)
    }
    if(arr[e.target.name][5]){
        changeColor[e.target.name]='#5861AE'
        setColor(changeColor)
        images[e.target.name][3]=bluepack
        setImage(images)
    }
    else{
        changeColor[e.target.name]='black'
        setColor(changeColor)
        images[e.target.name][3]=packing
        setImage(images) 
    }
}
const handleQuantity=(e)=>{
    const arr=[...costs]
    const changeColor=[...color]
    arr[e.target.name][0]=e.target.value
    setCosts(arr)
    if(arr[e.target.name][0]){
        changeColor[e.target.name]='#5861AE'
        setColor(changeColor)
    }
    else{
        changeColor[e.target.name]='black'
        setColor(changeColor) 
    }
    
}
    return(
        <div>
            <div className="sidebar">
                <a href="/"><img src={home}alt="home"></img></a>
                <a onClick={()=>{setActive("create")}} className={(active==="create")? "active": " "}><img src={more}alt="home"></img></a>
                <a onClick={()=>{setActive("past")}} className={(active==="past")? "active": " "} ><img src={list}alt="home"></img></a>
            </div>
            { active==="create" &&
            <div>
            { create===false &&  <div className="create-order-btn-div" > <button className="create-order-btn" onClick={()=>{setCreate(true)}}> create </button></div> }

            { create && <div>
                <div className="container">
                    <div className="headings">
                        <h3 style={{"float":"left" , "marginBottom":"3%"}}>Create Order</h3>
                    <div className="search">    
                        <button className="searchicon"  ><img src={search} alt="not found" width="14.5" height="14"/></button>
                        <input className="inputsearch"  type='search' />
                    </div>
                    </div>
                    <table className="table table-hover container-table">
                        <thead className="table-dark thead table-head">
                            <tr>
                                <th scope="col">Product Types</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">WashType</th>
                                <th scope="col">Price</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody  className="table-body">
                            {Object.values(products).map((each,ind)=>{
                                return(            
                                    <tr>
                                        <th className="trow"  scope="row">
                                            <td className="productname">
                                                <div>
                                                    <img src={icons[ind]} alt="img"  width="45" height="45" ></img>
                                                </div>
                                                <div className="productdetails"  >
                                                    <p style={{"color":color[ind]}}>{each.productType}</p>
                                                    <p  style={{"fontSize":"10px"}}>{each.description}</p>
                                                </div>
                                            </td>
                                        </th>
                                        <th scope="row"><td><input onChange={handleQuantity} className="Quantity" type="number"  min="1" name={ind}></input></td></th>
                                        <th scope="row">
                                        <td><div className="imagescolumn">
                                            <img onClick={handleWash} style={{"color":color[ind]}}   src={image[ind][0]} alt="img" name={ind}></img>
                                            <img onClick={handleFold}   className="img" src={image[ind][1]} alt="img"   name={ind} ></img>
                                            <img onClick={handlePress}  className="img" src={image[ind][2]} alt="img"  name={ind} ></img>
                                            <img onClick={handdlePack}  className="img" src={image[ind][3]} alt="img"  name={ind}></img>
                                        </div>
                                        </td>
                                        </th>
                                            
                                            <th scope="row"><td className={(costs[ind][1]>0?"display":"hide")} >{costs[ind][0]}x{costs[ind][1]}=<b style={{color:'#5861AE'}}>{costs[ind][0]*costs[ind][1]}</b></td>
                                            <td className={(costs[ind][1]>0?"hide":"display")}>--</td></th>
                                        <th scope="row">
                                            <button name={ind} onClick={handlereset} type="submit" className={(costs[ind][1]>0 ? " btn btn-outline-primary button":"hide" )}>reset</button>
                                            <td></td>
                                        </th>
                                    </tr>
                                )
                            })}
                            </tbody>
                            
                    </table>  
                    <div className={((costs[0][0]) && costs[0][1]) || (costs[1][0] && costs[1][1])||(costs[2][0] && costs[2][1])||(costs[3][0] && costs[3][1])||(costs[4][0] && costs[4][1])|| (costs[5][0] && costs[5][1])?"buttons":"hidebuttons" }>
                                <button onClick={handleCancle}  className="btn btn-outline-primary cancel button">cancel</button>
                                <button type="button" onClick={handleSubmit} className="btn btn-primary proceed button" >proceed</button>
                            </div>
                </div>
            </div> }
            </div>}
            {
                active==="past" && <PastOrder/>
            }
            { summary && <Summary successModal={()=>{setSuccess(true)}} pastOrder={false} order={orders} changeParentval={()=>{setSummary(false)}} />}
            <nav className="navbar navbar-inverse fixed-bottom ">
                <p className="navbar-brand bottomnavbar" style={{'textAlign':"center",'width':"100%",'margin':"0px"}} >2021 ©  Laundry</p>
            </nav>
                <Modal
                    dialogClassName="modal-center"
                    size="md"
                    show={success}
                    onHide={() => setSuccess(false)}
                    aria-labelledby="example-modal-sizes-title-sm"
                    centered
                >
                    <Modal.Header>
                    <Modal.Title id="example-modal-sizes-title-sm">
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <img className="success-icon" src={tick} alt="error" />
                        </div>
                        <div className="success-message">
                            <span>Your Order is </span>
                            <span>Successfull</span>
                        </div>
                        <div className="success-message-two">
                            <span>You can track the delivery in the</span>
                            <span>"Orders" section</span>
                        </div>
                        <div>
                            <button onClick={()=>{
                                setSuccess(false)
                                setActive("past")

                            }} className="success-modal-button">Go to orders</button>
                        </div>
                    </Modal.Body>
                </Modal>
        </div>
    )
}
export default CreateOrder