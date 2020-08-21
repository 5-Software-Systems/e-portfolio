from flask_restplus import fields

# RESPONSE
response_status = 'status', fields.String(description='status of the request', example='success')
response_message = 'message', fields.String(description='message from the request', example='Successfully logged in.')

# USER
user_public_id = 'public_id', fields.String(description='new_user Identifier')
email = 'email', fields.String(description='new_user email address')
name_first = 'name_first', fields.String(description='new_user first name')
name_last = 'name_last', fields.String(description='new_user last name')
password = 'password', fields.String(description='new_user password')

# AUTH
bearer_auth_token = 'bearer_auth_token', fields.String(example='Bearer <auth_token>')
auth_token = 'Authorization', fields.String(description='JSON Web Token')

# WIDGET
widget_type = 'type', fields.String(description='type of widget')
widget_data = 'data', fields.Raw(description='data specific to widget type')
