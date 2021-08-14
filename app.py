from flask.globals import session
from flask.helpers import make_response
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


#configuracion para mandar correo
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
    '''
    Eviar un correo 
    '''
    #user = session.get('user')
    #producto = session.get('producto')
    email = 'correo_@usuario.com'
    msg = Message('Gracias por tu compra', sender = app.config.get('MAIL_USERNAME'), recipients = [email])
    msg.body = "Gracias por realizar la compra del producto"
    mail.send(msg)
    return make_response(jsonify('sent'),200)

#agrega las rutas de comprar
app.register_blueprint(compra_rutas.bp)
app.register_blueprint(auth.bp)


if __name__ == '__main__':
    app.run(debug=True)