import Dm_DonViPage from "./features/danh-muc/dm-donvi/Dm_DonViPage";
import Routes from "./routes/Routes";
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './themes/theme.scss';
import classNames from "classnames";

function App() {
  return (
    <div className="App">
       <Dm_DonViPage />
    </div>
  );
}

export default App;
