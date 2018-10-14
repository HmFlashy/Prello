

module.exports = (req, res) => {
  res.status(200).json({
    card: {
      name: 'My card',
      id: req.params.idCard,
    },
  });
};
