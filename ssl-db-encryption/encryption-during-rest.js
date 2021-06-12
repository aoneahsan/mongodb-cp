// ****************************************************************
// encryption during rest
// ****************************************************************
// NOTE: this mean encrypt data from server to client  (SERVER -> CLIENT)

// ****************************************************************
// you can encrypt your db incoming and outgoing data using a SSL/TSL file
// ****************************************************************
// on localhost to do this (on linux) we will first create our own dummy SSL, and use that for encrypting request from client to server

// Creating dummy SSL cert file, use below command

// ****************************************************************
// create two SSL cert & key files using openssl
// ****************************************************************
'openssl req -newkey rsa:2048 -new -x509 -days 365 -nodes -out mongodb-cert.cert -keyout mongodb-cert.key';

// ****************************************************************
// combine both files
// ****************************************************************
'cat mongodb-cert.cert mongodb-cert.key > mongodb.pem';

// ****************************************************************
// start mongod serve with SSL
// ****************************************************************
// NOTE: we need the openssl cert ".pem" file generated above

// NOW: start mongod serve with ssl using below command
"sudo mongod --tlsMode requireTLS --tlsCertificateKeyFile '/media/ahsan/linuxdata/work/mongo-db-data/ssl-pem-file/mongodb.pem' --dbpath '/media/ahsan/linuxdata/work/mongo-db-data/db'"; // this server will run in foreground

// ****************************************************************
// connect to newly started SSL serve using same SSL .pem file
// ****************************************************************
"mongo --tls --tlsCAFile '/media/ahsan/linuxdata/work/mongo-db-data/ssl-pem-file/mongodb.pem' --host localhost";
