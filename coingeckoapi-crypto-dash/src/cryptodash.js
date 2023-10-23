import { Component } from 'react';
import Crypto from './crypto';
import { React } from 'react';
import { Switch } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import './slide.css'

class CryptoDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptoData: [
        { t: "Chainlink", f: 'chainlink', s: "LINK", price: '0', current: '1835.19', category: "Oracle Services" },
        { t: "Hedera-Hashgraph", f: 'hedera-hashgraph', s: "HBAR", price: '0', current: '3615.84', category: "Enterprise Solutions" },
        { t: "Binance Smart Chain", f: 'binancecoin', s: "BNB", price: '0', current: '9.2271', category: "Decentralized Finance (DeFi)" },
        { t: "Solana", f: 'solana', s: "SOL", price: '0', current: '45.9173', category: "Smart Contract Platforms" },
        { t: "Bitcoin", f: 'bitcoin', s: "BTC", price: '0', current: '0.2112218', category: "Store of Value" },
        { t: "Helium Token", f: 'helium', s: "HNT", price: '0', current: '0', category: "IoT & Connectivity" },
        { t: "IOT Token", f: 'helium-iot', s: "IOT", price: '0', current: '683.21', category: "IoT & Connectivity" },
        { t: "Ethereum", f: 'ethereum', s: "ETH", price: '0', current: '2.2924', category: "Smart Contract Platforms" },
      ]
    };

    this.handleSwitchChange = () => {
      this.setState((prevState) => ({
        showTotal: !prevState.showTotal,
      }));
    };
  }

  async updatePricesFromCoinGecko() {
    try {
      const ids = this.state.cryptoData.map(item => item.f).join(',');
      const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
      const data = await response.json();

      const updatedCryptoData = this.state.cryptoData.map(item => {
        return {
          ...item,
          price: data[item.f].usd.toString()
        };
      });

      this.setState({
        cryptoData: updatedCryptoData
      });
    } catch (error) {
      console.error("Error fetching prices from CoinGecko:", error);
    }
  }

  componentDidMount() {
    this.updatePricesFromCoinGecko();
    this.intervalID = setInterval(() => {
      this.updatePricesFromCoinGecko();
    }, 60000); // Updates every 60 seconds
  }

  componentWillUnmount() {
    clearInterval(this.intervalID); // Clear the interval when the component unmounts
  }


  render() {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF00FF', '#00FFFF', '#800080'];
// Add more colors as needed

    let total = 0;
    for (let i = 0; i < this.state.cryptoData.length; i++) {
      total += this.state.cryptoData[i].current * this.state.cryptoData[i].price;
    }

    const pieData = this.state.cryptoData.map((item) => ({
      name: item.t,
      value: parseFloat(item.current) * parseFloat(item.price),
    }));

    const categories = {};
    this.state.cryptoData.forEach((item) => {
      if (!categories[item.category]) {
        categories[item.category] = 0;
      }
      categories[item.category] += item.current * item.price;
    });
    const barData = Object.keys(categories).map((category) => ({
      name: category,
      value: categories[category],
    }));


    return (
      
      <div style={{padding:'25px', maxWidth:'800px'}}>
        <div id='totalCrypto' style={{ height: '50px' }}>
          {this.state.showTotal && <h2 className="portfolio-counter">
            ≅${total.toFixed(2)}USD
          </h2>}
        </div>
        <div style={{position:'absolute', top:'25px', right:'20vw'}}>
          <Switch onChange={this.handleSwitchChange} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', width: '700px', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>

          <PieChart width={300} height={300} style={{ position: 'relative', top: '0px', backgroundColor: 'white' }}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={pieData}
              cx={150}
              cy={100}
              innerRadius={0}
              outerRadius={80}
              fill="#8884d8"
            >
              {
                pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))
              }
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <BarChart
              width={300}
              height={300}
              data={barData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>
        </div>


        {this.state.cryptoData
          .sort((a, b) => (b.current * b.price) - (a.current * a.price))
          .map((item, index) => (
            <Crypto
              key={index}
              t={item.t}
              f={item.f}
              s={item.s}
              current={item.current}
              price={item.price}
              total={total}
            />
          ))}
      </div>
    );
  }
}

export default CryptoDashboard;


