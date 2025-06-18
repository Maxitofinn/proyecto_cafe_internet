# Archivo: app.py
from dotenv import load_dotenv
load_dotenv()
import os
from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from datetime import datetime
from flask import request
from sqlalchemy import case, func
import math 
from datetime import date

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
    return render_template('menu.html')

@app.route('/historial')
def historial():
    return render_template('HistorialVentas.html')

@app.route('/registrar')
def registrar():
    return render_template('RegistrarVenta.html')

@app.route('/productos')
def productos():
    return render_template('Productos.html')

@app.route('/renta')
def renta_dispositivos():
    return render_template('RegistrarRenta.html')

@app.route('/historial-rentas')
def historial_rentas():
    return render_template('HistorialRentas.html')


# Endpoints API
@app.route('/api/ventas', methods=['GET'])
def list_ventas():
    # Parámetros de filtro
    fecha   = request.args.get('fecha')       # "DD/MM/YYYY"
    id_busq = request.args.get('id')          # id de venta
    orden   = request.args.get('orden', 'id-asc')  # 'id-asc' o 'id-desc'

    # Query base
    q = db.session.query(Venta, Empleado).join(Empleado, Venta.id_empleado == Empleado.id_empleado)

    # Filtrar por fecha
    if fecha:
        # convertir fecha a datetime
        dt = datetime.strptime(fecha, "%d/%m/%Y")
        # comparar solo la fecha (ignora hora)
        q = q.filter(db.func.date(Venta.fecha_venta) == dt.date())

    # Filtrar por ID
    if id_busq:
        q = q.filter(Venta.id_venta == int(id_busq))

    # Ordenar
    if orden == 'id-asc':
        q = q.order_by(Venta.id_venta.asc())
    else:
        q = q.order_by(Venta.id_venta.desc())

    resultados = []
    for venta, emp in q.all():
        # obtener detalles
        items = []
        total_cant = 0
        for det in venta.detalles:
            items.append(det.nombre_producto)
            total_cant += det.cantidad
        resultados.append({
            'id': venta.id_venta,
            'fecha': venta.fecha_venta.strftime("%d/%m/%Y"),
            'empleado': f"{emp.nombre} {emp.ap_paterno} {emp.ap_materno}",
            'productos': items,
            'cantidad': total_cant,
            'total': venta.total_venta,
            'formaPago': venta.metodo_pago
        })

    return jsonify(resultados)

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

# Obtener lista de empleados
@app.route('/api/rentas/empleados', methods=['GET'])
def get_empleados_renta():
    empleados = Empleado.query.all()
    return jsonify([
        { 'id': e.id_empleado, 'nombre': e.nombre }
        for e in empleados
    ])


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



@app.route('/api/productos-list', methods=['GET'])
def list_productos():
    inv_rows = db.session.query(
        Inventario.id_inventario.label('id'),
        Inventario.nombre_producto.label('nombre'),
        Inventario.id_dispositivo.label('id_disp'),
        Inventario.id_producto_pap.label('id_pap'),
        Inventario.id_producto_snack.label('id_sn'),
        # Primero comprobamos id_dispositivo, luego papelería, sino snack
        case(
            (Inventario.id_dispositivo != None,    'consola'),
            (Inventario.id_producto_pap   != None, 'papeleria'),
            else_='snack'
        ).label('tipo'),
        func.coalesce(
            ProductoPapeleria.precio_unitario,
            ProductoSnack.precio_unitario
        ).label('precio'),
        Inventario.stock.label('cantidad')
    ).outerjoin(
        ProductoPapeleria, Inventario.id_producto_pap    == ProductoPapeleria.id_producto
    ).outerjoin(
        ProductoSnack,    Inventario.id_producto_snack  == ProductoSnack.id_snack
    ).all()

    resultado = []
    for row in inv_rows:
        # Si fuese consola, podrías asignar un precio fijo o 0.0
        precio_raw = row.precio if row.tipo != 'consola' else 0.0
        precio = float(precio_raw or 0.0)

        if row.cantidad == 0:
            estado = 'Agotado'
        elif row.cantidad <= 10:
            estado = 'Bajo Stock'
        else:
            estado = 'Disponible'

        resultado.append({
            'id':       row.id,
            'nombre':   row.nombre,
            'tipo':     row.tipo,
            'precio':   precio,
            'cantidad': row.cantidad,
            'estado':   estado
        })

    return jsonify(resultado)

# Iniciar renta: ahora recibe id_empleado dinámico
@app.route('/api/renta/start', methods=['POST'])
def start_renta():
    data = request.get_json()
    empleado_id   = data.get('id_empleado')
    dispositivo_id= data.get('id')
    tipo          = data.get('tipo')
    consola_id    = data.get('consolaId', None)
    rates = { 'Consola': 30, 'Computadora': 20, 'Juego': 20, 'Control': 20 }
    ahora = datetime.now()

    # 1) Crear RentaDispositivos
    renta = RentaDispositivos(
        id_empleados=empleado_id,
        fecha_inicio=ahora,
        fecha_fin=ahora,
        monto_total=0
    )
    db.session.add(renta)
    db.session.flush()  # Para obtener renta.id_Renta

    # 2) Crear DetalleRenta para el dispositivo
    detalle = DetalleRenta(
        id_Renta=renta.id_Renta,
        id_Dispositivos=dispositivo_id,
        tipo=tipo,
        cantidad=1,
        horas_rentadas=0,
        costo_de_renta=rates[tipo],
        subtotal=0
    )
    db.session.add(detalle)

    # 3) Si es juego, añadir detalle para la consola
    if tipo == 'Juego' and consola_id:
        detalle_cons = DetalleRenta(
            id_Renta=renta.id_Renta,
            id_Dispositivos=consola_id,
            tipo='Consola',
            cantidad=1,
            horas_rentadas=0,
            costo_de_renta=rates['Consola'],
            subtotal=0
        )
        db.session.add(detalle_cons)

    # 4) Actualizar estado de las unidades
    disp = Dispositivo.query.get(dispositivo_id)
    disp.estado_unidad = 'En renta'
    if tipo == 'Juego' and consola_id:
        disp_cons = Dispositivo.query.get(consola_id)
        disp_cons.estado_unidad = 'En renta'

    # 5) Confirmar en BD
    db.session.commit()

    # 6) Devolver respuesta JSON con éxito
    return jsonify({
        'success': True,
        'renta_id': renta.id_Renta
    }), 201


@app.route('/api/renta/stop', methods=['POST'])
def stop_renta():
    data = request.get_json()
    dispositivo_id = data.get('id')
    tipo = data.get('tipo')
    consola_id = data.get('consolaId', None)

    # Buscar el detalle activo (horas_rentadas aún 0)
    detalle = DetalleRenta.query.filter_by(
        id_Dispositivos=dispositivo_id,
        horas_rentadas=0
    ).order_by(DetalleRenta.id_Detalles_renta.desc()).first()

    if not detalle:
        return jsonify({'error': 'No hay renta activa para ese dispositivo'}), 404

    renta = detalle.renta
    ahora = datetime.now()

    # Calcular horas redondeando hacia arriba
    horas = math.ceil((ahora - renta.fecha_inicio).total_seconds() / 3600)

    # Actualizar ese detalle
    detalle.horas_rentadas = horas
    detalle.subtotal = detalle.costo_de_renta * horas

    # Si era un juego, también actualizar la consola asociada
    if tipo == 'Juego' and consola_id:
        det_cons = DetalleRenta.query.filter_by(
            id_Renta=renta.id_Renta,
            id_Dispositivos=consola_id,
            horas_rentadas=0
        ).first()
        if det_cons:
            det_cons.horas_rentadas = horas
            det_cons.subtotal = det_cons.costo_de_renta * horas

    # Actualizar monto total de la renta y fecha de fin
    renta.fecha_fin = ahora
    renta.monto_total = sum(d.subtotal for d in renta.detalles_renta)

    # Liberar el/los dispositivos
    disp = Dispositivo.query.get(dispositivo_id)
    disp.estado_unidad = 'Disponible'
    if tipo == 'Juego' and consola_id:
        disp_cons = Dispositivo.query.get(consola_id)
        disp_cons.estado_unidad = 'Disponible'

    db.session.commit()

    return jsonify({
        'success': True,
        'monto_total': renta.monto_total
    }), 200


# helpers para el endpoint de dispositivos
def map_estado(estado_unidad):
    mapping = {
        'Disponible': 'disponible',
        'En renta':   'ocupado',
        'Dañado':     'mantenimiento',
        'En Mantenimiento': 'mantenimiento'
    }
    # Si aparece otro estado, lo devolvemos en minúsculas
    return mapping.get(estado_unidad, estado_unidad.lower())


@app.route('/api/dispositivos', methods=['GET'])
def get_dispositivos():
    # Filtros por tipo usando los atributos Python
    comps  = Dispositivo.query.filter_by(tipo_dispositivo='Computadora').all()
    cons   = Dispositivo.query.filter_by(tipo_dispositivo='Consola').all()
    games  = Dispositivo.query.filter_by(tipo_dispositivo='Juego').all()

    def to_dict(d):
        return {
            'id':     d.id_dispositivo,
            'nombre': d.nombre_dispositivo,
            'estado': map_estado(d.estado_unidad),
            'tiempo': None
        }

    return jsonify({
        'computadoras': [to_dict(d) for d in comps],
        'consolas':     [to_dict(d) for d in cons],
        'videojuegos':  [to_dict(d) for d in games]
    })

@app.route('/api/rentas', methods=['GET'])
def list_rentas():
    fecha   = request.args.get('fecha')  # formato: DD/MM/YYYY
    id_busq = request.args.get('id')
    orden   = request.args.get('orden', 'id-asc')

    q = db.session.query(RentaDispositivos, Empleado).join(Empleado, RentaDispositivos.id_empleados == Empleado.id_empleado)

    if fecha:
        dt = datetime.strptime(fecha, "%d/%m/%Y")
        q = q.filter(db.func.date(RentaDispositivos.fecha_inicio) == dt.date())

    if id_busq:
        q = q.filter(RentaDispositivos.id_Renta == int(id_busq))

    if orden == 'id-asc':
        q = q.order_by(RentaDispositivos.id_Renta.asc())
    else:
        q = q.order_by(RentaDispositivos.id_Renta.desc())

    resultado = []
    for renta, emp in q.all():
        nombres = []
        total_horas = 0
        for det in renta.detalles_renta:
            nombres.append(det.tipo + ": " + Dispositivo.query.get(det.id_Dispositivos).nombre_dispositivo)
            total_horas += det.horas_rentadas

        resultado.append({
            'id': renta.id_Renta,
            'fecha': renta.fecha_inicio.strftime("%d/%m/%Y"),
            'empleado': f"{emp.nombre} {emp.ap_paterno} {emp.ap_materno}",
            'dispositivos': nombres,
            'total_horas': total_horas,
            'total': renta.monto_total
        })

    return jsonify(resultado)


@app.route('/api/metrics', methods=['GET'])
def metrics():
    # Totales y en uso para computadoras
    total_comp = Dispositivo.query.filter_by(tipo_dispositivo='Computadora').count()
    en_uso_comp = Dispositivo.query.filter_by(
        tipo_dispositivo='Computadora',
        estado_unidad='En renta'
    ).count()

    # Totales y en uso para consolas
    total_cons = Dispositivo.query.filter_by(tipo_dispositivo='Consola').count()
    en_uso_cons = Dispositivo.query.filter_by(
        tipo_dispositivo='Consola',
        estado_unidad='En renta'
    ).count()

    # Ventas de hoy
    today = date.today()
    ventas_hoy = db.session.query(Venta).filter(
        db.func.date(Venta.fecha_venta) == today
    ).count()

    return jsonify({
        'total_computadoras': total_comp,
        'computadoras_en_uso': en_uso_comp,
        'total_consolas':     total_cons,
        'consolas_ocupadas':  en_uso_cons,
        'ventas_hoy':         ventas_hoy
    })

if __name__ == '__main__':
    app.run(debug=True)

