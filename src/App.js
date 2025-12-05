import React from "react";
import "trix/dist/trix.css"; // Import Trix CSS
import "trix"; // Import Trix JS
import { Helmet } from "react-helmet";
import { ErrorBoundary } from "react-error-boundary";
import "./app/assets/styles/sb-admin-2.min.css";

// import { GlobalErrorPage } from "./app/pages/GlobalErrorPage/GlobalErrorPage";
import { Router } from "./app/routes/routes";
import { SnackbarProvider } from "notistack";
import store from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

import "./app/assets/styles/sb-admin-2.min.css";
import "./app/assets/styles/google-fonts.css";
import "./app/assets/styles/common.css";

// import "./app/assets/stylesheets/bootstrap.min.css";
// import "./app/assets/stylesheets/animate.min.css";
// import "./app/assets/stylesheets/fontawesome.all.min.css";
// import "./app/assets/stylesheets/owl.carousel.min.css";
// import "./app/assets/stylesheets/navber.css";
// import "./app/assets/stylesheets/style.css";
// import "./app/assets/stylesheets/responsive.css";

const persistor = persistStore(store);
const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ErrorBoundary FallbackComponent={() => {}}>
        <SnackbarProvider maxSnack={3}>
          <AppHead />
          <Router />
        </SnackbarProvider>
      </ErrorBoundary>
    </PersistGate>
  </Provider>
);

const AppHead = () => {
  return (
    <Helmet>
      <base href="/" />
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>Astro Unlock Admin Dashboard</title>
    </Helmet>
  );
};
export default App;
