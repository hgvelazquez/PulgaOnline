from flask import Flask, request, jsonify, abort
from flask_cors import CORS

from modelo.conexion_bd import db, ma
from modelo.producto import Producto, ProductoEsquema

app = Flask(__name__)
CORS(app)

db.init_app(app)
ma.init_app(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ispulga:postpass20212@localhost/PulgaOnline'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

producto_esquema = ProductoEsquema()
productos_esquema = ProductoEsquema(many=True)


@app.route('/agregar-producto', methods=['POST'])
def agrega_producto():
    nombre = request.json['nombre']
    descripcion = request.json['descripcion']
    categoria = request.json['categoria']
    disponible = request.json['disponible']
    precio = request.json['precio']
    imagen = request.json['imagen']
    id_vendedor = request.json['id_vendedor']
    
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
        producto.descripcion = request.json['descripcion']
        producto.disponible = request.json['disponible']
        producto.precio = request.json['precio']
        db.session.commit()

    return jsonify(producto.to_dict())


if __name__ == '__main__':
    app.run(debug=True)
