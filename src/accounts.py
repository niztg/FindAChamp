"""
Account Classes
"""

from datetime import datetime
from .functions import Password

import sqlite3

__all__ = (
    'Account'
)

class Account:
    """
    Defines an account   
    Attributes:
        account_name: str = The user's account name
        password: str = The user's password
        email: str = The user's email ID
        dob: str = The user's date of birth
    """
    def __init__(self, account_name: str, password: str, email: str, dob: datetime, id: int):
        """
        Initializes the class
        """
        # written by: niz
        self._name = account_name
        self._password = password
        self._email = email
        self._dob = dob
        self._id = id

    def __repr__(self):
        return f"<{self._name} {self._id}>"
    
    @property
    def name(self):
        return self._name
    
    @property
    def password(self):
        return self._password
    
    @property
    def email(self):
        return self._email
    
    @property
    def dob(self):
        return self._dob
    
    @property
    def id(self):
        return self._id

    @classmethod
    def retrieve_info(cls, id: int):
        conn = sqlite3.connect('db/master.db')
        cursor = conn.cursor()

        cursor.execute('SELECT account_name, password, email, dob, id FROM account_info WHERE id = ?', (id,))
       
        data = cursor.fetchone()
        
        conn.close()
        return cls(*data)
    

    @classmethod
    def from_username_password(cls, account_name, password):
        """
        Initializes class from username and password
        Args:
            account_name: str
            password: str
        Returns:
            Account
        """
        conn = sqlite3.connect('db/master.db')
        cursor = conn.cursor()

        hash = Password()
        password_hashed = hash.hashing(password)

        cursor.execute('SELECT account_name, password, email, dob, id FROM account_info WHERE account_name=? AND password=?', (account_name, password_hashed))
       
        data = cursor.fetchone()
        
        conn.close()
        return cls(*data)
