/**
 * Нормалізований ред'юсер черги замовлень. Стан містить orders і customers
 * у словниках byId, а їхній порядок — у масивах ids.
 */

const nextStatus = { new: 'brewing', brewing: 'ready', ready: 'served' }

/** Нормалізує початкові замовлення з loadOrders(). */
export function createInitialState(orders) {
  const orderById = {}
  const customerById = {}
  const orderIds = []
  const customerIds = []

  for (const order of orders) {
    orderIds.push(order.id)
    orderById[order.id] = {
      id: order.id,
      number: order.number,
      status: order.status,
      customerId: order.customer.id,
      items: order.items,
    }

    if (!Object.hasOwn(customerById, order.customer.id)) {
      customerIds.push(order.customer.id)
      customerById[order.customer.id] = { ...order.customer }
    }
  }

  return {
    orders: { byId: orderById, ids: orderIds },
    customers: { byId: customerById, ids: customerIds },
    nextNumber: Math.max(0, ...orders.map((order) => order.number)),
  }
}

export function queueReducer(state, action) {
  switch (action.type) {
    case 'order_placed': {
      const { id, customer, items } = action.order
      const number = state.nextNumber + 1
      const order = {
        id,
        number,
        status: 'new',
        customerId: customer.id,
        items: items.map((item) => ({
          ...item,
          syrups: [...item.syrups],
          done: false,
        })),
      }
      const hasCustomer = Object.hasOwn(state.customers.byId, customer.id)
      return {
        ...state,
        orders: {
          byId: { ...state.orders.byId, [id]: order },
          ids: [...state.orders.ids, id],
        },
        customers: hasCustomer
          ? state.customers
          : {
              byId: {
                ...state.customers.byId,
                [customer.id]: { ...customer },
              },
              ids: [...state.customers.ids, customer.id],
            },
        nextNumber: number,
      }
    }
    case 'item_toggled': {
      const order = state.orders.byId[action.orderId]
      if (!order || !order.items.some((item) => item.id === action.itemId)) {
        return state
      }
      return {
        ...state,
        orders: {
          ...state.orders,
          byId: {
            ...state.orders.byId,
            [order.id]: {
              ...order,
              items: order.items.map((item) =>
                item.id === action.itemId
                  ? { ...item, done: !item.done }
                  : item,
              ),
            },
          },
        },
      }
    }
    case 'order_advanced': {
      const order = state.orders.byId[action.orderId]
      const status = order && nextStatus[order.status]
      if (!status) return state
      return {
        ...state,
        orders: {
          ...state.orders,
          byId: {
            ...state.orders.byId,
            [order.id]: { ...order, status },
          },
        },
      }
    }
    case 'order_cancelled': {
      if (!Object.hasOwn(state.orders.byId, action.orderId)) return state
      const byId = { ...state.orders.byId }
      delete byId[action.orderId]
      return {
        ...state,
        orders: {
          byId,
          ids: state.orders.ids.filter((id) => id !== action.orderId),
        },
      }
    }
    case 'customer_renamed': {
      const customer = state.customers.byId[action.customerId]
      if (!customer) return state
      return {
        ...state,
        customers: {
          ...state.customers,
          byId: {
            ...state.customers.byId,
            [customer.id]: { ...customer, name: action.name },
          },
        },
      }
    }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

function selectOrderWithCustomer(state, orderId) {
  const order = state.orders.byId[orderId]
  if (!order) return undefined
  const { customerId, ...orderData } = order
  return {
    ...orderData,
    customer: state.customers.byId[customerId],
  }
}

/** Замовлення однієї колонки в порядку надходження, разом із гостем. */
export function selectColumn(state, status) {
  return state.orders.ids
    .map((id) => state.orders.byId[id])
    .filter((order) => order.status === status)
    .map((order) => selectOrderWithCustomer(state, order.id))
}

/** Замовлення за id разом із гостем і напоями; undefined, якщо його немає. */
export function selectOrder(state, id) {
  return selectOrderWithCustomer(state, id)
}
