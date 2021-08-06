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
    session['id_producto'] = int(id)
    try:
        consulta = db.session.query(Producto).get(id)
        nombre = consulta.nombre
        descripcion = consulta.descripcion
        categoria = consulta.categoria
        disponible = consulta.disponible
        precio = consulta.precio
        imagen = consulta.imagen
        id_vendedor = consulta.id_vendedor
        id_producto = int(id)
        producto_nuevo = Producto(nombre, descripcion, disponible, precio,
                                    imagen, categoria, id_vendedor)
        return producto_esquema.jsonify(producto_nuevo)
    except:
        return 'error',503
    



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


#eliminar
@bp.route('/existe_producto-<id>', methods=['GET','POST'])
def existe_producto(id):
    producto = id
    consulta = db.session.query(Producto).get(id)
    response = True if (consulta.disponible) == 1 else False
    return '{}'.format(response)


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
    id_usuario = 1 #user['id_usuario']
    try:
        #id_usuario = params['id_usuario']
        consulta = db.session.query(Usuario).get(1)
        consulta.calle = params['calle']
        consulta.numext = params['numeroExt']
        consulta.colonia = params['colonia']
        consulta.ciudad = params['ciudad']
        consulta.estado = params['estado']
    except:
        return jsonify(
                    message="Error en la bases de datos.",
                    category="error",
                    status=500
                )

    db.session.commit()
    return jsonify(
                message='Se a cambiado la direccion',
                category="success",
                status=200
            )

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

@bp.route('/validar_compra')
def validar_compra():
    id_producto = 4
    #id_producto = session.get('id_producto')
    try:
        consulta = db.session.query(Producto).get(id_producto)
        if(int(consulta.disponible) == 0 ):
            return jsonify(
                    message="Producto sin existencias",
                    category="error",
                    status=500
                )
        consulta.disponible = int(consulta.disponible) - 1 
    except:
        return jsonify(
                    message="Error en la bases de datos.",
                    category="error",
                    status=500
                )

    db.session.commit()
    return jsonify(
                message='Compra valida',
                category="success",
                status=200
            )

        