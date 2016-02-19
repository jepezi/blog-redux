import 'isomorphic-fetch';
import path from 'path';

// --------------------------------- filters

/**
 * Check if there is user in session
 */
export function authFilter(req, res, next) {
  if (!req.session.user) {
    // need return here
    return res.redirect('/admin/login');
  }

  next();
}

/**
 * Redirect if already authed
 */
function guestFilter(req, res, next) {
  if (req.session.user) {
    // need return here
    return res.redirect('/admin');
  }

  next();
}




// --------------------------------- fetch utils
async function formatResponse(response) {
  const json = await response.json();
  response.json = json;
  return response;
}

function checkResponseStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.json.message);
  error.response = response;
  throw error;
}

function handleError(error) {
  if (error && error.response) {
    console.log('error message', error.message);
    console.log('error response code', error.response.status)
  } else {
    console.log('Unhandled error!');
  }
}



const htmlPath = path.join(
  __dirname, '..', '..', 'public', 'login.html'
);
// default export
export default function handleAuthBasic(admin) {
  // Login - GET
  admin.get('/login', guestFilter, (req, res) => {
    res.sendFile(htmlPath);
  });

  // Login - POST
  admin.post('/login', (req, res) => {
    fetch('http://localhost:9001/api/v1/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: req.body.email,
        password: req.body.password,
      })
    })
    .then(formatResponse)
    .then(checkResponseStatus)
    .then(response => {
      req.session.user = response.json.user;
      res.redirect('/admin');
    })
    .catch(handleError)
  });

  // Logout - GET
  admin.get('/logout', authFilter, (req, res) => {
    res.clearCookie('connect.sid');
    req.session.destroy(function(err) {
      if (err) {
        console.warn(err);
      }

      res.redirect('/admin/login');
    });
  });
}
