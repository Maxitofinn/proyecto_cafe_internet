# Archivo: app.py
from dotenv import load_dotenv
load_dotenv()
import os
from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from datetime import datetime

# Con esto es suficiente para servir:
#   - /static/css/... desde tu carpeta ./static/css
#   - /static/js/...  desde ./static/js
# Tus plantillas van en ./templates
app = Flask(__name__, template_folder='templates')

# Configuración de la base de datos
default_db_url = 'mysql+pymysql://root:Camila1%3A@127.0.0.1:3306/cafe'
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', default_db_url)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

db = SQLAlchemy(app)

# Modelos (según Creacion_DB_cafe.sql)
class Dispositivo(db.Model):
    __tablename__ = 'dispositivos'
    id_dispositivo   = db.Column('id_Dispositivo', db.Integer, primary_key=True)
    nombre_dispositivo = db.Column('Nombre_dispositivo', db.String(30), nullable=False)
    tipo_dispositivo   = db.Column(
        'Tipo_dispositivo',
        db.Enum('Consola','Control','Juego','Computadora'),
        nullable=False
    )
    estado_unidad      = db.Column(
        'Estado_unidad',
        db.Enum('En renta','Disponible','Dañado','En Mantenimiento'),
        nullable=False
    )
    numero_serie       = db.Column('Numero_serie', db.String(10), nullable=False)

class Empleado(db.Model):
    __tablename__ = 'empleados'
    id_empleado = db.Column('id_Empleado', db.Integer, primary_key=True)
    nombre = db.Column('Nombre', db.String(20))
    ap_paterno = db.Column('Ap_paterno', db.String(20))
    ap_materno = db.Column('Ap_materno', db.String(20))

class ProductoPapeleria(db.Model):
    __tablename__ = 'productos_papeleria'
    id_producto = db.Column('id_Producto', db.Integer, primary_key=True)
    nombre_producto = db.Column('Nombre_producto', db.String(15))
    precio_unitario = db.Column('Precio_unitario', db.Float)

class ProductoSnack(db.Model):
    __tablename__ = 'productos_snacks'
    id_snack = db.Column('id_Snack', db.Integer, primary_key=True)
    nombre_producto = db.Column('Nombre_producto', db.String(15))
    precio_unitario = db.Column('Precio_unitario', db.Float)

class RentaDispositivos(db.Model):
    __tablename__ = 'renta_Dispositivos'
    id_Renta          = db.Column('id_Renta', db.Integer, primary_key=True)
    id_empleados      = db.Column('id_Empleados', db.Integer,db.ForeignKey('empleados.id_Empleado'), nullable=False)
    fecha_inicio      = db.Column('Fecha_hora_inicio', db.DateTime, nullable=False)
    fecha_fin         = db.Column('Fecha_hora_fin', db.DateTime, nullable=False)
    monto_total       = db.Column('Monto_total', db.Float, nullable=False)
    detalles_renta    = relationship('DetalleRenta', backref='renta', lazy=True)

class DetalleRenta(db.Model):
    __tablename__ = 'detalles_renta'
    id_Detalles_renta = db.Column('id_Detalles_renta', db.Integer, primary_key=True)
    id_Renta          = db.Column('id_Renta', db.Integer,
                           db.ForeignKey('renta_Dispositivos.id_Renta'), nullable=False)
    id_Dispositivos   = db.Column('id_Dispositivos', db.Integer,
                           db.ForeignKey('dispositivos.id_Dispositivo'), nullable=False)
    tipo              = db.Column('Tipo', db.Enum('Consola','Control','Juego','Computadora'),
                           nullable=False)
    cantidad          = db.Column('Cantidad', db.Integer, nullable=False)
    horas_rentadas    = db.Column('Horas_rentadas', db.Integer, nullable=False)
    costo_de_renta    = db.Column('Costo_de_renta', db.Float, nullable=False)
    subtotal          = db.Column('Subtotal', db.Float, nullable=False)

class Inventario(db.Model):
    __tablename__ = 'inventario'
    id_inventario = db.Column('id_Inventario', db.Integer, primary_key=True)
    id_dispositivo = db.Column('id_Dispositivo', db.Integer,
                        db.ForeignKey('dispositivos.id_Dispositivo'))
    id_producto_pap = db.Column('id_Productos_papeleria', db.Integer,
                        db.ForeignKey('productos_papeleria.id_Producto'))
    id_producto_snack = db.Column('id_Productos_snacks', db.Integer,
                        db.ForeignKey('productos_snacks.id_Snack'))
    nombre_producto  = db.Column('Nombre_producto', db.String(50), nullable=False)
    stock            = db.Column('Stock', db.Integer, nullable=False)
    fecha            = db.Column('Fecha', db.DateTime, nullable=False)

class Venta(db.Model):
    __tablename__ = 'ventas'
    id_venta = db.Column('id_Venta', db.Integer, primary_key=True)
    id_empleado = db.Column('id_Empleado', db.Integer, db.ForeignKey('empleados.id_Empleado'))
    fecha_venta = db.Column('Fecha_venta', db.DateTime, default=datetime.utcnow)
    total_venta = db.Column('Total_venta', db.Float)
    metodo_pago = db.Column('Metodo_de_pago', db.Enum('Efectivo','Tarjeta'))
    detalles = db.relationship('DetalleVenta', backref='venta', lazy=True)

class DetalleVenta(db.Model):
    __tablename__ = 'detalles_venta'
    id = db.Column('id_Detalles_venta', db.Integer, primary_key=True)
    id_venta = db.Column('id_Ventas', db.Integer, db.ForeignKey('ventas.id_Venta'))
    id_producto = db.Column('id_Productos', db.Integer, db.ForeignKey('productos_papeleria.id_Producto'))
    id_snack = db.Column('id_Snacks', db.Integer, db.ForeignKey('productos_snacks.id_Snack'))
    cantidad = db.Column('Cantidad', db.Integer)
    nombre_producto = db.Column('Nombre_producto', db.String(50))
    precio_unitario = db.Column('Precio_unitario', db.Float)
    subtotal = db.Column('Subtotal', db.Float)

# Rutas de renderizado
def to_dict(obj, attrs):
    return {a: getattr(obj, a) for a in attrs}

@app.route('/debug-db')
def debug_db():
    return jsonify({'SQLALCHEMY_DATABASE_URI': app.config['SQLALCHEMY_DATABASE_URI']})

@app.route('/')
def home():
    return render_template('Menu.html')

@app.route('/registrar')
def registrar():
    return render_template('RegistrarVenta.html')

# Endpoints API
@app.route('/api/productos')
def get_productos():
    papeleria = ProductoPapeleria.query.all()
    snacks = ProductoSnack.query.all()
    return jsonify({
        'papeleria': [to_dict(p, ['id_producto','nombre_producto','precio_unitario']) for p in papeleria],
        'snacks': [to_dict(s, ['id_snack','nombre_producto','precio_unitario']) for s in snacks]
    })

@app.route('/api/empleados')
def get_empleados():
    empleados = Empleado.query.all()
    return jsonify([{
        'id_empleado': e.id_empleado,
        'nombre': f"{e.nombre} {e.ap_paterno} {e.ap_materno}"
    } for e in empleados])

@app.route('/api/ventas', methods=['POST'])
def create_venta():
    data  = request.json
    items = data.get('items', [])

    # 1) Validar stock
    for item in items:
        # Elegir campo correcto según tipo
        inv = None
        if item.get('id_producto'):
            inv = Inventario.query.filter_by(id_producto_pap=item['id_producto']).first()
        else:
            inv = Inventario.query.filter_by(id_producto_snack=item['id_snack']).first()

        if not inv:
            return jsonify({'error': f"No existe inventario para {item['nombre_producto']}"}), 404
        if inv.stock < item['cantidad']:
            return jsonify({
                'error': (
                    f"Stock insuficiente para {item['nombre_producto']}. "
                    f"Disponible: {inv.stock}, solicitado: {item['cantidad']}"
                )
            }), 400

    # 2) Crear objeto Venta y obtener su ID
    venta = Venta(
        id_empleado = data['id_empleado'],
        metodo_pago = data['metodo_pago'],
        total_venta = sum(i['cantidad'] * i['precio_unitario'] for i in items)
    )
    db.session.add(venta)
    db.session.flush()  # hace el INSERT pero no el COMMIT, para obtener venta.id_venta

    # 3) Crear DetalleVenta y actualizar stock
    for item in items:
        detalle = DetalleVenta(
            id_venta        = venta.id_venta,
            id_producto     = item.get('id_producto'),
            id_snack        = item.get('id_snack'),
            cantidad        = item['cantidad'],
            nombre_producto = item['nombre_producto'],
            precio_unitario = item['precio_unitario'],
            subtotal        = item['cantidad'] * item['precio_unitario']
        )
        db.session.add(detalle)

        # Decrementar stock
        if item.get('id_producto'):
            inv = Inventario.query.filter_by(id_producto_pap=item['id_producto']).first()
        else:
            inv = Inventario.query.filter_by(id_producto_snack=item['id_snack']).first()
        inv.stock -= item['cantidad']
        db.session.add(inv)

    # 4) Commit final de toda la transacción
    db.session.commit()
    return jsonify({'message':'Venta registrada','id_venta':venta.id_venta}), 201

if __name__ == '__main__':
    app.run(debug=True)

