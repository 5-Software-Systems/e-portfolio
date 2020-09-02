from requests.models import PreparedRequest

from ..service import user_service


def send_reset_email(public_id, token):
    user = user_service.get_a_user(public_id)
    req = PreparedRequest()
    req.prepare(url='http://127.0.0.1:5000/passsword_reset', params={'user': public_id, 'auth': token})
    print('email sent to" {}\n\t{}'.format(user.email, req.url))

