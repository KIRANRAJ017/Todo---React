import {Form} from "react-bootstrap"
import {useEffect, useState} from "react"
import "./todo.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {RiDeleteBin6Line} from "@react-icons/all-files/ri/RiDeleteBin6Line"
import {BiPencil} from "@react-icons/all-files/bi/BiPencil"
import {AiFillPlusCircle} from "@react-icons/all-files/ai/AiFillPlusCircle"
import { FaRegCheckCircle } from "react-icons/fa";
import img from "./bg.jpg"


function Todo()
{
    let arr;
    const[data,setdata]=useState("");
    const[ind,setind]=useState();
    const[bool,setbool]=useState(false);

    if(localStorage.getItem("task")===null)
    {
        arr=[];
    }
    else
    {
        arr=JSON.parse(localStorage.getItem("task"))
    }
    console.log(arr);

    const[list,setlist]=useState(arr);


    function handle(e)
    {
        e.preventDefault();
        if(!data || data.trim()==='')
        {
            return;
        }
        if(data.length>60)
        {
            toast.error('Limit Exceed');
            setdata("");
            return;
        }
        if(bool)
        {
            toast.success('Task updated successfully');
            setlist( pre=>pre.map((value,index)=>(index===ind?data:value)))
            setbool(false);
        }
        else
        {
            toast.success('Task added successfully');
            setlist((predata)=>[...predata,data]);
        }
        setdata("");   
    }
    

    function deleteitem(id)
    {
        setlist((list)=>list.filter((value,index)=>index!==id));
    }


    function updateitem(item,id)
    {
        setdata(item);
        setbool(true);
        setind(id);
    }


    function strikeit(e) {
        if (e.target.style.color === 'green') {
            e.target.style.color = 'black';
        } else {
            e.target.style.color = 'green';
        }
    }

    
    useEffect(()=>{
        localStorage.setItem("task",JSON.stringify(list))
    },[list]);
    
    return(
        <>
        <span className="logo"><span style={{fontSize:"32px",color:"#00b389"}}>T</span>odays Agenda .</span>
        <div className="whole">
            <div className="backimg">
                <img src={img} alt="backgound" className="img" />
            </div>
            <div className="todos">
                <h1 style={{textAlign:'center'}}>TODO's</h1>
                <div className="field">
                    {list.map((item,index)=>(
                        <div key={index} className="tasks">
                            <div style={{alignItems:"center"}}  className="comp">
                                <div className="comple">
                                    <FaRegCheckCircle onClick={(e)=>strikeit(e)} style={{marginTop:'5px'}}/>
                                    <text className="text">{item}</text>
                                </div>
                                <div className="comp1" >
                                <button  className="button1" onClick={()=>updateitem(item,index)} ><div className="icons"><BiPencil/></div></button>
                                <button  className="button1" onClick={()=>deleteitem(index)} ><div className="icons"><RiDeleteBin6Line/></div></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Form onSubmit={handle} className="form">
                    <div class="inputfield">
                        <div className="addbut">
                            <button className="plusbut" style={{background:"none"}}><AiFillPlusCircle className="plus"/></button>
                            <input type="text" value={data} onChange={(e)=>setdata(e.target.value)} class="form-control" placeholder="New Task" />        
                        </div>
                    </div>
                </Form>
            </div>
        </div>
        <ToastContainer/>
        </>
    )
            
}

export default Todo