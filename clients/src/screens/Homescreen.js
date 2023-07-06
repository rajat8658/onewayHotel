import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room"
import 'antd/dist/reset.css'
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker, Space } from 'antd';
import moment from 'moment'
const { RangePicker } = DatePicker;
function Homescreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);

  const[fromdate,setFromdate]=useState([]);
  const[todate,setTodate]=useState([]);
  const[duplicateroom,setDuplicateroom]=useState([]);
  const[searchkey,setSearchkey]=useState([]);
  const[type,setType]=useState(['all'])

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = (await axios.get("/api/rooms/getallrooms")).data;
        setrooms(data);
        setDuplicateroom(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function filterBySearch(){
    const tempRooms=duplicateroom.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase))
    setrooms(tempRooms);
  }

  function filterByType(e){
    setType(e)
    const tempRooms=duplicateroom.filter(room=>room.name.toLowerCase()==e.toLowerCase())
    setrooms(tempRooms)
  }

  function filterByDate(dates)
  {
  
    console.log(dates[0].format("DD-MM-YYYY"));
    setFromdate(dates[0].format("DD-MM-YYYY"));
    //to date
    console.log(dates[1].format("DD-MM-YYYY"));
    setTodate(dates[1].format("DD-MM-YYYY"));
  
    //tempRooms
    var tempRooms = [];
  
    for (const room of duplicateroom) {
      var availability = false;
  
      if (room.currentbookings.length > 0) {
        for ( const booking of room.currentbookings) {
          //check between or equal to dates
          if (
            !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            ) &&
            !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            )
          ) {
            
            if (
              dates[0].format("DD-MM-YYYY") !== booking.fromdate &&
              dates[0].format("DD-MM-YYYY") !== booking.todate &&
              dates[1].format("DD-MM-YYYY") !== booking.fromdate &&
              dates[1].format("DD-MM-YYYY") !== booking.todate
            ) {
              availability = true;
            }
          }
        }
      } else {
        availability = true;
      }
  
      if (availability === true) {
        tempRooms.push(room);
      }
    }
  
    setrooms(tempRooms);
  }

  return (
    <div className="container">
      <div className="row mt-5 bs">
        <div className="col-md-3">
        <RangePicker format="DD-MM-YYYY" onChange={filterByDate}/>
        </div>
        <div className="col-md-5">
          <input type="text" className="form-control" placeholder="Search Rooms"
           value={searchkey} onChange={(e)=>{setSearchkey(e.target.value)}}  onKeyUp={filterBySearch}/>
        </div>
        <div className="col-md-3 ">
        <select className="form-control" value={type} onChange={(e)=>{filterByType(e.target.value)}}>
          <option value="all">All</option>
          <option value="delux">Delux</option>
          <option value="non-delux">Non Delux</option>
        </select>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader/>
        ) :  (
          rooms.map((room) => {
            return <div className="col-md-9 mt-2">
                <Room room={room} fromdate={fromdate} todate={todate}/>
            </div>
          })
        ) }
      </div>
    </div>
  );
}

export default Homescreen;
