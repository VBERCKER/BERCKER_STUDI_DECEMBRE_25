import React, { useState, useEffect } from 'react';

function BannerCookies() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Vérifie si l'utilisateur a déjà accepté les cookies
    if (localStorage.getItem('accepter-cookie') !== 'true') {
      setShowBanner(true);
    }
  }, []);

  function acceptCookie() {
    console.log('les cookies sont déclenchés');
    localStorage.setItem('accepter-cookie', 'true');
    setShowBanner(false);
  }

  if (!showBanner) {
    return null; 
  }

  return (
    <div className="banner-cookies">
      <p>En poursuivant votre navigation sur ce site, vous acceptez l'utilisation de cookies pour vous proposer des services et offres adaptés à vos centres d'intérêts.</p>
      <a href="#">En savoir plus</a>
      <button id="accepter-cookie" onClick={acceptCookie}>Accepter</button>
    </div>
  );
}

export default BannerCookies;