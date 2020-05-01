
image=$1
tag=$2
docker_build_cmd=""
cloud_push_cmd=""

case $image in
    client)
        docker_build_cmd="docker build -t gcr.io/looped-in-274723/looped-in-frontend:${2} ./client/"
        cloud_push_cmd="gcloud docker -- push gcr.io/looped-in-274723/looped-in-frontend:${2}"
        ;;
    server)
        docker_build_cmd="docker build -t gcr.io/looped-in-274723/looped-in-backend:${2} ./server/"
        cloud_push_cmd="gcloud docker -- push gcr.io/looped-in-274723/looped-in-backend:${2}"
        ;;
    *)
        echo "Usage: sh build.sh <image> <tag>"
        exit 1
esac

$docker_build_cmd
$cloud_push_cmd