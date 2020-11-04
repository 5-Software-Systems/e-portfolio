import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from flask import request, current_app
from requests.models import PreparedRequest
from jinja2 import Template

from ..util.exception import RequestError
from ..util.funcs import rel_path


def send_email(addr, text: MIMEText, subject):
    gmail_user, gmail_pass = current_app.config['GMAIL_USER'], current_app.config['GMAIL_PASS']
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.ehlo()
    server.starttls()
    server.login(gmail_user, gmail_pass)

    msg = MIMEMultipart()
    msg['From'] = gmail_user
    msg['To'] = addr
    msg['Subject'] = subject
    msg.attach(text)

    try:
        server.send_message(msg)
    except smtplib.SMTPRecipientsRefused as e:
        raise RequestError(e.args[0]['email'][1].decode('utf-8'))


def send_reset_email(user, token):
    # user = user_service.get_a_user(public_id)
    req = PreparedRequest()
    host = request.host_url
    req.prepare(url=f'{host}password_reset', params={'user': user.public_id, 'auth': token})

    if current_app.config['TESTING']:
        return req.url

    file = rel_path('../util/password-reset.html', __file__)
    with open(file) as f:
        html_template = Template(f.read())
    html = html_template.render(
        link=req.url,
        host=host,
        header='Reset Your Password',
        name=user.name_first,
        body="Tap the button below to reset your password. "
             "If you didn't request a new password, you can safely delete this email.",
        button_text="Reset Password",
    )
    email_text = MIMEText(html, 'html')

    send_email(user.email, email_text, "Reset your password")

    if current_app.config['DEBUG']:
        return req.url


def send_verify_email(user, token):
    req = PreparedRequest()
    host = request.host_url
    req.prepare(url=f'{host}verify', params={'user': user.public_id, 'auth': token})

    if current_app.config['TESTING']:
        return req.url

    file = rel_path('../util/password-reset.html', __file__)
    with open(file) as f:
        html_template = Template(f.read())
    html = html_template.render(
        link=req.url,
        host=host,
        header='Verify Your Account',
        name=user.name_first,
        body="Tap the button below to verify your account, the link expires within 30 minutes.",
        button_text="Verify Account",
    )
    email_text = MIMEText(html, 'html')

    send_email(user.email, email_text, "Verify your account")

    if current_app.config['DEBUG']:
        return req.url
