# Helper function to read Docker secrets
def read_secret(secret_path):
    try:
        with open(secret_path, 'r') as file:
            return file.read().strip()
    except FileNotFoundError:
        return None

# AWS-RDS or Local machine - MySql
DB_NAME = read_secret('/run/secrets/database')
DB_USER = 'root'
DB_PASSWORD = read_secret('/run/secrets/db_root_password')
DB_PORT = 3306
DB_HOST = 'database'

# AWS-S3
AWS_S3_ACCESS_KEY_ID = read_secret('/run/secrets/S3_access_key')
AWS_S3_SECRET_ACCESS_KEY = read_secret('/run/secrets/S3_secret_key')
AWS_STORAGE_BUCKET_NAME = read_secret('/run/secrets/storage_bucket_name')
AWS_REGION = read_secret('/run/secrets/AWS_region')
AWS_S3_ENDPOINT_URL = read_secret('/run/secrets/S3_ENDPOINT_URL')
AWS_QUERYSTRING_AUTH = False
