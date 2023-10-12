/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("@/auth/lucia").Auth;
  type DatabaseUserAttributes = {
    delete_flg;
    username;
  };
  type DatabaseSessionAttributes = {};
}
