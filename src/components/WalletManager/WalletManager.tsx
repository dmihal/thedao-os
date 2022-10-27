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
import Window from "../tools/Window";

import buildMenu from "../../helpers/menuBuilder";

// import "./_styles.scss";

const backgroundStyleGenerator = (bgStyle) => {
  if (bgStyle === 'tile') {
    return {
      backgroundSize: 30,
      backgroundRepeat: 'repeat',
    };
  }
  if (bgStyle === 'contain') {
    return {
      backgroundSize: '80%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    };
  }
  if (bgStyle === 'stretch') {
    return {
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
    };
  }
  return {};
}

const WalletManager = ({ ...props }) => {
  const program = useContext(ProgramContext);
  const context = useContext(SettingsContext);
  const [connected, setConnected] = useState(false);

  if (!program.walletManager) {
    return null;
  }

  return (
    <Window
      {...props}
      initialX={200}
      initialY={100}
      initialWidth={280}
      initialHeight={360}
      Component={AbstractWindow}
      title="Wallet Manager"
      className="Settings"
      onHelp={() => {}} // @todo
      onClose={() => program.toggleWalletManager()}
      menuOptions={buildMenu({
        ...props,
        onClose: program.toggleSettings
      })}
      resizable={false}
      onMinimize={null}
      onMaximize={null}
      isActive
    >
      <DetailsSection>
        Connect your Web3 wallet
      </DetailsSection>
      <DetailsSection title="Wallet">
        <div className="Settings__background-config">
          <div>
            <div>
              {connected ? '0xd8da6bf26964af9d7eed9e03e53415d37aa96045' : 'Not Connected'}
            </div>
          </div>
        </div>

        <div className="Settings__background-update">
          <ButtonForm isDisabled={connected} onClick={() => setConnected(true)}>
            Connect
          </ButtonForm>
          <ButtonForm isDisabled={!connected} onClick={() => setConnected(false)}>
            Disconnect
          </ButtonForm>
        </div>
      </DetailsSection>
    </Window>
  );
}

export default WalletManager;
