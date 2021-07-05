import React from "react";
import styles from "./AdminPanel.module.css";

interface Props {}

function AdminPanel({}: Props) {
  async function onClick() {
    console.log("try something");

    const owner = "NJG-connect";
    const name = "landingpageCMS";
    const url = `https://api.github.com/repos/${owner}/${name}/dispatches`;
    let response = { succes: false, data: undefined };
    const body = {
      name: "voici le nom",
      title: "ceci est un titre",
      description: "et ceci est une description",
    };
    try {
      const responseFetch = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/vnd.github.everest-preview+json",
          Authorization: `token ${process.env.REACT_APP_GH_TOKEN_PERSONAL}`,
        },
        body: body ? JSON.stringify(body) : null,
      });
      const responseJson = await responseFetch.json();
      response = { succes: responseFetch.ok, data: responseJson };
    } catch (error) {
      response = { succes: false, data: error };
    }
    console.log(response);
  }
  return (
    <div className={styles.card}>
      <h3> Admin Panel</h3>

      <div className={styles.button} onClick={() => onClick()}>
        <p>Modify content</p>
      </div>
    </div>
  );
}

export default AdminPanel;
