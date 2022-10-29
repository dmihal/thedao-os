import React, { Component, useContext, useEffect, useState } from "react";
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
import { useFetch } from "usehooks-ts";

const AnalyticsComponent = ({ ...props }) => {
  const program = useContext(ProgramContext);
  const context = useContext(SettingsContext);

  const v2Data = useFetch<any>('https://api.thegraph.com/subgraphs/name/ianlapham/uniswapv2', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: `{
        token(id:"0xbb9bc244d798123fde783fcc1c72d3bb8c189413") {
          derivedETH
        }
      }`
    }),
  })

  const priceInETH = v2Data.data ? v2Data.data.data.token.derivedETH * 1e17 : null;

  return (
    // @ts-ignore TODO: better prop handling
    <Window
      {...props}
      initialX={200}
      initialY={100}
      initialWidth={280}
      initialHeight={360}
      Component={AbstractWindow}
      title="Analytics"
      className="Analytics"
      menuOptions={buildMenu({
        ...props,
        onClose: program.toggleSettings
      })}
      resizable={false}
      onMinimize={null}
      // onMaximize={null}
      isActive
    >
      {priceInETH ? (
        <div>
          Trading at a {((priceInETH - 1) * 100).toFixed(2)}% {priceInETH > 1 ? 'premium ' : 'discount '}
          compared to the ETH redemption price.
        </div>
      ) : (
        <div>Loading</div>
      )}
    </Window>
  );
}

export default AnalyticsComponent;
