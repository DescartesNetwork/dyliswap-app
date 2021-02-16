export default theme => ({
  noWrap: {
    flexWrap: 'nowrap',
  },
  stretch: {
    flex: '1 1 auto',
  },
  icon: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  tools: {
    width: `calc(100% - ${theme.spacing(2)}px)`,
    margin: `${theme.spacing(-1)}px ${theme.spacing(1)}px`,
  },
  badge: {
    padding: 0,
  },
  badgeIcon: {
    fontSize: '1rem'
  },
  verified: {
    background: 'linear-gradient(45deg, hsla(217, 100%, 50%, 1) 0%, hsla(186, 100%, 69%, 1) 100%)'
  },
  unverified: {
    background: 'linear-gradient(45deg, hsla(333, 100%, 53%, 1) 0%, hsla(33, 94%, 57%, 1) 100%)'
  },
  subtitle: {
    fontSize: 10,
    fontWeight: theme.typography.fontWeightLight,
    color: theme.palette.text.secondary
  },
  opticalCorrection: {
    paddingTop: `0px !important`
  },
  action: {
    backgroundColor: '#F2F3F5',
    borderRadius: theme.shape.borderRadius,
    paddingTop: theme.spacing(2)
  },
  chip: {
    boxShadow: theme.shadows[2],
    transition: theme.transitions.create(),
    '&:hover': {
      boxShadow: theme.shadows[4],
    },
  },
});
