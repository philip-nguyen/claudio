from flask import Flask
from flask import Flask, flash, redirect, render_template, request, session, abort
import os
import time

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

if __name__ == "__main__":
    app.secret_key = os.urandom(12)
    app.run(debug=True,host='0.0.0.0', port=4000)