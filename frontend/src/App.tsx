import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes} from '../src/Routes/Routes'

function App() {
  return (
    <>
    <Router>
            <div>
                <Routes>
                    {publicRoutes.map((route, index) => {
                          const Page = route.component;
                          let Layout = route.layout;
                          return (<Route key={index} path={route.path} element = {<Layout><Page/></Layout>}/>)
                      }
                    )}
                </Routes>
            </div>
        </Router>
    </>
  );
}

export default App;
