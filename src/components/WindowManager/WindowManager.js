import React, { Component } from "react";
import { ProgramContext } from "../../contexts";
import registry from "../../applications/app-registry";

class WindowManager extends Component {
  static contextType = ProgramContext;

  render() {
    return (
      <>
        {Object.keys(this.context.activePrograms)
          // .filter(prog => !prog.minimized)
          .map(progId => {
            const prog = this.context.activePrograms[progId]
            const app = registry.get(prog.component);
            return (
              <app.Component
                {...prog}
                save={this.context.save}
                key={progId}
                onClose={this.context.onClose}
                onOpen={this.context.onOpen}
                onMinimize={this.context.onMinimize}
                moveToTop={this.context.moveToTop}
                isActive={prog.id === this.context.activeId}
                program={prog}
                zIndex={this.context.zIndexes.indexOf(progId) + 5}
              />
            );
          })}
      </>
    );
  }
}

export default WindowManager;
