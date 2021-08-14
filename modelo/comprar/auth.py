# flask
import re
from flask import Blueprint,jsonify,request, session
from flask.wrappers import Response
from werkzeug.security import check_password_hash, generate_password_hash


#models
#from models.conexion_bd import Session

from modelo.conexion_bd import db, ma
from modelo.producto import Producto, ProductoEsquema
from modelo.usuario import Usuario, UsuarioEsquema
from flask_mail import Mail, Message #para envio de email
usuario_esquema = UsuarioEsquema()

#utilities
#from utilities.usuario_utils import generar_contrasenia, envia_mail


bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/signin', methods=['POST'])
def signin():
    #session = Session()
    params = request.get_json(force=True,silent=False)
    nombre = params['nombre']
    correo = params['correo']
    contrasena = params['contrasena']
    tipo_usuario = True if params['tipo_usuario'] == "vendedor" else False
     
    calle = None #params['calle']
    numext = None#params['numext']
    colonia = None#params['colonia']
    ciudad = None#params['ciudad']
    estado = None#params['estado']
    #try:
    user = Usuario.query.filter_by(correo=correo).first()
    if (user != None):
        return jsonify("El correo: {} ya se encuentra en uso".format(correo)), 400
    else:        
        usuario_nuevo= Usuario(nombre, correo, contrasena, tipo_usuario,calle, 
                numext, colonia, ciudad ,estado)
        db.session.add(usuario_nuevo)
        db.session.commit()
        return 'Usuario nuevo agregado',200

@bp.route('/login', methods=('GET', 'POST'))
def login():
    params = request.get_json(force=True,silent=False)
    correo = params['correo']
    contrasena = params['contrasena']
    print(correo)
    print(contrasena)
    try:
        user = Usuario.query.filter_by(correo=correo).first()
    except:
        return 'todo mal en base de datos',500
    print("1"*64)
    if user is None:
            print("2"*64)
            return 'Correo incorecto.',401
    elif  user.contrasena != contrasena:
            print("3"*64)
            return 'constrasena incorrecta',401
    else:
        print("4"*64)
        nombre= user.nombre
        correo= user.correo
        tipo_usuario= user.tipo_usuario
        calle=user.calle 
        numext= user.numext
        colonia= user.colonia
        ciudad = user.ciudad
        estado= user.estado

        usuario_nuevo= Usuario(nombre, correo, contrasena, tipo_usuario,calle, 
                numext, colonia, ciudad ,estado)
        print("5"*64)
       # session.clear() #error alguar en session
        session[user] = usuario_nuevo
        return usuario_esquema.jsonify(usuario_nuevo),200

@bp.route('/logout')
def logout():
    session.clear()
    return 'logout',200