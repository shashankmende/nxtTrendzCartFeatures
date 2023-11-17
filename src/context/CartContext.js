import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  paymentOption: 'of',
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  updatePaymentMethod: () => {},
})

export default CartContext
