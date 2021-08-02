from flask import Flask, request, jsonify
from modelo.conexion_bd import db, ma
from modelo.producto import Producto, ProductoEsquema

#agrega el blueprint de comprar a app
from modelo.comprar import views

app = Flask(__name__)

db.init_app(app)
ma.init_app(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ramondb:ramon@localhost/PulgaOnline'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#agregamos llave para la creacion de sessions
app.config['SECRET_KEY'] = 'LLAVE SECRETA'

producto_esquema = ProductoEsquema()
productos_esquema = ProductoEsquema(many=True)


@app.route('/producto', methods=['POST'])
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

#agrega las rutas de comprar
app.register_blueprint(views.bp)


if __name__ == '__main__':
    app.run(debug=True)