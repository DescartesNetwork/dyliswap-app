import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { PowerSettingsNewRounded } from '@material-ui/icons';

import styles from './styles';
import { setError } from 'modules/ui.reducer';
import { unsetWallet } from 'modules/wallet.reducer';


class Wallet extends Component {

  disconnect = () => {
    const { setError, unsetWallet } = this.props;
    return unsetWallet().then(re => {
      // Nothing
    }).catch(er => {
      return setError(er);
    });
  }

  render() {
    const { classes } = this.props;
    const {
      ui: { width },
      wallet: { user: { address } }
    } = this.props;

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2} alignItems="center" className={classes.noWrap}>
          <Grid item className={classes.stretch}>
            <Typography variant={width < 600 ? 'h4' : 'h2'}>SenWallet</Typography>
          </Grid>
          {address ? <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={this.disconnect}
              startIcon={<PowerSettingsNewRounded />}
              fullWidth
            >
              <Typography>Disconnect</Typography>
            </Button>
          </Grid> : null}
        </Grid>
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  wallet: state.wallet,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setError,
  unsetWallet,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Wallet)));