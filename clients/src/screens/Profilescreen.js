import React, { useState,useEffect } from 'react'
import { Tabs } from 'antd';
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import swal from 'sweetalert';
import { Divider, Space, Tag } from 'antd';

function Profilescreen() {
    
    const items = [
        {
          key: '1',
          label: `Profile`,
          children:<MyProfile/> ,
        },
        {
          key: '2',
          label: `Bookings`,
          children: <Mybookings/>,
        },
        
      ];
  return (
    <div className='ml-7 mt-3'>
       <Tabs defaultActiveKey="1" centered items={items}  />
    </div>
  )
}

export default Profilescreen;




 export function Mybookings() {
    const user=JSON.parse(localStorage.getItem("currentUser")).data
    const[bookings,setBookings]=useState([]);
    const [loading, setLoading] = useState([false]);
    const [error, setError] = useState([]);
    useEffect(() => {
        async function fetchData() {
          try {
            setLoading(true)
            const data=await (await axios.post('/api/bookings/getbookingsbyuserid',{userid:user._id})).data
            console.log(data)
            setBookings(data)
            setLoading(false)
          } catch (error) {
            console.log(error)
            setLoading(false)
            setError(true)
          }
        }
    
        fetchData();
      }, []);

      async function cancelBooking(bookingid,roomid){
        try {
          setLoading(true);
          const result=await (await axios.post('/api/bookings/cancelbooking',{bookingid,roomid})).data
          console.log(result)
          setLoading(false);
          swal('Congrats','Your booking has been cancelled','success').then(result=>{
            window.location.reload()
          })
        } catch (error) {
          console.log(error)
          setLoading(false);
          swal('OOPs','Something went wrong','error')
          
        }

      }
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
           {loading && (<Loader/>)}
           {bookings && (bookings.map(booking=>{
            return <div className='bs'>
                <h1>{booking.room}</h1>
                <p><b>Booking Id:</b> {booking._id}</p>
                <p><b>CheckIn Date:</b> {booking.fromdate}</p>
                <p><b>CheckOut Date:</b> {booking.todate}</p>
                <p><b>Amount:</b> {booking.totalamount}</p>
                <p><b>Status:</b>{" "} {booking.status=='cancelled'? <Tag color="red">CANCELLED</Tag>:<Tag color="green">CONFIRMED</Tag>}</p>

                {booking.status!=="cancelled" && (<div className='text-right'>
                  <button className='btn btn-primary bst' onClick={()=>{cancelBooking(booking._id,booking.roomid)}}>CANCEL BOOKING</button>
                  </div>)}
            </div>
           }))}
        </div>
      </div>
    </div>
  )
}


export function MyProfile(){
    const user=JSON.parse(localStorage.getItem("currentUser")).data

    useEffect(()=>{
        if(!user)
        {
            window.location.href='/login'
        }

    },[]);

    return(
        <div className="row">
            <div className="col-md-5">
            <div className='bs'>
            <h1>My Profile</h1>
            <br/>
            <h1>Name: {user.name}</h1>
            <h1>Email Id: {user.email}</h1>
            <h1>isAdmin: {user.isAdmin?'YES':'NO'}</h1>
        </div>
            </div>
        </div>
        
    )
}


