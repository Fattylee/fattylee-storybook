const {Storage} = require('@google-cloud/storage');
const {googleCloudStorage: {
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  GOOGLE_PROJECT_ID,
}} = require('../config/keys');

const storage = new Storage({
    credentials: {
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY,
    },
    projectId: GOOGLE_PROJECT_ID,
});
/*
const keyJson = {
  type: "service_account",
  project_id: "fattylee-storybook-img",
  private_key_id: "458bbee95310de39f7949e1212006bd724fd6f53",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC+amo3NUGR1f8d\nQkiVBi5W8aNLu0KQzAxs2zVjKXdzVSGd7SYC+YI7ksCTgpHgpxNMMFtXdOuyw4Mg\ns+0P+HNT/+ER5rNRz/vXYnhuJgtCeXaxLr2nVQYBEcfjeIs2/H/tIaeK54fPTcJz\nfPtle/kL7UQ/kwEJQXkvwpm3y3ne46ss2LdLFld9ipycSsGFOpk90bR+oGOC/oxt\n7bEFst67jHHa1dROwKDAvAw2gfO5f69vV8qgczsJSnOJst0ixdHlLolJIKkMXIx2\npFLucIbuT6A4w7+w4QOCO2GxBkVKzGk4xIwu4rmrhURE6kPBhZ92DCvinpbLYEgc\nfyQXdrm/AgMBAAECggEAH0j9UebLyCSVztPbeF3/R8UEebvhpZ1bk+226Xz1pZsL\nc+weflyfm3QddImpDXUbRD2ptEZ/N0F3jkGhpdRsoRTTK41w/EnPbJrpgzIi+squ\nx/u6/f7dMVh03sMpHwwAuhBOe7xWDFG6rMjlxnhw+cGuS0Jhkt4RWtnT8buvtqv+\nymBRkq39IUTkDeqoGsHe0PQcyIGP/eS0UL1qhWkepgEMG1YeRsgQZGUA39IYm55K\nQkAmpclvGWcRHO3ehd++sbd9v4kEANSjsEEvwELqMFxvzUJl67f8O0oKJJFAhGlG\n4mUXAWrbmsmGLuz9kmVwovJjQZAwbRdn7BxgXi86KQKBgQDeyW8NowATMH2B9PJC\njiGyu42sD2HHnjk6lmaepRbsIzupLWJ+zIzalfPLs40a/HxMMz+jptBxf+a7+YCN\n8rTRa2uKqdCBgHi0tE3td8RjNZgFJwm/gqBNaMBY/lLphZgdbh+HXBeNjw2nL4vW\nmDHDprVdPe4Z3gj2syQ/Gk7n0wKBgQDazYyU0GFF7WmKhOMMK5W6i5xpEpn61vT1\np/foulgXvIAPw2Ou+dJI9zJ6zcbVASmSsUFRISXWTLxgjiLunMRIXCI/4DVS2Brc\nhEGd8SkfDhwRDCSEDJsKjJ+zTtpClbsRn0ux7Je3C1CHRW36rRqBQg9sGPxMZVpO\nLoVeaur+5QKBgG0JMzP+YcwCgHq5MlRGkdGTH4xlXtq+4o19DK56aBScTdfH4Zvj\natCUcWRx9Q6PIhp9PplOzFewXHIFc9iFP9/67gBIikbHZMw0LquZYWGY2lUzPP8g\n5Gneab1kg5nNC5zjx8SM2u4qZGk9yPf3NuvlzH/dDopUdBihpozHyHSHAoGAUuyw\nKP5Iv33ZEByJCGXEW2zqHJBmN0EcmbXNKTDmjihsyIyezQP1hJ3bTduLTdMg9G2l\neZ/8fRmcE2QLLS/Q3DO+70KEMx+gHo8pZzitAw4P6Q4XEMzOPdNJ+2UZJz8kJOug\nfpBSd5ccMAhKREUy1GY6/hcCF9oZvaO3/C69XVkCgYAq8dawkH8YB6jmdsbjlPza\nXl/urflCTHZ4lQ6tNRhPgO/1Ur4syh2W9MUCaX0AML2o0R+WbXT32hQG2cU8m24O\nczaPNNG2Cl/nR6P3IYaza5Cp9jXKkLZkkoDj5aOWYmaCIf92V8CMzJ150yqWanEw\naGHKq0jTpdCxZ/9A7rp+uA==\n-----END PRIVATE KEY-----\n",
  client_email: "uploads-966@fattylee-storybook-img.iam.gserviceaccount.com",
  client_id: "109009206075861836239",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/uploads-966%40fattylee-storybook-img.iam.gserviceaccount.com"
};

const debug = require('debug')('active:app')
//const keyFilename = require('path').join(__dirname, '../config/fattylee-storybook-img-458bbee95310.json');
let keyFilename = JSON.stringify(keyJson);
//keyFilename = JSON.parse(keyFilename);
//const keyFilename = keyJson;
debug(keyFilename);
const projectId = GOOGLE_PROJECT_ID;

const storage = new Storage({projectId, keyFilename});*/


module.exports = storage;