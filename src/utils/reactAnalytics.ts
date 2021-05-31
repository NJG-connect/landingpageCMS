import ReactGA from "react-ga";

interface CreatEventType {
  category: string;
  action: string;
}
function createEventGA({ category, action }: CreatEventType) {
  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = userInfoString ? JSON.parse(userInfoString) : false;
  if (!!userInfo && userInfo.acceptCGU === true) {
    return ReactGA.event({ category, action });
  }
}

export { createEventGA };
