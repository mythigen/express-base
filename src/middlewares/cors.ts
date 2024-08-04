const allowed_origins = [
  'http://127.0.0.1:5173', 
  "http://localhost:5173",
  "http://127.0.0.1:3000/", 
  "http://localhost:3000"
];

let cors_options = {};

cors_options.methods = ["GET", "POST"];
cors_options.exposedHeaders = ['Content-Type', 'Authorization'];
cors_options.maxAge = 86400;
cors_options.origin = (origin, callback) => {
  console.log(origin);
  if (allowed_origins.includes(origin)) {
    callback(null, true);
  } else {
    callback(new Error('Not allowed by CORS'));
  }
};

export default cors_options;
