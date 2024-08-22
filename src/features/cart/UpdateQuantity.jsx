import { useDispatch } from 'react-redux';
import Button from '../../UI-components/Button';
import { increaseItemQuantity, decreaseItemQuantity } from './cartSlice';

function UpdateQuantity({ pizzaId, quantity }) {
  const dispatch = useDispatch();

  const handleIncreaseItem = () => {
    dispatch(increaseItemQuantity(pizzaId));
  };
  const handleDecreaseItem = () => {
    dispatch(decreaseItemQuantity(pizzaId));
  };
  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button type="round" onClick={handleIncreaseItem}>
        +
      </Button>
      <span className="text-sm font-medium">{quantity}</span>
      <Button type="round" onClick={handleDecreaseItem}>
        -
      </Button>
    </div>
  );
}

export default UpdateQuantity;
