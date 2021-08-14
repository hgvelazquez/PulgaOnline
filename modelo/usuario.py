from .conexion_bd import db, ma

class Usuario(db.Model):

    id_usuario = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    nombre = db.Column(db.Unicode, nullable=False)
    correo = db.Column(db.Unicode, nullable=False)
    contrasena = db.Column(db.Unicode, nullable=False)
    tipo_usuario = db.Column(db.Boolean, nullable=False)
    calle = db.Column(db.Unicode, nullable=True)
    numext = db.Column(db.Unicode, nullable=True)
    colonia = db.Column(db.Unicode, nullable=True)
    ciudad = db.Column(db.Unicode, nullable=True)
    estado = db.Column(db.Unicode, nullable=True)

    def __init__(self, nombre, correo,contrasena, tipo_usuario, calle, 
                numext, colonia, ciudad ,estado):
        self.nombre = nombre
        self.correo = correo
        self.contrasena = contrasena
        self.tipo_usuario = tipo_usuario
        self.calle = calle
        self.numext = numext
        self.colonia = colonia
        self.ciudad = ciudad
        self.estado = estado

class UsuarioEsquema(ma.Schema):
    class Meta:
        fields = ('id_usuario', 'nombre', 'correo', 
                'contrasena', 'tipo_usuario', 'calle', 
                'numext', 'colonia', 'ciudad' ,'estado')
