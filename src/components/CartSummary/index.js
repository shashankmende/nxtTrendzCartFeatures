// Write your code here
import './index.css'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, updatePaymentMethod, paymentOption} = value
      console.log('cartList from cartSummary', cartList, paymentOption)
      const numberOfCartItems = cartList.length
      let cartPrice = 0
      cartList.map(each => {
        const {quantity, price} = each
        cartPrice += quantity * price
        return cartPrice
      })
      console.log('cart price', cartPrice)

      const orderSummary = () => (
        <>
          <div className="order-total-container">
            <h1>Order Total</h1>
            <h1>Rs {cartPrice}/-</h1>
          </div>
          <p>{numberOfCartItems} Items in cart</p>
        </>
      )

      const finalOrderSummary = () => (
        <div className="summary-container">
          <h3 className="summary-title">Order Summary</h3>
          <p>Number of items: {numberOfCartItems}</p>
          <h4>Order Total: ₹{cartPrice}</h4>
        </div>
      )

      const onChangeCod = event => {
        console.log('event=', event.target.value)
        updatePaymentMethod(event.target.value)
      }

      return (
        <div className="cart-summary-container">
          {orderSummary()}

          <Popup
            trigger={
              <button type="button" className="checkOut-btn">
                Checkout
              </button>
            }
            modal
          >
            <div className="top-container">
              <div className="popup-container">
                <ul className="payment-method">
                  <h3 className="summary-title ">Payment Method</h3>
                  <li className="cards-items">
                    <input type="radio" disabled id="cards" />
                    <label htmlFor="cards">Credit or Debit Card</label>
                  </li>
                  <li>
                    <input type="radio" disabled id="Net banking" />
                    <label htmlFor="Net banking">Net Banking</label>
                  </li>
                  <li>
                    <input type="radio" disabled id="upi" />
                    <label htmlFor="upi">UPI Wallet</label>
                  </li>
                  <li>
                    <input type="radio" id="cod" onChange={onChangeCod} />
                    <label htmlFor="cod">Cash On Delivery</label>
                  </li>
                </ul>
                <div className="order-summary">{finalOrderSummary()}</div>
              </div>
              <div>
                <Popup
                  trigger={
                    paymentOption === true ? (
                      <button type="button" className="confirm-button">
                        Confirm Order
                      </button>
                    ) : (
                      <button type="button" disabled>
                        Confirm Order
                      </button>
                    )
                  }
                  modal
                  position="center center"
                >
                  <h3 className="order-result">
                    Your order has been placed successfully
                  </h3>
                </Popup>
              </div>
            </div>
          </Popup>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
