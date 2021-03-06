import { FormattedMessage } from "react-intl";
import React from "react";
import { Step } from "react-joyride/types";

interface JoyrideStepsProps {
  loggedIn: boolean;
  hasSavedGame: boolean;
}

function JoyrideSteps({ loggedIn, hasSavedGame }: JoyrideStepsProps) {
  return [
    // Main page step
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
    // Login button step (only shown if the user is loggedOut)
    !loggedIn && {
      content: (
        <h3>
          <FormattedMessage id="joyride.main.step02" />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideLoginButton"
    },
    // Resume Game step (only shown if the user has a game to resume)
    hasSavedGame && {
      content: (
        <h3>
          <FormattedMessage id="joyride.main.step03" />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideResumeGameButton"
    },
    // Start game button
    {
      content: (
        <h3>
          <FormattedMessage id="joyride.main.step04" />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideStartGameButton"
    },
    // Scores button
    {
      content: (
        <h3>
          <FormattedMessage id="joyride.main.step05" />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideScoresButton"
    },
    // Statistics button
    {
      content: (
        <h3>
          <FormattedMessage id="joyride.main.step06" />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideStatisticsButton"
    },
    // Configuration button
    {
      content: (
        <h3>
          <FormattedMessage id="joyride.main.step07" />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideConfigurationsButton"
    },
    // About button
    {
      content: (
        <h3>
          <FormattedMessage id="joyride.main.step08" />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideAboutButton"
    },
    // Logout button (only shown if the user is logged in)
    loggedIn && {
      content: (
        <h3>
          <FormattedMessage id="joyride.main.step09" />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideLogoutButton"
    }
  ].filter((elem: Step | false) => elem !== false); // remove elements with the value false
}

export default JoyrideSteps;
