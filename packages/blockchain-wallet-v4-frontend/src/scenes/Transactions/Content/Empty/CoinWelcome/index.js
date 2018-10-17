import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import { actions, selectors } from 'data'
import BtcWelcome from './template.btc'
import BchWelcome from './template.bch'
import EthWelcome from './template.eth'

class CoinWelcomeContainer extends React.PureComponent {
  render () {
    const {
      coin,
      canBuyBtc,
      btcBalance,
      bchBalance,
      ethBalance,
      showCoinIntro
    } = this.props
    const exchangeBtc = ethBalance + bchBalance > 0
    const exchangeBch = ethBalance + btcBalance > 0
    const exchangeEth = btcBalance + bchBalance > 0
    const partnerBtc = canBuyBtc.cata({
      Success: val => val,
      Loading: () => false,
      Failure: () => false,
      NotAsked: () => false
    })
    switch (coin) {
      case 'BCH':
        return (
          <BchWelcome
            displayed={showCoinIntro}
            handleClick={() => {
              this.props.preferencesActions.setCoinShowIntro('BCH', false)
            }}
            handleRequest={() => {
              this.props.modalActions.showModal('RequestBch')
            }}
            exchange={exchangeBch}
          />
        )
      case 'ETH':
        return (
          <EthWelcome
            displayed={showCoinIntro}
            handleClick={() => {
              this.props.preferencesActions.setCoinShowIntro('ETH', false)
            }}
            handleRequest={() => {
              this.props.modalActions.showModal('RequestEther')
            }}
            exchange={exchangeEth}
          />
        )
      default:
        return (
          <BtcWelcome
            displayed={showCoinIntro}
            handleClick={() => {
              this.props.preferencesActions.setCoinShowIntro('BTC', false)
            }}
            handleRequest={() => {
              this.props.modalActions.showModal('RequestBitcoin')
            }}
            partner={partnerBtc}
            exchange={exchangeBtc}
          />
        )
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  ethBalance: selectors.core.data.ethereum.getBalance(state).getOrElse(0),
  bchBalance: selectors.core.data.bch.getBalance(state).getOrElse(0),
  btcBalance: selectors.core.data.bitcoin.getBalance(state).getOrElse(0),
  showCoinIntro: selectors.preferences.getCoinShowIntro(state, ownProps.coin),
  canBuyBtc: selectors.exchange.getCanTrade(state, 'Buy')
})

const mapDispatchToProps = dispatch => ({
  preferencesActions: bindActionCreators(actions.preferences, dispatch),
  modalActions: bindActionCreators(actions.modals, dispatch)
})

CoinWelcomeContainer.propTypes = {
  coin: PropTypes.oneOf(['BTC', 'BCH', 'ETH']).isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoinWelcomeContainer)