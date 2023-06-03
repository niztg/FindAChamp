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
    email_verified = db.Column(db.Boolean, default=False)

    def __init__(self, account_name, password, email, id, dob, email_verified):
        self.account_name = account_name
        self.password = password
        self.email = email
        self.id = id
        self.dob = dob
        self.email_verified = email_verified

class AccountSchema(ma.Schema):
    class Meta:
        fields = ('account_name', 'password', 'email', 'id', 'dob', 'email_verified')

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

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    hashed_password = hashlib.sha512(password.encode('utf-8')).hexdigest()

    account = account_info.query.filter_by(account_name=username, password=hashed_password).first()

    if account:
        #valid
        return jsonify({'message': 'Login successful', 'account': account_schema.dump(account)})
    else:
        #invalid
        return jsonify({'message': 'Invalid username or password'})

@app.route('/register', methods=['POST'])
def register():
    account_name = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')


    existing_account = account_info.query.filter_by(email=email).first()
    if existing_account:
        return jsonify({'message': 'Email already exists'})

    hashed_password = hashlib.sha512(password.encode('utf-8')).hexdigest()

    id = random.randint(100000000, 999999999)
    dob = date.today()

    new_account = account_info(account_name=account_name, password=hashed_password, email=email,id=id, dob=dob, email_verified=False)
    db.session.add(new_account)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'})



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

@app.route('/edit/<id>/<date>', methods=['POST'])
def add_note(id, date):
    user_ = notes.query.filter_by(author=int(id), date=date)

    user_.content = request.json('content')

    db.session.commit()

if __name__ == "__main__":
    db.create_all()
