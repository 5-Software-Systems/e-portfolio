class ServerError(Exception):
    status_code = 500
    error_message = 'Internal server error'

    def __init__(self, error_message=None, status_code=None):
        if error_message:
            self.error_message = error_message
        if status_code:
            self.status_code = status_code


class RequestError(ServerError):
    status_code = 400
    error_message = 'Request was incorrect, check and try again'
    pass


class ResourceError(ServerError):
    status_code = 404
    error_message = 'Resource not found'
    pass


class UserNotFound(ResourceError):
    def __init__(self, public_id):
        self.error_message = 'User <{}> not found'.format(public_id)
    pass


class FileNotFound(ResourceError):
    def __init__(self, public_id):
        self.error_message = 'File <{}> not found'.format(public_id)
    pass


class UserAlreadyExists(ResourceError):
    status_code = 409
    error_message = 'User already exists'
    pass


class PortfolioNotFound(ResourceError):
    def __init__(self, public_id):
        self.error_message = 'Portfolio <{}> not found'.format(public_id)
    pass


class WidgetNotFound(ResourceError):
    def __init__(self, public_id):
        self.error_message = 'Widget <{}> not found'.format(public_id)
    pass


class AuthenticationError(ServerError):
    status_code = 401
    error_message = 'Authentication error'
    pass


class TokenBlacklisted(AuthenticationError):
    status_code = 401
    error_message = 'Token blacklisted. Please log in again.'
    pass


class TokenExpired(AuthenticationError):
    status_code = 401
    error_message = 'Signature expired. Please log in again.'
    pass


class TokenInvalid(AuthenticationError):
    status_code = 401
    error_message = 'Invalid bearer_auth_token. Please log in again.'
    pass


class LoginNotFound(AuthenticationError):
    status_code = 401
    error_message = 'Login details incorrect, check and try again'
    pass

