/**
 * Ред'юсер черги замовлень. Стан містить вкладені замовлення й nextNumber:
 *   { orders: [...], nextNumber }
 * Кожне замовлення — як у src/data/orders.js:
 *   { id, number, status, customer: { id, name }, items: [...] }
 * status — колонка на дошці: 'new' («Нові»), 'brewing' («Готуються»),
 * 'ready' («Готові») або 'served' («Видані»).
 *
 * Дії — події на сторінці:
 *   { type: 'order_placed', order: { id, customer: { id, name }, items } }
 *       бариста надіслав нове замовлення з форми. Номер і статус 'new'
 *       дає ред'юсер, кожен напій отримує done: false. id замовлення й
 *       гостя створює обробник події.
 *   { type: 'item_toggled', orderId, itemId }
 *       бариста відмітив напій готовим або зняв позначку
 *   { type: 'order_advanced', orderId }
 *       бариста натиснув «Почати», «Готово» чи «Видати»: замовлення
 *       переходить у наступну колонку
 *   { type: 'order_cancelled', orderId }
 *       бариста натиснув «Скасувати замовлення»
 *   { type: 'customer_renamed', customerId, name }
 *       бариста виправив ім'я гостя в «Деталях»
 *
 * Компоненти й тести читають стан лише через selectColumn і selectOrder
 * унизу файлу.
 */

const nextStatus = { new: 'brewing', brewing: 'ready', ready: 'served' }

/** Початковий стан черги з вкладеними замовленнями, як їх повертає loadOrders(). */
export function createInitialState(orders) {
  const nextNumber = Math.max(0, ...orders.map((order) => order.number))
  return { orders, nextNumber }
}

export function queueReducer(state, action) {
  switch (action.type) {
    case 'order_placed': {
      const number = state.nextNumber + 1
      const order = {
        ...action.order,
        customer: { ...action.order.customer },
        number,
        status: 'new',
        items: action.order.items.map((item) => ({
          ...item,
          syrups: [...item.syrups],
          done: false,
        })),
      }
      return {
        ...state,
        orders: [...state.orders, order],
        nextNumber: number,
      }
    }
    case 'item_toggled': {
      const order = state.orders.find((current) => current.id === action.orderId)
      if (!order || !order.items.some((item) => item.id === action.itemId)) {
        return state
      }
      return {
        ...state,
        orders: state.orders.map((currentOrder) =>
          currentOrder.id !== action.orderId
            ? currentOrder
            : {
                ...currentOrder,
                items: currentOrder.items.map((item) =>
                  item.id === action.itemId
                    ? { ...item, done: !item.done }
                    : item,
                ),
              },
        ),
      }
    }
    case 'order_advanced': {
      const order = state.orders.find((current) => current.id === action.orderId)
      const status = order && nextStatus[order.status]
      if (!status) return state
      return {
        ...state,
        orders: state.orders.map((current) =>
          current.id === action.orderId ? { ...current, status } : current,
        ),
      }
    }
    case 'order_cancelled': {
      if (!state.orders.some((order) => order.id === action.orderId)) return state
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.orderId),
      }
    }
    case 'customer_renamed': {
      if (!state.orders.some((order) => order.customer.id === action.customerId)) {
        return state
      }
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.customer.id === action.customerId
            ? { ...order, customer: { ...order.customer, name: action.name } }
            : order,
        ),
      }
    }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

/**
 * Замовлення однієї колонки (status) у порядку надходження, кожне разом із
 * гостем і напоями.
 */
export function selectColumn(state, status) {
  return state.orders.filter((order) => order.status === status)
}

/** Замовлення за id разом із гостем і напоями; undefined, якщо його немає. */
export function selectOrder(state, id) {
  return state.orders.find((order) => order.id === id)
}
