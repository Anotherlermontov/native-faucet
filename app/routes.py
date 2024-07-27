from flask import render_template

from app import app


@app.route('/')
def home() -> str:
    return render_template('index.jinja2')


@app.route('/swap_header')
def swap_header() -> str:
    return render_template('swap_header.jinja2')


@app.route('/swap_details')
def swap_details() -> str:
    return render_template('swap_details.jinja2')


@app.route('/swap_lineitem')
def swap_lineitem() -> str:
    return render_template('swap_lineitem.jinja2')


@app.route('/swap_skeleton')
def swap_skeleton() -> str:
    return render_template('swap_skeleton.jinja2')


@app.route('/swap_page')
def swap_page() -> str:
    return render_template('swap_page.jinja2')


@app.route('/nav_bar')
def nav_bar() -> str:
    return render_template('nav_bar.jinja2')


@app.route('/chain_selector_row')
def chain_selector_row() -> str:
    return render_template('chain_selector_row.jinja2')


@app.route('/use_account_identifier')
def use_account_identifier() -> str:
    return render_template('use_account_identifier.jinja2')


@app.route('/wallet_model')
def wallet_model() -> str:
    return render_template('wallet_model.jinja2')
