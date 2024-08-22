import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../UI-components/Button";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utilities/helpers";
import { fetchAddess } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const navigation = useNavigation();
  const cart = useSelector(getCart);
  const formErrors = useActionData();
  const dispatch = useDispatch();
  const {
    username,
    position,
    status: addressStatus,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  const isSubmitting = navigation.state === "submitting";
  const [withPriority, setWithPriority] = useState(false);
  const [inputAddress, setInputAddress] = useState("");
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const handleGeoLocation = async (e) => {
    try {
      e.preventDefault();
      const response = await dispatch(fetchAddess());
      setInputAddress(response.payload.address);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&#39;s go!
      </h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5">
          <label
            htmlFor="customer"
            className="flex flex-col gap-2 sm:flex-row sm:items-center"
          >
            {" "}
            <span className="ml-1 sm:ml-0 sm:basis-40">First Name</span>
            <input
              className="input w-full"
              id="customer"
              type="text"
              name="customer"
              defaultValue={username}
              required
            />
          </label>
        </div>

        <div className="mb-5">
          <label
            htmlFor="phone"
            className="flex flex-col gap-2 sm:flex-row sm:items-center"
          >
            <span className="ml-1 sm:ml-0 sm:basis-40">Phone Number</span>
            <div className="w-full grow">
              <input
                className="input w-full"
                id="phone"
                type="tel"
                name="phone"
                required
              />

              {formErrors?.phone && (
                <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                  {formErrors.phone}
                </p>
              )}
            </div>
          </label>
        </div>

        <div className="mb-5">
          <label
            htmlFor="address"
            className="flex flex-col gap-2 sm:flex-row sm:items-center"
          >
            <span className="ml-1 sm:ml-0 sm:basis-40">Address</span>
            <div className="relative w-full grow">
              <input
                className="input w-full"
                id="address"
                type="text"
                name="address"
                disabled={isLoadingAddress}
                value={inputAddress}
                onChange={(e) => setInputAddress(e.target.value)}
                required
              />

              {addressStatus === "error" && (
                <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                  {errorAddress}
                </p>
              )}

              <span className="absolute right-1.5 top-[5px] z-50">
                {!inputAddress && (
                  <Button
                    disabled={isLoadingAddress}
                    type="small"
                    onClick={handleGeoLocation}
                  >
                    🚩Location
                  </Button>
                )}
              </span>
            </div>
          </label>
        </div>

        <div className="mb-10">
          <label htmlFor="priority" className="flex items-center gap-5">
            <input
              className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2"
              type="checkbox"
              name="priority"
              id="priority"
              value={withPriority}
              onChange={(e) => setWithPriority(e.target.checked)}
            />
            <span>Want to give your order priority?</span>
          </label>
        </div>
        <div className="space-x-2">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? JSON.stringify({
                    lat: position.latitude,
                    lon: position.longitude,
                  })
                : ""
            }
          />

          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing order..."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
          <Button type="secondary" to="/cart">
            Back to cart
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";
  }

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
