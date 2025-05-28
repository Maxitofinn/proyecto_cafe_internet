/*Creacion de la base de datos de cafe internet */
create database cafe_internet;
use cafe_internet;
create table Detalles_venta(
	id_Detalles_venta  int primary key auto_increment not null,
    id_Ventas int not null,
    id_Productos int,
    id_Snacks int ,
    Cantidad int not null,
    Nombre_producto varchar(50) not null,
    Precio_unitario decimal not null,
    Subtotal decimal not null,
    foreign key (id_Productos) references Productos_Papeleria(id_Producto),
    foreign key (id_Snacks) references Productos_Snacks(id_Snack)
	);
    
create table Detalles_renta(
	id_Detalles_renta int primary key auto_increment not null,
    id_Renta int not null,
    id_Dispositivos int not null,
    Tipo enum("Consola","Control","Juego","Computadora") not null,
    Cantidad int not null,
    Horas_rentadas int not null,
    Costo_de_renta decimal not null,
    Subtotal decimal not null,
    foreign key(id_Renta) references Renta_Dispositivos(id_Renta),
    foreign key(id_Dispositivos) references Dispositivos (id_Dispositivo)
	);
    
    CREATE TABLE Dispositivos(
    id_Dispositivo INT PRIMARY KEY NOT NULL auto_increment,
    Nombre_dispositivo VARCHAR(30) NOT NULL,
    Tipo_dispositivo ENUM("Consola","Control","Juego","Computadora") NOT NULL,
    Estado_unidad Enum ("En renta","Disponible","Dañado","En Mantenimiento") NOT NULL,
    Numero_serie VARCHAR(10)NOT NULL
    );
    
	CREATE TABLE Renta_Dispositivos(
    id_Renta INT PRIMARY KEY NOT NULL auto_increment,
    id_Empleados INT NOT NULL,
    Fecha_hora_inicio DATETIME NOT NULL,
    Fecha_hora_fin DATETIME NOT NULL,
    Monto_total decimal NOT NULL,
    FOREIGN KEY (id_Empleados) REFERENCES Empleados(id_Empleado)
    );
    
    CREATE TABLE Inventario(
	id_Inventario INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	id_Dispositivo INT,
	id_Productos_papeleria INT,
    id_Productos_snacks INT,
	Nombre_producto VARCHAR(50) NOT NULL,
	Stock INT not null,
	Fecha DATETIME NOT NULL,
	FOREIGN KEY(id_Dispositivo) REFERENCES Dispositivos(id_Dispositivo),
	FOREIGN KEY(id_Productos_papeleria) REFERENCES Productos_Papeleria(id_Producto),
    foreign key(id_Productos_snacks) references Productos_Snacks(Id_Snack)
	);
    
    CREATE TABLE Empleados(
	id_Empleado	INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	RFC	VARCHAR(13),
	Fecha_de_contratacion DATE,
	Puesto	VARCHAR(30),
	Sueldo	DOUBLE,
	Turno	VARCHAR(15),
	Estatus	VARCHAR(10) CHECK (Estatus IN ('activo', 'inactivo')),
	Correo	VARCHAR(50),
	Telefono VARCHAR(10) CHECK (Telefono REGEXP '^[0-9]+$'),
	Nombre	VARCHAR(20),
	Ap_paterno	VARCHAR(20),
	Ap_materno	VARCHAR(20),
	Sexo char(1) CHECK (Sexo IN ('h', 'm'))
);

	CREATE TABLE Productos_Papeleria(
	id_Producto	INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	Nombre_producto	VARCHAR(15) NOT NULL,
	Descripcion	VARCHAR(15) NOT NULL,
	Precio_unitario	DOUBLE NOT NULL,
	Marca VARCHAR(15) NOT NULL
);

	CREATE TABLE Productos_Snacks(
	id_Snack INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	Nombre_producto	VARCHAR(15) NOT NULL,
	Descripcion	VARCHAR(15) NOT NULL,
	Precio_unitario	DOUBLE NOT NULL,
	Marca VARCHAR(15) NOT NULL
);

	create table Ventas(
    id_Venta int primary key auto_increment not null,
    id_Empleado int not null,
    Fecha_venta datetime not null,
    Total_venta decimal not null,
    Metodo_de_pago enum("Efectivo","Tarjeta") not null,
    foreign key(id_Empleado) references Empleados(Id_Empleado)
    );
    
