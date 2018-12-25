import Web3 from 'web3';
import { config } from '../config';
let web3;
const getProvider = () => {
    const provider = new Web3.providers.WebsocketProvider(config.mainnet)
    provider.on('error', () => {
        web3.setProvider(getProvider())
    })
    provider.on('end', () => {
        web3.setProvider(getProvider())
    })
    return provider
}
web3 = new Web3(getProvider());



export { web3};