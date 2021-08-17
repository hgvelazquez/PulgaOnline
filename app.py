from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_mail import Mail, Message
# Para el login
from flask.helpers import make_response
from datetime import timedelta

from modelo.conexion_bd import db, ma
from modelo.producto import ProductoEsquema

# agrega el blueprint de vendedor a app
from modelo.controlador.crud_producto import crud_prod
#agrega el blueprint de comprar a app
from modelo.controlador.comprar import compra_rutas
# agrega el blueprint de catalogo a app
from modelo.controlador.catalogo import catalogo
# agrega el blueprint de auth
from modelo.controlador.auth import auth


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

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ispulga:postpass20212@localhost/PulgaOnline'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Agrega las rutas del vendedor
app.register_blueprint(crud_prod.bp)
# Agrega las rutas del catalogo
app.register_blueprint(catalogo.bp)
# Agrega las rutas de comprar
app.register_blueprint(compra_rutas.bp)
# Agrega las rutas de auth
app.register_blueprint(auth.bp)

# Agregamos llave para la creacion de sessions
app.config['SECRET_KEY'] = 'LLAVE_SECRETA_20212'
# Configuración para el tiempo de vida de las sessions
app.permanent_session_lifetime = timedelta(hours=2)

producto_esquema = ProductoEsquema()
productos_esquema = ProductoEsquema(many=True)

@app.route("/send", methods=["GET", "POST"])
def send():
    """
    Eviar un correo 
    """
    email = request.json.get('correo')
    producto = request.json.get('id_producto')
    prod = compra_rutas.getProd(producto)
    msg = Message('Gracias por tu compra', sender = app.config.get('MAIL_USERNAME'), recipients = [email])
    msg.body = f"¡Gracias por realizar su compra en la PulgaOnline! \n\n Producto:{prod.nombre} \n Cargo Realizado: $ {prod.precio} mxn"
    mail.send(msg)
    return make_response(jsonify('sent'),200)

if __name__ == '__main__':
    app.run(debug=True)
