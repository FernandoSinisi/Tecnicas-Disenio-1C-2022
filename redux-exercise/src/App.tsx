import { Provider } from 'react-redux';

import { Calculator } from 'components/Calculator';
import { store } from 'state';

function App() {
  return (
    <Provider store={store}>
      <Calculator />
    </Provider>
  );
}

export default App;
