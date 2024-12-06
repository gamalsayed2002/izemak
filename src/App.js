import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/LOGIN/Login";
import Home from "./pages/HOME/Home";
import Add_Party from "./pages/ADD PARTY/Add_Party";
import Add_invitors from "./pages/ADD INVITORS/Add_invitors";
import All_invitors from "./pages/ALL INVITORS/All_invitors";
import Edit from "./pages/ALL INVITORS/EDIT INVITOR/Edit";
import Qr from "./pages/QR READER/Qr";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/qr_code_scanner" element={<Qr />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/add_party" element={<Add_Party />}></Route>
          <Route
            path="/add_invitors/:partyID"
            element={<Add_invitors />}
          ></Route>
          <Route
            path="/all_invitors/:partyID"
            element={<All_invitors />}
          ></Route>

          <Route path="/edit_invitor/:id" element={<Edit />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
