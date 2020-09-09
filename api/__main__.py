import argparse
import sys

from .test import db
from .test.api_test import run_tests
from . import build_app

parser = argparse.ArgumentParser()


parser.usage = 'python -m api [-h] [-r] [-d] [-b] [-p]'

parser.add_argument('-r', '--run', action='store_true', help='run the api')

parser.add_argument('-d', '--debug', action='store_true', default=False, help='run in debug mode False by default')

parser.add_argument('-b', '--reset', action='store_true', help='delete db and create new one')

parser.add_argument('-p', '--populate', action='store_true', help='populate the database with data from api/test/data')

parser.add_argument('-t', '--testapi', action='store_true', help='test the api end points')

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

if args.testapi:
    db.delete()
    db.create()
    run_tests()
    input("Tests done, [ENTER] to clear db")
    db.delete()
    db.create()

if args.run:
    build_app().run(debug=args.debug)
