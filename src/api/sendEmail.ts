const BASE_URL = "/.netlify/functions/sendMail";

const sendEmailFromEmailJS = async (
  body: { [value: string]: string | undefined | any },
  template: "devis" | "makingContact",
  forWho: "us" | "user"
) => {
  const { REACT_APP_MAILER_SEND_TEMPLATE_ID } = process.env;

  const data = {
    from: {
      email: "contact@njgconnect.fr",
    },
    to: [
      {
        email: forWho === "us" ? "njgconnect@gmail.com" : body.mail,
      },
    ],
    variables: [
      {
        email: forWho === "us" ? "njgconnect@gmail.com" : body.mail,
        substitutions: [
          {
            var: "info",
            value:
              forWho === "us"
                ? selectMessageForEmailForUs(body, template)
                : selectMessageForEmailForUser(template),
          },
        ],
      },
    ],
    subject:
      forWho === "us"
        ? `Nouvelle demande de ${
            template === "devis" ? "devis" : "prise de contact"
          } 😁`
        : `Votre demande de ${
            template === "devis" ? "devis" : "prise de contact"
          }`,
    template_id: REACT_APP_MAILER_SEND_TEMPLATE_ID,
  };

  const responseFetch = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: body ? JSON.stringify(data) : null,
  });
  let response = {};
  try {
    const responseJson = await responseFetch.json();    
    response = { succes: true, data: responseJson };
  } catch (error) {
    response = { succes: false, data: error };
  }
  return response;
};

function selectMessageForEmailForUs(
  info: { [value: string]: string | undefined | any },
  template: "makingContact" | "devis"
) {
  if (template === "makingContact") {
    return `
    Vous avez reçu une nouvelle demande de contact avec :  <br /> <br />
    
    Monsieur, Madame :  ${info.name}  <br /> <br />
    
    Socièté : ${info.society}  <br /> <br />
    
    contact : ${info.contact}  <br />`;
  }

  return `
      Vous avez reçu une nouvelle demande de contact avec :  <br /> <br />

      Monsieur, Madame :  ${info.name} <br /> <br />

      Socièté : ${info.society} <br /> <br />

      téléphone : ${info.tel} <br /> <br />

      Email : ${info.mail} <br /> <br />

      Type de projet  : ${info.type} <br /> <br />

      Service souhaité : ${info.project} <br /> <br />

      Support ( si dev ) : ${info.support} <br /> <br />

      Description du Project : ${info.moreDescription} <br /> <br />

      Deadline : ${info.deadline} <br /> <br />

      Budget Alloué : ${info.budget} <br /> <br />`;
}

function selectMessageForEmailForUser(template: "makingContact" | "devis") {
  return `Nous avons bien reçu votre demande ${
      template === "devis" ? "de devis" : "de prise de contact"
    }.<br />
    Nous vous remercions de l'intérêt que vous nous portez et ne manquerons pas de revenir vers vous dans les plus bref délai   <br /> <br />

    -------------
  `;
}

export default sendEmailFromEmailJS;
