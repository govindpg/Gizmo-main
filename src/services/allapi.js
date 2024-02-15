import { commonAPI, commonApi } from "./commonapi"
import {BASE_URL, Baseurl} from './baseurl'




export const AdminApi=async(users)=>{
       return await commonAPI('POST',`${BASE_URL}/login`,users,"")
}


// to add data 
export const adddataApi = async(reqBody)=>{
       return await commonAPI('POST',`${BASE_URL}/add`,reqBody,'')
}

//to add laptop data
export const adddataLaptop = async(reqBody)=>{
       return await commonAPI('POST',`${BASE_URL}/laptopdata`,reqBody,'')
}

//to add useremail
export const useremailget = async(reqBody)=>{
       return await commonAPI('POST',`${BASE_URL}/adduser`,reqBody)
}

//to get all data 
export const getalldataApi = async()=>{
       return await commonAPI('GET',`${BASE_URL}/getalldata`)
}

//laptopdata
export const getalllapApi = async()=>{
       return await commonAPI('GET',`${BASE_URL}/getalllapdata`)
}

//delte smartphoendata

export const delteSmartphoendata = async (projectid) => {
       return await commonAPI('DELETE', `${BASE_URL}/removedata/${projectid}`);
     };


     //delte smartlappdata

export const deltelapdata = async (projectid) => {
       return await commonAPI('DELETE', `${BASE_URL}/removelapdata/${projectid}`);
     };


   //laptopdata
export const getuseremails = async()=>{
       return await commonAPI('GET',`${BASE_URL}/getuseremail`)
}