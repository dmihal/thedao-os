import React, { useContext } from "react";
import { TaskBar as TaskBarComponent } from "packard-belle";
import { ProgramContext } from "../../contexts";
import { metamask16 } from "../../icons";

const TaskBar = () => {
  const context = useContext(ProgramContext);
  return (
    <TaskBarComponent
      options={context.startMenu}
      quickLaunch={context.quickLaunch}
      openWindows={context.openOrder.map(windowId => {
        const { activePrograms } = context;
        // const programIdx = activePrograms[windowId);
        const isActive = windowId === context.activeId;
        const onClick = isActive ? context.onMinimize : context.moveToTop;
        const { title, icon } = activePrograms[windowId];
        return {
          id: windowId,
          title,
          icon,
          isActive,
          onClick: () => onClick(windowId)
        };
      })}
      notifiers={[
        {
          icon: metamask16.src,
          onClick: () => context.toggleWalletManager(),
          alt: 'Wallet',
        },
      ]}
    />
  );
};

export default TaskBar;
