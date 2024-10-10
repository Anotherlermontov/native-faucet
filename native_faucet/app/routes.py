from datetime import datetime, timezone

from app import app
from flask import Response, render_template, request

from native_faucet.db_helpers.emails.queries import add_email
from native_faucet.db_helpers.events.queries import add_event


@app.route('/')
def home() -> str:
    return render_template('index.jinja2')


@app.route('/submit-email', methods=['POST'])
def submit_email() -> Response:
    email = request.get_json().get('email', None)
    ip_address = request.remote_addr
    submission_time = datetime.now(tz=timezone.utc)

    add_email(email, ip_address, submission_time)

    return Response(status=200)


@app.route('/send-event', methods=['POST'])
def send_event() -> Response:
    event_name = request.get_json().get('event_name', None)
    ip_address = request.remote_addr
    submission_time = datetime.now(tz=timezone.utc)

    add_event(event_name, ip_address, submission_time)

    return Response(status=200)
