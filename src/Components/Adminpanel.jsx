import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Card, CardBody, Image, CardFooter } from "@nextui-org/react";
import {
  Tabs, Tab, Link,Input,Divider,Button, CardHeader,RadioGroup, Radio,Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Select, SelectItem
} from "@nextui-org/react";
import { adddataApi, adddataLaptop, delteSmartphoendata, deltelapdata, getalldataApi, getalllapApi, getuseremails } from '../services/allapi';
import { useNavigate } from 'react-router-dom';
import {Accordion,Badge, AccordionItem} from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropagateLoader from "react-spinners/PropagateLoader";
import { log } from '../context/ContextShare';



function Adminpanel() {

  const [loading,setLoading]=useState(false)
  // const [logout,setLogout]= useContext(log);

  const [datas,Setdatas]=useState([])
  const [lapdatas,Setlapdatas]=useState([])
  const [useremails,Setuseremails]= useState([])
  const naviagtion = useNavigate()
  
  const [smartphonedata,Setsmartphonedata]= useState({
    name:"",
    os:'',
    imgsrc:'',
    price:"",
    camera:'',
    software:'',
    entertainment:'',
    battery:'',
    performance:'',
    build:'',
    link:''
  })
  const [laptopdata,Setlaptopdata]= useState({
    name:"",
    os:'',
    imgsrc:'',
    price:"",
    entertainment:'',
    battery:'',
    performance:'',
    build:'',
    link:''
  })







const uploaddata= useCallback(
  async(e)=>{
  e.preventDefault();
  const { name, os,imgsrc, price, camera,software, entertainment, battery,performance,build,link } = smartphonedata;
  if (
    !name ||
    !os ||
    !imgsrc ||
    !price ||
    !camera ||
    !software ||
    !entertainment ||
    !battery ||
    !performance ||
    !build ||
    !link
  ) {
    toast.warning("Please fill out all fields");
  } else {
    //reqbody
    //1.creates an object of formdata vclass -dince we have uploaded data
    const reqBody = new FormData();
    //2 . add data - APPEND()
    reqBody.append("name", name);
    reqBody.append("os", os);
    reqBody.append("imgsrc", imgsrc);
    reqBody.append("price", price);
    reqBody.append("camera", camera);
    reqBody.append("software", software);
    reqBody.append("entertainment", entertainment);
    reqBody.append("battery", battery);
    reqBody.append("performance", performance);
    reqBody.append("build",build)
    reqBody.append("link", link);

    // //reqHeaders
    // if (token) {
    //   const reqHeaders = {
    //     "Content-Type": "multipart/form-data",
    //     "Authorization": `Bearer ${token}`,
    //   };

      const result = await adddataApi(reqBody);
      console.log(result);

      if (result.status === 200) {
        console.log(result.data);
        toast.success("sucessfull");
        // handleClose()

        // setAddProjectResponse(result.data)
      } else {
        toast.error("something went wrong try again later");
        console.log(smartphonedata);
        // handleclear();
      }
    }
  }, [smartphonedata]
) 

const addlapdatas = useCallback(
  async(e)=>{
  e.preventDefault();
  const { name, os,imgsrc, price, entertainment, battery,performance,build,link } = laptopdata;
  if (
    !name ||
    !os ||
    !imgsrc ||
    !price ||
    !entertainment ||
    !battery ||
    !performance ||
    !build ||
    !link
  ) {
    alert("Please fill out all fields");
  } else {
    //reqbody
    //1.creates an object of formdata vclass -dince we have uploaded data
    const reqBody = new FormData();
    //2 . add data - APPEND()
    reqBody.append("name", name);
    reqBody.append("os", os);
    reqBody.append("imgsrc", imgsrc);
    reqBody.append("price", price);
    reqBody.append("entertainment", entertainment);
    reqBody.append("battery", battery);
    reqBody.append("performance", performance);
    reqBody.append("build",build)
    reqBody.append("link", link);

    // //reqHeaders
    // if (token) {
    //   const reqHeaders = {
    //     "Content-Type": "multipart/form-data",
    //     "Authorization": `Bearer ${token}`,
    //   };

      const result = await adddataLaptop(reqBody);
      console.log(result);

      if (result.status === 200) {
        console.log(result.data);
        toast.success("sucessfull");
        // handleClose()

        // setAddProjectResponse(result.data)
      } else {
        toast.error("something went wrong try again later");
        console.log(smartphonedata);
        // handleclear();
      }
    }
  }, [laptopdata]
) 




const seedata=async()=>{
  const result = await getalldataApi()
  Setdatas(result.data)
  console.log(datas);

}


const seelapdata= useCallback(async()=>{
  const result = await getalllapApi()
  Setlapdatas(result.data)
  console.log(lapdatas);
}
) 
//see user emails 
const seeuseremails = async()=>{
  const res = await getuseremails()
  Setuseremails(res.data)
  console.log(useremails);
}
 
const logouts=()=>{
  sessionStorage.removeItem('id')
  // setLogout(false)
  naviagtion('/home')
}

const deletebutton=async(id)=>{
  await delteSmartphoendata(id)
  toast.info('delted successfully')
}

const deletelapbutton= async(id)=>{
  await deltelapdata(id)
  toast.info('delted successfully')
}

const override: CSSProperties = {
  display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   height: '100vh',
   width:'100%',
   margin: "0 auto",
   backgroundColor:'black'
  
  
 };

useEffect(()=>{
  setLoading(true)
  setTimeout(() => {
    setLoading(false)
  }, 1500);
  },[])

useEffect(() => {
  seedata();
  seelapdata();
  seeuseremails();
},[uploaddata,seelapdata]);


  return (
   <>
   

  <div className='container-fluid '>
    <Row>
    <h1 className="text-center mt-5">Admin Panel</h1>
      <Col className='mt-5' lg={6}>
        
        <h4>Added contents</h4>
        { loading? <PropagateLoader


color={'#ffff'}

cssOverride={override}

loading={loading}

size={10}
aria-label="Loading Spinner"
data-testid="loader"
/>:

           <Tabs  size='lg' aria-label="Tabs sizes">
          <Tab key="Smartphones" title="SmartPhones">
          <div className='d-flex flex-column  justify-content-center w-100'>
          
          { 
  datas?.length>0?
  datas.map((item)=>(
            <Card isBlurred className="dark mt-4  max-w-[610px]" shadow="sm">
                       <CardBody isBlurred>
                       <Row>
                        
                            <>
                            <Col lg={6}>
                       <img
                              src={item.imgsrc}
                              className="rounded"
                              alt="no-image"
                              style={{height:'250px',objectFit:'cover'}}
                       />
                       </Col>
                       <Col  lg={6}>
                       <h5 className="fs-4 my-0 fw-bold">{item.name}</h5>
                       <p className="my-2">
                              Camera: {item.camera}/5{" "}
                              <i
                              class="fa-solid fa-star"
                              style={{ color: "#FFD43B" }}
                              ></i>
                       </p>
                       <p className="my-2">
                              Software experience: {item.camera}/5{" "}
                              <i
                              class="fa-solid fa-star"
                              style={{ color: "#FFD43B" }}
                              ></i>
                       </p>
                       <p className="my-2">
                              Entertainemnt: {item.entertainment}/5{" "}
                              <i
                              class="fa-solid fa-star "
                              style={{ color: "#FFD43B" }}
                              ></i>
                       </p>
                       <p className="my-2">
                              Battery: {item.battery}/5{" "}
                              <i
                              class="fa-solid fa-star "
                              style={{ color: "#FFD43B" }}
                              ></i>
                       </p>
                       <p className="my-2">
                              performance: {item.performance}/5{" "}
                              <i
                              class="fa-solid fa-star "
                              style={{ color: "#FFD43B" }}
                              ></i>
                       </p>
                       <p className="my-2">
                              Build Quality: {item.performance}/5{" "}
                              <i
                              class="fa-solid fa-star "
                              style={{ color: "#FFD43B" }}
                              ></i>
                       </p>
                       <h5 className="my-2"> Price: ₹ {item.price}</h5>
                       <div className='d-flex gap-3'>
                       <button  onClick={() => deletebutton(item._id)}  className='btn btn-danger' >Delete this Gadget<i class="fa-solid fa-trash fa-2xl"></i></button>
                       <button className='btn btn-Success' ><a target='_blank' href={item.link}>Buy Here</a></button>

                       </div>
                       </Col>
                            
                            </>
  
  
  
                         
                        
                       
                       </Row>
                       </CardBody>
                </Card> 
                )):<p>nothing to display</p>
                }
          </div>




          </Tab>
          <Tab key="Laptops" title="laptops">
          <div className='d-flex flex-column  justify-content-center w-100'>
          
          { 
  lapdatas?.length>0?
  lapdatas.map((item)=>(
            <Card isBlurred className="dark mt-4  max-w-[610px]" shadow="sm">
                       <CardBody isBlurred>
                       <Row>
                        
                            <>
                            <Col lg={6}>
                       <img
                              src={item.imgsrc}
                              className="rounded"
                              alt="no-image"
                              style={{height:'250px',objectFit:'cover'}}
                       />
                       </Col>
                       <Col  lg={6}>
                       <h5 className="fs-4 my-0 fw-bold">{item.name}</h5>
                      
                       <p className="my-2">
                              Entertainemnt: {item.entertainment}/5{" "}
                              <i
                              class="fa-solid fa-star "
                              style={{ color: "#FFD43B" }}
                              ></i>
                       </p>
                       <p className="my-2">
                              Battery: {item.battery}/5{" "}
                              <i
                              class="fa-solid fa-star "
                              style={{ color: "#FFD43B" }}
                              ></i>
                       </p>
                       <p className="my-2">
                              performance: {item.performance}/5{" "}
                              <i
                              class="fa-solid fa-star "
                              style={{ color: "#FFD43B" }}
                              ></i>
                       </p>
                       <p className="my-2">
                              Build Quality: {item.performance}/5{" "}
                              <i
                              class="fa-solid fa-star "
                              style={{ color: "#FFD43B" }}
                              ></i>
                       </p>
                       <h5 className="my-2"> Price: ₹ {item.price}</h5>
                       <div className='d-flex gap-3'>
                       <button onClick={() => deletelapbutton(item._id)} className='btn btn-danger' >Delete this Gadget<i class="fa-solid fa-trash fa-2xl"></i></button>
                       <button className='btn btn-Success' ><a target='_blank' href={item.link}>Buy Here</a></button>

                       </div>
                       </Col>
                            
                            </>
  
  
  
                         
                        
                       
                       </Row>
                       </CardBody>
                </Card> 
                )):<p>nothing to display</p>
                }
          </div></Tab>

        </Tabs>
        }
       



      
        
       
        
      </Col>
      <Col className='mt-5' lg={6}>
        <div className='w-100 d-flex justify-content-end'>
        <button onClick={logouts} className='btn btn-primary me-3'>Logout</button>

        </div>
        < Accordion className='my-3'    variant="bordered">
      <AccordionItem key="1" aria-label="Users" title="Other Gaget User " >
        {useremails?.length>0?
        useremails.map((item)=>(
          <p>{item.email}
        </p>
        ))
          :<p>nothing to didsplay</p>}
      </AccordionItem>

    </Accordion>
      <h4 className="text-center">Add New Gadget</h4>
    
      <div>
      <Card  isBlurred className="max-w-[400px] dark">
         
          <CardHeader className="flex gap-3">
            <div className="flex w-100 flex-col">
              <h3 className="text-2xl fw-bold text-center ">Gizmo Grid</h3>
             
            </div>
          </CardHeader>
          <Divider className="my-0" />
          <CardBody>
            <div className="w-full flex justify-center ">
              <div style={{ width: "fit-content" }}>
                <Tabs
                  className="w-full  "
                  aria-label="Options"
                  size="lg"
                  color="warning"
                  variant="bordered"
                  fullWidth
                    
                >
                  <Tab  key="Smartphone" title="SmartPhone">
              <form className="flex flex-col gap-4">
              <Input  onChange={(e)=>{Setsmartphonedata({...smartphonedata,name:e.target.value})}} type="Name" label="Name" />
             
              <div className='d-flex gap-3'>
   <Select
        
              
      label="select Opertiing Sytem"
      placeholder="OS"
      onChange={(e) => { Setsmartphonedata({ ...smartphonedata, os: e.target.value })}}
      className="max-w-xs"
    >
      
        <SelectItem  key='Android'  > Android</SelectItem>
        <SelectItem  key="IOS" >Ios</SelectItem>
      
      
    </Select>
    <Input onChange={(e)=>{Setsmartphonedata({...smartphonedata,price:e.target.value})}}  type="Price" label="Price" />
    <Input onChange={(e)=>{Setsmartphonedata({...smartphonedata,imgsrc:e.target.value})}}  type="imgsrc" label="imgsrc" />


              </div>
           


              <RadioGroup
      label="Camera"
      orientation="horizontal"
      onChange={(e)=>{Setsmartphonedata({...smartphonedata,camera:e.target.value})}} 
    >
      <Radio value="1" className="mx-1"  description="subpar">1</Radio>
      <Radio value="2" className="mx-1"  description="Good">2</Radio>
      <Radio value="3" className="mx-1"  description="average ">3</Radio>
      <Radio value="4" className="mx-1"  description="Above Average">4</Radio>
      <Radio value="5"  className="mx-1" description="top Tier">5</Radio>
    </RadioGroup>
    {/* software */}
    <RadioGroup
      label="Software"
      orientation="horizontal"
      onChange={(e)=>{Setsmartphonedata({...smartphonedata,software:e.target.value})}} 
    >
      <Radio value="1" className="mx-1"  description="subpar">1</Radio>
      <Radio value="2" className="mx-1"  description="Good">2</Radio>
      <Radio value="3" className="mx-1"  description="average ">3</Radio>
      <Radio value="4" className="mx-1"  description="Above Average">4</Radio>
      <Radio value="5"  className="mx-1" description="top Tier">5</Radio>
    </RadioGroup>
 {/* entertainemnt */}
    <RadioGroup
      label="Entertainment(Display & Speakers)"
      orientation="horizontal"
      onChange={(e)=>{Setsmartphonedata({...smartphonedata,entertainment:e.target.value})}} 
    
    >
      <Radio className="mx-1" value="1"  description="subpar">1</Radio>
      <Radio  className="mx-1"value="2" description="Good">2</Radio>
      <Radio className="mx-1" value="3" description="Averge ">3</Radio>
      <Radio  className="mx-1"value="4" description="Above Average">4</Radio>
      <Radio className="mx-1" value="5" description="top Tier">5</Radio>
    </RadioGroup>

    {/* Battery */}
    <RadioGroup
      label="Battery"
      orientation="horizontal"
      onChange={(e)=>{Setsmartphonedata({...smartphonedata,battery:e.target.value})}} 
    >
      <Radio className="mx-2" value="1"  description="subpar">1</Radio>
      <Radio  className="mx-2"value="2" description="Good">2</Radio>
      <Radio className="mx-2" value="3" description="Averge ">3</Radio>
      <Radio  className="mx-2"value="4" description="Above Average">4</Radio>
      <Radio className="mx-2" value="5" description="top Tier">5</Radio>
    </RadioGroup>

     {/* Performanc */}
     <RadioGroup
      label="Performance"
      orientation="horizontal"
      onChange={(e)=>{Setsmartphonedata({...smartphonedata,performance:e.target.value})}} 
    >
      <Radio className="mx-2" value="1"  description="subpar">1</Radio>
      <Radio  className="mx-2"value="2" description="Good">2</Radio>
      <Radio className="mx-2" value="3" description="Averge ">3</Radio>
      <Radio  className="mx-2"value="4" description="Above Average">4</Radio>
      <Radio className="mx-2" value="5" description="top Tier">5</Radio>
    </RadioGroup>
 {/* build */}
 <RadioGroup
      label="Build Quality"
      orientation="horizontal"
      onChange={(e)=>{Setsmartphonedata({...smartphonedata,build:e.target.value})}} 
    >
      <Radio className="mx-2" value="1"  description="subpar">1</Radio>
      <Radio  className="mx-2"value="2" description="Good">2</Radio>
      <Radio className="mx-2" value="3" description="Averge ">3</Radio>
      <Radio  className="mx-2"value="4" description="Above Average">4</Radio>
      <Radio className="mx-2" value="5" description="top Tier">5</Radio>
    </RadioGroup>



    {/* link  */}

    <Input onChange={(e)=>{Setsmartphonedata({...smartphonedata,link:e.target.value})}}  type="link" label="buying Link" />
     
                
                
                <div className="flex gap-2 justify-end">
                  <Button  onClick={(e) => uploaddata(e)}  fullWidth color="primary">
                    Add Data
                  </Button> 
                  <Button  type="reset" value="Reset Form"   fullWidth color="Secondary">
                    Clear data
                  </Button> 
                </div>
              </form>
            </Tab>
                  <Tab key={"Laptops"} title='Laptops'>
                  <form className="flex flex-col gap-4">


                  <Input onChange={(e)=>{Setlaptopdata({...laptopdata,name:e.target.value})}} type="Name" label="Name" />
              
              <div className='d-flex gap-3'>
   <Select
      label="select Opertiing Sytem"
      placeholder="OS"
      onChange={(e)=>{Setlaptopdata({...laptopdata,os:e.target.value})}}
      className="max-w-xs"
    >
      
        <SelectItem key='windows' > Windows</SelectItem>
        <SelectItem key='mac'   >Mac OS</SelectItem>
      
      
    </Select>
    <Input onChange={(e)=>{Setlaptopdata({...laptopdata,price:e.target.value})}} type="Price" label="Price" />
    <Input  onChange={(e)=>{Setlaptopdata({...laptopdata,imgsrc:e.target.value})}} type="imgsrc" label="imgsrc" />


              </div>



{/* entertainemnt */}
<RadioGroup
label="Entertainment(Display & Speakers)"
orientation="horizontal"
onChange={(e)=>{Setlaptopdata({...laptopdata,entertainment:e.target.value})}}
>
<Radio className="mx-2" value="1"  description="subpar">1</Radio>
<Radio  className="mx-2"value="2" description="Good">2</Radio>
<Radio className="mx-2" value="3" description="Averge ">3</Radio>
<Radio  className="mx-2"value="4" description="Above Average">4</Radio>
<Radio className="mx-2" value="5" description="top Tier">5</Radio>
</RadioGroup>

{/* Battery */}
<RadioGroup
label="Battery"
orientation="horizontal"
onChange={(e)=>{Setlaptopdata({...laptopdata,battery:e.target.value})}}
>
<Radio className="mx-2" value="1"  description="subpar">1</Radio>
<Radio  className="mx-2"value="2" description="Good">2</Radio>
<Radio className="mx-2" value="3" description="Averge ">3</Radio>
<Radio  className="mx-2"value="4" description="Above Average">4</Radio>
<Radio className="mx-2" value="5" description="top Tier">5</Radio>
</RadioGroup>

{/* Performanc */}
<RadioGroup
label="Performance"
orientation="horizontal"
onChange={(e)=>{Setlaptopdata({...laptopdata,performance:e.target.value})}}
>
<Radio className="mx-2" value="1"  description="subpar">1</Radio>
<Radio  className="mx-2"value="2" description="Good">2</Radio>
<Radio className="mx-2" value="3" description="Averge ">3</Radio>
<Radio  className="mx-2"value="4" description="Above Average">4</Radio>
<Radio className="mx-2" value="5" description="top Tier">5</Radio>
</RadioGroup>
{/* build */}
<RadioGroup
      label="Build Quality"
      orientation="horizontal"
      onChange={(e)=>{Setlaptopdata({...laptopdata,build:e.target.value})}}
    >
      <Radio className="mx-2" value="1"  description="subpar">1</Radio>
      <Radio  className="mx-2"value="2" description="Good">2</Radio>
      <Radio className="mx-2" value="3" description="Averge ">3</Radio>
      <Radio  className="mx-2"value="4" description="Above Average">4</Radio>
      <Radio className="mx-2" value="5" description="top Tier">5</Radio>
    </RadioGroup>

    <Input onChange={(e)=>{Setlaptopdata({...laptopdata,link:e.target.value})}}  type="link" label="buying Link" />

  
  
  <div className="flex gap-2 justify-end">
    <Button  onClick={(e) => addlapdatas(e)}  fullWidth color="primary">
      Add Data  
    </Button>
    <Button  type="reset" value="Reset Form"   fullWidth color="Secondary">
                    Clear data
                  </Button> 
  </div>
</form>
                  </Tab>

                  
                  
                </Tabs>
              </div>
            </div>
          </CardBody>
          <Divider />
          <CardFooter >
           <p className="text-center w-100"><i class="fa-solid fa-heart" style={{color:'#e30202'}} ></i>By GizmoGrid</p>
          </CardFooter>
        </Card>
    </div>
      </Col>
    </Row>
    <ToastContainer  position="top-center"
autoClose={1000} />
  </div>

   </>
  )
}

export default Adminpanel