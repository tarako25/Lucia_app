/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("@/auth/lucia").Auth;
  type DatabaseUserAttributes = {
    username;
    delete_flg;
  };
  type DatabaseSessionAttributes = {};
}
