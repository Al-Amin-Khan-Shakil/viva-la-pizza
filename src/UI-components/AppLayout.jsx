import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import LoadingIndicator from "./LoadingIndicator";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <LoadingIndicator />}

      <Header />

      <main className="overflow-y-auto">
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
