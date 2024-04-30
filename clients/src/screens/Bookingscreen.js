import React,{useState,useEffect} from "react";
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import swal from 'sweetalert';
function Bookingscreen () {
    let { roomid } = useParams();
    let {fromdate} = useParams();
    let {todate}= useParams();
    const [loading, setLoading] = useState([true]);
    const [error, setError] = useState([]);
    const [room,setRoom]=useState([]);

    const firstdate = moment(fromdate , 'DD-MM-YYYY')
    const lastdate = moment(todate , 'DD-MM-YYYY')

const totaldays = moment.duration(lastdate.diff(firstdate)).asDays()+1
const [totalamount,setTotalamount]=useState([]);

useEffect(() =>{
  async function fetchData() {
      if(!localStorage.getItem("currentUser")){
        window.location.href='/login'
      }
    }

    fetchData();

},[])

    useEffect(() =>{
        async function fetchData() {
            try {
              setLoading(true);
              const data = (await axios.post("/api/rooms/getroombyid" , {roomid})).data;
              setTotalamount(data.rentperday * totaldays)
              setRoom(data);
              setLoading(false);
            } catch (error) {
              setError(true);
              console.log(error);
              setLoading(false);
            }
          }
      
          fetchData();

    },[])

    

    

    async function onToken(token){
      console.log(token)
      const bookingDetails={
        room,
        roomid,
        userid: JSON.parse(localStorage.getItem("currentUser")).data._id,
        fromdate,
        todate,
        totalamount,
        totaldays,
        token
       }
  
       try {
        setLoading(true);
        const result=await axios.post('/api/bookings/bookroom',bookingDetails)
        setLoading(false); 
        swal('Congratulations','Your room booked successfully','success').then(result=>{
          window.location.href='/profile'

        })
      } catch (error) {
        setLoading(false)
        swal('OOPs','Something went wrong','error')
       }
    }
  

  return (
    <div className="m-5">
       {loading ? (
          <Loader/>
        ) : error ? (
         <div>
            <div className="row justify-content-center mt-5 bs">
                <div className="col-md-6">
                   <h1>{room.name}</h1>
                   <img src={room.imageurls[0]} className="bigimg"/>
                </div>
                <div className="col-md-6">
                    <div style={{textAlign:'right'}}>
                    <h1>Booking Details</h1>
                    <hr/>
                    <b>
                    <p>Name : {JSON.parse(localStorage.getItem("currentUser")).data.name}</p>
                    <p>From Date : {fromdate} </p>
                    <p>To Date : {todate}</p>
                    <p>Max Count : {room.maxcount}</p>
                    </b>
                    </div>
                    <div  style={{textAlign:'right'}}>
                        <h1>Amount</h1>
                        <hr/>
                        <b>
                            <p>Total Days : {totaldays}</p>
                            <p>Rent per Day : {room.rentperday}</p>
                            <p>Total Amount : {totalamount}</p>
                        </b>
                    </div>
                    <div  style={{textAlign:'right'}}>
                        

                        <StripeCheckout
                            amount={totalamount*100}
                            token={onToken}
                            currency="INR"
                            stripeKey="pk_test_51NHeppSHDe2fz52tWyEhupQSUQYouADx8ioF9GaK62m2yySXlnlPzGgBJiBVBLtojKyY9K3z28VOcBzeAiEoOJ1A00FUi43pGC"
                        >
                          <button className="btn btn-primary btn1 " >Make Payment{" "}</button>
                        </StripeCheckout>
                        </div>
                </div>
            </div>
         </div>
        ) : (
          <Error/>
        )}
    </div>
  );
}

export default Bookingscreen;
