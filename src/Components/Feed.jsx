import { Card, CardBody } from '@nextui-org/react'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { adduserdata } from '../context/ContextShare';
import { getalldataApi } from "../services/allapi";
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import logo from './gpg.jpg'
import PropagateLoader from "react-spinners/PropagateLoader";
import { useNavigate } from 'react-router-dom';


function Feed() {
  const [loading,setLoading]=useState(false)
  const [news, setNews] = useState([]);
  const [sortedGadgets, setSortedGadgets] = useState([]);
  const { userprefernce, setUserprefernce } = useContext(adduserdata);
  const [gadgets, setGadgets] = useState([]);
  const navigate= useNavigate()

  const newsapi = async () => {
    try {
      const res = await axios.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=ad36fb2f52f249b887fe8ca0124fe699');
      setNews(res.data.articles);
      console.log(news);
    } catch (error) {
      console.error('Error fetching news data:', error);
    }
  };

  const contentfeed = async () => {
    try {
      const result = await getalldataApi();
      

      const userPreferences = userprefernce.userdata;
      const maxPrice = parseInt(userPreferences.price, 10);
      const minPrice = maxPrice - 10002;

      // Update the gadgets state
      setGadgets(result.data);

      const filteredGadgets = result.data.filter((gadget) => {
        const gadgetPrice = parseInt(gadget.price, 10);
        return gadgetPrice >= minPrice && gadgetPrice <= maxPrice;
      });
      
 // Sort gadgets based on user preferences
 const sortedGadgets = filteredGadgets.sort((a, b) => {
  // Calculate total scores based on user preferences and weights
  const totalScoreA = calculateTotalScore(a, userPreferences);
  const totalScoreB = calculateTotalScore(b, userPreferences);
//  console.log(totalScoreB - totalScoreA);
  // Sort in descending order based on total score
  return totalScoreB - totalScoreA;
 
});

// Use the sortedGadgets array as needed
// console.log(sortedGadgets);
setSortedGadgets(sortedGadgets);





      // Use the filteredGadgets array as needed
      // console.log(filteredGadgets);
      
    } catch (error) {
      console.error('Error fetching gadget data:', error);
    }
  };


  const calculateTotalScore = (gadget, userPreferences) => {
    const weights = {
      camera: userPreferences.camera, 
      entertainment: userPreferences.entertainment,  
      battery: userPreferences.battery, 
      performance: userPreferences.performance,
      software: userPreferences.software,
      build : userPreferences.build
    };
  
    // Calculate total score using weights and user preferences
    const totalScore =
      gadget.camera * weights.camera +
      gadget.entertainment * weights.entertainment +
      gadget.battery * weights.battery +
      gadget.performance * weights.performance +
      gadget.software * weights.software +
      gadget.build * weights.build ;


  // console.log(totalScore);
    return totalScore;
  };

const goback=()=>{
  navigate('/home');
}

const refersh=()=>{
  // newsapi()
  newsapi();
  contentfeed();
console.log('refershed successfully');
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
    newsapi(); // Call the News API when the component mounts
    contentfeed();
    const storedUserdata = sessionStorage.getItem('userpreferences');
    if (storedUserdata) {
      setUserprefernce({ userdata: JSON.parse(storedUserdata) });
      // console.log('User Preferences:', userprefernce);
    }
  }, []);

  return (
    <div>
       <FloatingWhatsApp
        accountName="Govind"
        avatar={logo}
        darkMode
        onClick={function noRefCheck(){}}
        onClose={function noRefCheck(){}}
        onLoopDone={function noRefCheck(){}}
        onNotification={function noRefCheck(){}}
        onSubmit={function noRefCheck(){}}
        phoneNumber="+919383426230"
    />
      <div className="container-fluid">
        <Row>
        <Col className="flex mt-4 flex-column " lg={6}>
              <h1>Your suggestions</h1>{loading ? (
  <PropagateLoader
    color={'#ffff'}
    cssOverride={override}
    loading={loading}
    size={10}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
) : sortedGadgets?.length > 0 ? (
  sortedGadgets.map((gadget) => (
    <Card key={gadget.id} isBlurred className="dark my-3 max-w-[610px]" shadow="sm">
    <CardBody isBlurred>
      <Row>
        <Col lg={6}>
          <img
            src={gadget.imgsrc}
            className="rounded"
            alt="no-image"
            style={{height:'250px',objectFit:'cover'}}
          />
        </Col>
        <Col lg={6}>
          <h5 className="fs-4 my-0 fw-bold">{gadget.name} </h5>
          <p className="my-1">Camera: {gadget.camera}/5 <i
                  class="fa-solid fa-star"
                  style={{ color: "#FFD43B" }}
                  ></i></p>
          <p className="my-1">Entertainment: {gadget.entertainment}/5 <i
                  class="fa-solid fa-star"
                  style={{ color: "#FFD43B" }}
                  ></i></p>
          <p className="my-1">Battery: {gadget.battery}/5 <i
                  class="fa-solid fa-star"
                  style={{ color: "#FFD43B" }}
                  ></i></p>
          <p className="my-1">Performance: {gadget.performance}/5 <i
                  class="fa-solid fa-star"
                  style={{ color: "#FFD43B" }}
                  ></i></p>
          <p className="my-1">software: {gadget.software}/5 <i
                  class="fa-solid fa-star"
                  style={{ color: "#FFD43B" }}
                  ></i></p>
          <p className="my-1">Build Quality: {gadget.build}/5 <i
                  class="fa-solid fa-star"
                  style={{ color: "#FFD43B" }}
                  ></i></p>

         <button className='btn btn-primary my-1'> <a style={{textDecoration:'none'}} target='_blank' href={gadget.link}>Buying Link</a></button>
          <h5 className="my-1">Price: ₹ {gadget.price}</h5>
        </Col>
      </Row>
    </CardBody>
  </Card>
  ))
) : (
  <p>
    No data{' '}
    <button onClick={goback} className='btn btn-primary '>go back to prefernce</button>
    <button onClick={refersh} className="btn ms-3 btn-info">
      Refresh Page page{' '}
    </button>
  </p>
)}
              
              </Col>
              <Col lg={5} className="mt-4">
              <h3>Latest Technology news</h3>
       {
       news.map((item)=>(
       <Card isBlurred className="border-none mb-4 dark max-w-[300px]">
                     <Row>
                     <Col className="p-5 ">
                     {" "}
                     <img className="rounded"
                     src={item.urlToImage}
                     height={"80px"}
                     width={"300px"}
                     alt="noimage"
                     />
                     </Col>
                     <Col className="p-5">
                     {" "}
                     <h5 className="mb-3 mt-1 ">{item.title}</h5>
                  <a target="_blank"  href={item.url}> <button className="btn btn-info mb-2"> read more</button></a>  
                     </Col>
                     </Row>
              </Card>


       ))
       
       }


              
              </Col>

        </Row>
      </div>
    </div>
  );
}

export default Feed;

