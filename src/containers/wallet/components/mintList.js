import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import isEqual from 'react-fast-compare';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import { UnfoldMoreRounded, EmojiObjectsRounded, SearchRounded } from '@material-ui/icons';

import MintAvatar from './mintAvatar';

import styles from './styles';
import { setError } from 'modules/ui.reducer';
import { openWallet } from 'modules/wallet.reducer';
import { getMint, getMints } from 'modules/mint.reducer';


const EMPTY = {
  loading: false,
}

class MintList extends Component {
  constructor() {
    super();

    this.state = {
      anchorEl: null,
      search: '',
      data: [],
    }
  }

  componentDidMount() {
    this.fetchData(this.onSelect);
  }

  componentDidUpdate(prevProps, prevState) {
    const { anchorEl: prevAnchorEl } = prevState;
    const { anchorEl } = this.state;
    if (!isEqual(prevAnchorEl, anchorEl)) {
      if (Boolean(anchorEl)) this.fetchData();
      else this.setState({ search: '' });
    }
  }

  fetchData = (condition = {}) => {
    const { getMints, getMint, setError } = this.props;
    return this.setState({ loading: true }, () => {
      return getMints(condition, 5, 0).then(mintIds => {
        return Promise.all(mintIds.map(mintId => getMint(mintId)));
      }).then(data => {
        return this.setState({ ...EMPTY, data });
      }).catch(er => {
        return this.setState({ ...EMPTY, data: [] }, () => {
          return setError(er);
        });
      });
    });
  }

  onSelect = (mintAddress) => {
    const { onChange } = this.props;
    const { data } = this.state;
    if (!data || !data.length) return onChange('');
    return this.setState({ anchorEl: null }, () => {
      const address = mintAddress || data[0].address || '';
      return onChange(address);
    });
  }

  onSearch = (e) => {
    const search = e.target.value || '';
    return this.setState({ search }, () => {
      const { search: value } = this.state;
      if (!value) return this.fetchData();
      if (value.length < 2) return this.setState({ data: [] });
      const condition = { '$or': [{ name: { '$regex': value, '$options': 'gi' } }, { symbol: { '$regex': value, '$options': 'gi' } }] }
      return this.fetchData(condition, 1000, 0);
    });
  }

  onOpen = (e) => {
    return this.setState({ anchorEl: e.target });
  }

  onClose = () => {
    return this.setState({ anchorEl: null });
  }

  render() {
    const { classes } = this.props;
    const { icon, size, edge, openWallet } = this.props;
    const { anchorEl, data, search, loading } = this.state;

    return <Fragment>
      <Tooltip title="Token List">
        <IconButton color="secondary" size={size} onClick={this.onOpen} edge={edge}>
          {icon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={this.onClose}
      >
        <Grid container spacing={2} className={classes.tools}>
          <Grid item xs={12}>
            <TextField
              placeholder="Name or Symbol"
              value={search}
              onChange={this.onSearch}
              InputProps={{
                startAdornment: <IconButton edge="start" disabled>
                  <SearchRounded />
                </IconButton>,
                endAdornment: loading ? <IconButton edge="end" disabled>
                  <CircularProgress size={17} />
                </IconButton> : null
              }}
              onKeyDown={e => e.stopPropagation()}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} />
        </Grid>
        {data.map(({ address, icon, symbol, name }) => {
          return <MenuItem key={address} onClick={() => this.onSelect(address)}>
            <Grid container spacing={1} className={classes.noWrap} alignItems="center">
              <Grid item>
                <MintAvatar icon={icon} />
              </Grid>
              <Grid item className={classes.stretch}>
                <Typography className={classes.address}>{address}</Typography>
                <Typography variant="body2">{name} - {symbol}</Typography>
              </Grid>
            </Grid>
          </MenuItem>
        })}
        {!data.length ? <ListSubheader disableSticky>No result</ListSubheader> : null}
        <ListSubheader disableSticky>Your token not presented here</ListSubheader>
        <MenuItem>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EmojiObjectsRounded />}
            onClick={openWallet}
            fullWidth
          >
            <Typography>Register tokens</Typography>
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  wallet: state.wallet,
  mint: state.mint,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setError,
  openWallet,
  getMint, getMints
}, dispatch);

MintList.defaultProps = {
  icon: <UnfoldMoreRounded />,
  size: 'small',
  edge: false,
  onChange: () => { },
}

MintList.propTypes = {
  icon: PropTypes.object,
  size: PropTypes.string,
  edge: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChange: PropTypes.func,
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MintList)));