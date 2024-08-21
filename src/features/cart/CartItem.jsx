import { useDispatch } from "react-redux";
import { formatCurrency } from "../../utilities/helpers";
import Button from "../../UI-components/Button";
import { deleteItem } from "./cartSlice";
import UpdateQuantity from "./UpdateQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();

  const handleDeleteItem = () => {
    dispatch(deleteItem(pizzaId));
  };

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}
        &times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

        <UpdateQuantity pizzaId={pizzaId} quantity={quantity} />

        <Button type="small" onClick={handleDeleteItem}>
          Delete
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
