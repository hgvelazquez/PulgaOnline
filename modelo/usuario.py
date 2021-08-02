from .conexion_bd import db, ma

class Usuario(db.Model):

    id_usuario = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    nombre = db.Column(db.Unicode, nullable=False)
    correo = db.Column(db.Unicode, nullable=False)
    contrasena = db.Column(db.Unicode, nullable=False)
    tipo_usuario = db.Column(db.Boolean, nullable=False)
    calle = db.Column(db.Unicode, nullable=True)
    numeroExt = db.Column(db.Unicode, nullable=True)
    colonia = db.Column(db.Unicode, nullable=True)
    ciudad = db.Column(db.Unicode, nullable=True)
    estado = db.Column(db.Unicode, nullable=True)

    def tiene_direccion(user,db):
        '''
        Verifica si el usuario tiene direccion
        regresa un boolean
        '''
        id = user['id_usuario']
        try:
            consulta = db.session.query(Usuario).get(id)
            return True
        except:
            return False

class UsuarioEsquema(ma.Schema):
    class Meta:
        fields = ('id_usuario', 'nombre', 'correo', 
                'contrasena', 'tipo_usuario', 'calle', 
                'numExt', 'colonia', 'ciudad' ,'estado')
