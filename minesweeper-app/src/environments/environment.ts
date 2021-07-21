// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: 
  {
    // dev
    apiKey: "AIzaSyBitkDr3o8hJBh-lm5tZntwmKhTWiSPEpk",
    authDomain: "mein-sweeper-d5995.firebaseapp.com",
    projectId: "mein-sweeper-d5995",
    storageBucket: "mein-sweeper-d5995.appspot.com",
    messagingSenderId: "703933725685",
    appId: "1:703933725685:web:2eebce5b1d7a16efba7ebc"
  },
  scores_collection: "scores"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
