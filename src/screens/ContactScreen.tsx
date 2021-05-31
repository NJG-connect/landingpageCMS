import React, { useMemo } from "react";
import { SpecificContact } from "../scenes";
import contactsJson from "../data/contacts.json";

interface Props {
  match: {
    params: {
      id?: string;
    };
  };
}

export interface ContactWithSociety {
  society: {
    web: string;
    name: string;
  };
  contact: {
    urlId: string;
    firstname: string;
    lastname: string;
    phone: string;
    role: string;
    email: string;
    photo: string;
    linkedIn: string;
  };
}

function ContactScreen({ match }: Props) {
  document.title = "NJG connect - Contact";
  const contact: ContactWithSociety = useMemo(() => {
    const contactId = match.params.id;
    const contact =
      contactsJson.contacts.find((contact) => contact.urlId === contactId) ||
      contactsJson.contacts[0];
    return { society: contactsJson.society, contact };
  }, [match]);

  return (
    <>
      <SpecificContact info={contact} />
    </>
  );
}

export default ContactScreen;
