import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        cartList,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value

      const {cartItemDetails} = props
      const {id, title, brand, price, imageUrl} = cartItemDetails

      const filteredList = cartList.filter(each => each.id === id)
      console.log('filtered list from cartitem', filteredList)
      const {quantity} = filteredList[0]

      const onClickMinusBtn = () => {
        if (quantity > 1) {
          decrementCartItemQuantity(id, quantity - 1)
        } else {
          removeCartItem(id)
        }
      }

      const onClickPlusBtn = () => {
        incrementCartItemQuantity(id, quantity + 1)
      }

      const onRemoveCartItem = () => {
        removeCartItem(id)
      }
      // TODO: Update the functionality to increment and decrement quantity of the cart item

      return (
        <li className="cart-item">
          <img className="cart-product-image" src={imageUrl} alt={title} />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{title}</p>
              <p className="cart-product-brand">by {brand}</p>
            </div>
            <div className="cart-quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                data-testid="minus"
                onClick={onClickMinusBtn}
              >
                <BsDashSquare color="#52606D" size={12} />
              </button>
              <p className="cart-quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                data-testid="plus"
                onClick={onClickPlusBtn}
              >
                <BsPlusSquare color="#52606D" size={12} />
              </button>
            </div>
            <div className="total-price-remove-container">
              <p className="cart-total-price">Rs {price * quantity}/-</p>
              <button
                className="remove-button"
                type="button"
                onClick={onRemoveCartItem}
              >
                Remove
              </button>
            </div>
          </div>
          <button className="delete-button" type="button">
            <AiFillCloseCircle
              color="#616E7C"
              size={20}
              onClick={onRemoveCartItem}
            />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
