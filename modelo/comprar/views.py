from flask import Blueprint, request, jsonify,  session ,make_response,redirect,url_for

bp = Blueprint('comprar', __name__, url_prefix='/comprar')

from modelo.producto import Producto, ProductoEsquema
from modelo.usuario import Usuario, UsuarioEsquema

from modelo.comprar.pago import Pago


from modelo.conexion_bd import db, ma


producto_esquema = ProductoEsquema()
productos_esquema = ProductoEsquema(many=True)
usuario_esquema = Usuario()

@bp.route('/hola')
def hola():
    return 'hola'




#Solo envia los datos del producto
@bp.route('/VistaProducto', methods= ['POST'])
def ver_producto():
    params = request.get_json(force=True,silent=False)
    
    session['producto'] = params['producto']
    session['user'] = params['usuario'] #session.get('user')
    print(session['producto'])
    print(session['user'])

    response =  make_response(redirect(url_for('comprar.existencia'))) #verificar por que hay que usar url_for
   
    return response

@bp.route('/exitstencia', methods=['GET','POST'])
def existencia():
    print('estoy en existencia')
    producto = session.get('producto')
    print('Estamos en comprar')
    print(producto)
    flag = Producto.esta_disponible(producto,db)
    if flag:
        response =  make_response(redirect('/direccion'))
        return response
    else:
        return 'Error producto no disponible'


@bp.route('/direccion', methods = ['GET','POST'])
def agregar_direccion():
    print('Estamos en direccion')
    user = session.get('user')
    flag = Usuario.tiene_direccion(user,db)
    if flag:
        
        return 'Tiene dirreccion'
    else:
        return make_response(redirect('/ingresa_direccion'))

@bp.route('/ingresa_direccion', methods = ['POST'])
def ingresa_direccion():
    params = request.get_json(force=True,silent=False)
    #user = session.get('user')
    #id_usuario = user['id_usuario']
    id_usuario = params['id_usuario']
    record = db.session.query(Usuario).get(id_usuario)
    record.calle = params['calle']
    record.numext = params['numeroExt']
    record.colonia = params['colonia']
    record.ciudad = params['ciudad']
    record.estado = params['estado']

    db.session.commit()
    return 'pues checa le bd'

@bp.route('/pago', methods = ['GET','POST'])
def agregar_pago():
    params = request.get_json(force=True)
    tarjeta  = params['tarjeta']
    num_cuenta = params['num_cuenta']
    codigo = params['codigo']
    nombre_titular = params['nombre_titular']
    pago = Pago(tarjeta, num_cuenta, codigo, nombre_titular)
    flag = pago.validar_pago()
    if flag[1]:
        print(flag[0])
        return flag[0]
    print(flag[0])
    return flag[0]