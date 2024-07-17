// import { useState } from 'react';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) => /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
  str,
);

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Let&#39;s go!</h2>

      <form>
        <div>
          <label htmlFor="customer">
            {' '}
            <span>First Name</span>
            <input id="customer" type="text" name="customer" required />
          </label>
        </div>

        <div>
          <label htmlFor="phone">
            <span>Phone Number</span>
            <div>
              <input id="phone" type="tel" name="phone" required />
            </div>
          </label>
        </div>

        <div>
          <label htmlFor="address">
            <span>Address</span>
            <div>
              <input id="address" type="text" name="address" required />
            </div>
          </label>
        </div>

        <div>
          <label htmlFor="priority">
            <input
              type="checkbox"
              name="priority"
              id="priority"
              // value={withPriority}
              // onChange={(e) => setWithPriority(e.target.checked)}
            />
            <span>Want to give your order priority?</span>
          </label>
        </div>
      </form>
    </div>
  );
}

export default CreateOrder;
