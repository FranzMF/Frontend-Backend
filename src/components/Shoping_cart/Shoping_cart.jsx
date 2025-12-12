// import React, { useContext, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { MessageCircle } from 'lucide-react'
// import { CartContext } from '../cart/CartProvider'

// const Shoping_cart = () => {
//   const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext)
//   const [isLoading, setIsLoading] = useState(false)

//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   )



//   // Función para generar el mensaje de WhatsApp
//   const generateWhatsAppMessage = (items) => {
//     const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
//     const tax = subtotal  // 16% IVA (ajusta según tu país)
//     const total = subtotal 

//     let message = `🛒 *NUEVO PEDIDO - Tienda Online*\n\n`
//     message += `*Fecha:* ${new Date().toLocaleDateString()}\n`
//     message += `*Hora:* ${new Date().toLocaleTimeString()}\n\n`
//     message += `*DETALLE DEL PEDIDO:*\n`
//     message += `────────────────────\n`

//     // Productos
//     items.forEach((item, index) => {
//       message += `*${index + 1}. ${item.name}*\n`
//       message += `   Precio: ${item.price.toFixed(2)} Bs\n`
//       message += `   Cantidad: ${item.quantity}\n`
//       message += `   Subtotal: ${(item.price * item.quantity).toFixed(2)} Bs\n\n`
//     })

//     // Totales
//     message += `────────────────────\n`
//     message += `*SUBTOTAL:* ${subtotal.toFixed(2)} Bs\n`
//     // message += `*IVA (16%):* ${tax.toFixed(2)} Bs\n`
//     message += `*TOTAL:* ${total.toFixed(2)} Bs\n\n`
//     message += `📦 *Información de envío:*\n`
//     message += `(Por favor proporciona tu dirección completa)\n\n`
//     message += `¡Gracias por tu compra! 🎉`

//     return encodeURIComponent(message)
//   }

//   // Función para manejar el pedido por WhatsApp
//   const handleWhatsAppOrder = async () => {
//     if (!cartItems || cartItems.length === 0) {
//       alert('🛒 Tu carrito está vacío. Agrega algunos productos primero.')
//       return
//     }

//     setIsLoading(true)

//     try {
//       // Pequeño delay para mejor UX
//       await new Promise(resolve => setTimeout(resolve, 500))

//       const message = generateWhatsAppMessage(cartItems)
//       // Reemplaza este número con el número de tu tienda (formato: 59112345678 sin +)
//       const phoneNumber = "67500224"
//       const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

//       window.open(whatsappUrl, '_blank')

//     } catch (error) {
//       console.error('Error al abrir WhatsApp:', error)
//       alert('❌ Error al abrir WhatsApp. Por favor intenta nuevamente.')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Calcular total de items
//   const getTotalItems = () => {
//     return cartItems.reduce((total, item) => total + item.quantity, 0)
//   }

//   return (
//     <div>
//       {/* <!-- breadcrumb --> */}
//       <div className="container">
//         <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-150 p-lr-0-lg">
//           <Link to="/" className="stext-109 cl8 hov-cl1 trans-04">
//             Home
//             <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
//           </Link>

//           <span className="stext-109 cl4">
//             Shoping Cart
//           </span>
//         </div>
//       </div>

//       <form className="bg0">
//         <div className="container">
//           <div className="row">
//             {/* Tabla de productos */}
//             <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
//               <div className="m-l-25 m-r--38 m-lr-0-xl">
//                 <div className="wrap-table-shopping-cart">
//                   <table className="table-shopping-cart">
//                     <thead>
//                       <tr className="table_head">
//                         <th className="column-1">Product</th>
//                         <th className="column-2"></th>
//                         <th className="column-3">Price</th>
//                         <th className="column-4">Quantity</th>
//                         <th className="column-5">Total</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {cartItems.length === 0 ? (
//                         <tr>
//                           <td colSpan="5" className="text-center p-4">
//                             Your cart is empty 🛒
//                           </td>
//                         </tr>
//                       ) : (
//                         cartItems.map((item) => (
//                           <tr className="table_row" key={item.id}>
//                             <td className="column-1">
//                               <div className="how-itemcart1">
//                                 <img src={item.image} alt={item.name} />
//                                 {/* Botón X encima de la imagen */}
//                                 <button
//                                   type="button"
//                                   className="remove-btn"
//                                   onClick={() => removeFromCart(item.id)}
//                                 >
//                                   ×
//                                 </button>
//                               </div>
//                             </td>
//                             <td className="column-2">{item.name}</td>
//                             <td className="column-3">{item.price.toFixed(2)} Bs</td>
//                             <td className="column-4">
//                               <div className="wrap-num-product flex-w m-l-auto m-r-0">
//                                 <div
//                                   className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
//                                   onClick={() =>
//                                     updateQuantity(item.id, item.quantity - 1)
//                                   }
//                                 >
//                                   <i className="fs-16 zmdi zmdi-minus"></i>
//                                 </div>

//                                 <input
//                                   className="mtext-104 cl3 txt-center num-product"
//                                   type="number"
//                                   value={item.quantity}
//                                   onChange={(e) =>
//                                     updateQuantity(item.id, Number(e.target.value))
//                                   }
//                                 />

//                                 <div
//                                   className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
//                                   onClick={() =>
//                                     updateQuantity(item.id, item.quantity + 1)
//                                   }
//                                 >
//                                   <i className="fs-16 zmdi zmdi-plus"></i>
//                                 </div>
//                               </div>
//                             </td>
//                             <td className="column-5">
//                               {(item.price * item.quantity).toFixed(2)} Bs
//                             </td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>

//             {/* Totales */}
//             <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
//               <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
//                 <h4 className="mtext-109 cl2 p-b-30">Cart Totals</h4>

//                 <div className="flex-w flex-t bor12 p-b-13">
//                   <div className="size-208">
//                     <span className="stext-110 cl2">Subtotal:</span>
//                   </div>
//                   <div className="size-209">
//                     <span className="mtext-110 cl2">{subtotal.toFixed(2)} Bs</span>
//                   </div>
//                 </div>

//                 {/* <div className="flex-w flex-t bor12 p-t-15 p-b-13">
//                   <div className="size-208">
//                     <span className="stext-110 cl2">IVA (16%):</span>
//                   </div>
//                   <div className="size-209">
//                     <span className="mtext-110 cl2">{(subtotal ).toFixed(2)} Bs</span>
//                   </div>
//                 </div> */}

//                 <div className="flex-w flex-t p-t-27 p-b-33">
//                   <div className="size-208">
//                     <span className="mtext-101 cl2">Total:</span>
//                   </div>
//                   <div className="size-209 p-t-1">
//                     <span className="mtext-110 cl2">{(subtotal).toFixed(2)} Bs</span>
//                   </div>
//                 </div>

//                 {/* Botón de WhatsApp */}
//                 <button
//                   type="button"
//                   onClick={handleWhatsAppOrder}
//                   disabled={cartItems.length === 0 || isLoading}
//                   className={`whatsapp-order-btn flex-c-m stext-101 cl0 size-116 bor14 hov-btn3 p-lr-15 trans-04 pointer ${cartItems.length === 0 ? 'disabled' : ''
//                     }`}
//                   style={{
//                     background: cartItems.length === 0 ? '#ccc' : '#25D366',
//                     border: 'none',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: '10px',
//                     width: '100%',
//                     marginBottom: '15px'
//                   }}
//                 >
//                   {isLoading ? (
//                     <>
//                       <div className="loading-spinner" style={{
//                         width: '20px',
//                         height: '20px',
//                         border: '2px solid transparent',
//                         borderTop: '2px solid white',
//                         borderRadius: '50%',
//                         animation: 'spin 1s linear infinite'
//                       }}></div>
//                       Procesando...
//                     </>
//                   ) : (
//                     <>
//                       <MessageCircle size={20} />
//                       Pedir por WhatsApp
//                       {cartItems.length > 0 && (
//                         <span style={{
//                           background: '#FF4444',
//                           color: 'white',
//                           borderRadius: '50%',
//                           width: '24px',
//                           height: '24px',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           fontSize: '0.75rem',
//                           fontWeight: '700',
//                           marginLeft: 'auto'
//                         }}>
//                           {getTotalItems()}
//                         </span>
//                       )}
//                     </>
//                   )}
//                 </button>

//                 <style jsx>{`
//                   @keyframes spin {
//                     0% { transform: rotate(0deg); }
//                     100% { transform: rotate(360deg); }
//                   }

//                   .whatsapp-order-btn:hover:not(.disabled) {
//                     background: #128C7E !important;
//                     transform: translateY(-2px);
//                     box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
//                   }

//                   .whatsapp-order-btn:active:not(.disabled) {
//                     transform: translateY(0);
//                   }
//                 `}</style>

//                 <button
//                   className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer"
//                   style={{ width: '100%' }}
//                 >
//                   Continuar comprando
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default Shoping_cart



import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { CartContext } from '../cart/CartProvider'
import { orderAPI } from '../../services/orderAPI' // Ajusta la ruta según tu estructura

const Shoping_cart = () => {
  const user_id = localStorage.getItem('user_id');


  const { cartItems, updateQuantity, removeFromCart, clearCart } = useContext(CartContext)
  const [isLoading, setIsLoading] = useState(false)

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )
  const tax = subtotal * 0.16
  const total = subtotal

  // Función para guardar la orden en la base de datos
  const saveOrderToDatabase = async (cartItems, totalAmount) => {
    try {
      // Obtener el user_id del localStorage o de donde lo tengas
      // const userData = JSON.parse(localStorage.getItem('user_id') || '{}')
      // const user_id = userData.id || 1 
      // Usar 1 como default si no hay usuario logueado

      // 1. Crear la orden principal
      const orderData = {
        user_id: user_id,
        total: totalAmount,
        status: 'pending' // pending, confirmed, completed, cancelled
      }

      console.log('📦 Creando orden:', orderData)
      const orderResponse = await orderAPI.createOrder(orderData)

      const orderId = orderResponse.data.id || orderResponse.data.order_id

      console.log('✅ Orden creada con ID:', orderId)

      // 2. Crear los detalles de la orden
      const orderDetails = cartItems.map(item => ({
        order_id: orderId,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
        subtotal: item.price * item.quantity
      }))

      console.log('📋 Creando detalles:', orderDetails)

      // Crear todos los detalles de la orden
      for (const detail of orderDetails) {
        await orderAPI.createOrderDetail(detail)
      }

      console.log('✅ Detalles de orden creados')
      return orderId

    } catch (error) {
      console.error('❌ Error guardando orden en BD:', error)
      throw new Error('No se pudo guardar la orden en la base de datos')
    }
  }

  // Función para generar el mensaje de WhatsApp
  const generateWhatsAppMessage = (items, orderId, totalAmount) => {
    let message = `🛒 *NUEVO PEDIDO - Tienda Online*\n\n`
    message += `*N° de Pedido:* #${orderId}\n`
    message += `*Fecha:* ${new Date().toLocaleDateString()}\n`
    message += `*Hora:* ${new Date().toLocaleTimeString()}\n\n`
    message += `*DETALLE DEL PEDIDO:*\n`
    message += `────────────────────\n`

    // Productos
    items.forEach((item, index) => {
      message += `*${index + 1}. ${item.name}*\n`
      message += `   Precio: ${item.price.toFixed(2)} Bs\n`
      message += `   Cantidad: ${item.quantity}\n`
      message += `   Subtotal: ${(item.price * item.quantity).toFixed(2)} Bs\n\n`
    })

    // Totales
    message += `────────────────────\n`
    message += `*SUBTOTAL:* ${subtotal.toFixed(2)} Bs\n`
    // message += `*IVA (16%):* ${tax.toFixed(2)} Bs\n`
    message += `*TOTAL:* ${totalAmount.toFixed(2)} Bs\n\n`
    message += `📦 *Información de envío:*\n`
    message += `(Por favor proporciona tu dirección completa)\n\n`
    message += `¡Gracias por tu compra! 🎉`

    return encodeURIComponent(message)
  }

  // Función principal para manejar el pedido completo
  const handleCompleteOrder = async () => {
    if (!cartItems || cartItems.length === 0) {
      alert('🛒 Tu carrito está vacío. Agrega algunos productos primero.')
      return
    }

    setIsLoading(true)

    try {
      // 1. Guardar orden en la base de datos
      const orderId = await saveOrderToDatabase(cartItems, total)

      // 2. Generar y enviar mensaje de WhatsApp
      const message = generateWhatsAppMessage(cartItems, orderId, total)
      const phoneNumber = "67500224" // Reemplaza con tu número
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

      // 3. Abrir WhatsApp
      window.open(whatsappUrl, '_blank')

      // 4. Limpiar carrito (opcional)
      // clearCart()

      console.log('🎉 Pedido completado exitosamente')

    } catch (error) {
      console.error('❌ Error en el proceso de pedido:', error)
      alert(`❌ Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Calcular total de items
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <div>
      {/* <!-- breadcrumb --> */}
      <div className="container">
        <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-150 p-lr-0-lg">
          <Link to="/" className="stext-109 cl8 hov-cl1 trans-04">
            Home
            <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
          </Link>

          <span className="stext-109 cl4">
            Shoping Cart
          </span>
        </div>
      </div>

      <form className="bg0">
        <div className="container">
          <div className="row">
            {/* Tabla de productos */}
            <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
              <div className="m-l-25 m-r--38 m-lr-0-xl">
                <div className="wrap-table-shopping-cart">
                  <table className="table-shopping-cart">
                    <thead>
                      <tr className="table_head">
                        <th className="column-1">Product</th>
                        <th className="column-2"></th>
                        <th className="column-3">Price</th>
                        <th className="column-4">Quantity</th>
                        <th className="column-5">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center p-4">
                            Your cart is empty 🛒
                          </td>
                        </tr>
                      ) : (
                        cartItems.map((item) => (
                          <tr className="table_row" key={item.id}>
                            <td className="column-1">
                              <div className="how-itemcart1">
                                <img src={item.image} alt={item.name} />
                                <button
                                  type="button"
                                  className="remove-btn"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  ×
                                </button>
                              </div>
                            </td>
                            <td className="column-2">{item.name}</td>
                            <td className="column-3">{item.price.toFixed(2)} Bs</td>
                            <td className="column-4">
                              <div className="wrap-num-product flex-w m-l-auto m-r-0">
                                <div
                                  className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                >
                                  <i className="fs-16 zmdi zmdi-minus"></i>
                                </div>

                                <input
                                  className="mtext-104 cl3 txt-center num-product"
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateQuantity(item.id, Number(e.target.value))
                                  }
                                />

                                <div
                                  className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                >
                                  <i className="fs-16 zmdi zmdi-plus"></i>
                                </div>
                              </div>
                            </td>
                            <td className="column-5">
                              {(item.price * item.quantity).toFixed(2)} Bs
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Totales */}
            <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
              <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
                <h4 className="mtext-109 cl2 p-b-30">Cart Totals</h4>

                <div className="flex-w flex-t bor12 p-b-13">
                  <div className="size-208">
                    <span className="stext-110 cl2">Subtotal:</span>
                  </div>
                  <div className="size-209">
                    <span className="mtext-110 cl2">{subtotal.toFixed(2)} Bs</span>
                  </div>
                </div>

                {/* <div className="flex-w flex-t bor12 p-t-15 p-b-13">
                  <div className="size-208">
                    <span className="stext-110 cl2">IVA (16%):</span>
                  </div>
                  <div className="size-209">
                    <span className="mtext-110 cl2">{tax.toFixed(2)} Bs</span>
                  </div>
                </div> */}

                <div className="flex-w flex-t p-t-27 p-b-33">
                  <div className="size-208">
                    <span className="mtext-101 cl2">Total:</span>
                  </div>
                  <div className="size-209 p-t-1">
                    <span className="mtext-110 cl2">{total.toFixed(2)} Bs</span>
                  </div>
                </div>

                {/* Botón de WhatsApp mejorado */}
                <button
                  type="button"
                  onClick={handleCompleteOrder}
                  disabled={cartItems.length === 0 || isLoading}
                  className={`whatsapp-order-btn flex-c-m stext-101 cl0 size-116 bor14 hov-btn3 p-lr-15 trans-04 pointer ${cartItems.length === 0 ? 'disabled' : ''
                    }`}
                  style={{
                    background: cartItems.length === 0 ? '#ccc' : '#25D366',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    width: '100%',
                    marginBottom: '15px'
                  }}
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner" style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid transparent',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      Guardando pedido...
                    </>
                  ) : (
                    <>
                      <MessageCircle size={20} />
                      Completar Pedido
                      {cartItems.length > 0 && (
                        <span style={{
                          background: '#FF4444',
                          color: 'white',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          marginLeft: 'auto'
                        }}>
                          {getTotalItems()}
                        </span>
                      )}
                    </>
                  )}
                </button>

                <style jsx>{`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                  
                  .whatsapp-order-btn:hover:not(.disabled) {
                    background: #128C7E !important;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
                  }
                  
                  .whatsapp-order-btn:active:not(.disabled) {
                    transform: translateY(0);
                  }
                `}</style>

                <Link to="/home/products">
                  <button
                    className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer"
                    style={{ width: '100%' }}
                  >
                    Continuar comprando
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Shoping_cart