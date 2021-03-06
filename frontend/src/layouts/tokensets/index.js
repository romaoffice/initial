/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import DataTable from "examples/Tables/DataTable";
import checkMiddle from "services/middle.service";
import TokensService from "services/token.service";
import { useEffect,useState } from "react";
import showAlert from "services/alert"

import {
  useNavigate
} from "react-router-dom"
// Data
const lstUpdatePeriod = [
  {interval:60,title:"Every 1Hour"},
  {interval:240,title:"Every 4Hours"},
  {interval:1440,title:"Daily"},
  {interval:10080,title:"Weekly"},
  {interval:40320,title:"Monthly"}]

function getPeriodName (interval){
  let name ="";
  lstUpdatePeriod.forEach(e=>{
    if(Number(e.interval)==Number(interval)) name = e.title;
  })
  return(name)
}
function tokens() {
  
  let navigate = useNavigate();
  //checkMiddle();
  const [tokens,setTokens] = useState([]);
  
  const doEdit =(tokenId)=>{
    navigate("/tokensets/"+tokenId, { replace: true });
  }

  const doDelete =async(tokenId)=>{
    await TokensService.deleteItem(tokenId);
    process();
    showAlert.showAlert("Sent request to delete")
  }
  async function process() {
    const tokensData = await TokensService.getList();
    let newData = [];
    tokensData.data.map((tokenset)=>{
      newData.push({
        title : tokenset.title,
        exchange:tokenset.exchange,
        interval:getPeriodName(tokenset.updateperiod),
        action:<MDBox lineHeight={1} >
                <MDButton variant="outlined" size="small" color="secondary" onClick={()=>doEdit(tokenset.id)}>
                  Edit
                </MDButton>&nbsp;
                <MDButton variant="outlined" size="small" color="warning" onClick={()=>doDelete(tokenset.id)}>
                  Delete
                </MDButton>
              </MDBox>
      })
    })
    console.log(newData)
    setTokens(newData);
  }

  useEffect(() => {

     process();
  }, [])
  const tokensColumns =[
      { Header: "Name", accessor: "title",  align: "left" },
      { Header: "Exchange", accessor: "exchange",  align: "left" },
      { Header: "Interval", accessor: "interval",  align: "left" },
      { Header: "Actions", accessor: "action", align: "center" },
    ];
  

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox pt={3}>
                <DataTable
                  table={{ "columns":tokensColumns, "rows":tokens }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}  md={4} lg={4}>
          </Grid>
          <Grid item xs={12}  md={4} lg={4}>
           <MDButton variant="contained" color="info" fullWidth onClick={()=>doEdit("Create")}>Add New</MDButton>       
          </Grid>
          <Grid item xs={12}  md={4} lg={4}>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default tokens;
