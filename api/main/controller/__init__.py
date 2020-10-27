from .status_controller import namespace as status_namespace
from .auth_controller import namespace as auth_namespace
from .user_controller import namespace as user_namespace
from .portfolio_controller import namespace as portfolio_namespace
from .portfolio_share_controller import namespace as portfolio_share_namespace
from .widget_controller import namespace as widget_namespace
from .file_controller import namespace as file_namespace
from .api_model import namespace as model_namespace

namespaces = [
    status_namespace,
    auth_namespace,
    user_namespace,
    portfolio_namespace,
    portfolio_share_namespace,
    widget_namespace,
    file_namespace,
    model_namespace,
]
