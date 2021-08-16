# flask
import re
from flask import Blueprint,jsonify,request, session
from flask.helpers import make_response
from flask.wrappers import Response
from werkzeug.security import check_password_hash, generate_password_hash

from modelo.conexion_bd import db, ma
from modelo.producto import Producto, ProductoEsquema
from modelo.usuario import Usuario, UsuarioEsquema
from flask_mail import Mail, Message #para envio de email
usuario_esquema = UsuarioEsquema()

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/signup', methods=['POST'])
def signup():
    """
    Agrega un nuevo user a la base de datos 
    """
    params = request.get_json(force=True,silent=False)
    nombre = params['nombre']
    correo = params['correo']
    contrasena = params['contrasena']
    tipo_usuario = True if params['tipo_usuario'] == "vendedor" else False

    user = Usuario.query.filter_by(correo=correo).first()
    if (user != None):
        return make_response(jsonify("El correo: {} ya se encuentra en uso".format(correo)), 400)
    else:        
        usuario_nuevo= Usuario(nombre, correo, contrasena, tipo_usuario)
        db.session.add(usuario_nuevo)
        db.session.commit()
        return make_response(jsonify('Usuario nuevo agregado'),200)

@bp.route('/login', methods=('GET', 'POST'))
def login():
    """
    Recibe un correo y contraseña y verifica que los datos 
    enviados estén en la base de datos.
    """
    params = request.get_json(force=True,silent=False)
    correo = params['correo']
    contrasena = params['contrasena']
    
    try:
        user = Usuario.query.filter_by(correo=correo).first()
    except:
        return make_response(jsonify('Error en el servidor'),500)
    
    if user is None:
        return  make_response(jsonify('Correo incorrecto.'),401)
    elif  user.contrasena != contrasena:
        return  make_response(jsonify( 'Constraseña incorrecta'),401)
    else:
        user.contrasena = 'not_sent'
        return  make_response(usuario_esquema.jsonify(user),200)


@bp.route('/logout')
def logout():
    # todo: logout
    return 'logout',200