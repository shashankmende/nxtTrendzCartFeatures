import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

let isExist = []
class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    console.log('product=', product)
    const {cartList} = this.state
    isExist = cartList.filter(each => {
      if (each.id === product.id) {
        return true
      }
      return false
    })
    if (isExist.length !== 0) {
      const productInIsExist = cartList.pop()
      isExist = []
      const {quantity} = productInIsExist
      const updatedQuantity = quantity + 1

      const newProduct = {...product, quantity: updatedQuantity}
      this.setState(prevState => ({
        cartList: [...prevState.cartList, newProduct],
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
    console.log('is exist =', isExist)

    //   TODO: Update the code here to implement addCartItem
  }

  incrementCartItemQuantity = (id, quantity) => {
    const {cartList} = this.state
    const filteredList = cartList.filter(each => each.id === id)
    console.log('filtered list =', filteredList)
    filteredList[0].quantity = quantity
    console.log('increment btn is clicked =', quantity)

    this.setState(prevState => ({
      cartList: [...prevState.cartList],
    }))
  }

  decrementCartItemQuantity = (id, quantity) => {
    const {cartList} = this.state
    const filteredList = cartList.filter(each => each.id === id)

    filteredList[0].quantity = quantity

    this.setState(prevState => ({
      cartList: [...prevState.cartList],
    }))
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(each => each.id !== id)
    this.setState({
      cartList: filteredList,
    })
  }

  removeAllCartItems = () => {
    this.setState({
      cartList: [],
    })
  }

  render() {
    const {cartList} = this.state
    console.log('cartlist from render', cartList)
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
