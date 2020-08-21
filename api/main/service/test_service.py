from ..model import WidgetBase


def service_test1():
    return {'response': 'test1'
            }, 200


def service_test2():
    a = WidgetBase.query.filter_by(id=1).first()
    print(a.__dict__)
    return {'response': str(a)
            }, 200
