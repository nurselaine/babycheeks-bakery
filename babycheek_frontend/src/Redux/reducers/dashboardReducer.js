import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_FAILURE,
  UPDATE_ORDER_STATUS_SUCCESS
} from '../actionTypes/actionTypes'

export const initialDashboardState = {
  orders: [
    {
      id: '11T82877W4456802V',
      firstname: 'John',
      lastname: 'Doe',
      subtotal: '20.45',
      total: '23.52',
      fulfilled: 0,
      order_date: '2024-03-26T13:59:08.000Z'
    },
    {
      id: '3DT57704ES5509213',
      firstname: 'John',
      lastname: 'Doe',
      subtotal: '5.40',
      total: '6.21',
      fulfilled: 0,
      order_date: '2024-03-25T02:48:47.000Z'
    },
    {
      id: '3N484720V9542273G',
      firstname: 'John',
      lastname: 'Doe',
      subtotal: '5.00',
      total: '5.75',
      fulfilled: 0,
      order_date: '2024-03-25T02:44:00.000Z'
    },
    {
      id: '83K8171638875961F6',
      firstname: 'John',
      lastname: 'Tran',
      subtotal: '6.50',
      total: '7.80',
      fulfilled: 0,
      order_date: '2024-03-25T01:35:58.000Z'
    },
    {
      id: '83K8201638875961F9',
      firstname: 'Sarah',
      lastname: 'Lee',
      subtotal: '10.50',
      total: '12.60',
      fulfilled: 0,
      order_date: '2024-03-25T01:35:58.000Z'
    },
    {
      id: '83K8231638875961F13',
      firstname: 'Elaine',
      lastname: 'Huynh',
      subtotal: '9.25',
      total: '10.00',
      fulfilled: 0,
      order_date: '2024-03-25T01:44:52.000Z'
    }
  ],
  fulfilled: [],
  unfulfilled: [],
  total_sales: 0.0,
  customers: [],
  total_customers: 0,
  total_orders: 0,
  loading: false,
  error: null
}

const dashboardReducer = (state = initialDashboardState, action) => {
  switch (action.type) {
    case FETCH_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_ORDERS_SUCCESS:
      const { fulfilledOrders, unFulfilledOrders, total, customers, uniqueCustomers } = sanitizeDashboardData(action)
      return {
        ...state,
        loading: false,
        orders: action.payload,
        fulfilled: fulfilledOrders,
        unfulfilled: unFulfilledOrders,
        total_sales: total,
        customers: customers,
        total_customers: uniqueCustomers.length,
        total_orders: action.payload.length
      }
    case FETCH_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case UPDATE_ORDER_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case UPDATE_ORDER_STATUS_SUCCESS:

      const newFulfilled = state.fulfilled.map((order) => {
        if(order.id === action.order_id){
          order.fulfilled = 0;
        }
      })

      return {
        ...state,
        loading: false,
        fulfilled: newFulfilled,
      }
    case UPDATE_ORDER_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export default dashboardReducer

const sanitizeDashboardData = (action) => {
  let orders = action.payload

  const fulfilledOrders = orders.filter((order) => {
    if (order.fulfilled === 1) {
      return order
    }
  })

  const unFulfilledOrders = orders.filter((order) => {
    if (order.fulfilled === 0) {
      return order
    }
  })

  const total = orders.reduce((acc, order) => {
    return acc + parseFloat(order.total)
  }, 0)

  const customers = orders.map((order) => {
    return order.firstname + ' ' + order.lastname
  })

  const uniqueCustomers = customers.filter((value, index, array) => {
    return array.indexOf(value) === index
  })

  console.log(fulfilledOrders, unFulfilledOrders, total, customers, uniqueCustomers)

  return { fulfilledOrders, unFulfilledOrders, total, customers, uniqueCustomers }
}
