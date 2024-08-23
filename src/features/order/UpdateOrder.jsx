import { useFetcher } from 'react-router-dom';
import Button from '../../UI-components/Button';
import { updateOrder } from '../../services/apiRestaurant';

function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export async function action({ params }) {
  const data = { priority: true };

  await updateOrder(params.orderId, data);
  return null;
}

export default UpdateOrder;
