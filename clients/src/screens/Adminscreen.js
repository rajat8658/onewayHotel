import React, {useState,useEffect} from 'react'
import { Tabs } from 'antd';
import axios from 'axios'
import Loader from "../components/Loader";
import Error from "../components/Error";
function Adminscreen() {
  //  useEffect(()=>{
  //   if(!JSON.parse(localStorage.getItem('currentUser')).isAdmin){
  //     window.location.href="/home"
  //   }

  //  },[])

    const items = [
        {
          key: '1',
          label: `Bookings`,
          children:<Bookings/> ,
        },
        {
          key: '2',
          label: `Rooms`,
          children: <Rooms/>,
        },
        {
            key: '3',
            label: `Add Rooms`,
            children: <AddRoom/>,
          },
          {
            key: '4',
            label: `Users`,
            children: <Users/>,
          }
        
      ];
  return (
    <div className='ml-3 mt-3 mr-3 bs'>
        <h1 className='text-center'><b>Admin Panel</b></h1>
       <Tabs defaultActiveKey="1"  items={items}  />
    </div>
  )
}

export default Adminscreen;


export function Bookings(){
  const [bookings,setBookings]=useState([])
  const [loading,setLoading]=useState(true)
  const[error,setError]=useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const data= await(await axios.get("/api/bookings/getallbookings")).data
        setBookings(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        setError(error)
      }
    }

    fetchData();
  }, []);
  return(
    <div className='row'>
      <div className="col-md-12">
        <h1>Bookings</h1>
        {loading && <Loader/>}

      <table className='table table-bordered table-dark'>
        <thead className='bs thead-dark'>
          <tr>
            <th>Booking Id</th>
            <th>User Id</th>
            <th>Room</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        {bookings.length && (bookings.map(booking=>{
          return <tr>
            <td>{booking._id}</td>
            <td>{booking.userid}</td>
            <td>{booking.room}</td>
            <td>{booking.fromdate}</td>
            <td>{booking.todate}</td>
            <td>{booking.status}</td>
          </tr>
        }))}
        </tbody>
      </table>


        
      </div>

    </div>
  )
};

export function Rooms(){
  const [rooms,setRooms]=useState([])
  const [loading,setLoading]=useState(true)
  const[error,setError]=useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const data= await(await axios.get("/api/rooms/getallrooms")).data
        setRooms(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        setError(error)
      }
    }

    fetchData();
  }, []);
  return(
    <div className='row'>
      <div className="col-md-12">
        <h1>Rooms</h1>
        {loading && <Loader/>}

      <table className='table table-bordered table-dark'>
        <thead className='bs thead-dark'>
          <tr>
            <th>Room Id</th>
            <th>Name</th>
            <th>Type</th>
            <th>Rent per Day</th>
            <th>Max Count</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
        {rooms.length && (rooms.map(room=>{
          return <tr>
            <td>{room._id}</td>
            <td>{room.name}</td>
            <td>{room.type}</td>
            <td>{room.rentperday}</td>
            <td>{room.maxcount}</td>
            <td>{room.phonenumber}</td>
          </tr>
        }))}
        </tbody>
      </table>


        
      </div>

    </div>
  )
};


export function Users(){
  const [users,setUsers]=useState([])
  const [loading,setLoading]=useState(true)
  const[error,setError]=useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const data= await(await axios.get("/api/users/getallusers")).data
        setUsers(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        setError(error)
      }
    }

    fetchData();
  }, []);

  return(
    <div className='row'>
      <div className="col-md-12">
        <h1>Users</h1>
        {loading && <Loader/>}

      <table className='table table-bordered table-dark'>
        <thead className='bs thead-dark'>
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Is Admin?</th>
            
          </tr>
        </thead>
        <tbody>
        {users && (users.map(user=>{
          return <tr>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.isAdmin?"YES":"NO"}</td>
          </tr>
        }))}
        </tbody>
      </table>


        
      </div>

    </div>
  )
};



export function AddRoom(){

  const [name,setName]=useState([]);
  const[rentperday,setRentperday] =useState([]);
  const [maxcount,setMaxcount]=useState([]);
  const[description,setDescription]=useState([]);
  const[phonenumber,setPhonenumber]=useState([]);
  const [type,setType]=useState([]);
  const[imageurl1,setImageurl1]=useState([]);
  const[imageurl2,setImageurl2]=useState([]);
  const[imageurl3,setImageurl3]=useState([]);

  async function addRoom(){
    const newroom={
      name,
      rentperday,
      maxcount,
      description,
      phonenumber,
      type,
      imageurls:[imageurl1,imageurl2,imageurl3]
    }

    try {
      const result= await (await axios.post('api/rooms/addroom',newroom)).data
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }



  return(
    <div className='row'>
      <div className="col-md-5">
        <input type="text" className='form-control-group' placeholder='Room Name'
        value={name} onChange={(e)=>{setName(e.target.value)}}/>
        <input type="text" className='form-control-group' placeholder='Rent Per Day'
        value={rentperday} onChange={(e)=>{setRentperday(e.target.value)}}/>
        <input type="text" className='form-control-group' placeholder='Max Count'
        value={maxcount} onChange={(e)=>{setMaxcount(e.target.value)}}/>
        <input type="text" className='form-control-group' placeholder='Description'
        value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
        <input type="text" className='form-control-group' placeholder='Phone Number'
        value={phonenumber} onChange={(e)=>{setPhonenumber(e.target.value)}}/>

      </div>
      <div className="col-md-5">
        <input type="text" className='form-control-group' placeholder='Type'
        value={type} onChange={(e)=>{setType(e.target.value)}}/>
        <input type="text" className='form-control-group' placeholder='Image URL 1'
        value={imageurl1} onChange={(e)=>{setImageurl1(e.target.value)}}/>
        <input type="text" className='form-control-group' placeholder='Image URL 2'
        value={imageurl2} onChange={(e)=>{setImageurl2(e.target.value)}}/>
        <input type="text" className='form-control-group' placeholder='Image URL 3'
        value={imageurl3} onChange={(e)=>{setImageurl3(e.target.value)}}/>

        <div className="text-right">
          <button className='btn btn-primary mt-2' onClick={addRoom}>Add Room</button>
        </div>
      </div>

    </div>
  )
}

