from os import name
from flask import Blueprint, request, jsonify, abort, send_file

from os.path import splitext
from datetime import datetime
import json

from modelo.conexion_bd import db, ma
from modelo.producto import Producto, ProductoEsquema


bp = Blueprint('crud_producto', __name__)

producto_esquema = ProductoEsquema()
productos_esquema = ProductoEsquema(many=True)

@bp.route('/productos')
def get_productos():

    productos = Producto.query.all()
    # serializing as JSON
    return jsonify([p.to_dict() for p in productos])

@bp.route('/productos/<id_prod>')
def get_producto(id_prod):

    producto = Producto.query.filter_by(id_producto=id_prod).first()
    
    if producto is None:
        abort(404)
    return jsonify(producto.to_dict())

#pao
@bp.route('/productos/search/<nombre>')
def busca_productos(nombre):
    productos = Producto.query.filter(Producto.nombre.ilike(f"%{nombre}%")).all()
    
    # serializing as JSON

    return jsonify([p.to_dict() for p in productos])

@bp.route('/static/<fileName>')
def _get_image(fileName):
    fileToSend = "data/imagenesProducto/" + fileName
    _, img_type = splitext(fileName)
    return send_file(fileToSend, mimetype=f"image/{img_type[1:]}")