import React from "react";

export default function WaitListForm() {
  const [email, setEmail] = React.useState<string>("");
  const [joined, setJoined] = React.useState<boolean>(false);
  const [processing, setProcessing] = React.useState<boolean>(false);

  const doJoin = async () => {
    setProcessing(true);

    const res = await fetch("https://api.buttondown.email/v1/subscribers", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token 110279" + "82-828a-4e06" + "-bd0f-c2566a65a5e7",
      },
      body: JSON.stringify({ email: email, tags: ["Snapod Waitlist"] }),
    });
    const data = await res.json();

    setProcessing(false);
    if (data.creation_date) {
      setJoined(true);
    } else {
      alert(
        "暂时无法将你加入内测等候名单\nCannot add you to the wait list just now"
      );
    }
  };
}
