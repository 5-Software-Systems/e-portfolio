from collections import namedtuple

from flask_restplus import fields


dtoField = namedtuple('name', 'type')

email = (
    'email',
    fields.String(description='new_user email address')
)
password = (
    'password',
    fields.String(description='new_user password')
)
user_public_id = (
    'public_id',
    fields.String(description='new_user Identifier')
)
bearer_auth_token = (
    'bearer_auth_token',
    fields.String(example='Bearer <auth_token>')
)
response_status = (
    'status',
    fields.String(description='status of the request', example='success')
)
response_message = (
    'message',
    fields.String(description='message from the request', example='Successfully logged in.')
)
auth_token = (
    'Authorization',
    fields.String(description='JSON Web Token')
)
