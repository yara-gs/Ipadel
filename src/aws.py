import os, boto3, botocore

s3=boto3.client(
    "s3",
    aws_access_key_id=os.environ.get('S3_ID'),
    aws_secret_access_key=os.environ.get('S3_SECRET')
)

def upload_file_to_s3 (file,bucket_name,acl="public-read"):

    s3_location='http://{}.s3.amazonaws.com/'.format(bucket_name)
    # Documentation https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-uploading-files.html
    # def upload_file(file_name, bucket, object_name=None):
    # Upload a file to an S3 bucket
    # :param file_name: File to upload
    # :param bucket: Bucket to upload to
    # :param object_name: S3 object name. If not specified then file_name is used
    # :return: True if file was uploaded, else False
    #

    # If S3 object_name was not specified, use file_name

    # if object_name is None:
    #     object_name = file

    # Upload the file
    # s3_client = boto3.client('s3')
   
    s3.upload_fileobj(file,bucket_name, file.filename,ExtraArgs={"ACL":acl,"ContentType":file.content_type})
    return "{}{}".format(s3_location,file.filename)