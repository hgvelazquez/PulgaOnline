from os import name
from flask import Blueprint, jsonify, abort, request

from flask.helpers import make_response

from modelo.conexion_bd import db, ma
from modelo.producto import Producto, ProductoEsquema
from modelo.usuario import Usuario


bp = Blueprint('catalogo', __name__)

producto_esquema = ProductoEsquema()
productos_esquema = ProductoEsquema(many=True)

@bp.route('/productos', methods=['POST'])
def get_productos(): 
    """
    Regresa la lista de productos si un comprador ha 
    iniciado sesión.
    """
    id = request.json['id_usuario']
    user = Usuario.query.filter_by(id_usuario=id).first()
    if (user is None) or (user.tipo_usuario):
        return make_response(jsonify("El usuario no es comprador"), 403)
    
    productos = Producto.query.all()
    # serializing as JSON
    return jsonify([p.to_dict() for p in productos])

@bp.route('/productos/<id_prod>', methods=['POST'])
def get_producto(id_prod):
    """
    Regresa los detalles del producto para la opciñon 
    de comprar si un comprador está en sesión
    """
    id = request.json['id_usuario']
    user = Usuario.query.filter_by(id_usuario=id).first()
    if (user is None) or (user.tipo_usuario):
        return make_response(jsonify("El usuario no es comprador"), 403)
    
    producto = Producto.query.filter_by(id_producto=id_prod).first()
    
    if producto is None:
        return make_response(jsonify("Producto no encontrado"), 404)
    
    return jsonify(producto.to_dict())

@bp.route('/productos/search/<nombre>')
def busca_productos(nombre):
    productos = Producto.query.filter(Producto.nombre.ilike(f"%{nombre}%")).all()
    
    # serializing as JSON
    return jsonify([p.to_dict() for p in productos])
