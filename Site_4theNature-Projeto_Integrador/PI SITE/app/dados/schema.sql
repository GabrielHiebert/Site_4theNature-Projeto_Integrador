DROP TABLE IF EXISTS Pessoa;

CREATE TABLE Pessoa (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  senha TEXT NOT NULL,
  foto VARBINARY
);

DROP TABLE IF EXISTS Publicacao;

CREATE TABLE Publicacao (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_pessoa INTEGER NOT NULL,
  legenda TEXT,
  foto BLOB NOT NULL,
  curtidas INTEGER,
  CONSTRAINT FK_id_pessoa FOREIGN KEY (id_pessoa) REFERENCES Pessoa (id)
);
