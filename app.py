from flask import Flask, request, jsonify, abort, send_file
from flask_cors import CORS

from os.path import splitext
from datetime import datetime
import json

from modelo.conexion_bd import db, ma
from modelo.producto import Producto, ProductoEsquema
from modelo.categoria import Categoria

app = Flask(__name__)
CORS(app)

db.init_app(app)
ma.init_app(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ispulga:postpass20212@localhost/PulgaOnline'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

producto_esquema = ProductoEsquema()
productos_esquema = ProductoEsquema(many=True)

@app.route('/static/<fileName>')
def _get_image(fileName):
    fileToSend = "data/imagenesProducto/" + fileName
    _, img_type = splitext(fileName)
    return send_file(fileToSend, mimetype=f"image/{img_type[1:]}")

@app.route('/agregar-producto', methods=['POST'])
def agrega_producto():

    imFile = request.files['imageUpload']
    prodFile = request.files['producto']
    
    # Parse json from file to dict
    prod_json = json.load(prodFile)
    prod_json = json.loads(prod_json)
    
    nombre = prod_json['nombre']
    descripcion = prod_json['descripcion']
    categoria = prod_json['categoria']
    disponible = prod_json['disponible']
    precio = prod_json['precio']
    id_vendedor = prod_json['id_vendedor']

    imagen = datetime.now().strftime("%Y_%b_%d_%H_%M_%S")
    _, img_type = splitext(imFile.filename)
    imagen = f"{imagen}_{id_vendedor}{img_type}"

    imFile.save(imagen)

    
    producto_nuevo = Producto(nombre, descripcion, precio, disponible, 
                                imagen, categoria, id_vendedor)
    
    db.session.add(producto_nuevo)
    db.session.commit()
    
    return producto_esquema.jsonify(producto_nuevo)
    
    
@app.route('/productos-vendedor')
def get_productos_vendedor(): 

    productos = Producto.query.filter_by(id_vendedor=1).all()
    # serializing as JSON
    return jsonify([p.to_dict() for p in productos])

@app.route('/productos-vendedor/<id_prod>')
def get_producto_vendedor(id_prod): 

    producto = Producto.query.filter_by(id_producto=id_prod, id_vendedor=1).first()
    
    if producto is None:
        abort(404)
    return jsonify(producto.to_dict())

@app.route('/eliminar-producto/<id_prod>', methods=['DELETE'])
def eliminar_producto(id_prod): 

    producto = Producto.query.filter_by(id_producto=id_prod, id_vendedor=1).first()
    
    if producto is None:
        abort(404)
    else:
        db.session.delete(producto)
        db.session.commit()

    return jsonify(producto.to_dict())

@app.route('/actualizar-producto/<id_prod>', methods=['POST'])
def actualizar_producto(id_prod): 

    producto = Producto.query.filter_by(id_producto=id_prod, id_vendedor=1).first()
    
    if producto is None:
        abort(404)
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

@app.route('/get-cats')
def get_cats(): 

    cats = Categoria.query.all()
    # serializing as JSON
    return jsonify([c.nombre for c in cats])

if __name__ == '__main__':
    app.run(debug=True)
