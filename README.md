Description:
This node js project builds rest api for online fashion store.

Technologies Used:
Node js, javascript, mysql , stripe 3rd party apis , amazon rds and s3

How To Run:
1. Clone the project
2. navigate into the folder containing package.json with the command 'cd gcit_fashion_store/'
3. run 'npm install' to install all the necessary dependencies.
4. run 'npm install bcrypt'
5. create a .env file and add the following secret informations:
DB_HOST(host name),DB_USER(database user),DB_PASSWORD(database password), DB_NAME(database name), STRIPE_SECRET_KEY(for processing payment
create a stripe account and five the secret key),Bucket_name(to upload any file to s3 via admin functionalities).
6. run 'npm start' to start the application.
