import {
  Routes,
  Route,
  BrowserRouter,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import RoutesList from "../constants/RoutesList";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import ForgotPassword from "../pages/Login/ForgotPassword";
import AdminList from "../pages/Admin/List";
import AdminForm from "../pages/Admin/Form";
import AdminDetails from "../pages/Admin/Details";
import UserList from "../pages/User/List";
import UserForm from "../pages/User/Form";
import UserDetails from "../pages/User/Details";
import AstrologerList from "../pages/Astrologer/List";
import AstrologerForm from "../pages/Astrologer/Form";
import AstrologerDetails from "../pages/Astrologer/Details";
import UserProfile from "../pages/Login/Profile";
import UserProfileUpdate from '../pages/Login/UpdateProfile';
import ProductDetails from '../pages/Product/Details';
import ProductList from "../pages/Product/List";
import ProductForm from "../pages/Product/Form";
import SessionList from "../pages/Session/List";
import SessionDetails from "../pages/Session/Details";
import SessionForm from "../pages/Session/Form";
import CartDetails from "../pages/User/CartDetails";
import TransactionDetails from "../pages/Astrologer/TransactionDetails";
import RolesList from "../pages/Roles/List";
import RoleForm from "../pages/Roles/Form";
import RoleDetails from "../pages/Roles/Details";
import BlogsList from "../pages/Blogs/List";
import BlogForm from "../pages/Blogs/Form";
import BlogsDetails from "../pages/Blogs/Details";
import CategorieList from "../pages/Categories/List";
import CategorieForm from "../pages/Categories/Form";
import CategorieDetails from "../pages/Categories/Details";
import OrdersList from "../pages/Orders/List";
import OrderDetails from "../pages/Orders/Details";
import OrderItemDetails from "../pages/Orders/OrderItem";
import WalletsList from "../pages/Wallet Balance/List";
import StaticDetails from "../pages/Statics/Details";

import Form from "../pages/ProductRecommendations/Form";
import List from "../pages/ProductRecommendations/List";
import Details from "../pages/ProductRecommendations/Details";

const ProtectedRoute = ({ children }) => {
  let location = useLocation();

  if (!localStorage.getItem("Token")) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
export const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Outlet />}>
          <Route path={RoutesList.login} element={<Login />} />
          <Route
            index
            path={RoutesList.home}
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path={RoutesList.userProfile} element={<UserProfile />} />
          <Route path={RoutesList.userProfileUpdate} element={<UserProfileUpdate />} />
          {/* admin */}
          <Route path={RoutesList.admin} element={<AdminList />} />
          <Route
            path={`${RoutesList.admin}/new`}
            element={<AdminForm />}
          />
          <Route
            path={`${RoutesList.admin}/:id/edit`}
            element={<AdminForm />}
          />
          <Route
            path={`${RoutesList.admin}/:id/view`}
            element={<AdminDetails />}
          />

          <Route path={RoutesList.roles} element={<RolesList />} />
          <Route path={`${RoutesList.roles}/new`} element={<RoleForm />} />
          <Route path={`${RoutesList.roles}/:id/edit`} element={<RoleForm />} />
          <Route
            path={`${RoutesList.roles}/:id/view`}
            element={<RoleDetails />}
          />

          {/* user */}
          <Route path={RoutesList.user} element={<UserList />} />
          
         
          <Route
            path={`${RoutesList.user}/new`}
            element={<UserForm />}
          />
          <Route
            path={`${RoutesList.user}/:id/edit`}
            element={<UserForm />}
          />
          <Route
            path={`${RoutesList.user}/:id/view`}
            element={<UserDetails />}
          />

          <Route path={`${RoutesList.carts}/:cartId`} element={<CartDetails />} />


          {/* astrologer */}
          <Route path={`${RoutesList.wallet}/:id`} element={<TransactionDetails />} />
          
          <Route path={RoutesList.astrologer} element={<AstrologerList />} />
          <Route
            path={`${RoutesList.astrologer}/new`}
            element={<AstrologerForm />}
          />
          <Route
            path={`${RoutesList.astrologer}/:id/edit`}
            element={<AstrologerForm />}
          />
          <Route
            path={`${RoutesList.astrologer}/:id/view`}
            element={<AstrologerDetails />}
          />

          <Route path={RoutesList.wallet_balance} element={<WalletsList />} />

          <Route path={RoutesList.blogs} element={<BlogsList />} />
          <Route path={`${RoutesList.blogs}/new`} element={<BlogForm />} />
          <Route path={`${RoutesList.blogs}/:id/edit`} element={<BlogForm />} />
          <Route
            path={`${RoutesList.blogs}/:id/view`}
            element={<BlogsDetails />}
          />

          
          <Route path={RoutesList.categories} element={<CategorieList />} />
          <Route path={`${RoutesList.categories}/new`} element={<CategorieForm />} />
          <Route path={`${RoutesList.categories}/:id/edit`} element={<CategorieForm />} />
          <Route
            path={`${RoutesList.categories}/:id/view`}
            element={<CategorieDetails />}
          />
          
          <Route path={RoutesList.orders} element={<OrdersList />} />
          <Route
            path={`${RoutesList.orders}/:id/view`}
            element={<OrderDetails />}
          />
          <Route path={`${RoutesList.orders}/:id`} element={<OrderItemDetails />} />


          {/* product   */}
          <Route path={RoutesList.product} element={<ProductList />} />
            <Route path={`${RoutesList.product}/new`} element={<ProductForm />} />
          <Route path={`${RoutesList.product}/:id/edit`} element={<ProductForm />} />
          <Route
            path={`${RoutesList.product}/:id/view`}
            element={<ProductDetails />}
          />

          <Route path={RoutesList.session} element={<SessionList />} />
               <Route path={`${RoutesList.session}/new`} element={<SessionForm />} />
          <Route path={`${RoutesList.session}/:id/edit`} element={<SessionForm />} />
          <Route
            path={`${RoutesList.session}/:id/view`}
            element={<SessionDetails />}
          />

          <Route path={RoutesList.statics} element={<StaticDetails/>} />

          <Route
            path={RoutesList.forgotPassword}
            element={<ForgotPassword />}
          />


          <Route path={RoutesList.recommendation} element={<List />} />
          <Route path={`${RoutesList.recommendation}/new`} element={<Form />} />
          <Route path={`${RoutesList.recommendation}/:id/edit`} element={<Form />} />
          <Route
            path={`${RoutesList.recommendation}/:id/view`}
            element={<Details />}
          />
          

        </Route>



      </Routes>
    </BrowserRouter>
  );
};
