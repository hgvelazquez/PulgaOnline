from flask import Blueprint, request, jsonify,make_response
bp = Blueprint('comprar', __name__, url_prefix='/comprar')


from modelo.producto import Producto, ProductoEsquema
from modelo.usuario import Usuario, UsuarioEsquema
from flask_mail import Mail, Message #para envio de email


from modelo.conexion_bd import db, ma


producto_esquema = ProductoEsquema()
productos_esquema = ProductoEsquema(many=True)

usuario_esquema = UsuarioEsquema()
usuarios_esquema = UsuarioEsquema(many=True)

@bp.route('/ingresa_direccion', methods = ['GET','POST'])
def ingresa_direccion():
    """
    Obtiene el id del usuario en session y modifica la direccionen la Base de Datos
    """
    params = request.get_json(force=True,silent=False)
    
    try:
        id_usuario = params['id_usuario']
        consulta = Usuario.query.filter_by(id_usuario=id_usuario).first()
        if consulta is None:
            return make_response(jsonify("Error en la base de datos"), 500)

        consulta.calle = params['calle']
        consulta.numext = params['numeroExt']
        consulta.colonia = params['colonia']
        consulta.ciudad = params['ciudad']
        consulta.estado = params['estado']
        db.session.commit()
    except:
        return make_response(jsonify("Error en la base de datos"), 500)
    
    return jsonify(
                message='Se a cambiado la direccion',
                category="success",
                status=200
            )

@bp.route('/validar_compra', methods=['GET', 'POST'])
def validar_compra():
    """
    Realiza la compra, restando 1 a los disponibles en la base
    de datos.
    """
    
    try:
        # Validamos el usuario
        id_usuario = request.json['id_usuario']
        user = Usuario.query.filter_by(id_usuario=id_usuario).first()
        if (user is None) or (user.tipo_usuario):
            return make_response(jsonify("Usuario no es comprador"), 403)
        
        # Realizamos la compra

        id_producto =  request.json['id_producto']
        consulta = Producto.query.filter_by(id_producto=id_producto).first()
        
        if consulta is None:
            return make_response(jsonify("Error en la base de datos"), 500)
        if(int(consulta.disponible) == 0 ):
            return make_response(jsonify("No hay productos disponibles"), 400)
        
        consulta.disponible = int(consulta.disponible) - 1 
    
    except:
        print("\n\nEXCEPT\n\n")
        return make_response(jsonify("Error en la base de datos"), 500)

    db.session.commit()
    return make_response(jsonify("Compra realizada con éxito"), 200)
