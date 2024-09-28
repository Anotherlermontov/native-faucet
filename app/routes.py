from datetime import datetime, timezone

from flask import Response, render_template, request

from app import app


@app.route('/')
def home() -> str:
    return render_template('index.jinja2')


@app.route('/submit-email', methods=['POST'])
def submit_email() -> Response:
    email = request.get_json().get('email', None)  # noqa: F841
    ip_address = request.remote_addr  # noqa: F841
    submission_time = datetime.now(tz=timezone.utc).isoformat()  # noqa: F841

    # message = f"Email: {email}\nIP Address: {ip_address}\nDatetime: {submission_time}"

    return Response(status=200)
