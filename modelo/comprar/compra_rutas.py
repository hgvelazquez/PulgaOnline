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
    '''
    Obtiene los campos del producto mediante su id
    '''
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
    



@bp.route('/existe_producto-<id>', methods=['GET','POST'])
def existe_producto(id):
    '''
    Verifica la existencia del producto in la Base de datos
    '''
    producto = id
    consulta = db.session.query(Producto).get(id)
    response = True if (consulta.disponible) == 1 else False
    return '{}'.format(response)

@bp.route('/ingresa_direccion', methods = ['GET','POST'])
def ingresa_direccion():
    '''
    Obtiene el id del usuario en session y modifica la direccionen la Base de Datos
    '''
    params = request.get_json(force=True,silent=False)
    #user = session.get('user')
    id_usuario = 4 #user['id_usuario']
    try:
        #id_usuario = params['id_usuario']
        consulta = db.session.query(Usuario).get(id_usuario)
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

@bp.route('/validar_compra')
def validar_compra():
    '''
    Valida que de elimine el producto en la Base de datos obtiene el id de session
    '''
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


@bp.route('/add')
def add():
    '''
    add producto a la base datos, SOLO ES DE PRUEBA
    '''
    id_producto = 4

    try:
        consulta = db.session.query(Producto).get(id_producto)
        consulta.disponible = 1
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