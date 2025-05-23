import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'

const MyOrder = () => {
  const orders = useSelector(state => state.orders.order)

  // console.log("order Items",orders)
  // console.log("order Items",orders)
  return (
    <div>
      <div className='bg-green-800 text-white shadow-md p-3 font-semibold'>
        <h1>Order</h1>
      </div>
        {
          !orders[0] && (
            <NoData/>
          )
        }
        {
          orders.map((order,index)=>{
            return(
              <div key={order._id+index+"order"} className='order rounded p-4 text-sm'>
                  <p>Order No : {order?.orderId}</p>
                  <div className='flex gap-3 items-center'>
                    <img
                      src={order.product_details.image[0]} 
                      className='w-14 h-14'
                    />  
                    <p className='font-medium'>{order.product_details.name}</p>
                    {/* <p className='font-medium border-2 w-full text-black'>{order.product_details.subTotalAmt}</p> */}
                  </div>
              </div>
            )
          })
        }
    </div>
  )
}

export default MyOrder
