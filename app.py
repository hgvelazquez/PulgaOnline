from flask.globals import session
from modelo.usuario import Usuario
from flask import Flask, request, jsonify
from modelo.conexion_bd import db, ma
from modelo.producto import Producto, ProductoEsquema

#agrega el blueprint de comprar a app
from modelo.comprar import compra_rutas
from modelo.comprar import auth
from flask_cors import CORS
from flask_mail import Mail, Message



app = Flask(__name__)
CORS(app)



app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'onlinepulga@gmail.com'
app.config['MAIL_PASSWORD'] = 'pulgon123'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)



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

@app.route("/send")
def send():
    user = session.get('user')
    producto = session.get('producto')
    msg = Message('Gracias por tu compra', sender = app.config.get('MAIL_USERNAME'), recipients = [user['email']])
    msg.body = "Gracias por realizar la compra del producto {}".format(producto.nombre)
    mail.send(msg)
    return "Sent"

#agrega las rutas de comprar
app.register_blueprint(compra_rutas.bp)
app.register_blueprint(auth.bp)


if __name__ == '__main__':
    app.run(debug=True)