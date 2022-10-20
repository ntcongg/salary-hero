const jwt = require('jwt-decode');

const isURLInScope = (scope) => scope.some((s) => s.includes('exporter'));

const ONE_MINUTE = 60;

const checkValidateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(400).send({ error: 'No token provided' });
    return;
  }
  try {
    const destatusd = jwt(token);
    if (!destatusd.sub) {
      res.status(401).send({ error: 'Not authorized' });
      return;
    }
    if ((destatusd.exp - ONE_MINUTE) < (Date.now() / 1000)) {
      res.status(401).send({ error: 'Token expired' });
      return;
    }
    let scope = [];
    scope = destatusd.scope.split(' ');
    if (!isURLInScope(scope)) {
      res.status(403).send({ error: 'Permission denied' });
      return;
    }
    next();
  } catch (err) {
    res.status(400).send({ error: 'Invalid token' });
  }
};

module.exports = {
  checkValidateToken,
};
