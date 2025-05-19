import axios from "axios";
import { BASE_URL } from "../utils/urlConstant";
import  tick  from "../assets/tick.png";
import  success  from "../assets/success.png";
import  failed  from "../assets/fail.png";
import  paymentImg  from "../assets/paymentImg.png";
import { PREMIUM_PLANS } from "../utils/constant";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";
import { toast } from "react-toastify";

const SubscriptionCard = ({ title, price, plan, benefits, disabled, selectedPlan, expire, handlePayment }) => (
  <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl p-6 w-full max-w-sm h-fit text-white">
    <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
    <p className="text-4xl font-bold text-center mb-6">₹{price}</p>
    <ul className="space-y-3 min-h-40">
      {benefits.map((plan, idx) => (
        <li key={idx} className="flex items-center space-x-2">
            <img 
                src={tick}
                alt="icon"
                className="h-5 w-5"
            />
            <span className="font-bold">{plan}</span>
        </li>
      ))}
    </ul>
    <div className="flex flex-col  mt-6">
      <button 
          className="cursor-pointer  w-full bg-blue-500 hover:bg-blue-600 transition text-white py-2 rounded-lg font-semibold"
          onClick={() => handlePayment(plan)}
          disabled={disabled}
          >
        {selectedPlan !== plan  ? "Buy Now" : "Selected"}
      </button>
      {/* <p className="text-black">{expire && selectedPlan === plan && `Plan will expires at ${expire}`}</p> */}
    </div>
  </div>
);


const Premium = () => {
  const [isSaving, setIsSaving] = useState(false)

    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const status = searchParams.get("status");

    const dispatch = useDispatch()

    useEffect(()=>{

      let id;
      if (status) {
        setIsSaving(true);

        id = setTimeout(()=>{
          savePayment()
        },5000)
      }

      return () => clearTimeout(id); 
    }, [status])

    const handlePayment = async (plan) => {
       try { 
            const response = await axios.post(BASE_URL + "/create-subscription", 
                {plan: plan},
                {withCredentials: true}
            )

            if(response?.data) {
              toast.info("Please complete the payment.")
                window.location.href = response?.data?.session?.url;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const savePayment = async () => {
       try { 
            const response = await axios.post(BASE_URL + "/save-payment", 
                {session_id: sessionId},
                {withCredentials: true}
            )
            toast.info("Please wait while we are activating the plan.")
            dispatch(addUser(response.data.user))
            setIsSaving(false)
            
        } catch (error) {
            console.log(error);
            setIsSaving(false)
        }
    }

    const user = useSelector((store) => store.user)

  return (
    isSaving ? (
      <div className="flex flex-col items-center justify-center">
        <img src={status === "success" ? success : failed} alt="gif" className="h-50 w-50" />
        <h2 className="text-white text-4xl">Payment {status === "success" ? "Successful" : "Failed"}!</h2>
        <h2 className="text-white text-xl">Please wait, we are processing!</h2>
      </div>
    ) : (
      <div className="flex items-center justify-center p-6">
        <div className="flex gap-5 mx-3">
          {PREMIUM_PLANS.map((item) => (
            <SubscriptionCard 
              key={item.plan}
              title={item.title} 
              price={item.price} 
              plan={item.plan}
              benefits={item.benefit}
              disabled={user?.isPremium}
              selectedPlan={user?.premiumType}
              expire={user?.premiumExpires}
              handlePayment={handlePayment} 
            />
          ))}
        </div>
        <img src={paymentImg} alt="img" className="w-fit h-120" />
      </div>
    )
    )
}
  

export default Premium