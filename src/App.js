import React, { useEffect, useState } from 'react';

function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    (async () => {
      setUserInfo(await getUserInfo());
    })();
  }, []);

  async function getUserInfo() {
    try {
      const response = await fetch('/.auth/me');
      const payload = await response.json();
      const { clientPrincipal } = payload;
      return clientPrincipal;
    } catch (error) {
      console.error('No profile could be found');
      return undefined;
    }
  }
  const redirect = window.location.pathname;

  return (
    <div>
      <h1>Azure Static Web Apps  demo</h1>
      <div>
      {!userInfo &&
              <a  href={`/.auth/login/aad?post_login_redirect_uri=${redirect}`}>
                logins
              </a>
            } 
            {userInfo && <a href={`/.auth/logout?post_logout_redirect_uri=${redirect}`}>Logout</a>}
      </div>
      <div>
        {userInfo && (
          <div>
            Hello {userInfo.userDetails}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
