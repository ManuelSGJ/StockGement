import {BrowserRouter} from 'react-router-dom'
import GlobalStyle from './global/GlobalStyles'
import Router from './Routes/Router' 
import ProfileContext from './global/ProfileContext'

function App() {
  return (
    <BrowserRouter>
      <ProfileContext.Provider>
        <GlobalStyle/>
        <Router/>
      </ProfileContext.Provider>
    </BrowserRouter>
  );
}

export default App;
