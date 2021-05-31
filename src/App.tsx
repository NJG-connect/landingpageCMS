import React, { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Toast } from "./components";
import { ToastProvider } from "./contexts/ToastContext";
import { UserInfoContext } from "./contexts/UserInfoContext";
import smoothscroll from "./lib/smoothscroll.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ReactGA from "react-ga";
import Loading from "./scenes/Loading";
import { UserInfoType } from "./types/UserInfoContext";

const HomeScreen = lazy(() => import("./screens/HomeScreen"));
const ContactScreen = lazy(() => import("./screens/ContactScreen"));
const CguScreen = lazy(() => import("./screens/CguScreen"));

smoothscroll.polyfill();

const initialUserContext = {
  acceptCGU: undefined,
  lastEmailSend: undefined,
  newUser: undefined,
};

function App() {
  const setUserInfo = useCallback(() => {
    const userInfoString = localStorage.getItem("userInfo");
    return userInfoString ? JSON.parse(userInfoString) : initialUserContext;
  }, []);

  const [userContext, setUserContext] = useState<UserInfoType>(setUserInfo());

  useEffect(() => {
    if (userContext.acceptCGU === true) {
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS || "");
      ReactGA.pageview(window.location.pathname);
    }
  }, [userContext.acceptCGU]);

  /**  Stock in Storage : 
    always if cgu its true     
    for accepted or refused cgu
    and for the lastEmailSend
  */
  const handleUserContext = (value: UserInfoType) => {
    if (
      value.acceptCGU === true ||
      userContext.acceptCGU === true ||
      (value.acceptCGU === false && userContext.acceptCGU === undefined) ||
      value.lastEmailSend !== userContext.lastEmailSend
    ) {
      setUserContext(value);
      localStorage.setItem("userInfo", JSON.stringify(value));
    }
  };

  return (
    <ToastProvider>
      <Toast />
      <Router>
        <Suspense fallback={<Loading />}>
          <UserInfoContext.Provider
            value={{ userContext, setUserContext: handleUserContext }}
          >
            <Switch>
              <Route path="/contact/:id" component={ContactScreen} />
              <Route path="/contact" component={ContactScreen} />
              <Route path="/cgu" component={CguScreen} />
              <Route path="/" component={HomeScreen} />
            </Switch>
          </UserInfoContext.Provider>
        </Suspense>
      </Router>
    </ToastProvider>
  );
}

export default App;
