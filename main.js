// MetaMask 연결
var btnConnectMetaMask = document.getElementById('connectButton');
btnConnectMetaMask.addEventListener('click', function() {
  if (!window.ethereum) {
      alert('Please install MetaMask first.');
  } else {
      ethereum.request({ method: 'eth_requestAccounts' })
      .then(function(accounts){
          var account = accounts[0];
          alert('Connected to ' + account);
      })
      .catch(function (error) {
          // User denied account access...
      });
  }
});

// WalletConnect 연결
var btnConnectWalletConnect = document.getElementById('connectWalletConnect');
btnConnectWalletConnect.addEventListener('click', function() {
   const WalletConnect = require("@walletconnect/client");
   const connector = new WalletConnect();

   connector.on("session_update", (error, payload) => {
     if (error) {
       throw error;
     }

     // Get provided accounts and chainId
     const { accounts, chainId } = payload.params[0];
     alert('Connected to ' + accounts[0]);
   });

   connector.createSession().catch((error) => {
     console.error(error);
   });

   // QR 코드 생성
   var qrCodeImg = document.getElementById('qrCode');
   qrCodeImg.src = connector.uri;
});
