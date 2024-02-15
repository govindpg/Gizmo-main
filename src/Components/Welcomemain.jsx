import React from 'react'
import './welcom.css'
import { Col, Row } from 'react-bootstrap'
import { useTypewriter } from 'react-simple-typewriter';
import { Link } from 'react-router-dom';

function Welcomemain() {
       const [text] = useTypewriter({
              words: ["SmartPhones", "Laptops", "or any Gadgets"],
              loop: {},
          
              cursorStyle: "_",
              typeSpeed: 100,
              deleteSpeed: 80,
              cursorBlinking:true,
              
            });

  return (
    <div className='container-fluid cc' style={{width:'100%',height:'100%'}}>
       
       <Row style={{minHeight:'800px'}} className=' d-flex justify-content-center align-items-center'>
       <Col lg={2}></Col>
       <Col lg={8} style={{height:'100%'}} className=' d-flex justify-content-center align-items-center'>
              <div className='d-flex flex-column justify-content-center'>
              <h4 className='text-center fs-1 '>Are you worried about the options in </h4>
           
              <h1  style={{color:'#161A30'}} className='fs-1 text-center fw-bold '><span style={{fontFamily:'Courier Prime'}}>{text}</span>   </h1> 

      
                 <p className='text-center '>We are there to help you out</p>
              <div >

                     <Link style={{textDecoration:'none'}} className='w-100 d-flex justify-content-center ' to={'/home'}>        <button className='btn btn-dark w-50'>Continue Here</button></Link>
      

              </div>
              </div>
       </Col>
       <Col lg={2}></Col>
       </Row>

    </div>
  )
}

export default Welcomemain