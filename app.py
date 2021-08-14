from flask import Flask, request, jsonify, abort, send_file
from flask_cors import CORS

from modelo.conexion_bd import db, ma
from modelo.producto import Producto, ProductoEsquema

from modelo.controlador.catalogo import catalogo

app = Flask(__name__)
CORS(app)

db.init_app(app)
ma.init_app(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://paolabarredo:Numpy#19@localhost/PulgaOnline'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.register_blueprint(catalogo.bp)
    
if __name__ == '__main__':
    app.run(debug=True)
