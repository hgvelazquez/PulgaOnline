from .conexion_bd import db, ma 

class Producto(db.Model):
    
    id_producto = db.Column(db.Integer, primary_key=True, unique=True)
    nombre = db.Column(db.Unicode)
    descripcion = db.Column(db.Unicode)
    disponible = db.Column(db.Integer)
    precio = db.Column(db.Float)
    imagen = db.Column(db.Unicode)
    categoria = db.Column(db.Unicode, nullable=False)
    id_vendedor = db.Column(db.Integer, nullable=False)
    
    def __init__(self, nombre, descripcion, disponible, precio, 
                imagen, categoria, id_vendedor):
        self.nombre = nombre
        self.descripcion = descripcion
        self.disponible = disponible
        self.precio = precio
        self.imagen = imagen
        self.categoria = categoria
        self.id_vendedor = id_vendedor

class ProductoEsquema(ma.Schema):
    class Meta:
        fields = ('id_producto', 'nombre', 'descripcion', 
                'disponible', 'precio', 'imagen', 'categoria', 'id_vendedor')
