# image-upload-multer-s3

still needed to fix the "requesttimetooskewed: the difference between the request time and the current time is too large." error between amazon region and timezone conflict.

create a directory for the files
 >"views" folder> index.ejs
 >public>uploads

install dependencies
>npm install ejs
>npm install multer
>npm install express
>npm install aws-sdk
>npm install dotenv
>npm install uuid

create an ".env" and input all of the bucket and user credentials needs.
AWS_BUCKET_NAME=""
AWS_BUCKET_REGION=""
AWS_ACCESS_KEY=""
AWS_SECRET_KEY=""
