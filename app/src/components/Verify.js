import React, { useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";

export default function Verify() {
  let history = useHistory();

  useEffect(() => {
    async function handleSubmit() {
      const url = new URLSearchParams(window.location.search);
      const auth = url.get("auth");
      const user = url.get("user");
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + auth,
          user_public_id: user,
        },
      };
      await fetch("/api/user/" + user + "/verify", requestOptions);
    }

    handleSubmit().then(() => {
      history.push("/login");
    });
  }, [history]);

  return <Fragment></Fragment>;
}

async function uploadImage(file, user, auth) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": file.type, Authorization: "bearer " + auth },
    body: file,
  };
  await fetch("/api/user/" + user + "/file/" + file.name, requestOptions);
}
