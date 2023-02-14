import { Provider } from "react-redux";
import { createStore } from "redux";
import MainScreen from "./screens/MainScreen";

import reducers from "./redux/reducers";
import { Text, View } from "react-native";

export default function App() {
  const store = createStore(reducers);
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
}
