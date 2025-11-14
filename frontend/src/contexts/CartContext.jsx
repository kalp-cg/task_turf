import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-hot-toast';

// Cart Actions
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART',
  SET_LOADING: 'SET_LOADING'
};

// Initial cart state
const initialCartState = {
  items: [],
  total: 0,
  totalItems: 0,
  loading: false
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );

      let updatedItems;
      if (existingItemIndex >= 0) {
        // Item already exists, update quantity
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // New item, add to cart
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const newTotalItems = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      return {
        ...state,
        items: updatedItems,
        total: newTotal,
        totalItems: newTotalItems
      };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const newTotalItems = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      return {
        ...state,
        items: updatedItems,
        total: newTotal,
        totalItems: newTotalItems
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        // If quantity is 0 or less, remove item
        return cartReducer(state, { type: CART_ACTIONS.REMOVE_ITEM, payload: id });
      }

      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );

      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const newTotalItems = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      return {
        ...state,
        items: updatedItems,
        total: newTotal,
        totalItems: newTotalItems
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
        total: 0,
        totalItems: 0
      };

    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        ...action.payload
      };

    case CART_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

// Cart provider component
export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('taskturf_cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever cart state changes
  useEffect(() => {
    try {
      localStorage.setItem('taskturf_cart', JSON.stringify(cartState));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartState]);

  // Cart actions
  const addToCart = (service) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: service });
    toast.success(`${service.name} added to cart!`, {
      duration: 2000,
      position: 'top-right',
      style: {
        background: '#10B981',
        color: 'white',
        borderRadius: '8px'
      }
    });
  };

  const removeFromCart = (serviceId) => {
    const item = cartState.items.find(item => item.id === serviceId);
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: serviceId });
    
    if (item) {
      toast.success(`${item.name} removed from cart`, {
        duration: 2000,
        position: 'top-right',
        style: {
          background: '#EF4444',
          color: 'white',
          borderRadius: '8px'
        }
      });
    }
  };

  const updateQuantity = (serviceId, quantity) => {
    dispatch({ 
      type: CART_ACTIONS.UPDATE_QUANTITY, 
      payload: { id: serviceId, quantity } 
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
    toast.success('Cart cleared!', {
      duration: 2000,
      position: 'top-right',
      style: {
        background: '#6B7280',
        color: 'white',
        borderRadius: '8px'
      }
    });
  };

  const setLoading = (loading) => {
    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: loading });
  };

  // Check if item is in cart
  const isInCart = (serviceId) => {
    return cartState.items.some(item => item.id === serviceId);
  };

  // Get item quantity
  const getItemQuantity = (serviceId) => {
    const item = cartState.items.find(item => item.id === serviceId);
    return item ? item.quantity : 0;
  };

  // Get total price with tax and fees
  const getTotalWithTax = () => {
    const subtotal = cartState.total;
    const tax = subtotal * 0.1; // 10% tax
    const serviceFee = subtotal * 0.05; // 5% service fee
    return {
      subtotal,
      tax,
      serviceFee,
      total: subtotal + tax + serviceFee
    };
  };

  const contextValue = {
    // State
    cartItems: cartState.items,
    total: cartState.total,
    totalItems: cartState.totalItems,
    loading: cartState.loading,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setLoading,
    
    // Utilities
    isInCart,
    getItemQuantity,
    getTotalWithTax
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;