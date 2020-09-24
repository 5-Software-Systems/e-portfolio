import os


def rel_path(path, __file__):
    return os.path.join(os.path.abspath(os.path.dirname(__file__)), path)
