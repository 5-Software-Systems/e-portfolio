raise DeprecationWarning("use 'python manage.py'")

import argparse
import sys

from api.test import db as dbtest
from api.test.api_test import run_tests
from app import app, db

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
    dbtest.delete()
    dbtest.create(app, db)

if args.populate:
    dbtest.populate(app)

if args.testapi:
    dbtest.delete()
    dbtest.create(app, db)
    run_tests()
    input("Tests done, [ENTER] to clear db")
    dbtest.delete()
    dbtest.create(app, db)

if args.run:
    app.run(debug=args.debug)
