from flask import Flask, request, jsonify, abort, send_file
from flask_cors import CORS

from modelo.conexion_bd import db, ma
from modelo.producto import Producto, ProductoEsquema
from modelo.categoria import Categoria

from modelo.controlador.crud_producto import crud_prod

#agrega el blueprint de comprar a app
from modelo.comprar import compra_rutas
from flask_cors import CORS
from flask_mail import Mail, Message

app = Flask(__name__)
CORS(app)

db.init_app(app)
ma.init_app(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ispulga:postpass20212@localhost/PulgaOnline'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Agrega las rutas del vendedor
app.register_blueprint(crud_prod.bp)
# Agrega las rutas de comprar
app.register_blueprint(compra_rutas.bp)

if __name__ == '__main__':
    app.run(debug=True)
