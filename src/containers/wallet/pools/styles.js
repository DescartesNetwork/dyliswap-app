export default theme => ({
  noWrap: {
    flexWrap: 'nowrap',
  },
  stretch: {
    flex: '1 1 auto',
  },
  error: {
    marginTop: -11,
    marginLeft: 14,
    fontSize: 10
  },
  card: {
    transition: theme.transitions.create(),
    '&:hover': {
      boxShadow: theme.shadows[6],
    },
  },
});
