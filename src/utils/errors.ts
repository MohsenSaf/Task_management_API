export class BadRequestError extends Error {
  status = 400

  constructor(message: string = "Bad Request") {
    super(message)
  }
}

export class NotAuthorizeError extends Error {
  status = 401

  constructor(message: string = "Not Authorize") {
    super(message)
  }
}

export class ForbiddenError extends Error {
  status = 403

  constructor(message: string = "Forbidden") {
    super(message)
  }
}

export class NotFoundError extends Error {
  status = 404

  constructor(message: string = "Not Found") {
    super(message)
  }
}
