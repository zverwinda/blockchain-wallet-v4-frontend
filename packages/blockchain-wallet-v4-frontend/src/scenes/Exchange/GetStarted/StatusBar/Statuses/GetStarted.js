import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import { actions } from 'data'
import { Button } from 'blockchain-info-components'

const ActionButton = styled(Button).attrs({ nature: 'primary' })`
  font-weight: 500;
`

export const GetStarted = ({ verifyIdentity }) => (
  <ActionButton onClick={verifyIdentity}>
    <FormattedMessage
      id='scenes.exchange.getstarted.status.getstarted.button'
      defaultMessage='Get Started'
    />
  </ActionButton>
)

const mapDispatchToProps = dispatch => ({
  verifyIdentity: () =>
    dispatch(actions.components.identityVerification.verifyIdentity())
})

export default connect(undefined, mapDispatchToProps)(GetStarted)
