import React, { useCallback, useContext, useState } from "react";
import {
       Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader,Divider,CardFooter,RadioGroup, Radio,Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Select, SelectItem
} from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




import "./hom.css";
import { useNavigate } from "react-router-dom";
import { addlapdta, adduserdata } from "../context/ContextShare";
import { useremailget } from "../services/allapi";

function Hom() {

       const navigate = useNavigate();
       const { userprefernce, setUserprefernce } = useContext(adduserdata);
       const { userlapprefernce, setuserlapprefernce } = useContext(addlapdta);
     
       const [userem,setUserem]= useState({
        email:''
       })
      const[userdata,setUserdata]=useState({
        
        
        price:"",
        camera:'',
        software:'',
        entertainment:'',
        battery:'',
        performance:'',
        build:'',
      
      })

      const[lapdata,setlapdata]=useState({
        
        
        price:"",
        entertainment:'',
        battery:'',
        performance:'',
  
      
      })





      const  smart= useCallback(()=>{
       
       console.log(userdata);
       
       const {price,camera,entertainment,battery,performance,build} = userdata 
       if( price && camera && entertainment && battery && performance && build){
        setUserprefernce({userdata});
        toast.success('sucess')
        console.log({userprefernce});
        sessionStorage.setItem("userpreferences", JSON.stringify(userdata));
        
        navigate('/main')
        
       }else{
        toast.warning("please fill all the fields")
       }
       
       })


       const lapsubmit = useCallback(()=>{
        console.log(lapdata);
       
       const {price,entertainment,battery,performance,} = lapdata 
       if( price && entertainment && battery && performance ){
        setuserlapprefernce({lapdata})
        toast.success('sucess')
        console.log({userlapprefernce});
        sessionStorage.setItem("lapprefernce", JSON.stringify(lapdata));
        
        navigate('/mains')
        
       }else{
        toast.warning("please fill all the fields")
       }
       
       }
       )

       const useremail= useCallback(
        async(e)=>{
        e.preventDefault();
        const { email } = userem;
        if (
          !email
        ) {
          toast.warning("Please fill the fields");
        } else {
          //reqbody
          //1.creates an object of formdata vclass -dince we have uploaded data
          const reqBody = new FormData();
          //2 . add data - APPEND()
          reqBody.append("email", email);
       
      
            const result = await useremailget(reqBody);
            console.log(result);
      
            if (result.status === 200) {
              console.log(result.data);
              toast.success("sucess,we will contact you soon");
              // handleClose()
      
              // setAddProjectResponse(result.data)
            } else {
              toast.error("something went wrong try again later");
             
              // handleclear();
            }
          }
        }
      ) 




  return (
    <div
      style={{ minHeight: "1000px" }}
      className="d-flex justify-content-center cc w-100 align-items-center"
    >
      <div className="w-100 d-flex justify-content-center">
     
        <Card   isBlurred className="max-w-[400px] my-5 dark">
         
          <CardHeader className="flex gap-3">
            <div className="flex w-100 flex-col">
              <h3 className="text-2xl fw-bold text-center ">Gizmo Grid</h3>
              <p className="text-center ">
                Select options based on your prefernce
              </p>
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
                  <Tab key="Smartphone" title="SmartPhone">
              <form className="flex flex-col gap-4">

    

              <RadioGroup
      label="Camera"
      orientation="horizontal" 
      onChange={(e)=>{setUserdata({...userdata,camera:e.target.value})}}
    >
      <Radio value="1" className="mx-1"  description="subpar">1</Radio>
      <Radio value="2" className="mx-1"  description="Good">2</Radio>
      <Radio value="3" className="mx-1"  description="average ">3</Radio>
      <Radio value="4" className="mx-1"  description="Above Average">4</Radio>
      <Radio value="5"  className="mx-1" description="top Tier">5</Radio>
    </RadioGroup>

    {/* software */}
    <RadioGroup
      label="software"
      orientation="horizontal"
      onChange={(e)=>{setUserdata({...userdata,software:e.target.value})}}
    >
      <Radio value="1" className="mx-1"  description="subpar">1</Radio>
      <Radio value="2" className="mx-1"  description="Good">2</Radio>
      <Radio value="3" className="mx-1"  description="average ">3</Radio>
      <Radio value="4" className="mx-1"  description="Above Average">4</Radio>
      <Radio value="5"  className="mx-1" description="top Tier">5</Radio>
    </RadioGroup>

{/* build */}

<RadioGroup
      label="Build quality"
      orientation="horizontal"
      onChange={(e)=>{setUserdata({...userdata,build:e.target.value})}}
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
      onChange={(e)=>{setUserdata({...userdata,entertainment:e.target.value})}}
    
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
      onChange={(e)=>{setUserdata({...userdata,battery:e.target.value})}}
    
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
      onChange={(e)=>{setUserdata({...userdata,performance:e.target.value})}}
    
    >
      <Radio className="mx-2" value="1"  description="subpar">1</Radio>
      <Radio  className="mx-2"value="2" description="Good">2</Radio>
      <Radio className="mx-2" value="3" description="Averge ">3</Radio>
      <Radio  className="mx-2"value="4" description="Above Average">4</Radio>
      <Radio className="mx-2" value="5" description="top Tier">5</Radio>
    </RadioGroup>
    {/* price */}

    <Select
      label="Select a price Range "
      placeholder=" price "
      className="max-w-xs"
      onChange={(e)=>{setUserdata({...userdata,price:e.target.value})}}
    >
      
        <SelectItem key='10000' startContent={<i class="fa-solid fa-money-bill-wave" style={{color:' #11503d'}}></i>} > under  10000</SelectItem>
        <SelectItem key='20000'   startContent={<i class="fa-solid fa-money-bill-wave" style={{color:' #11503d'}}></i>} >under 20000</SelectItem>
        <SelectItem key='30000'   startContent={<i class="fa-solid fa-money-bill-wave" style={{color:' #11503d'}}></i>} > under 30000</SelectItem>
        <SelectItem  key='40000'  startContent={<i class="fa-solid fa-money-bill-wave" style={{color:' #11503d'}}></i>} > under 40000</SelectItem>
        <SelectItem key='50000'   startContent={<i class="fa-solid fa-money-bill-wave" style={{color:' #11503d'}}></i>} > under 50000</SelectItem>
        <SelectItem key='60000'  startContent={<i class="fa-solid fa-money-bill-wave" style={{color:' #11503d'}}></i>} > under 60000</SelectItem>
        <SelectItem key='70000'  startContent={<i class="fa-solid fa-money-bill-wave" style={{color:' #11503d'}}></i>} > under 70000</SelectItem>
        <SelectItem key='80000'  startContent={<i class="fa-solid fa-money-bill-wave" style={{color:' #11503d'}}></i>} > under 80000</SelectItem>
        <SelectItem key='90000'  startContent={<i class="fa-solid fa-money-bill-wave" style={{color:' #11503d'}}></i>} > under 90000</SelectItem>
        <SelectItem key='100000'  startContent={<i class="fa-solid fa-money-bill-wave" style={{color:' #11503d'}}></i>} > under 100000</SelectItem>

      
    </Select>
                
                
                
                <div className="flex gap-2 justify-end">
                  <Button onClick={smart}  fullWidth color="primary">
                    Continue
                  </Button> 
                </div>
              </form>
            </Tab>
                  <Tab key={"Laptops"} title='Laptops'>
                  <form className="flex flex-col gap-4">



{/* entertainemnt */}
<RadioGroup
label="Entertainment(Display & Speakers)"
orientation="horizontal"
onChange={(e)=>{setlapdata({...lapdata,entertainment:e.target.value})}}

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
onChange={(e)=>{setlapdata({...lapdata,battery:e.target.value})}}

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
onChange={(e)=>{setlapdata({...lapdata,performance:e.target.value})}}

>
<Radio className="mx-2" value="1"  description="subpar">1</Radio>
<Radio  className="mx-2"value="2" description="Good">2</Radio>
<Radio className="mx-2" value="3" description="Averge ">3</Radio>
<Radio  className="mx-2"value="4" description="Above Average">4</Radio>
<Radio className="mx-2" value="5" description="top Tier">5</Radio>
</RadioGroup>
{/* price */}

<Select
label="Select a price Range "
placeholder=" price "
className="max-w-xs"
onChange={(e)=>{setlapdata({...lapdata,price:e.target.value})}}

>

<SelectItem key='20000' startContent={<i class="fa-solid fa-money-bill-wave" style={{color:' #11503d'}}></i>} > 0k -20k</SelectItem>
<SelectItem key='40000' startContent={<i class="fa-solid fa-money-bill-wave" style={{color:' #11503d'}}></i>} >20k -40k</SelectItem>
<SelectItem key='60000'  startContent={<i class="fa-solid fa-money-bill-wave" style={{color:' #11503d'}}></i>} >40k -60k</SelectItem>
<SelectItem key='80000' startContent={<i class="fa-solid fa-money-bill-wave" style={{color:' #11503d'}}></i>} >60k -80k</SelectItem>
<SelectItem key='100000' startContent={<i class="fa-solid fa-money-bill-wave" style={{color:' #11503d'}}></i>} >80k -100k</SelectItem>



</Select>
  
  
  
  <div className="flex gap-2 justify-end">
    <Button onClick={lapsubmit} fullWidth color="primary">
      Continue
    </Button>
  </div>
</form>
                  </Tab>

                  
                  <Tab key={'gadgets'} title='Other Gadgets'>
                     <p className="my-3 ms-2">We will contact you.....</p>
                  <Input  onChange={(e)=>{setUserem({...userem,email:e.target.value})}} type="email" label="Email" placeholder="Enter your email" />
                  <Button onClick={useremail} className="mt-3" fullWidth color="primary">
                    Continue Here
                  </Button >
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
      <ToastContainer  position="top-center"
autoClose={1000} />
    </div>
  );
}

export default Hom;
