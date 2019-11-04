import React from "react";
import {AppRegistry} from 'react-native'
import {name as appName} from './app.json'
//import Feed from './src/screens/Feed'
import Navigation from './src/Navigator'

import { Provider } from 'react-redux'
import { createStore }  from 'redux'
import reducers from './src/reducers'

const Root = () => (
    <Provider store={createStore(reducers)}>
        <Navigation/>
    </Provider>
)

AppRegistry.registerComponent(appName, () => Root)

