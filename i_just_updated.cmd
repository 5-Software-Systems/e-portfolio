:: WINDOWS only
:: Runs a cmd script to update dependencies and create a test environment for the db

venv\Scripts\pip install -r requirements.txt

venv\Scripts\python -m api --reset

venv\Scripts\python -m api --populate

npm install
