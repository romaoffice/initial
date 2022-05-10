// Material Dashboard 2 React Examples
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Switch from '@mui/material/Switch';

import MDTypography from "components/MDTypography";
import { useEffect,useState } from "react";
import checkMiddle from "../../services/middle.service";
import tokenService from "../../services/token.service";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {
  useNavigate
} from "react-router-dom"
import MDInput from "components/MDInput";
import {
  useParams
} from "react-router-dom"

const exchanges = ["binance","kucoin"]
const lstUpdatePeriod = [
  {interval:60,title:"Every 1Hour"},
  {interval:240,title:"Every 4Hours"},
  {interval:1440,title:"Daily"},
  {interval:10080,title:"Weekly"},
  {interval:40320,title:"Monthly"}]

function TokensetUpdate() {
  
  checkMiddle();
  let navigate = useNavigate();
  let { id } = useParams();

  const [title,setTitle] = useState("");
  const [exchange,setExchange] = useState("binance");
  const [updateperiod,setUpdateperiod] = useState(1440);
  const [comment,setComment] = useState("");
  const initSet = {
    mincapital:0
  }
  const [settings,setSettings] = useState(initSet);

  const updateSettingField=(field,value)=>{
    let json = {...settings}
    json[field]=value;
    setSettings(json)
  }
  useEffect(()=>{
    const process = async()=>{
      const tokenset = await tokenService.getItem(id)
      if(tokenset.data){
        setTitle(tokenset.data.title);
        setExchange(tokenset.data.exchange);
        setUpdateperiod(tokenset.data.updateperiod);
        if(tokenset.settings){
          setSettings(JSON.parse(tokenset.settings))
        }

        console.log(settings)
      }
    }
    if(id!="Create"){
      process();
    }
  },[])
  
   const update = async()=>{
      let rt;
    if(id!="Create"){
      rt = await tokenService.updateItem(id,{title,exchange,updateperiod});
    }else{
      rt = await tokenService.addItem({title,exchange,updateperiod});
    }
    if(rt.data.message){
      window.alert("Wrong input.Please check your input");
    }else{
      navigate("/tokensets", { replace: true });  
    }

  }
  return(
    <DashboardLayout>
      <DashboardNavbar />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MDInput label="Title" value={title} onChange={(e)=>setTitle(e.target.value)} fullWidth/>                   
          </Grid>
          <Grid item xs={12}>
            <MDInput label="Comment" value={comment} onChange={(e)=>setComment(e.target.value)} fullWidth/>                   
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel >Exchange</InputLabel>
              <Select value={exchange} onChange={(e)=>setExchange(e.target.value)}  sx={{ height: "2.7em",width:"10em" }} label="Exchange">
                {
                  exchanges.map((exchange,idx)=>{
                    return(
                      <MenuItem key={idx} value={exchange}>{exchange}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl >
              <InputLabel >Update Interval</InputLabel>
              <Select fullWidth value={updateperiod} onChange={(e)=>setUpdateperiod(e.target.value)}  sx={{ height: "2.7em",width:"10em" }} label="Update Interval">
                {
                  lstUpdatePeriod.map((updateItem,idx)=>{
                    return(
                      <MenuItem key={idx} value={updateItem.interval}>{updateItem.title}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <MDInput label="Min Capital" value={settings.mincapital} onChange={(e)=>updateSettingField("mincapital",e.target.value)} />                   
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
           <MDButton variant="contained" color="info" onClick={update}>Update</MDButton>       
          </Grid>
        </Grid>
    </DashboardLayout>   
    )

}

export default TokensetUpdate;
