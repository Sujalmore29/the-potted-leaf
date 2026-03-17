import { Link } from 'react-router-dom'
import {motion} from 'motion/react'
import { FaShoppingBasket } from "react-icons/fa";
const ProductCard = ({plant}) => {
  return (
    <Link to={`/products/${plant.id}`}>
        <motion.div 
            whileHover={{scale: 1.05}}
            className='relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group'>
                <div>
                  <img src={`/assets/plants/${plant.imageUrl}`}
                  alt={plant.name}
                  className='h-56 w-full object-cover' />

                  <div className='absolute  inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center p- text-center'>
                <h3 className='text-xl font-semibold'>{plant.name}</h3>
                <p className='text-sm mt-2'>{plant.shortDescription}
                </p>
                <p className='mt-2 flex items-center gap-2'><FaShoppingBasket size={20}/>Buy Now</p>
                </div>
                </div>

                { /* Overlay on hover */ }
                

                <div>
                  <div className='p-4 flex flex-col items-center gap-2'>
                  <h3 className='font-semibold text-lg'>{plant.name}</h3>
                  <p className='text-gray-700 font-bold'>₹{plant.price} </p>
                  </div>

                </div>
            </motion.div>
    </Link>
  );
}

export default ProductCard