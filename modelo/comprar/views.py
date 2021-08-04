from flask import Blueprint, request, jsonify,  session ,make_response,redirect,url_for

bp = Blueprint('comprar', __name__, url_prefix='/comprar')

from modelo.producto import Producto, ProductoEsquema
from modelo.usuario import Usuario, UsuarioEsquema

from modelo.comprar.pago import Pago


from modelo.conexion_bd import db, ma


producto_esquema = ProductoEsquema()
productos_esquema = ProductoEsquema(many=True)
usuario_esquema = Usuario()

@bp.route('/<id>')
def producto_id(id):
    consulta = db.session.query(Producto).get(id)
    
    nombre = consulta.nombre
    descripcion = consulta.descripcion
    categoria = consulta.categoria
    disponible = consulta.disponible
    precio = consulta.precio
    imagen = consulta.imagen
    id_vendedor = consulta.id_vendedor
    id_producto = int(id)
    producto_nuevo = Producto(nombre, descripcion, precio, disponible, 
                                imagen, categoria, id_vendedor)
    
    return producto_esquema.jsonify(producto_nuevo)



#Solo envia los datos del producto
@bp.route('/VistaProducto', methods= ['POST'])
def VistaProducto():
    params = request.get_json(force=True,silent=False)
    
    session['producto'] = params['producto']
    session['user'] = params['usuario'] #session.get('user')
    print(session['producto'])
    print(session['user'])

    response =  make_response(redirect(url_for('comprar.existe_producto'))) #verificar por que hay que usar url_for
   
    return response

@bp.route('/existe_producto', methods=['GET','POST'])
def existe_producto():
    producto = session.get('producto')
    print('Estamos existe')
    print(producto)
    flag = Producto.esta_disponible(producto,db)
    if flag:
        response =  make_response(redirect(url_for('comprar.direccion')))
        return response
    else:
        return 'Error producto no disponible'


@bp.route('/direccion', methods = ['GET','POST'])
def direccion():
    print('Estamos en direccion')
    user = session.get('user')
    flag = Usuario.tiene_direccion(user,db)
    if flag:
        
        return 'Tiene dirreccion'
    else:
        return make_response(redirect(url_for('comprar.ingresa_direccion')))

@bp.route('/ingresa_direccion', methods = ['POST'])
def ingresa_direccion():
    params = request.get_json(force=True,silent=False)
    #user = session.get('user')
    #id_usuario = user['id_usuario']
    try:
        id_usuario = params['id_usuario']
        record = db.session.query(Usuario).get(id_usuario)
        record.calle = params['calle']
        record.numext = params['numeroExt']
        record.colonia = params['colonia']
        record.ciudad = params['ciudad']
        record.estado = params['estado']
    except:
        return 'Database connection failed', 500

    db.session.commit()
    return 'pues checa le bd'

@bp.route('/agregar_pago', methods = ['GET','POST'])
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