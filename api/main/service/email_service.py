import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from flask import request, current_app
from requests.models import PreparedRequest
from jinja2 import Template

from ..util.funcs import rel_path


def send_email(addr, text: MIMEText):
    gmail_user, gmail_pass = current_app.config['GMAIL_USER'], current_app.config['GMAIL_PASS']
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.ehlo()
    server.starttls()
    server.login(gmail_user, gmail_pass)

    msg = MIMEMultipart()
    msg['From'] = gmail_user
    msg['To'] = addr
    msg['Subject'] = "Reset Password"
    msg.attach(text)

    server.send_message(msg)


def send_reset_email(user, token):
    # user = user_service.get_a_user(public_id)
    req = PreparedRequest()
    host = request.host_url
    url = host + 'password_reset'
    req.prepare(url=url, params={'auth': token})

    file = rel_path('../util/password-reset.html', __file__)
    with open(file) as f:
        html_template = Template(f.read())
    html = html_template.render(link=req.url, host=host, name=user.name_first)
    email_text = MIMEText(html, 'html')

    send_email(user.email, email_text)
