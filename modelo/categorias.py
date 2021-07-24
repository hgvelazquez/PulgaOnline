from .conexion_bd import db, ma

class Categoria(db.Model):

    id_categoria = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    nombre = db.Column(db.Unicode, nullable=False, unique=True)

    def __init__(self, id, nombre):
        self.id_categoria = id
        self.nombre = nombre


class CategoriaEsquema(ma.Schema):
    class Meta:
        fields = ('id_categoria', 'nombre')
