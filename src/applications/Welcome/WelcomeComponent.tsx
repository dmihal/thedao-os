import React, { Component, useContext, useState } from "react";
import { SettingsContext } from "../../contexts";
import { ProgramContext } from "../../contexts";
import {
  Window as AbstractWindow,
  DetailsSection,
  Checkbox,
  Radio,
  ButtonForm,
  InputText
} from "packard-belle";
import Window from "../../components/tools/Window";

import buildMenu from "../../helpers/menuBuilder";

const WelcomeComponent = ({ ...props }) => {
  const program = useContext(ProgramContext);
  const context = useContext(SettingsContext);

  return (
    // @ts-ignore TODO: better prop handling
    <Window
      {...props}
      initialX={200}
      initialY={100}
      initialWidth={280}
      initialHeight={360}
      Component={AbstractWindow}
      title="Welcome"
      className="Welcome"
      menuOptions={buildMenu({
        ...props,
        onClose: program.toggleSettings
      })}
      resizable={false}
      onMinimize={null}
      // onMaximize={null}
      isActive
    >
      Welcome
    </Window>
  );
}

export default WelcomeComponent;
