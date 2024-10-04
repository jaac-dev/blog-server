export enum AuthErrorKind {
  INVALID_PROVIDER = "invalid_provider",
}

const AUTH_ERROR_TRANSLATIONS = {
  [AuthErrorKind.INVALID_PROVIDER]: "An invalid provider has been specified.",
};

const AUTH_ERROR_STATUS_CODES = {
  [AuthErrorKind.INVALID_PROVIDER]: 404,
};

export class AuthError extends Error {
  public statusCode: number;

  constructor(kind: AuthErrorKind) {
    super(AUTH_ERROR_TRANSLATIONS[kind]);

    this.statusCode = AUTH_ERROR_STATUS_CODES[kind];
  }
}
