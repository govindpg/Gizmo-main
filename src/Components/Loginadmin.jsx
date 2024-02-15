import React, { useContext, useState } from 'react'
import {Card,Input,Button, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import { Col, Row } from 'react-bootstrap';
import { AdminApi } from '../services/allapi';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { log } from '../context/ContextShare';

function Loginadmin() {

  const naviagtion = useNavigate()
  const [logout,setLogout]= useContext(log);

  const [cred,Setcred]=useState({
  
    email  :"",
    password:""
  })

 

  const adminvalidate = async (e) => {
    e.preventDefault();
  
    const { email, password } = cred;
  
    if (!email || !password) {
      toast.error ('Please enter login credentials');
    } else {
      try {
        const result = await AdminApi(cred);
  
        if (result.status === 200) {
          sessionStorage.setItem('id',cred.password)
          setLogout(true)
          toast.success('Login successful');
          
          naviagtion('/admin')
         


        } else {
          toast.warning('Wrong email or password');
          console.error(result);
        }
      } catch (error) {
        // Handle unexpected errors during the API call
        toast.warning('An unexpected error occurred');
        console.error(error);
      }
    }
  };
  

  return (
    <div style={{minHeight:'800px'}} className='container d-flex justify-center align-items-center '>
       <div >
           <Card      isBlurred className="max-w-[400px] dark">
      <CardHeader className="flex gap-3">
       
        <div className="flex flex-col mb-0">
          <p className="fw-bold fs-3 mb-0">Admin Login</p>

        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
<Row>
       <Col lg={6}>

              <img alt='no image ' src='https://cdni.iconscout.com/illustration/premium/thumb/man-using-laptop-5612503-4678408.png?f=webp' width={'500px'}/>
       </Col>
       <Col lg={6}>
       <ToastContainer position="top-center" autoClose={1000} theme="dark"  />

              <div className='d-flex mt-5 justify-center flex-col '>
                            <Input onChange={(e)=>{Setcred({...cred,email:e.target.value})}} className='mb-4' type="email" label="Email" />
              <Input onChange={(e)=>{Setcred({...cred,password:e.target.value})}} className='mb-4' type="Password" label="Password" />

              <Button onClick={adminvalidate} color="warning">
      Login
    </Button>


              </div>
      
       </Col>
</Row>



      </CardBody>
      <Divider/>
      
    </Card>  
  
       </div>
      

    </div>
  )
}

export default Loginadmin