const path = require("path");

const renderPage = (res, viewPath, viewModel = {}) => {
  return res.status(200).render(path.join(__dirname, viewPath), viewModel);
};

const ensureFound = (record, message) => {
  if (!record) {
    const error = new Error(message);
    error.status = 404;
    throw error;
  }

  return record;
};

module.exports = {
  ensureFound,
  renderPage,
};