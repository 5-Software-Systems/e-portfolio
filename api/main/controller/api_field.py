from flask_restplus import fields

# RESPONSE
response_status = 'status', fields.String(description='status of the request')
response_message = 'message', fields.String(description='message from the request')

# RESOURCE
public_id = 'public_id', fields.String(description='global resource identifier')

# USER
email = 'email', fields.String(description='email address', example='email@mail.com')
name_first = 'name_first', fields.String(description='first name', example='first_name')
name_last = 'name_last', fields.String(description='last name', example='last_name')
password = 'password', fields.String(description='password', example='password')
registered_on = 'registered_on', fields.DateTime(description='datetime user was registered')
link = 'link', fields.String(description='url link', example='www.google.com')

# AUTH
bearer_auth_token = 'bearer_auth_token', fields.String(description='JSON Web Token', example='Bearer <auth_token>')
auth_token = 'Authorization', fields.String(description='JSON Web Token')

# PORTFOLIO
portfolio_title = 'title', fields.String(description='title of portfolio')

# WIDGET
widget_type = 'type', fields.String(description='type of widget', example='about')
widget_data = 'data', fields.Raw(description='data specific to widget type', example={'p1': 'parameter 1', 'p2': 'parameter 2'})

location = 'location', fields.List(fields.Integer, description='array of 4 [x,y,w,h]', example=[1, 1, 1, 1])

file_name = 'file_name', fields.String(description='name of file', example='example.png')
