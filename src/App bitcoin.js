import Button from "./Button";
import { useState, useEffect } from "react";
import styles from "./App.module.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response) => response.json())
    .then((json) => {
      setCoins(json);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      <h1>The Coins! ({coins.length})</h1>
      {loading ? <strong>Loading...</strong> : null}
      <table style={{border:'1px', borderStyle:'solid', borderColor:'#444444'}}>
        <thead>
          <tr>
            <th>이름</th>
            <th>심볼</th>
            <th>가격</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
          <tr key={coin.id}>
            <td>{coin.name}</td>
            <td>{coin.symbol}</td>
            <td>${coin.quotes.USD.price} USD</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
// https://api.coinpaprika.com/v1/tickers
export default App;
