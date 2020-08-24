import argparse
import sys

from .test import db
from . import build_app

parser = argparse.ArgumentParser()


parser.usage = 'python -m api [-h] [-r] [-d] [-b] [-p]'

parser.add_argument('-r', '--run', action='store_true', help='run the api')

parser.add_argument('-d', '--debug', action='store_true', default=False, help='run in debug mode False by default')

parser.add_argument('-b', '--reset', action='store_true', help='delete db and create new one')

parser.add_argument('-p', '--populate', action='store_true', help='populate the database with data from api/test/data')

args = parser.parse_args()

if len(sys.argv) < 2:
    print('arguments are required')
    parser.print_help()
    exit()

if args.reset:
    db.delete()
    db.create()

if args.populate:
    db.populate()

if args.run:
    build_app().run(debug=args.debug)
