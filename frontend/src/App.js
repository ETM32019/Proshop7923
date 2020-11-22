import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <div className="container">
         <HomeScreen />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
