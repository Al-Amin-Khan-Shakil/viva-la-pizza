import LinkButton from '../../UI-components/LinkButton';

function EmptyCart() {
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu" type="">
        &larr; Back to menu
      </LinkButton>

      <p className="mt-7 font-semibold">
        Your cart is still empty. Back to menu and start adding some pizzas 😊
      </p>
    </div>
  );
}

export default EmptyCart;
