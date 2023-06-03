import React, { useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useHistory } from "react-router";

import ExitModal from "./Components/Modals/ExitAutoModal";

const SESSION_IDEL_MINUTES = 60;

const AutoLogoutTimer = (props) => {
  const { ComposedClass } = props;
  const history = useHistory();
  const [expired, setExpired] = useState(false);

  const handleOnIdle = (event) => {
    // SHOW YOUR MODAL HERE AND LAGOUT
    console.log("user is idle", event);
    console.log("last active", getLastActiveTime());
    history.push("/");
    setExpired(true);
  };

  const { getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * SESSION_IDEL_MINUTES,
    onIdle: handleOnIdle,
    debounce: 500,
  });

  return (
    <>
      {expired ? (
        <ExitModal
          close={() => {
            setExpired(false);
          }}
        />
      ) : (
        ""
      )}
      <ComposedClass />
    </>
  );
};

export default AutoLogoutTimer;
