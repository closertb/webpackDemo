import React from 'react';
import { observer, Provider } from "mobx-react";
import Store from "./store";

function mobxDemo() {

  console.log('use--------');
  
  return (
    <Provider stateStore={Store}>
      <h1>
          {Store.title}
      </h1>
    </Provider>
  );
}

export default observer(mobxDemo);
