import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  FloatButton,
  FloatButtonDevis,
  CookiesToaster,
  AdminPanel,
} from "../components";
import { ToastContext } from "../contexts/ToastContext";
import { UserInfoContext } from "../contexts/UserInfoContext";
import {
  Header,
  Services,
  Process,
  Projects,
  Contact,
  Footer,
  LoaderAnimation,
} from "../scenes";
import Devis from "../scenes/devis/Devis";

const numberDayBeforeCanAgain = 1;

function HomeScreen(props: any) {
  const { show } = useContext(ToastContext);
  const { userContext, setUserContext } = useContext(UserInfoContext);
  const [mailHasSent, setMailHasSent] = useState(false);
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const [doADevis, setdoADevis] = useState(false);

  const handleSendEmail = () => {
    setUserContext({ ...userContext, lastEmailSend: new Date().toString() });
    setMailHasSent(true);
  };

  // if user its new for do the animation
  useEffect(() => {
    const newUserString = userContext.newUser;
    if (!!newUserString) {
      setLoadingAnimation(true);
    }
  }, [userContext.newUser]);

  // if user can send again mail
  useEffect(() => {
    const lastEmailSendString = userContext.lastEmailSend;
    if (!!lastEmailSendString) {
      const lastEmailSend = new Date(Date.parse(lastEmailSendString));
      const diffDays: number = parseInt(
        ((new Date().getTime() - lastEmailSend.getTime()) /
          (1000 * 60 * 60 * 24)) as unknown as string,
        10
      );
      setMailHasSent(diffDays < numberDayBeforeCanAgain);
    }
  }, [userContext.lastEmailSend]);

  useEffect(() => {
    if (!!props.location.hash) {
      const hashWords = props.location.hash.split("#");
      const hashWord = hashWords[hashWords.length - 1];
      if (
        ["header", "services", "process", "projects", "footer"].includes(
          hashWord
        )
      ) {
        document
          .getElementById(hashWord)!
          .scrollIntoView({ behavior: "smooth" });
      } else if (hashWord === "contact") {
        document
          .getElementById("footer")!
          .scrollIntoView({ behavior: "smooth" });
      } else if (hashWord === "devis") {
        setdoADevis(true);
      }
    }
  }, [props.location.hash]);

  const handleAnimationIsDone = () => {
    setLoadingAnimation(true);
  };

  const editADevis = useCallback(() => {
    if (!mailHasSent) {
      setdoADevis(true);
    } else {
      show({ message: "Votre message a déjà été transmis" });
    }
  }, [mailHasSent, show]);

  const onAcceptCGU = useCallback(() => {
    setUserContext({
      ...userContext,
      acceptCGU: true,
      newUser: new Date().toString(),
    });
  }, [setUserContext, userContext]);

  const onDecline = useCallback(() => {
    setUserContext({ ...userContext, acceptCGU: false });
  }, [setUserContext, userContext]);

  return (
    <>
      {loadingAnimation === false && (
        <LoaderAnimation setLoadingAnimation={handleAnimationIsDone} />
      )}
      <FloatButton initalValue={mailHasSent} />
      <FloatButtonDevis onClick={editADevis} />
      {userContext.acceptCGU === undefined && (
        <CookiesToaster onAccept={onAcceptCGU} onDecline={onDecline} />
      )}
      <Header />
      <Services />
      <Process />
      <Projects />
      <Contact sendEmail={handleSendEmail} mailHasSent={mailHasSent} />
      {doADevis && (
        <Devis sendEmail={handleSendEmail} onClose={() => setdoADevis(false)} />
      )}
      <Footer />
      <AdminPanel />
    </>
  );
}

export default HomeScreen;
