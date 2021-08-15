from flask import Blueprint, request, jsonify, abort, send_file, session
from flask.helpers import make_response

from os.path import splitext
from datetime import datetime
import json

from modelo.conexion_bd import db, ma
from modelo.producto import Producto, ProductoEsquema
from modelo.categoria import Categoria
from modelo.usuario import Usuario

"""
Modulo con la funcionalidad del controlador del CRUD del 
Producto. 

Como Flask no requiere clases, y en nuestro diseño las clases
del controlador tenían un solo método, lo dejamos en un solo
módulo.
"""

bp = Blueprint('crud_producto', __name__)

producto_esquema = ProductoEsquema()
productos_esquema = ProductoEsquema(many=True)

@bp.route('/agregar-producto', methods=['POST'])
def agregar_producto():
    """
    Agrega el producto con los datos recibidos a travès de una
    petición HTTP, siempre y cuando haya un vendedor con 
    sesión iniciada.
    En caso contrario, manda un 404.
    """

    imFile = request.files['imageUpload']
    prodFile = request.files['producto']
    usFile = request.files['usuario']

    # Parse json from file to dict
    prod_json = json.load(prodFile)
    prod_json = json.loads(prod_json)

    # Parse user json from file to dict
    us_json = json.load(usFile)
    id = us_json['id_usuario']

    user = Usuario.query.filter_by(id_usuario=id).first()
    if (user is None) or (not user.tipo_usuario):
        return make_response(jsonify("El usuario no es vendedor"), 403)

    nombre = prod_json['nombre']
    descripcion = prod_json['descripcion']
    categoria = prod_json['categoria']
    disponible = prod_json['disponible']
    precio = prod_json['precio']
    id_vendedor = prod_json['id_vendedor']

    imagen = datetime.now().strftime("%Y_%b_%d_%H_%M_%S")
    _, img_type = splitext(imFile.filename)
    imagen = f"{imagen}_{id_vendedor}{img_type}"

    imFile.save(f"data/imagenesProducto/{imagen}")

    producto_nuevo = Producto(nombre, descripcion, disponible, precio,
                                imagen, categoria, id_vendedor)
    
    db.session.add(producto_nuevo)
    db.session.commit()
    
    return producto_esquema.jsonify(producto_nuevo)
    
@bp.route('/eliminar-producto/<id_prod>', methods=['DELETE'])
def eliminar_producto(id_prod):
    """
    Elimina el producto correspondiente, siempre y cuando el 
    vendedor dueño del producto tenga la sesión iniciada.
    En caso contrario, manda un 404.
    """
    id = request.json['id_usuario']
    producto = Producto.query.filter_by(id_producto=id_prod, id_vendedor=id).first()
    
    if producto is None:
        return make_response(jsonify("El usuario no es el dueño del producto"), 403)
    else:
        db.session.delete(producto)
        db.session.commit()

    return jsonify(producto.to_dict())

@bp.route('/actualizar-producto/<id_prod>', methods=['POST'])
def actualizar_producto(id_prod):
    """
    Actualiza el producto con los datos recibidos a travès de una
    petición HTTP, siempre y cuando el vendedor dueño del producto
    tenga la sesión iniciada.
    En caso contrario, manda un 404.
    """
    # Autenticación de Usuario
    usFile = request.files['usuario']
    # Parse user json from file to dict
    us_json = json.load(usFile)
    id = us_json['id_usuario']

    producto = Producto.query.filter_by(id_producto=id_prod, id_vendedor=id).first()
    
    if producto is None:
        return make_response(jsonify("El usuario no es el dueño del producto"), 403)
    else:
        # Puede no ser enviada
        imFile = request.files.get('imageUpload')
        # Siempre es enviado
        prodFile = request.files['producto']
        
        # Parse json from file to dict
        prod_json = json.load(prodFile)
        prod_json = json.loads(prod_json)
    
        producto.descripcion = prod_json['descripcion']
        producto.disponible = prod_json['disponible']
        producto.precio = prod_json['precio']
    
        if not (imFile is None):
            imagen = producto.imagen
            imFile.save(f"data/imagenesProducto/{imagen}")

    db.session.commit()
    return jsonify(producto.to_dict())
    
    
@bp.route('/productos-vendedor', methods=['GET', 'POST'])
def get_productos_vendedor():
    """
    Manda la lista de los productos del vendedor que está en sesión.
    """

    id = request.json['id_usuario']
    tipo = request.json['tipo_usuario']
    if not (tipo == 'true'):
        return make_response(jsonify("El usuario no es vendedor"), 403)
    
    # El usuario si es vendedor
    productos = Producto.query.filter_by(id_vendedor=id).all()
    # serializing as JSON
    return jsonify([p.to_dict() for p in productos])



@bp.route('/productos-vendedor/<id_prod>', methods=['GET', 'POST'])
def get_producto_vendedor(id_prod):
    """
    Manda los detalles de un cuyo id es id_prod, si el vendedor
    que lo solicita es quien lo agregó, un 404 en caso contrario.
    """
    id = request.json['id_usuario']
    producto = Producto.query.filter_by(id_producto=id_prod, id_vendedor=id).first()
    
    if producto is None:
        abort(404)
    return jsonify(producto.to_dict())



@bp.route('/get-cats', methods=['GET', 'POST'])
def get_cats():
    """
    Manda la lista de categorías de nuestra base de datos.
    """
    tipo = request.json['tipo_usuario']
    if not (tipo == "true"):
        return make_response(jsonify("El usuario no es vendedor"), 403)
    cats = Categoria.query.all()
    # serializing as JSON
    return jsonify([c.nombre for c in cats])



@bp.route('/static/<fileName>')
def _get_image(fileName):
    """
    Manda la imagen del producto solicitada.
    """
    fileToSend = "data/imagenesProducto/" + fileName
    _, img_type = splitext(fileName)
    return send_file(fileToSend, mimetype=f"image/{img_type[1:]}")

