import logo from "./logo.svg";
import "./App.css";
import useSWRInfinite from "swr/infinite";

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

function App() {
  const { data, isLoading, isValidating, setSize } = useSWRInfinite(
    (pageIndex) => {
      return `/${pageIndex}`;
    },
    async (url) => {
      console.count(url);
      await delay(500);
      return url;
    },
    { revalidateFirstPage: false }
  );
  return (
    <div className="App" onWheel={() => setSize(10)}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {data?.map((it) => (
            <li key={it}>{it}</li>
          ))}
          {isLoading && <li>Loading...</li>}
          {isValidating && <li>Validating...</li>}
        </ul>
      </header>
    </div>
  );
}

export default App;
