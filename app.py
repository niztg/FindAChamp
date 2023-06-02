from flask import Flask as flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from dataclasses import dataclass

from src.functions import create_account
from src.notes import create_note
from src.accounts import Account
from datetime import datetime

app = flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///../db/master.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

@dataclass
class account_info(db.Model):
    account_name = db.Column(db.Text)
    password = db.Column(db.Text)
    email = db.Column(db.Text)
    id = db.Column(db.Integer, primary_key=True)
    dob = db.Column(db.DateTime)

    def __init__(self, account_name, password, email, id, dob):
        self.account_name = account_name
        self.password = password
        self.email = email
        self.id = id
        self.dob = dob

class AccountSchema(ma.Schema):
    class Meta:
        fields = ('account_name', 'password', 'email', 'id', 'dob')

account_schema = AccountSchema()
accounts_schema = AccountSchema(many=True)

@dataclass
class notes(db.Model):
    content = db.Column(db.Text)
    url = db.Column(db.Text, primary_key=True)
    author = db.Column(db.Integer)
    date = db.Column(db.DateTime)

    def __init__(self, content, url, author, date):
        self.content = content
        self.url = url
        self.author = author
        self.date = date

class NotesSchema(ma.Schema):
    class Meta:
        fields = ('content', 'url', 'author', 'date')

note_schema = NotesSchema()
notes_schema = NotesSchema(many=True)

@dataclass
class finds(db.Model):
    id = db.Column(db.Integer)
    url = db.Column(db.String)
    found = db.Column(db.DateTime, primary_key=True)
    species = db.Column(db.String)

    def __init__(self, id, url, found, species):
        self.id = id
        self.url = url
        self.found = found
        self.species = species

class FindSchema(ma.Schema):
    class Meta:
        fields = ('id', 'url', 'found', 'species')

find_schema = FindSchema()
finds_schema = FindSchema(many=True)

@app.route('/notes/get/<author>', methods = ['GET'])
def get_author(author):
    note = notes.query.all()
    res = notes_schema.dump(note)
    
    results = [x for x in res if x['author'] == int(author)]
    return jsonify(results)

@app.route('/notes/add', methods = ['POST'])
def add_note():
    content = request.json['content']
    url = request.json['url']
    id = request.json['id']
    
    create_note(Account.retrieve_info(id), content, url)

@app.route('/accounts/get/<id>', methods=['GET'])
def get_account(id):
    account = account_info.query.get(int(id))
    return account_schema.jsonify(account)
                                 

@app.route('/finds/get/<id>', methods=['GET'])
def get_author_finds(id):
    find_s = finds.query.all()
    results = finds_schema.dump(find_s)

    results = [x for x in results if x['id'] == int(id)]
    return jsonify(results)

