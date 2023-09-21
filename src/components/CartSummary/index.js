// Write your code here
import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      console.log('cartList from cartSummary', cartList)
      const numberOfCartItems = cartList.length
      let cartPrice = 0
      cartList.map(each => {
        const {quantity, price} = each
        cartPrice += quantity * price
        return cartPrice
      })
      console.log('cart price', cartPrice)

      return (
        <div className="cart-summary-container">
          <div className="order-total-container">
            <h1>Order Total</h1>
            <h1>Rs {cartPrice}/-</h1>
          </div>
          <p>{numberOfCartItems} Items in cart</p>
          <button type="button" className="checkOut-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
