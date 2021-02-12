import "../scss/App.scss";

import Header from "./common/Header";
import Navigation from "./common/Navigation";

function App() {
  return (
    //React.Fragment
    <>
      <div className="wapper">
        <Header />
        <Navigation />
      </div>
    </>
  );
}

export default App;
