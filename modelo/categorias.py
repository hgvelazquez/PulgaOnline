from .conexion_bd import db, ma

class Categoria(db.Model):

    nombre = db.Column(db.Unicode, primary_kery=True, nullable=False, unique=True)

    def __init__(self, nombre):
        self.nombre = nombre


class CategoriaEsquema(ma.Schema):
    class Meta:
        fields = ('nombre')
