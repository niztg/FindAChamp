'''
account creation functions
'''

from datetime import datetime
from .exceptions import InvalidDateOfBirth, NotOldEnough, UsernameNotRightLength, EmailNotProper
from random import randint

import hashlib

import re
import sqlite3

__all__ = (
    'dob_creator',
    'create_account',
    'store_find',
    'Password',
    'create_note'
)

EMAIL_REGEX = r"[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}"

# Sources for regex help:
# https://stackoverflow.com/questions/58560831/email-regex-within-python
# https://docs.python.org/3/library/re.html

email_regex = re.compile(EMAIL_REGEX)

def dob_creator(mm, dd, yyyy):
    """
    Checks if a valid date of birth has been entered
    Args:
        mm: month
        dd: day
        yyyy: year
    Returns:
        None if valid
        Error if invalid
    """
    if len(str(mm)) not in [1, 2] or len(str(dd)) != 2 or len(str(yyyy)) != 4:
        raise InvalidDateOfBirth()
    else:
        return datetime(*map(int, [yyyy, mm, dd]))
    
def create_account(username: str, password: str, email: str, mm: int, dd: int, yyyy: int):
    """
    Creates an account.
    Args:
        username: str
        password: str
        email: str
        id: int
    Returns:
        None
    """
    # written by: khalid (upto L77)
    conn = sqlite3.connect('db/master.db')
    cursor = conn.cursor()

    # hashing password
    hash = Password()
    password_hashed = hash.hashing(password)

    if not (6 <= len(username) <= 20):
        raise UsernameNotRightLength()

    # written by niz (upto L86)
    date = dob_creator(int(mm), int(dd), int(yyyy))

    if not ((datetime.now() - date).days / 365) >= 13:
        raise NotOldEnough()

    if not (check := email_regex.search(email)) or not (check.end() - check.start() == len(email)):
        raise EmailNotProper()
    
    id = lambda: randint(1000000, 9999999)
    id = id()
    # ID: a random 7-digit number.
    
    res = lambda id: cursor.execute("SELECT * FROM account_info WHERE id=?", id)

    while cursor.fetchall():
        id = id()
        res(id)
    
    # khalid (until L94)
    cursor.execute(
        'INSERT INTO account_info (account_name, password, email, dob, id) VALUES (?, ?, ?, ?, ?)',
        (username, password_hashed, email, date, id))

    conn.commit()
    conn.close()

def store_find(author: int, url: str, species: str):
    conn = sqlite3.connect("db/master.db")
    cursor = conn.cursor()

    cursor.execute("INSERT INTO finds (id, url, found, species) VALUES (?, ?, ?, ?)", (author, url, datetime.now(), species))

    conn.commit()
    conn.close()

class Password:
    def __init__(self, hash_algorithm = 'sha512'):
        self.hash_algorithm = hash_algorithm
        
    def hashing(self, password):
        bytes = password.encode('utf-8')
        
        bytes_hashed = hashlib.new(self.hash_algorithm,bytes).digest()
        
        return(bytes_hashed.hex())
        