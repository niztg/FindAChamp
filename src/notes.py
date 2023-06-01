"""
Where the note classes live.
all note functions written by: niz
"""

import sqlite3

from src.accounts import Account
from src.exceptions import NoteDoesntExist
from datetime import datetime

__all__ = (
    'create_note',
    'Note',
    'delete_note'
)

def create_note(author: Account, content: str, url: str):
    """
    Creates a note.
    :param author:
    :param content:
    :param url:
    :return:
    """
    current_date = datetime.now()
    # the UI will check if the note is too long,
    # it doesn't need to be built into the backend of the code directly

    conn = sqlite3.connect('db/master.db')
    cursor = conn.cursor()    
    cursor.execute("INSERT INTO notes (content, author, date, url) VALUES (?, ?, ?, ?)", [content, int(author._id), current_date, url])

    conn.commit()
    conn.close()

    return Note(author=author, content=content, date=current_date, url=url)

class Note:
    """
    Defines the note class.
    Attributes:
        author: Account = The author of the note
        content: str = The content of the note
        date: datetime = Date the note was created
        url: str = the mushroom that the note is associated with
    """

    def __init__(self, author: Account, content: str, date: datetime, url: str):
        """
        Initializes the class
        """
        self._author = author
        self._content = content
        self._date = date
        self._url = url

    def __repr__(self):
        """
        Displays information about the class
        Args:
            None
        Retuens:
            str
        """
        return f"Note written by {self._author._name} on {self._date}: {self.content}"

    @property
    def author(self):
        return self._author
    
    @property
    def content(self):
        return self._content
    
    @property
    def date(self):
        return self._date
    
    @property
    def url(self):
        return self._url
    
    @classmethod
    def fetch_note(cls, id: int, url: str):
        conn = sqlite3.connect('db/master.db')
        cursor = conn.cursor()    
        cursor.execute("SELECT * FROM notes WHERE author=? AND url=?", [id, url])

        res = cursor.fetchone()        
        conn.commit()
        conn.close()
        
        try:
            return cls(content=res[0], author=Account.retrieve_info(res[2]), date=res[1], url=res[3])
        except:
            raise NoteDoesntExist()

    def edit_note(self, new_content: str):
        """
        Edits a note.
        :param new_content:
        :return:
        """
        conn = sqlite3.connect('db/master.db')
        cursor = conn.cursor()

        cursor.execute("UPDATE notes SET content=? WHERE content=? AND author=?", (new_content, self._content, self._author._id))
        self._content = new_content
        
        conn.commit()

def delete_note(note: Note):
    conn = sqlite3.connect('db/master.db')
    cursor = conn.cursor()    
    cursor.execute("DELETE FROM notes WHERE author=? AND url=?", [(int(note.author.id)), str(note.url)])

    conn.commit()
    conn.close()

    return True