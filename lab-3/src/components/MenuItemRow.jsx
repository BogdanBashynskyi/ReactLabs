export default function MenuItemRow({ item }) {
  return (
    <tr className={item.available ? 'item' : 'item item--unavailable'}>
      <th scope="row">
        {item.name}
        {!item.available && <span className="item-out"> — немає</span>}
      </th>
      <td>{item.price} грн</td>
    </tr>
  )
}