import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv

from flask import request
from requests.models import PreparedRequest
from jinja2 import Template

load_dotenv()
gmail_user = os.environ.get('SMTP_EMAIL')
gmail_password = os.environ.get('SMTP_PASS')


def send_email(addr, text: MIMEText):
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.ehlo()
    server.starttls()
    server.login(gmail_user, gmail_password)

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

    file = os.path.join(os.path.abspath(os.path.dirname(__file__)), '../util/password-reset.html')
    with open(file) as f:
        html_template = Template(f.read())
    html = html_template.render(link=req.url)
    email_text = MIMEText(html, 'html')

    send_email(user.email, email_text)
