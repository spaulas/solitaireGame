/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormattedMessage } from "react-intl";
import React from "react";

interface JoyrideStepsProps {
  loggedOut: boolean;
  hasSavedGame: boolean;
}

function JoyrideSteps({ loggedOut, hasSavedGame }: JoyrideStepsProps) {
  console.log("START JOYRIDE looged in = ", loggedOut);
  console.log("START JOYRIDE hasSavedGame= ", hasSavedGame);
  return [
    {
      content: (
        <h3>
          <FormattedMessage id="joyride.main.step01" />
        </h3>
      ),
      disableBeacon: true,
      spotlightClicks: false,
      target: ".joyrideStartingPage",
      placement: "center" as const
    },
    loggedOut && {
      content: (
        <h3>
          <FormattedMessage id="joyride.main.step02" />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideLoginButton"
    },
    hasSavedGame && {
      content: (
        <h3>
          <FormattedMessage id="joyride.main.step03" />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideResumeGameButton"
    },
    {
      content: (
        <h3>
          <FormattedMessage id="joyride.main.step04" />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideStartGameButton"
    },
    {
      content: (
        <h3>
          <FormattedMessage id="joyride.main.step05" />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideScoresButton"
    },
    {
      content: (
        <h3>
          <FormattedMessage id="joyride.main.step06" />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideStatisticsButton"
    },
    !loggedOut && {
      content: (
        <h3>
          <FormattedMessage id="joyride.main.step07" />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideLogoutButton"
    }
  ].filter((elem: any) => elem !== false);
}

export default JoyrideSteps;