import { Headphones, RefreshCcw, ShieldCheck, Truck } from 'lucide-react'

const WhyChoose = () => {
    const features = [
        {
            icon: Truck,
            title: "Fast plant delivery",
            desc: "Fresh plants delivered safely to your doorstep with eco-friendly packaging."
        },
        {
            icon: RefreshCcw,
            title: "Easy Returns",
            desc: "Changed your mind? Return your plant within 30 days hassle-free."
        },
        {
            icon: Headphones,
            title: "Plant Care Support",
            desc: "Our experts help you keep your plants healthy and thriving."
        },
        {
            icon: ShieldCheck,
            title: "Secure Checkout",
            desc: "Pay safely with encrypted payments and Stripe secure checkout."
        }
    ]
  return (
    <section className='bg-green-50 py-4 h-screen'>
        <div className='max-w-7xl mx-auto px-6'>

            { /* Heading */}
            <div className='text-center mb-16'>
                <h2 className='text-4xl font-bold text-green-800'>
                    Why Choose The Potted Leaf?
                </h2>

                <p className='text-gray-600 mt-4 max-w-xl font-semibold mx-auto'>
                    We make plant shopping simple, sustainable and joyful
                </p>
            </div>

            { /* Features Grid */ }
            <div className='grid md:grid-cols-2 lg:grid-cols-2 gap-10'>
                {features.map((feature, index) => {
                    const Icon = feature.icon

                    return (
                        <div key={index}
                            className='bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition group'>
                                <div className='bg-green-100 w-14 h-14 flex items-center justify-center rounded-full mb-6 group-hover:bg-green-200 transition'>
                                    <Icon className='text-green-700' size={28} />
                                </div>
                                <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                                    {feature.title}
                                </h3>
                                <p className='text-gray-600 text-sm'>
                                    {feature.desc}
                                </p>
                        </div>
                    )
                })}
            </div>
        </div>
    </section>
  )
}

export default WhyChoose