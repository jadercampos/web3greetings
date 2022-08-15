import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import GuiaDoMochileiroDasGalaxias from '../abis/GuiaDoMochileiroDasGalaxias.json'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = GuiaDoMochileiroDasGalaxias.networks[networkId]
    if(networkData) {
      const guia = web3.eth.Contract(GuiaDoMochileiroDasGalaxias.abi, networkData.address)
      this.setState({ guia })
      const tipCount = await guia.methods.tipCount().call()
      this.setState({ tipCount })
      // Load Tips
      for (var i = 1; i <= tipCount; i++) {
        const tip = await guia.methods.tips(i).call()
        this.setState({
          tips: [...this.state.tips, tip]
        })
      }
      this.setState({ loading: false})
    } else {
      window.alert('GuiaDoMochileiroDasGalaxias contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      tipCount: 0,
      tips: [],
      loading: true
    }

    this.createTip = this.createTip.bind(this)
  }

  createTip(author, description) {
    this.setState({ loading: true })
    this.state.guia.methods.createTip(author, description).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main
                  tips={this.state.tips}
                  createTip={this.createTip}/>
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
