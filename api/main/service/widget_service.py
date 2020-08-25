from ..model import WidgetBase, WidgetAbout
from ..util.exception import WidgetNotFound

def get_all_widgets():
    return WidgetBase.query.all()


def get_a_widget(widget_id):
    widget = WidgetBase.query.filter_by(widget_id=widget_id)
    if not widget:
        raise WidgetNotFound('Widget {} not found'.format(widget_id))
    return widget, 200

def create_new_about_widget(data):
    try:
        new_base_widget = WidgetBase(
            widget_type=data['widget_type'],
            widget_data=data['widget_data'],
        )
        new_base_widget.save()

        new_about_widget = WidgetAbout(data=new_base_widget.widget_data)
        new_about_widget.save()

        return {'status': 'success',
                'message': 'Successfully registered.',
                }, 201
    except Exception as e:
        return {'status': 'fail',
                'message': 'Some error occurred. Please try again.',
                'debug': str(e),
                }, 401
