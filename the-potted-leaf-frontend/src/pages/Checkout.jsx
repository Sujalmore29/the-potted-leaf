import axios from "../api/axios.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { motion, scale } from "motion/react";

const Checkout = () => {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const location = useLocation();
    const checkout = location.state;

    const navigate = useNavigate();
    const handleSelect = (addr) => {
        if(addr.id === selectedId){
            setselectedId(null);
            setform({
            type: "Home",
            country: "",
            streetAddress: "",
            city: "",
            state: "",
            zipCode: ""
            });
        }else{
            setselectedId(addr.id);
            setform({
            type: addr.type || "Home",
            country: addr.country || "",
            streetAddress: addr.streetAddress || "",
            city: addr.city || "",
            state: addr.state || "",
            zipCode: addr.zipCode || ""
            }); //fills form for editing
        }
    };

    useEffect(() => {
        fetchAddress();
    }, []);

    const fetchAddress = async () => {
        try{
            const res = await axios.get("/address/get-address");
        setAddresses(res.data);

        if(res.data.length > 0){
            setSelectedAddress(res.data[0]);
        }
        } catch(err){
            toast.error("Failed to load addresses");
        }
    }

    const proceedToPayment = async () => {
        if(checkout.type === "BUY_NOW"){
            try{
                const res = await axios.post("payment/create-session/"+checkout.plantId,{
                size: checkout.size,
                color: checkout.color,
                material: checkout.material,
                quantity: checkout.quantity,
                addressId: selectedAddress.id
            });
            window.location.href = res.data; // stripe checkout URL
            } catch(err){
                toast.error("Failed to proceed to payment. Please try again later.");
            }
       }else{
         try{
            const res = await axios.post("/payment/create-cart-session",{
                    addressId:selectedAddress.id
                });
                window.location.href = res.data;
         }catch(err){
            toast.error("Failed to proceed to payment. Please try again later.");
         }
       }
    }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
        <Navbar />
        <motion.div 
            initial={{ opacity: 0 , y: 20}}
            animate={{ opacity: 1 , y: 0}}
            transition={{ duration: 0.5}}
            className="mt-18 bg-green-600 rounded-2xl max-w-7xl mx-auto py-10 px-6 text-green-700">
        <h2 className="text-2xl font-bold mb-6 text-green-800 ">Select Delivery Address</h2>
        
        <motion.div 
            initial={{ scale: 0.95}}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5}}
            className="space-y-4">
            {addresses.map(addr => (
                <motion.div 
                    initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                transition={{ duration: 0.4, delay: 0.1 * addr.id }}
                

                    key={addr.id}
                    onClick={() => setSelectedAddress(addr)}
                    className={`cursor-pointer p-4 rounded-xl transition border ${
                        selectedAddress?.id === addr.id ? "border-green-700 bg-green-50" : "border-gray-300 bg-white"
                    }`}>
                        <div className="flex justify-between">
                            <h3 className="font-semibold">
                                {addr.type}
                            </h3>
                            {selectedAddress?.id === addr.id && (
                                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                                    Selected
                                </span>
                            )}
                            </div>
                            
                            <p className="text-gray-600 mt-2">
                                {addr.streetAddress}
                            </p>
                            <p className="text-gray-500 text-sm">
                                {addr.city}, {addr.state} 
                            </p>
                            <p className="text-gray-500 text-sm">
                                {addr.country} - {addr.zipCode}
                            </p>
                    </motion.div>
                ))}
                </motion.div>
                <div className="flex justify-between items-center">
                    <button onClick={() => navigate("/profile")} className="w-xl mt-8 bg-yellow-400 h-16 rounded-2xl text-gray-800 py-2 px-4 text-lg hover:bg-yellow-500">
                    Manage Addresses
                </button>
                <button onClick={proceedToPayment}
                    className="w-xl bg-green-700 text-white py-2 px-4 rounded-xl mt-8 h-16 text-lg hover:bg-green-800">
                        Proceed to Payment
                    </button>
                </div>
            </motion.div>
            <Footer />
        </div>
  );
};

export default Checkout;