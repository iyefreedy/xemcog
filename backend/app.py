import os
from src import app

app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), 'static/images/drawings')

print(app.config['UPLOAD_FOLDER'])

if __name__ == '__main__':
    app.run(debug=True)
