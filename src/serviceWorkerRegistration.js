function registerValidSW(swUrl) {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.onstatechange = () => {
              if (installingWorker.state === "installed") {
                if (navigator.serviceWorker.controller) {
                  console.log(
                    "Une nouvelle version est disponible. Veuillez recharger la page pour mettre à jour."
                  );
                } else {
                  console.log(
                    "L'application est prête à fonctionner hors ligne."
                  );
                }
              }
            };
          }
        };
      })
      .catch((error) => {
        console.error(
          "Erreur lors de l'enregistrement du Service Worker :",
          error
        );
      });
  }
  
  function checkValidServiceWorker(swUrl) {
    fetch(swUrl)
      .then((response) => {
        if (
          response.status === 404 ||
          response.headers.get("content-type").indexOf("javascript") === -1
        ) {
          navigator.serviceWorker.ready.then((registration) => {
            registration.unregister().then(() => {
              window.location.reload();
            });
          });
        } else {
          registerValidSW(swUrl);
        }
      })
      .catch(() => {
        console.log(
          "Aucune connexion Internet détectée. L'application fonctionnera en mode hors ligne."
        );
      });
  }
  
  export function register(isLocalhost) {
    if ("serviceWorker" in navigator) {
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
      if (publicUrl.origin !== window.location.origin) {
        return;
      }
  
      window.addEventListener("load", () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        if (isLocalhost) {
          checkValidServiceWorker(swUrl);
  
          navigator.serviceWorker.ready.then(() => {
            console.log("Le Service Worker est prêt.");
          });
        } else {
          registerValidSW(swUrl);
        }
      });
    }
  }
  
  export function unregister() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.unregister();
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la désinscription du Service Worker :",
            error
          );
        });
    }
  }